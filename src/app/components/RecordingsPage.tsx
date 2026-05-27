// RecordingsPage.tsx - Premium iOS-Style Recordings Library
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
  Play,
  Clock,
  Eye,
  Download,
  Bookmark,
  Share2,
  MessageCircle,
  ThumbsUp,
  ChevronRight,
  ChevronLeft,
  X,
  Volume2,
  Maximize,
  SkipBack,
  SkipForward,
  Pause,
  BookOpen,
  Star,
  Sparkles,
  Timer,
  BarChart3,
  History,
  BookmarkPlus,
  MoreVertical,
  FileDown,
  Headphones,
} from "lucide-react";

interface Recording {
  id: number;
  title: string;
  subject: string;
  teacher: string;
  teacherAvatar: string;
  topic: string;
  chapter: string;
  thumbnail: string;
  duration: string;
  durationSeconds: number;
  date: string;
  views: number;
  watched: boolean;
  watchProgress: number;
  bookmarked: boolean;
  quality: string[];
  timestamps: { time: string; label: string }[];
  relatedNotes?: string;
}

export function RecordingsPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterSubject, setFilterSubject] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [selectedRecording, setSelectedRecording] = useState<Recording | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [showNotes, setShowNotes] = useState(false);
  const [userNotes, setUserNotes] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const sidebarItems = [
    { icon: Home, label: "Dashboard", path: "/student/dashboard" },
    { icon: Calendar, label: "My Classes", path: "/schedule" },
    { icon: TrendingUp, label: "My Progress", path: "/student/reports" },
    { icon: ClipboardList, label: "Assignments", path: "/student/assignments" },
    { icon: Video, label: "Recordings", active: true },
    { icon: Book, label: "Study Material", path: "/study-material" },
    { icon: Users, label: "Mentor Sessions", path: "/mentor-sessions" },
    { icon: Settings, label: "Settings", path: "/settings" },
];

  const recordings: Recording[] = [
    {
      id: 1,
      title: "Quadratic Equations - Nature of Roots",
      subject: "Mathematics",
      teacher: "Mr. Anil Sharma",
      teacherAvatar: "AS",
      topic: "Nature of Roots & Discriminant",
      chapter: "Chapter 4: Quadratic Equations",
      thumbnail: "math",
      duration: "1h 15m",
      durationSeconds: 4500,
      date: "2026-03-11",
      views: 245,
      watched: true,
      watchProgress: 100,
      bookmarked: true,
      quality: ["360p", "720p", "1080p"],
      timestamps: [
        { time: "00:00", label: "Introduction" },
        { time: "05:30", label: "Discriminant Formula" },
        { time: "15:45", label: "Nature of Roots" },
        { time: "35:20", label: "Example Problems" },
        { time: "55:00", label: "Practice Questions" },
        { time: "01:10:00", label: "Summary & Homework" },
      ],
    },
    {
      id: 2,
      title: "Newton's Laws of Motion - Part 1",
      subject: "Physics",
      teacher: "Dr. Rajesh Gupta",
      teacherAvatar: "RG",
      topic: "First & Second Law Applications",
      chapter: "Chapter 5: Laws of Motion",
      thumbnail: "physics",
      duration: "1h 30m",
      durationSeconds: 5400,
      date: "2026-03-10",
      views: 312,
      watched: true,
      watchProgress: 75,
      bookmarked: false,
      quality: ["360p", "720p", "1080p"],
      timestamps: [
        { time: "00:00", label: "Recap & Introduction" },
        { time: "08:00", label: "First Law Deep Dive" },
        { time: "25:00", label: "Second Law - F=ma" },
        { time: "50:00", label: "Free Body Diagrams" },
        { time: "01:15:00", label: "Numerical Problems" },
      ],
    },
    {
      id: 3,
      title: "Organic Chemistry - Functional Groups",
      subject: "Chemistry",
      teacher: "Mrs. Priya Reddy",
      teacherAvatar: "PR",
      topic: "Alcohols, Aldehydes & Ketones",
      chapter: "Chapter 12: Organic Chemistry",
      thumbnail: "chemistry",
      duration: "52m",
      durationSeconds: 3120,
      date: "2026-03-09",
      views: 189,
      watched: false,
      watchProgress: 0,
      bookmarked: false,
      quality: ["360p", "720p"],
      timestamps: [
        { time: "00:00", label: "Introduction to Functional Groups" },
        { time: "12:00", label: "Alcohols - Properties" },
        { time: "28:00", label: "Aldehydes & Ketones" },
        { time: "42:00", label: "Important Reactions" },
      ],
    },
    {
      id: 4,
      title: "Cell Structure & Functions",
      subject: "Biology",
      teacher: "Dr. Sneha Kapoor",
      teacherAvatar: "SK",
      topic: "Cell Organelles Deep Dive",
      chapter: "Chapter 8: Cell Biology",
      thumbnail: "biology",
      duration: "1h 05m",
      durationSeconds: 3900,
      date: "2026-03-08",
      views: 167,
      watched: false,
      watchProgress: 0,
      bookmarked: false,
      quality: ["360p", "720p", "1080p"],
      timestamps: [
        { time: "00:00", label: "Cell Theory" },
        { time: "15:00", label: "Cell Membrane" },
        { time: "30:00", label: "Mitochondria & ER" },
        { time: "48:00", label: "Nucleus & DNA" },
      ],
    },
    {
      id: 5,
      title: "Reading Comprehension Techniques",
      subject: "English",
      teacher: "Mrs. Meera Desai",
      teacherAvatar: "MD",
      topic: "Speed Reading & Analysis",
      chapter: "English Proficiency",
      thumbnail: "english",
      duration: "45m",
      durationSeconds: 2700,
      date: "2026-03-07",
      views: 134,
      watched: true,
      watchProgress: 100,
      bookmarked: true,
      quality: ["360p", "720p"],
      timestamps: [
        { time: "00:00", label: "Skimming Techniques" },
        { time: "15:00", label: "Finding Main Ideas" },
        { time: "30:00", label: "Practice Passage" },
      ],
    },
    {
      id: 6,
      title: "Chemical Bonding - Hybridization",
      subject: "Chemistry",
      teacher: "Mrs. Priya Reddy",
      teacherAvatar: "PR",
      topic: "sp, sp2, sp3 Hybridization",
      chapter: "Chapter 4: Chemical Bonding",
      thumbnail: "chemistry",
      duration: "1h 20m",
      durationSeconds: 4800,
      date: "2026-03-06",
      views: 278,
      watched: true,
      watchProgress: 40,
      bookmarked: false,
      quality: ["360p", "720p", "1080p"],
      timestamps: [
        { time: "00:00", label: "Orbital Theory Recap" },
        { time: "20:00", label: "sp3 Hybridization" },
        { time: "45:00", label: "sp2 & sp Hybridization" },
        { time: "01:05:00", label: "Examples & Practice" },
      ],
    },
    {
      id: 7,
      title: "Trigonometry - Heights & Distances",
      subject: "Mathematics",
      teacher: "Mr. Anil Sharma",
      teacherAvatar: "AS",
      topic: "Application Problems",
      chapter: "Chapter 9: Trigonometry Applications",
      thumbnail: "math",
      duration: "1h 10m",
      durationSeconds: 4200,
      date: "2026-03-05",
      views: 198,
      watched: false,
      watchProgress: 0,
      bookmarked: false,
      quality: ["360p", "720p"],
      timestamps: [
        { time: "00:00", label: "Angle of Elevation" },
        { time: "20:00", label: "Angle of Depression" },
        { time: "40:00", label: "Word Problems" },
        { time: "01:00:00", label: "Practice Set" },
      ],
    },
    {
      id: 8,
      title: "Work, Energy & Power",
      subject: "Physics",
      teacher: "Dr. Rajesh Gupta",
      teacherAvatar: "RG",
      topic: "Work-Energy Theorem",
      chapter: "Chapter 6: Work & Energy",
      thumbnail: "physics",
      duration: "1h 25m",
      durationSeconds: 5100,
      date: "2026-03-04",
      views: 223,
      watched: true,
      watchProgress: 60,
      bookmarked: false,
      quality: ["360p", "720p", "1080p"],
      timestamps: [
        { time: "00:00", label: "Work Definition" },
        { time: "18:00", label: "Kinetic Energy" },
        { time: "35:00", label: "Potential Energy" },
        { time: "55:00", label: "Work-Energy Theorem" },
        { time: "01:15:00", label: "Numerical Practice" },
      ],
    },
  ];

  const getSubjectColor = (subject: string) => {
    const colors: { [key: string]: string } = {
      Mathematics: "from-blue-500 to-blue-600",
      Physics: "from-purple-500 to-purple-600",
      Chemistry: "from-green-500 to-emerald-600",
      Biology: "from-orange-500 to-amber-600",
      English: "from-pink-500 to-rose-600",
    };
    return colors[subject] || "from-gray-500 to-gray-600";
  };

  const getSubjectIcon = (subject: string) => {
    const icons: { [key: string]: string } = {
      Mathematics: "📐", Physics: "⚡", Chemistry: "🧪",
      Biology: "🧬", English: "📖",
    };
    return icons[subject] || "📚";
  };

  const getThumbnailBg = (subject: string) => {
    const bgs: { [key: string]: string } = {
      Mathematics: "from-blue-400 via-blue-500 to-indigo-600",
      Physics: "from-purple-400 via-purple-500 to-violet-600",
      Chemistry: "from-emerald-400 via-green-500 to-teal-600",
      Biology: "from-orange-400 via-amber-500 to-yellow-600",
      English: "from-pink-400 via-rose-500 to-red-600",
    };
    return bgs[subject] || "from-gray-400 to-gray-600";
  };

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    if (hrs > 0) return `${hrs}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const filteredRecordings = recordings
    .filter((rec) => {
      if (activeTab === "all") return true;
      if (activeTab === "watched") return rec.watched;
      if (activeTab === "unwatched") return !rec.watched;
      if (activeTab === "bookmarked") return rec.bookmarked;
      return true;
    })
    .filter((rec) => {
      if (searchQuery === "") return true;
      return (
        rec.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        rec.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        rec.teacher.toLowerCase().includes(searchQuery.toLowerCase()) ||
        rec.topic.toLowerCase().includes(searchQuery.toLowerCase())
      );
    })
    .filter((rec) => {
      if (filterSubject === "all") return true;
      return rec.subject === filterSubject;
    })
    .sort((a, b) => {
      if (sortBy === "newest") return new Date(b.date).getTime() - new Date(a.date).getTime();
      if (sortBy === "oldest") return new Date(a.date).getTime() - new Date(b.date).getTime();
      if (sortBy === "popular") return b.views - a.views;
      if (sortBy === "duration") return b.durationSeconds - a.durationSeconds;
      return 0;
    });

  const stats = {
    total: recordings.length,
    watched: recordings.filter(r => r.watched).length,
    unwatched: recordings.filter(r => !r.watched).length,
    bookmarked: recordings.filter(r => r.bookmarked).length,
    totalHours: Math.round(recordings.reduce((sum, r) => sum + r.durationSeconds, 0) / 3600),
  };

  const continueWatching = recordings.filter(r => r.watchProgress > 0 && r.watchProgress < 100);
  const recentUploads = recordings.slice(0, 4);

  return (
    <DashboardLayout
      title="Recordings Library"
      subtitle={`${stats.total} recordings • ${stats.totalHours} hours of content`}
      sidebarItems={sidebarItems}
      userInfo={
        <div className="flex items-center gap-2">
          <span className="bg-purple-100 text-purple-700 px-3 py-1.5 rounded-full text-sm font-medium flex items-center gap-1">
            <Video size={14} />{stats.unwatched} New
          </span>
        </div>
      }
    >
      <div className="space-y-6">
        {/* Search & Filters */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[200px]">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search recordings by topic, subject, teacher..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-2xl text-sm focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100 transition-all"
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

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-3 bg-white border border-gray-200 rounded-2xl text-sm font-medium text-gray-700 focus:outline-none focus:border-purple-400"
          >
            <option value="newest">🆕 Newest First</option>
            <option value="oldest">📅 Oldest First</option>
            <option value="popular">🔥 Most Watched</option>
            <option value="duration">⏱️ Longest Duration</option>
          </select>
        </div>

        {/* Subject Filters */}
        {showFilters && (
          <div className="p-4 bg-white rounded-2xl border border-gray-100 animate-slideDown flex flex-wrap gap-3">
            <button
              onClick={() => setFilterSubject("all")}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                filterSubject === "all" ? "bg-purple-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              📚 All Subjects
            </button>
            {["Mathematics", "Physics", "Chemistry", "Biology", "English"].map((sub) => (
              <button
                key={sub}
                onClick={() => setFilterSubject(sub)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  filterSubject === sub ? "bg-purple-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {getSubjectIcon(sub)} {sub}
              </button>
            ))}
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-1 bg-gray-100 rounded-2xl p-1.5 overflow-x-auto">
          {[
            { id: "all", label: "All", icon: Video },
            { id: "unwatched", label: "Unwatched", icon: Play },
            { id: "watched", label: "Watched", icon: Eye },
            { id: "bookmarked", label: "Bookmarked", icon: Bookmark },
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

        {/* Continue Watching Section */}
        {continueWatching.length > 0 && activeTab === "all" && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <History size={20} className="text-purple-600" />
                Continue Watching
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {continueWatching.slice(0, 3).map((rec) => (
                <div
                  key={rec.id}
                  onClick={() => setSelectedRecording(rec)}
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden cursor-pointer group hover:shadow-lg transition-all hover:-translate-y-1"
                >
                  <div className={`relative h-40 bg-gradient-to-br ${getThumbnailBg(rec.subject)} flex items-center justify-center`}>
                    <span className="text-6xl">{getSubjectIcon(rec.subject)}</span>
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center">
                        <Play size={24} className="text-gray-900 ml-1" fill="currentColor" />
                      </div>
                    </div>
                    <span className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-lg">{rec.duration}</span>
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/30">
                      <div className="h-full bg-green-400" style={{ width: `${rec.watchProgress}%` }}></div>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-gray-900 text-sm line-clamp-1">{rec.title}</h3>
                      <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">{rec.watchProgress}%</span>
                    </div>
                    <p className="text-xs text-gray-500">{rec.teacher} • {rec.subject}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Video Grid */}
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-4">
            {activeTab === "all" ? "All Recordings" :
             activeTab === "watched" ? "Watched Recordings" :
             activeTab === "unwatched" ? "New Recordings" : "Bookmarked Recordings"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredRecordings.map((rec) => (
              <div
                key={rec.id}
                onClick={() => setSelectedRecording(rec)}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden cursor-pointer group hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                {/* Thumbnail */}
                <div className={`relative h-44 bg-gradient-to-br ${getThumbnailBg(rec.subject)} flex items-center justify-center overflow-hidden`}>
                  <span className="text-7xl transition-transform group-hover:scale-110">{getSubjectIcon(rec.subject)}</span>
                  
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                      <Play size={28} className="text-gray-900 ml-1.5" fill="currentColor" />
                    </div>
                  </div>

                  {/* Duration Badge */}
                  <span className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-sm text-white text-xs px-2.5 py-1 rounded-lg font-medium">
                    <Clock size={12} className="inline mr-1" />{rec.duration}
                  </span>

                  {/* Bookmark */}
                  {rec.bookmarked && (
                    <Bookmark size={18} className="absolute top-3 right-3 text-yellow-400 fill-yellow-400" />
                  )}

                  {/* Progress Bar */}
                  {rec.watchProgress > 0 && rec.watchProgress < 100 && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/30">
                      <div className="h-full bg-gradient-to-r from-purple-400 to-pink-400" style={{ width: `${rec.watchProgress}%` }}></div>
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold bg-gradient-to-r ${getSubjectColor(rec.subject)} text-white`}>
                      {rec.subject}
                    </span>
                    <span className="text-xs text-gray-400 flex items-center gap-1">
                      <Eye size={12} />{rec.views}
                    </span>
                  </div>
                  
                  <h3 className="font-semibold text-gray-900 text-sm mb-1.5 line-clamp-2 group-hover:text-purple-600 transition-colors">
                    {rec.title}
                  </h3>
                  
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <div className="w-5 h-5 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center text-white text-[10px] font-bold">
                      {rec.teacherAvatar}
                    </div>
                    <span>{rec.teacher}</span>
                  </div>
                  
                  <p className="text-xs text-gray-400 mt-2">{new Date(rec.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Empty State */}
        {filteredRecordings.length === 0 && (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Video size={40} className="text-gray-400" />
            </div>
            <p className="text-gray-600 text-lg font-medium">No recordings found</p>
            <p className="text-gray-400 text-sm mt-1">Try adjusting your filters</p>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Total Recordings", value: stats.total, icon: Video, color: "text-purple-600", bg: "bg-purple-50" },
            { label: "Hours of Content", value: `${stats.totalHours}h`, icon: Clock, color: "text-blue-600", bg: "bg-blue-50" },
            { label: "Watched", value: stats.watched, icon: Eye, color: "text-green-600", bg: "bg-green-50" },
            { label: "Bookmarked", value: stats.bookmarked, icon: Bookmark, color: "text-yellow-600", bg: "bg-yellow-50" },
          ].map((stat, i) => (
            <div key={i} className={`${stat.bg} rounded-2xl p-4`}>
              <stat.icon size={22} className={`${stat.color} mb-2`} />
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-xs text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Video Player Modal */}
      {selectedRecording && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 rounded-3xl max-w-5xl w-full max-h-[95vh] overflow-hidden shadow-2xl animate-scaleIn">
            {/* Video Player Area */}
            <div className="relative">
              <div className={`h-[400px] bg-gradient-to-br ${getThumbnailBg(selectedRecording.subject)} flex items-center justify-center`}>
                <span className="text-[120px]">{getSubjectIcon(selectedRecording.subject)}</span>
                
                {/* Play Overlay */}
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-xl"
                  >
                    {isPlaying ? <Pause size={36} className="text-gray-900" /> : <Play size={36} className="text-gray-900 ml-1.5" fill="currentColor" />}
                  </button>
                </div>

                {/* Close Button */}
                <button
                  onClick={() => { setSelectedRecording(null); setIsPlaying(false); }}
                  className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/70 text-white rounded-xl transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Video Controls */}
              <div className="p-4 bg-gray-800">
                {/* Progress Bar */}
                <div className="h-1.5 bg-gray-600 rounded-full mb-4 cursor-pointer">
                  <div className="h-full bg-gradient-to-r from-purple-400 to-pink-400 rounded-full" style={{ width: `${isPlaying ? 35 : 0}%` }}></div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <button className="text-white hover:text-purple-400 transition-colors">
                      <SkipBack size={20} />
                    </button>
                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="text-white hover:text-purple-400 transition-colors"
                    >
                      {isPlaying ? <Pause size={24} /> : <Play size={24} fill="currentColor" />}
                    </button>
                    <button className="text-white hover:text-purple-400 transition-colors">
                      <SkipForward size={20} />
                    </button>
                    <span className="text-white text-sm ml-2">
                      {formatTime(isPlaying ? 1500 : 0)} / {formatTime(selectedRecording.durationSeconds)}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    {/* Playback Speed */}
                    <div className="relative group">
                      <button className="text-white text-sm hover:text-purple-400 transition-colors px-2 py-1 rounded bg-gray-700">
                        {playbackSpeed}x
                      </button>
                      <div className="absolute bottom-full right-0 mb-2 bg-gray-700 rounded-xl p-2 hidden group-hover:block">
                        {[0.5, 0.75, 1, 1.25, 1.5, 2].map((speed) => (
                          <button
                            key={speed}
                            onClick={() => setPlaybackSpeed(speed)}
                            className={`block w-full text-left px-3 py-1.5 rounded-lg text-sm ${
                              playbackSpeed === speed ? "bg-purple-600 text-white" : "text-white hover:bg-gray-600"
                            }`}
                          >
                            {speed}x
                          </button>
                        ))}
                      </div>
                    </div>

                    <button className="text-white hover:text-purple-400 transition-colors">
                      <Volume2 size={20} />
                    </button>
                    <button className="text-white hover:text-purple-400 transition-colors">
                      <Maximize size={20} />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Video Info & Tabs */}
            <div className="bg-white p-6 max-h-[40vh] overflow-y-auto">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">{selectedRecording.title}</h2>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="text-sm text-gray-600">{selectedRecording.subject} • {selectedRecording.chapter}</span>
                    <span className="text-sm text-gray-400">•</span>
                    <span className="text-sm text-gray-500 flex items-center gap-1">
                      <Eye size={14} /> {selectedRecording.views} views
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      const updated = recordings.map(r =>
                        r.id === selectedRecording.id ? { ...r, bookmarked: !r.bookmarked } : r
                      );
                      setSelectedRecording({ ...selectedRecording, bookmarked: !selectedRecording.bookmarked });
                    }}
                    className={`p-2 rounded-xl transition-colors ${
                      selectedRecording.bookmarked ? "bg-yellow-100 text-yellow-600" : "hover:bg-gray-100 text-gray-600"
                    }`}
                  >
                    <BookmarkPlus size={20} fill={selectedRecording.bookmarked ? "currentColor" : "none"} />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-xl text-gray-600 transition-colors">
                    <Share2 size={20} />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-xl text-gray-600 transition-colors">
                    <Download size={20} />
                  </button>
                </div>
              </div>

              {/* Teacher Info */}
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-500 rounded-xl flex items-center justify-center text-white font-bold">
                  {selectedRecording.teacherAvatar}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{selectedRecording.teacher}</p>
                  <p className="text-sm text-gray-500">{selectedRecording.subject} Teacher</p>
                </div>
              </div>

              {/* Timestamps */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">📋 Chapter Timestamps</h3>
                <div className="space-y-2">
                  {selectedRecording.timestamps.map((ts, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-purple-50 cursor-pointer transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-mono text-purple-600 bg-purple-100 px-2 py-1 rounded-lg">{ts.time}</span>
                        <span className="text-sm text-gray-700">{ts.label}</span>
                      </div>
                      <Play size={14} className="text-gray-400 group-hover:text-purple-600 transition-colors" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Notes Section */}
              <div className="mt-4">
                <button
                  onClick={() => setShowNotes(!showNotes)}
                  className="flex items-center gap-2 text-purple-600 font-medium text-sm hover:underline"
                >
                  <BookOpen size={16} />
                  {showNotes ? "Hide Notes" : "Add Your Notes"}
                </button>
                {showNotes && (
                  <div className="mt-3">
                    <textarea
                      value={userNotes}
                      onChange={(e) => setUserNotes(e.target.value)}
                      placeholder="Write your notes here..."
                      className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-purple-400 min-h-[100px]"
                    />
                    <button className="mt-2 px-4 py-2 bg-purple-600 text-white rounded-xl text-sm font-medium hover:bg-purple-700 transition-colors">
                      Save Notes
                    </button>
                  </div>
                )}
              </div>
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
          animation: scaleIn 0.2s ease-out;
        }
        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </DashboardLayout>
  );
}