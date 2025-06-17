"use client";

import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { useEffect } from "react";

export default function FB0529() {
  const firebaseConfig = {
    apiKey: "AIzaSyDO0cB7OF0on60IN0LCHzozLLJ8WZjrcPA",
    authDomain: "web-gugu.firebaseapp.com",
    projectId: "web-gugu",
    storageBucket: "web-gugu.firebasestorage.app",
    messagingSenderId: "193510891357",
    appId: "1:193510891357:web:1cf8435098a6352dc392b4",
    // measurementId: "G-VV3ZEK3CL3",
    databaseURL:
      "https://web-gugu-default-rtdb.asia-southeast1.firebasedatabase.app/",
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  const database = getDatabase(app);
  const dbRef = ref(database, "/");

  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  useEffect(() => {
    onValue(dbRef, (snapshot) => {
      console.log(snapshot.val());
    });

    const useRef = ref(database, "accounts/000001");
    set(useRef, {
      name: "chingchun",
      points: 200,
    });
  }, []);

  const addNewaccount = () => {
    console.log("clicked");
    const accountRef = ref(database, "accounts");

    push(accountRef, {
      name: "Wang",
      points: "10",
      type: "User",
    });
  };

  const login = () => {
    signInWithPopup(auth, provider).then((result) => {
      console.log(result);
      console.log(result.user.uid);
      console.log(result.user.displayName);
    });

    const uid = result.user.uid;
    const accountRef = ref(database, "/accounts" + uid);
    console.log(accountRef);

    if (accountRef) {
    }
  };

  return (
    <>
      fb0529
      <div
        onClick={addNewaccount}
        className="  border-2 px-4 py-1 inline-block w-60px"
      >
        addNewaccount
      </div>
      <div onClick={login} className="  border-2 px-4 py-1 inline-block w-60px">
        Login with Google
      </div>
    </>
  );
}
