import { NonSensitiveDiaryEntry } from "../../../src/types";
import DiaryEntry from "./DiaryEntry";

type DiaryEntryListTypes = {
  diaryEntries: Array<NonSensitiveDiaryEntry>;
};

const DiaryEntryList = (props: DiaryEntryListTypes) => {
  return (
    <div>
      <h1>Diary Entries</h1>

      {props.diaryEntries.map((e) => {
        return <DiaryEntry key={e.id} entry={e} />;
      })}
    </div>
  );
};

export default DiaryEntryList;
