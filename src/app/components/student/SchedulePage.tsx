// SchedulePage.tsx - Premium iOS-Style Interactive Schedule (FULL CODE)
import { useState } from "react";
import { useNavigate } from "react-router";
import { 
  ChevronLeft, 
  ChevronRight, 
  Calendar as CalendarIcon, 
  Clock, 
  Video, 
  Users, 
  Filter,
  Bell,
  User,
  ChevronRight as ChevronRightIcon,
  X,
  Sparkles,
  Zap,
  Star
} from "lucide-react";

type ViewType = "week" | "day" | "agenda";

interface ClassEvent {
  id: number;
  subject: string;
  teacher: string;
  teacherAvatar: string;
  topic: string;
  chapter: string;
  time: string;
  endTime: string;
  duration: string;
  type: "live" | "upcoming" | "recorded" | "test" | "doubt" | "mentor";
  color: string;
  bgColor: string;
  date: string;
  dayName: string;
  participants: number;
  maxParticipants: number;
  isMandatory: boolean;
}

export function SchedulePage() {
  const navigate = useNavigate();
  const [view, setView] = useState<ViewType>("week");
  const [currentDate, setCurrentDate] = useState(new Date("2026-03-11"));
  const [selectedEvent, setSelectedEvent] = useState<ClassEvent | null>(null);
  const [filterSubject, setFilterSubject] = useState<string>("all");
  const [filterType, setFilterType] = useState<string>("all");
  const [showFilters, setShowFilters] = useState(false);

  const weeklySchedule: ClassEvent[] = [
    // Monday
    {
      id: 1, subject: "Mathematics", teacher: "Mr. Anil Sharma", teacherAvatar: "AS",
      topic: "Quadratic Equations - Nature of Roots", chapter: "Chapter 4: Quadratic Equations",
      time: "09:00 AM", endTime: "10:15 AM", duration: "1h 15m",
      type: "live", color: "blue", bgColor: "from-blue-500 to-blue-600",
      date: "2026-03-11", dayName: "Monday",
      participants: 42, maxParticipants: 50, isMandatory: true
    },
    {
      id: 2, subject: "Physics", teacher: "Dr. Rajesh Gupta", teacherAvatar: "RG",
      topic: "Newton's Laws of Motion - Applications", chapter: "Chapter 5: Laws of Motion",
      time: "11:00 AM", endTime: "12:30 PM", duration: "1h 30m",
      type: "live", color: "purple", bgColor: "from-purple-500 to-purple-600",
      date: "2026-03-11", dayName: "Monday",
      participants: 38, maxParticipants: 50, isMandatory: true
    },
    {
      id: 3, subject: "Mentoring", teacher: "Dr. Rajesh Gupta", teacherAvatar: "RG",
      topic: "Engineering Career Path Guidance", chapter: "Career Counseling",
      time: "02:00 PM", endTime: "03:00 PM", duration: "1h",
      type: "mentor", color: "green", bgColor: "from-green-500 to-emerald-600",
      date: "2026-03-11", dayName: "Monday",
      participants: 25, maxParticipants: 30, isMandatory: false
    },
    {
      id: 4, subject: "Doubt Session", teacher: "Mr. Vikram Patel", teacherAvatar: "VP",
      topic: "Algebra & Geometry Doubts", chapter: "Multiple Chapters",
      time: "05:00 PM", endTime: "06:00 PM", duration: "1h",
      type: "doubt", color: "orange", bgColor: "from-orange-500 to-orange-600",
      date: "2026-03-11", dayName: "Monday",
      participants: 15, maxParticipants: 25, isMandatory: false
    },
    // Tuesday
    {
      id: 5, subject: "Chemistry", teacher: "Mrs. Priya Reddy", teacherAvatar: "PR",
      topic: "Organic Compounds - Functional Groups", chapter: "Chapter 12: Organic Chemistry",
      time: "08:00 AM", endTime: "09:30 AM", duration: "1h 30m",
      type: "live", color: "emerald", bgColor: "from-emerald-500 to-teal-600",
      date: "2026-03-12", dayName: "Tuesday",
      participants: 40, maxParticipants: 50, isMandatory: true
    },
    {
      id: 6, subject: "Biology", teacher: "Dr. Sneha Kapoor", teacherAvatar: "SK",
      topic: "Cell Structure & Functions", chapter: "Chapter 8: Cell Biology",
      time: "10:00 AM", endTime: "11:00 AM", duration: "1h",
      type: "live", color: "pink", bgColor: "from-pink-500 to-rose-600",
      date: "2026-03-12", dayName: "Tuesday",
      participants: 35, maxParticipants: 50, isMandatory: true
    },
    {
      id: 7, subject: "Mathematics", teacher: "Mr. Anil Sharma", teacherAvatar: "AS",
      topic: "Quadratic Equations - Test", chapter: "Chapter 4: Quadratic Equations",
      time: "12:00 PM", endTime: "01:30 PM", duration: "1h 30m",
      type: "test", color: "red", bgColor: "from-red-500 to-red-600",
      date: "2026-03-12", dayName: "Tuesday",
      participants: 45, maxParticipants: 50, isMandatory: true
    },
    {
      id: 8, subject: "English", teacher: "Mrs. Meera Desai", teacherAvatar: "MD",
      topic: "Reading Comprehension Techniques", chapter: "English Proficiency",
      time: "03:00 PM", endTime: "04:00 PM", duration: "1h",
      type: "live", color: "indigo", bgColor: "from-indigo-500 to-indigo-600",
      date: "2026-03-12", dayName: "Tuesday",
      participants: 30, maxParticipants: 50, isMandatory: false
    },
    // Wednesday
    {
      id: 9, subject: "Physics", teacher: "Dr. Rajesh Gupta", teacherAvatar: "RG",
      topic: "Friction & Circular Motion", chapter: "Chapter 5: Laws of Motion",
      time: "09:00 AM", endTime: "10:30 AM", duration: "1h 30m",
      type: "live", color: "purple", bgColor: "from-purple-500 to-purple-600",
      date: "2026-03-13", dayName: "Wednesday",
      participants: 37, maxParticipants: 50, isMandatory: true
    },
    {
      id: 10, subject: "Chemistry Lab", teacher: "Mrs. Priya Reddy", teacherAvatar: "PR",
      topic: "Titration Experiments - Virtual Lab", chapter: "Practical Chemistry",
      time: "11:00 AM", endTime: "12:30 PM", duration: "1h 30m",
      type: "live", color: "emerald", bgColor: "from-emerald-500 to-teal-600",
      date: "2026-03-13", dayName: "Wednesday",
      participants: 32, maxParticipants: 40, isMandatory: true
    },
    {
      id: 11, subject: "Doubt Session", teacher: "All Teachers", teacherAvatar: "ALL",
      topic: "Weekly Doubt Resolution", chapter: "All Subjects",
      time: "02:00 PM", endTime: "03:30 PM", duration: "1h 30m",
      type: "doubt", color: "orange", bgColor: "from-orange-500 to-orange-600",
      date: "2026-03-13", dayName: "Wednesday",
      participants: 20, maxParticipants: 30, isMandatory: false
    },
    // Thursday
    {
      id: 12, subject: "Mathematics", teacher: "Mr. Anil Sharma", teacherAvatar: "AS",
      topic: "Arithmetic Progressions - Part 1", chapter: "Chapter 5: AP",
      time: "08:00 AM", endTime: "09:00 AM", duration: "1h",
      type: "live", color: "blue", bgColor: "from-blue-500 to-blue-600",
      date: "2026-03-14", dayName: "Thursday",
      participants: 41, maxParticipants: 50, isMandatory: true
    },
    {
      id: 13, subject: "Biology", teacher: "Dr. Sneha Kapoor", teacherAvatar: "SK",
      topic: "Plant Tissues & Systems", chapter: "Chapter 6: Plant Biology",
      time: "10:00 AM", endTime: "11:00 AM", duration: "1h",
      type: "live", color: "pink", bgColor: "from-pink-500 to-rose-600",
      date: "2026-03-14", dayName: "Thursday",
      participants: 33, maxParticipants: 50, isMandatory: true
    },
    {
      id: 14, subject: "Mentoring", teacher: "Mrs. Meera Desai", teacherAvatar: "MD",
      topic: "Communication Skills Workshop", chapter: "Soft Skills",
      time: "03:00 PM", endTime: "04:00 PM", duration: "1h",
      type: "mentor", color: "green", bgColor: "from-green-500 to-emerald-600",
      date: "2026-03-14", dayName: "Thursday",
      participants: 22, maxParticipants: 25, isMandatory: false
    },
    // Friday
    {
      id: 15, subject: "Physics", teacher: "Dr. Rajesh Gupta", teacherAvatar: "RG",
      topic: "Work, Energy & Power", chapter: "Chapter 6: Work & Energy",
      time: "09:00 AM", endTime: "10:30 AM", duration: "1h 30m",
      type: "live", color: "purple", bgColor: "from-purple-500 to-purple-600",
      date: "2026-03-15", dayName: "Friday",
      participants: 39, maxParticipants: 50, isMandatory: true
    },
    {
      id: 16, subject: "Chemistry", teacher: "Mrs. Priya Reddy", teacherAvatar: "PR",
      topic: "Chemical Bonding - Hybridization", chapter: "Chapter 4: Chemical Bonding",
      time: "11:00 AM", endTime: "12:00 PM", duration: "1h",
      type: "live", color: "emerald", bgColor: "from-emerald-500 to-teal-600",
      date: "2026-03-15", dayName: "Friday",
      participants: 36, maxParticipants: 50, isMandatory: true
    },
    {
      id: 17, subject: "Parent-Teacher Meeting", teacher: "All Teachers", teacherAvatar: "ALL",
      topic: "Student Progress Discussion", chapter: "PTM",
      time: "04:00 PM", endTime: "06:00 PM", duration: "2h",
      type: "mentor", color: "yellow", bgColor: "from-yellow-500 to-amber-600",
      date: "2026-03-15", dayName: "Friday",
      participants: 50, maxParticipants: 50, isMandatory: true
    },
    // Saturday
    {
      id: 18, subject: "Mathematics", teacher: "Mr. Anil Sharma", teacherAvatar: "AS",
      topic: "Arithmetic Progressions - Part 2", chapter: "Chapter 5: AP",
      time: "09:00 AM", endTime: "10:00 AM", duration: "1h",
      type: "live", color: "blue", bgColor: "from-blue-500 to-blue-600",
      date: "2026-03-16", dayName: "Saturday",
      participants: 38, maxParticipants: 50, isMandatory: false
    },
    {
      id: 19, subject: "Test Series", teacher: "Exam Cell", teacherAvatar: "EX",
      topic: "Full Syllabus Mock Test - JEE Pattern", chapter: "Complete Syllabus",
      time: "10:30 AM", endTime: "01:30 PM", duration: "3h",
      type: "test", color: "red", bgColor: "from-red-500 to-red-600",
      date: "2026-03-16", dayName: "Saturday",
      participants: 48, maxParticipants: 50, isMandatory: true
    },
    // Sunday
    {
      id: 20, subject: "Doubt Session", teacher: "Mr. Vikram Patel", teacherAvatar: "VP",
      topic: "Maths & Physics Doubt Clearing", chapter: "Multiple Chapters",
      time: "10:00 AM", endTime: "12:00 PM", duration: "2h",
      type: "doubt", color: "orange", bgColor: "from-orange-500 to-orange-600",
      date: "2026-03-17", dayName: "Sunday",
      participants: 18, maxParticipants: 30, isMandatory: false
    },
  ];

  const getSubjectIcon = (subject: string) => {
    const icons: { [key: string]: string } = {
      "Mathematics": "📐", "Physics": "⚡", "Chemistry": "🧪",
      "Biology": "🧬", "English": "📖", "Mentoring": "🎯",
      "Doubt Session": "❓", "Test Series": "📝", "Chemistry Lab": "🔬",
      "Parent-Teacher Meeting": "👨‍👩‍👧",
    };
    return icons[subject] || "📚";
  };

  const getTypeLabel = (type: string) => {
    const labels: { [key: string]: string } = {
      live: "Live Class", upcoming: "Upcoming", recorded: "Recording",
      test: "Test/Exam", doubt: "Doubt Session", mentor: "Mentor Session",
    };
    return labels[type] || type;
  };

  const filteredSchedule = weeklySchedule.filter(event => {
    if (filterSubject !== "all" && event.subject !== filterSubject) return false;
    if (filterType !== "all" && event.type !== filterType) return false;
    return true;
  });

  const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const timeSlots = ["08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM"];
  const subjects = ["Mathematics", "Physics", "Chemistry", "Biology", "English", "Mentoring", "Doubt Session", "Test Series"];
  const types = ["live", "test", "doubt", "mentor"];

  const getEventsForDayTime = (day: string, time: string) => {
    return filteredSchedule.filter(event => event.dayName === day && event.time === time);
  };

  return (
    <div className="min-h-screen bg-[#F2F2F7]">
      {/* Floating Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl"></div>
      </div>

      {/* Header */}
      <div className="bg-white/80 backdrop-blur-xl border-b border-gray-200/50 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate("/student/dashboard")}
                className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
              >
                <ChevronLeft size={20} className="text-gray-600" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">My Schedule</h1>
                <p className="text-sm text-gray-500">Plan your learning journey</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`p-2.5 rounded-xl transition-all ${
                  showFilters ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100 text-gray-600'
                }`}
              >
                <Filter size={20} />
              </button>
              <button className="relative p-2.5 hover:bg-gray-100 rounded-xl transition-colors">
                <Bell size={20} className="text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
            </div>
          </div>

          {/* Filters */}
          {showFilters && (
            <div className="mb-4 p-4 bg-gray-50 rounded-2xl animate-slideDown">
              <div className="flex flex-wrap gap-3">
                <select
                  value={filterSubject}
                  onChange={(e) => setFilterSubject(e.target.value)}
                  className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-400"
                >
                  <option value="all">📚 All Subjects</option>
                  {subjects.map(sub => (
                    <option key={sub} value={sub}>{getSubjectIcon(sub)} {sub}</option>
                  ))}
                </select>
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-400"
                >
                  <option value="all">🎯 All Types</option>
                  {types.map(type => (
                    <option key={type} value={type}>{getTypeLabel(type)}</option>
                  ))}
                </select>
                <button
                  onClick={() => { setFilterSubject("all"); setFilterType("all"); }}
                  className="px-4 py-2 text-sm text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          )}

          {/* View & Navigation */}
          <div className="flex items-center justify-between">
            <div className="flex bg-gray-100 rounded-xl p-1 gap-1">
              {(["week", "day", "agenda"] as ViewType[]).map((viewType) => (
                <button
                  key={viewType}
                  onClick={() => setView(viewType)}
                  className={`px-5 py-2 rounded-lg font-medium text-sm capitalize transition-all ${
                    view === viewType
                      ? "bg-white text-gray-900 shadow-sm"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {viewType === "week" && "📅 Week"}
                  {viewType === "day" && "☀️ Day"}
                  {viewType === "agenda" && "📋 Agenda"}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  const newDate = new Date(currentDate);
                  newDate.setDate(newDate.getDate() - 7);
                  setCurrentDate(newDate);
                }}
                className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
              >
                <ChevronLeft size={20} className="text-gray-600" />
              </button>
              <span className="font-semibold text-gray-900 min-w-[180px] text-center">
                {currentDate.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
              </span>
              <button
                onClick={() => {
                  const newDate = new Date(currentDate);
                  newDate.setDate(newDate.getDate() + 7);
                  setCurrentDate(newDate);
                }}
                className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
              >
                <ChevronRight size={20} className="text-gray-600" />
              </button>
              <button
                onClick={() => setCurrentDate(new Date("2026-03-11"))}
                className="px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                Today
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-6 relative z-10">
        {/* Week View */}
        {view === "week" && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="grid grid-cols-8 border-b border-gray-100">
              <div className="p-4 bg-gray-50/50 font-medium text-sm text-gray-500 flex items-center justify-center">
                Time
              </div>
              {weekDays.map((day, index) => {
                const date = new Date("2026-03-11");
                date.setDate(date.getDate() + index);
                return (
                  <div key={index} className="p-4 bg-gray-50/50 text-center border-l border-gray-100">
                    <p className="text-xs font-medium text-gray-500 uppercase">{day.slice(0, 3)}</p>
                    <p className="text-xl font-bold text-gray-900 mt-1">{date.getDate()}</p>
                    <p className="text-xs text-gray-400">{date.toLocaleDateString("en-US", { month: "short" })}</p>
                  </div>
                );
              })}
            </div>
            <div className="grid grid-cols-8 overflow-auto max-h-[600px]">
              <div className="border-r border-gray-100">
                {timeSlots.map((time, index) => (
                  <div key={index} className="p-3 text-xs text-gray-500 border-b border-gray-50 h-20 flex items-center justify-center font-medium">
                    {time}
                  </div>
                ))}
              </div>
              {weekDays.map((day, dayIndex) => (
                <div key={dayIndex} className="border-r border-gray-100 last:border-r-0 relative">
                  {timeSlots.map((time, timeIndex) => {
                    const events = getEventsForDayTime(day, time);
                    return (
                      <div key={timeIndex} className="border-b border-gray-50 h-20 p-1 relative group">
                        {events.map((event) => (
                          <div
                            key={event.id}
                            onClick={() => setSelectedEvent(event)}
                            className={`bg-gradient-to-r ${event.bgColor} text-white p-2 rounded-lg text-xs cursor-pointer hover:shadow-lg hover:scale-[1.02] transition-all duration-200 absolute inset-1 z-10`}
                          >
                            <p className="font-bold truncate">{event.subject}</p>
                            <p className="text-[10px] opacity-90 truncate">{event.topic}</p>
                            <p className="text-[10px] opacity-80 truncate">{event.teacher}</p>
                          </div>
                        ))}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Day View */}
        {view === "day" && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              {weekDays[3]} • March 14, 2026
            </h2>
            <div className="space-y-3">
              {filteredSchedule.filter(e => e.dayName === "Thursday").map((event) => (
                <div
                  key={event.id}
                  onClick={() => setSelectedEvent(event)}
                  className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl hover:bg-blue-50/50 hover:border-blue-200 border border-transparent transition-all cursor-pointer group"
                >
                  <div className={`w-1 h-full min-h-[80px] rounded-full bg-gradient-to-b ${event.bgColor} self-stretch`}></div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-lg">{getSubjectIcon(event.subject)}</span>
                      <h3 className="font-bold text-gray-900">{event.subject}</h3>
                      {event.isMandatory && (
                        <span className="text-[10px] bg-red-100 text-red-600 px-2 py-0.5 rounded-full font-medium">Required</span>
                      )}
                    </div>
                    <p className="text-sm text-gray-700">{event.topic}</p>
                    <div className="flex items-center gap-4 mt-2">
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <User size={14} /><span>{event.teacher}</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <Clock size={14} /><span>{event.time} - {event.endTime}</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <Users size={14} /><span>{event.participants}/{event.maxParticipants}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Agenda View */}
        {view === "agenda" && (
          <div className="space-y-3">
            {weekDays.map((day, dayIndex) => {
              const date = new Date("2026-03-11");
              date.setDate(date.getDate() + dayIndex);
              const dayEvents = filteredSchedule.filter(e => e.dayName === day);
              if (dayEvents.length === 0) return null;
              
              return (
                <div key={dayIndex}>
                  <div className="flex items-center gap-3 mb-3 mt-6 first:mt-0">
                    <div className="bg-blue-600 text-white px-3 py-1 rounded-lg text-sm font-bold">
                      {date.getDate()}
                    </div>
                    <h3 className="font-bold text-gray-900">{day}</h3>
                    <span className="text-sm text-gray-500">
                      {date.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                    </span>
                    <span className="text-xs text-gray-400">• {dayEvents.length} classes</span>
                  </div>
                  {dayEvents.map((event) => (
                    <div
                      key={event.id}
                      onClick={() => setSelectedEvent(event)}
                      className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-all cursor-pointer group mb-3"
                    >
                      <div className="flex items-start gap-4">
                        <div className={`w-12 h-12 bg-gradient-to-br ${event.bgColor} rounded-2xl flex items-center justify-center text-white text-lg shadow-lg`}>
                          {getSubjectIcon(event.subject)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="text-lg font-bold text-gray-900">{event.subject}</h3>
                                <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
                                  event.type === 'live' ? 'bg-green-100 text-green-700' :
                                  event.type === 'test' ? 'bg-red-100 text-red-700' :
                                  event.type === 'doubt' ? 'bg-orange-100 text-orange-700' :
                                  'bg-blue-100 text-blue-700'
                                }`}>
                                  {getTypeLabel(event.type)}
                                </span>
                                {event.isMandatory && (
                                  <span className="text-[10px] bg-red-100 text-red-600 px-2 py-0.5 rounded-full font-medium">Required</span>
                                )}
                              </div>
                              <p className="text-sm text-gray-600">{event.topic}</p>
                              <p className="text-xs text-gray-500 mt-0.5">{event.chapter}</p>
                            </div>
                            <ChevronRightIcon className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                          </div>
                          <div className="flex items-center gap-4 mt-3 pt-3 border-t border-gray-100">
                            <div className="flex items-center gap-1.5 text-sm text-gray-600">
                              <User size={15} className="text-gray-400" />
                              <span className="font-medium">{event.teacher}</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-sm text-gray-600">
                              <Clock size={15} className="text-gray-400" />
                              <span>{event.time} - {event.endTime}</span>
                              <span className="text-xs text-gray-400">({event.duration})</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-sm text-gray-600">
                              <Users size={15} className="text-gray-400" />
                              <span>{event.participants}/{event.maxParticipants} enrolled</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        )}

        {/* Quick Stats */}
        <div className="mt-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-yellow-500" />
            Quick Stats
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <p className="text-3xl font-bold text-gray-900">{weeklySchedule.filter(e => e.type === 'live').length}</p>
              <p className="text-sm text-gray-500 mt-1">Live Classes This Week</p>
            </div>
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <p className="text-3xl font-bold text-red-600">{weeklySchedule.filter(e => e.type === 'test').length}</p>
              <p className="text-sm text-gray-500 mt-1">Tests Scheduled</p>
            </div>
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <p className="text-3xl font-bold text-orange-600">{weeklySchedule.filter(e => e.type === 'doubt').length}</p>
              <p className="text-sm text-gray-500 mt-1">Doubt Sessions</p>
            </div>
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <p className="text-3xl font-bold text-green-600">{weeklySchedule.filter(e => e.type === 'mentor').length}</p>
              <p className="text-sm text-gray-500 mt-1">Mentor Sessions</p>
            </div>
          </div>
        </div>
      </div>

      {/* Event Detail Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setSelectedEvent(null)}>
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl animate-scaleIn" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 bg-gradient-to-br ${selectedEvent.bgColor} rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg`}>
                  {getSubjectIcon(selectedEvent.subject)}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">{selectedEvent.subject}</h2>
                  <p className="text-sm text-gray-500">{getTypeLabel(selectedEvent.type)}</p>
                </div>
              </div>
              <button onClick={() => setSelectedEvent(null)} className="p-2 hover:bg-gray-100 rounded-xl">
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-2xl">
                <p className="font-semibold text-gray-900">{selectedEvent.topic}</p>
                <p className="text-sm text-gray-600 mt-1">{selectedEvent.chapter}</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <User size={16} className="text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">Teacher</p>
                    <p className="font-medium">{selectedEvent.teacher}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <Clock size={16} className="text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">Time</p>
                    <p className="font-medium">{selectedEvent.time} - {selectedEvent.endTime}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <CalendarIcon size={16} className="text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">Date</p>
                    <p className="font-medium">{selectedEvent.dayName}, {selectedEvent.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <Users size={16} className="text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">Participants</p>
                    <p className="font-medium">{selectedEvent.participants}/{selectedEvent.maxParticipants}</p>
                  </div>
                </div>
              </div>

              {selectedEvent.type === 'live' && (
                <button className={`w-full py-3 bg-gradient-to-r ${selectedEvent.bgColor} text-white rounded-xl font-bold text-lg hover:shadow-lg transition-all transform hover:scale-[1.02]`}>
                  Join Live Class Now
                </button>
              )}
              {selectedEvent.type === 'test' && (
                <button className="w-full py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl font-bold text-lg hover:shadow-lg transition-all">
                  Start Test
                </button>
              )}
              {selectedEvent.type === 'doubt' && (
                <button className="w-full py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-bold text-lg hover:shadow-lg transition-all">
                  Join Doubt Session
                </button>
              )}
              {selectedEvent.type === 'mentor' && (
                <button className="w-full py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-bold text-lg hover:shadow-lg transition-all">
                  Join Session
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}