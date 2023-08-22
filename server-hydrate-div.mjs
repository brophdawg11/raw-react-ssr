import http from "node:http";
import * as React from "react";
import * as ReactDOMServer from "react-dom/server";
import Component from "./Component.mjs";

function App() {
  return React.createElement(
    React.StrictMode,
    null,
    React.createElement(Component)
  );
}

let doc = `<html>
<body>
  <div id="app">${ReactDOMServer.renderToString(React.createElement(App))}</div>
  <script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"></script>
  <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
  <script async>
    ${Component.toString()}
    ${App.toString()}
    ReactDOM.hydrateRoot(document.querySelector('#app'), React.createElement(App));
  </script>
</body>
</html>`;

let server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "text/html");
  res.write(doc);
  res.end();
});

server.listen(3000, () => {
  console.log("server listening on http://localhost:3000");
});
