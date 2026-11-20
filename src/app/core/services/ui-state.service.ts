import { Injectable, signal } from '@angular/core';

/** Estado de interfaz compartido entre secciones (p. ej. el modal de la ficha de laboratorio). */
@Injectable({ providedIn: 'root' })
export class UiStateService {
  readonly labReportOpen = signal(false);

  openLabReport(): void {
    this.labReportOpen.set(true);
  }

  closeLabReport(): void {
    this.labReportOpen.set(false);
  }
}
