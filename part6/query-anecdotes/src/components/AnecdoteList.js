import React from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { update, getAnecdotes } from "../requests/anecdotes";
import { useNotificationDispatch } from "../contexts/NotificationContext";

const Anecdote = ({ anecdote }) => {
  const queryClient = useQueryClient();
  const notificationDispatch = useNotificationDispatch();

  const updateAnecdoteMutation = useMutation(update, {
    onSuccess: (response) => {
      const anecdotes = queryClient.getQueryData("anecdotes");
      queryClient.setQueryData(
        "anecdotes",
        anecdotes.map((a) => {
          return a.id !== response.data.id ? a : response.data;
        })
      );
    },
  });

  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 });
    notificationDispatch({ type: "VOTE", payload: anecdote.content });
    setTimeout(() => {
      notificationDispatch({ type: "RESET" });
    }, 5000);
  };

  return (
    <div>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={() => handleVote(anecdote)}>vote</button>
      </div>
    </div>
  );
};

const AnecdoteList = () => {
  console.log("Fetching anecdotes...");
  const result = useQuery("anecdotes", getAnecdotes, {
    retry: 1,
    refetchOnWindowFocus: false,
  });

  if (result.isLoading) {
    return <div>Loading data...</div>;
  }

  if (result.isError) {
    return <div>Anecdote service not available due to problem in server.</div>;
  }

  const anecdotes = result.data;
  const sortedAnecdotes = anecdotes.sort((a, b) => {
    return b.votes - a.votes;
  });

  return (
    <div>
      {sortedAnecdotes.map((anecdote) => (
        <Anecdote key={anecdote.id} anecdote={anecdote}></Anecdote>
      ))}
    </div>
  );
};

export default AnecdoteList;
