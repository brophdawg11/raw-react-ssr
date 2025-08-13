import http from "node:http";
import * as React from "react";
import * as ReactDOMServer from "react-dom/server";
import Component from "./Component.mjs";

function Comp({ promise }) {
  if (!promise._tracked) {
    promise._tracked = true;
    promise.then((value) => {
      promise._value = value;
    });
    throw promise;
  }

  return React.createElement("script", {
    async: "async",
    dangerouslySetInnerHTML: {
      __html: `console.log('hi', ${JSON.stringify(promise._value)});`,
    },
  });
}

function App({ promise }) {
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
              Comp.toString() +
              "\n" +
              App.toString() +
              "\n" +
              "let promise = new Promise((r) => setTimeout(() => r('Resolved!'), 1000));" +
              "ReactDOM.hydrateRoot(document, React.createElement(App, { promise }));",
          },
        }),
        React.createElement(
          React.Suspense,
          {
            fallback: React.createElement("script", {
              dangerouslySetInnerHTML: { __html: " " },
            }),
          },
          React.createElement(Comp, { promise })
        )
      )
    )
  );
}

let server = http.createServer((req, res) => {
  let promise = new Promise((r) => setTimeout(() => r("Resolved!"), 1000));
  //let doc = ReactDOMServer.renderToString(React.createElement(App));
  let stream = ReactDOMServer.renderToPipeableStream(
    React.createElement(App, { promise })
  );
  res.setHeader("Content-Type", "text/html");
  stream.pipe(res);
});

server.listen(3000, () => {
  console.log("server listening on http://localhost:3000");
});
