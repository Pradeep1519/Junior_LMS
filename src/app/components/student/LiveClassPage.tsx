import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  Monitor,
  Hand,
  MessageSquare,
  Users,
  FileText,
  PhoneOff,
  MoreVertical,
  Send,
  Smile,
  Paperclip,
} from "lucide-react";

type TabType = "chat" | "participants" | "notes";

export function LiveClassPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState<TabType>("chat");
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isHandRaised, setIsHandRaised] = useState(false);
  const [message, setMessage] = useState("");

  const classInfo = {
    subject: "Mathematics",
    class: "Class 10",
    teacher: "Mr. Sharma",
    topic: "Quadratic Equations - Advanced Problem Solving",
    duration: "45:00",
    participants: 23,
    isRecording: true,
  };

  const participants = [
    { id: 1, name: "Mr. Sharma", role: "Teacher", isMuted: false, handRaised: false },
    { id: 2, name: "Dr. Gupta", role: "Mentor", isMuted: false, handRaised: false },
    { id: 3, name: "Aarav Sharma", role: "Student", isMuted: false, handRaised: false },
    { id: 4, name: "Priya Patel", role: "Student", isMuted: true, handRaised: true },
    { id: 5, name: "Rahul Kumar", role: "Student", isMuted: true, handRaised: false },
    { id: 6, name: "Ananya Singh", role: "Student", isMuted: true, handRaised: false },
  ];

  const chatMessages = [
    { id: 1, name: "Mr. Sharma", role: "Teacher", message: "Welcome everyone to today's class!", time: "10:05" },
    { id: 2, name: "Aarav Sharma", role: "Student", message: "Good morning sir!", time: "10:06" },
    { id: 3, name: "Priya Patel", role: "Student", message: "Can you please repeat the formula?", time: "10:12" },
    { id: 4, name: "Mr. Sharma", role: "Teacher", message: "Sure, let me write it on the board again.", time: "10:13" },
  ];

  const notes = [
    { title: "Quadratic Formula Derivation.pdf", size: "2.5 MB" },
    { title: "Practice Problems Set 1.pdf", size: "1.8 MB" },
    { title: "Important Links", type: "link" },
  ];

  const handleLeave = () => {
    if (confirm("Are you sure you want to leave the class?")) {
      navigate("/student/dashboard");
    }
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      // Handle message send
      setMessage("");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      {/* Top Bar */}
      <div className="bg-gray-800 border-b border-gray-700 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div>
              <h1 className="text-white font-bold text-lg">
                {classInfo.subject} | {classInfo.class}
              </h1>
              <p className="text-gray-400 text-sm">{classInfo.teacher}</p>
            </div>
            {classInfo.isRecording && (
              <div className="flex items-center gap-2 bg-red-500/20 text-red-400 px-3 py-1 rounded-full">
                <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                <span className="text-sm font-medium">Recording</span>
              </div>
            )}
          </div>
          <div className="flex items-center gap-4 text-gray-400">
            <div className="flex items-center gap-2">
              <Users size={20} />
              <span>{classInfo.participants}</span>
            </div>
            <div className="text-lg font-mono">{classInfo.duration}</div>
            <button
              onClick={handleLeave}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              Leave
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Main Video Area */}
        <div className="flex-1 flex flex-col">
          {/* Video Feed */}
          <div className="flex-1 bg-black relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="w-32 h-32 bg-gradient-to-br from-[#B8860B] to-[#DAA520] rounded-full flex items-center justify-center text-white text-4xl font-bold mb-4 mx-auto">
                  MS
                </div>
                <p className="text-white text-xl font-medium">{classInfo.teacher}</p>
                <p className="text-gray-400">Screen sharing in progress...</p>
              </div>
            </div>
            {/* Topic Banner */}
            <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm text-white px-4 py-2 rounded-lg">
              <p className="text-sm font-medium">{classInfo.topic}</p>
            </div>
          </div>

          {/* Bottom Controls */}
          <div className="bg-gray-800 px-6 py-4">
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className={`p-4 rounded-full transition-colors ${
                  isMuted ? "bg-red-500 hover:bg-red-600" : "bg-gray-700 hover:bg-gray-600"
                }`}
              >
                {isMuted ? <MicOff size={24} className="text-white" /> : <Mic size={24} className="text-white" />}
              </button>
              <button
                onClick={() => setIsVideoOff(!isVideoOff)}
                className={`p-4 rounded-full transition-colors ${
                  isVideoOff ? "bg-red-500 hover:bg-red-600" : "bg-gray-700 hover:bg-gray-600"
                }`}
              >
                {isVideoOff ? (
                  <VideoOff size={24} className="text-white" />
                ) : (
                  <Video size={24} className="text-white" />
                )}
              </button>
              <button className="p-4 bg-gray-700 hover:bg-gray-600 rounded-full transition-colors">
                <Monitor size={24} className="text-white" />
              </button>
              <button
                onClick={() => setIsHandRaised(!isHandRaised)}
                className={`p-4 rounded-full transition-colors ${
                  isHandRaised ? "bg-[#B8860B] hover:bg-[#DAA520]" : "bg-gray-700 hover:bg-gray-600"
                }`}
              >
                <Hand size={24} className="text-white" />
              </button>
              <button className="p-4 bg-gray-700 hover:bg-gray-600 rounded-full transition-colors">
                <MoreVertical size={24} className="text-white" />
              </button>
              <button
                onClick={handleLeave}
                className="p-4 bg-red-500 hover:bg-red-600 rounded-full transition-colors ml-4"
              >
                <PhoneOff size={24} className="text-white" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-80 bg-gray-800 border-l border-gray-700 flex flex-col">
          {/* Tabs */}
          <div className="flex border-b border-gray-700">
            <button
              onClick={() => setActiveTab("chat")}
              className={`flex-1 flex items-center justify-center gap-2 py-3 transition-colors ${
                activeTab === "chat" ? "bg-gray-700 text-white" : "text-gray-400 hover:text-white"
              }`}
            >
              <MessageSquare size={18} />
              <span className="text-sm font-medium">Chat</span>
            </button>
            <button
              onClick={() => setActiveTab("participants")}
              className={`flex-1 flex items-center justify-center gap-2 py-3 transition-colors ${
                activeTab === "participants" ? "bg-gray-700 text-white" : "text-gray-400 hover:text-white"
              }`}
            >
              <Users size={18} />
              <span className="text-sm font-medium">People</span>
            </button>
            <button
              onClick={() => setActiveTab("notes")}
              className={`flex-1 flex items-center justify-center gap-2 py-3 transition-colors ${
                activeTab === "notes" ? "bg-gray-700 text-white" : "text-gray-400 hover:text-white"
              }`}
            >
              <FileText size={18} />
              <span className="text-sm font-medium">Notes</span>
            </button>
          </div>

          {/* Tab Content */}
          <div className="flex-1 overflow-y-auto">
            {activeTab === "chat" && (
              <div className="flex flex-col h-full">
                <div className="flex-1 p-4 space-y-4 overflow-y-auto">
                  {chatMessages.map((msg) => (
                    <div key={msg.id} className="space-y-1">
                      <div className="flex items-baseline gap-2">
                        <span
                          className={`text-sm font-medium ${
                            msg.role === "Teacher" ? "text-[#B8860B]" : "text-gray-300"
                          }`}
                        >
                          {msg.name}
                        </span>
                        <span className="text-xs text-gray-500">{msg.time}</span>
                      </div>
                      <p className="text-sm text-gray-100">{msg.message}</p>
                    </div>
                  ))}
                </div>
                <div className="p-4 border-t border-gray-700">
                  <div className="flex gap-2 mb-2">
                    <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
                      <Smile size={20} className="text-gray-400" />
                    </button>
                    <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
                      <Paperclip size={20} className="text-gray-400" />
                    </button>
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                      placeholder="Type a message..."
                      className="flex-1 bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B8860B]"
                    />
                    <button
                      onClick={handleSendMessage}
                      className="bg-[#B8860B] hover:bg-[#DAA520] text-white p-2 rounded-lg transition-colors"
                    >
                      <Send size={20} />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "participants" && (
              <div className="p-4 space-y-2">
                {participants.map((participant) => (
                  <div
                    key={participant.id}
                    className="flex items-center justify-between p-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-[#B8860B] to-[#DAA520] rounded-full flex items-center justify-center text-white font-bold text-sm">
                        {participant.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div>
                        <p className="text-white text-sm font-medium">{participant.name}</p>
                        <p className="text-gray-400 text-xs">{participant.role}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {participant.handRaised && <Hand size={16} className="text-[#B8860B]" />}
                      {participant.isMuted && <MicOff size={16} className="text-red-400" />}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "notes" && (
              <div className="p-4 space-y-3">
                <h3 className="text-white font-medium mb-3">Class Materials</h3>
                {notes.map((note, index) => (
                  <div
                    key={index}
                    className="p-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors cursor-pointer"
                  >
                    <p className="text-white text-sm font-medium">{note.title}</p>
                    {note.size && <p className="text-gray-400 text-xs mt-1">{note.size}</p>}
                    {note.type === "link" && (
                      <p className="text-[#B8860B] text-xs mt-1">Click to view links</p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
