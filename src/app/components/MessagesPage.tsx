import { useState } from "react";
import { useNavigate } from "react-router";
import { Search, Send, Paperclip, Smile, MoreVertical, ArrowLeft, Plus, Phone, Video } from "lucide-react";

export function MessagesPage() {
  const navigate = useNavigate();
  const [selectedConversation, setSelectedConversation] = useState(1);
  const [message, setMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const conversations = [
    {
      id: 1,
      name: "Mr. Sharma",
      role: "Mathematics Teacher",
      lastMessage: "Great work on your assignment!",
      time: "10:30 AM",
      unread: 2,
      avatar: "MS",
    },
    {
      id: 2,
      name: "Dr. Gupta",
      role: "Physics Mentor",
      lastMessage: "Let's schedule a session for tomorrow",
      time: "Yesterday",
      unread: 0,
      avatar: "DG",
    },
    {
      id: 3,
      name: "Mrs. Reddy",
      role: "Chemistry Teacher",
      lastMessage: "The lab report deadline is extended",
      time: "2 days ago",
      unread: 1,
      avatar: "MR",
    },
    {
      id: 4,
      name: "Class 10-A Group",
      role: "43 members",
      lastMessage: "Priya: Does anyone have the notes?",
      time: "3 days ago",
      unread: 0,
      avatar: "10A",
    },
  ];

  const messages = [
    {
      id: 1,
      sender: "Mr. Sharma",
      text: "Hi Aarav, I reviewed your quadratic equations assignment.",
      time: "10:25 AM",
      isMine: false,
    },
    {
      id: 2,
      sender: "Me",
      text: "Thank you sir! How did I do?",
      time: "10:27 AM",
      isMine: true,
    },
    {
      id: 3,
      sender: "Mr. Sharma",
      text: "Great work on your assignment! You got 95/100. Just a small mistake in problem 7.",
      time: "10:30 AM",
      isMine: false,
    },
    {
      id: 4,
      sender: "Mr. Sharma",
      text: "Keep up the excellent work! 👍",
      time: "10:30 AM",
      isMine: false,
    },
    {
      id: 5,
      sender: "Me",
      text: "Thank you so much sir! I'll review problem 7.",
      time: "10:32 AM",
      isMine: true,
    },
  ];

  const selectedConv = conversations.find((c) => c.id === selectedConversation);

  const handleSendMessage = () => {
    if (message.trim()) {
      // Handle send message
      setMessage("");
    }
  };

  const filteredConversations = conversations.filter((conv) =>
    conv.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left Sidebar - Conversations List */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-bold text-gray-900">Messages</h1>
            <button
              onClick={() => navigate("/student/dashboard")}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <ArrowLeft size={20} />
            </button>
          </div>
          {/* Search */}
          <div className="relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search messages..."
              className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B8860B]"
            />
          </div>
          <button className="w-full mt-3 flex items-center justify-center gap-2 bg-[#B8860B] hover:bg-[#DAA520] text-white px-4 py-2 rounded-lg font-medium transition-colors">
            <Plus size={18} />
            New Message
          </button>
        </div>

        {/* Conversations List */}
        <div className="flex-1 overflow-y-auto">
          {filteredConversations.map((conv) => (
            <button
              key={conv.id}
              onClick={() => setSelectedConversation(conv.id)}
              className={`w-full p-4 flex items-start gap-3 hover:bg-gray-50 transition-colors border-b border-gray-100 ${
                selectedConversation === conv.id ? "bg-blue-50" : ""
              }`}
            >
              <div className="w-12 h-12 bg-gradient-to-br from-[#B8860B] to-[#DAA520] rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                {conv.avatar}
              </div>
              <div className="flex-1 min-w-0 text-left">
                <div className="flex items-start justify-between mb-1">
                  <p className="font-bold text-gray-900 truncate">{conv.name}</p>
                  <span className="text-xs text-gray-500 flex-shrink-0 ml-2">{conv.time}</span>
                </div>
                <p className="text-sm text-gray-600 mb-1">{conv.role}</p>
                <p className="text-sm text-gray-500 truncate">{conv.lastMessage}</p>
              </div>
              {conv.unread > 0 && (
                <div className="w-6 h-6 bg-[#B8860B] text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                  {conv.unread}
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedConv ? (
          <>
            {/* Chat Header */}
            <div className="bg-white border-b border-gray-200 px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#B8860B] to-[#DAA520] rounded-full flex items-center justify-center text-white font-bold">
                    {selectedConv.avatar}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">{selectedConv.name}</p>
                    <p className="text-sm text-gray-600">{selectedConv.role}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 hover:bg-gray-100 rounded-lg">
                    <Phone size={20} className="text-gray-600" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-lg">
                    <Video size={20} className="text-gray-600" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-lg">
                    <MoreVertical size={20} className="text-gray-600" />
                  </button>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.isMine ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-md ${msg.isMine ? "order-2" : "order-1"}`}>
                    {!msg.isMine && <p className="text-xs text-gray-500 mb-1 ml-1">{msg.sender}</p>}
                    <div
                      className={`px-4 py-3 rounded-2xl ${
                        msg.isMine
                          ? "bg-[#B8860B] text-white rounded-br-none"
                          : "bg-white text-gray-900 rounded-bl-none shadow-sm"
                      }`}
                    >
                      <p className="text-sm">{msg.text}</p>
                    </div>
                    <p className={`text-xs text-gray-500 mt-1 ${msg.isMine ? "text-right mr-1" : "ml-1"}`}>
                      {msg.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="bg-white border-t border-gray-200 p-4">
              <div className="flex items-center gap-2 mb-2">
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <Paperclip size={20} className="text-gray-600" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <Smile size={20} className="text-gray-600" />
                </button>
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  placeholder="Type a message..."
                  className="flex-1 px-4 py-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B8860B]"
                />
                <button
                  onClick={handleSendMessage}
                  className="bg-[#B8860B] hover:bg-[#DAA520] text-white p-3 rounded-lg transition-colors"
                >
                  <Send size={20} />
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-2 text-center">
                Press Enter to send • Shift + Enter for new line
              </p>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-gray-50">
            <div className="text-center">
              <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <Send size={40} className="text-gray-400" />
              </div>
              <p className="text-gray-600 text-lg">Select a conversation to start messaging</p>
            </div>
          </div>
        )}
      </div>

      {/* Right Sidebar - Participant Details */}
      {selectedConv && (
        <div className="w-64 bg-white border-l border-gray-200 p-6">
          <div className="text-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-[#B8860B] to-[#DAA520] rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto mb-3">
              {selectedConv.avatar}
            </div>
            <p className="font-bold text-gray-900 text-lg">{selectedConv.name}</p>
            <p className="text-sm text-gray-600">{selectedConv.role}</p>
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">About</p>
              <p className="text-sm text-gray-600">
                {selectedConv.role.includes("Teacher")
                  ? "Subject teacher with 10+ years of experience"
                  : "Mentor and career guidance expert"}
              </p>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">Shared Files</p>
              <div className="space-y-2">
                <div className="p-2 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-900 font-medium">Assignment_Guide.pdf</p>
                  <p className="text-xs text-gray-500">2.5 MB</p>
                </div>
                <div className="p-2 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-900 font-medium">Practice_Problems.pdf</p>
                  <p className="text-xs text-gray-500">1.8 MB</p>
                </div>
              </div>
            </div>

            <button className="w-full text-[#B8860B] hover:bg-[#B8860B]/10 py-2 rounded-lg font-medium transition-colors">
              Search in Conversation
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
