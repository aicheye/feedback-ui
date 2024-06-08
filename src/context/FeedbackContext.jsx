import { initializeApp } from "firebase/app";
import {
  collection,
  deleteDoc,
  doc,
  getCountFromServer,
  getFirestore,
  onSnapshot,
  query,
  setDoc,
} from "firebase/firestore";
import { createContext, useEffect, useState } from "react";
import { ulid } from "ulid";

const firebaseConfig = {
  apiKey: "AIzaSyCJiArvtMXKksWzdpluEJA_VfKtTa-bLBA",
  authDomain: "feedback-ui-c89e6.firebaseapp.com",
  projectId: "feedback-ui-c89e6",
  storageBucket: "feedback-ui-c89e6.appspot.com",
  messagingSenderId: "468212009839",
  appId: "1:468212009839:web:a302e3562d5b91d9b8b69a",
  measurementId: "G-FE6KZKPSXB",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const coll = collection(db, "feedback");

const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
  const [feedback, setFeedback] = useState([]);

  const q = query(coll);

  useEffect(() => {
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const feedbackData = [];
      querySnapshot.forEach((doc) => {
        feedbackData.push({ id: doc.id, ...doc.data() });
      });
      setFeedback(feedbackData);
    });

    return () => unsubscribe();
  });

  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false,
  });

  const addFeedback = async (newFeedback) => {
    newFeedback.id = ulid();

    const snapshot = await getCountFromServer(coll);

    if (snapshot.data().count < 10) {
      await setDoc(doc(db, "feedback", newFeedback.id), {
        rating: newFeedback.rating,
        text: newFeedback.text,
      });
    }
  };

  const deleteFeedback = async (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      await deleteDoc(doc(db, "feedback", id));
    }
  };

  const editFeedback = (item) => {
    setFeedbackEdit({
      item: item,
      edit: true,
    });
  };

  const updateFeedback = async (id, updItem) => {
    await setDoc(doc(db, "feedback", id), {
      rating: updItem.rating,
      text: updItem.text,
    });

    setFeedbackEdit({
      item: {},
      edit: false,
    });
  };

  return (
    <FeedbackContext.Provider
      value={{
        feedback,
        deleteFeedback,
        addFeedback,
        editFeedback,
        feedbackEdit,
        updateFeedback,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
};

export default FeedbackContext;
