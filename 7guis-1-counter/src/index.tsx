import "./styles.css";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { useMachine } from "@xstate/react";
import { counterMachine } from "./counterMachine";

const Counter = () => {
  const [state, send] = useMachine(counterMachine);

  return (
    <section>
      <output>{state.context.count}</output>
      <button onClick={() => send("INCREMENT")}>Count</button>
    </section>
  );
};

const App = () => {
  return <Counter />;
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

