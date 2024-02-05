import { DiaryEntry, NonSensitiveDiaryEntry, NewDiaryEntry } from "../types";
import diaries from "../../data/entries";

const getEntries = (): DiaryEntry[] => {
  return diaries;
};

const getNonSensitiveEntries = (): NonSensitiveDiaryEntry[] => {
  return diaries.map(({ id, date, weather, visibility }) => {
    return {
      id,
      date,
      weather,
      visibility,
    };
  });
};

const findById = (id: number): DiaryEntry | undefined => {
  const entry = diaries.find((d) => d.id === id);
  return entry;
};

const addDiary = (newEntry: NewDiaryEntry): DiaryEntry => {
  const addedEntry: DiaryEntry = {
    id: Math.max(...diaries.map((d) => d.id)) + 1,
    ...newEntry,
  };

  diaries.push(addedEntry);
  return addedEntry;
};

export default {
  getEntries,
  getNonSensitiveEntries,
  addDiary,
  findById,
};
