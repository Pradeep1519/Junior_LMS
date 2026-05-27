// ============================================
// File 5: src/app/components/StudentDashboard.tsx
// ============================================
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { DashboardLayout } from "../DashboardLayout";
import { CircularProgress } from "./CircularProgress";
import { useAuth } from "../../context/AuthContext";
import {
  Home, Calendar, TrendingUp, ClipboardList, Video, Book, Users,
  Settings, Clock, CheckCircle, AlertCircle, ArrowUp, ArrowDown,
  Target, Zap, Flame, Star, Trophy, Timer, Brain, Medal, Sparkles,
} from "lucide-react";

export function StudentDashboard() {
  const navigate = useNavigate();
  const { currentUser, userData } = useAuth();
  const [streak, setStreak] = useState(15);
  const [studyMinutes, setStudyMinutes] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [showAchievement, setShowAchievement] = useState(false);
  const [achievement, setAchievement] = useState("");

  // Real user data from Firebase
  const studentName = userData?.name || "Student";
  const studentClass = userData?.class || "Class 10";
  const studentProgram = userData?.program || "Engineering Excellence";
  const studentAvatar = userData?.avatar || "AS";

  const sidebarItems = [
    { icon: Home, label: "Dashboard", active: true },
    { icon: Calendar, label: "My Classes", path: "/schedule", badge: 3 },
    { icon: TrendingUp, label: "My Progress", path: "/student/reports" },
    { icon: ClipboardList, label: "Assignments", path: "/student/assignments", badge: 2 },
    { icon: Video, label: "Recordings", path: "/recordings" },
    { icon: Book, label: "Study Material", path: "/study-material" },
    { icon: Users, label: "Mentor Sessions", path: "/mentor-sessions", badge: 1 },
    { icon: Settings, label: "Settings", path: "/settings" },
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setStudyMinutes(prev => {
          const newVal = prev + 1;
          if (newVal === 60) {
            setAchievement("🔥 1 Hour Focus Master!");
            setShowAchievement(true);
            setTimeout(() => setShowAchievement(false), 3000);
          }
          return newVal;
        });
      }, 60000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  const todaySchedule = [
    { time: "09:00 AM", subject: "Mathematics", teacher: "Mr. Sharma", topic: "Quadratic Equations", status: "live", participants: 45 },
    { time: "11:00 AM", subject: "Physics", teacher: "Dr. Gupta", topic: "Laws of Motion", status: "upcoming", participants: 38 },
    { time: "02:00 PM", subject: "Chemistry", teacher: "Mrs. Reddy", topic: "Organic Compounds", status: "upcoming", participants: 42 },
  ];

  const subjects = [
    { name: "Mathematics", progress: 92, grade: "A+", trend: "up", color: "from-blue-500 to-blue-600", icon: "📐" },
    { name: "Physics", progress: 88, grade: "A", trend: "up", color: "from-purple-500 to-purple-600", icon: "⚡" },
    { name: "Chemistry", progress: 85, grade: "A", trend: "same", color: "from-green-500 to-green-600", icon: "🧪" },
    { name: "Biology", progress: 78, grade: "B+", trend: "down", color: "from-emerald-500 to-emerald-600", icon: "🧬" },
    { name: "English", progress: 90, grade: "A+", trend: "up", color: "from-orange-500 to-orange-600", icon: "📖" },
  ];

  const pendingAssignments = [
    { title: "Quadratic Problems Set", subject: "Mathematics", due: "Tomorrow", status: "pending", priority: "high" },
    { title: "Motion Lab Report", subject: "Physics", due: "2 days", status: "pending", priority: "medium" },
    { title: "Organic Chemistry Quiz", subject: "Chemistry", due: "5 days", status: "submitted", priority: "low" },
  ];

  const achievements = [
    { icon: "🔥", title: "7-Day Streak", description: "Consistent learning", unlocked: true },
    { icon: "📚", title: "10 Courses Done", description: "Knowledge seeker", unlocked: true },
    { icon: "⚡", title: "Quick Learner", description: "Fast quiz completion", unlocked: true },
    { icon: "🌟", title: "Rising Star", description: "Top 10% performer", unlocked: false },
    { icon: "🏆", title: "Perfect Score", description: "100% in any test", unlocked: false },
  ];

  const leaderboard = [
    { name: "Priya Patel", points: 4850, avatar: "PP", rank: 1 },
    { name: studentName, points: 4720, avatar: studentAvatar, rank: 2 },
    { name: "Rohan Gupta", points: 4580, avatar: "RG", rank: 3 },
    { name: "Ananya Singh", points: 4450, avatar: "AN", rank: 4 },
  ];

  const recommendedTopics = [
    { subject: "Mathematics", topic: "Trigonometry Basics", reason: "Based on your progress", difficulty: "Medium" },
    { subject: "Physics", topic: "Work & Energy", reason: "Weak area detected", difficulty: "Hard" },
    { subject: "Chemistry", topic: "Periodic Table", reason: "Upcoming test topic", difficulty: "Easy" },
  ];

  return (
    <DashboardLayout
      title={`Welcome back, ${studentName}! 👋`}
      subtitle={`${studentClass} • ${studentProgram}`}
      sidebarItems={sidebarItems}
      userInfo={
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-amber-100 text-amber-700 px-3 py-1.5 rounded-full text-sm font-medium">
            <Flame size={16} className="text-orange-500" />
            <span>{streak} Day Streak</span>
          </div>
          <div className="flex items-center gap-2 bg-blue-100 text-blue-700 px-3 py-1.5 rounded-full text-sm font-medium">
            <Zap size={16} />
            <span>4,720 XP</span>
          </div>
        </div>
      }
    >
      {showAchievement && (
        <div className="fixed top-24 right-8 z-50 animate-slideIn bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3">
          <Trophy size={24} />
          <div>
            <p className="font-bold">Achievement Unlocked!</p>
            <p className="text-sm">{achievement}</p>
          </div>
        </div>
      )}

      <div className="space-y-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 group cursor-pointer">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-red-500 rounded-xl flex items-center justify-center">
                <Flame className="w-5 h-5 text-white" />
              </div>
              <ArrowUp className="w-4 h-4 text-green-500" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{streak} Days</p>
            <p className="text-sm text-gray-500 mt-1">Learning Streak</p>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 group cursor-pointer">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center">
                <Timer className="w-5 h-5 text-white" />
              </div>
              <button
                onClick={() => setIsTimerRunning(!isTimerRunning)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${isTimerRunning ? 'bg-red-100 text-red-600 hover:bg-red-200' : 'bg-green-100 text-green-600 hover:bg-green-200'}`}
              >
                {isTimerRunning ? '⏸ Pause' : '▶ Start'}
              </button>
            </div>
            <p className="text-2xl font-bold text-gray-900">{Math.floor(studyMinutes / 60)}h {studyMinutes % 60}m</p>
            <p className="text-sm text-gray-500 mt-1">Today's Focus Time</p>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 group cursor-pointer">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl flex items-center justify-center">
                <Star className="w-5 h-5 text-white" />
              </div>
              <span className="text-xs font-medium text-purple-600 bg-purple-50 px-2 py-1 rounded-full">Level 12</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">4,720</p>
            <div className="mt-2 h-1.5 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-purple-400 to-purple-600 rounded-full" style={{ width: '82%' }}></div>
            </div>
            <p className="text-xs text-gray-500 mt-1">2,450 / 3,000 XP to Level 13</p>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 group cursor-pointer">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-600 rounded-xl flex items-center justify-center">
                <Target className="w-5 h-5 text-white" />
              </div>
              <ArrowUp className="w-4 h-4 text-green-500" />
            </div>
            <p className="text-2xl font-bold text-gray-900">89.5%</p>
            <p className="text-sm text-gray-500 mt-1">Avg. Test Score</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Today's Classes</h2>
                  <p className="text-sm text-gray-500 mt-1">3 classes scheduled</p>
                </div>
                <button onClick={() => navigate("/schedule")} className="text-blue-600 text-sm font-medium hover:underline">View All</button>
              </div>
              <div className="space-y-3">
                {todaySchedule.map((classItem, index) => (
                  <div key={index} className="group flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50/30 transition-all duration-300">
                    <div className="flex items-start gap-4 flex-1">
                      <div className={`min-w-[90px] text-center p-2 rounded-lg ${classItem.status === 'live' ? 'bg-red-50 text-red-600' : 'bg-gray-100 text-gray-600'}`}>
                        <p className="text-xs font-medium">{classItem.status === 'live' ? '🔴 LIVE' : '⏰'}</p>
                        <p className="text-sm font-bold">{classItem.time}</p>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-gray-900">{classItem.subject}</h3>
                          {classItem.status === 'live' && (
                            <span className="relative flex h-2 w-2">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">{classItem.teacher}</p>
                        <div className="flex items-center gap-3 mt-1">
                          <p className="text-sm text-gray-500">{classItem.topic}</p>
                          <span className="text-xs text-gray-400">•</span>
                          <p className="text-xs text-gray-400">{classItem.participants} students</p>
                        </div>
                      </div>
                    </div>
                    <button className={`px-5 py-2.5 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 ${classItem.status === 'live' ? 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg shadow-red-200 hover:shadow-xl' : 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-200 hover:shadow-xl'}`}>
                      {classItem.status === 'live' ? 'Join Now' : 'Join Class'}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-6">
                <div><h2 className="text-xl font-bold text-gray-900">Subject Mastery</h2><p className="text-sm text-gray-500 mt-1">Track your progress</p></div>
                <button onClick={() => navigate("/student/reports")} className="text-blue-600 text-sm font-medium hover:underline">Detailed Report</button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {subjects.map((subject, index) => (
                  <div key={index} className="group p-4 rounded-xl border border-gray-100 hover:border-gray-200 hover:shadow-md transition-all duration-300 cursor-pointer">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{subject.icon}</span>
                        <div>
                          <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">{subject.name}</h3>
                          <div className="flex items-center gap-2">
                            <span className={`text-sm font-bold ${subject.trend === 'up' ? 'text-green-600' : subject.trend === 'down' ? 'text-red-600' : 'text-gray-600'}`}>{subject.grade}</span>
                            {subject.trend === 'up' && <ArrowUp size={14} className="text-green-500" />}
                            {subject.trend === 'down' && <ArrowDown size={14} className="text-red-500" />}
                          </div>
                        </div>
                      </div>
                      <span className="text-lg font-bold text-gray-900">{subject.progress}%</span>
                    </div>
                    <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                      <div className={`h-full bg-gradient-to-r ${subject.color} rounded-full transition-all duration-1000 ease-out`} style={{ width: `${subject.progress}%` }} />
                    </div>
                    <div className="flex justify-between mt-2"><span className="text-xs text-gray-400">Current</span><span className="text-xs text-gray-400">Target: 100%</span></div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2"><Brain className="w-6 h-6 text-purple-600" /><div><h2 className="text-xl font-bold text-gray-900">AI Recommended</h2><p className="text-sm text-gray-500">Personalized learning path</p></div></div>
              </div>
              <div className="space-y-3">
                {recommendedTopics.map((topic, index) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-xl border border-purple-100 bg-purple-50/30 hover:bg-purple-50 transition-all duration-300 cursor-pointer group">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white ${topic.difficulty === 'Easy' ? 'bg-green-400' : topic.difficulty === 'Medium' ? 'bg-yellow-400' : 'bg-red-400'}`}>
                        {topic.difficulty === 'Easy' ? '⭐' : topic.difficulty === 'Medium' ? '⭐⭐' : '⭐⭐⭐'}
                      </div>
                      <div><h3 className="font-semibold text-gray-900">{topic.topic}</h3><p className="text-sm text-gray-600">{topic.subject} • {topic.reason}</p></div>
                    </div>
                    <button className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">Start Learning</button>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2"><ClipboardList className="w-6 h-6 text-orange-600" /><div><h2 className="text-xl font-bold text-gray-900">Assignments</h2><p className="text-sm text-gray-500">{pendingAssignments.filter(a => a.status === 'pending').length} pending</p></div></div>
                <button onClick={() => navigate("/student/assignments")} className="text-blue-600 text-sm font-medium hover:underline">View All</button>
              </div>
              <div className="space-y-3">
                {pendingAssignments.map((assignment, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-orange-200 transition-all duration-300">
                    <div className="flex items-center gap-4">
                      <div className={`w-2 h-12 rounded-full ${assignment.priority === 'high' ? 'bg-red-500' : assignment.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'}`}></div>
                      <div><h3 className="font-semibold text-gray-900">{assignment.title}</h3><div className="flex items-center gap-3 mt-1"><span className="text-sm text-gray-600">{assignment.subject}</span><span className="text-xs text-gray-400">•</span><span className={`text-sm font-medium ${assignment.status === 'pending' ? 'text-orange-600' : 'text-green-600'}`}>Due: {assignment.due}</span></div></div>
                    </div>
                    {assignment.status === 'pending' ? (
                      <div className="flex gap-2">
                        <button onClick={() => navigate("/student/assignments")} className="px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg text-sm font-medium hover:shadow-lg transition-all duration-300 transform hover:scale-105">Submit Now</button>
                        <button onClick={() => navigate("/student/assignments")} className="px-4 py-2 border border-gray-300 text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-50 transition-all">View</button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 text-green-600 bg-green-50 px-3 py-1.5 rounded-full"><CheckCircle size={16} /><span className="text-sm font-medium">Submitted</span></div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="font-bold text-gray-900 mb-6">Overall Progress</h3>
              <div className="flex justify-center mb-6"><CircularProgress value={85} size={160} strokeWidth={12} color="url(#gradient)" /></div>
              <svg width="0" height="0"><defs><linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#3B82F6" /><stop offset="50%" stopColor="#8B5CF6" /><stop offset="100%" stopColor="#EC4899" /></linearGradient></defs></svg>
              <div className="grid grid-cols-2 gap-3">
                <div className="text-center p-3 bg-blue-50 rounded-xl"><p className="text-sm font-semibold text-blue-600">Courses</p><p className="text-lg font-bold text-gray-900">12/15</p></div>
                <div className="text-center p-3 bg-green-50 rounded-xl"><p className="text-sm font-semibold text-green-600">Tests</p><p className="text-lg font-bold text-gray-900">45</p></div>
                <div className="text-center p-3 bg-purple-50 rounded-xl"><p className="text-sm font-semibold text-purple-600">Hours</p><p className="text-lg font-bold text-gray-900">128</p></div>
                <div className="text-center p-3 bg-orange-50 rounded-xl"><p className="text-sm font-semibold text-orange-600">Rank</p><p className="text-lg font-bold text-gray-900">#2</p></div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-4"><div className="flex items-center gap-2"><Trophy className="w-6 h-6 text-yellow-500" /><h3 className="font-bold text-gray-900">Leaderboard</h3></div><span className="text-xs text-gray-500">This Week</span></div>
              <div className="space-y-2">
                {leaderboard.map((student, index) => (
                  <div key={index} className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-300 ${student.name === studentName ? 'bg-blue-50 border border-blue-200' : 'hover:bg-gray-50'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${student.rank === 1 ? 'bg-yellow-400 text-white' : student.rank === 2 ? 'bg-gray-300 text-white' : student.rank === 3 ? 'bg-orange-400 text-white' : 'bg-gray-200 text-gray-600'}`}>{student.rank}</div>
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold">{student.avatar}</div>
                    <div className="flex-1"><p className={`text-sm font-semibold ${student.name === studentName ? 'text-blue-600' : 'text-gray-900'}`}>{student.name}{student.name === studentName && ' (You)'}</p></div>
                    <span className="text-sm font-bold text-gray-900">{student.points.toLocaleString()} XP</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-4"><div className="flex items-center gap-2"><Medal className="w-6 h-6 text-purple-600" /><h3 className="font-bold text-gray-900">Achievements</h3></div><span className="text-xs text-gray-500">3/5 Unlocked</span></div>
              <div className="grid grid-cols-2 gap-2">
                {achievements.slice(0, 4).map((ach, index) => (
                  <div key={index} className={`p-3 rounded-xl text-center transition-all duration-300 ${ach.unlocked ? 'bg-gradient-to-br from-purple-50 to-blue-50 border border-purple-100 hover:shadow-md' : 'bg-gray-100 border border-gray-200 opacity-50'}`}><span className="text-2xl">{ach.icon}</span><p className={`text-xs font-semibold mt-1 ${ach.unlocked ? 'text-gray-900' : 'text-gray-500'}`}>{ach.title}</p></div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl shadow-lg p-6 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-8 -mb-8"></div>
              <Sparkles className="w-8 h-8 mb-3 text-yellow-300" />
              <p className="text-lg font-medium italic leading-relaxed relative z-10">"The expert in anything was once a beginner."</p>
              <p className="text-sm text-white/80 mt-3">— Helen Hayes</p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideIn { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
        .animate-slideIn { animation: slideIn 0.5s ease-out; }
        @keyframes ping { 75%, 100% { transform: scale(2); opacity: 0; } }
        .animate-ping { animation: ping 1s cubic-bezier(0, 0, 0.2, 1) infinite; }
      `}</style>
    </DashboardLayout>
  );
}