import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { incrementVotes } from "../reducers/anecdoteReducer";
import {
  voteNotification,
  removeNotification,
} from "../reducers/notificationReducer";

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

  return (
    <div>
      {sortedNotes.map((anecdote) => (
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => {
            dispatch(incrementVotes(anecdote.id));
            dispatch(voteNotification(anecdote.content));
            setTimeout(() => {
              dispatch(removeNotification());
            }, 5000);
          }}
        ></Anecdote>
      ))}
    </div>
  );
};

export default AnecdoteList;
