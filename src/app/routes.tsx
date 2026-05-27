// routes.tsx - FIXED with correct import paths
import { createBrowserRouter } from "react-router";
import { Root } from "./components/Root";
import { LoginPage } from "./components/LoginPage";
import { StudentDashboard } from "./components/student/StudentDashboard";
import { ProgressReportPage } from "./components/student/ProgressReportPage";
import { AssignmentsPage } from "./components/student/AssignmentsPage";
import { SchedulePage } from "./components/student/SchedulePage";
import { RecordingsPage } from "./components/RecordingsPage";
import { StudyMaterialPage } from "./components/StudyMaterialPage";
import { MentorSessionsPage } from "./components/MentorSessionsPage";
import { SettingsPage } from "./components/SettingsPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: LoginPage },
      { path: "login", Component: LoginPage },
      { path: "student/dashboard", Component: StudentDashboard },
      { path: "student/reports", Component: ProgressReportPage },
      { path: "student/assignments", Component: AssignmentsPage },
      { path: "schedule", Component: SchedulePage },
      { path: "recordings", Component: RecordingsPage },
      { path: "study-material", Component: StudyMaterialPage },
      { path: "mentor-sessions", Component: MentorSessionsPage },
      { path: "settings", Component: SettingsPage },
    ],
  },
]);