
import React, { createContext, useContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import { auth, db } from "../DATABASE/firebase";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (userAuth) => {
      if (userAuth) {
        const userRef = doc(db, "users", userAuth.uid);
        const unsubscribeUser = onSnapshot(userRef, (snapshot) => {
          if (snapshot.exists()) {
            setCurrentUser({
              uid: userAuth.uid,
              email: userAuth.email,
              ...snapshot.data(),
            });
          } else {
            setCurrentUser(null);
          }
          setLoading(false);
        }, (error) => {
          console.error("Error fetching user data:", error.message);
          setCurrentUser(null);
          setLoading(false);
        });

        // Clean up listener on component unmount or auth change
        return () => unsubscribeUser();
      } else {
        setCurrentUser(null);
        setLoading(false);
      }
    });

    // Clean up listener on component unmount
    return () => unsubscribeAuth();
  }, []);

  const authValues = {
    currentUser,
    loading,
  };

  return (
    <AuthContext.Provider value={authValues}>
      {children}
    </AuthContext.Provider>
  );
};
;
