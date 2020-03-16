import React, {useState} from 'react';
import './App.scss';
import Button from './components/Button/button';
import {numberConfig, operatorConfig} from './components/config';


function App() {
  const [operator, setOperator] = useState(null);
  const [result, setResult] = useState(null);

  const inputHandler = (e) => {

  }

  const operatorHandler = (e) => {

  }

  const clearHandler = () => {

  }

  const saveHandler = () => {

  }

  const evaluteHandler = () => {

  }



  return (
    <div className="calculator">
      <section className="screen">
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
