// MentorSessionsPage.tsx - Premium iOS-Style Mentor Sessions
import { useState } from "react";
import { DashboardLayout } from "./DashboardLayout";
import {
  Home,
  Calendar,
  TrendingUp,
  ClipboardList,
  Video,
  Book,
  Users,
  FileText,
  Settings,
  Search,
  Filter,
  Clock,
  Star,
  MessageCircle,
  Phone,
  MapPin,
  Award,
  Briefcase,
  GraduationCap,
  CheckCircle,
  X,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  Play,
  Calendar as CalendarIcon,
  Clock3,
  User,
  Users as UsersIcon,
  Sparkles,
  Zap,
  Heart,
  ThumbsUp,
  Send,
  Plus,
  Minus,
  AlertCircle,
  ArrowRight,
  Bell,
  History,
  BookOpen,
  Target,
} from "lucide-react";

interface Mentor {
  id: number;
  name: string;
  avatar: string;
  role: string;
  expertise: string[];
  subjects: string[];
  experience: string;
  qualification: string;
  rating: number;
  reviewCount: number;
  totalSessions: number;
  bio: string;
  achievements: string[];
  isOnline: boolean;
  isPremium: boolean;
  price: number;
  nextAvailable: string;
  languages: string[];
  sessionTypes: string[];
}

interface Session {
  id: number;
  mentorId: number;
  mentorName: string;
  mentorAvatar: string;
  type: "one-on-one" | "group" | "career" | "doubt" | "mock" | "ptm";
  topic: string;
  subject: string;
  date: string;
  time: string;
  endTime: string;
  duration: string;
  status: "upcoming" | "live" | "completed" | "cancelled";
  notes?: string;
  recording?: string;
  rating?: number;
  feedback?: string;
  participants?: number;
  maxParticipants?: number;
  joinLink?: string;
}

