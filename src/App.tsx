import React, { useState } from "react";
import "./App.css";
import { signIn, signOut } from "./auth";

function App() {
  const [authed, setAuthed] = useState(false);
  const [presence, setPresence] = useState({
    activity: undefined,
    availability: undefined,
  });
  const auth = async () => {
    try {
      const response = await signIn();
      setPresence(response);
      setAuthed(true);
    } catch (error) {
      setAuthed(false);
    }
  };
  return (
    <>
      <button onClick={auth}>sign in</button>
      <button onClick={signOut}>sign out </button>
      <hr />
      {authed && (
        <>
          <h3>User presence</h3>

          <div>activity: {JSON.stringify(presence.activity)}</div>
          <div>availability: {JSON.stringify(presence.availability)}</div>
        </>
      )}
    </>
  );
}

export default App;
