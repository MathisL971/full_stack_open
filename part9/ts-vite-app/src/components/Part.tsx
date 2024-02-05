import { CoursePart } from "../types";

export interface PartTypes {
  part: CoursePart;
}

const Part = (props: PartTypes) => {
  const cp = props.part;
  switch (cp.kind) {
    case "basic":
      return (
        <p>
          <b>
            {cp.name} {cp.exerciseCount}
          </b>{" "}
          <br />
          <i>{cp.description}</i>
        </p>
      );
    case "background":
      return (
        <p>
          <b>
            {cp.name} {cp.exerciseCount}
          </b>
          <br />
          <i>{cp.description}</i>
          <br />
          Submit to: {cp.backgroundMaterial}
        </p>
      );
    case "group":
      return (
        <p>
          <b>
            {cp.name} {cp.exerciseCount}
          </b>
          <br />
          Project exercises: {cp.groupProjectCount}
        </p>
      );
    case "special":
      return (
        <p>
          <b>
            {cp.name} {cp.exerciseCount}
          </b>
          <br />
          <i>{cp.description}</i>
          <br />
          Required skills: {cp.requirements.join(", ")}
        </p>
      );
  }
};

export default Part;
