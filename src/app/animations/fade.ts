import { trigger, transition, style, animate, state } from '@angular/animations';

export const fade = trigger('fade', [
  state('void', style({
  })),
  transition('void <=> *', [ // :enter, :leave
    style({
      backgroundColor: 'red', opacity: 0
    }),
    animate(2000, style({
      backgroundColor: 'blue', opacity: 1
    }))
  ])
]);
