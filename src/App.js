import React from "react";
import MainGrid from "./components/MainGrid";

import "./styles.css";

class App extends React.Component {
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
