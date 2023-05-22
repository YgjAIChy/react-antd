import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Hello from "./components/Hello";
import LikeButton from "./components/LikeButton/LikeButton";

function App() {
  const [message, setMessage] = useState('Hello word!!!')
    return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
          <Hello message={message} />
          <LikeButton/>
          <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
