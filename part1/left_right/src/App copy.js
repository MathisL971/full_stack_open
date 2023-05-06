// Variation of App.js using a JS object as the state

import { useState } from "react";

function App() {
  const [clicks, setClicks] = useState({
    left: 0,
    right: 0,
  });

  // const handleLeftClick = () => {
  //   const newClicks = {
  //     ...clicks,
  //     left: clicks.left + 1,
  //     // right: clicks.right, (Not necessary since spread operator on line 13 adds all attributes from clicks)
  //   };
  //   setClicks(newClicks);
  // };
  //
  // |
  // |
  // v
  //
  const handleLeftClick = () => {
    setClicks({ ...clicks, left: clicks.left + 1 });
  };

  // const handleRightClick = () => {
  //   const newClicks = {
  //     ...clicks,
  //     // left: clicks.left,
  //     right: clicks.right + 1,
  //   };
  //   setClicks(newClicks);
  // };
  //
  // |
  // |
  // v
  //
  const handleRightClick = () => {
    setClicks({ ...clicks, right: clicks.right + 1 });
  };

  return (
    <div>
      {clicks.left}
      <button onClick={handleLeftClick}>left</button>
      <button onClick={handleRightClick}>right</button>
      {clicks.right}
    </div>
  );
}

export default App;
