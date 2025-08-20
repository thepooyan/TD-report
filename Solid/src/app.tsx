import { A, Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import "./app.css";

export default function App() {
  return (
    <Router
      root={props => (
        <div class="p-5 bg-zinc-300 min-h-dvh text-xl">
          <A href="/" class="p-2 bg-yellow-300 rounded mb-5 block w-max ml-auto">Main Page</A>
          <Suspense>{props.children}</Suspense>
        </div>
      )}
    >
      <FileRoutes />
    </Router>
  );
}
