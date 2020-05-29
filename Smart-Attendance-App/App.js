/** @format */

import React, { Component } from "react";
import Navigation from "./navigation";
import { Block } from "./components";

class App extends Component {
  render() {
    return (
      <Block white>
        <Navigation />
      </Block>
    );
  }
}

export default App;
