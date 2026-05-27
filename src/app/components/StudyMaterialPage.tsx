// StudyMaterialPage.tsx - Premium iOS-Style Study Material Library
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
  Download,
  Eye,
  Clock,
  Star,
  Bookmark,
  BookmarkPlus,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  FileDown,
  FileText as FileIcon,
  Image,
  FileSpreadsheet,
  FileCode,
  Brain,
  Zap,
  Sparkles,
  ArrowDown,
  ExternalLink,
  Play,
  X,
  Grid,
  List,
  FolderOpen,
  HardDrive,
  BarChart3,
  History,
  TrendingDown,
} from "lucide-react";

interface Material {
  id: number;
  title: string;
  subject: string;
  chapter: string;
  topic: string;
  type: "pdf" | "ppt" | "formula" | "questions" | "paper" | "mindmap" | "flashcards" | "notes";
  teacher: string;
  teacherAvatar: string;
  size: string;
  pages: number;
  downloads: number;
  lastUpdated: string;
  isNew: boolean;
  isBookmarked: boolean;
  isDownloaded: boolean;
  description: string;
  tags: string[];
  relatedVideos?: string[];
  version: string;
}

interface Chapter {
  name: string;
  topics: string[];
  materialCount: number;
}

export function StudyMaterialPage() {
  const [activeSubject, setActiveSubject] = useState("all");
  const [activeType, setActiveType] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [expandedChapter, setExpandedChapter] = useState<string | null>(null);
  const [selectedMaterial, setSelectedMaterial] = useState<Material | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [activeTab, setActiveTab] = useState("all");

  const sidebarItems = [
    { icon: Home, label: "Dashboard", path: "/student/dashboard" },
    { icon: Calendar, label: "My Classes", path: "/schedule" },
    { icon: TrendingUp, label: "My Progress", path: "/student/reports" },
    { icon: ClipboardList, label: "Assignments", path: "/student/assignments" },
    { icon: Video, label: "Recordings", path: "/recordings" },
    { icon: Book, label: "Study Material", active: true },
    { icon: Users, label: "Mentor Sessions", path: "/mentor-sessions" },
    { icon: Settings, label: "Settings", path: "/settings" },
  ];

  const subjects = ["Mathematics", "Physics", "Chemistry", "Biology", "English"];

  const chapters: { [key: string]: Chapter[] } = {
    Mathematics: [
      { name: "Chapter 1: Real Numbers", topics: ["Euclid's Division", "Fundamental Theorem"], materialCount: 8 },
      { name: "Chapter 2: Polynomials", topics: ["Zeroes of Polynomials", "Division Algorithm"], materialCount: 6 },
      { name: "Chapter 3: Linear Equations", topics: ["Graphical Method", "Substitution"], materialCount: 7 },
      { name: "Chapter 4: Quadratic Equations", topics: ["Nature of Roots", "Formula Method"], materialCount: 10 },
      { name: "Chapter 5: Arithmetic Progressions", topics: ["nth Term", "Sum Formula"], materialCount: 5 },
    ],
    Physics: [
      { name: "Chapter 1: Motion", topics: ["Distance & Displacement", "Velocity"], materialCount: 6 },
      { name: "Chapter 2: Force & Laws of Motion", topics: ["Newton's Laws", "Inertia"], materialCount: 8 },
      { name: "Chapter 3: Gravitation", topics: ["Universal Law", "Free Fall"], materialCount: 7 },
      { name: "Chapter 4: Work & Energy", topics: ["Work Done", "Kinetic Energy"], materialCount: 5 },
    ],
    Chemistry: [
      { name: "Chapter 1: Matter", topics: ["States of Matter", "Properties"], materialCount: 5 },
      { name: "Chapter 2: Atomic Structure", topics: ["Bohr's Model", "Quantum Numbers"], materialCount: 7 },
      { name: "Chapter 3: Chemical Bonding", topics: ["Ionic Bond", "Covalent Bond"], materialCount: 8 },
      { name: "Chapter 4: Organic Chemistry", topics: ["Hydrocarbons", "Functional Groups"], materialCount: 9 },
    ],
    Biology: [
      { name: "Chapter 1: Cell Biology", topics: ["Cell Structure", "Organelles"], materialCount: 6 },
      { name: "Chapter 2: Tissues", topics: ["Plant Tissues", "Animal Tissues"], materialCount: 5 },
      { name: "Chapter 3: Genetics", topics: ["Mendel's Laws", "DNA Structure"], materialCount: 7 },
    ],
    English: [
      { name: "Grammar", topics: ["Tenses", "Active Passive"], materialCount: 8 },
      { name: "Writing Skills", topics: ["Essay", "Letter Writing"], materialCount: 6 },
      { name: "Literature", topics: ["Poems", "Stories"], materialCount: 10 },
    ],
  };

  const materials: Material[] = [
    { id: 1, title: "Quadratic Equations Complete Notes", subject: "Mathematics", chapter: "Chapter 4: Quadratic Equations", topic: "Nature of Roots", type: "pdf", teacher: "Mr. Anil Sharma", teacherAvatar: "AS", size: "4.2 MB", pages: 25, downloads: 1234, lastUpdated: "2026-03-10", isNew: true, isBookmarked: true, isDownloaded: true, description: "Complete chapter notes covering discriminant, nature of roots, quadratic formula, and word problems with solved examples.", tags: ["important", "exam-prep"], relatedVideos: ["Quadratic Equations - Nature of Roots"], version: "2.1" },
    { id: 2, title: "Quadratic Formula Sheet", subject: "Mathematics", chapter: "Chapter 4: Quadratic Equations", topic: "Formula Method", type: "formula", teacher: "Mr. Anil Sharma", teacherAvatar: "AS", size: "1.8 MB", pages: 4, downloads: 856, lastUpdated: "2026-03-08", isNew: false, isBookmarked: false, isDownloaded: false, description: "Quick revision formula sheet with all important formulas, shortcuts, and tips.", tags: ["quick-revision", "formulas"], version: "1.0" },
    { id: 3, title: "Quadratic Equations Practice Set", subject: "Mathematics", chapter: "Chapter 4: Quadratic Equations", topic: "Practice", type: "questions", teacher: "Mr. Anil Sharma", teacherAvatar: "AS", size: "3.5 MB", pages: 30, downloads: 967, lastUpdated: "2026-03-05", isNew: false, isBookmarked: true, isDownloaded: true, description: "100+ practice questions with answer key covering all topics from quadratic equations chapter.", tags: ["practice", "homework"], version: "3.0" },
    { id: 4, title: "Newton's Laws - Complete PPT", subject: "Physics", chapter: "Chapter 2: Force & Laws of Motion", topic: "Newton's Laws", type: "ppt", teacher: "Dr. Rajesh Gupta", teacherAvatar: "RG", size: "8.5 MB", pages: 35, downloads: 2345, lastUpdated: "2026-03-09", isNew: true, isBookmarked: false, isDownloaded: false, description: "Classroom presentation with animations and diagrams explaining all three laws of motion.", tags: ["presentation", "visual"], version: "4.2" },
    { id: 5, title: "Laws of Motion Mind Map", subject: "Physics", chapter: "Chapter 2: Force & Laws of Motion", topic: "Mind Map", type: "mindmap", teacher: "Dr. Rajesh Gupta", teacherAvatar: "RG", size: "2.1 MB", pages: 1, downloads: 678, lastUpdated: "2026-03-07", isNew: false, isBookmarked: false, isDownloaded: false, description: "Visual mind map connecting all concepts of force and laws of motion for quick revision.", tags: ["visual", "quick-revision"], version: "1.0" },
    { id: 6, title: "Physics Formula Handbook", subject: "Physics", chapter: "All Chapters", topic: "Formulas", type: "formula", teacher: "Dr. Rajesh Gupta", teacherAvatar: "RG", size: "5.8 MB", pages: 15, downloads: 3456, lastUpdated: "2026-03-01", isNew: false, isBookmarked: true, isDownloaded: true, description: "Complete formula handbook covering all physics chapters with important derivations.", tags: ["important", "formulas", "exam-prep"], version: "5.0" },
    { id: 7, title: "Organic Chemistry Reaction Mechanisms", subject: "Chemistry", chapter: "Chapter 4: Organic Chemistry", topic: "Reactions", type: "pdf", teacher: "Mrs. Priya Reddy", teacherAvatar: "PR", size: "6.7 MB", pages: 40, downloads: 1567, lastUpdated: "2026-03-11", isNew: true, isBookmarked: false, isDownloaded: false, description: "Detailed notes on all organic chemistry reaction mechanisms with step-by-step explanations.", tags: ["important", "detailed"], version: "2.0" },
    { id: 8, title: "Chemistry Flashcards - Organic", subject: "Chemistry", chapter: "Chapter 4: Organic Chemistry", topic: "Flash Cards", type: "flashcards", teacher: "Mrs. Priya Reddy", teacherAvatar: "PR", size: "1.2 MB", pages: 20, downloads: 432, lastUpdated: "2026-03-06", isNew: false, isBookmarked: false, isDownloaded: false, description: "Printable flashcards for quick memorization of organic chemistry reactions and functional groups.", tags: ["quick-revision", "memory"], version: "1.0" },
    { id: 9, title: "Cell Biology Complete Notes", subject: "Biology", chapter: "Chapter 1: Cell Biology", topic: "Cell Structure", type: "pdf", teacher: "Dr. Sneha Kapoor", teacherAvatar: "SK", size: "7.3 MB", pages: 35, downloads: 1890, lastUpdated: "2026-03-08", isNew: false, isBookmarked: true, isDownloaded: true, description: "Comprehensive notes on cell structure, organelles, and functions with diagrams.", tags: ["detailed", "diagrams"], version: "3.1" },
    { id: 10, title: "Biology Diagrams Collection", subject: "Biology", chapter: "All Chapters", topic: "Diagrams", type: "pdf", teacher: "Dr. Sneha Kapoor", teacherAvatar: "SK", size: "12 MB", pages: 50, downloads: 2678, lastUpdated: "2026-02-28", isNew: false, isBookmarked: false, isDownloaded: true, description: "Collection of all important biology diagrams with labels for exam preparation.", tags: ["diagrams", "exam-prep"], version: "2.0" },
    { id: 11, title: "Grammar Rules Handbook", subject: "English", chapter: "Grammar", topic: "Tenses", type: "pdf", teacher: "Mrs. Meera Desai", teacherAvatar: "MD", size: "3.9 MB", pages: 28, downloads: 2100, lastUpdated: "2026-03-04", isNew: false, isBookmarked: false, isDownloaded: false, description: "Complete English grammar guide with examples and practice exercises.", tags: ["grammar", "reference"], version: "4.0" },
    { id: 12, title: "Previous Year Papers - JEE 2025", subject: "Mathematics", chapter: "Exam Papers", topic: "Previous Year", type: "paper", teacher: "Exam Cell", teacherAvatar: "EX", size: "15 MB", pages: 120, downloads: 4567, lastUpdated: "2026-02-15", isNew: false, isBookmarked: true, isDownloaded: true, description: "JEE Main 2025 all shift papers with detailed solutions.", tags: ["exam", "previous-year"], version: "1.0" },
    { id: 13, title: "Trigonometry Mind Map", subject: "Mathematics", chapter: "Chapter 8: Trigonometry", topic: "Mind Map", type: "mindmap", teacher: "Mr. Anil Sharma", teacherAvatar: "AS", size: "1.5 MB", pages: 1, downloads: 543, lastUpdated: "2026-03-03", isNew: false, isBookmarked: false, isDownloaded: false, description: "Visual overview of all trigonometry concepts, identities, and formulas.", tags: ["visual", "quick-revision"], version: "1.0" },
    { id: 14, title: "Chemical Bonding PPT", subject: "Chemistry", chapter: "Chapter 3: Chemical Bonding", topic: "Covalent Bond", type: "ppt", teacher: "Mrs. Priya Reddy", teacherAvatar: "PR", size: "9.2 MB", pages: 42, downloads: 1890, lastUpdated: "2026-03-02", isNew: false, isBookmarked: false, isDownloaded: false, description: "Detailed presentation on chemical bonding with 3D molecular structure animations.", tags: ["presentation", "visual"], version: "2.5" },
    { id: 15, title: "NEET Biology Question Bank", subject: "Biology", chapter: "All Chapters", topic: "Practice", type: "questions", teacher: "Dr. Sneha Kapoor", teacherAvatar: "SK", size: "8.7 MB", pages: 80, downloads: 3456, lastUpdated: "2026-02-20", isNew: false, isBookmarked: false, isDownloaded: true, description: "Topic-wise NEET biology questions with answer key and explanations.", tags: ["exam-prep", "practice"], version: "2.0" },
    { id: 16, title: "Essay Writing Guide", subject: "English", chapter: "Writing Skills", topic: "Essay", type: "pdf", teacher: "Mrs. Meera Desai", teacherAvatar: "MD", size: "2.8 MB", pages: 18, downloads: 1567, lastUpdated: "2026-03-01", isNew: true, isBookmarked: false, isDownloaded: false, description: "Step-by-step guide to writing compelling essays with sample essays.", tags: ["writing", "reference"], version: "1.5" },
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

  const getSubjectBgLight = (subject: string) => {
    const bgs: { [key: string]: string } = {
      Mathematics: "bg-blue-50 text-blue-700 border-blue-200",
      Physics: "bg-purple-50 text-purple-700 border-purple-200",
      Chemistry: "bg-green-50 text-green-700 border-green-200",
      Biology: "bg-orange-50 text-orange-700 border-orange-200",
      English: "bg-pink-50 text-pink-700 border-pink-200",
    };
    return bgs[subject] || "bg-gray-50 text-gray-700 border-gray-200";
  };

  const getSubjectIcon = (subject: string) => {
    const icons: { [key: string]: string } = {
      Mathematics: "📐", Physics: "⚡", Chemistry: "🧪",
      Biology: "🧬", English: "📖",
    };
    return icons[subject] || "📚";
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "pdf": return <FileIcon size={18} />;
      case "ppt": return <FileSpreadsheet size={18} />;
      case "formula": return <Zap size={18} />;
      case "questions": return <Brain size={18} />;
      case "paper": return <FileText size={18} />;
      case "mindmap": return <Image size={18} />;
      case "flashcards": return <FileCode size={18} />;
      case "notes": return <Book size={18} />;
      default: return <FileIcon size={18} />;
    }
  };

  const getTypeLabel = (type: string) => {
    const labels: { [key: string]: string } = {
      pdf: "PDF Notes", ppt: "Presentation", formula: "Formula Sheet",
      questions: "Practice Set", paper: "Exam Paper", mindmap: "Mind Map",
      flashcards: "Flash Cards", notes: "Class Notes",
    };
    return labels[type] || type;
  };

  const getTypeColor = (type: string) => {
    const colors: { [key: string]: string } = {
      pdf: "bg-red-100 text-red-700", ppt: "bg-orange-100 text-orange-700",
      formula: "bg-yellow-100 text-yellow-700", questions: "bg-purple-100 text-purple-700",
      paper: "bg-blue-100 text-blue-700", mindmap: "bg-green-100 text-green-700",
      flashcards: "bg-pink-100 text-pink-700", notes: "bg-indigo-100 text-indigo-700",
    };
    return colors[type] || "bg-gray-100 text-gray-700";
  };

  const filteredMaterials = materials
    .filter((m) => {
      if (activeSubject !== "all" && m.subject !== activeSubject) return false;
      return true;
    })
    .filter((m) => {
      if (activeType !== "all" && m.type !== activeType) return false;
      return true;
    })
    .filter((m) => {
      if (activeTab === "all") return true;
      if (activeTab === "bookmarked") return m.isBookmarked;
      if (activeTab === "downloaded") return m.isDownloaded;
      if (activeTab === "recent") return m.isNew;
      return true;
    })
    .filter((m) => {
      if (searchQuery === "") return true;
      return (
        m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.chapter.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.tags.some(tag => tag.includes(searchQuery.toLowerCase()))
      );
    });

  const stats = {
    total: materials.length,
    bookmarked: materials.filter(m => m.isBookmarked).length,
    downloaded: materials.filter(m => m.isDownloaded).length,
    newThisWeek: materials.filter(m => m.isNew).length,
    totalDownloads: materials.reduce((sum, m) => sum + m.downloads, 0),
    totalSize: "85 MB",
  };

  return (
    <DashboardLayout
      title="Study Material"
      subtitle={`${stats.total} resources • ${stats.totalDownloads.toLocaleString()} total downloads`}
      sidebarItems={sidebarItems}
      userInfo={
        <div className="flex items-center gap-2">
          <span className="bg-green-100 text-green-700 px-3 py-1.5 rounded-full text-sm font-medium flex items-center gap-1">
            <Sparkles size={14} />{stats.newThisWeek} New this week
          </span>
        </div>
      }
    >
      <div className="space-y-6">
        {/* Search & Controls */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[200px]">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by topic, chapter, tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-2xl text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all"
            />
          </div>

          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-4 py-3 rounded-2xl border text-sm font-medium transition-all ${
              showFilters ? "bg-blue-50 border-blue-300 text-blue-700" : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
            }`}
          >
            <Filter size={18} /> Filters
          </button>

          {/* View Toggle */}
          <div className="flex bg-gray-100 rounded-xl p-1">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2.5 rounded-lg transition-all ${viewMode === "grid" ? "bg-white shadow-sm" : "text-gray-500"}`}
            >
              <Grid size={18} />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2.5 rounded-lg transition-all ${viewMode === "list" ? "bg-white shadow-sm" : "text-gray-500"}`}
            >
              <List size={18} />
            </button>
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="p-5 bg-white rounded-2xl border border-gray-100 animate-slideDown space-y-4">
            {/* Subject Filter */}
            <div>
              <p className="text-sm font-semibold text-gray-500 mb-3">📚 Subjects</p>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setActiveSubject("all")}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    activeSubject === "all" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  All Subjects
                </button>
                {subjects.map((sub) => (
                  <button
                    key={sub}
                    onClick={() => setActiveSubject(sub)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                      activeSubject === sub ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {getSubjectIcon(sub)} {sub}
                  </button>
                ))}
              </div>
            </div>

            {/* Type Filter */}
            <div>
              <p className="text-sm font-semibold text-gray-500 mb-3">📄 Content Type</p>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setActiveType("all")}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    activeType === "all" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  All Types
                </button>
                {["pdf", "ppt", "formula", "questions", "paper", "mindmap", "flashcards"].map((type) => (
                  <button
                    key={type}
                    onClick={() => setActiveType(type)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                      activeType === type ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {getTypeIcon(type)} <span className="ml-1">{getTypeLabel(type)}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Quick Tabs */}
        <div className="flex gap-1 bg-gray-100 rounded-2xl p-1.5 overflow-x-auto">
          {[
            { id: "all", label: "All Materials", icon: FolderOpen },
            { id: "bookmarked", label: "Saved", icon: Bookmark },
            { id: "downloaded", label: "Downloaded", icon: Download },
            { id: "recent", label: "Recently Added", icon: Sparkles },
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

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {[
            { label: "Total Resources", value: stats.total, icon: FolderOpen, color: "text-blue-600", bg: "bg-blue-50" },
            { label: "Saved", value: stats.bookmarked, icon: Bookmark, color: "text-yellow-600", bg: "bg-yellow-50" },
            { label: "Downloaded", value: stats.downloaded, icon: Download, color: "text-green-600", bg: "bg-green-50" },
            { label: "New This Week", value: stats.newThisWeek, icon: Sparkles, color: "text-purple-600", bg: "bg-purple-50" },
            { label: "Total Downloads", value: stats.totalDownloads.toLocaleString(), icon: TrendingDown, color: "text-orange-600", bg: "bg-orange-50" },
          ].map((stat, i) => (
            <div key={i} className={`${stat.bg} rounded-2xl p-4 text-center`}>
              <stat.icon size={20} className={`${stat.color} mx-auto mb-1`} />
              <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
              <p className="text-xs text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Chapter-wise Accordion (when subject is selected) */}
        {activeSubject !== "all" && chapters[activeSubject] && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">
              {getSubjectIcon(activeSubject)} {activeSubject} - Chapter Structure
            </h2>
            <div className="space-y-2">
              {chapters[activeSubject].map((chapter, index) => (
                <div key={index} className="border border-gray-100 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setExpandedChapter(expandedChapter === chapter.name ? null : chapter.name)}
                    className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors text-left"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-white bg-gradient-to-r ${getSubjectColor(activeSubject)}`}>
                        <Book size={14} />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">{chapter.name}</p>
                        <p className="text-xs text-gray-500">{chapter.materialCount} materials</p>
                      </div>
                    </div>
                    {expandedChapter === chapter.name ? <ChevronUp size={18} className="text-gray-400" /> : <ChevronDown size={18} className="text-gray-400" />}
                  </button>
                  {expandedChapter === chapter.name && (
                    <div className="px-4 pb-4 border-t border-gray-100">
                      <div className="flex flex-wrap gap-2 mt-3">
                        {chapter.topics.map((topic, i) => (
                          <span
                            key={i}
                            className="px-3 py-1.5 bg-gray-50 text-gray-700 rounded-lg text-xs font-medium hover:bg-blue-50 hover:text-blue-700 cursor-pointer transition-colors"
                            onClick={() => {
                              setSearchQuery(topic);
                              setExpandedChapter(null);
                            }}
                          >
                            {topic}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Materials Grid/List */}
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-4">
            {activeTab === "bookmarked" ? "📌 Saved Materials" :
             activeTab === "downloaded" ? "💾 Downloaded Materials" :
             activeTab === "recent" ? "🆕 Recently Added" : "📚 All Materials"}
            <span className="text-sm text-gray-500 font-normal ml-2">({filteredMaterials.length})</span>
          </h2>

          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredMaterials.map((material) => (
                <div
                  key={material.id}
                  onClick={() => { setSelectedMaterial(material); setShowPreview(true); }}
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 hover:shadow-lg transition-all cursor-pointer group hover:-translate-y-1"
                >
                  {/* Type Icon */}
                  <div className="flex items-start justify-between mb-3">
                    <div className={`p-2.5 rounded-xl ${getTypeColor(material.type)}`}>
                      {getTypeIcon(material.type)}
                    </div>
                    <div className="flex items-center gap-1">
                      {material.isNew && (
                        <span className="bg-green-100 text-green-700 text-[10px] px-2 py-0.5 rounded-full font-bold">NEW</span>
                      )}
                      {material.isBookmarked && (
                        <Bookmark size={16} className="text-yellow-500 fill-yellow-500" />
                      )}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="font-semibold text-gray-900 text-sm mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {material.title}
                  </h3>

                  {/* Subject & Type */}
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium border ${getSubjectBgLight(material.subject)}`}>
                      {material.subject}
                    </span>
                    <span className="text-[10px] text-gray-500">{getTypeLabel(material.type)}</span>
                  </div>

                  {/* Meta */}
                  <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                    <span className="flex items-center gap-1"><HardDrive size={12} />{material.size}</span>
                    <span className="flex items-center gap-1"><FileText size={12} />{material.pages} pages</span>
                  </div>

                  {/* Teacher & Downloads */}
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-[10px] font-bold">
                        {material.teacherAvatar}
                      </div>
                      <span className="text-xs text-gray-500">{material.teacher}</span>
                    </div>
                    <span className="text-xs text-gray-400 flex items-center gap-1">
                      <Download size={12} />{material.downloads}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {filteredMaterials.map((material) => (
                <div
                  key={material.id}
                  onClick={() => { setSelectedMaterial(material); setShowPreview(true); }}
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-all cursor-pointer group flex items-center gap-4"
                >
                  <div className={`p-3 rounded-xl ${getTypeColor(material.type)}`}>
                    {getTypeIcon(material.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-gray-900 text-sm truncate group-hover:text-blue-600 transition-colors">
                        {material.title}
                      </h3>
                      {material.isNew && (
                        <span className="bg-green-100 text-green-700 text-[10px] px-2 py-0.5 rounded-full font-bold">NEW</span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <span>{material.subject}</span>
                      <span>•</span>
                      <span>{material.size}</span>
                      <span>•</span>
                      <span>{material.pages} pages</span>
                      <span>•</span>
                      <span>{material.downloads} downloads</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {material.isBookmarked && <Bookmark size={16} className="text-yellow-500 fill-yellow-500" />}
                    <button
                      onClick={(e) => { e.stopPropagation(); }}
                      className="p-2 hover:bg-blue-50 rounded-xl text-blue-600 transition-colors"
                    >
                      <Download size={18} />
                    </button>
                    <ChevronRight size={18} className="text-gray-400 group-hover:text-blue-600 transition-colors" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {filteredMaterials.length === 0 && (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Book size={40} className="text-gray-400" />
              </div>
              <p className="text-gray-600 text-lg font-medium">No materials found</p>
              <p className="text-gray-400 text-sm mt-1">Try adjusting your filters</p>
            </div>
          )}
        </div>
      </div>

      {/* Material Preview Modal */}
      {showPreview && selectedMaterial && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowPreview(false)}>
          <div className="bg-white rounded-3xl max-w-lg w-full max-h-[85vh] overflow-y-auto shadow-2xl animate-scaleIn" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 rounded-t-3xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`p-2.5 rounded-xl ${getTypeColor(selectedMaterial.type)}`}>
                  {getTypeIcon(selectedMaterial.type)}
                </div>
                <span className="text-sm font-medium text-gray-500">{getTypeLabel(selectedMaterial.type)}</span>
              </div>
              <button onClick={() => setShowPreview(false)} className="p-2 hover:bg-gray-100 rounded-xl">
                <X size={20} />
              </button>
            </div>

            <div className="p-6 space-y-5">
              {/* Title & Badges */}
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-3">{selectedMaterial.title}</h2>
                <div className="flex flex-wrap gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getSubjectBgLight(selectedMaterial.subject)}`}>
                    {getSubjectIcon(selectedMaterial.subject)} {selectedMaterial.subject}
                  </span>
                  {selectedMaterial.tags.map((tag, i) => (
                    <span key={i} className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-gray-600">{selectedMaterial.description}</p>

              {/* Meta Grid */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-gray-50 rounded-xl">
                  <p className="text-xs text-gray-500">File Size</p>
                  <p className="font-semibold text-gray-900">{selectedMaterial.size}</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-xl">
                  <p className="text-xs text-gray-500">Pages</p>
                  <p className="font-semibold text-gray-900">{selectedMaterial.pages} Pages</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-xl">
                  <p className="text-xs text-gray-500">Downloads</p>
                  <p className="font-semibold text-gray-900">{selectedMaterial.downloads.toLocaleString()}</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-xl">
                  <p className="text-xs text-gray-500">Version</p>
                  <p className="font-semibold text-gray-900">v{selectedMaterial.version}</p>
                </div>
              </div>

              {/* Teacher Info */}
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-xl flex items-center justify-center text-white font-bold">
                  {selectedMaterial.teacherAvatar}
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{selectedMaterial.teacher}</p>
                  <p className="text-xs text-gray-500">Uploaded {new Date(selectedMaterial.lastUpdated).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</p>
                </div>
              </div>

              {/* Related Videos */}
              {selectedMaterial.relatedVideos && selectedMaterial.relatedVideos.length > 0 && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">🎥 Related Videos</h3>
                  {selectedMaterial.relatedVideos.map((video, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 bg-purple-50 rounded-xl hover:bg-purple-100 cursor-pointer transition-colors">
                      <Play size={16} className="text-purple-600" />
                      <span className="text-sm text-gray-700">{video}</span>
                      <ExternalLink size={14} className="text-gray-400 ml-auto" />
                    </div>
                  ))}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3 pt-2">
                <button className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-3 rounded-xl font-bold hover:shadow-lg transition-all">
                  <Download size={18} />
                  Download
                </button>
                <button
                  onClick={() => {
                    setSelectedMaterial({ ...selectedMaterial, isBookmarked: !selectedMaterial.isBookmarked });
                  }}
                  className={`p-3 rounded-xl border transition-all ${
                    selectedMaterial.isBookmarked
                      ? "bg-yellow-50 border-yellow-300 text-yellow-600"
                      : "border-gray-200 text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <BookmarkPlus size={20} fill={selectedMaterial.isBookmarked ? "currentColor" : "none"} />
                </button>
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