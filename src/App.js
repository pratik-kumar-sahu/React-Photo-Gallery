import React, { useState, useEffect } from "react";
import Form from "./comps/Form";
import Hero from "./comps/Hero";
import ImageGrid from "./comps/ImageGrid";
import Login from "./comps/Login";
import Modal from "./comps/Modal";
import Title from "./comps/Title";
import fire from "./firebase/config";

function App() {
  const [selectedImg, setSelectedImg] = useState(null);
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [passErr, setPassErr] = useState("");
  const [hasAccount, setHasAccount] = useState(false);

  const clearInputs = () => {
    setEmail("");
    setPassword("");
  };

  const clearErrors = () => {
    setEmailErr("");
    setPassErr("");
  };

  const handleLogin = () => {
    clearErrors();
    fire
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch((err) => {
        switch (err.code) {
          case "auth/invalid-email":
          case "auth/user-disabled":
          case "auth/user-not-found":
            setEmailErr(err.message);
            break;
          case "auth/wrong-password":
            setPassErr(err.message);
            break;
        }
      });
  };

  const handleSignup = () => {
    clearErrors();
    fire
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch((err) => {
        switch (err.code) {
          case "auth/email-already-in-use":
          case "auth/invalid-email":
            setEmailErr(err.message);
            break;
          case "auth/weak-password":
            setPassErr(err.message);
            break;
        }
      });
  };

  const handleLogout = () => {
    fire.auth().signOut();
  };

  const authListener = () => {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        clearInputs();
        setUser(user);
      } else {
        setUser("");
      }
    });
  };

  useEffect(() => {
    authListener();
  }, []);

  return (
    <div>
      {user ? (
        <>
          <Hero handleLogout={handleLogout} />
          <Title />
          <Form />
          <ImageGrid setSelectedImg={setSelectedImg} />
          {selectedImg && (
            <Modal selectedImg={selectedImg} setSelectedImg={setSelectedImg} />
          )}
        </>
      ) : (
        <Login
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          handleLogin={handleLogin}
          handleSignup={handleSignup}
          hasAccount={hasAccount}
          setHasAccount={setHasAccount}
          emailErr={emailErr}
          passErr={passErr}
        />
      )}
    </div>
  );

  // return (
  //   <div className="App">
  //     <Title />
  //     <Form />
  //     <ImageGrid setSelectedImg={setSelectedImg} />
  //     {selectedImg && (
  //       <Modal selectedImg={selectedImg} setSelectedImg={setSelectedImg} />
  //     )}
  //   </div>
  // );
}

export default App;
