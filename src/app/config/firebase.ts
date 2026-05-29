// ============================================
// FINAL: student-portal/src/app/config/firebase.ts
// ============================================
import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut,
} from "firebase/auth";
import { 
  getFirestore, 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc,
  collection,
  query,
  where,
  getDocs
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA_r7FDkVwHxmtGfrIYtcv8RNXi_PfC2VQ",
  authDomain: "junior-dream.firebaseapp.com",
  projectId: "junior-dream",
  storageBucket: "junior-dream.firebasestorage.app",
  messagingSenderId: "148047251345",
  appId: "1:148047251345:web:b5f4979de57f58f122fc30"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// ==================== AUTH FUNCTIONS ====================
export const loginWithEmail = async (email: string, password: string) => {
  const result = await signInWithEmailAndPassword(auth, email, password);
  return result;
};

export const registerWithEmail = async (email: string, password: string, userData: any) => {
  const result = await createUserWithEmailAndPassword(auth, email, password);
  await createUserProfile(result.user.uid, userData);
  return result;
};

export const logoutUser = async () => {
  await signOut(auth);
};

// ==================== USER FUNCTIONS ====================
export const getUserData = async (uid: string) => {
  // Pehle users collection check karo
  const userDocRef = doc(db, "users", uid);
  const userDocSnap = await getDoc(userDocRef);
  
  if (userDocSnap.exists()) {
    const userData = userDocSnap.data();
    if (userData.role === "student") {
      const studentDocRef = doc(db, "students", uid);
      const studentDocSnap = await getDoc(studentDocRef);
      if (studentDocSnap.exists()) {
        return { ...userData, ...studentDocSnap.data() };
      }
    }
    return userData;
  }
  
  // Agar users mein nahi mila, students collection check karo
  const studentDocRef = doc(db, "students", uid);
  const studentDocSnap = await getDoc(studentDocRef);
  
  if (studentDocSnap.exists()) {
    return { ...studentDocSnap.data(), role: "student" };
  }
  
  // Default - allow student access
  return { role: "student", name: "Student" };
};

export const createUserProfile = async (uid: string, data: any) => {
  await setDoc(doc(db, "users", uid), {
    uid,
    ...data,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  });
};

export const updateUserProfile = async (uid: string, data: any) => {
  await updateDoc(doc(db, "users", uid), {
    ...data,
    updatedAt: new Date().toISOString()
  });
};

// ==================== STUDENT-SPECIFIC FUNCTIONS ====================
export const getStudentBatches = async (studentId: string) => {
  const q = query(collection(db, "batches"), where("students", "array-contains", studentId));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const getStudentClasses = async (studentId: string) => {
  const batches = await getStudentBatches(studentId);
  const batchIds = batches.map(b => b.id);
  if (batchIds.length === 0) return [];
  
  const q = query(collection(db, "classes"), where("batchId", "in", batchIds));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const getStudentAssignments = async (studentId: string) => {
  const batches = await getStudentBatches(studentId);
  const batchIds = batches.map(b => b.id);
  if (batchIds.length === 0) return [];
  
  const q = query(collection(db, "assignments"), where("batchId", "in", batchIds));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const getStudentDoubts = async (studentId: string) => {
  const q = query(collection(db, "doubts"), where("studentId", "==", studentId));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const getStudentMaterials = async (studentId: string) => {
  const batches = await getStudentBatches(studentId);
  const batchIds = batches.map(b => b.id);
  if (batchIds.length === 0) return [];
  
  const q = query(collection(db, "study_materials"), where("batchId", "in", batchIds));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const getStudentTeacher = async (teacherId: string) => {
  if (!teacherId) return null;
  const docRef = doc(db, "teachers", teacherId);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? docSnap.data() : null;
};

export const submitAssignment = async (assignmentId: string, studentId: string, fileUrl: string) => {
  const assignmentRef = doc(db, "assignments", assignmentId);
  const assignmentSnap = await getDoc(assignmentRef);
  if (assignmentSnap.exists()) {
    const data = assignmentSnap.data();
    const submissions = data.submissions || {};
    submissions[studentId] = { fileUrl, submittedAt: new Date().toISOString(), grade: null, feedback: "" };
    await updateDoc(assignmentRef, { submissions });
  }
};

export const createDoubt = async (data: any) => {
  await setDoc(doc(db, "doubts", `doubt_${Date.now()}`), {
    ...data, status: "pending", replies: [], createdAt: new Date().toISOString()
  });
};

export const uploadFile = async (path: string, file: File) => {
  const storageRef = ref(storage, path);
  const snapshot = await uploadBytes(storageRef, file);
  const url = await getDownloadURL(snapshot.ref);
  return url;
};