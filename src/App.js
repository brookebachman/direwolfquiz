import React from 'react';
import logo from './logo.svg';
import './App.css';
import Form from './components/Form.js'
import QuizContainer from './containers/QuizContainer.js'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Form />
        <QuizContainer />
    
      </header>
    </div>
  );
}

export default App;
