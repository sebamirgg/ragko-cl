import { DestroyRef, Directive, ElementRef, afterNextRender, inject, input } from '@angular/core';

/**
 * Micro-interacción: el elemento aparece con un desplazamiento suave al entrar en pantalla.
 * - Solo actúa en el navegador (el HTML del servidor siempre es visible).
 * - Si el elemento ya está visible al cargar, no lo oculta (sin parpadeos).
 * - Respeta prefers-reduced-motion.
 * Uso: <div appReveal [revealDelay]="120">…</div>
 */
@Directive({ selector: '[appReveal]' })
export class RevealOnScrollDirective {
  readonly revealDelay = input(0);

  constructor() {
    const el = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      if (!('IntersectionObserver' in window)) return;
      const reduceMotion =
        typeof window.matchMedia === 'function' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reduceMotion) return;

      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) return;

      el.style.setProperty('--reveal-delay', `${this.revealDelay()}ms`);
      el.classList.add('reveal');

      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              el.classList.add('is-visible');
              observer.disconnect();
            }
          }
        },
        { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
      );
      observer.observe(el);
      destroyRef.onDestroy(() => observer.disconnect());
    });
  }
}
