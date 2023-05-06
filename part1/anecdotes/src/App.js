import { useState } from "react";
import Button from "./Button.jsx";

function App() {
  const [anecdotes, setAnecdotes] = useState([
    {
      quote: "If it hurts, do it more often.",
      votes: 0,
    },
    {
      quote: "Adding manpower to a late software project makes it later!",
      votes: 0,
    },
    {
      quote:
        "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
      votes: 0,
    },
    {
      quote:
        "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
      votes: 0,
    },
    {
      quote: "Premature optimization is the root of all evil.",
      votes: 0,
    },
    {
      quote:
        "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
      votes: 0,
    },
    {
      quote: "The only way to go fast, is to go well.",
      votes: 0,
    },
  ]);

  const [selected, setSelected] = useState(0);
  const [topQuote, setTopQuote] = useState("");
  const [topVotes, setTopVotes] = useState(0);

  const updateTopQuote = () => {
    anecdotes.forEach((element) => {
      if (element.votes > topVotes) {
        setTopQuote(element.quote);
        setTopVotes(element.votes);
      }
    });
  };

  const handleVote = () => {
    const newAnecdotes = [...anecdotes];
    newAnecdotes[selected].votes += 1;
    setAnecdotes(newAnecdotes);
    updateTopQuote();
  };

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected].quote}</p>
      <p># of votes: {anecdotes[selected].votes}</p>
      <Button
        handleClick={() => {
          setSelected(Math.floor(Math.random() * anecdotes.length));
        }}
        text="New Anecdote"
      ></Button>
      <Button handleClick={handleVote} text="Vote"></Button>

      <h1>Anecdote with the most votes</h1>
      <p>{topQuote}</p>
    </div>
  );
}

export default App;
