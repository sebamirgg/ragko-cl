import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/**
 * Abeja decorativa en trazo dorado con aleteo y vuelo suave.
 * Uso: <app-bee flight="a" class="absolute top-10 right-10 w-9 h-8" />
 * Respeta prefers-reduced-motion.
 */
@Component({
  selector: 'app-bee',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'aria-hidden': 'true',
    class: 'pointer-events-none text-honey',
    '[class.fly-a]': "flight() === 'a'",
    '[class.fly-b]': "flight() === 'b'",
  },
  styles: `
    :host { display: block; filter: drop-shadow(0 4px 10px rgba(0, 0, 0, 0.45)); }
    :host(.fly-a) { animation: beeFlyA 14s ease-in-out infinite; }
    :host(.fly-b) { animation: beeFlyB 18s ease-in-out infinite; }
    .wing { transform-origin: 50% 100%; animation: wingFlap 0.18s ease-in-out infinite alternate; }

    @keyframes wingFlap { from { transform: scaleY(1); } to { transform: scaleY(0.55); } }
    @keyframes beeFlyA {
      0%, 100% { transform: translate(0, 0) rotate(-8deg); }
      25% { transform: translate(38px, -22px) rotate(6deg); }
      50% { transform: translate(70px, 6px) rotate(-4deg); }
      75% { transform: translate(28px, 20px) rotate(10deg); }
    }
    @keyframes beeFlyB {
      0%, 100% { transform: translate(0, 0) rotate(12deg) scaleX(-1); }
      30% { transform: translate(-46px, 18px) rotate(-6deg) scaleX(-1); }
      60% { transform: translate(-80px, -16px) rotate(8deg) scaleX(-1); }
      85% { transform: translate(-30px, -28px) rotate(-10deg) scaleX(-1); }
    }
    @media (prefers-reduced-motion: reduce) {
      :host, .wing { animation: none !important; }
    }
  `,
  template: `
    <svg viewBox="0 0 48 40" class="block w-full h-full" fill="none">
      <ellipse class="wing" cx="19" cy="12" rx="7" ry="9" fill="#FCE8C3" fill-opacity="0.55" stroke="#FCE8C3" stroke-opacity="0.8" stroke-width="1" />
      <ellipse class="wing" cx="28" cy="13" rx="6" ry="8" fill="#FCE8C3" fill-opacity="0.4" stroke="#FCE8C3" stroke-opacity="0.7" stroke-width="1" />
      <ellipse cx="24" cy="26" rx="13" ry="8.5" fill="currentColor" />
      <path d="M19 18.5v15M25 17.6v16.8M31 19v14" stroke="#14171A" stroke-width="2.6" stroke-linecap="round" />
      <circle cx="38" cy="25" r="4.6" fill="#14171A" />
      <path d="M40 21c2-3 4-4 6-4M39 21c1-3 2-5 4-6" stroke="#14171A" stroke-width="1.2" stroke-linecap="round" />
      <path d="M11 26l-4 1" stroke="#14171A" stroke-width="2" stroke-linecap="round" />
    </svg>
  `,
})
export class BeeComponent {
  readonly flight = input<'a' | 'b' | 'none'>('none');
}
