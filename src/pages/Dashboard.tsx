import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { 
  BookOpen, Award, Calendar, TrendingUp, Clock,
  Play, Bell, Settings, LogOut
} from 'lucide-react';

const heroImage = "https://images.unsplash.com/photo-1762392050946-685f2dec9da7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzd2ltbWluZyUyMHBvb2wlMjB0cmFpbmluZyUyMGF0aGxldGV8ZW58MXx8fHwxNzcwOTc4MDI2fDA&ixlib=rb-4.1.0&q=80&w=1080";
const boxingImage = "https://images.unsplash.com/photo-1633715398353-1faf3874a597?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib3hpbmclMjBraWNrYm94aW5nJTIwZmlnaHRlcnxlbnwxfHx8fDE3NzA5NzgwMjd8MA&ixlib=rb-4.1.0&q=80&w=1080";

export function Dashboard() {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const isAuth = localStorage.getItem('isAuthenticated');
    const email = localStorage.getItem('userEmail');
    if (!isAuth) {
      navigate('/signin');
    } else {
      setUserEmail(email || 'user@example.com');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userEmail');
    navigate('/');
  };

  const stats = [
    { icon: BookOpen, label: 'Active Courses', value: '3', color: 'from-cyan-500 to-blue-600' },
    { icon: Award, label: 'Certificates Earned', value: '2', color: 'from-purple-500 to-pink-600' },
    { icon: TrendingUp, label: 'Progress', value: '67%', color: 'from-green-500 to-emerald-600' },
    { icon: Clock, label: 'Hours Trained', value: '48', color: 'from-orange-500 to-red-600' },
  ];

  const enrolledCourses = [
    { id: 1, title: 'Professional Swimming Training', progress: 65, nextLesson: 'Advanced Stroke Techniques', image: heroImage, lessons: 24, completedLessons: 16 },
    { id: 2, title: 'Boxing Fundamentals', progress: 40, nextLesson: 'Defensive Strategies', image: boxingImage, lessons: 20, completedLessons: 8 },
    { id: 3, title: 'First Aid & CPR Certification', progress: 90, nextLesson: 'Final Assessment', image: heroImage, lessons: 12, completedLessons: 11 },
  ];

  const upcomingClasses = [
    { title: 'Swimming - Advanced Techniques', date: 'Feb 15, 2026', time: '10:00 AM', instructor: 'Coach Ahmed', location: 'Pool A' },
    { title: 'Boxing - Sparring Session', date: 'Feb 16, 2026', time: '4:00 PM', instructor: 'Coach Sarah', location: 'Ring 2' },
    { title: 'First Aid - Practical Exam', date: 'Feb 18, 2026', time: '2:00 PM', instructor: 'Dr. Mohammed', location: 'Training Room 1' },
  ];

  const notifications = [
    { message: 'New course material available for Swimming', time: '2 hours ago', unread: true },
    { message: 'Your certificate is ready to download', time: '1 day ago', unread: true },
    { message: 'Upcoming class reminder: Boxing Session', time: '2 days ago', unread: false },
  ];

  return (
    <div className="pt-20 min-h-screen pb-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl font-bold text-foreground mb-2">
              Hi, <span className="bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-500 bg-clip-text text-transparent">{userEmail.split('@')[0]}</span>
            </h1>
            <p className="text-muted-foreground">Welcome back to your learning dashboard</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center space-x-4 mt-4 md:mt-0"
          >
            <button className="p-3 bg-card border border-cyan-500/20 rounded-lg text-muted-foreground hover:text-cyan-600 dark:hover:text-cyan-400 hover:border-cyan-500/50 transition-all">
              <Bell className="w-5 h-5" />
            </button>
            <button className="p-3 bg-card border border-cyan-500/20 rounded-lg text-muted-foreground hover:text-cyan-600 dark:hover:text-cyan-400 hover:border-cyan-500/50 transition-all">
              <Settings className="w-5 h-5" />
            </button>
            <button
              onClick={handleLogout}
              className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg font-medium hover:shadow-[0_0_20px_rgba(6,182,212,0.6)] transition-all flex items-center space-x-2"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </motion.div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-card border border-cyan-500/20 rounded-2xl p-6 hover:border-cyan-500/50 transition-all duration-300"
            >
              <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center mb-4`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-card-foreground mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6">Continue Learning</h2>
              <div className="space-y-6">
                {enrolledCourses.map((course, index) => (
                  <motion.div
                    key={course.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-card border border-cyan-500/20 rounded-2xl overflow-hidden hover:border-cyan-500/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(6,182,212,0.2)]"
                  >
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-48 h-48 flex-shrink-0">
                        <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-xl font-semibold text-card-foreground mb-2">{course.title}</h3>
                            <p className="text-muted-foreground text-sm">Lesson {course.completedLessons} of {course.lessons}</p>
                          </div>
                          <span className="px-3 py-1 bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 text-sm rounded-lg font-medium">
                            {course.progress}%
                          </span>
                        </div>
                        <div className="mb-4">
                          <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-cyan-500 to-blue-600 transition-all duration-300"
                              style={{ width: `${course.progress}%` }}
                            ></div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2 text-muted-foreground">
                            <Play className="w-4 h-4" />
                            <span className="text-sm">{course.nextLesson}</span>
                          </div>
                          <button className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg font-medium hover:shadow-[0_0_20px_rgba(6,182,212,0.6)] transition-all">
                            Continue
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Upcoming Classes */}
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6">Upcoming Classes</h2>
              <div className="bg-card border border-cyan-500/20 rounded-2xl p-6 space-y-4">
                {upcomingClasses.map((classItem, index) => (
                  <div key={index} className="pb-4 border-b border-border last:border-0 last:pb-0">
                    <h3 className="text-card-foreground font-semibold mb-2">{classItem.title}</h3>
                    <div className="space-y-1 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4" />
                        <span>{classItem.date}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4" />
                        <span>{classItem.time}</span>
                      </div>
                      <div className="text-cyan-600 dark:text-cyan-400">{classItem.instructor}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Notifications */}
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6">Notifications</h2>
              <div className="bg-card border border-cyan-500/20 rounded-2xl p-6 space-y-4">
                {notifications.map((notification, index) => (
                  <div key={index} className="flex items-start space-x-3 pb-4 border-b border-border last:border-0 last:pb-0">
                    {notification.unread && (
                      <div className="w-2 h-2 bg-cyan-500 rounded-full mt-2 flex-shrink-0"></div>
                    )}
                    <div className="flex-1">
                      <p className="text-card-foreground text-sm mb-1">{notification.message}</p>
                      <p className="text-muted-foreground text-xs">{notification.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
