import React, {useState} from 'react';
import './App.scss';
import Button from './components/Button/button';


function App() {
  const [output, setOutput] = useState("0");
  const [operator, setOperator] = useState(null);
  const [result, setResult] = useState(null);

  const clearHandler = () => {

  }

  const saveHandler = () => {

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
          </div>
        </div>
        <div className="column-two">
        </div>
      </section>
    </div>
  );
}

export default App;
