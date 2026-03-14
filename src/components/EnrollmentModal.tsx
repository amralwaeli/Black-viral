import { useState } from 'react';
import { X, Loader2, CheckCircle } from 'lucide-react';
import { supabase, getCurrentUser, getUserProfile } from '../utils/supabase/client';

interface EnrollmentModalProps {
  course: any;
  isOpen: boolean;
  onClose: () => void;
}

export function EnrollmentModal({ course, isOpen, onClose }: EnrollmentModalProps) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  async function handleEnroll() {
    setLoading(true);
    setError('');

    try {
      const user = await getCurrentUser();
      if (!user) {
        setError('Please sign in to enroll');
        return;
      }

      const profile = await getUserProfile(user.id);
      if (!profile) {
        setError('User profile not found');
        return;
      }

      // Check if already enrolled
      const { data: existing, error: checkError } = await supabase
        .from('enrollments')
        .select('*')
        .eq('trainee_id', profile.id)
        .eq('course_id', course.id)
        .single();

      if (existing) {
        setError('You are already enrolled in this course');
        return;
      }

      // Create enrollment (status: pending, waiting for coach approval)
      const { error: enrollError } = await supabase
        .from('enrollments')
        .insert({
          trainee_id: profile.id,
          course_id: course.id,
          status: 'pending',
          progress: 0
        });

      if (enrollError) throw enrollError;

      setSuccess(true);
      setTimeout(() => {
        onClose();
        setSuccess(false);
      }, 2000);
    } catch (err: any) {
      console.error('Enrollment error:', err);
      setError(err.message || 'Failed to enroll');
    } finally {
      setLoading(false);
    }
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-card border border-cyan-500/20 rounded-3xl p-8 max-w-md w-full shadow-[0_0_50px_rgba(6,182,212,0.2)]">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-foreground">Enroll in Course</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-cyan-500/10 rounded-lg transition-all"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        {success ? (
          <div className="text-center py-8">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h4 className="text-xl font-bold text-foreground mb-2">Enrollment Submitted!</h4>
            <p className="text-muted-foreground">
              Your enrollment request is pending coach approval. You'll be notified once approved.
            </p>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-foreground mb-2">{course.title}</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>Duration: {course.duration}</p>
                <p>Level: {course.level}</p>
                <p>Price: {course.price}</p>
              </div>
            </div>

            {error && (
              <div className="mb-4 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                <p className="text-red-500 text-sm">{error}</p>
              </div>
            )}

            <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-4 mb-6">
              <p className="text-sm text-cyan-600 dark:text-cyan-400">
                <strong>Note:</strong> Your enrollment will be pending until approved by a coach. 
                You'll receive a notification once your request is processed.
              </p>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={onClose}
                className="flex-1 px-6 py-3 bg-background border border-border rounded-lg font-medium text-foreground hover:bg-cyan-500/5 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleEnroll}
                disabled={loading}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg font-semibold hover:shadow-[0_0_20px_rgba(6,182,212,0.6)] transition-all disabled:opacity-50 flex items-center justify-center"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  'Enroll Now'
                )}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
