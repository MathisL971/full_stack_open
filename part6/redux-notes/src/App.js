import NewNote from "./components/NewNote";
import Notes from "./components/Notes";
import VisibilityFilter from "./components/VisibilityFilter";

import { useEffect } from "react";
import noteService from "./services/notes";
import { useDispatch } from "react-redux";

import { initializeNotes } from "./reducers/noteReducer";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    noteService.getAll().then((notes) => {
      dispatch(initializeNotes());
    });
  }, [dispatch]);

  return (
    <div>
      <NewNote></NewNote>
      <VisibilityFilter></VisibilityFilter>
      <Notes></Notes>
    </div>
  );
};

export default App;
