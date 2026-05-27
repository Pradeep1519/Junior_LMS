DESIGN A LEARNING MANAGEMENT SYSTEM (LMS) FOR "JUNIOR DREAM"

COMPANY: Junior Dream Private Limited
COLORS: Gold (#B8860B), Dark (#0A0A0A), Program colors (Blue, Green, Purple)

───────────────────────────────────────────────────
PART A: COMMON LOGIN PAGE
───────────────────────────────────────────────────

1. LMS LOGIN PAGE (/login)
   - Junior Dream logo at top
   - "Learning Management System" subtitle
   
   - ROLE SELECTOR (prominent):
     * Student 👨‍🎓
     * Mentor 👨‍🏫
     * Teacher 👩‍🏫
     * Parent 👪
     * Admin 👨‍💻
   
   - Email field
   - Password field
   - "Remember me" checkbox
   - "Login" button (gold)
   - "Forgot password?" link
   - Note: Different roles redirect to different dashboards

───────────────────────────────────────────────────
PART B: STUDENT DASHBOARD
───────────────────────────────────────────────────

2. STUDENT DASHBOARD (/student/dashboard)
   
   HEADER:
   - Welcome message: "Welcome back, [Student Name]!"
   - Student info: Class 10 | Program: Engineering Excellence
   - Profile icon with dropdown
   - Notification bell
   
   SIDEBAR (left):
   - Dashboard (home)
   - My Classes (calendar)
   - My Progress (chart)
   - Assignments (clipboard)
   - Recordings (video)
   - Study Material (book)
   - Mentor Sessions (users)
   - Reports (file)
   - Settings (cog)
   
   MAIN CONTENT:
   
   TODAY'S SCHEDULE CARD:
   - Title: "Today's Schedule"
   - List of classes with:
     * Time, Subject, Teacher/Mentor name
     * Topic
     * [Join Class] button (green)
     * [Add to Calendar] option
   
   PROGRESS OVERVIEW (3 cards):
   - Overall Progress (circular progress: 85%)
   - Attendance (95% with icon)
   - Upcoming Tests (2 this week)
   
   SUBJECT-WISE PROGRESS:
   - Section title
   - Progress bars for each subject with percentage and grade
   - Trend indicators (↑↓)
   
   PENDING ASSIGNMENTS:
   - Section title with count
   - Assignment cards showing:
     * Title, Subject, Due date
     * Status (Pending/Submitted)
     * [Submit] button
   
   RECENT RECORDINGS:
   - Horizontal scroll of video thumbnails
   - Title and duration
   - [Watch] button
   
   MENTOR FEEDBACK:
   - Recent feedback from mentors
   
   UPCOMING EVENTS:
   - Parent-Teacher meetings
   - Tests
   - Workshops

───────────────────────────────────────────────────
PART C: MENTOR DASHBOARD
───────────────────────────────────────────────────

3. MENTOR DASHBOARD (/mentor/dashboard)
   
   HEADER:
   - Welcome: "Welcome, Dr. Gupta!"
   - Mentor info: Cardiology Expert | 8 years exp
   - Rating: 4.8/5 (stars)
   
   SIDEBAR:
   - Dashboard
   - My Students
   - Sessions
   - Feedback
   - Resources
   - Earnings
   - Schedule
   - Settings
   
   STATS CARDS (4 in row):
   - Total Students: 12
   - Sessions This Month: 48
   - Average Rating: 4.8
   - Earnings (Month): ₹24,000
   
   TODAY'S SESSIONS:
   - Session cards with:
     * Time, Student name, Class, Subject
     * Topic
     * [Start Class] button
     * [View Notes] link
   
   MY STUDENTS LIST:
   - Table with: Name, Class, Sessions, Progress, Last Session
   - [View] [Message] buttons
   
   PENDING FEEDBACK:
   - List of students needing feedback
   - [Add Feedback] button
   
   UPCOMING SESSIONS:
   - Calendar view or list
   
   QUICK ACTIONS:
   - [Schedule New Session]
   - [Upload Resource]
   - [Message Students]

───────────────────────────────────────────────────
PART D: TEACHER DASHBOARD
───────────────────────────────────────────────────

4. TEACHER DASHBOARD (/teacher/dashboard)
   
   HEADER:
   - Welcome: "Welcome, Mr. Sharma!"
   - Teacher info: Mathematics | Class 10, 11
   
   SIDEBAR:
   - Dashboard
   - My Classes
   - Students
   - Assignments
   - Attendance
   - Resources
   - Schedule
   - Settings
   
   STATS CARDS:
   - Total Students: 43
   - Classes This Week: 8
   - Pending Grading: 12
   
   MY CLASSES SECTION:
   - Class cards showing:
     * Class name, Subject, Student count
     * Schedule
     * [Start Class] [View Roster] [Materials] buttons
   
   TODAY'S SCHEDULE:
   - List of today's classes
   
   PENDING GRADING:
   - List of assignments to grade
   - [Grade Now] button
   
   QUICK ACTIONS:
   - [Create Assignment]
   - [Take Attendance]
   - [Upload Material]

───────────────────────────────────────────────────
PART E: PARENT PORTAL
───────────────────────────────────────────────────

5. PARENT PORTAL (/parent/dashboard)
   
   HEADER:
   - Welcome: "Welcome, Mrs. Sharma!"
   - "Parent of: Aarav Sharma (Class 10)"
   
   SIDEBAR:
   - Dashboard
   - Child's Progress
   - Attendance
   - Payments
   - Communication
   - Schedule
   - Settings
   
   CHILD INFORMATION CARD:
   - Photo/name, Class, Program, Batch
   - Mentor name, Teacher name
   
   PROGRESS SUMMARY:
   - Overall progress (circular)
   - Subject-wise mini bars
   - [View Full Report] link
   
   TODAY'S SCHEDULE:
   - Child's classes with timings
   - [Join as Observer] option
   
   RECENT FEEDBACK:
   - Teacher and mentor feedback cards
   
   ATTENDANCE CARD:
   - Monthly attendance percentage
   - [View Full Attendance]
   
   PAYMENT STATUS:
   - Next payment due
   - Amount
   - [Pay Now] button
   
   QUICK ACTIONS:
   - [Download Progress Report]
   - [Message Teacher]
   - [Message Mentor]
   - [Schedule Meeting]

───────────────────────────────────────────────────
PART F: LIVE CLASS INTERFACE
───────────────────────────────────────────────────

6. LIVE CLASS PAGE (/class/:id)
   
   TOP BAR:
   - Class info: Mathematics | Class 10 | Mr. Sharma
   - Timer: 45:00 remaining
   - Recording indicator
   - Participants count: 23
   - Leave button
   
   MAIN AREA (70% width):
   - Video feed (teacher's camera)
   - Screen share or whiteboard
   - Teacher controls (mute, camera, share, end)
   
   RIGHT SIDEBAR (30% width) with tabs:
   
   CHAT TAB:
   - Messages with timestamps
   - Emoji support
   - File sharing
   - Chat input
   
   PARTICIPANTS TAB:
   - List of all participants
   - Role indicators (Teacher, Mentor, Student)
   - Raise hand indicators
   
   NOTES TAB:
   - Download class notes
   - Practice problems
   - Links
   
   BOTTOM CONTROLS:
   - Mute/unmute
   - Camera on/off
   - Screen share
   - Raise hand
   - Chat toggle
   - Leave

───────────────────────────────────────────────────
PART G: PROGRESS REPORTS PAGE
───────────────────────────────────────────────────

7. PROGRESS REPORT PAGE (/student/reports)
   
   HEADER:
   - Student: Aarav Sharma | Class 10
   - Report Period: April 2025
   
   OVERALL SCORE CARD:
   - Percentage: 85% with gauge chart
   - Comparison with last month
   - Grade: A
   - Rank: 8/43
   
   SUBJECT-WISE TABLE:
   - Columns: Subject, Test 1, Test 2, Assignment, Average, Grade, Trend
   - Rows for all subjects
   
   TEACHER FEEDBACK SECTION:
   - Cards for each subject teacher
   - Feedback text
   - Rating stars
   
   MENTOR FEEDBACK SECTION:
   - Cards for each mentor
   - Feedback and recommendations
   
   ATTENDANCE SECTION:
   - Monthly chart
   - Total/Present/Absent
   - Percentage
   
   STRENGTHS & IMPROVEMENTS:
   - Tags for strengths
   - Areas needing improvement
   
   DOWNLOAD OPTIONS:
   - [Download PDF]
   - [Print]
   - [Share with Parents]

───────────────────────────────────────────────────
PART H: ASSIGNMENTS PAGE
───────────────────────────────────────────────────

8. ASSIGNMENTS PAGE (/student/assignments)
   
   FILTER TABS:
   - All, Pending, Submitted, Graded
   
   ASSIGNMENT CARDS (grid):
   - Subject badge
   - Title
   - Due date with countdown
   - Status badge
   - Score (if graded)
   - [Submit] or [View Submission] button
   
   FOR TEACHERS: Assignment Creator
   - Form with:
     * Title, Description
     * Class/Batch
     * Subject
     * Due date
     * Points
     * Attachments
     * [Publish] button
   
   SUBMISSIONS VIEW:
   - List of student submissions
   - Grade input for each
   - Feedback text area

───────────────────────────────────────────────────
PART I: SCHEDULE/CALENDAR
───────────────────────────────────────────────────

9. SCHEDULE PAGE (/schedule)
   
   VIEW TOGGLES:
   - Month, Week, Day, Agenda
   
   CALENDAR GRID:
   - Color-coded events:
     * Blue: Classes
     * Green: Mentor Sessions
     * Purple: Tests
     * Orange: Parent Meetings
   
   EVENT DETAILS (on click):
   - Subject, Time, Teacher/Mentor
   - Topic
   - Join link
   - Materials
   - Add to calendar

───────────────────────────────────────────────────
PART J: MESSAGING SYSTEM
───────────────────────────────────────────────────

10. MESSAGES PAGE (/messages)
    
    LEFT SIDEBAR:
    - Conversations list
    - Unread indicators
    - Search messages
    - New message button
    
    MAIN CHAT AREA:
    - Chat header with participant
    - Message bubbles
    - Timestamps
    - File attachments
    - Emoji picker
    - Typing indicator
    - Message input
    
    RIGHT SIDEBAR:
    - Participant details
    - Shared files
    - Search in conversation

───────────────────────────────────────────────────
PART K: ADMIN DASHBOARD (LMS)
───────────────────────────────────────────────────

11. ADMIN DASHBOARD (/admin/lms/dashboard)
    
    HEADER:
    - System stats: Active users, Ongoing classes
    
    SIDEBAR:
    - Overview
    - Users Management
    - Class Monitoring
    - System Health
    - Reports
    - Settings
    
    LIVE MONITORING:
    - Currently active classes: 8
    - Active users now: 124
    - System performance
    
    USER MANAGEMENT:
    - Quick stats
    - User growth chart
    - User list
    
    CLASS MONITORING:
    - Ongoing classes list
    - Join as observer option
    
    SYSTEM HEALTH:
    - Server status
    - API response times
    - Error logs
    
    REPORTS:
    - Generate custom reports
    - Export data

───────────────────────────────────────────────────
DESIGN REQUIREMENTS:
───────────────────────────────────────────────────
- Fully responsive (mobile, tablet, desktop)
- Use brand colors: Gold (#B8860B) for primary actions
- Program colors for accents (Blue, Green, Purple)
- Clean, modern, professional design
- Smooth transitions and hover effects
- Loading skeletons for data fetching
- Error states and validation
- Success notifications
- Consistent component library
- Icons from Lucide React library
- Accessible design (contrast, font sizes)