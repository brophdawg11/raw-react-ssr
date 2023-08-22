# Raw React SSR

This repo contains 2 node HTTP server files that show how React SSR + hydration works without any framework or bundler. Therefore no JSX is used and React scripts are loaded from [unpkg](https://www.unpkg.com/).

**Hydrating a div**

`server-hydrate-div.mjs` shows an example where only a `<div id="app">` is hydrated and the node server manages the rendering of `<html>`/`<head>`/`<body>`/`<script>`/etc tags.

```sh
npm ci
node server-hydrate-div.mjs
```

**Hydrating the full document**

`server-hydrate-doc.mjs` shows an example where the entire `<html>` document is hydrated (this is a common approach for Meta Frameworks such as [Remix](https://remix.run/) or [Next.js](https://vercel.com/solutions/nextjs)).

```sh
npm ci
node server-hydrate-doc.mjs
```
