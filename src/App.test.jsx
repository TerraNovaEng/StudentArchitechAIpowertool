import React, { useEffect } from 'react';
import { db } from './firebaseConfig'; // Import the 'db' you exported in firebaseConfig.js

function App() {
  useEffect(() => {
    // This will print the Firestore object to your browser's console
    console.log("Firestore Database Object:", db);
  }, []);

  return (
    <div className="App">
      <h1>TerraNova Engineering Lab</h1>
      <p>Check the browser console (F12) to see if Firebase is connected!</p>
    </div>
  );
}

export default App;