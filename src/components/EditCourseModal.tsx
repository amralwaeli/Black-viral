import { useState, useEffect } from 'react';
import { X, Loader2, BookOpen } from 'lucide-react';
import { supabase } from '../utils/supabase/client';
import { toast } from 'sonner';

interface EditCourseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  course: any;
  coaches: any[];
  branches: any[];
}

export function EditCourseModal({ isOpen, onClose, onSuccess, course, coaches, branches }: EditCourseModalProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    level: 'beginner',
    duration: '',
    price: '',
    instructorId: '',
    branch: '',
    maxCapacity: '20',
    status: 'active',
    imageUrl: '',
    isOnline: true,
    isPhysical: true,
  });

  // Populate form when course changes
  useEffect(() => {
    if (course) {
      setFormData({
        title: course.title || '',
        description: course.description || '',
        category: course.category || '',
        level: course.level || 'beginner',
        duration: course.duration || '',
        price: String(course.price || ''),
        instructorId: course.instructor_id || '',
        branch: course.branch || '',
        maxCapacity: String(course.max_capacity || '20'),
        status: course.status || 'active',
        imageUrl: course.image_url || '',
        isOnline: course.is_online ?? true,
        isPhysical: course.is_physical ?? true,
      });
    }
  }, [course]);

  if (!isOpen) return null;

  const categories = [
    { value: 'aquatic',    label: 'Aquatic Sports (Swimming, Fins, Lifeguard)' },
    { value: 'combat',     label: 'Combat Sports (Boxing, MMA, Karate, Taekwondo)' },
    { value: 'team',       label: 'Team Sports (Football, Basketball)' },
    { value: 'individual', label: 'Individual Sports (Gymnastics, Athletics)' },
    { value: 'rescue',     label: 'Rescue & First Aid (CPR, Lifeguard Cert.)' },
  ];

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from('courses')
        .update({
          title: formData.title,
          description: formData.description,
          category: formData.category,
          level: formData.level,
          duration: formData.duration,
          price: parseFloat(formData.price) || 0,
          instructor_id: formData.instructorId || null,
          branch: formData.branch || null,
          max_capacity: parseInt(formData.maxCapacity) || 20,
          status: formData.status,
          image_url: formData.imageUrl || null,
          is_online: formData.isOnline,
          is_physical: formData.isPhysical,
        })
        .eq('id', course.id);

      if (error) throw error;

      toast.success('Course updated successfully!');
      onSuccess();
      onClose();
    } catch (error: any) {
      console.error('Error updating course:', error);
      toast.error(error.message || 'Failed to update course');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-card border border-cyan-500/20 rounded-2xl p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-foreground flex items-center space-x-2">
            <BookOpen className="w-6 h-6 text-cyan-500" />
            <span>Edit Course</span>
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-foreground mb-2">
                Course Title *
              </label>
              <input
                type="text"
                id="title"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-cyan-500/50 transition-all"
                placeholder="e.g., Advanced Swimming Techniques"
              />
            </div>

            <div>
              <label htmlFor="category" className="block text-sm font-medium text-foreground mb-2">
                Category *
              </label>
              <select
                id="category"
                required
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:border-cyan-500/50 transition-all"
              >
                <option value="">Select category</option>
                {categories.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-foreground mb-2">
              Description *
            </label>
            <textarea
              id="description"
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-cyan-500/50 transition-all resize-none"
              placeholder="Describe the course content and objectives..."
            />
          </div>

          <div>
            <label htmlFor="imageUrl" className="block text-sm font-medium text-foreground mb-2">
              Course Image URL
            </label>
            <input
              type="url"
              id="imageUrl"
              value={formData.imageUrl}
              onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
              className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-cyan-500/50 transition-all"
              placeholder="https://example.com/image.jpg (leave blank to use default)"
            />
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="level" className="block text-sm font-medium text-foreground mb-2">
                Level *
              </label>
              <select
                id="level"
                required
                value={formData.level}
                onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:border-cyan-500/50 transition-all"
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
                <option value="expert">Expert</option>
              </select>
            </div>

            <div>
              <label htmlFor="duration" className="block text-sm font-medium text-foreground mb-2">
                Duration *
              </label>
              <input
                type="text"
                id="duration"
                required
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-cyan-500/50 transition-all"
                placeholder="e.g., 8 weeks"
              />
            </div>

            <div>
              <label htmlFor="price" className="block text-sm font-medium text-foreground mb-2">
                Price (AED) *
              </label>
              <input
                type="number"
                id="price"
                required
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-cyan-500/50 transition-all"
                placeholder="0.00"
                step="0.01"
                min="0"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="instructorId" className="block text-sm font-medium text-foreground mb-2">
                Assign Instructor
              </label>
              <select
                id="instructorId"
                value={formData.instructorId}
                onChange={(e) => setFormData({ ...formData, instructorId: e.target.value })}
                className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:border-cyan-500/50 transition-all"
              >
                <option value="">No instructor (assign later)</option>
                {coaches.map((coach) => (
                  <option key={coach.id} value={coach.id}>
                    {coach.full_name} {coach.branch ? `(${coach.branch})` : ''}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="branch" className="block text-sm font-medium text-foreground mb-2">
                Branch
              </label>
              <select
                id="branch"
                value={formData.branch}
                onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:border-cyan-500/50 transition-all"
              >
                <option value="">All branches / Online</option>
                {branches.map((branch) => (
                  <option key={branch.id} value={branch.name}>
                    {branch.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="maxCapacity" className="block text-sm font-medium text-foreground mb-2">
                Max Capacity *
              </label>
              <input
                type="number"
                id="maxCapacity"
                required
                value={formData.maxCapacity}
                onChange={(e) => setFormData({ ...formData, maxCapacity: e.target.value })}
                className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-cyan-500/50 transition-all"
                placeholder="20"
                min="1"
              />
            </div>

            <div>
              <label htmlFor="status" className="block text-sm font-medium text-foreground mb-2">
                Status *
              </label>
              <select
                id="status"
                required
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:border-cyan-500/50 transition-all"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="archived">Archived</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-3">
              Course Availability *
            </label>
            <div className="flex gap-6">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isOnline}
                  onChange={(e) => setFormData({ ...formData, isOnline: e.target.checked })}
                  className="w-4 h-4 text-cyan-500 bg-background border-border rounded focus:ring-cyan-500 focus:ring-2"
                />
                <span className="text-foreground">Online</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isPhysical}
                  onChange={(e) => setFormData({ ...formData, isPhysical: e.target.checked })}
                  className="w-4 h-4 text-cyan-500 bg-background border-border rounded focus:ring-cyan-500 focus:ring-2"
                />
                <span className="text-foreground">Physical</span>
              </label>
            </div>
          </div>

          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 bg-background border border-border rounded-lg font-medium text-foreground hover:bg-cyan-500/5 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg font-medium hover:shadow-[0_0_20px_rgba(6,182,212,0.6)] transition-all flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <BookOpen className="w-5 h-5" />
                  <span>Update Course</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
