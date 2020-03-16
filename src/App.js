import React, {useState} from 'react';
import './App.scss';
import Button from './components/Button/button';
import {numberConfig, operatorConfig} from './components/config';


function App() {
  const [output, setOutput] = useState("0");
  const [operator, setOperator] = useState(null);
  const [result, setResult] = useState(null);

  const inputHandler = (e) => {
    // Begin new calculation if previous result showing, clear state.
    // Passing values to screen from event.target
    if (result) {
      clearHandler()
      setOutput(e.target.value) 
    } else {
      if (e.target.value !== ".") {
        output !== "0" ? setOutput(output + e.target.value) : setOutput(e.target.value);
      } else {
        setOutput(output + e.target.value);
      }
    }
  }

  const operatorHandler = (e) => {
    // Store operator value when used.
    if (output !== "0") {
      setOperator(e.target.value)
      setOutput(output + e.target.value)
    } else {
      setOperator(operator)
    }
  }

  const clearHandler = () => {
    // Reset all state values to default setting.
    setOutput("0")
    setOperator(null)
    setResult(null) 
  }

  const saveHandler = () => {

  }

  const evaluteHandler = () => {

  }



  return (
    <div className="calculator">
      <section className="screen">
        <div className="output">{output}</div>
        {result ? 
        <div className="result">{result}</div> :
        null}
      </section>
      <section className="keypad">
        <div className="column-one">
          <div className="clear-save">
            <Button
              value="AC"
              clicked={clearHandler}/>
            <Button
              value="SAVE"
              style={{width: "160px"}}
              active={result ? false : true}
              clicked={saveHandler}
              />           
          </div>
          <div className="numbers">
            {numberConfig.map((number, index) => (
              <Button
                key={index}
                value={number}
                clicked={(e) => inputHandler(e)}/>
            ))}
          </div>
        </div>
        <div className="column-two">
        {operatorConfig.map((operator,index) => (
            <Button
              key={index}
              value={operator}
              clicked={(e) => operatorHandler(e)}/>
          ))}
          <Button
            value="="
            clicked={evaluteHandler}/>
        </div>
      </section>
    </div>
  );
}

export default App;
