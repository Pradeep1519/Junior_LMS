// ============================================
// UPDATED: student-portal/src/app/components/student/AssignmentsPage.tsx
// Firebase Connected + Submit Working
// ============================================
import { useState, useEffect } from "react";
import { DashboardLayout } from "../DashboardLayout";
import { useAuth } from "../../context/AuthContext";
import { getStudentAssignments, submitAssignment, uploadFile, db } from "../../config/firebase";
import { doc, getDoc } from "firebase/firestore";
import {
  Home, Calendar, TrendingUp, ClipboardList, Video, Book, Users, Settings,
  Clock, CheckCircle, AlertCircle, Upload, Search, Filter, Star, Eye, X,
  Paperclip, FileUp, MessageSquare, Zap, Timer, Target, ThumbsUp, Send
} from "lucide-react";

type TabType = "all" | "pending" | "submitted" | "graded" | "overdue";

export function AssignmentsPage() {
  const { userData } = useAuth();
  const studentId = userData?.studentId || userData?.uid || "";
  
  const [activeTab, setActiveTab] = useState<TabType>("all");
  const [selectedAssignment, setSelectedAssignment] = useState<any>(null);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterSubject, setFilterSubject] = useState("all");
  const [sortBy, setSortBy] = useState("dueDate");
  const [showFilters, setShowFilters] = useState(false);
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploadFileState, setUploadFileState] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    async function fetchAssignments() {
      if (!studentId) return;
      try {
        const data = await getStudentAssignments(studentId);
        setAssignments(data);
      } catch (err) { console.error(err); }
      finally { setLoading(false); }
    }
    fetchAssignments();
  }, [studentId]);

  const sidebarItems = [
    { icon: Home, label: "Dashboard", path: "/student/dashboard" },
    { icon: Calendar, label: "My Classes", path: "/schedule" },
    { icon: TrendingUp, label: "My Progress", path: "/student/reports" },
    { icon: ClipboardList, label: "Assignments", active: true },
    { icon: Video, label: "Recordings", path: "/recordings" },
    { icon: Book, label: "Study Material", path: "/study-material" },
    { icon: Users, label: "Mentor Sessions", path: "/mentor-sessions" },
    { icon: Settings, label: "Settings", path: "/settings" },
  ];

  const getSubjectColor = (subject: string) => {
    const colors: Record<string, string> = {
      Mathematics: "bg-blue-100 text-blue-700 border-blue-200",
      Physics: "bg-purple-100 text-purple-700 border-purple-200",
      Chemistry: "bg-green-100 text-green-700 border-green-200",
      Biology: "bg-orange-100 text-orange-700 border-orange-200",
      English: "bg-pink-100 text-pink-700 border-pink-200",
    };
    return colors[subject] || "bg-gray-100 text-gray-700 border-gray-200";
  };

  const getSubjectIcon = (subject: string) => {
    const icons: Record<string, string> = {
      Mathematics: "📐", Physics: "⚡", Chemistry: "🧪", Biology: "🧬", English: "📖",
    };
    return icons[subject] || "📚";
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending": return <span className="flex items-center gap-1.5 bg-red-50 text-red-700 px-3 py-1.5 rounded-full text-xs font-semibold"><AlertCircle size={12} /> Pending</span>;
      case "submitted": return <span className="flex items-center gap-1.5 bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full text-xs font-semibold"><Clock size={12} /> Under Review</span>;
      case "graded": return <span className="flex items-center gap-1.5 bg-green-50 text-green-700 px-3 py-1.5 rounded-full text-xs font-semibold"><CheckCircle size={12} /> Graded</span>;
      default: return <span className="flex items-center gap-1.5 bg-yellow-50 text-yellow-700 px-3 py-1.5 rounded-full text-xs font-semibold"><Zap size={12} /> Overdue</span>;
    }
  };

  // ✅ REAL SUBMIT FUNCTION
  const handleSubmitAssignment = async () => {
    if (!uploadFileState || !selectedAssignment) return;
    setIsSubmitting(true);
    try {
      const fileUrl = await uploadFile(`assignments/${studentId}/${Date.now()}_${uploadFileState.name}`, uploadFileState);
      await submitAssignment(selectedAssignment.id || selectedAssignment.assignmentId, studentId, fileUrl);
      setSuccessMsg("✅ Assignment submitted!");
      setTimeout(() => setSuccessMsg(""), 3000);
      setShowSubmitModal(false);
      setUploadFileState(null);
      const data = await getStudentAssignments(studentId);
      setAssignments(data);
    } catch (err) { console.error(err); }
    setIsSubmitting(false);
  };

  // Determine status for each assignment based on submissions
  const enrichedAssignments = assignments.map(a => {
    const submission = a.submissions?.[studentId];
    let status = a.status || "active";
    if (submission) {
      status = submission.grade ? "graded" : "submitted";
    } else if (new Date(a.dueDate) < new Date()) {
      status = "overdue";
    }
    return { ...a, status, submission };
  });

  const filteredAssignments = enrichedAssignments
    .filter(a => activeTab === "all" ? true : a.status === activeTab)
    .filter(a => searchQuery === "" || a.title?.toLowerCase().includes(searchQuery.toLowerCase()) || a.subject?.toLowerCase().includes(searchQuery.toLowerCase()))
    .filter(a => filterSubject === "all" || a.subject === filterSubject)
    .sort((a, b) => sortBy === "dueDate" ? new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime() : sortBy === "points" ? (b.points || 0) - (a.points || 0) : (a.subject || "").localeCompare(b.subject || ""));

  const stats = {
    total: enrichedAssignments.length,
    pending: enrichedAssignments.filter(a => a.status === "pending" || a.status === "overdue").length,
    submitted: enrichedAssignments.filter(a => a.status === "submitted").length,
    graded: enrichedAssignments.filter(a => a.status === "graded").length,
    avgScore: 0
  };

  return (
    <DashboardLayout title="My Assignments" subtitle={`${stats.pending} pending • ${stats.graded} graded`} sidebarItems={sidebarItems}>
      {successMsg && <div style={{ position: 'fixed', top: '24px', right: '24px', zIndex: 9999, background: '#10b981', color: 'white', padding: '12px 20px', borderRadius: '12px', fontWeight: 600, fontSize: '13px' }}>{successMsg}</div>}
      
      <div className="space-y-6">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[200px]">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="text" placeholder="Search assignments..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-2xl text-sm focus:outline-none focus:border-blue-400" />
          </div>
          <select value={sortBy} onChange={e => setSortBy(e.target.value)}
            className="px-4 py-3 bg-white border border-gray-200 rounded-2xl text-sm font-medium">
            <option value="dueDate">📅 Due Date</option><option value="points">⭐ Points</option><option value="subject">📚 Subject</option>
          </select>
        </div>

        <div className="flex gap-1 bg-gray-100 rounded-2xl p-1.5 overflow-x-auto">
          {[{ id: "all", label: "All", count: stats.total }, { id: "pending", label: "Pending", count: stats.pending }, { id: "submitted", label: "Submitted", count: stats.submitted }, { id: "graded", label: "Graded", count: stats.graded }].map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id as TabType)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm whitespace-nowrap ${activeTab === tab.id ? "bg-white text-gray-900 shadow-sm" : "text-gray-500"}`}>
              {tab.label} <span className="text-xs bg-gray-200 px-2 py-0.5 rounded-full">{tab.count}</span>
            </button>
          ))}
        </div>

        {filteredAssignments.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredAssignments.map((a) => (
              <div key={a.id} onClick={() => setSelectedAssignment(a)}
                className={`bg-white rounded-2xl shadow-sm border p-5 transition-all cursor-pointer hover:shadow-lg hover:-translate-y-1 ${a.status === "overdue" ? "border-red-300" : "border-gray-100"}`}>
                <div className="flex items-start justify-between mb-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getSubjectColor(a.subject)}`}>{getSubjectIcon(a.subject)} {a.subject}</span>
                  {getStatusBadge(a.status)}
                </div>
                <h3 className="font-bold text-gray-900 text-base mb-2">{a.title}</h3>
                <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                  <span className="flex items-center gap-1"><Timer size={14} />{a.dueDate ? new Date(a.dueDate).toLocaleDateString() : "N/A"}</span>
                  <span className="flex items-center gap-1"><Star size={14} className="text-yellow-500" />{a.points || 0} pts</span>
                </div>
                {a.status === "graded" && a.submission?.grade && (
                  <div className="mb-4 p-3 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl">
                    <div className="flex justify-between"><span className="text-sm">Score</span><span className="text-lg font-bold text-green-700">{a.submission.grade}%</span></div>
                  </div>
                )}
                <div className="pt-3 border-t border-gray-100">
                  {(a.status === "pending" || a.status === "overdue") && (
                    <button onClick={(e) => { e.stopPropagation(); setSelectedAssignment(a); setShowSubmitModal(true); }}
                      className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2.5 rounded-xl font-medium shadow-md shadow-blue-200 hover:shadow-lg">
                      <Upload size={16} /> Submit
                    </button>
                  )}
                  {(a.status === "submitted" || a.status === "graded") && (
                    <button className="w-full flex items-center justify-center gap-2 bg-gray-100 text-gray-700 px-4 py-2.5 rounded-xl font-medium">
                      <Eye size={16} /> View
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16"><ClipboardList size={40} className="mx-auto text-gray-400 mb-4" /><p className="text-gray-500">No assignments found</p></div>
        )}
      </div>

      {/* SUBMIT MODAL */}
      {showSubmitModal && selectedAssignment && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowSubmitModal(false)}>
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Submit Assignment</h2>
              <button onClick={() => setShowSubmitModal(false)} className="p-2 hover:bg-gray-100 rounded-xl"><X size={20} /></button>
            </div>
            <div className="p-4 bg-blue-50 rounded-xl mb-4">
              <p className="font-semibold text-gray-900">{selectedAssignment.title}</p>
              <p className="text-sm text-gray-600">{selectedAssignment.subject} • {selectedAssignment.points || 0} Points</p>
            </div>
            <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center hover:border-blue-400 cursor-pointer mb-4" onClick={() => document.getElementById('fileInput')?.click()}>
              {uploadFileState ? (
                <div><FileUp size={40} className="mx-auto text-green-500 mb-3" /><p className="font-medium text-gray-700">{uploadFileState.name}</p></div>
              ) : (
                <div><FileUp size={40} className="mx-auto text-gray-400 mb-3" /><p className="font-medium text-gray-700">Click to upload</p></div>
              )}
              <input id="fileInput" type="file" className="hidden" onChange={e => setUploadFileState(e.target.files?.[0] || null)} />
            </div>
            <button onClick={handleSubmitAssignment} disabled={!uploadFileState || isSubmitting}
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-bold flex items-center justify-center gap-2 disabled:opacity-50">
              {isSubmitting ? "Submitting..." : <><Send size={18} /> Submit</>}
            </button>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}