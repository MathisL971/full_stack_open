import { NonSensitiveDiaryEntry } from "../../../src/types";

type DiaryEntryTypes = {
  entry: NonSensitiveDiaryEntry;
};

const DiaryEntry = (props: DiaryEntryTypes) => {
  const { date, visibility, weather } = props.entry;

  return (
    <div>
      <h3 style={{ margin: 0 }}>{date}</h3>
      <p style={{ margin: "5px 0 20px" }}>
        Visibility: {visibility}
        <br />
        Weather: {weather}
      </p>
    </div>
  );
};

export default DiaryEntry;
