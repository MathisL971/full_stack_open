interface HeaderTypes {
  courseName: string;
}

const Header = (props: HeaderTypes) => {
  return <h1>{props.courseName}</h1>;
};

export default Header;
