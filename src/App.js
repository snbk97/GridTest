import React from "react";
import MainGrid from "./components/MainGrid";

import "./styles.css";

class App extends React.Component {
  state = {
    grid: [
      [1, 2, 3],
      [4, 5, 6]
    ]
  };

  render() {
    const { grid } = this.state;
    return (
      <div className="App">
        <MainGrid />
      </div>
    );
  }
}

export default App;
