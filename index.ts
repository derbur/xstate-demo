// turnstile state machine: 
import { createMachine, interpret } from 'xstate';

const turnstileMachine = createMachine({
  id: 'turnstile',
  initial: 'locked',
  states: {
    locked: {
      on: { COIN: 'unlocked', PUSH: 'locked' }
    },
    unlocked: {
      on: { COIN: 'unlocked', PUSH: 'locked' }
    }
  }
});

const turnstileService = interpret(turnstileMachine)
  .onTransition((state) => console.log(state.event.type, state.value))
  .start();

turnstileService.send('PUSH');
turnstileService.send('COIN');
turnstileService.send('PULL'); // doesn't update state
turnstileService.send('PUSH');
turnstileService.send('PULL'); // doesn't update state