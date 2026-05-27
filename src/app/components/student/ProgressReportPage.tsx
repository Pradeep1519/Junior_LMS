// ProgressReportPage.tsx - Premium iOS-Style Progress Report (FULL WORKING CODE)
import { useState, useRef } from "react";
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
  Download,
  Printer,
  Share2,
  Star,
  TrendingUp as TrendUp,
  TrendingDown,
  Target,
  Award,
  Zap,
  Clock,
  CheckCircle,
  AlertTriangle,
  Brain,
  ChevronRight,
  Filter,
  Eye,
  MessageCircle,
  ThumbsUp,
  Sparkles,
  Medal,
  ArrowUp,
  ArrowDown,
  X,
  Mail,
  Link,
  Copy,
  Check,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
  Legend,
} from "recharts";

export function ProgressReportPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [showPreview, setShowPreview] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [shareSuccess, setShareSuccess] = useState("");
  const [isDownloading, setIsDownloading] = useState(false);
  const [isPrinting, setIsPrinting] = useState(false);
  const printRef = useRef<HTMLDivElement>(null);

  const sidebarItems = [
    { icon: Home, label: "Dashboard", path: "/student/dashboard" },
    { icon: Calendar, label: "My Classes", path: "/schedule" },
    { icon: TrendingUp, label: "My Progress", active: true },
    { icon: ClipboardList, label: "Assignments", path: "/student/assignments" },
    { icon: Video, label: "Recordings" },
    { icon: Book, label: "Study Material" },
    { icon: Users, label: "Mentor Sessions" },
    { icon: FileText, label: "Reports" },
    { icon: Settings, label: "Settings" },
  ];

  const subjectData = [
    { subject: "Mathematics", test1: 92, test2: 88, test3: 95, assignment: 95, average: 92, grade: "A+", trend: "up", improvement: "+7%", color: "#3B82F6" },
    { subject: "Physics", test1: 85, test2: 90, test3: 89, assignment: 88, average: 88, grade: "A", trend: "up", improvement: "+5%", color: "#8B5CF6" },
    { subject: "Chemistry", test1: 82, test2: 87, test3: 86, assignment: 85, average: 85, grade: "A", trend: "up", improvement: "+4%", color: "#10B981" },
    { subject: "Biology", test1: 80, test2: 75, test3: 79, assignment: 78, average: 78, grade: "B+", trend: "down", improvement: "-1%", color: "#F59E0B" },
    { subject: "English", test1: 88, test2: 92, test3: 90, assignment: 90, average: 90, grade: "A+", trend: "up", improvement: "+2%", color: "#EC4899" },
  ];

  const monthlyProgress = [
    { month: "Oct", Mathematics: 85, Physics: 80, Chemistry: 78, Biology: 82, English: 88 },
    { month: "Nov", Mathematics: 88, Physics: 83, Chemistry: 81, Biology: 79, English: 89 },
    { month: "Dec", Mathematics: 87, Physics: 85, Chemistry: 84, Biology: 80, English: 87 },
    { month: "Jan", Mathematics: 90, Physics: 86, Chemistry: 83, Biology: 77, English: 90 },
    { month: "Feb", Mathematics: 92, Physics: 88, Chemistry: 85, Biology: 78, English: 90 },
  ];

  const attendanceData = [
    { month: "Oct", percentage: 92, present: 23, absent: 2 },
    { month: "Nov", percentage: 95, present: 24, absent: 1 },
    { month: "Dec", percentage: 90, present: 22, absent: 3 },
    { month: "Jan", percentage: 96, present: 25, absent: 1 },
    { month: "Feb", percentage: 94, present: 23, absent: 2 },
    { month: "Mar", percentage: 95, present: 24, absent: 1 },
  ];

  const testScores = [
    { name: "Test 1", score: 85, average: 78, highest: 96 },
    { name: "Test 2", score: 88, average: 80, highest: 94 },
    { name: "Test 3", score: 92, average: 82, highest: 98 },
    { name: "Mock 1", score: 87, average: 79, highest: 95 },
    { name: "Mock 2", score: 90, average: 81, highest: 97 },
  ];

  const chapterWiseData = [
    { chapter: "Quadratic Eq.", score: 95, total: 100, status: "Mastered" },
    { chapter: "Trigonometry", score: 88, total: 100, status: "Strong" },
    { chapter: "Arithmetic Prog.", score: 82, total: 100, status: "Good" },
    { chapter: "Coordinate Geo.", score: 75, total: 100, status: "Average" },
    { chapter: "Statistics", score: 70, total: 100, status: "Needs Work" },
    { chapter: "Probability", score: 65, total: 100, status: "Weak" },
  ];

  const timeSpentData = [
    { subject: "Mathematics", hours: 45, color: "#3B82F6" },
    { subject: "Physics", hours: 38, color: "#8B5CF6" },
    { subject: "Chemistry", hours: 35, color: "#10B981" },
    { subject: "Biology", hours: 28, color: "#F59E0B" },
    { subject: "English", hours: 22, color: "#EC4899" },
  ];

  const teacherFeedback = [
    { teacher: "Mr. Sharma", subject: "Mathematics", avatar: "AS",
      feedback: "Excellent progress in advanced topics. Shows strong problem-solving skills and logical thinking. Your dedication to practice is commendable!",
      rating: 5, date: "2 days ago" },
    { teacher: "Dr. Patel", subject: "Physics", avatar: "DP",
      feedback: "Good understanding of concepts. Needs to improve speed in numerical problem-solving for competitive exams. Practice more derivations.",
      rating: 4, date: "5 days ago" },
    { teacher: "Mrs. Reddy", subject: "Chemistry", avatar: "PR",
      feedback: "Consistent performance. Strong in organic chemistry. Should focus more on physical chemistry numerical problems.",
      rating: 4, date: "1 week ago" },
  ];

  const mentorFeedback = [
    { mentor: "Dr. Gupta", expertise: "Engineering Entrance Prep", avatar: "RG",
      feedback: "Aarav is making excellent progress in JEE preparation. His analytical skills are commendable. Focus on time management during mock tests and practice previous year papers.",
      rating: 5, date: "3 days ago" },
  ];

  const strengths = [
    { name: "Problem Solving", score: 95, icon: Brain },
    { name: "Analytical Thinking", score: 92, icon: Target },
    { name: "Consistent Performance", score: 90, icon: TrendingUp },
    { name: "Quick Learner", score: 88, icon: Zap },
  ];

  const improvements = [
    { name: "Time Management", score: 65, icon: Clock },
    { name: "Speed in Calculations", score: 60, icon: Zap },
    { name: "Revision Strategy", score: 70, icon: Book },
  ];

  const achievements = [
    { title: "Perfect Attendance", description: "3 months streak", icon: "🏆", date: "Mar 2026" },
    { title: "Top Scorer", description: "Mathematics Test", icon: "🥇", date: "Feb 2026" },
    { title: "Quick Learner", description: "Completed 50+ lessons", icon: "⚡", date: "Jan 2026" },
    { title: "Consistent Star", description: "90%+ in 5 tests", icon: "⭐", date: "Dec 2025" },
  ];

  // ========== BUTTON HANDLERS ==========

  // 1. PREVIEW
  const handlePreview = () => {
    setShowPreview(true);
  };

  // 2. DOWNLOAD PDF
  const handleDownloadPDF = async () => {
    setIsDownloading(true);
    try {
      // Print method se PDF save (browser ka built-in feature)
      const printContent = document.getElementById("printable-report");
      const originalContent = document.body.innerHTML;
      
      if (printContent) {
        document.body.innerHTML = printContent.innerHTML;
        window.print();
        document.body.innerHTML = originalContent;
        window.location.reload();
      }
    } catch (error) {
      console.error("Download failed:", error);
    }
    setIsDownloading(false);
  };

  // 3. PRINT
  const handlePrint = () => {
    setIsPrinting(true);
    setTimeout(() => {
      window.print();
      setIsPrinting(false);
    }, 300);
  };

  // 4. SHARE
  const handleShareWhatsApp = () => {
    const message = encodeURIComponent(
      `📊 *Aarav Sharma's Progress Report*\n\n` +
      `📚 Class: 10 | Engineering Excellence\n` +
      `📈 Overall Score: 85% (Grade A)\n` +
      `🏆 Class Rank: 8/43\n` +
      `✅ Attendance: 95%\n\n` +
      `📋 Subject-wise:\n` +
      `• Mathematics: 92% (A+)\n` +
      `• Physics: 88% (A)\n` +
      `• Chemistry: 85% (A)\n` +
      `• Biology: 78% (B+)\n` +
      `• English: 90% (A+)\n\n` +
      `_Report generated by JuniorDream LMS_`
    );
    window.open(`https://wa.me/?text=${message}`, "_blank");
    setShowShareOptions(false);
    setShareSuccess("WhatsApp share link opened!");
    setTimeout(() => setShareSuccess(""), 3000);
  };

  const handleShareEmail = () => {
    const subject = encodeURIComponent("Aarav Sharma's Progress Report - JuniorDream LMS");
    const body = encodeURIComponent(
      `Dear Parents,\n\n` +
      `Please find below Aarav Sharma's progress report summary:\n\n` +
      `Overall Score: 85% (Grade A)\n` +
      `Class Rank: 8/43\n` +
      `Attendance: 95%\n\n` +
      `For detailed report, please login to JuniorDream LMS.\n\n` +
      `Regards,\nJuniorDream Team`
    );
    window.open(`mailto:parents@example.com?subject=${subject}&body=${body}`, "_blank");
    setShowShareOptions(false);
    setShareSuccess("Email client opened!");
    setTimeout(() => setShareSuccess(""), 3000);
  };

  const handleShareLink = () => {
    const link = `https://juniordream.com/reports/student/${Math.random().toString(36).substr(2, 9)}`;
    navigator.clipboard.writeText(link).then(() => {
      setShowShareOptions(false);
      setShareSuccess("Report link copied to clipboard!");
      setTimeout(() => setShareSuccess(""), 3000);
    });
  };

  // ========== PRINT-SPECIFIC STYLES ==========
  const printStyles = `
    @media print {
      body * {
        visibility: hidden;
      }
      #printable-report, #printable-report * {
        visibility: visible;
      }
      #printable-report {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        padding: 20px;
      }
      .no-print {
        display: none !important;
      }
    }
  `;

  return (
    <DashboardLayout
      title="Progress Report"
      subtitle="Aarav Sharma • Class 10 • Engineering Excellence"
      sidebarItems={sidebarItems}
      userInfo={
        <div className="flex items-center gap-2">
          <span className="bg-green-100 text-green-700 px-3 py-1.5 rounded-full text-sm font-medium flex items-center gap-1">
            <TrendUp size={14} />+5% Growth
          </span>
        </div>
      }
    >
      <style>{printStyles}</style>

      {/* Success Toast */}
      {shareSuccess && (
        <div className="fixed top-6 right-6 z-50 bg-green-500 text-white px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-2 animate-slideIn">
          <CheckCircle size={20} />
          <span className="font-medium">{shareSuccess}</span>
        </div>
      )}

      <div className="space-y-6">
        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 justify-end no-print">
          {/* Preview Button */}
          <button
            onClick={handlePreview}
            className="flex items-center gap-2 bg-white hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-xl font-medium border border-gray-200 transition-all hover:shadow-md"
          >
            <Eye size={18} />
            Preview
          </button>

          {/* Download PDF Button */}
          <button
            onClick={handleDownloadPDF}
            disabled={isDownloading}
            className="flex items-center gap-2 bg-white hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-xl font-medium border border-gray-200 transition-all hover:shadow-md disabled:opacity-50"
          >
            <Download size={18} />
            {isDownloading ? "Downloading..." : "Download PDF"}
          </button>

          {/* Print Button */}
          <button
            onClick={handlePrint}
            disabled={isPrinting}
            className="flex items-center gap-2 bg-white hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-xl font-medium border border-gray-200 transition-all hover:shadow-md disabled:opacity-50"
          >
            <Printer size={18} />
            {isPrinting ? "Printing..." : "Print"}
          </button>

          {/* Share Button with Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowShareOptions(!showShareOptions)}
              className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-5 py-2 rounded-xl font-medium transition-all hover:shadow-lg shadow-blue-200"
            >
              <Share2 size={18} />
              Share with Parents
            </button>

            {/* Share Dropdown */}
            {showShareOptions && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-40 animate-scaleIn">
                <button
                  onClick={handleShareWhatsApp}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left"
                >
                  <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                    <span className="text-xl">💬</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 text-sm">WhatsApp</p>
                    <p className="text-xs text-gray-500">Share via WhatsApp</p>
                  </div>
                </button>
                <button
                  onClick={handleShareEmail}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left"
                >
                  <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                    <Mail size={18} className="text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 text-sm">Email</p>
                    <p className="text-xs text-gray-500">Send via Email</p>
                  </div>
                </button>
                <button
                  onClick={handleShareLink}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left"
                >
                  <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                    <Link size={18} className="text-purple-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 text-sm">Copy Link</p>
                    <p className="text-xs text-gray-500">Copy shareable link</p>
                  </div>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* ========== PRINTABLE REPORT CONTENT ========== */}
        <div id="printable-report">
          {/* Report Header (Visible in print) */}
          <div className="hidden print:block mb-8 text-center border-b-2 border-gray-300 pb-6">
            <h1 className="text-3xl font-bold text-gray-900">JuniorDream LMS</h1>
            <p className="text-lg text-gray-600 mt-2">Student Progress Report</p>
            <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
              <div><strong>Student:</strong> Aarav Sharma</div>
              <div><strong>Class:</strong> 10 | Engineering Excellence</div>
              <div><strong>Period:</strong> April 2025 - March 2026</div>
            </div>
          </div>

          {/* Report Content */}
          <div className="space-y-6">
            {/* Top Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-5 text-white shadow-lg shadow-blue-200">
                <div className="flex items-center justify-between mb-3">
                  <Target size={24} className="text-blue-200" />
                  <ArrowUp size={16} className="text-green-300" />
                </div>
                <p className="text-4xl font-bold mb-1">85%</p>
                <p className="text-blue-100 text-sm">Overall Score</p>
                <p className="text-green-200 text-xs mt-2">+5% from last month</p>
              </div>

              <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-5 text-white shadow-lg shadow-purple-200">
                <div className="flex items-center justify-between mb-3">
                  <Medal size={24} className="text-purple-200" />
                  <ArrowUp size={16} className="text-green-300" />
                </div>
                <p className="text-4xl font-bold mb-1">8th</p>
                <p className="text-purple-100 text-sm">Class Rank</p>
                <p className="text-green-200 text-xs mt-2">Out of 43 students</p>
              </div>

              <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-5 text-white shadow-lg shadow-green-200">
                <div className="flex items-center justify-between mb-3">
                  <CheckCircle size={24} className="text-green-200" />
                  <span className="text-green-200 text-sm">81st</span>
                </div>
                <p className="text-4xl font-bold mb-1">A</p>
                <p className="text-green-100 text-sm">Grade</p>
                <p className="text-green-200 text-xs mt-2">81st Percentile</p>
              </div>

              <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl p-5 text-white shadow-lg shadow-orange-200">
                <div className="flex items-center justify-between mb-3">
                  <Clock size={24} className="text-orange-200" />
                  <ArrowUp size={16} className="text-green-300" />
                </div>
                <p className="text-4xl font-bold mb-1">168h</p>
                <p className="text-orange-100 text-sm">Study Hours</p>
                <p className="text-green-200 text-xs mt-2">This semester</p>
              </div>
            </div>

            {/* Subject-wise Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-6">Subject-wise Performance</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-4 px-4 text-sm font-semibold text-gray-500">Subject</th>
                      <th className="text-center py-4 px-4 text-sm font-semibold text-gray-500">Test 1</th>
                      <th className="text-center py-4 px-4 text-sm font-semibold text-gray-500">Test 2</th>
                      <th className="text-center py-4 px-4 text-sm font-semibold text-gray-500">Test 3</th>
                      <th className="text-center py-4 px-4 text-sm font-semibold text-gray-500">Assignment</th>
                      <th className="text-center py-4 px-4 text-sm font-semibold text-gray-500">Average</th>
                      <th className="text-center py-4 px-4 text-sm font-semibold text-gray-500">Grade</th>
                      <th className="text-center py-4 px-4 text-sm font-semibold text-gray-500">Trend</th>
                    </tr>
                  </thead>
                  <tbody>
                    {subjectData.map((subject, index) => (
                      <tr key={index} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: subject.color }}></div>
                            <span className="font-medium text-gray-900">{subject.subject}</span>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-center text-gray-700">{subject.test1}%</td>
                        <td className="py-4 px-4 text-center text-gray-700">{subject.test2}%</td>
                        <td className="py-4 px-4 text-center text-gray-700">{subject.test3}%</td>
                        <td className="py-4 px-4 text-center text-gray-700">{subject.assignment}%</td>
                        <td className="py-4 px-4 text-center font-bold text-gray-900">{subject.average}%</td>
                        <td className="py-4 px-4 text-center">
                          <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-bold text-sm">
                            {subject.grade}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-center">
                          <span className={`inline-flex items-center gap-1 text-sm font-medium ${
                            subject.trend === "up" ? "text-green-600" : "text-red-600"
                          }`}>
                            {subject.trend === "up" ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
                            {subject.improvement}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Attendance & Study Hours */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-6">Attendance Record</h2>
                <ResponsiveContainer width="100%" height={250}>
                  <AreaChart data={attendanceData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="month" stroke="#9ca3af" fontSize={12} />
                    <YAxis stroke="#9ca3af" fontSize={12} domain={[85, 100]} />
                    <Tooltip />
                    <Area type="monotone" dataKey="percentage" stroke="#10B981" fill="#D1FAE5" strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
                <div className="grid grid-cols-3 gap-3 mt-4">
                  <div className="text-center p-3 bg-gray-50 rounded-xl">
                    <p className="text-xs text-gray-500">Total Days</p>
                    <p className="text-xl font-bold text-gray-900">141</p>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-xl">
                    <p className="text-xs text-gray-500">Present</p>
                    <p className="text-xl font-bold text-green-600">134</p>
                  </div>
                  <div className="text-center p-3 bg-red-50 rounded-xl">
                    <p className="text-xs text-gray-500">Absent</p>
                    <p className="text-xl font-bold text-red-600">7</p>
                  </div>
                </div>
              </div>

              {/* Study Time Distribution */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-6">Study Time Distribution</h2>
                <div className="space-y-4">
                  {timeSpentData.map((item, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700">{item.subject}</span>
                        <span className="text-sm font-bold text-gray-900">{item.hours}h</span>
                      </div>
                      <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full rounded-full transition-all duration-1000" 
                             style={{ width: `${(item.hours / 50) * 100}%`, backgroundColor: item.color }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Strengths & Improvements */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <ThumbsUp size={18} className="text-green-600" />
                  </div>
                  <h2 className="text-lg font-bold text-gray-900">Strengths</h2>
                </div>
                <div className="space-y-4">
                  {strengths.map((item, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <item.icon size={16} className="text-green-600" />
                          <span className="text-sm font-medium text-gray-700">{item.name}</span>
                        </div>
                        <span className="text-sm font-bold text-green-600">{item.score}%</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full" 
                             style={{ width: `${item.score}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                    <AlertTriangle size={18} className="text-orange-600" />
                  </div>
                  <h2 className="text-lg font-bold text-gray-900">Areas for Improvement</h2>
                </div>
                <div className="space-y-4">
                  {improvements.map((item, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <item.icon size={16} className="text-orange-600" />
                          <span className="text-sm font-medium text-gray-700">{item.name}</span>
                        </div>
                        <span className="text-sm font-bold text-orange-600">{item.score}%</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-orange-400 to-red-500 rounded-full" 
                             style={{ width: `${item.score}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Teacher & Mentor Feedback */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Teacher Feedback</h2>
                <div className="space-y-3">
                  {teacherFeedback.map((feedback, index) => (
                    <div key={index} className="p-4 bg-blue-50 rounded-xl">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center text-white text-xs font-bold">
                            {feedback.avatar}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900 text-sm">{feedback.teacher}</p>
                            <p className="text-xs text-gray-500">{feedback.subject}</p>
                          </div>
                        </div>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} size={12} className={i < feedback.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"} />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 italic mt-2">"{feedback.feedback}"</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Mentor Feedback</h2>
                {mentorFeedback.map((feedback, index) => (
                  <div key={index} className="p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl border border-green-100">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center text-white text-xs font-bold">
                          {feedback.avatar}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 text-sm">{feedback.mentor}</p>
                          <p className="text-xs text-gray-500">{feedback.expertise}</p>
                        </div>
                      </div>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={12} className={i < feedback.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"} />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 italic mt-2">"{feedback.feedback}"</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="text-center text-sm text-gray-400 pt-4 border-t border-gray-200">
              <p>Generated by JuniorDream LMS • {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>
              <p>This is a computer-generated report</p>
            </div>
          </div>
        </div>
      </div>

      {/* ========== PREVIEW MODAL ========== */}
      {showPreview && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowPreview(false)}>
          <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl" onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-3xl flex items-center justify-between z-10">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Report Preview</h2>
                <p className="text-sm text-gray-500">Aarav Sharma • Class 10</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrint}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl text-sm font-medium transition-colors"
                >
                  <Printer size={16} />
                  Print
                </button>
                <button
                  onClick={handleDownloadPDF}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-medium transition-colors"
                >
                  <Download size={16} />
                  Download
                </button>
                <button
                  onClick={() => setShowPreview(false)}
                  className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Modal Content - Shows same report */}
            <div className="p-6">
              {/* Top Stats Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-5 text-white">
                  <Target size={24} className="text-blue-200 mb-3" />
                  <p className="text-4xl font-bold mb-1">85%</p>
                  <p className="text-blue-100 text-sm">Overall Score</p>
                </div>
                <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-5 text-white">
                  <Medal size={24} className="text-purple-200 mb-3" />
                  <p className="text-4xl font-bold mb-1">8th</p>
                  <p className="text-purple-100 text-sm">Class Rank</p>
                </div>
                <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-5 text-white">
                  <CheckCircle size={24} className="text-green-200 mb-3" />
                  <p className="text-4xl font-bold mb-1">A</p>
                  <p className="text-green-100 text-sm">Grade</p>
                </div>
                <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl p-5 text-white">
                  <Clock size={24} className="text-orange-200 mb-3" />
                  <p className="text-4xl font-bold mb-1">168h</p>
                  <p className="text-orange-100 text-sm">Study Hours</p>
                </div>
              </div>

              {/* Subject Table */}
              <div className="mb-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Subject-wise Performance</h2>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-3 font-semibold text-gray-500">Subject</th>
                      <th className="text-center py-3 px-3 font-semibold text-gray-500">Avg</th>
                      <th className="text-center py-3 px-3 font-semibold text-gray-500">Grade</th>
                    </tr>
                  </thead>
                  <tbody>
                    {subjectData.map((subject, index) => (
                      <tr key={index} className="border-b border-gray-50">
                        <td className="py-3 px-3 font-medium text-gray-900">{subject.subject}</td>
                        <td className="py-3 px-3 text-center font-bold text-gray-900">{subject.average}%</td>
                        <td className="py-3 px-3 text-center">
                          <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-bold text-xs">
                            {subject.grade}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Strengths & Improvements */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">✅ Strengths</h3>
                  {strengths.map((s, i) => (
                    <div key={i} className="flex items-center gap-2 py-1">
                      <s.icon size={14} className="text-green-600" />
                      <span className="text-sm text-gray-700">{s.name}</span>
                    </div>
                  ))}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">⚠️ Areas for Improvement</h3>
                  {improvements.map((imp, i) => (
                    <div key={i} className="flex items-center gap-2 py-1">
                      <imp.icon size={14} className="text-orange-600" />
                      <span className="text-sm text-gray-700">{imp.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div className="text-center text-xs text-gray-400 pt-4 border-t border-gray-200">
                Generated by JuniorDream LMS • {new Date().toLocaleDateString()}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Animations */}
      <style>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(100%); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-slideIn {
          animation: slideIn 0.4s ease-out;
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-scaleIn {
          animation: scaleIn 0.2s ease-out;
        }
        @media print {
          .no-print {
            display: none !important;
          }
          body {
            background: white;
            padding: 0;
            margin: 0;
          }
          #printable-report {
            padding: 0;
          }
        }
      `}</style>
    </DashboardLayout>
  );
}