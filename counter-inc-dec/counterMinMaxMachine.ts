import { Machine, interpret, assign } from 'xstate';

const increment = context => context.count + 1;
const decrement = context => context.count - 1;

const isNotMax = context => context.count < 5;
const isNotMin = context => context.count > 0;

const counterMachine = Machine({
    initial: 'active',
    context: {
        count: 0
    },
    states: {
        active: {
            on: {
                INC: {
                    actions: assign({ count: increment }),
                    cond: isNotMax
                },
                DEC: {
                    actions: assign({ count: decrement }),
                    cond: isNotMin
                }
            }
        }
    }
});

const counterService = interpret(counterMachine)
    .onTransition(state => console.log(state.context.count))
    .start();
// => 0

counterService.send('DEC');
// => 0

counterService.send('INC');
// => 1

counterService.send('INC');
// => 2

counterService.send('INC');
// => 3

counterService.send('INC');
// => 4

counterService.send('INC');
// => 5

counterService.send('INC');
// => 5

counterService.send('DEC');
// => 4