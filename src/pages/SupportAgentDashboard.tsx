import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  MessageSquare, Mail, Phone, User, Clock, Eye, EyeOff,
  CheckCircle, Archive, Reply, AlertCircle, Search,
  Filter, RefreshCw, ChevronDown, Send, X, Calendar,
  MapPin, ExternalLink, Trash2, MoreVertical, Edit
} from 'lucide-react';
import { supabase } from '../utils/supabase/client';
import { useAuth } from '../contexts/AuthContext';
import { usePageTitle } from '../hooks/usePageTitle';
import { toast } from 'sonner';

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string;
  message: string;
  status: 'unread' | 'read' | 'replied' | 'archived';
  user_id: string | null;
  created_at: string;
  updated_at: string;
}

type StatusFilter = 'all' | 'unread' | 'read' | 'replied' | 'archived';

export function SupportAgentDashboard() {
  usePageTitle('Support Dashboard');
  const { profile } = useAuth();
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [sendingReply, setSendingReply] = useState(false);

  // Load messages
  const loadMessages = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setMessages(data || []);
    } catch (err) {
      console.error('Error loading messages:', err);
      toast.error('Failed to load messages');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMessages();
  }, []);

  // Filter messages
  const filteredMessages = messages.filter(msg => {
    const matchesStatus = statusFilter === 'all' || msg.status === statusFilter;
    const matchesSearch = searchQuery === '' ||
      msg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      msg.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      msg.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      msg.message.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  // Update message status
  const updateMessageStatus = async (messageId: string, newStatus: ContactMessage['status']) => {
    try {
      const { error } = await supabase
        .from('contact_messages')
        .update({ status: newStatus, updated_at: new Date().toISOString() })
        .eq('id', messageId);

      if (error) throw error;

      setMessages(prev => prev.map(msg =>
        msg.id === messageId ? { ...msg, status: newStatus } : msg
      ));

      toast.success(`Message marked as ${newStatus}`);
    } catch (err) {
      console.error('Error updating message:', err);
      toast.error('Failed to update message');
    }
  };

  // Send reply (placeholder - would integrate with email service)
  const sendReply = async () => {
    if (!selectedMessage || !replyText.trim()) return;

    setSendingReply(true);
    try {
      // For now, just mark as replied
      await updateMessageStatus(selectedMessage.id, 'replied');
      setReplyText('');
      setShowReplyModal(false);
      setSelectedMessage(null);

      // TODO: Integrate with email service to actually send reply
      toast.success('Reply sent (email integration needed)');
    } catch (err) {
      toast.error('Failed to send reply');
    } finally {
      setSendingReply(false);
    }
  };

  // Format date
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  // Status badge
  const StatusBadge = ({ status }: { status: ContactMessage['status'] }) => {
    const configs = {
      unread: { color: 'bg-red-500/20 text-red-400 border-red-500/30', label: 'Unread' },
      read: { color: 'bg-blue-500/20 text-blue-400 border-blue-500/30', label: 'Read' },
      replied: { color: 'bg-green-500/20 text-green-400 border-green-500/30', label: 'Replied' },
      archived: { color: 'bg-gray-500/20 text-gray-400 border-gray-500/30', label: 'Archived' },
    };

    const config = configs[status];
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${config.color}`}>
        {config.label}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500"></div>
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Support Dashboard</h1>
          <p className="text-muted-foreground">Manage contact form submissions and customer inquiries</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Messages', value: messages.length, icon: MessageSquare, color: 'text-cyan-500' },
            { label: 'Unread', value: messages.filter(m => m.status === 'unread').length, icon: AlertCircle, color: 'text-red-500' },
            { label: 'Replied', value: messages.filter(m => m.status === 'replied').length, icon: CheckCircle, color: 'text-green-500' },
            { label: 'Archived', value: messages.filter(m => m.status === 'archived').length, icon: Archive, color: 'text-gray-500' },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-card border border-cyan-500/20 rounded-xl p-6 hover:border-cyan-500/50 transition-all"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Filters */}
        <div className="bg-card border border-cyan-500/20 rounded-xl p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search messages..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-cyan-500/50"
                />
              </div>
            </div>
            <div className="flex gap-2">
              {(['all', 'unread', 'read', 'replied', 'archived'] as StatusFilter[]).map((status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    statusFilter === status
                      ? 'bg-cyan-500 text-white'
                      : 'bg-background border border-border text-muted-foreground hover:border-cyan-500/50'
                  }`}
                >
                  {status === 'all' ? 'All' : status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              ))}
            </div>
            <button
              onClick={loadMessages}
              className="px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 text-cyan-600 dark:text-cyan-400 rounded-lg hover:bg-cyan-500/20 transition-all"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Messages List */}
        <div className="grid lg:grid-cols-3 gap-6">

          {/* Message List */}
          <div className="lg:col-span-1">
            <div className="bg-card border border-cyan-500/20 rounded-xl overflow-hidden">
              <div className="p-4 border-b border-border">
                <h3 className="font-semibold text-foreground">
                  Messages ({filteredMessages.length})
                </h3>
              </div>
              <div className="max-h-[600px] overflow-y-auto">
                {filteredMessages.length === 0 ? (
                  <div className="p-8 text-center text-muted-foreground">
                    <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No messages found</p>
                  </div>
                ) : (
                  filteredMessages.map((message) => (
                    <div
                      key={message.id}
                      onClick={() => setSelectedMessage(message)}
                      className={`p-4 border-b border-border cursor-pointer hover:bg-cyan-500/5 transition-all ${
                        selectedMessage?.id === message.id ? 'bg-cyan-500/10 border-cyan-500/30' : ''
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium text-foreground truncate pr-2">{message.name}</h4>
                        <StatusBadge status={message.status} />
                      </div>
                      <p className="text-sm text-muted-foreground mb-1 truncate">{message.subject}</p>
                      <p className="text-xs text-muted-foreground">{formatDate(message.created_at)}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Message Detail */}
          <div className="lg:col-span-2">
            {selectedMessage ? (
              <div className="bg-card border border-cyan-500/20 rounded-xl p-6">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-foreground mb-2">{selectedMessage.subject}</h2>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {selectedMessage.name}
                      </span>
                      <span className="flex items-center gap-1">
                        <Mail className="w-4 h-4" />
                        {selectedMessage.email}
                      </span>
                      {selectedMessage.phone && (
                        <span className="flex items-center gap-1">
                          <Phone className="w-4 h-4" />
                          {selectedMessage.phone}
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {new Date(selectedMessage.created_at).toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <StatusBadge status={selectedMessage.status} />
                    <div className="flex gap-1">
                      {selectedMessage.status !== 'read' && (
                        <button
                          onClick={() => updateMessageStatus(selectedMessage.id, 'read')}
                          className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-500/10 rounded"
                          title="Mark as read"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      )}
                      {selectedMessage.status !== 'replied' && (
                        <button
                          onClick={() => setShowReplyModal(true)}
                          className="p-2 text-green-600 dark:text-green-400 hover:bg-green-500/10 rounded"
                          title="Reply"
                        >
                          <Reply className="w-4 h-4" />
                        </button>
                      )}
                      {selectedMessage.status !== 'archived' && (
                        <button
                          onClick={() => updateMessageStatus(selectedMessage.id, 'archived')}
                          className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-500/10 rounded"
                          title="Archive"
                        >
                          <Archive className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                <div className="bg-background border border-border rounded-lg p-4">
                  <p className="text-foreground whitespace-pre-wrap">{selectedMessage.message}</p>
                </div>
              </div>
            ) : (
              <div className="bg-card border border-cyan-500/20 rounded-xl p-12 text-center">
                <MessageSquare className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                <h3 className="text-lg font-medium text-foreground mb-2">Select a message</h3>
                <p className="text-muted-foreground">Choose a message from the list to view its details</p>
              </div>
            )}
          </div>
        </div>

        {/* Reply Modal */}
        <AnimatePresence>
          {showReplyModal && selectedMessage && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="w-full max-w-2xl bg-card border border-cyan-500/20 rounded-2xl shadow-2xl overflow-hidden"
              >
                <div className="p-6 border-b border-border">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-foreground">Reply to {selectedMessage.name}</h3>
                    <button
                      onClick={() => setShowReplyModal(false)}
                      className="p-2 hover:bg-cyan-500/10 rounded-lg"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="p-6">
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-foreground mb-2">Reply Message</label>
                    <textarea
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder="Type your reply here..."
                      rows={8}
                      className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-cyan-500/50 resize-none"
                    />
                  </div>

                  <div className="flex justify-end gap-3">
                    <button
                      onClick={() => setShowReplyModal(false)}
                      className="px-6 py-3 border border-border rounded-lg text-muted-foreground hover:bg-background transition-all"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={sendReply}
                      disabled={!replyText.trim() || sendingReply}
                      className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg font-medium hover:shadow-[0_0_20px_rgba(6,182,212,0.6)] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                      {sendingReply ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          Send Reply
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}