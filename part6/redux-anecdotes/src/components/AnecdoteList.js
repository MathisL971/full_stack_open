import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { incrementVotes } from "../reducers/anecdoteReducer";

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
  const anecdotes = useSelector((state) => state);
  const dispatch = useDispatch();

  const sortedNotes = anecdotes.sort((a, b) => {
    return b.votes - a.votes;
  });

  return (
    <div>
      {sortedNotes.map((anecdote) => (
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => dispatch(incrementVotes(anecdote.id))}
        ></Anecdote>
      ))}
    </div>
  );
};

export default AnecdoteList;
