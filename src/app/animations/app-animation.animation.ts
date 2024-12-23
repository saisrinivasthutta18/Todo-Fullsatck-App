// fade-in.animation.ts
import { trigger, state, style, transition, animate } from '@angular/animations';

export const fadeInOut = trigger('fadeInOut', [
  state('in', style({ opacity: 1 })),
  transition('void => *', [
    style({ opacity: 0 }),
    animate(250) // Adjust the duration as needed
  ]),
  transition('* => void', [
    animate(250, style({ opacity: 0 })) // Adjust the duration as needed
  ])
]);

export const slideInTop = trigger('slideInTop', [
  transition(':enter', [
    style({ transform: 'translateY(-100%)', opacity: 0 }),
    animate('400ms ease-out', style({ transform: 'translateY(0)', opacity: 1 })),
  ]),
  transition(':leave', [
    animate('400ms ease-in', style({ transform: 'translateY(-100%)', opacity: 0 })),
  ]),
]);

export const fadeInScale = trigger('fadeInScale', [
  transition(':enter', [
    style({ opacity: 0, transform: 'scale(0.8)' }),
    animate('250ms ease-out', style({ opacity: 1, transform: 'scale(1)' })),
  ]),
  transition(':leave', [
    animate('250ms ease-in', style({ opacity: 0, transform: 'scale(0.8)' })),
  ]),
]);

export const bounceIn = trigger('bounceIn', [
  transition(':enter', [
    style({ opacity: 0, transform: 'scale(0.3)' }),
    animate('250ms ease-out', style({ opacity: 1, transform: 'scale(1)' })),
  ]),
  transition(':leave', [
    animate('250ms ease-in', style({ opacity: 0, transform: 'scale(0.3)' })),
  ]),
]);

export const rotateIn = trigger('rotateIn', [
  transition(':enter', [
    style({ opacity: 0, transform: 'rotate(-180deg)' }),
    animate('250ms ease-out', style({ opacity: 1, transform: 'rotate(0deg)' })),
  ]),
  transition(':leave', [
    animate('250ms ease-in', style({ opacity: 0, transform: 'rotate(-180deg)' })),
  ]),
]);