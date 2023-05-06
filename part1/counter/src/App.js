import { useState } from "react";
import React from "react";
import Display from "./Display";
import Button from "./Button";

const App = () => {
  const [counter, setCounter] = useState(0);

  // setTimeout(() => setCounter(counter + 1), 1000); -> Automatically increments the counter every second

  // Event handlers must always be a function or a function reference, not a function call
  const incrementByOne = () => setCounter(counter + 1);
  const decrementByOne = () => setCounter(counter - 1);
  const resetCounter = () => setCounter(0);

  return (
    <div>
      <Display counter={counter}></Display>
      <Button handleClick={incrementByOne} text="+"></Button>
      <Button handleClick={decrementByOne} text="-"></Button>
      <Button handleClick={resetCounter} text="reset"></Button>
    </div>
  );
};

export default App;
