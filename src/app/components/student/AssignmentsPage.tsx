// AssignmentsPage.tsx - Premium iOS-Style Assignments Page
import { useState } from "react";
import { DashboardLayout } from "../DashboardLayout";
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
  Clock,
  CheckCircle,
  AlertCircle,
  Upload,
  Search,
  Filter,
  ChevronRight,
  Star,
  Download,
  Eye,
  X,
  Paperclip,
  FileUp,
  MessageSquare,
  ArrowUp,
  ArrowDown,
  Sparkles,
  Zap,
  Timer,
  Target,
  ThumbsUp,
  Send,
} from "lucide-react";

type TabType = "all" | "pending" | "submitted" | "graded" | "overdue";

export function AssignmentsPage() {
  const [activeTab, setActiveTab] = useState<TabType>("all");
  const [selectedAssignment, setSelectedAssignment] = useState<any>(null);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterSubject, setFilterSubject] = useState("all");
  const [sortBy, setSortBy] = useState("dueDate");
  const [showFilters, setShowFilters] = useState(false);

  const sidebarItems = [
    { icon: Home, label: "Dashboard", path: "/student/dashboard" },
    { icon: Calendar, label: "My Classes", path: "/schedule" },
    { icon: TrendingUp, label: "My Progress", path: "/student/reports" },
    { icon: ClipboardList, label: "Assignments", active: true },
    { icon: Video, label: "Recordings" },
    { icon: Book, label: "Study Material" },
    { icon: Users, label: "Mentor Sessions" },
    { icon: FileText, label: "Reports" },
    { icon: Settings, label: "Settings" },
  ];

  const assignments = [
    {
      id: 1,
      title: "Quadratic Equations Problem Set",
      subject: "Mathematics",
      teacher: "Mr. Anil Sharma",
      dueDate: "2026-03-15",
      dueTime: "11:59 PM",
      status: "pending",
      priority: "high",
      points: 100,
      description: "Solve all problems from Chapter 4 including: Nature of roots, Discriminant method, Word problems on quadratic equations, Graph plotting exercises.",
      attachments: ["problems.pdf", "formula_sheet.pdf"],
      instructions: "Show all steps clearly. Submit as PDF or clear image scan.",
      submissionType: "file",
      maxFiles: 3,
      allowedFormats: ["PDF", "JPG", "PNG"],
    },
    {
      id: 2,
      title: "Newton's Laws of Motion Lab Report",
      subject: "Physics",
      teacher: "Dr. Rajesh Gupta",
      dueDate: "2026-03-17",
      dueTime: "11:59 PM",
      status: "pending",
      priority: "medium",
      points: 50,
      description: "Complete lab report with observations and conclusions from virtual lab session. Include force diagrams and calculations.",
      attachments: ["lab_manual.pdf"],
      instructions: "Follow the lab report format. Include observation table and graphs.",
      submissionType: "file",
      maxFiles: 2,
      allowedFormats: ["PDF", "DOCX"],
    },
    {
      id: 3,
      title: "Organic Chemistry Quiz",
      subject: "Chemistry",
      teacher: "Mrs. Priya Reddy",
      dueDate: "2026-03-20",
      dueTime: "11:59 PM",
      status: "submitted",
      priority: "low",
      points: 30,
      submittedDate: "March 10, 2026",
      submittedFiles: ["quiz_answers.pdf"],
    },
    {
      id: 4,
      title: "Cell Biology Diagram Assignment",
      subject: "Biology",
      teacher: "Dr. Sneha Kapoor",
      dueDate: "2026-03-16",
      dueTime: "11:59 PM",
      status: "submitted",
      priority: "medium",
      points: 40,
      submittedDate: "March 9, 2026",
      submittedFiles: ["cell_diagram.png", "explanation.pdf"],
    },
    {
      id: 5,
      title: "Shakespeare Essay - Macbeth Analysis",
      subject: "English",
      teacher: "Mrs. Meera Desai",
      dueDate: "2026-03-08",
      dueTime: "11:59 PM",
      status: "graded",
      priority: "high",
      points: 100,
      score: 92,
      grade: "A+",
      feedback: "Excellent analysis and writing. Great use of literary devices. Your character analysis of Lady Macbeth was particularly insightful. Consider exploring more about the theme of guilt in your next essay.",
      gradedDate: "March 12, 2026",
      rubric: [
        { criteria: "Content & Analysis", score: 28, max: 30 },
        { criteria: "Structure & Organization", score: 19, max: 20 },
        { criteria: "Language & Style", score: 19, max: 20 },
        { criteria: "Critical Thinking", score: 18, max: 20 },
        { criteria: "Citations & References", score: 8, max: 10 },
      ],
    },
    {
      id: 6,
      title: "Trigonometry Practice Set",
      subject: "Mathematics",
      teacher: "Mr. Anil Sharma",
      dueDate: "2026-03-05",
      dueTime: "11:59 PM",
      status: "graded",
      priority: "medium",
      points: 50,
      score: 48,
      grade: "A",
      feedback: "Very good work. Minor calculation error in question 5. Overall excellent understanding of trigonometric identities.",
      gradedDate: "March 10, 2026",
    },
    {
      id: 7,
      title: "Chemical Bonding Worksheet",
      subject: "Chemistry",
      teacher: "Mrs. Priya Reddy",
      dueDate: "2026-03-12",
      dueTime: "11:59 PM",
      status: "overdue",
      priority: "high",
      points: 60,
      description: "Complete the worksheet on ionic and covalent bonding with diagrams.",
      attachments: ["worksheet.pdf"],
      instructions: "Draw Lewis structures for all compounds.",
      submissionType: "file",
      maxFiles: 2,
      allowedFormats: ["PDF", "JPG"],
    },
    {
      id: 8,
      title: "Reading Comprehension - Advanced",
      subject: "English",
      teacher: "Mrs. Meera Desai",
      dueDate: "2026-03-18",
      dueTime: "11:59 PM",
      status: "pending",
      priority: "low",
      points: 40,
      description: "Read the provided passage and answer comprehension questions. Focus on inference and critical analysis.",
      attachments: ["passage.pdf", "questions.pdf"],
      instructions: "Answer in complete sentences. Word limit: 150-200 words per answer.",
      submissionType: "text",
      maxFiles: 1,
      allowedFormats: ["PDF"],
    },
  ];

  const getSubjectColor = (subject: string) => {
    const colors: { [key: string]: string } = {
      Mathematics: "bg-blue-100 text-blue-700 border-blue-200",
      Physics: "bg-purple-100 text-purple-700 border-purple-200",
      Chemistry: "bg-green-100 text-green-700 border-green-200",
      Biology: "bg-orange-100 text-orange-700 border-orange-200",
      English: "bg-pink-100 text-pink-700 border-pink-200",
    };
    return colors[subject] || "bg-gray-100 text-gray-700 border-gray-200";
  };

  const getSubjectIcon = (subject: string) => {
    const icons: { [key: string]: string } = {
      Mathematics: "📐", Physics: "⚡", Chemistry: "🧪",
      Biology: "🧬", English: "📖",
    };
    return icons[subject] || "📚";
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <span className="flex items-center gap-1.5 bg-red-50 text-red-700 px-3 py-1.5 rounded-full text-xs font-semibold border border-red-200">
            <AlertCircle size={12} /> Pending
          </span>
        );
      case "submitted":
        return (
          <span className="flex items-center gap-1.5 bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full text-xs font-semibold border border-blue-200">
            <Clock size={12} /> Under Review
          </span>
        );
      case "graded":
        return (
          <span className="flex items-center gap-1.5 bg-green-50 text-green-700 px-3 py-1.5 rounded-full text-xs font-semibold border border-green-200">
            <CheckCircle size={12} /> Graded
          </span>
        );
      case "overdue":
        return (
          <span className="flex items-center gap-1.5 bg-yellow-50 text-yellow-700 px-3 py-1.5 rounded-full text-xs font-semibold border border-yellow-200 animate-pulse">
            <Zap size={12} /> Overdue
          </span>
        );
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <span className="w-2 h-2 bg-red-500 rounded-full" title="High Priority"></span>;
      case "medium":
        return <span className="w-2 h-2 bg-yellow-500 rounded-full" title="Medium Priority"></span>;
      case "low":
        return <span className="w-2 h-2 bg-green-500 rounded-full" title="Low Priority"></span>;
    }
  };

  const getTimeRemaining = (dueDate: string) => {
    const now = new Date();
    const due = new Date(dueDate);
    const diff = due.getTime() - now.getTime();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    if (days < 0) return "Overdue";
    if (days === 0) return "Due today";
    if (days === 1) return "Due tomorrow";
    return `${days} days left`;
  };

  const filteredAssignments = assignments
    .filter((assignment) => {
      if (activeTab === "all") return true;
      return assignment.status === activeTab;
    })
    .filter((assignment) => {
      if (searchQuery === "") return true;
      return (
        assignment.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        assignment.subject.toLowerCase().includes(searchQuery.toLowerCase())
      );
    })
    .filter((assignment) => {
      if (filterSubject === "all") return true;
      return assignment.subject === filterSubject;
    })
    .sort((a, b) => {
      if (sortBy === "dueDate") {
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      }
      if (sortBy === "points") {
        return b.points - a.points;
      }
      if (sortBy === "subject") {
        return a.subject.localeCompare(b.subject);
      }
      return 0;
    });

  const stats = {
    total: assignments.length,
    pending: assignments.filter(a => a.status === "pending").length,
    submitted: assignments.filter(a => a.status === "submitted").length,
    graded: assignments.filter(a => a.status === "graded").length,
    overdue: assignments.filter(a => a.status === "overdue").length,
    avgScore: Math.round(
      assignments
        .filter(a => a.score)
        .reduce((sum, a) => sum + (a.score || 0), 0) /
      assignments.filter(a => a.score).length
    ),
  };

  return (
    <DashboardLayout
      title="Assignments"
      subtitle={`${stats.pending} pending • ${stats.graded} graded • Avg Score: ${stats.avgScore}%`}
      sidebarItems={sidebarItems}
      userInfo={
        <div className="flex items-center gap-2">
          <span className="bg-red-100 text-red-700 px-3 py-1.5 rounded-full text-sm font-medium flex items-center gap-1">
            <AlertCircle size={14} />{stats.pending} Due
          </span>
        </div>
      }
    >
      <div className="space-y-6">
        {/* Search & Filters Bar */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Search */}
          <div className="relative flex-1 min-w-[200px]">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search assignments..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-2xl text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all"
            />
          </div>

          {/* Filter Button */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-4 py-3 rounded-2xl border text-sm font-medium transition-all ${
              showFilters
                ? "bg-blue-50 border-blue-300 text-blue-700"
                : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
            }`}
          >
            <Filter size={18} />
            Filters
          </button>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-3 bg-white border border-gray-200 rounded-2xl text-sm font-medium text-gray-700 focus:outline-none focus:border-blue-400"
          >
            <option value="dueDate">📅 Sort by Due Date</option>
            <option value="points">⭐ Sort by Points</option>
            <option value="subject">📚 Sort by Subject</option>
          </select>
        </div>

        {/* Extended Filters */}
        {showFilters && (
          <div className="p-4 bg-white rounded-2xl border border-gray-100 animate-slideDown">
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setFilterSubject("all")}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  filterSubject === "all"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                📚 All Subjects
              </button>
              {["Mathematics", "Physics", "Chemistry", "Biology", "English"].map((subject) => (
                <button
                  key={subject}
                  onClick={() => setFilterSubject(subject)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    filterSubject === subject
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {getSubjectIcon(subject)} {subject}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Filter Tabs */}
        <div className="flex gap-1 bg-gray-100 rounded-2xl p-1.5 overflow-x-auto">
          {([
            { id: "all", label: "All", count: stats.total },
            { id: "pending", label: "Pending", count: stats.pending },
            { id: "submitted", label: "Submitted", count: stats.submitted },
            { id: "graded", label: "Graded", count: stats.graded },
            { id: "overdue", label: "Overdue", count: stats.overdue },
          ] as { id: TabType; label: string; count: number }[]).map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab.label}
              <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                activeTab === tab.id
                  ? "bg-blue-100 text-blue-700"
                  : "bg-gray-200 text-gray-600"
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {[
            { label: "Pending", value: stats.pending, color: "text-red-600", bg: "bg-red-50", icon: AlertCircle },
            { label: "Submitted", value: stats.submitted, color: "text-blue-600", bg: "bg-blue-50", icon: Send },
            { label: "Graded", value: stats.graded, color: "text-green-600", bg: "bg-green-50", icon: CheckCircle },
            { label: "Overdue", value: stats.overdue, color: "text-yellow-600", bg: "bg-yellow-50", icon: Zap },
            { label: "Avg Score", value: `${stats.avgScore}%`, color: "text-purple-600", bg: "bg-purple-50", icon: Target },
          ].map((stat, index) => (
            <div key={index} className={`${stat.bg} rounded-2xl p-4 text-center`}>
              <stat.icon size={20} className={`${stat.color} mx-auto mb-1`} />
              <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
              <p className="text-xs text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Assignment Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredAssignments.map((assignment) => (
            <div
              key={assignment.id}
              onClick={() => setSelectedAssignment(assignment)}
              className={`bg-white rounded-2xl shadow-sm border transition-all duration-300 cursor-pointer group hover:shadow-lg hover:-translate-y-1 ${
                assignment.status === "overdue"
                  ? "border-red-300 hover:border-red-400"
                  : "border-gray-100 hover:border-blue-200"
              }`}
            >
              <div className="p-5">
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getSubjectColor(assignment.subject)}`}>
                    {getSubjectIcon(assignment.subject)} {assignment.subject}
                  </span>
                  <div className="flex items-center gap-2">
                    {getPriorityBadge(assignment.priority)}
                    {getStatusBadge(assignment.status)}
                  </div>
                </div>

                {/* Title */}
                <h3 className="font-bold text-gray-900 text-base mb-2 group-hover:text-blue-600 transition-colors">
                  {assignment.title}
                </h3>

                {/* Description */}
                {assignment.description && (
                  <p className="text-sm text-gray-500 mb-3 line-clamp-2">{assignment.description}</p>
                )}

                {/* Meta Info */}
                <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                  <div className="flex items-center gap-1">
                    <Timer size={14} />
                    <span className={assignment.status === "overdue" ? "text-red-600 font-semibold" : ""}>
                      {getTimeRemaining(assignment.dueDate)}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star size={14} className="text-yellow-500" />
                    <span>{assignment.points} pts</span>
                  </div>
                </div>

                {/* Grade Badge (for graded) */}
                {assignment.status === "graded" && assignment.score && (
                  <div className="mb-4 p-3 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl border border-green-100">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">Score</span>
                      <span className="text-lg font-bold text-green-700">{assignment.score}%</span>
                    </div>
                    <div className="h-1.5 bg-gray-200 rounded-full mt-2 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full"
                        style={{ width: `${assignment.score}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                {/* Feedback Preview (for graded) */}
                {assignment.status === "graded" && assignment.feedback && (
                  <div className="mb-4 p-3 bg-gray-50 rounded-xl">
                    <div className="flex items-center gap-1 mb-1">
                      <MessageSquare size={12} className="text-gray-400" />
                      <span className="text-xs text-gray-500">Teacher Feedback</span>
                    </div>
                    <p className="text-xs text-gray-600 italic line-clamp-2">"{assignment.feedback}"</p>
                  </div>
                )}

                {/* Action Button */}
                <div className="pt-3 border-t border-gray-100">
                  {assignment.status === "pending" && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedAssignment(assignment);
                        setShowSubmitModal(true);
                      }}
                      className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-4 py-2.5 rounded-xl font-medium transition-all shadow-md shadow-blue-200 hover:shadow-lg"
                    >
                      <Upload size={16} />
                      Submit Assignment
                    </button>
                  )}
                  {assignment.status === "submitted" && (
                    <button className="w-full flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2.5 rounded-xl font-medium transition-all">
                      <Eye size={16} />
                      View Submission
                    </button>
                  )}
                  {assignment.status === "graded" && (
                    <button className="w-full flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2.5 rounded-xl font-medium transition-all">
                      <Eye size={16} />
                      View Details
                    </button>
                  )}
                  {assignment.status === "overdue" && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedAssignment(assignment);
                        setShowSubmitModal(true);
                      }}
                      className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-4 py-2.5 rounded-xl font-medium transition-all shadow-md shadow-red-200 hover:shadow-lg"
                    >
                      <Upload size={16} />
                      Submit Now (Late)
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredAssignments.length === 0 && (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <ClipboardList size={40} className="text-gray-400" />
            </div>
            <p className="text-gray-600 text-lg font-medium">No assignments found</p>
            <p className="text-gray-400 text-sm mt-1">Try changing your filters</p>
          </div>
        )}
      </div>

      {/* Assignment Detail Modal */}
      {selectedAssignment && !showSubmitModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setSelectedAssignment(null)}>
          <div className="bg-white rounded-3xl max-w-lg w-full max-h-[85vh] overflow-y-auto shadow-2xl animate-scaleIn" onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 rounded-t-3xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{getSubjectIcon(selectedAssignment.subject)}</span>
                <div>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-semibold border ${getSubjectColor(selectedAssignment.subject)}`}>
                    {selectedAssignment.subject}
                  </span>
                </div>
              </div>
              <button onClick={() => setSelectedAssignment(null)} className="p-2 hover:bg-gray-100 rounded-xl">
                <X size={20} />
              </button>
            </div>

            <div className="p-6 space-y-5">
              {/* Title & Status */}
              <div>
                <div className="flex items-start justify-between mb-2">
                  <h2 className="text-xl font-bold text-gray-900">{selectedAssignment.title}</h2>
                  {getStatusBadge(selectedAssignment.status)}
                </div>
                <p className="text-sm text-gray-600">{selectedAssignment.teacher}</p>
              </div>

              {/* Due Date & Points */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock size={16} />
                    <span>Due Date</span>
                  </div>
                  <p className="font-semibold text-gray-900 mt-1">
                    {new Date(selectedAssignment.dueDate).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
                  </p>
                  <p className="text-sm text-gray-500">{selectedAssignment.dueTime}</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Star size={16} className="text-yellow-500" />
                    <span>Points</span>
                  </div>
                  <p className="font-semibold text-gray-900 mt-1">{selectedAssignment.points} Points</p>
                  <p className="text-sm text-gray-500">{getPriorityBadge(selectedAssignment.priority)} {selectedAssignment.priority} priority</p>
                </div>
              </div>

              {/* Description */}
              {selectedAssignment.description && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
                  <p className="text-sm text-gray-600 bg-gray-50 p-4 rounded-xl">{selectedAssignment.description}</p>
                </div>
              )}

              {/* Instructions */}
              {selectedAssignment.instructions && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Instructions</h3>
                  <p className="text-sm text-gray-600 bg-blue-50 p-4 rounded-xl border border-blue-100">{selectedAssignment.instructions}</p>
                </div>
              )}

              {/* Attachments */}
              {selectedAssignment.attachments && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Attachments</h3>
                  <div className="space-y-2">
                    {selectedAssignment.attachments.map((file: string, index: number) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-blue-50 transition-colors cursor-pointer">
                        <div className="flex items-center gap-3">
                          <Paperclip size={16} className="text-gray-400" />
                          <span className="text-sm font-medium text-gray-700">{file}</span>
                        </div>
                        <Download size={16} className="text-gray-400" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Rubric (for graded) */}
              {selectedAssignment.rubric && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Grading Rubric</h3>
                  <div className="space-y-2">
                    {selectedAssignment.rubric.map((item: any, index: number) => (
                      <div key={index} className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">{item.criteria}</span>
                        <span className="font-semibold text-gray-900">{item.score}/{item.max}</span>
                      </div>
                    ))}
                    <div className="border-t border-gray-200 pt-2 flex items-center justify-between">
                      <span className="font-semibold text-gray-900">Total</span>
                      <span className="font-bold text-lg text-green-700">{selectedAssignment.score}/{selectedAssignment.points}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Feedback (for graded) */}
              {selectedAssignment.feedback && (
                <div className="p-4 bg-green-50 rounded-xl border border-green-100">
                  <div className="flex items-center gap-2 mb-2">
                    <ThumbsUp size={16} className="text-green-600" />
                    <span className="font-semibold text-green-700">Teacher Feedback</span>
                  </div>
                  <p className="text-sm text-gray-700 italic">"{selectedAssignment.feedback}"</p>
                  <p className="text-xs text-gray-500 mt-2">Graded on {selectedAssignment.gradedDate}</p>
                </div>
              )}

              {/* Submit Button */}
              {(selectedAssignment.status === "pending" || selectedAssignment.status === "overdue") && (
                <button
                  onClick={() => setShowSubmitModal(true)}
                  className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-bold hover:shadow-lg transition-all"
                >
                  Submit Assignment Now
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Submit Modal */}
      {showSubmitModal && selectedAssignment && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowSubmitModal(false)}>
          <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl animate-scaleIn" onClick={(e) => e.stopPropagation()}>
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Submit Assignment</h2>
                <button onClick={() => setShowSubmitModal(false)} className="p-2 hover:bg-gray-100 rounded-xl">
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-xl">
                  <p className="font-semibold text-gray-900">{selectedAssignment.title}</p>
                  <p className="text-sm text-gray-600 mt-1">{selectedAssignment.subject} • {selectedAssignment.points} Points</p>
                </div>

                <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center hover:border-blue-400 transition-colors cursor-pointer">
                  <FileUp size={40} className="mx-auto text-gray-400 mb-3" />
                  <p className="font-medium text-gray-700">Drag & drop files here</p>
                  <p className="text-sm text-gray-500 mt-1">or click to browse</p>
                  <p className="text-xs text-gray-400 mt-2">
                    Allowed: {selectedAssignment.allowedFormats?.join(", ")}
                  </p>
                </div>

                <button className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-bold hover:shadow-lg transition-all flex items-center justify-center gap-2">
                  <Send size={18} />
                  Submit Assignment
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