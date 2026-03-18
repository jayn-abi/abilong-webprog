import React from 'react';
import './App.css';

function App() {
  return (
    <div className='App'>
      <header className = 'App-header'>
      <h1> welcome to my React App!</h1>
      <p>
        Name: Gyrzzel Jhyne Abilong <br />
        Email: abilonggl@students.national-u.edu.ph<br />
        other personal Info: {""}
        <a 
         href= "https://github.com/jayn-abi/abilong-webprog"
         target="_blank"
        >
          GitHub Repository
        </a>
      </p>
      </header>
    </div>

  );
}

export default App;