import React from 'react';
import './App.scss';
import Button from './components/Button/button';

function App() {
  return (
    <div className="calculator">
      <section className="screen">
    
      </section>
      <section className="keypad">
        <div className="column-one">
          <div className="clear-save">          
          </div>
          <div className="numbers">
          </div>
        </div>
        <div className="column-two">
        </div>
      </section>
    </div>
  );
}

export default App;
