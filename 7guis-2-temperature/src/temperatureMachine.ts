import { createMachine, assign } from "xstate";

interface TemperatureContext {
  C?: number | string;
  F?: number | string;
}

type TemperatureEvent =
    | {
  type: "CELSIUS";
  value: string;
}
    | {
  type: "FAHRENHEIT";
  value: string;
};

export const temperatureMachine = createMachine<
    TemperatureContext,
    TemperatureEvent
    >({
  initial: "active",
  context: { C: undefined, F: undefined },
  states: {
    active: {
      on: {
        CELSIUS: {
          actions: assign({
            C: (_: TemperatureContext, event: TemperatureEvent) => event.value,
            F: (_: TemperatureContext, event: TemperatureEvent) =>
                event.value.length ? +event.value * (9 / 5) + 32 : ""
          })
        },
        FAHRENHEIT: {
          actions: assign({
            C: (_: TemperatureContext, event: TemperatureEvent) =>
                event.value.length ? (+event.value - 32) * (5 / 9) : "",
            F: (_: TemperatureContext, event: TemperatureEvent) => event.value
          })
        }
      }
    }
  }
});