export function MentorSessionsPage() {
  const [activeTab, setActiveTab] = useState("mentors");
  const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null);
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showSessionDetail, setShowSessionDetail] = useState(false);
  const [bookingStep, setBookingStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedType, setSelectedType] = useState("one-on-one");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterExpertise, setFilterExpertise] = useState("all");
  const [showFilters, setShowFilters] = useState(false);

  const sidebarItems = [
    { icon: Home, label: "Dashboard", path: "/student/dashboard" },
    { icon: Calendar, label: "My Classes", path: "/schedule" },
    { icon: TrendingUp, label: "My Progress", path: "/student/reports" },
    { icon: ClipboardList, label: "Assignments", path: "/student/assignments" },
    { icon: Video, label: "Recordings", path: "/recordings" },
    { icon: Book, label: "Study Material", path: "/study-material" },
    { icon: Users, label: "Mentor Sessions", active: true },
    { icon: Settings, label: "Settings", path: "/settings" },
  ];

  const mentors: Mentor[] = [
    {
      id: 1, name: "Dr. Rajesh Gupta", avatar: "RG", role: "Senior Mentor - Engineering",
      expertise: ["Engineering Entrance", "Physics", "Career Guidance"],
      subjects: ["Physics", "Mathematics"],
      experience: "15+ years", qualification: "Ph.D. in Physics, IIT Delhi",
      rating: 4.9, reviewCount: 234, totalSessions: 1500,
      bio: "Experienced educator with 15+ years of guiding students for JEE Advanced. Former professor at top coaching institute. Specializes in making complex physics concepts simple.",
      achievements: ["Best Teacher Award 2024", "5000+ Students Mentored", "Published Author"],
      isOnline: true, isPremium: true, price: 500,
      nextAvailable: "Today, 4:00 PM",
      languages: ["Hindi", "English"],
      sessionTypes: ["one-on-one", "group", "career"],
    },
    {
      id: 2, name: "Mrs. Meera Desai", avatar: "MD", role: "Language & Communication Coach",
      expertise: ["English", "Communication Skills", "Interview Prep"],
      subjects: ["English"],
      experience: "10+ years", qualification: "M.A. English, Cambridge Certified",
      rating: 4.8, reviewCount: 189, totalSessions: 1200,
      bio: "Cambridge certified English trainer specializing in communication skills, public speaking, and interview preparation for competitive exams.",
      achievements: ["Cambridge Certified Trainer", "3000+ Students Trained", "Corporate Training Experience"],
      isOnline: false, isPremium: true, price: 400,
      nextAvailable: "Tomorrow, 10:00 AM",
      languages: ["English", "Hindi", "Gujarati"],
      sessionTypes: ["one-on-one", "group", "mock"],
    },
    {
      id: 3, name: "Mr. Vikram Patel", avatar: "VP", role: "Mathematics Expert",
      expertise: ["Mathematics", "Problem Solving", "Competitive Exams"],
      subjects: ["Mathematics"],
      experience: "8+ years", qualification: "M.Sc. Mathematics, BHU",
      rating: 4.7, reviewCount: 156, totalSessions: 980,
      bio: "Mathematics wizard who makes numbers fun. Specializes in shortcut techniques for competitive exams. Helped 200+ students score 99+ percentile.",
      achievements: ["Math Olympiad Trainer", "200+ Students in IITs", "YouTube Educator"],
      isOnline: true, isPremium: false, price: 0,
      nextAvailable: "Today, 6:00 PM",
      languages: ["Hindi", "English"],
      sessionTypes: ["one-on-one", "doubt", "group"],
    },
    {
      id: 4, name: "Dr. Sneha Kapoor", avatar: "SK", role: "Biology & Medical Prep Mentor",
      expertise: ["Biology", "NEET Preparation", "Medical Counseling"],
      subjects: ["Biology"],
      experience: "12+ years", qualification: "MBBS, MD (AIIMS)",
      rating: 4.9, reviewCount: 278, totalSessions: 1800,
      bio: "Medical professional and passionate educator. Provides realistic insights into medical career while preparing students for NEET biology.",
      achievements: ["AIIMS Gold Medalist", "3000+ NEET Success Stories", "Medical Advisor"],
      isOnline: false, isPremium: true, price: 600,
      nextAvailable: "Fri, 11:00 AM",
      languages: ["English", "Hindi"],
      sessionTypes: ["one-on-one", "career", "doubt"],
    },
    {
      id: 5, name: "Mrs. Priya Reddy", avatar: "PR", role: "Chemistry Specialist",
      expertise: ["Chemistry", "Lab Techniques", "Research Guidance"],
      subjects: ["Chemistry"],
      experience: "10+ years", qualification: "Ph.D. in Organic Chemistry",
      rating: 4.6, reviewCount: 145, totalSessions: 850,
      bio: "Research scientist turned educator. Makes organic chemistry easy with real-life examples and innovative teaching methods.",
      achievements: ["Research Publications", "Best Female Educator 2023", "Innovation in Teaching Award"],
      isOnline: true, isPremium: false, price: 0,
      nextAvailable: "Today, 5:30 PM",
      languages: ["English", "Hindi", "Telugu"],
      sessionTypes: ["one-on-one", "group", "doubt"],
    },
  ];

  const sessions: Session[] = [
    { id: 1, mentorId: 1, mentorName: "Dr. Rajesh Gupta", mentorAvatar: "RG", type: "one-on-one", topic: "Physics Doubt Resolution - Mechanics", subject: "Physics", date: "2026-03-12", time: "04:00 PM", endTime: "05:00 PM", duration: "1 hour", status: "upcoming", notes: "Prepare questions on Newton's Laws and Friction topics." },
    { id: 2, mentorId: 2, mentorName: "Mrs. Meera Desai", mentorAvatar: "MD", type: "mock", topic: "Mock Interview - Engineering College", subject: "English", date: "2026-03-15", time: "11:00 AM", endTime: "11:45 AM", duration: "45 min", status: "upcoming" },
    { id: 3, mentorId: 3, mentorName: "Mr. Vikram Patel", mentorAvatar: "VP", type: "doubt", topic: "Trigonometry Doubt Session", subject: "Mathematics", date: "2026-03-10", time: "06:00 PM", endTime: "07:00 PM", duration: "1 hour", status: "completed", recording: "https://example.com/recording3", rating: 5, feedback: "Excellent session! All my doubts were cleared." },
    { id: 4, mentorId: 1, mentorName: "Dr. Rajesh Gupta", mentorAvatar: "RG", type: "career", topic: "Engineering Career Path Guidance", subject: "Career Counseling", date: "2026-03-08", time: "02:00 PM", endTime: "03:00 PM", duration: "1 hour", status: "completed", recording: "https://example.com/recording4", rating: 5, feedback: "Very insightful session about different engineering branches." },
    { id: 5, mentorId: 4, mentorName: "Dr. Sneha Kapoor", mentorAvatar: "SK", type: "one-on-one", topic: "NEET Biology Strategy Session", subject: "Biology", date: "2026-03-18", time: "03:00 PM", endTime: "04:00 PM", duration: "1 hour", status: "upcoming" },
    { id: 6, mentorId: 2, mentorName: "Mrs. Meera Desai", mentorAvatar: "MD", type: "group", topic: "Group Discussion Practice", subject: "English", date: "2026-03-14", time: "10:00 AM", endTime: "11:30 AM", duration: "1.5 hours", status: "upcoming", participants: 8, maxParticipants: 12 },
    { id: 7, mentorId: 5, mentorName: "Mrs. Priya Reddy", mentorAvatar: "PR", type: "doubt", topic: "Organic Chemistry Mechanisms", subject: "Chemistry", date: "2026-03-06", time: "05:30 PM", endTime: "06:30 PM", duration: "1 hour", status: "completed", rating: 4, feedback: "Good session. Some topics need more time." },
    { id: 8, mentorId: 3, mentorName: "Mr. Vikram Patel", mentorAvatar: "VP", type: "group", topic: "Mathematics Problem Solving Workshop", subject: "Mathematics", date: "2026-03-20", time: "05:00 PM", endTime: "06:30 PM", duration: "1.5 hours", status: "upcoming", participants: 15, maxParticipants: 20 },
  ];

  const timeSlots = [
    "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
    "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM",
    "05:00 PM", "05:30 PM", "06:00 PM", "07:00 PM",
  ];

  const sessionTypes = [
    { id: "one-on-one", label: "1-on-1 Session", icon: User, desc: "Personal guidance" },
    { id: "group", label: "Group Session", icon: UsersIcon, desc: "Collaborative learning" },
    { id: "career", label: "Career Counseling", icon: Briefcase, desc: "Future planning" },
    { id: "doubt", label: "Doubt Resolution", icon: Zap, desc: "Clear your doubts" },
    { id: "mock", label: "Mock Interview", icon: Target, desc: "Interview practice" },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "upcoming":
        return <span className="flex items-center gap-1 bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full text-xs font-semibold"><Clock size={12} /> Upcoming</span>;
      case "live":
        return <span className="flex items-center gap-1 bg-red-50 text-red-700 px-2.5 py-1 rounded-full text-xs font-semibold animate-pulse"><span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span> Live</span>;
      case "completed":
        return <span className="flex items-center gap-1 bg-green-50 text-green-700 px-2.5 py-1 rounded-full text-xs font-semibold"><CheckCircle size={12} /> Completed</span>;
      case "cancelled":
        return <span className="flex items-center gap-1 bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full text-xs font-semibold"><X size={12} /> Cancelled</span>;
    }
  };

  const getTypeIcon = (type: string) => {
    const icons: { [key: string]: any } = {
      "one-on-one": User, "group": UsersIcon, "career": Briefcase,
      "doubt": Zap, "mock": Target, "ptm": Users,
    };
    return icons[type] || User;
  };

  const upcomingSessions = sessions.filter(s => s.status === "upcoming" || s.status === "live");
  const pastSessions = sessions.filter(s => s.status === "completed");

  const stats = {
    totalSessions: sessions.length,
    upcoming: upcomingSessions.length,
    completed: pastSessions.length,
    totalHours: 12,
    avgRating: 4.7,
    favoriteMentor: "Dr. Rajesh Gupta",
  };

  return (
    <DashboardLayout
      title="Mentor Sessions"
      subtitle={`${stats.upcoming} upcoming • ${stats.completed} completed sessions`}
      sidebarItems={sidebarItems}
      userInfo={
        <div className="flex items-center gap-2">
          <span className="bg-purple-100 text-purple-700 px-3 py-1.5 rounded-full text-sm font-medium flex items-center gap-1">
            <Star size={14} className="fill-purple-500 text-purple-500" />{stats.avgRating} Rating
          </span>
        </div>
      }
    >
      <div className="space-y-6">
        {/* Top Tabs */}
        <div className="flex gap-1 bg-gray-100 rounded-2xl p-1.5 overflow-x-auto">
          {[
            { id: "mentors", label: "👨‍🏫 Mentors", icon: Users },
            { id: "upcoming", label: "📅 Upcoming", icon: Calendar },
            { id: "history", label: "📜 History", icon: History },
            { id: "book", label: "📝 Book Session", icon: BookOpen },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-all whitespace-nowrap ${
                activeTab === tab.id ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <tab.icon size={16} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
          {[
            { label: "Total Sessions", value: stats.totalSessions, icon: Video, color: "text-blue-600", bg: "bg-blue-50" },
            { label: "Upcoming", value: stats.upcoming, icon: Calendar, color: "text-purple-600", bg: "bg-purple-50" },
            { label: "Completed", value: stats.completed, icon: CheckCircle, color: "text-green-600", bg: "bg-green-50" },
            { label: "Hours", value: `${stats.totalHours}h`, icon: Clock, color: "text-orange-600", bg: "bg-orange-50" },
            { label: "Avg Rating", value: stats.avgRating, icon: Star, color: "text-yellow-600", bg: "bg-yellow-50" },
            { label: "Top Mentor", value: "Dr. Gupta", icon: Award, color: "text-pink-600", bg: "bg-pink-50" },
          ].map((stat, i) => (
            <div key={i} className={`${stat.bg} rounded-2xl p-3 text-center`}>
              <stat.icon size={18} className={`${stat.color} mx-auto mb-1`} />
              <p className={`text-lg font-bold ${stat.color}`}>{stat.value}</p>
              <p className="text-[10px] text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Mentors Tab */}
        {activeTab === "mentors" && (
          <div className="space-y-4">
            {/* Search & Filter */}
            <div className="flex gap-3">
              <div className="relative flex-1">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search mentors by name, expertise..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-2xl text-sm focus:outline-none focus:border-purple-400 transition-all"
                />
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-2 px-4 py-3 rounded-2xl border text-sm font-medium transition-all ${
                  showFilters ? "bg-purple-50 border-purple-300 text-purple-700" : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
                }`}
              >
                <Filter size={18} /> Filters
              </button>
            </div>

            {/* Mentor Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {mentors.map((mentor) => (
                <div
                  key={mentor.id}
                  onClick={() => setSelectedMentor(mentor)}
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-xl transition-all cursor-pointer group hover:-translate-y-1"
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="relative">
                      <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                        {mentor.avatar}
                      </div>
                      {mentor.isOnline && (
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white"></div>
                      )}
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      {mentor.isPremium && (
                        <span className="bg-yellow-100 text-yellow-700 text-[10px] px-2 py-0.5 rounded-full font-bold">⭐ PREMIUM</span>
                      )}
                      <div className="flex items-center gap-1">
                        <Star size={14} className="text-yellow-500 fill-yellow-500" />
                        <span className="text-sm font-bold text-gray-900">{mentor.rating}</span>
                        <span className="text-xs text-gray-400">({mentor.reviewCount})</span>
                      </div>
                    </div>
                  </div>

                  {/* Info */}
                  <h3 className="font-bold text-gray-900 text-lg mb-1">{mentor.name}</h3>
                  <p className="text-sm text-purple-600 font-medium mb-3">{mentor.role}</p>

                  {/* Expertise Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {mentor.expertise.map((exp, i) => (
                      <span key={i} className="px-2.5 py-1 bg-gray-50 text-gray-600 rounded-lg text-xs">
                        {exp}
                      </span>
                    ))}
                  </div>

                  {/* Bottom Info */}
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Briefcase size={12} />
                      <span>{mentor.experience}</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <GraduationCap size={12} />
                      <span>{mentor.qualification.split(",")[0]}</span>
                    </div>
                  </div>

                  {/* Book Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedMentor(mentor);
                      setShowBookingModal(true);
                      setBookingStep(1);
                    }}
                    className="w-full mt-4 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-medium text-sm hover:shadow-lg transition-all"
                  >
                    Book Session {mentor.isPremium ? `• ₹${mentor.price}/hr` : "• Free"}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Upcoming Sessions Tab */}
        {activeTab === "upcoming" && (
          <div className="space-y-4">
            {upcomingSessions.length > 0 ? (
              upcomingSessions.map((session) => {
                const TypeIcon = getTypeIcon(session.type);
                return (
                  <div
                    key={session.id}
                    onClick={() => { setSelectedSession(session); setShowSessionDetail(true); }}
                    className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-all cursor-pointer group"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center text-white font-bold shadow-lg">
                        {session.mentorAvatar}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-1">
                          <div>
                            <h3 className="font-bold text-gray-900">{session.topic}</h3>
                            <p className="text-sm text-gray-600">{session.mentorName} • {session.subject}</p>
                          </div>
                          {getStatusBadge(session.status)}
                        </div>
                        <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
                          <span className="flex items-center gap-1"><CalendarIcon size={14} /> {new Date(session.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
                          <span className="flex items-center gap-1"><Clock size={14} /> {session.time} - {session.endTime}</span>
                          <span className="flex items-center gap-1"><TypeIcon size={14} /> {session.type.replace("-", " ")}</span>
                          {session.participants && (
                            <span className="flex items-center gap-1"><UsersIcon size={14} /> {session.participants}/{session.maxParticipants}</span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {session.status === "live" ? (
                          <button className="px-4 py-2 bg-red-500 text-white rounded-xl text-sm font-medium hover:bg-red-600 transition-colors flex items-center gap-1">
                            <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span> Join
                          </button>
                        ) : (
                          <button className="px-4 py-2 bg-purple-600 text-white rounded-xl text-sm font-medium hover:bg-purple-700 transition-colors">
                            Join
                          </button>
                        )}
                        <ChevronRight size={18} className="text-gray-400 group-hover:text-purple-600 transition-colors" />
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-16">
                <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Calendar size={40} className="text-gray-400" />
                </div>
                <p className="text-gray-600 text-lg font-medium">No upcoming sessions</p>
                <p className="text-gray-400 text-sm mt-1">Book a session with a mentor</p>
                <button
                  onClick={() => setActiveTab("mentors")}
                  className="mt-4 px-6 py-2.5 bg-purple-600 text-white rounded-xl font-medium hover:bg-purple-700 transition-colors"
                >
                  Browse Mentors
                </button>
              </div>
            )}
          </div>
        )}

        {/* History Tab */}
        {activeTab === "history" && (
          <div className="space-y-4">
            {pastSessions.map((session) => (
              <div
                key={session.id}
                onClick={() => { setSelectedSession(session); setShowSessionDetail(true); }}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-all cursor-pointer group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-gray-300 to-gray-400 rounded-2xl flex items-center justify-center text-white font-bold">
                    {session.mentorAvatar}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-1">
                      <div>
                        <h3 className="font-bold text-gray-900">{session.topic}</h3>
                        <p className="text-sm text-gray-600">{session.mentorName} • {session.subject}</p>
                      </div>
                      {getStatusBadge(session.status)}
                    </div>
                    <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
                      <span className="flex items-center gap-1"><CalendarIcon size={14} /> {new Date(session.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
                      <span className="flex items-center gap-1"><Clock size={14} /> {session.time}</span>
                    </div>
                    {session.rating && (
                      <div className="flex items-center gap-1 mt-2">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={14} className={i < (session.rating || 0) ? "text-yellow-500 fill-yellow-500" : "text-gray-300"} />
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    {session.recording && (
                      <button className="p-2 hover:bg-purple-50 rounded-xl text-purple-600 transition-colors" title="Watch Recording">
                        <Play size={18} />
                      </button>
                    )}
                    <ChevronRight size={18} className="text-gray-400 group-hover:text-purple-600 transition-colors" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Book Session Tab */}
        {activeTab === "book" && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Book a Mentor Session</h2>
            
            {/* Session Type Selection */}
            <div className="mb-6">
              <p className="text-sm font-semibold text-gray-500 mb-3">Select Session Type</p>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {sessionTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setSelectedType(type.id)}
                    className={`p-4 rounded-2xl border-2 text-center transition-all ${
                      selectedType === type.id
                        ? "border-purple-400 bg-purple-50"
                        : "border-gray-100 hover:border-gray-200"
                    }`}
                  >
                    <type.icon size={24} className={`mx-auto mb-2 ${selectedType === type.id ? "text-purple-600" : "text-gray-400"}`} />
                    <p className="text-sm font-semibold text-gray-900">{type.label}</p>
                    <p className="text-xs text-gray-500">{type.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Book Suggestion */}
            <div className="p-5 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl border border-purple-100">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles size={18} className="text-purple-600" />
                <span className="font-semibold text-purple-700">Recommended for You</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {mentors.slice(0, 2).map((mentor) => (
                  <div
                    key={mentor.id}
                    onClick={() => { setSelectedMentor(mentor); setShowBookingModal(true); setBookingStep(2); }}
                    className="flex items-center gap-3 p-3 bg-white rounded-xl cursor-pointer hover:shadow-md transition-all"
                  >
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-500 rounded-xl flex items-center justify-center text-white font-bold text-sm">
                      {mentor.avatar}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">{mentor.name}</p>
                      <p className="text-xs text-gray-500">{mentor.expertise[0]}</p>
                    </div>
                    <span className="ml-auto text-xs text-green-600 font-medium">Available {mentor.nextAvailable}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Mentor Detail Modal */}
      {selectedMentor && !showBookingModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setSelectedMentor(null)}>
          <div className="bg-white rounded-3xl max-w-lg w-full max-h-[85vh] overflow-y-auto shadow-2xl animate-scaleIn" onClick={(e) => e.stopPropagation()}>
            <div className="relative h-32 bg-gradient-to-r from-purple-500 to-pink-500 rounded-t-3xl">
              <button onClick={() => setSelectedMentor(null)} className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/30 rounded-xl text-white">
                <X size={20} />
              </button>
            </div>

            <div className="px-6 pb-6 -mt-12">
              <div className="flex items-end gap-4 mb-4">
                <div className="relative">
                  <div className="w-24 h-24 bg-gradient-to-br from-purple-400 to-pink-500 rounded-3xl flex items-center justify-center text-white text-4xl font-bold shadow-xl border-4 border-white">
                    {selectedMentor.avatar}
                  </div>
                  {selectedMentor.isOnline && (
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-4 border-white"></div>
                  )}
                </div>
                <div className="mb-2">
                  <h2 className="text-2xl font-bold text-gray-900">{selectedMentor.name}</h2>
                  <p className="text-purple-600 font-medium">{selectedMentor.role}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center gap-1">
                  <Star size={16} className="text-yellow-500 fill-yellow-500" />
                  <span className="font-bold text-gray-900">{selectedMentor.rating}</span>
                  <span className="text-gray-500">({selectedMentor.reviewCount} reviews)</span>
                </div>
                <span className="text-gray-300">|</span>
                <span className="text-gray-600">{selectedMentor.totalSessions}+ sessions</span>
              </div>

              <p className="text-sm text-gray-600 mb-4">{selectedMentor.bio}</p>

              <div className="flex flex-wrap gap-2 mb-4">
                {selectedMentor.expertise.map((exp, i) => (
                  <span key={i} className="px-3 py-1.5 bg-purple-50 text-purple-700 rounded-xl text-sm font-medium">{exp}</span>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="p-3 bg-gray-50 rounded-xl">
                  <p className="text-xs text-gray-500">Experience</p>
                  <p className="font-semibold text-gray-900">{selectedMentor.experience}</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-xl">
                  <p className="text-xs text-gray-500">Qualification</p>
                  <p className="font-semibold text-gray-900 text-sm">{selectedMentor.qualification}</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-xl">
                  <p className="text-xs text-gray-500">Languages</p>
                  <p className="font-semibold text-gray-900">{selectedMentor.languages.join(", ")}</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-xl">
                  <p className="text-xs text-gray-500">Next Available</p>
                  <p className="font-semibold text-green-600">{selectedMentor.nextAvailable}</p>
                </div>
              </div>

              <div className="mb-4">
                <h3 className="font-semibold text-gray-900 mb-2">🏆 Achievements</h3>
                {selectedMentor.achievements.map((ach, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-gray-600 py-1">
                    <Award size={14} className="text-yellow-500" />
                    {ach}
                  </div>
                ))}
              </div>

              <button
                onClick={() => { setShowBookingModal(true); setBookingStep(1); }}
                className="w-full py-3.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-bold text-lg hover:shadow-xl transition-all"
              >
                Book Session {selectedMentor.isPremium ? `• ₹${selectedMentor.price}/hr` : "• Free"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Booking Modal */}
      {showBookingModal && selectedMentor && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => { setShowBookingModal(false); setBookingStep(1); }}>
          <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl animate-scaleIn" onClick={(e) => e.stopPropagation()}>
            <div className="p-6">
              {/* Steps Indicator */}
              <div className="flex items-center gap-2 mb-6">
                {[1, 2, 3].map((step) => (
                  <div key={step} className="flex items-center gap-2 flex-1">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      bookingStep >= step ? "bg-purple-600 text-white" : "bg-gray-200 text-gray-500"
                    }`}>
                      {step}
                    </div>
                    {step < 3 && <div className={`flex-1 h-1 rounded ${bookingStep > step ? "bg-purple-600" : "bg-gray-200"}`}></div>}
                  </div>
                ))}
              </div>

              {bookingStep === 1 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-gray-900">Select Session Type</h3>
                  {sessionTypes.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => { setSelectedType(type.id); setBookingStep(2); }}
                      className="w-full flex items-center gap-4 p-4 rounded-2xl border-2 border-gray-100 hover:border-purple-300 hover:bg-purple-50 transition-all text-left"
                    >
                      <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                        <type.icon size={20} className="text-purple-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{type.label}</p>
                        <p className="text-sm text-gray-500">{type.desc}</p>
                      </div>
                      <ChevronRight size={18} className="text-gray-400 ml-auto" />
                    </button>
                  ))}
                </div>
              )}

              {bookingStep === 2 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-gray-900">Select Date & Time</h3>
                  <div className="p-4 bg-gray-50 rounded-2xl">
                    <p className="text-sm text-gray-600 mb-2">Mentor: <span className="font-bold text-gray-900">{selectedMentor.name}</span></p>
                    <p className="text-sm text-gray-600">Type: <span className="font-bold text-purple-600">{selectedType.replace("-", " ")}</span></p>
                  </div>

                  {/* Date Picker */}
                  <div>
                    <p className="text-sm font-semibold text-gray-700 mb-2">Date</p>
                    <div className="grid grid-cols-4 gap-2">
                      {["Mar 12", "Mar 13", "Mar 14", "Mar 15", "Mar 16", "Mar 17", "Mar 18", "Mar 19"].map((date) => (
                        <button
                          key={date}
                          onClick={() => setSelectedDate(date)}
                          className={`py-2.5 rounded-xl text-sm font-medium transition-all ${
                            selectedDate === date ? "bg-purple-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          }`}
                        >
                          {date}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Time Slots */}
                  <div>
                    <p className="text-sm font-semibold text-gray-700 mb-2">Available Time Slots</p>
                    <div className="grid grid-cols-3 gap-2">
                      {timeSlots.slice(0, 9).map((time) => (
                        <button
                          key={time}
                          onClick={() => setSelectedTime(time)}
                          className={`py-2 rounded-xl text-sm font-medium transition-all ${
                            selectedTime === time ? "bg-purple-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => setBookingStep(3)}
                    disabled={!selectedDate || !selectedTime}
                    className="w-full py-3 bg-purple-600 text-white rounded-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-purple-700 transition-colors"
                  >
                    Continue
                  </button>
                </div>
              )}

              {bookingStep === 3 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-gray-900">Confirm Booking</h3>
                  
                  <div className="p-5 bg-purple-50 rounded-2xl space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Mentor</span>
                      <span className="font-bold text-gray-900">{selectedMentor.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Session Type</span>
                      <span className="font-medium text-purple-600 capitalize">{selectedType.replace("-", " ")}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Date</span>
                      <span className="font-medium text-gray-900">{selectedDate}, 2026</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Time</span>
                      <span className="font-medium text-gray-900">{selectedTime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Duration</span>
                      <span className="font-medium text-gray-900">1 Hour</span>
                    </div>
                    {selectedMentor.isPremium && (
                      <div className="flex justify-between pt-3 border-t border-purple-200">
                        <span className="text-gray-600">Price</span>
                        <span className="font-bold text-purple-700">₹{selectedMentor.price}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-3">
                    <button onClick={() => setBookingStep(2)} className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200 transition-colors">
                      Back
                    </button>
                    <button
                      onClick={() => {
                        setShowBookingModal(false);
                        setBookingStep(1);
                        setActiveTab("upcoming");
                        alert("✅ Session booked successfully! Check your upcoming sessions.");
                      }}
                      className="flex-1 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-bold hover:shadow-lg transition-all"
                    >
                      Confirm Booking
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Session Detail Modal */}
      {showSessionDetail && selectedSession && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowSessionDetail(false)}>
          <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl animate-scaleIn" onClick={(e) => e.stopPropagation()}>
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center text-white font-bold">
                    {selectedSession.mentorAvatar}
                  </div>
                  <div>
                    <h2 className="font-bold text-gray-900">{selectedSession.topic}</h2>
                    <p className="text-sm text-gray-600">{selectedSession.mentorName}</p>
                  </div>
                </div>
                <button onClick={() => setShowSessionDetail(false)} className="p-2 hover:bg-gray-100 rounded-xl">
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <span className="text-gray-600">Status</span>
                  {getStatusBadge(selectedSession.status)}
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <span className="text-gray-600">Date</span>
                  <span className="font-medium">{new Date(selectedSession.date).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <span className="text-gray-600">Time</span>
                  <span className="font-medium">{selectedSession.time} - {selectedSession.endTime}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <span className="text-gray-600">Type</span>
                  <span className="font-medium capitalize">{selectedSession.type.replace("-", " ")}</span>
                </div>
              </div>

              {selectedSession.notes && (
                <div className="p-4 bg-blue-50 rounded-xl mb-4">
                  <p className="text-xs text-gray-500 mb-1">📝 Your Notes</p>
                  <p className="text-sm text-gray-700">{selectedSession.notes}</p>
                </div>
              )}

              {selectedSession.feedback && (
                <div className="p-4 bg-green-50 rounded-xl mb-4">
                  <p className="text-xs text-gray-500 mb-1">💬 Your Feedback</p>
                  <p className="text-sm text-gray-700 italic">"{selectedSession.feedback}"</p>
                </div>
              )}

              {selectedSession.status === "upcoming" && (
                <button className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-bold hover:shadow-lg transition-all">
                  Join Session
                </button>
              )}

              {selectedSession.recording && (
                <button className="w-full py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 mt-2">
                  <Play size={16} /> Watch Recording
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-scaleIn {
          animation: scaleIn 0.2s ease-out;
        }
      `}</style>
    </DashboardLayout>
  );
}