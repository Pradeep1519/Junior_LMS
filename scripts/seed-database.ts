import admin from "firebase-admin";
import serviceAccount from "./serviceAccountKey.json";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as any),
  storageBucket: "junior-dream.firebasestorage.app"
});

const db = admin.firestore();

async function seedDatabase() {
  console.log("🚀 Starting database seeding...\n");

  // 1. USERS
  console.log("📁 Creating users collection...");
  await db.collection("users").doc("student_001").set({
    uid: "student_001", name: "Aarav Sharma", email: "student@juniordream.com",
    phone: "+91 9876543210", role: "student", avatar: "AS", status: "active", createdAt: admin.firestore.Timestamp.now()
  });
  await db.collection("users").doc("teacher_001").set({
    uid: "teacher_001", name: "Mr. Anil Sharma", email: "teacher@juniordream.com",
    role: "teacher", avatar: "AS", status: "active", createdAt: admin.firestore.Timestamp.now()
  });
  await db.collection("users").doc("admin_001").set({
    uid: "admin_001", name: "Super Admin", email: "admin@juniordream.com",
    role: "admin", permissions: ["all"], status: "active", createdAt: admin.firestore.Timestamp.now()
  });
  await db.collection("users").doc("mentor_001").set({
    uid: "mentor_001", name: "Dr. Rajesh Gupta", email: "mentor@juniordream.com",
    role: "mentor", status: "active", createdAt: admin.firestore.Timestamp.now()
  });
  console.log("✅ Users created: 4");

  // 2. STUDENTS
  console.log("📁 Creating students collection...");
  await db.collection("students").doc("student_001").set({
    studentId: "student_001", name: "Aarav Sharma", email: "student@juniordream.com",
    phone: "+91 9876543210", class: "Class 10", school: "DPS, New Delhi",
    address: "Rohini, Delhi", city: "Delhi", state: "Delhi", pincode: "110085",
    parentName: "Mr. Rajesh Sharma", parentPhone: "+91 9876543211",
    enrolledCourses: ["course_001"], currentBatch: "batch_001",
    assignedTeacher: "teacher_001", assignedMentor: "mentor_001",
    attendance: 95, avgScore: 92, enrollmentDate: admin.firestore.Timestamp.now()
  });
  console.log("✅ Students created: 1");

  // 3. TEACHERS
  console.log("📁 Creating teachers collection...");
  await db.collection("teachers").doc("teacher_001").set({
    teacherId: "teacher_001", name: "Mr. Anil Sharma", email: "teacher@juniordream.com",
    phone: "+91 9876543220", subjects: ["Mathematics", "Physics"],
    expertise: ["Algebra", "Calculus", "Mechanics"],
    qualification: "M.Sc. Mathematics, IIT Delhi", experience: "10+ years",
    rating: 4.8, totalStudents: 156, assignedCourses: ["course_001"],
    assignedBatches: ["batch_001"], joiningDate: admin.firestore.Timestamp.now(), status: "active"
  });
  console.log("✅ Teachers created: 1");

  // 4. ADMINS
  await db.collection("admins").doc("admin_001").set({
    adminId: "admin_001", name: "Super Admin", email: "admin@juniordream.com", role: "admin", permissions: ["all"]
  });
  console.log("✅ Admins created: 1");

  // 5. MENTORS
  await db.collection("mentors").doc("mentor_001").set({
    mentorId: "mentor_001", name: "Dr. Rajesh Gupta", email: "mentor@juniordream.com",
    expertise: ["Engineering Entrance", "Career Guidance"],
    qualification: "Ph.D. Physics, IIT Delhi", experience: "15+ years",
    assignedStudents: ["student_001"], rating: 4.9
  });
  console.log("✅ Mentors created: 1");

  // 6. COURSES
  console.log("📁 Creating courses collection...");
  const courses = [
    {
      courseId: "course_001", name: "Engineering Excellence",
      description: "Complete JEE preparation for Class 6-12",
      subjects: ["Mathematics", "Physics", "Chemistry"], duration: "2 Years",
      variants: {
        basic: { name: "Basic", price: 29999, features: ["Live Classes", "Study Material", "5 Mock Tests"] },
        premium: { name: "Premium", price: 49999, features: ["Live Classes", "Study Material", "20 Mock Tests", "Mentor Sessions", "Doubt Resolution"] },
        achievers: { name: "Achievers", price: 79999, features: ["All Premium Features", "1-on-1 Mentoring", "Interview Prep"] }
      },
      status: "active", createdAt: admin.firestore.Timestamp.now()
    },
    {
      courseId: "course_002", name: "Medical Prep Pro",
      description: "Complete NEET preparation",
      subjects: ["Biology", "Physics", "Chemistry"], duration: "2 Years",
      variants: {
        basic: { name: "Basic", price: 29999, features: ["Live Classes", "Study Material"] },
        premium: { name: "Premium", price: 49999, features: ["Live Classes", "Mock Tests", "Mentor Sessions"] },
        achievers: { name: "Achievers", price: 79999, features: ["All Premium", "1-on-1 Mentoring"] }
      },
      status: "active", createdAt: admin.firestore.Timestamp.now()
    },
    {
      courseId: "course_003", name: "Civil Services Foundation",
      description: "UPSC foundation course",
      subjects: ["History", "Polity", "Geography", "Economics"], duration: "3 Years",
      variants: {
        basic: { name: "Basic", price: 34999, features: ["Live Classes", "Notes"] },
        premium: { name: "Premium", price: 54999, features: ["Live Classes", "Mock Tests", "Current Affairs"] },
        achievers: { name: "Achievers", price: 89999, features: ["All Premium", "Interview Prep", "Test Series"] }
      },
      status: "active", createdAt: admin.firestore.Timestamp.now()
    }
  ];
  for (const course of courses) {
    await db.collection("courses").doc(course.courseId).set(course);
  }
  console.log("✅ Courses created: 3");

  // 7. BATCHES
  console.log("📁 Creating batches collection...");
  await db.collection("batches").doc("batch_001").set({
    batchId: "batch_001", name: "JEE Morning Batch A",
    courseId: "course_001", variant: "premium",
    students: ["student_001"], teachers: ["teacher_001"],
    schedule: {
      monday: { subject: "Mathematics", time: "9AM-11AM", teacherId: "teacher_001" },
      wednesday: { subject: "Physics", time: "9AM-11AM", teacherId: "teacher_001" }
    },
    maxStudents: 50, status: "active", createdAt: admin.firestore.Timestamp.now()
  });
  console.log("✅ Batches created: 1");

  // 8. ASSIGNMENTS
  await db.collection("assignments").doc("assignment_001").set({
    assignmentId: "assignment_001", title: "Quadratic Equations Problem Set",
    batchId: "batch_001", courseId: "course_001", subject: "Mathematics",
    teacherId: "teacher_001", description: "Solve Chapter 4 problems", points: 100,
    dueDate: admin.firestore.Timestamp.now(), status: "active",
    submissions: {}, createdAt: admin.firestore.Timestamp.now()
  });
  console.log("✅ Assignments created: 1");

  // 9. CLASSES
  await db.collection("classes").doc("class_001").set({
    classId: "class_001", batchId: "batch_001", subject: "Mathematics",
    topic: "Quadratic Equations", teacherId: "teacher_001",
    date: "2026-03-29", time: "09:00 AM", duration: "1h 30m",
    recordingUrl: "", attendance: { student_001: "present" },
    status: "completed", createdAt: admin.firestore.Timestamp.now()
  });
  console.log("✅ Classes created: 1");

  // 10. DOUBTS
  await db.collection("doubts").doc("doubt_001").set({
    doubtId: "doubt_001", studentId: "student_001", teacherId: "teacher_001",
    batchId: "batch_001", subject: "Mathematics",
    question: "How to solve discriminant problems?", status: "pending",
    replies: [], createdAt: admin.firestore.Timestamp.now()
  });
  console.log("✅ Doubts created: 1");

  // 11. STUDY MATERIALS
  await db.collection("study_materials").doc("material_001").set({
    materialId: "material_001", title: "Quadratic Equations Notes",
    subject: "Mathematics", teacherId: "teacher_001", batchId: "batch_001",
    fileUrl: "", fileType: "pdf", fileSize: "4.2 MB",
    downloads: 0, uploadDate: admin.firestore.Timestamp.now()
  });
  console.log("✅ Study Materials created: 1");

  console.log("\n🎉 DATABASE SEEDING COMPLETE!");
  console.log("====================================");
  console.log("Total Collections: 11");
  console.log("Total Documents: 17");
  console.log("====================================");
}

seedDatabase()
  .then(() => {
    console.log("✅ Script completed successfully!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("❌ Error:", error);
    process.exit(1);
  });