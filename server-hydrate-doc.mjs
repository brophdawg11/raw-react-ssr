import http from "node:http";
import * as React from "react";
import * as ReactDOMServer from "react-dom/server";
import Component from "./Component.mjs";

function App() {
  return React.createElement(
    React.StrictMode,
    null,
    React.createElement(
      "html",
      null,
      React.createElement("head"),
      React.createElement(
        "body",
        null,
        React.createElement(Component),
        React.createElement("script", {
          crossOrigin: "true",
          src: "https://unpkg.com/react@18.2.0/umd/react.development.js",
        }),
        React.createElement("script", {
          crossOrigin: "true",
          src: "https://unpkg.com/react-dom@18.2.0/umd/react-dom.development.js",
        }),
        React.createElement("script", {
          async: "async",
          dangerouslySetInnerHTML: {
            __html:
              Component.toString() +
              "\n" +
              App.toString() +
              "\n" +
              "ReactDOM.hydrateRoot(document, React.createElement(App));",
          },
        })
      )
    )
  );
}

let server = http.createServer((req, res) => {
  let doc = ReactDOMServer.renderToString(React.createElement(App));
  res.setHeader("Content-Type", "text/html");
  res.write("<!DOCTYPE html>" + doc);
  res.end();
});

server.listen(3000, () => {
  console.log("server listening on http://localhost:3000");
});
