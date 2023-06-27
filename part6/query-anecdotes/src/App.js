import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import AnecdoteList from "./components/AnecdoteList";

import { NotificationContextProvider } from "./contexts/NotificationContext";

const App = () => {
  return (
    <NotificationContextProvider>
      <h3>Anecdote app</h3>
      <Notification />
      <AnecdoteForm />
      <br />
      <AnecdoteList />
    </NotificationContextProvider>
  );
};

export default App;
