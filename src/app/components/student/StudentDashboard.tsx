// ============================================
// UPDATED: student-portal/src/app/components/student/StudentDashboard.tsx
// ============================================
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { DashboardLayout } from "../DashboardLayout";
import { CircularProgress } from "./CircularProgress";
import { useAuth } from "../../context/AuthContext";
import {
  getStudentBatches, getStudentClasses, getStudentAssignments, getStudentTeacher
} from "../../config/firebase";
import {
  Home, Calendar, TrendingUp, ClipboardList, Video, Book, Users,
  Settings, Clock, CheckCircle, AlertCircle, ArrowUp, ArrowDown,
  Target, Zap, Flame, Star, Trophy, Timer, Brain, Medal, Sparkles,
} from "lucide-react";

export function StudentDashboard() {
  const navigate = useNavigate();
  const { currentUser, userData } = useAuth();
  const studentId = userData?.studentId || userData?.uid || "";
  
  const [streak, setStreak] = useState(15);
  const [studyMinutes, setStudyMinutes] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [showAchievement, setShowAchievement] = useState(false);
  const [achievement, setAchievement] = useState("");
  
  // ✅ Real data states
  const [myBatches, setMyBatches] = useState([]);
  const [myClasses, setMyClasses] = useState([]);
  const [myAssignments, setMyAssignments] = useState([]);
  const [loading, setLoading] = useState(true);

  const studentName = userData?.fullName || userData?.name || "Student";
  const studentClass = userData?.class || "Class 10";
  const studentProgram = userData?.enrolledCourseName || userData?.program || "Engineering Excellence";
  const studentAvatar = (userData?.fullName || userData?.name || "S").charAt(0).toUpperCase();

  useEffect(() => {
    async function fetchStudentData() {
      if (!studentId) return;
      try {
        const [batches, classes, assignments] = await Promise.all([
          getStudentBatches(studentId),
          getStudentClasses(studentId),
          getStudentAssignments(studentId)
        ]);
        setMyBatches(batches);
        setMyClasses(classes);
        setMyAssignments(assignments);
      } catch (err) { console.error(err); }
      finally { setLoading(false); }
    }
    fetchStudentData();
  }, [studentId]);

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

  const sidebarItems = [
    { icon: Home, label: "Dashboard", active: true },
    { icon: Calendar, label: "My Classes", path: "/schedule", badge: myClasses.length || 0 },
    { icon: TrendingUp, label: "My Progress", path: "/student/reports" },
    { icon: ClipboardList, label: "Assignments", path: "/student/assignments", badge: myAssignments.filter(a => a.status === "active").length || 0 },
    { icon: Video, label: "Recordings", path: "/recordings" },
    { icon: Book, label: "Study Material", path: "/study-material" },
    { icon: Users, label: "Mentor Sessions", path: "/mentor-sessions" },
    { icon: Settings, label: "Settings", path: "/settings" },
  ];

  // ✅ Today's classes from real data
  const today = new Date().toISOString().split('T')[0];
  const todayClasses = myClasses
    .filter(c => c.date === today)
    .slice(0, 3)
    .map(c => ({
      time: c.time || "N/A",
      subject: c.subject || "N/A",
      teacher: c.teacherName || "Teacher",
      topic: c.topic || "N/A",
      status: c.status || "upcoming",
      participants: 0
    }));

  // ✅ Pending assignments from real data
  const pendingAssignments = myAssignments
    .filter(a => a.status === "active")
    .slice(0, 3)
    .map(a => ({
      title: a.title,
      subject: a.subject || "N/A",
      due: a.dueDate ? new Date(a.dueDate).toLocaleDateString() : "N/A",
      status: a.submissions?.[studentId] ? "submitted" : "pending",
      priority: new Date(a.dueDate) < new Date() ? "high" : "medium"
    }));

  // ✅ Quick stats from real data
  const quickStats = [
    { label: "My Batches", value: myBatches.length, icon: Book, color: "text-blue-600", trend: "Enrolled" },
    { label: "Classes Today", value: todayClasses.length, icon: Video, color: "text-purple-600", trend: "Scheduled" },
    { label: "Assignments", value: myAssignments.length, icon: ClipboardList, color: "text-orange-600", trend: `${pendingAssignments.filter(a => a.status === 'pending').length} pending` },
    { label: "Avg Score", value: userData?.avgScore ? `${userData.avgScore}%` : "N/A", icon: Target, color: "text-green-600", trend: "Keep it up!" },
  ];

  // ✅ Subjects from batches
  const subjects = myBatches.length > 0 
    ? [...new Set(myBatches.flatMap(b => b.subjects || []))].slice(0, 5).map(name => ({
        name, progress: 75 + Math.floor(Math.random() * 20), grade: "A",
        trend: "up", color: "from-blue-500 to-blue-600", icon: "📚"
      }))
    : [
        { name: "Mathematics", progress: 92, grade: "A+", trend: "up", color: "from-blue-500 to-blue-600", icon: "📐" },
        { name: "Physics", progress: 88, grade: "A", trend: "up", color: "from-purple-500 to-purple-600", icon: "⚡" },
      ];

  // Show loading state while fetching
  if (loading) {
    return (
      <DashboardLayout title="Loading..." subtitle="Fetching your data" sidebarItems={sidebarItems}>
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </DashboardLayout>
    );
  }

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
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
            {studentAvatar}
          </div>
        </div>
      }
    >
      {showAchievement && (
        <div className="fixed top-24 right-8 z-50 animate-slideIn bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3">
          <Trophy size={24} />
          <div><p className="font-bold">Achievement Unlocked!</p><p className="text-sm">{achievement}</p></div>
        </div>
      )}

      <div className="space-y-6">
        {/* Quick Stats - REAL DATA */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {quickStats.map((stat, index) => (
            <div key={index} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 group cursor-pointer">
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 bg-${stat.color.replace('text-', '')}/10 rounded-xl flex items-center justify-center`}>
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <ArrowUp className="w-4 h-4 text-green-500" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
              <p className="text-xs text-gray-400 mt-0.5">{stat.trend}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Today's Classes - REAL DATA */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-6">
                <div><h2 className="text-xl font-bold text-gray-900">Today's Classes</h2><p className="text-sm text-gray-500 mt-1">{todayClasses.length} classes scheduled</p></div>
                <button onClick={() => navigate("/schedule")} className="text-blue-600 text-sm font-medium hover:underline">View All</button>
              </div>
              {todayClasses.length > 0 ? (
                <div className="space-y-3">
                  {todayClasses.map((classItem, index) => (
                    <div key={index} className="group flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50/30 transition-all duration-300">
                      <div className="flex items-start gap-4 flex-1">
                        <div className={`min-w-[90px] text-center p-2 rounded-lg ${classItem.status === 'live' ? 'bg-red-50 text-red-600' : 'bg-gray-100 text-gray-600'}`}>
                          <p className="text-xs font-medium">{classItem.status === 'live' ? '🔴 LIVE' : '⏰'}</p>
                          <p className="text-sm font-bold">{classItem.time}</p>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-gray-900">{classItem.subject}</h3>
                          <p className="text-sm text-gray-600">{classItem.teacher}</p>
                          <p className="text-sm text-gray-500 mt-1">{classItem.topic}</p>
                        </div>
                      </div>
                      <button className={`px-5 py-2.5 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 ${classItem.status === 'live' ? 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg shadow-red-200 hover:shadow-xl' : 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-200 hover:shadow-xl'}`}>
                        {classItem.status === 'live' ? 'Join Now' : 'Join Class'}
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400 text-center py-8">No classes scheduled for today</p>
              )}
            </div>

            {/* My Batches - NEW */}
            {myBatches.length > 0 && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center justify-between mb-6">
                  <div><h2 className="text-xl font-bold text-gray-900">My Batches</h2><p className="text-sm text-gray-500 mt-1">{myBatches.length} enrolled</p></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {myBatches.map(batch => (
                    <div key={batch.id} className="p-4 bg-gray-50 rounded-xl">
                      <p className="font-semibold text-gray-900">{batch.name}</p>
                      <p className="text-sm text-gray-500">{batch.courseName} • {batch.variant}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Pending Assignments - REAL DATA */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2"><ClipboardList className="w-6 h-6 text-orange-600" /><div><h2 className="text-xl font-bold text-gray-900">Assignments</h2><p className="text-sm text-gray-500">{pendingAssignments.filter(a => a.status === 'pending').length} pending</p></div></div>
                <button onClick={() => navigate("/student/assignments")} className="text-blue-600 text-sm font-medium hover:underline">View All</button>
              </div>
              {pendingAssignments.length > 0 ? (
                <div className="space-y-3">
                  {pendingAssignments.map((assignment, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-orange-200 transition-all duration-300">
                      <div className="flex items-center gap-4">
                        <div className={`w-2 h-12 rounded-full ${assignment.priority === 'high' ? 'bg-red-500' : 'bg-yellow-500'}`}></div>
                        <div><h3 className="font-semibold text-gray-900">{assignment.title}</h3><div className="flex items-center gap-3 mt-1"><span className="text-sm text-gray-600">{assignment.subject}</span><span className="text-xs text-gray-400">•</span><span className={`text-sm font-medium ${assignment.status === 'pending' ? 'text-orange-600' : 'text-green-600'}`}>Due: {assignment.due}</span></div></div>
                      </div>
                      {assignment.status === 'pending' ? (
                        <button onClick={() => navigate("/student/assignments")} className="px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg text-sm font-medium hover:shadow-lg transition-all">Submit Now</button>
                      ) : (
                        <div className="flex items-center gap-2 text-green-600 bg-green-50 px-3 py-1.5 rounded-full"><CheckCircle size={16} /><span className="text-sm font-medium">Submitted</span></div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400 text-center py-4">No pending assignments 🎉</p>
              )}
            </div>
          </div>

          <div className="space-y-6">
            {/* Profile Card */}
            <div className="bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl p-6 text-white shadow-lg">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center text-white text-xl font-bold backdrop-blur-sm">{studentAvatar}</div>
                <div><h3 className="text-lg font-bold">{studentName}</h3><p className="text-blue-100 text-sm">{studentClass} • {studentProgram}</p></div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white/10 rounded-xl p-3 text-center"><p className="text-xl font-bold">{myBatches.length}</p><p className="text-xs">Batches</p></div>
                <div className="bg-white/10 rounded-xl p-3 text-center"><p className="text-xl font-bold">{myClasses.length}</p><p className="text-xs">Classes</p></div>
              </div>
            </div>

            {/* Quote */}
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