import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { incrementVotes } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const Anecdote = ({ anecdote, handleClick }) => {
  return (
    <div key={anecdote.id}>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={handleClick}>vote</button>
      </div>
    </div>
  );
};

const AnecdoteList = () => {
  const dispatch = useDispatch();

  const anecdotes = useSelector(({ filter, anecdotes }) => {
    return anecdotes.filter((a) => {
      return a.content.includes(filter);
    });
  });

  const sortedNotes = anecdotes.sort((a, b) => {
    return b.votes - a.votes;
  });

  const handleVote = (anecdote) => {
    const updatedAnecdote = {
      ...anecdote,
      votes: anecdote.votes + 1,
    };
    dispatch(incrementVotes(updatedAnecdote));
    dispatch(setNotification(`You voted '${updatedAnecdote.content}'`, 5));
  };

  return (
    <div>
      {sortedNotes.map((anecdote) => (
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => handleVote(anecdote)}
        ></Anecdote>
      ))}
    </div>
  );
};

export default AnecdoteList;
