import "./styles.css";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { useMachine } from "@xstate/react";
import { temperatureMachine } from "./temperatureMachine";

const TempConv = () => {
    const [state, send] = useMachine(temperatureMachine);

    const { C, F } = state.context;

    return (
        <section>
            <label>
                <input
                    type="number"
                    id="celsius"
                    value={C}
                    onChange={e => {
                        send("CELSIUS", { value: e.target.value });
                    }}
                    placeholder="e.g., 0"
                />
                <span>˚C</span>
            </label>
            <div>=</div>
            <label>
                <input
                    type="number"
                    id="fahrenheit"
                    value={F}
                    onChange={e => {
                        send("FAHRENHEIT", { value: e.target.value });
                    }}
                    placeholder="e.g., 32"
                />
                <span>˚F</span>
            </label>
        </section>
    );
};

const App = () => {
    return <TempConv />;
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
