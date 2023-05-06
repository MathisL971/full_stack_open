import { useState } from "react";
import Button from "./Button.jsx";
import Statistics from "./Statistics.jsx";

function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const total = good + neutral + bad;

  const handleGoodClick = () => {
    setGood(good + 1);
  };

  const handleNeutralClick = () => {
    setNeutral(neutral + 1);
  };

  const handleBadClick = () => {
    setBad(bad + 1);
  };

  if (total > 0) {
    return (
      <div>
        <h1>Give Feedback</h1>
        <Button handleClick={handleGoodClick} text="Good"></Button>
        <Button handleClick={handleNeutralClick} text="Neutral"></Button>
        <Button handleClick={handleBadClick} text="Bad"></Button>
        <br />
        <h1>Statistics</h1>
        <table>
          <Statistics name="Good" value={good}></Statistics>
          <Statistics name="Neutral" value={neutral}></Statistics>
          <Statistics name="Bad" value={bad}></Statistics>
          <Statistics name="Total" value={total}></Statistics>
          <Statistics
            name="Average"
            value={total > 0 ? good + (bad * -1) / total : 0}
          ></Statistics>
          <Statistics
            name="Positive"
            value={(total > 0 ? (good / total) * 100 : 0) + "%"}
          ></Statistics>
        </table>
      </div>
    );
  }
  return (
    <div>
      <h1>Give Feedback</h1>
      <Button handleClick={handleGoodClick} text="Good"></Button>
      <Button handleClick={handleNeutralClick} text="Neutral"></Button>
      <Button handleClick={handleBadClick} text="Bad"></Button>
      <br />
      <h1>Statistics</h1>
      <p>No feedback given</p>
    </div>
  );
}

export default App;
