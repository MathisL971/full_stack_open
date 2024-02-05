import Part from "./Part";
import { CoursePart } from "../types";

interface ContentTypes {
  courseParts: Array<CoursePart>;
}

const Content = (props: ContentTypes) => {
  return (
    <>
      {props.courseParts.map((cp) => {
        return <Part key={cp.name} part={cp} />;
      })}
    </>
  );
};

export default Content;
