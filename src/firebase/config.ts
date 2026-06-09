import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBvdwCe33hLtJqpeT7-SAspdKVKo0LErg4",
  authDomain: "teshira-b145f.firebaseapp.com",
  projectId: "teshira-b145f",
  storageBucket: "teshira-b145f.firebasestorage.app",
  messagingSenderId: "585248888430",
  appId: "1:585248888430:web:04195f47aaa764c7f5387f"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const db = getFirestore(app);
export const isFirebaseConfigured = true;
