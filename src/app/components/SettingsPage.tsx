// SettingsPage.tsx - Premium iOS-Style Settings Page (FIXED)
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
  Settings,
  Bell,
  Moon,
  Sun,
  Globe,
  Lock,
  Shield,
  CreditCard,
  LogOut,
  Camera,
  User,
  Mail,
  Phone,
  School,
  Target,
  Eye,
  Smartphone,
  Monitor,
  AlertTriangle,
  CheckCircle,
  Crown,
  BadgeCheck,
  History,
  Key,
  X,
  Clock,
} from "lucide-react";

export function SettingsPage() {
  const [activeSection, setActiveSection] = useState("profile");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const [profile, setProfile] = useState({
    name: "Aarav Sharma",
    email: "aarav.sharma@email.com",
    phone: "+91 98765 43210",
    class: "Class 10",
    program: "Engineering Excellence",
    targetExam: "JEE Advanced",
    school: "Delhi Public School, New Delhi",
    avatar: "AS",
  });

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    pushNotifications: true,
    smsAlerts: false,
    classReminder: true,
    assignmentReminder: true,
    testScheduleAlert: true,
    mentorSessionReminder: true,
    resultPublished: true,
    weeklyReport: false,
  });

  const [language, setLanguage] = useState("english");
  const [timezone, setTimezone] = useState("Asia/Kolkata");

  const sidebarItems = [
    { icon: Home, label: "Dashboard", path: "/student/dashboard" },
    { icon: Calendar, label: "My Classes", path: "/schedule" },
    { icon: TrendingUp, label: "My Progress", path: "/student/reports" },
    { icon: ClipboardList, label: "Assignments", path: "/student/assignments" },
    { icon: Video, label: "Recordings", path: "/recordings" },
    { icon: Book, label: "Study Material", path: "/study-material" },
    { icon: Users, label: "Mentor Sessions", path: "/mentor-sessions" },
    { icon: Settings, label: "Settings", active: true },
  ];

  const settingsSections = [
    { id: "profile", label: "👤 Profile", icon: User },
    { id: "account", label: "🔐 Account", icon: Key },
    { id: "notifications", label: "🔔 Notifications", icon: Bell },
    { id: "danger", label: "⚠️ Danger Zone", icon: AlertTriangle },
  ];

  const Toggle = ({ enabled, onChange }: { enabled: boolean; onChange: () => void }) => (
    <button
      onClick={onChange}
      className={`relative w-12 h-7 rounded-full transition-all duration-300 ${
        enabled ? "bg-blue-600" : "bg-gray-300"
      }`}
    >
      <div
        className={`absolute top-0.5 w-6 h-6 bg-white rounded-full shadow transition-all duration-300 ${
          enabled ? "left-5.5" : "left-0.5"
        }`}
      />
    </button>
  );

  return (
    <DashboardLayout
      title="Settings"
      subtitle="Manage your account and preferences"
      sidebarItems={sidebarItems}
    >
      <div className="flex gap-6">
        <div className="hidden lg:block w-64 flex-shrink-0">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-3 sticky top-24">
            {settingsSections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all mb-1 ${
                  activeSection === section.id
                    ? "bg-blue-50 text-blue-700"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <section.icon size={18} />
                {section.label}
                {section.id === "danger" && (
                  <span className="ml-auto w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 space-y-6">
          <div className="lg:hidden flex gap-1 bg-gray-100 rounded-2xl p-1.5 overflow-x-auto">
            {settingsSections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
                  activeSection === section.id
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-500"
                }`}
              >
                <section.icon size={16} />
                {section.label}
              </button>
            ))}
          </div>

          {/* Profile Section */}
          {activeSection === "profile" && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 text-center">
                <div className="relative inline-block">
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-500 rounded-3xl flex items-center justify-center text-white text-4xl font-bold shadow-xl mx-auto">
                    {profile.avatar}
                  </div>
                  <button className="absolute -bottom-2 -right-2 w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg hover:bg-blue-700 transition-colors">
                    <Camera size={16} />
                  </button>
                </div>
                <h2 className="text-xl font-bold text-gray-900 mt-4">{profile.name}</h2>
                <p className="text-gray-500">{profile.program}</p>
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-6">Personal Information</h3>
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                    <div className="relative">
                      <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input type="text" value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                    <div className="relative">
                      <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input type="email" value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })} className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                    <div className="relative">
                      <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input type="tel" value={profile.phone} onChange={(e) => setProfile({ ...profile, phone: e.target.value })} className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Class</label>
                      <select value={profile.class} onChange={(e) => setProfile({ ...profile, class: e.target.value })} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-400">
                        {["Class 6", "Class 7", "Class 8", "Class 9", "Class 10", "Class 11", "Class 12"].map(c => (<option key={c}>{c}</option>))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Program</label>
                      <select value={profile.program} onChange={(e) => setProfile({ ...profile, program: e.target.value })} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-400">
                        <option>Engineering Excellence</option>
                        <option>Medical Prep Pro</option>
                        <option>Civil Services Foundation</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Target Exam</label>
                    <div className="relative">
                      <Target size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                      <select value={profile.targetExam} onChange={(e) => setProfile({ ...profile, targetExam: e.target.value })} className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-400">
                        <option>JEE Advanced</option>
                        <option>JEE Main</option>
                        <option>NEET</option>
                        <option>UPSC CSE</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">School Name</label>
                    <div className="relative">
                      <School size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input type="text" value={profile.school} onChange={(e) => setProfile({ ...profile, school: e.target.value })} className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all" />
                    </div>
                  </div>
                  <button className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-bold hover:shadow-lg transition-all">Save Changes</button>
                </div>
              </div>
            </div>
          )}

          {/* Account Section */}
          {activeSection === "account" && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-6">Change Password</h3>
                <div className="space-y-4">
                  <div className="relative">
                    <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input type="password" placeholder="Current Password" className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-400" />
                  </div>
                  <div className="relative">
                    <Key size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input type="password" placeholder="New Password" className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-400" />
                  </div>
                  <div className="relative">
                    <Key size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input type="password" placeholder="Confirm New Password" className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-400" />
                  </div>
                  <button className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors">Update Password</button>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-6">Preferences</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-3">
                    <div className="flex items-center gap-3">
                      <Globe size={20} className="text-gray-500" />
                      <div>
                        <p className="font-medium text-gray-900">Language</p>
                        <p className="text-sm text-gray-500">Select your preferred language</p>
                      </div>
                    </div>
                    <select value={language} onChange={(e) => setLanguage(e.target.value)} className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm">
                      <option value="english">English 🇬🇧</option>
                      <option value="hindi">हिंदी 🇮🇳</option>
                    </select>
                  </div>
                  <div className="flex items-center justify-between py-3 border-t border-gray-100">
                    <div className="flex items-center gap-3">
                      <Clock size={20} className="text-gray-500" />
                      <div>
                        <p className="font-medium text-gray-900">Timezone</p>
                        <p className="text-sm text-gray-500">Current: {timezone}</p>
                      </div>
                    </div>
                    <select value={timezone} onChange={(e) => setTimezone(e.target.value)} className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm">
                      <option value="Asia/Kolkata">IST (GMT+5:30)</option>
                      <option value="Asia/Dubai">GST (GMT+4)</option>
                      <option value="America/New_York">EST (GMT-5)</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Active Sessions</h3>
                <div className="space-y-3">
                  {[
                    { device: "Chrome on Windows", location: "New Delhi, India", current: true },
                    { device: "Safari on iPhone", location: "New Delhi, India", current: false },
                  ].map((session, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-center gap-3">
                        <Monitor size={18} className="text-gray-500" />
                        <div>
                          <p className="font-medium text-gray-900 text-sm">{session.device}</p>
                          <p className="text-xs text-gray-500">{session.location}</p>
                        </div>
                      </div>
                      {session.current ? (
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">Current</span>
                      ) : (
                        <button className="text-xs text-red-500 hover:text-red-700 font-medium">Revoke</button>
                      )}
                    </div>
                  ))}
                </div>
                <button className="w-full mt-4 py-2.5 text-red-500 hover:bg-red-50 rounded-xl text-sm font-medium transition-colors">Logout from all devices</button>
              </div>
            </div>
          )}

          {/* Notifications Section */}
          {activeSection === "notifications" && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-6">Notification Preferences</h3>
              <div className="space-y-1">
                {[
                  { key: "emailNotifications", label: "Email Notifications", desc: "Receive notifications via email", icon: Mail },
                  { key: "pushNotifications", label: "Push Notifications", desc: "Browser push notifications", icon: Bell },
                  { key: "smsAlerts", label: "SMS Alerts", desc: "Important updates via SMS", icon: Smartphone },
                ].map((item) => (
                  <div key={item.key} className="flex items-center justify-between py-4">
                    <div className="flex items-center gap-3">
                      <item.icon size={20} className="text-gray-500" />
                      <div>
                        <p className="font-medium text-gray-900">{item.label}</p>
                        <p className="text-sm text-gray-500">{item.desc}</p>
                      </div>
                    </div>
                    <Toggle enabled={notifications[item.key as keyof typeof notifications] as boolean} onChange={() => setNotifications({ ...notifications, [item.key]: !notifications[item.key as keyof typeof notifications] })} />
                  </div>
                ))}
                <div className="border-t border-gray-200 my-2"></div>
                <p className="text-sm font-semibold text-gray-500 py-2">Reminders</p>
                {[
                  { key: "classReminder", label: "Class Reminders", desc: "15 min before live class" },
                  { key: "assignmentReminder", label: "Assignment Due", desc: "24 hours before deadline" },
                  { key: "testScheduleAlert", label: "Test Schedule", desc: "2 days before test" },
                  { key: "mentorSessionReminder", label: "Mentor Sessions", desc: "30 min before session" },
                  { key: "resultPublished", label: "Results Published", desc: "When test results are out" },
                  { key: "weeklyReport", label: "Weekly Report", desc: "Every Monday morning" },
                ].map((item) => (
                  <div key={item.key} className="flex items-center justify-between py-3">
                    <div>
                      <p className="font-medium text-gray-900 text-sm">{item.label}</p>
                      <p className="text-xs text-gray-500">{item.desc}</p>
                    </div>
                    <Toggle enabled={notifications[item.key as keyof typeof notifications] as boolean} onChange={() => setNotifications({ ...notifications, [item.key]: !notifications[item.key as keyof typeof notifications] })} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Danger Zone Section */}
          {activeSection === "danger" && (
            <div className="bg-white rounded-2xl shadow-sm border border-red-200 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
                  <AlertTriangle size={20} className="text-red-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-red-700">Danger Zone</h3>
                  <p className="text-sm text-gray-500">Irreversible actions</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-red-50 rounded-xl border border-red-100">
                  <div>
                    <p className="font-medium text-gray-900">Delete Account</p>
                    <p className="text-sm text-gray-500">Permanently delete your account and all data</p>
                  </div>
                  <button onClick={() => setShowDeleteConfirm(true)} className="px-4 py-2 bg-red-600 text-white rounded-xl text-sm font-medium hover:bg-red-700 transition-colors">Delete Account</button>
                </div>
                <div className="flex items-center justify-between p-4 bg-red-50 rounded-xl border border-red-100">
                  <div>
                    <p className="font-medium text-gray-900">Logout</p>
                    <p className="text-sm text-gray-500">Sign out from current session</p>
                  </div>
                  <button onClick={() => setShowLogoutConfirm(true)} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-200 transition-colors flex items-center gap-2">
                    <LogOut size={16} /> Logout
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowDeleteConfirm(false)}>
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl animate-scaleIn" onClick={(e) => e.stopPropagation()}>
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <AlertTriangle size={32} className="text-red-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">Delete Account?</h2>
              <p className="text-gray-600 text-sm mb-6">This action cannot be undone.</p>
              <div className="flex gap-3">
                <button onClick={() => setShowDeleteConfirm(false)} className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-bold">Cancel</button>
                <button className="flex-1 py-3 bg-red-600 text-white rounded-xl font-bold">Yes, Delete</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowLogoutConfirm(false)}>
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl animate-scaleIn" onClick={(e) => e.stopPropagation()}>
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <LogOut size={32} className="text-gray-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">Logout?</h2>
              <p className="text-gray-600 text-sm mb-6">Are you sure you want to logout?</p>
              <div className="flex gap-3">
                <button onClick={() => setShowLogoutConfirm(false)} className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-bold">Cancel</button>
                <button className="flex-1 py-3 bg-blue-600 text-white rounded-xl font-bold">Yes, Logout</button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-scaleIn { animation: scaleIn 0.2s ease-out; }
      `}</style>
    </DashboardLayout>
  );
}