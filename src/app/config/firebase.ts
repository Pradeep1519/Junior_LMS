// ============================================
// File 2: src/app/config/firebase.ts
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

// Auth Functions
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

// Firestore Functions
export const getUserData = async (uid: string) => {
  const docRef = doc(db, "users", uid);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? docSnap.data() : null;
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

// Storage Functions
export const uploadFile = async (path: string, file: File) => {
  const storageRef = ref(storage, path);
  const snapshot = await uploadBytes(storageRef, file);
  const url = await getDownloadURL(snapshot.ref);
  return url;
};