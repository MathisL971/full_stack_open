import { useQueryClient, useMutation } from "react-query";
import { create } from "../requests/anecdotes";
import { useNotificationDispatch } from "../contexts/NotificationContext";

const AnecdoteForm = () => {
  const queryClient = useQueryClient();
  const notificationDispatch = useNotificationDispatch();

  const newAnecdoteMutation = useMutation(create, {
    onSuccess: (response) => {
      const anecdotes = queryClient.getQueryData("anecdotes");
      queryClient.setQueryData("anecdotes", anecdotes.concat(response.data));
    },
    onError: (error) => {
      notificationDispatch({ type: "TOO_SHORT" });
      setTimeout(() => {
        notificationDispatch({ type: "RESET" });
      }, 5000);
    },
  });

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";

    newAnecdoteMutation.mutate({ content, votes: 0 });

    notificationDispatch({ type: "NEW_ANECDOTE", payload: content });
    setTimeout(() => {
      notificationDispatch({ type: "RESET" });
    }, 5000);
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
