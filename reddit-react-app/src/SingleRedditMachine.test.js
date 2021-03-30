import { interpret } from 'xstate';
import { assert } from 'chai';

import { redditMachine } from './SingleRedditMachine';

describe('reddit machine (live)', () => {
    it('should load posts of a selected subreddit', done => {
        const redditService = interpret(redditMachine)
            .onTransition(state => {
                // when the state finally reaches 'selected.loaded',
                // the test has succeeded.

                if (state.matches({ selected: 'loaded' })) {
                    assert.isNotEmpty(state.context.posts);
                    console.log("Subreddit: ", state.context.posts[0].subreddit);
                    if (state.context.posts[0].subreddit === 'vuejs')
                    done();
                }
            })
            .start(); // remember to start the service!

        // Test that when the 'SELECT' event is sent, the machine eventually
        // reaches the { selected: 'loaded' } state with posts
        console.log('sending reactjs')
        redditService.send('SELECT', { name: 'reactjs' });

        // when 'selected' goes to 'loaded' or 'failed' the machine is going back to 'idle' (how? I don't see explicit state transition to 'idle'),
        // and then a new SELECT can be processed
        // if a message arrives while 'loading' is happening, that message seems to be ignored (is not queued)
        setTimeout(() => {
            console.log('sending vuejs')
            redditService.send('SELECT', { name: 'vuejs' });
        }, 2000);

    });
});
