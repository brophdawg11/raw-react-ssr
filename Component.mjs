import * as React from "react";

export default function Component() {
  let [hydrated, setHydrated] = React.useState(false);
  let [count, setCount] = React.useState(0);

  React.useEffect(() => setHydrated(true), []);

  return React.createElement(
    React.Fragment,
    null,
    React.createElement("p", null, `Hydrated: ${hydrated}`),
    React.createElement(
      "button",
      {
        onClick() {
          setCount(count + 1);
        },
      },
      `Count: ${count}`
    )
  );
}
