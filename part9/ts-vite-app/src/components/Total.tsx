interface TotalTypes {
  totalExercises: number;
}

const Total = (props: TotalTypes) => {
  return <p>Number of exercises: {props.totalExercises}</p>;
};

export default Total;
