import React, {useState, useEffect} from 'react';
import './App.scss';
import axios from 'axios';
import Button from './components/Button/button';
import {numberConfig, operatorConfig} from './components/config';


function App() {
  const [output, setOutput] = useState("0");
  const [operator, setOperator] = useState(null);
  const [result, setResult] = useState(null);
  const [browser, setBrowser] = useState("unknown")

  useEffect(() => {
    // *** Taken from  - https://developer.mozilla.org/en-US/docs/Web/API/Window/navigator ***
    var sBrowser, sUsrAg = navigator.userAgent;

    // The order matters here, and this may report false positives for unlisted browsers.   
    if (sUsrAg.indexOf("Firefox") > -1) {
      sBrowser = "Mozilla Firefox";
    } else if (sUsrAg.indexOf("SamsungBrowser") > -1) {
      sBrowser = "Samsung Internet";
    } else if (sUsrAg.indexOf("Opera") > -1 || sUsrAg.indexOf("OPR") > -1) {
      sBrowser = "Opera";
    } else if (sUsrAg.indexOf("Trident") > -1) {
      sBrowser = "Microsoft Internet Explorer";
    } else if (sUsrAg.indexOf("Edge") > -1) {
      sBrowser = "Microsoft Edge";
    } else if (sUsrAg.indexOf("Chrome") > -1) {
      sBrowser = "Google Chrome";
    } else if (sUsrAg.indexOf("Safari") > -1) {
      sBrowser = "Apple Safari";
    } else {
      sBrowser = "unknown";
    }
    setBrowser(sBrowser);
}, []);

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

  const evaluteHandler = (e) => {
    inputHandler(e)
    // *** Logic is based on single operator calculations ***.
    // Transform the output string into an array of values.
    let outputArray = output.split("")
    // Locate operator, store values either side of operator into variables.
    let i = outputArray.indexOf(operator);
    let right = parseFloat(outputArray.splice(i+1).join(""));
    let left = parseFloat(outputArray.splice(-0, i).join(""));
    // Pass variables to switch statement and evalute.  
    switch(operator) {
      case "+":
          let plus = (left + right);
          (plus - Math.floor(plus)) !== 0 ?
            setResult(plus.toFixed(2)) :
            setResult(plus);
      break;
      case "-":
          let minus = (left - right);
          (minus - Math.floor(minus)) !== 0 ?
            setResult(minus.toFixed(2)) :
            setResult(minus);
      break;
      case "*":
          let multiply = (left * right);
          (multiply - Math.floor(multiply)) !== 0 ?
            setResult(multiply.toFixed(2)) :
            setResult(multiply);
      break;
      case "/":
          let divide = (left / right);
          (divide - Math.floor(divide)) !== 0 ?
            setResult(divide.toFixed(2)) :
            setResult(divide);
      break;
      default:
      break;
    }
  }

  const saveHandler = () => {
   
    const dt = new Date();
    const postResult = result.toString();
    const config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "origin, content-type, accept"
      }
    }

    const data = {
      "result" : postResult,
      "time" :  dt,
      "browser": browser
    }

    axios.post("http://localhost:8888/calculator-im/index.php", data, config)
          .then((response) => {
            console.log(response);
          }, (error) => {
            console.log(error);
          });
  }



  return (
    <React.Fragment>
    <button className="calculator-log">
      <a href="http://localhost:8888/calculator-im/calculations.php" target="blank">Calculator Log</a>
    </button>
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
    </React.Fragment>
  );
}

export default App;
