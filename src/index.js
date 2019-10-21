import { sandpackDemo } from "./sandpacker";
import "./styles.css";

const files = {
  "/src/index.jsx": {
    code: `\
import React from "react";
import { render } from "react-dom";

import "./styles.css";

function App() {
  return (
    <div className="App">
      <h1>Hello React</h1>
    </div>
  );
}

render(<App />, document.getElementById("app"));`
  },
  "/src/styles.css": {
    code: `\
.App {
  font-family: sans-serif;
  text-align: center;
  background-color: #eee;
}`
  },
  "/public/index.html": {
    code: `\
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <title>Hello React</title>
</head>
<body>
  <noscript>You need to enable JavaScript to run this app.</noscript>
  <div id="app"></div>
</body>
</html>`
  },
  // Manage dependency with package.json instead of `dependencies` object.
  "/package.json": {
    code: JSON.stringify(
      {
        name: "react-app",
        version: "1.0.0",
        description: "",
        main: "src/index.jsx",
        dependencies: {
          react: "16.8.3",
          "react-dom": "16.8.3"
          // "react-scripts": "2.1.8"
        }
      },
      null,
      2
    )
  }
};

sandpackDemo(files);
