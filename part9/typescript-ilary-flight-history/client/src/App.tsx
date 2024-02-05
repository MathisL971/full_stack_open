import { useEffect, useState } from "react";
import { NonSensitiveDiaryEntry } from "../../src/types";
import DiaryEntryList from "./components/DiaryEntryList";
import DiaryEntryForm from "./components/DiaryEntryForm";
import diaryService from "./services/diary";

function App() {
  const [entries, setEntries] = useState<NonSensitiveDiaryEntry[]>([]);

  useEffect(() => {
    diaryService.getAll().then((entries) => setEntries(entries));
  }, []);

  return (
    <>
      <DiaryEntryForm setEntries={setEntries} />
      <DiaryEntryList diaryEntries={entries} />
    </>
  );
}

export default App;
