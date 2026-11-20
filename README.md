import { Component, signal, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

type Language = 'es' | 'en';
type HoneyTab = 'ulmo' | 'tineo';

interface PollenDatum {
species: string;
commonEs: string;
commonEn: string;
grains: number;
percentage: number;
isPrimary?: boolean;
}

interface GalleryItem {
id: string;
spanClass: string;
imageUrl: string;
tagEs: string;
tagEn: string;
titleEs: string;
titleEn: string;
descEs: string;
descEn: string;
}

@Component({
selector: 'app-root',
standalone: true,
imports: [CommonModule],
template: `
<!-- ESTILOS BOUTIQUE & TEXTURA DE PANAL DE ABEJAS -->
<style>
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,500;1,600&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap');

      :host {
        --bg-obsidian: #0E1012;
        --bg-charcoal: #14171A;
        --bg-slate: #1A1D21;
        --border-slate: #272B31;
        --accent-terracotta: #E08244;
        --accent-cream: #FCE8C3;
        --text-bone: #F8F9FA;
        --text-muted: #A3A8B0;

        display: block;
        font-family: 'Plus Jakarta Sans', sans-serif;
        background-color: var(--bg-obsidian);
        color: var(--text-bone);
        scroll-behavior: smooth;
        overflow-x: hidden;
      }

      .font-serif-editorial {
        font-family: 'Cormorant Garamond', Georgia, serif;
      }

      /* Patrón sutil de panal hexagonal con líneas finas y desvanecimiento radial */
      .honeycomb-bg {
        background-image: url("data:image/svg+xml,%3Csvg width='56' height='98' viewBox='0 0 56 98' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M28 66L0 50L0 16L28 0L56 16L56 50L28 66L28 100' fill='none' stroke='%23E08244' stroke-opacity='0.065' stroke-width='1'/%3E%3Cpath d='M28 0L28 34L0 50L0 84L28 100L56 84L56 50L28 34' fill='none' stroke='%23FCE8C3' stroke-opacity='0.035' stroke-width='0.8'/%3E%3C/svg%3E");
        background-size: 56px 98px;
      }

      .honeycomb-mask {
        -webkit-mask-image: radial-gradient(circle at center, rgba(0,0,0,1) 30%, rgba(0,0,0,0.15) 85%);
        mask-image: radial-gradient(circle at center, rgba(0,0,0,1) 30%, rgba(0,0,0,0.15) 85%);
      }

      /* Brillo sutil estilo medallón Ragko */
      .ragko-medallion {
        background-color: #FCE8C3;
        border: 2.5px solid #E08244;
        box-shadow: 0 0 0 5px #1A1D21, 0 12px 30px rgba(0, 0, 0, 0.55);
      }

      /* Resplandor botón principal WhatsApp boutique */
      .whatsapp-glow {
        box-shadow: 0 10px 35px -5px rgba(224, 130, 68, 0.35), 0 0 0 1px rgba(252, 232, 195, 0.25);
      }
      .whatsapp-glow:hover {
        box-shadow: 0 16px 45px -4px rgba(224, 130, 68, 0.55), 0 0 0 1px rgba(252, 232, 195, 0.5);
      }

      @keyframes fadeUp {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .animate-fade-up {
        animation: fadeUp 0.85s cubic-bezier(0.16, 1, 0.3, 1) forwards;
      }

      ::-webkit-scrollbar { width: 8px; }
      ::-webkit-scrollbar-track { background: #0E1012; }
      ::-webkit-scrollbar-thumb { background: #E08244; border-radius: 4px; }
    </style>

    <!-- =====================================================================
         HEADER BOUTIQUE FIJO CON LOGOTIPO OFICIAL DE COOPERATIVA RAGKO
    ====================================================================== -->
    <header
      [class]="isScrolled()
        ? 'bg-[#0E1012]/95 backdrop-blur-md py-3 border-b border-[#272B31] shadow-2xl'
        : 'bg-gradient-to-b from-[#0E1012]/90 to-transparent py-5'"
      class="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        <!-- Logotipo Oficial Vectorial Cooperativa Ragko -->
        <a href="#hero" class="flex items-center gap-3.5 group" aria-label="Cooperativa Ragko Inicio">
          <!-- Medallón Crema con Flor Hexagonal Terracota (Fiel a la 2da imagen) -->
          <div class="w-11 h-11 rounded-full bg-[#FCE8C3] border-2 border-[#E08244] flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300">
            <svg class="w-7 h-7 text-[#E08244]" viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="7.5" stroke-linejoin="round">
              <!-- Hexágono Central -->
              <polygon points="50,35 63,42.5 63,57.5 50,65 37,57.5 37,42.5"/>
              <!-- 6 Hexágonos Periféricos -->
              <polygon points="50,12 63,19.5 63,34.5 50,42 37,34.5 37,19.5"/>
              <polygon points="70,23.5 83,31 83,46 70,53.5 57,46 57,31"/>
              <polygon points="70,46.5 83,54 83,69 70,76.5 57,69 57,54"/>
              <polygon points="50,58 63,65.5 63,80.5 50,88 37,80.5 37,65.5"/>
              <polygon points="30,46.5 43,54 43,69 30,76.5 17,69 17,54"/>
              <polygon points="30,23.5 43,31 43,46 30,53.5 17,46 17,31"/>
            </svg>
          </div>

          <!-- Tipografía Oficial 'Ragk' + Isotipo + Subtítulo Caramávida -->
          <div class="flex flex-col">
            <div class="flex items-center">
              <span class="text-2xl font-bold tracking-tight text-[#E08244] leading-none font-sans">Ragk</span>
              <svg class="w-5 h-5 text-[#E08244] ml-0.5 mt-1" viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="8.5" stroke-linejoin="round">
                <polygon points="50,35 63,42.5 63,57.5 50,65 37,57.5 37,42.5"/>
                <polygon points="50,12 63,19.5 63,34.5 50,42 37,34.5 37,19.5"/>
                <polygon points="70,23.5 83,31 83,46 70,53.5 57,46 57,31"/>
                <polygon points="70,46.5 83,54 83,69 70,76.5 57,69 57,54"/>
                <polygon points="50,58 63,65.5 63,80.5 50,88 37,80.5 37,65.5"/>
                <polygon points="30,46.5 43,54 43,69 30,76.5 17,69 17,54"/>
                <polygon points="30,23.5 43,31 43,46 30,53.5 17,46 17,31"/>
              </svg>
            </div>
            <span class="text-[10px] uppercase tracking-[0.24em] text-[#FCE8C3]/85 font-medium mt-0.5">
              Caramávida · Nahuelbuta
            </span>
          </div>
        </a>

        <!-- Navegación Ancla Desktop -->
        <nav class="hidden lg:flex items-center gap-6 text-[11px] font-semibold tracking-[0.16em] uppercase text-[#A3A8B0]">
          <a href="#valor" class="hover:text-[#FCE8C3] transition">{{ t('nav.value') }}</a>
          <a href="#territorio" class="hover:text-[#FCE8C3] transition">{{ t('nav.territory') }}</a>
          <a href="#mieles" class="hover:text-[#FCE8C3] transition">{{ t('nav.honeys') }}</a>
          <a href="#galeria" class="hover:text-[#FCE8C3] transition">{{ t('nav.gallery') }}</a>
          <a href="#ciencia" class="hover:text-[#FCE8C3] transition">{{ t('nav.science') }}</a>
          <a href="#ruta-do" class="hover:text-[#FCE8C3] transition">{{ t('nav.roadmap') }}</a>
        </nav>

        <!-- Selector ES / EN + Botón Directo WhatsApp Header -->
        <div class="flex items-center gap-3">
          <div class="flex items-center bg-[#1A1D21] border border-[#272B31] rounded-full p-0.5 text-[11px] font-bold">
            <button
              (click)="setLang('es')"
              [class]="lang() === 'es' ? 'bg-[#E08244] text-[#0E1012]' : 'text-[#A3A8B0] hover:text-[#F8F9FA]'"
              class="px-2.5 py-1 rounded-full transition cursor-pointer">
              ES
            </button>
            <button
              (click)="setLang('en')"
              [class]="lang() === 'en' ? 'bg-[#E08244] text-[#0E1012]' : 'text-[#A3A8B0] hover:text-[#F8F9FA]'"
              class="px-2.5 py-1 rounded-full transition cursor-pointer">
              EN
            </button>
          </div>

          <a href="#contacto"
             class="hidden sm:inline-flex items-center gap-2 bg-[#FCE8C3] hover:bg-[#E08244] text-[#0E1012] font-bold text-[11px] uppercase tracking-wider px-4 py-2.5 rounded-full transition shadow-lg">
            <span>{{ t('nav.cta') }}</span>
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2.4" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
            </svg>
          </a>
        </div>
      </div>
    </header>

    <!-- =====================================================================
         SECCIÓN 1: HERO CINEMATOGRÁFICO BOUTIQUE & IDENTIDAD RAGKO
    ====================================================================== -->
    <section id="hero" class="relative min-h-screen flex items-center pt-28 pb-20 overflow-hidden bg-[#0E1012]">
      <!-- Fotografía Editorial de Fondo con Overlay Oscuro Sofisticado -->
      <div class="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=2000&q=85"
          alt="Miel artesanal pura del bosque nativo de Caramávida"
          class="w-full h-full object-cover object-center scale-105 opacity-35"/>
        <div class="absolute inset-0 bg-gradient-to-r from-[#0E1012] via-[#0E1012]/90 to-[#0E1012]/65"></div>
        <div class="absolute inset-0 bg-gradient-to-t from-[#0E1012] via-transparent to-[#0E1012]/70"></div>
        <!-- Textura Panal Sutil Superpuesta -->
        <div class="absolute inset-0 honeycomb-bg honeycomb-mask opacity-90"></div>
      </div>

      <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div class="grid lg:grid-cols-12 gap-12 items-center">
          
          <!-- Narrativa Principal (7 cols) -->
          <div class="lg:col-span-7 space-y-7 animate-fade-up">
            <div class="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#1A1D21]/90 border border-[#E08244]/40 text-xs tracking-[0.2em] uppercase text-[#FCE8C3]">
              <span class="w-2 h-2 rounded-full bg-[#E08244] animate-pulse"></span>
              <span>{{ t('hero.kicker') }}</span>
            </div>

            <h1 class="font-serif-editorial text-4xl sm:text-6xl lg:text-[66px] font-semibold leading-[1.06] tracking-tight text-[#F8F9FA]">
              {{ t('hero.title') }}
            </h1>

            <p class="text-base sm:text-lg text-[#A3A8B0] leading-relaxed max-w-2xl font-light">
              {{ t('hero.subtitle') }}
            </p>

            <!-- 4 Medallones Identitarios Oficiales de Cooperativa Ragko (Inspirados en la 2da imagen) -->
            <div class="pt-2">
              <div class="text-[10px] uppercase tracking-[0.24em] text-[#E08244] font-bold mb-3.5">
                {{ t('hero.medallionsLabel') }}
              </div>
              <div class="flex flex-wrap items-center gap-4 sm:gap-5">
                <a href="#mieles" class="group flex flex-col items-center gap-2">
                  <div class="w-14 h-14 sm:w-16 sm:h-16 rounded-full ragko-medallion flex items-center justify-center group-hover:-translate-y-1 transition-transform duration-300">
                    <span class="text-xl sm:text-2xl font-bold text-[#E08244] tracking-tight">Ra</span>
                  </div>
                  <span class="text-[11px] font-semibold text-[#F8F9FA]/90 group-hover:text-[#FCE8C3] transition">{{ t('medallion.products') }}</span>
                </a>

                <a href="#ciencia" class="group flex flex-col items-center gap-2">
                  <div class="w-14 h-14 sm:w-16 sm:h-16 rounded-full ragko-medallion flex items-center justify-center group-hover:-translate-y-1 transition-transform duration-300">
                    <span class="text-xl sm:text-2xl font-bold text-[#E08244]">g</span>
                  </div>
                  <span class="text-[11px] font-semibold text-[#F8F9FA]/90 group-hover:text-[#FCE8C3] transition">{{ t('medallion.quality') }}</span>
                </a>

                <a href="#territorio" class="group flex flex-col items-center gap-2">
                  <div class="w-14 h-14 sm:w-16 sm:h-16 rounded-full ragko-medallion flex items-center justify-center group-hover:-translate-y-1 transition-transform duration-300">
                    <div class="flex items-center">
                      <span class="text-xl sm:text-2xl font-bold text-[#E08244]">k</span>
                      <svg class="w-3.5 h-3.5 text-[#E08244] mt-1" viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="9">
                        <polygon points="50,35 63,42.5 63,57.5 50,65 37,57.5 37,42.5"/>
                        <polygon points="50,12 63,19.5 63,34.5 50,42 37,34.5 37,19.5"/>
                        <polygon points="70,23.5 83,31 83,46 70,53.5 57,46 57,31"/>
                        <polygon points="70,46.5 83,54 83,69 70,76.5 57,69 57,54"/>
                        <polygon points="50,58 63,65.5 63,80.5 50,88 37,80.5 37,65.5"/>
                        <polygon points="30,46.5 43,54 43,69 30,76.5 17,69 17,54"/>
                        <polygon points="30,23.5 43,31 43,46 30,53.5 17,46 17,31"/>
                      </svg>
                    </div>
                  </div>
                  <span class="text-[11px] font-semibold text-[#F8F9FA]/90 group-hover:text-[#FCE8C3] transition">{{ t('medallion.origin') }}</span>
                </a>

                <a href="#contacto" class="group flex flex-col items-center gap-2">
                  <div class="w-14 h-14 sm:w-16 sm:h-16 rounded-full ragko-medallion flex items-center justify-center group-hover:-translate-y-1 transition-transform duration-300">
                    <svg class="w-8 h-8 text-[#E08244]" viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="7.5" stroke-linejoin="round">
                      <polygon points="50,35 63,42.5 63,57.5 50,65 37,57.5 37,42.5"/>
                      <polygon points="50,12 63,19.5 63,34.5 50,42 37,34.5 37,19.5"/>
                      <polygon points="70,23.5 83,31 83,46 70,53.5 57,46 57,31"/>
                      <polygon points="70,46.5 83,54 83,69 70,76.5 57,69 57,54"/>
                      <polygon points="50,58 63,65.5 63,80.5 50,88 37,80.5 37,65.5"/>
                      <polygon points="30,46.5 43,54 43,69 30,76.5 17,69 17,54"/>
                      <polygon points="30,23.5 43,31 43,46 30,53.5 17,46 17,31"/>
                    </svg>
                  </div>
                  <span class="text-[11px] font-semibold text-[#F8F9FA]/90 group-hover:text-[#FCE8C3] transition">{{ t('medallion.alliances') }}</span>
                </a>
              </div>
            </div>

            <!-- CTAs Directos sin Formularios -->
            <div class="flex flex-wrap items-center gap-4 pt-3">
              <a [href]="whatsappUrl()"
                 target="_blank"
                 rel="noopener noreferrer"
                 class="inline-flex items-center gap-3 bg-[#E08244] hover:bg-[#FCE8C3] text-[#0E1012] font-bold text-sm px-7 py-4 rounded-full transition-all duration-300 whatsapp-glow">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.1.824z"/>
                </svg>
                <span>{{ t('hero.ctaWhatsapp') }}</span>
              </a>

              <a href="#galeria"
                 class="inline-flex items-center gap-2 bg-[#1A1D21]/85 hover:bg-[#272B31] text-[#F8F9FA] border border-[#272B31] hover:border-[#E08244]/50 font-medium text-sm px-7 py-4 rounded-full transition">
                <span>{{ t('hero.ctaExplore') }}</span>
                <svg class="w-4 h-4 text-[#E08244]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/>
                </svg>
              </a>
            </div>
          </div>

          <!-- Tarjeta Editorial Fotográfica de Producto Boutique (5 cols) -->
          <div class="lg:col-span-5">
            <div class="relative rounded-3xl bg-[#14171A] border border-[#272B31] p-5 sm:p-6 shadow-2xl group overflow-hidden">
              <!-- Fotografía de Panal y Miel Pura -->
              <div class="relative h-72 sm:h-80 rounded-2xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?auto=format&fit=crop&w=1000&q=85"
                  alt="Miel de Ulmo y Tineo Cooperativa Ragko Caramávida"
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"/>
                <div class="absolute inset-0 bg-gradient-to-t from-[#0E1012] via-[#0E1012]/20 to-transparent"></div>

                <!-- Sello Flotante D.O. -->
                <div class="absolute top-4 right-4 px-3.5 py-1.5 rounded-full bg-[#0E1012]/90 backdrop-blur-md border border-[#E08244]/60 text-[11px] font-bold text-[#FCE8C3] tracking-wider uppercase">
                  INAPI · Ruta D.O.
                </div>

                <!-- Etiqueta Inferior sobre Fotografía -->
                <div class="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                  <div>
                    <span class="text-[10px] uppercase tracking-[0.22em] text-[#E08244] font-bold block">Colección Monofloral</span>
                    <h2 class="font-serif-editorial text-2xl sm:text-3xl font-semibold text-[#F8F9FA]">
                      Ulmo & Tineo · Caramávida
                    </h2>
                  </div>
                </div>
              </div>

              <!-- Ficha Rápida de Origen -->
              <div class="mt-5 grid grid-cols-2 gap-3.5 text-xs">
                <div class="p-3.5 rounded-2xl bg-[#1A1D21] border border-[#272B31]">
                  <span class="text-[#A3A8B0] block text-[11px]">{{ t('hero.stat1Label') }}</span>
                  <span class="font-bold text-[#FCE8C3] text-lg">5.739 ha</span>
                  <span class="text-[10px] text-[#E08244] block font-medium">AAVC Cordillera Nahuelbuta</span>
                </div>
                <div class="p-3.5 rounded-2xl bg-[#1A1D21] border border-[#272B31]">
                  <span class="text-[#A3A8B0] block text-[11px]">{{ t('hero.stat2Label') }}</span>
                  <span class="font-bold text-[#F8F9FA] text-lg">81,0% / 69,6%</span>
                  <span class="text-[10px] text-[#E08244] block font-medium">Pureza Polínica Certificada</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>

    <!-- =====================================================================
         SECCIÓN 2: PROPUESTA DE VALOR & TRIPLE IMPACTO TERRITORIAL
    ====================================================================== -->
    <section id="valor" class="relative py-24 sm:py-32 bg-[#14171A] border-y border-[#272B31] overflow-hidden">
      <div class="absolute inset-0 honeycomb-bg opacity-45 pointer-events-none"></div>

      <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div class="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <span class="text-xs font-bold uppercase tracking-[0.24em] text-[#E08244]">
            {{ t('sec2.kicker') }}
          </span>
          <h2 class="font-serif-editorial text-3xl sm:text-5xl font-semibold text-[#F8F9FA] leading-tight">
            {{ t('sec2.title') }}
          </h2>
          <p class="text-base sm:text-lg text-[#A3A8B0] leading-relaxed">
            {{ t('sec2.lead') }}
          </p>
        </div>

        <!-- Banner Hito Histórico Provincia de Arauco -->
        <div class="mb-14 rounded-3xl bg-gradient-to-r from-[#1A1D21] via-[#1E2227] to-[#1A1D21] border border-[#E08244]/40 p-7 sm:p-9 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-2xl">
          <div class="flex items-start gap-5">
            <div class="w-14 h-14 rounded-2xl bg-[#FCE8C3] border-2 border-[#E08244] flex items-center justify-center shrink-0 text-[#E08244] shadow-lg">
              <svg class="w-7 h-7" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
              </svg>
            </div>
            <div>
              <span class="text-[11px] uppercase tracking-[0.2em] text-[#E08244] font-bold">{{ t('sec2.bannerTag') }}</span>
              <h3 class="font-serif-editorial text-2xl sm:text-3xl font-semibold text-[#F8F9FA] mt-1">
                {{ t('sec2.bannerTitle') }}
              </h3>
              <p class="text-sm text-[#A3A8B0] mt-1.5 max-w-3xl leading-relaxed">
                {{ t('sec2.bannerDesc') }}
              </p>
            </div>
          </div>

          <div class="shrink-0 bg-[#0E1012] border border-[#E08244]/50 rounded-2xl px-6 py-4 text-center">
            <div class="text-3xl font-bold text-[#FCE8C3]">+100%</div>
            <div class="text-[11px] uppercase tracking-wider text-[#E08244] font-semibold mt-0.5">{{ t('sec2.bannerMetric') }}</div>
          </div>
        </div>

        <!-- 3 Pilares de Triple Impacto -->
        <div class="grid md:grid-cols-3 gap-8">
          <div class="bg-[#1A1D21] rounded-3xl p-8 border border-[#272B31] hover:border-[#E08244]/60 transition duration-300 flex flex-col justify-between group">
            <div>
              <div class="w-12 h-12 rounded-2xl bg-[#0E1012] border border-[#E08244]/40 flex items-center justify-center text-[#E08244] mb-6 group-hover:bg-[#FCE8C3] transition-colors">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <span class="text-[11px] font-bold uppercase tracking-widest text-[#E08244]">01 · {{ t('sec2.card1.tag') }}</span>
              <h3 class="font-serif-editorial text-2xl font-semibold text-[#F8F9FA] mt-2 mb-3">
                {{ t('sec2.card1.title') }}
              </h3>
              <p class="text-sm text-[#A3A8B0] leading-relaxed">
                {{ t('sec2.card1.desc') }}
              </p>
            </div>
            <div class="mt-6 pt-4 border-t border-[#272B31] text-xs font-semibold text-[#FCE8C3] flex items-center justify-between">
              <span>INAPI · Ley N° 19.039</span>
              <span class="text-[#E08244]">Export & Gourmet</span>
            </div>
          </div>

          <div class="bg-[#1A1D21] rounded-3xl p-8 border border-[#272B31] hover:border-[#E08244]/60 transition duration-300 flex flex-col justify-between group">
            <div>
              <div class="w-12 h-12 rounded-2xl bg-[#0E1012] border border-[#E08244]/40 flex items-center justify-center text-[#E08244] mb-6 group-hover:bg-[#FCE8C3] transition-colors">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
              </div>
              <span class="text-[11px] font-bold uppercase tracking-widest text-[#E08244]">02 · {{ t('sec2.card2.tag') }}</span>
              <h3 class="font-serif-editorial text-2xl font-semibold text-[#F8F9FA] mt-2 mb-3">
                {{ t('sec2.card2.title') }}
              </h3>
              <p class="text-sm text-[#A3A8B0] leading-relaxed">
                {{ t('sec2.card2.desc') }}
              </p>
            </div>
            <div class="mt-6 pt-4 border-t border-[#272B31] text-xs font-semibold text-[#FCE8C3] flex items-center justify-between">
              <span>Ragko · Nahuelbuta · Arauco</span>
              <span class="text-[#E08244]">Consejo Regulador</span>
            </div>
          </div>

          <div class="bg-[#1A1D21] rounded-3xl p-8 border border-[#272B31] hover:border-[#E08244]/60 transition duration-300 flex flex-col justify-between group">
            <div>
              <div class="w-12 h-12 rounded-2xl bg-[#0E1012] border border-[#E08244]/40 flex items-center justify-center text-[#E08244] mb-6 group-hover:bg-[#FCE8C3] transition-colors">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <span class="text-[11px] font-bold uppercase tracking-widest text-[#E08244]">03 · {{ t('sec2.card3.tag') }}</span>
              <h3 class="font-serif-editorial text-2xl font-semibold text-[#F8F9FA] mt-2 mb-3">
                {{ t('sec2.card3.title') }}
              </h3>
              <p class="text-sm text-[#A3A8B0] leading-relaxed">
                {{ t('sec2.card3.desc') }}
              </p>
            </div>
            <div class="mt-6 pt-4 border-t border-[#272B31] text-xs font-semibold text-[#FCE8C3] flex items-center justify-between">
              <span>5.739 ha AAVC</span>
              <span class="text-[#E08244]">929,88 ha Ulmo-Tineo</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- =====================================================================
         SECCIÓN 3: EL TERRITORIO — BOSQUE NATIVO DE CARAMÁVIDA (AAVC)
    ====================================================================== -->
    <section id="territorio" class="py-24 sm:py-32 bg-[#0E1012] border-b border-[#272B31]">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid lg:grid-cols-12 gap-12 items-center">
          
          <!-- Narrativa + Fotografía Editorial del Bosque (5 cols) -->
          <div class="lg:col-span-5 space-y-6">
            <span class="text-xs font-bold uppercase tracking-[0.24em] text-[#E08244]">
              {{ t('sec3.kicker') }}
            </span>
            <h2 class="font-serif-editorial text-3xl sm:text-5xl font-semibold text-[#F8F9FA] leading-tight">
              {{ t('sec3.title') }}
            </h2>
            <p class="text-sm sm:text-base text-[#A3A8B0] leading-relaxed">
              {{ t('sec3.desc') }}
            </p>

            <!-- Fotografía del Bosque Templado Lluvioso -->
            <div class="relative h-52 rounded-2xl overflow-hidden border border-[#272B31] group">
              <img
                src="https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=900&q=80"
                alt="Bosque templado lluvioso Cordillera de Nahuelbuta"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"/>
              <div class="absolute inset-0 bg-gradient-to-t from-[#0E1012] via-transparent to-transparent"></div>
              <div class="absolute bottom-3 left-4 text-xs font-semibold text-[#FCE8C3]">
                Ladera Occidental · Cordillera de Nahuelbuta, Curanilahue
              </div>
            </div>

            <!-- Calendario Estacional de Floración -->
            <div class="bg-[#1A1D21] rounded-2xl p-5 border border-[#272B31]">
              <div class="text-xs uppercase tracking-widest text-[#FCE8C3] font-bold mb-3">
                {{ t('sec3.calendarTitle') }}
              </div>
              <div class="space-y-3 text-xs">
                <div>
                  <div class="flex justify-between mb-1">
                    <span class="font-semibold text-[#F8F9FA]">Tineo (Weinmannia trichosperma)</span>
                    <span class="text-[#E08244] font-bold">Nov – Dic</span>
                  </div>
                  <div class="w-full h-2.5 bg-[#0E1012] rounded-full overflow-hidden flex">
                    <div class="w-1/6 bg-[#E08244] rounded-full"></div>
                    <div class="w-5/6"></div>
                  </div>
                </div>
                <div>
                  <div class="flex justify-between mb-1">
                    <span class="font-semibold text-[#F8F9FA]">Ulmo (Eucryphia cordifolia)</span>
                    <span class="text-[#FCE8C3] font-bold">Ene – Mar</span>
                  </div>
                  <div class="w-full h-2.5 bg-[#0E1012] rounded-full overflow-hidden flex">
                    <div class="w-1/6"></div>
                    <div class="w-2/6 bg-[#FCE8C3] rounded-full"></div>
                    <div class="w-3/6"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Mapa Esquemático Generalizado (Cumplimiento Ley Apícola N° 21.489) (7 cols) -->
          <div class="lg:col-span-7">
            <div class="bg-[#14171A] rounded-3xl p-6 sm:p-8 border border-[#272B31] shadow-2xl">
              <div class="flex flex-wrap items-center justify-between gap-2 pb-4 mb-5 border-b border-[#272B31]">
                <div>
                  <span class="text-[10px] uppercase tracking-[0.22em] text-[#E08244] font-bold block">Cartografía Territorial Generalizada</span>
                  <h3 class="font-serif-editorial text-2xl font-semibold text-[#F8F9FA]">Predio Caramávida AAVC · 5.739 ha</h3>
                </div>
                <span class="px-3 py-1 rounded-full bg-[#1A1D21] border border-[#E08244]/40 text-[11px] text-[#FCE8C3]">
                  Ley N° 21.489 · Coordenadas Resguardadas
                </span>
              </div>

              <!-- SVG Mapa Esquemático -->
              <div class="relative bg-[#0E1012] rounded-2xl p-4 border border-[#272B31] overflow-hidden">
                <svg viewBox="0 0 760 340" class="w-full h-auto">
                  <g stroke="#F8F9FA" stroke-opacity="0.06" stroke-width="1">
                    <line x1="0" y1="85" x2="760" y2="85"/>
                    <line x1="0" y1="170" x2="760" y2="170"/>
                    <line x1="0" y1="255" x2="760" y2="255"/>
                    <line x1="190" y1="0" x2="190" y2="340"/>
                    <line x1="380" y1="0" x2="380" y2="340"/>
                    <line x1="570" y1="0" x2="570" y2="340"/>
                  </g>

                  <!-- Polígono Predio Caramávida (5.739 ha) -->
                  <path d="M45,195 L95,140 L170,155 L260,120 L345,95 L445,105 L535,145 L620,185 L715,175 L690,235 L590,260 L500,210 L405,175 L310,190 L215,185 L120,215 Z"
                        fill="#1E2B24" stroke="#E08244" stroke-width="2.5"/>

                  <!-- Mancha Núcleo Melífero Tineo-Ulmo (929,88 ha) -->
                  <path d="M350,98 L442,107 L515,142 L485,192 L410,172 L365,155 Z"
                        fill="#E08244" fill-opacity="0.85" stroke="#FCE8C3" stroke-width="1"/>

                  <!-- Bosque Nativo Mixto -->
                  <path d="M170,155 L260,120 L345,95 L365,155 L310,190 L215,185 Z"
                        fill="#2E4A3E" fill-opacity="0.8"/>
                  <path d="M535,145 L620,185 L715,175 L690,235 L590,260 L525,205 Z"
                        fill="#8C6D46" fill-opacity="0.55"/>

                  <!-- Radio 1,5 km Vuelo Económico -->
                  <circle cx="422" cy="145" r="52" fill="#FCE8C3" fill-opacity="0.12" stroke="#FCE8C3" stroke-width="2" stroke-dasharray="5 4"/>

                  <!-- Punto Referencial Generalizado -->
                  <circle cx="422" cy="145" r="6" fill="#FCE8C3" stroke="#0E1012" stroke-width="2"/>
                  <text x="434" y="138" fill="#F8F9FA" font-size="11" font-weight="bold">Núcleo Apícola Ragko</text>
                  <text x="434" y="152" fill="#FCE8C3" font-size="9.5">Radio pecoreo: 1,5 km</text>

                  <circle cx="115" cy="275" r="4" fill="#E08244"/>
                  <text x="125" y="279" fill="#A3A8B0" font-size="10">Sector Antihuala / Curanilahue</text>

                  <g transform="translate(705, 45)">
                    <polygon points="0,-18 6,6 0,0 -6,6" fill="#E08244"/>
                    <text x="-4" y="-22" fill="#F8F9FA" font-size="10" font-weight="bold">N</text>
                  </g>

                  <g transform="translate(275, 305)">
                    <rect x="0" y="0" width="75" height="5" fill="#FCE8C3"/>
                    <rect x="75" y="0" width="75" height="5" fill="none" stroke="#FCE8C3"/>
                    <text x="0" y="-5" fill="#A3A8B0" font-size="9">0</text>
                    <text x="68" y="-5" fill="#A3A8B0" font-size="9">2,5</text>
                    <text x="142" y="-5" fill="#A3A8B0" font-size="9">5 km</text>
                  </g>
                </svg>
              </div>

              <!-- Leyenda -->
              <div class="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div class="flex items-center gap-2">
                  <span class="w-3.5 h-3.5 rounded-sm border-2 border-[#E08244] bg-[#1E2B24] inline-block shrink-0"></span>
                  <span class="text-[#A3A8B0]">Predio Caramávida (5.739 ha)</span>
                </div>
                <div class="flex items-center gap-2">
                  <span class="w-3.5 h-3.5 rounded-sm bg-[#E08244] inline-block shrink-0"></span>
                  <span class="text-[#A3A8B0]">Tineo-Ulmo (929,88 ha)</span>
                </div>
                <div class="flex items-center gap-2">
                  <span class="w-3.5 h-3.5 rounded-full border border-dashed border-[#FCE8C3] bg-[#FCE8C3]/20 inline-block shrink-0"></span>
                  <span class="text-[#A3A8B0]">Vuelo abejas (1,5 km)</span>
                </div>
                <div class="flex items-center gap-2">
                  <span class="w-3.5 h-3.5 rounded-sm bg-[#2E4A3E] inline-block shrink-0"></span>
                  <span class="text-[#A3A8B0]">Bosque Nativo AAVC</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>

    <!-- =====================================================================
         SECCIÓN 4: NUESTRAS MIELES MONOFLORALES (BOUTIQUE B2B SIN E-COMMERCE)
    ====================================================================== -->
    <section id="mieles" class="py-24 sm:py-32 bg-[#14171A] border-b border-[#272B31]">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div class="max-w-3xl mx-auto text-center space-y-4 mb-14">
          <span class="text-xs font-bold uppercase tracking-[0.24em] text-[#E08244]">
            {{ t('sec4.kicker') }}
          </span>
          <h2 class="font-serif-editorial text-3xl sm:text-5xl font-semibold text-[#F8F9FA]">
            {{ t('sec4.title') }}
          </h2>
          <p class="text-sm sm:text-base text-[#A3A8B0]">
            {{ t('sec4.subtitle') }}
          </p>
        </div>

        <!-- Tabs Móvil -->
        <div class="flex justify-center mb-10 md:hidden">
          <div class="inline-flex rounded-full bg-[#1A1D21] p-1 border border-[#272B31]">
            <button
              (click)="activeHoney.set('tineo')"
              [class]="activeHoney() === 'tineo' ? 'bg-[#E08244] text-[#0E1012]' : 'text-[#A3A8B0]'"
              class="px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition">
              Miel de Tineo
            </button>
            <button
              (click)="activeHoney.set('ulmo')"
              [class]="activeHoney() === 'ulmo' ? 'bg-[#E08244] text-[#0E1012]' : 'text-[#A3A8B0]'"
              class="px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition">
              Miel de Ulmo
            </button>
          </div>
        </div>

        <div class="grid md:grid-cols-2 gap-8 lg:gap-12">
          
          <!-- FICHA 1: MIEL DE TINEO -->
          <div [class.hidden]="activeHoney() !== 'tineo'" class="md:block bg-[#1A1D21] rounded-3xl border border-[#272B31] hover:border-[#E08244]/60 shadow-2xl overflow-hidden flex flex-col justify-between group transition duration-300">
            <div>
              <!-- Fotografía Superior de Producto / Textura Ámbar Oscuro -->
              <div class="relative h-60 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1471943311424-646960669fbc?auto=format&fit=crop&w=1000&q=85"
                  alt="Miel de Tineo Caramávida"
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"/>
                <div class="absolute inset-0 bg-gradient-to-t from-[#1A1D21] via-[#0E1012]/45 to-transparent"></div>

                <div class="absolute top-5 left-5">
                  <span class="px-3.5 py-1 rounded-full bg-[#0E1012]/90 border border-[#E08244] text-[#FCE8C3] text-[11px] font-bold uppercase tracking-wider">
                    {{ t('sec4.tineo.badge') }}
                  </span>
                </div>

                <div class="absolute bottom-4 left-6 right-6 flex items-end justify-between">
                  <div>
                    <h3 class="font-serif-editorial text-3xl sm:text-4xl font-semibold text-[#F8F9FA]">
                      Miel de Tineo
                    </h3>
                    <p class="font-serif-editorial italic text-lg text-[#E08244]">
                      Weinmannia trichosperma
                    </p>
                  </div>
                  <div class="text-right bg-[#0E1012]/90 px-3.5 py-2 rounded-2xl border border-[#272B31]">
                    <div class="text-2xl font-bold text-[#FCE8C3]">69,6%</div>
                    <div class="text-[9px] uppercase tracking-wider text-[#E08244] font-bold">Pureza · Inf. 411</div>
                  </div>
                </div>
              </div>

              <!-- Especificaciones -->
              <div class="p-7 space-y-6">
                <p class="text-sm text-[#A3A8B0] leading-relaxed">
                  {{ t('sec4.tineo.desc') }}
                </p>

                <div class="grid grid-cols-2 gap-3.5 text-xs">
                  <div class="p-3.5 rounded-2xl bg-[#14171A] border border-[#272B31]">
                    <span class="text-[#E08244] font-bold uppercase tracking-wider block text-[10px]">{{ t('sec4.bloomLabel') }}</span>
                    <span class="font-semibold text-[#F8F9FA] text-sm mt-0.5 block">Noviembre – Diciembre</span>
                  </div>
                  <div class="p-3.5 rounded-2xl bg-[#14171A] border border-[#272B31]">
                    <span class="text-[#E08244] font-bold uppercase tracking-wider block text-[10px]">{{ t('sec4.colorLabel') }}</span>
                    <span class="font-semibold text-[#F8F9FA] text-sm mt-0.5 block">{{ t('sec4.tineo.color') }}</span>
                  </div>
                  <div class="p-3.5 rounded-2xl bg-[#14171A] border border-[#272B31]">
                    <span class="text-[#E08244] font-bold uppercase tracking-wider block text-[10px]">{{ t('sec4.sensoryLabel') }}</span>
                    <span class="font-semibold text-[#F8F9FA] text-sm mt-0.5 block">{{ t('sec4.tineo.sensory') }}</span>
                  </div>
                  <div class="p-3.5 rounded-2xl bg-[#14171A] border border-[#272B31]">
                    <span class="text-[#E08244] font-bold uppercase tracking-wider block text-[10px]">{{ t('sec4.attributeLabel') }}</span>
                    <span class="font-semibold text-[#FCE8C3] text-sm mt-0.5 block">Antiox+ 10+ (En ensayo)</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="px-7 py-4 bg-[#14171A] border-t border-[#272B31] flex items-center justify-between text-xs">
              <span class="text-[#A3A8B0]">{{ t('sec4.b2bNote') }}</span>
              <a [href]="whatsappUrlForHoney('Tineo')" target="_blank" rel="noopener noreferrer" class="font-bold text-[#FCE8C3] hover:text-[#E08244] uppercase tracking-wider transition">
                {{ t('sec4.inquireBtn') }} →
              </a>
            </div>
          </div>

          <!-- FICHA 2: MIEL DE ULMO -->
          <div [class.hidden]="activeHoney() !== 'ulmo'" class="md:block bg-[#1A1D21] rounded-3xl border border-[#272B31] hover:border-[#E08244]/60 shadow-2xl overflow-hidden flex flex-col justify-between group transition duration-300">
            <div>
              <!-- Fotografía Superior Flor Blanca / Miel Dorada -->
              <div class="relative h-60 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1587049352851-8d4e89133924?auto=format&fit=crop&w=1000&q=85"
                  alt="Miel de Ulmo Caramávida"
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"/>
                <div class="absolute inset-0 bg-gradient-to-t from-[#1A1D21] via-[#0E1012]/45 to-transparent"></div>

                <div class="absolute top-5 left-5">
                  <span class="px-3.5 py-1 rounded-full bg-[#0E1012]/90 border border-[#FCE8C3] text-[#FCE8C3] text-[11px] font-bold uppercase tracking-wider">
                    {{ t('sec4.ulmo.badge') }}
                  </span>
                </div>

                <div class="absolute bottom-4 left-6 right-6 flex items-end justify-between">
                  <div>
                    <h3 class="font-serif-editorial text-3xl sm:text-4xl font-semibold text-[#F8F9FA]">
                      Miel de Ulmo
                    </h3>
                    <p class="font-serif-editorial italic text-lg text-[#FCE8C3]">
                      Eucryphia cordifolia
                    </p>
                  </div>
                  <div class="text-right bg-[#0E1012]/90 px-3.5 py-2 rounded-2xl border border-[#272B31]">
                    <div class="text-2xl font-bold text-[#FCE8C3]">81,0%</div>
                    <div class="text-[9px] uppercase tracking-wider text-[#E08244] font-bold">Pureza · Inf. 416</div>
                  </div>
                </div>
              </div>

              <!-- Especificaciones -->
              <div class="p-7 space-y-6">
                <p class="text-sm text-[#A3A8B0] leading-relaxed">
                  {{ t('sec4.ulmo.desc') }}
                </p>

                <div class="grid grid-cols-2 gap-3.5 text-xs">
                  <div class="p-3.5 rounded-2xl bg-[#14171A] border border-[#272B31]">
                    <span class="text-[#E08244] font-bold uppercase tracking-wider block text-[10px]">{{ t('sec4.bloomLabel') }}</span>
                    <span class="font-semibold text-[#F8F9FA] text-sm mt-0.5 block">Enero – Marzo</span>
                  </div>
                  <div class="p-3.5 rounded-2xl bg-[#14171A] border border-[#272B31]">
                    <span class="text-[#E08244] font-bold uppercase tracking-wider block text-[10px]">{{ t('sec4.colorLabel') }}</span>
                    <span class="font-semibold text-[#F8F9FA] text-sm mt-0.5 block">{{ t('sec4.ulmo.color') }}</span>
                  </div>
                  <div class="p-3.5 rounded-2xl bg-[#14171A] border border-[#272B31]">
                    <span class="text-[#E08244] font-bold uppercase tracking-wider block text-[10px]">{{ t('sec4.sensoryLabel') }}</span>
                    <span class="font-semibold text-[#F8F9FA] text-sm mt-0.5 block">{{ t('sec4.ulmo.sensory') }}</span>
                  </div>
                  <div class="p-3.5 rounded-2xl bg-[#14171A] border border-[#272B31]">
                    <span class="text-[#E08244] font-bold uppercase tracking-wider block text-[10px]">{{ t('sec4.attributeLabel') }}</span>
                    <span class="font-semibold text-[#FCE8C3] text-sm mt-0.5 block">{{ t('sec4.ulmo.attribute') }}</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="px-7 py-4 bg-[#14171A] border-t border-[#272B31] flex items-center justify-between text-xs">
              <span class="text-[#A3A8B0]">{{ t('sec4.b2bNote') }}</span>
              <a [href]="whatsappUrlForHoney('Ulmo')" target="_blank" rel="noopener noreferrer" class="font-bold text-[#FCE8C3] hover:text-[#E08244] uppercase tracking-wider transition">
                {{ t('sec4.inquireBtn') }} →
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>

    <!-- =====================================================================
         SECCIÓN 5: GALERÍA EDITORIAL BENTO GRID (ORIGEN, PROCESO Y PRODUCTO)
    ====================================================================== -->
    <section id="galeria" class="py-24 sm:py-32 bg-[#0E1012] border-b border-[#272B31]">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div class="max-w-2xl space-y-3">
            <span class="text-xs font-bold uppercase tracking-[0.24em] text-[#E08244]">
              {{ t('sec5gal.kicker') }}
            </span>
            <h2 class="font-serif-editorial text-3xl sm:text-5xl font-semibold text-[#F8F9FA]">
              {{ t('sec5gal.title') }}
            </h2>
          </div>
          <p class="text-sm text-[#A3A8B0] max-w-md">
            {{ t('sec5gal.subtitle') }}
          </p>
        </div>

        <!-- Bento Grid Asimétrico de Alta Fotografía con Micro-Interacciones -->
        <div class="grid grid-cols-1 md:grid-cols-12 gap-5 auto-rows-[260px]">
          @for (photo of galleryItems; track photo.id) {
            <div
              (click)="selectedPhoto.set(photo)"
              [class]="photo.spanClass"
              class="relative rounded-3xl overflow-hidden border border-[#272B31] hover:border-[#E08244] bg-[#1A1D21] group cursor-pointer shadow-xl transition-all duration-500">
              <img
                [src]="photo.imageUrl"
                [alt]="lang() === 'es' ? photo.titleEs : photo.titleEn"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"/>
              
              <!-- Overlay Gradiente -->
              <div class="absolute inset-0 bg-gradient-to-t from-[#0E1012]/95 via-[#0E1012]/30 to-transparent opacity-85 group-hover:opacity-95 transition-opacity"></div>

              <!-- Etiqueta Superior -->
              <div class="absolute top-4 left-4">
                <span class="px-3 py-1 rounded-full bg-[#0E1012]/80 backdrop-blur-md border border-[#E08244]/50 text-[10px] font-bold uppercase tracking-widest text-[#FCE8C3]">
                  {{ lang() === 'es' ? photo.tagEs : photo.tagEn }}
                </span>
              </div>

              <!-- Icono Ampliar en Hover -->
              <div class="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#FCE8C3] text-[#0E1012] flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300 shadow-lg">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7"/>
                </svg>
              </div>

              <!-- Textos Inferiores con Desplazamiento Suave -->
              <div class="absolute bottom-5 left-6 right-6 transform translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
                <h3 class="font-serif-editorial text-2xl font-semibold text-[#F8F9FA]">
                  {{ lang() === 'es' ? photo.titleEs : photo.titleEn }}
                </h3>
                <p class="text-xs text-[#A3A8B0] mt-1 line-clamp-2">
                  {{ lang() === 'es' ? photo.descEs : photo.descEn }}
                </p>
              </div>
            </div>
          }
        </div>
      </div>
    </section>

    <!-- =====================================================================
         SECCIÓN 6: CIENCIA, TRAZABILIDAD Y EVIDENCIA PALINOLÓGICA
    ====================================================================== -->
    <section id="ciencia" class="relative py-24 sm:py-32 bg-[#14171A] border-b border-[#272B31] overflow-hidden">
      <div class="absolute inset-0 honeycomb-bg opacity-35 pointer-events-none"></div>

      <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div class="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
          <div class="max-w-2xl space-y-3">
            <span class="text-xs font-bold uppercase tracking-[0.24em] text-[#E08244]">
              {{ t('sec5.kicker') }}
            </span>
            <h2 class="font-serif-editorial text-3xl sm:text-5xl font-semibold text-[#F8F9FA] leading-tight">
              {{ t('sec5.title') }}
            </h2>
            <p class="text-sm sm:text-base text-[#A3A8B0]">
              {{ t('sec5.subtitle') }}
            </p>
          </div>

          <button
            (click)="showLabModal.set(true)"
            class="self-start lg:self-end inline-flex items-center gap-2.5 bg-[#1A1D21] hover:bg-[#FCE8C3] text-[#FCE8C3] hover:text-[#0E1012] border border-[#E08244] font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-full transition cursor-pointer shadow-lg">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
            </svg>
            <span>{{ t('sec5.previewReportBtn') }}</span>
          </button>
        </div>

        <!-- Gráficos Comparativos Meliflora SpA -->
        <div class="grid lg:grid-cols-2 gap-8">
          
          <!-- Informe N° 416: Ulmo -->
          <div class="bg-[#1A1D21] rounded-3xl p-7 sm:p-8 border border-[#272B31]">
            <div class="flex items-center justify-between border-b border-[#272B31] pb-4 mb-6">
              <div>
                <span class="text-[11px] font-mono uppercase text-[#E08244] font-bold">Meliflora SpA · Inf. N° 416</span>
                <h3 class="font-serif-editorial text-2xl font-semibold text-[#F8F9FA]">Miel Monofloral de Ulmo</h3>
              </div>
              <div class="text-right text-xs text-[#A3A8B0]">
                <div>Total: <strong class="text-[#FCE8C3]">652 granos</strong></div>
                <div>Muestra RP004 · Curanilahue</div>
              </div>
            </div>

            <div class="space-y-4">
              @for (item of ulmoPollenData; track item.species) {
                <div>
                  <div class="flex justify-between text-xs mb-1.5">
                    <div>
                      <span class="font-semibold text-[#F8F9FA]">{{ lang() === 'es' ? item.commonEs : item.commonEn }}</span>
                      <span class="italic text-[#A3A8B0] ml-1.5">({{ item.species }})</span>
                    </div>
                    <div class="font-mono">
                      <span class="text-[#A3A8B0] mr-2">{{ item.grains }} gr.</span>
                      <span [class]="item.isPrimary ? 'text-[#FCE8C3] font-bold' : 'text-[#F8F9FA]'">{{ item.percentage }}%</span>
                    </div>
                  </div>
                  <div class="w-full h-2.5 bg-[#0E1012] rounded-full overflow-hidden">
                    <div
                      [style.width.%]="item.percentage"
                      [class]="item.isPrimary ? 'bg-[#FCE8C3]' : 'bg-[#E08244]'"
                      class="h-full rounded-full transition-all duration-700">
                    </div>
                  </div>
                </div>
              }
            </div>
          </div>

          <!-- Informe N° 411: Tineo -->
          <div class="bg-[#1A1D21] rounded-3xl p-7 sm:p-8 border border-[#272B31]">
            <div class="flex items-center justify-between border-b border-[#272B31] pb-4 mb-6">
              <div>
                <span class="text-[11px] font-mono uppercase text-[#E08244] font-bold">Meliflora SpA · Inf. N° 411</span>
                <h3 class="font-serif-editorial text-2xl font-semibold text-[#F8F9FA]">Miel Monofloral de Tineo</h3>
              </div>
              <div class="text-right text-xs text-[#A3A8B0]">
                <div>Total: <strong class="text-[#FCE8C3]">667 granos</strong></div>
                <div>Muestra RP003 · Curanilahue</div>
              </div>
            </div>

            <div class="space-y-4">
              @for (item of tineoPollenData; track item.species) {
                <div>
                  <div class="flex justify-between text-xs mb-1.5">
                    <div>
                      <span class="font-semibold text-[#F8F9FA]">{{ lang() === 'es' ? item.commonEs : item.commonEn }}</span>
                      <span class="italic text-[#A3A8B0] ml-1.5">({{ item.species }})</span>
                    </div>
                    <div class="font-mono">
                      <span class="text-[#A3A8B0] mr-2">{{ item.grains }} gr.</span>
                      <span [class]="item.isPrimary ? 'text-[#FCE8C3] font-bold' : 'text-[#F8F9FA]'">{{ item.percentage }}%</span>
                    </div>
                  </div>
                  <div class="w-full h-2.5 bg-[#0E1012] rounded-full overflow-hidden">
                    <div
                      [style.width.%]="item.percentage"
                      [class]="item.isPrimary ? 'bg-[#FCE8C3]' : 'bg-[#E08244]'"
                      class="h-full rounded-full transition-all duration-700">
                    </div>
                  </div>
                </div>
              }
            </div>
          </div>

        </div>
      </div>
    </section>

    <!-- =====================================================================
         SECCIÓN 7: RUTA ESTRATÉGICA DENOMINACIÓN DE ORIGEN & GOBERNANZA
    ====================================================================== -->
    <section id="ruta-do" class="py-24 sm:py-32 bg-[#0E1012] border-b border-[#272B31]">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div class="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <span class="text-xs font-bold uppercase tracking-[0.24em] text-[#E08244]">
            {{ t('sec6.kicker') }}
          </span>
          <h2 class="font-serif-editorial text-3xl sm:text-5xl font-semibold text-[#F8F9FA]">
            {{ t('sec6.title') }}
          </h2>
          <p class="text-sm sm:text-base text-[#A3A8B0]">
            {{ t('sec6.subtitle') }}
          </p>
        </div>

        <!-- 4 Fases INAPI -->
        <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
          <div class="bg-[#1A1D21] p-6 rounded-3xl border border-[#272B31] border-t-4 border-t-[#E08244]">
            <div class="flex items-center justify-between text-xs font-bold text-[#E08244] mb-3">
              <span>FASE 01</span>
              <span class="px-2.5 py-0.5 rounded-full bg-[#0E1012] text-[#FCE8C3]">Meses 0–4</span>
            </div>
            <h3 class="font-serif-editorial text-xl font-bold text-[#F8F9FA] mb-2">
              {{ t('sec6.step1.title') }}
            </h3>
            <p class="text-xs text-[#A3A8B0] leading-relaxed">
              {{ t('sec6.step1.desc') }}
            </p>
          </div>

          <div class="bg-[#1A1D21] p-6 rounded-3xl border border-[#272B31] border-t-4 border-t-[#FCE8C3]">
            <div class="flex items-center justify-between text-xs font-bold text-[#FCE8C3] mb-3">
              <span>FASE 02</span>
              <span class="px-2.5 py-0.5 rounded-full bg-[#0E1012] text-[#E08244]">Meses 3–12</span>
            </div>
            <h3 class="font-serif-editorial text-xl font-bold text-[#F8F9FA] mb-2">
              {{ t('sec6.step2.title') }}
            </h3>
            <p class="text-xs text-[#A3A8B0] leading-relaxed">
              {{ t('sec6.step2.desc') }}
            </p>
          </div>

          <div class="bg-[#1A1D21] p-6 rounded-3xl border border-[#272B31] border-t-4 border-t-[#E08244]">
            <div class="flex items-center justify-between text-xs font-bold text-[#E08244] mb-3">
              <span>FASE 03</span>
              <span class="px-2.5 py-0.5 rounded-full bg-[#0E1012] text-[#FCE8C3]">Meses 9–14</span>
            </div>
            <h3 class="font-serif-editorial text-xl font-bold text-[#F8F9FA] mb-2">
              {{ t('sec6.step3.title') }}
            </h3>
            <p class="text-xs text-[#A3A8B0] leading-relaxed">
              {{ t('sec6.step3.desc') }}
            </p>
          </div>

          <div class="bg-[#1A1D21] p-6 rounded-3xl border border-[#272B31] border-t-4 border-t-[#FCE8C3]">
            <div class="flex items-center justify-between text-xs font-bold text-[#FCE8C3] mb-3">
              <span>FASE 04</span>
              <span class="px-2.5 py-0.5 rounded-full bg-[#0E1012] text-[#E08244]">Meses 14–30+</span>
            </div>
            <h3 class="font-serif-editorial text-xl font-bold text-[#F8F9FA] mb-2">
              {{ t('sec6.step4.title') }}
            </h3>
            <p class="text-xs text-[#A3A8B0] leading-relaxed">
              {{ t('sec6.step4.desc') }}
            </p>
          </div>
        </div>

        <!-- Referentes Mundiales D.O.P. -->
        <div class="bg-[#14171A] rounded-3xl p-7 sm:p-8 border border-[#272B31]">
          <div class="text-xs font-bold uppercase tracking-[0.2em] text-[#E08244] mb-5">
            {{ t('sec6.benchKicker') }}
          </div>
          <div class="grid md:grid-cols-2 gap-6">
            <div class="bg-[#1A1D21] p-5 rounded-2xl border border-[#272B31] flex items-start gap-4">
              <div class="w-11 h-11 rounded-full bg-[#FCE8C3] border-2 border-[#E08244] text-[#0E1012] flex items-center justify-center font-bold text-xs shrink-0">ES</div>
              <div>
                <h4 class="font-bold text-sm text-[#F8F9FA]">D.O.P. Miel de La Alcarria (España)</h4>
                <p class="text-xs text-[#A3A8B0] mt-1 leading-relaxed">
                  {{ t('sec6.bench1') }}
                </p>
              </div>
            </div>
            <div class="bg-[#1A1D21] p-5 rounded-2xl border border-[#272B31] flex items-start gap-4">
              <div class="w-11 h-11 rounded-full bg-[#FCE8C3] border-2 border-[#E08244] text-[#0E1012] flex items-center justify-center font-bold text-xs shrink-0">FR</div>
              <div>
                <h4 class="font-bold text-sm text-[#F8F9FA]">D.O.P. Miel de Córcega / Mele di Corsica (Francia)</h4>
                <p class="text-xs text-[#A3A8B0] mt-1 leading-relaxed">
                  {{ t('sec6.bench2') }}
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>

    <!-- =====================================================================
         SECCIÓN 8: CONVERSIÓN DIRECTA & REDES SOCIALES (SIN FORMULARIOS)
    ====================================================================== -->
    <section id="contacto" class="relative py-24 sm:py-32 bg-[#14171A] overflow-hidden">
      <!-- Patrón Panal Sutil con Máscara Radial -->
      <div class="absolute inset-0 honeycomb-bg honeycomb-mask opacity-75 pointer-events-none"></div>

      <div class="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="rounded-[2.2rem] bg-gradient-to-b from-[#1A1D21] to-[#111316] border border-[#E08244]/40 p-8 sm:p-14 text-center shadow-2xl space-y-8">
          
          <!-- Emblema Central Ragko -->
          <div class="inline-flex items-center justify-center w-20 h-20 rounded-full ragko-medallion mx-auto">
            <svg class="w-11 h-11 text-[#E08244]" viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="7.5" stroke-linejoin="round">
              <polygon points="50,35 63,42.5 63,57.5 50,65 37,57.5 37,42.5"/>
              <polygon points="50,12 63,19.5 63,34.5 50,42 37,34.5 37,19.5"/>
              <polygon points="70,23.5 83,31 83,46 70,53.5 57,46 57,31"/>
              <polygon points="70,46.5 83,54 83,69 70,76.5 57,69 57,54"/>
              <polygon points="50,58 63,65.5 63,80.5 50,88 37,80.5 37,65.5"/>
              <polygon points="30,46.5 43,54 43,69 30,76.5 17,69 17,54"/>
              <polygon points="30,23.5 43,31 43,46 30,53.5 17,46 17,31"/>
            </svg>
          </div>

          <div class="space-y-4 max-w-2xl mx-auto">
            <span class="text-xs font-bold uppercase tracking-[0.25em] text-[#E08244]">
              {{ t('sec8.kicker') }}
            </span>
            <h2 class="font-serif-editorial text-3xl sm:text-5xl font-semibold text-[#F8F9FA] leading-tight">
              {{ t('sec8.title') }}
            </h2>
            <p class="text-sm sm:text-base text-[#A3A8B0] leading-relaxed">
              {{ t('sec8.subtitle') }}
            </p>
          </div>

          <!-- CTA PRINCIPAL DE CONVERSIÓN DIRECTA: WHATSAPP -->
          <div class="pt-2 flex flex-col items-center gap-4">
            <a [href]="whatsappUrl()"
               target="_blank"
               rel="noopener noreferrer"
               class="inline-flex items-center justify-center gap-3.5 bg-[#E08244] hover:bg-[#FCE8C3] text-[#0E1012] font-bold text-base sm:text-lg px-9 py-5 rounded-full transition-all duration-300 whatsapp-glow hover:-translate-y-0.5 w-full sm:w-auto">
              <svg class="w-6 h-6 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.1.824z"/>
              </svg>
              <span>{{ t('sec8.whatsappBtn') }}</span>
            </a>

            <!-- Acciones Secundarias Minimalistas -->
            <div class="flex flex-wrap items-center justify-center gap-3 pt-1">
              <button
                (click)="showLabModal.set(true)"
                class="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#0E1012] border border-[#272B31] hover:border-[#E08244] text-xs font-semibold text-[#FCE8C3] transition cursor-pointer">
                <svg class="w-4 h-4 text-[#E08244]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                </svg>
                <span>{{ t('sec8.dossierBtn') }}</span>
              </button>

              <a href="mailto:contacto@cooperativaragko.cl?subject=Alianza%20Comercial%20Mieles%20Caram%C3%A1vida"
                 class="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#0E1012] border border-[#272B31] hover:border-[#E08244] text-xs font-semibold text-[#A3A8B0] hover:text-[#F8F9FA] transition">
                <svg class="w-4 h-4 text-[#E08244]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
                <span>contacto&#64;cooperativaragko.cl</span>
              </a>
            </div>
          </div>

          <!-- Separador Elegante y Redes Sociales (Instagram & Facebook con Estilo Medallón) -->
          <div class="pt-6 border-t border-[#272B31] flex flex-col items-center gap-4">
            <span class="text-[11px] uppercase tracking-[0.22em] text-[#A3A8B0]">
              {{ t('sec8.socialLabel') }}
            </span>

            <div class="flex items-center gap-5">
              <!-- Instagram -->
              <a href="https://instagram.com"
                 target="_blank"
                 rel="noopener noreferrer"
                 aria-label="Instagram Cooperativa Ragko"
                 class="group flex items-center gap-3 px-5 py-2.5 rounded-full bg-[#0E1012] border border-[#272B31] hover:border-[#E08244] transition">
                <div class="w-9 h-9 rounded-full bg-[#FCE8C3] border border-[#E08244] text-[#E08244] flex items-center justify-center group-hover:scale-105 transition-transform">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                    <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                  </svg>
                </div>
                <span class="text-xs font-semibold text-[#F8F9FA] group-hover:text-[#FCE8C3]">Instagram</span>
              </a>

              <!-- Facebook -->
              <a href="https://facebook.com"
                 target="_blank"
                 rel="noopener noreferrer"
                 aria-label="Facebook Cooperativa Ragko"
                 class="group flex items-center gap-3 px-5 py-2.5 rounded-full bg-[#0E1012] border border-[#272B31] hover:border-[#E08244] transition">
                <div class="w-9 h-9 rounded-full bg-[#FCE8C3] border border-[#E08244] text-[#E08244] flex items-center justify-center group-hover:scale-105 transition-transform">
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.557-.14-2.857-.14C11.928 2 10 3.657 10 6.7v2.8H7v4h3V22h4v-8.5z"/>
                  </svg>
                </div>
                <span class="text-xs font-semibold text-[#F8F9FA] group-hover:text-[#FCE8C3]">Facebook</span>
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>

    <!-- =====================================================================
         FOOTER INSTITUCIONAL CON LOGOTIPO OFICIAL DE COOPERATIVA RAGKO
    ====================================================================== -->
    <footer class="bg-[#0E1012] text-[#F8F9FA] pt-16 pb-12 border-t border-[#272B31]">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid md:grid-cols-12 gap-10 pb-12 border-b border-[#272B31]">
          
          <!-- Identidad y Logo Oficial Ragko -->
          <div class="md:col-span-5 space-y-5">
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 rounded-full bg-[#FCE8C3] border-2 border-[#E08244] flex items-center justify-center shadow-md">
                <svg class="w-7 h-7 text-[#E08244]" viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="7.5" stroke-linejoin="round">
                  <polygon points="50,35 63,42.5 63,57.5 50,65 37,57.5 37,42.5"/>
                  <polygon points="50,12 63,19.5 63,34.5 50,42 37,34.5 37,19.5"/>
                  <polygon points="70,23.5 83,31 83,46 70,53.5 57,46 57,31"/>
                  <polygon points="70,46.5 83,54 83,69 70,76.5 57,69 57,54"/>
                  <polygon points="50,58 63,65.5 63,80.5 50,88 37,80.5 37,65.5"/>
                  <polygon points="30,46.5 43,54 43,69 30,76.5 17,69 17,54"/>
                  <polygon points="30,23.5 43,31 43,46 30,53.5 17,46 17,31"/>
                </svg>
              </div>
              <div>
                <div class="flex items-center">
                  <span class="text-2xl font-bold text-[#E08244] tracking-tight leading-none">Ragk</span>
                  <svg class="w-5 h-5 text-[#E08244] ml-0.5 mt-1" viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="8.5" stroke-linejoin="round">
                    <polygon points="50,35 63,42.5 63,57.5 50,65 37,57.5 37,42.5"/>
                    <polygon points="50,12 63,19.5 63,34.5 50,42 37,34.5 37,19.5"/>
                    <polygon points="70,23.5 83,31 83,46 70,53.5 57,46 57,31"/>
                    <polygon points="70,46.5 83,54 83,69 70,76.5 57,69 57,54"/>
                    <polygon points="50,58 63,65.5 63,80.5 50,88 37,80.5 37,65.5"/>
                    <polygon points="30,46.5 43,54 43,69 30,76.5 17,69 17,54"/>
                    <polygon points="30,23.5 43,31 43,46 30,53.5 17,46 17,31"/>
                  </svg>
                </div>
                <span class="text-[11px] uppercase tracking-[0.2em] text-[#FCE8C3] block mt-0.5">
                  Cooperativa Apícola · Caramávida
                </span>
              </div>
            </div>

            <p class="text-xs text-[#A3A8B0] leading-relaxed max-w-sm">
              {{ t('footer.desc') }}
            </p>
            <div class="text-xs text-[#E08244] font-semibold">
              Curanilahue · Cordillera de Nahuelbuta · Provincia de Arauco, Chile.
            </div>
          </div>

          <!-- Navegación de las 8 Secciones -->
          <div class="md:col-span-4 space-y-3">
            <div class="text-xs font-bold uppercase tracking-widest text-[#FCE8C3]">
              {{ t('footer.navTitle') }}
            </div>
            <div class="grid grid-cols-2 gap-2.5 text-xs text-[#A3A8B0]">
              <a href="#hero" class="hover:text-[#E08244] transition">1. Portada Boutique</a>
              <a href="#valor" class="hover:text-[#E08244] transition">2. Triple Impacto</a>
              <a href="#territorio" class="hover:text-[#E08244] transition">3. Territorio AAVC</a>
              <a href="#mieles" class="hover:text-[#E08244] transition">4. Ulmo & Tineo</a>
              <a href="#galeria" class="hover:text-[#E08244] transition">5. Galería Bento</a>
              <a href="#ciencia" class="hover:text-[#E08244] transition">6. Ciencia & Polen</a>
              <a href="#ruta-do" class="hover:text-[#E08244] transition">7. Ruta D.O. INAPI</a>
              <a href="#contacto" class="hover:text-[#E08244] transition">8. Contacto Directo</a>
            </div>
          </div>

          <!-- Marco Normativo y Alianzas -->
          <div class="md:col-span-3 space-y-3 text-xs text-[#A3A8B0]">
            <div class="text-xs font-bold uppercase tracking-widest text-[#FCE8C3]">
              {{ t('footer.legalTitle') }}
            </div>
            <p>• Ley N° 19.039 (Sello de Origen / Denominación de Origen INAPI).</p>
            <p>• Ley N° 21.489 (Protección y Fomento Apícola · Registro SAG).</p>
            <p>• Articulación territorial junto a Comité Apícola Nahuelbuta, Bosques y Praderas y Bosque Arauco.</p>
          </div>

        </div>

        <div class="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#A3A8B0]">
          <div>© 2026 Cooperativa Apícola Ragko · Caramávida, Chile.</div>
          <div class="text-[#E08244] font-medium">Boutique B2B & Origin Presentation · Angular</div>
        </div>
      </div>
    </footer>

    <!-- =====================================================================
         MODAL 1: VISOR LIGHTBOX PARA FOTOGRAFÍA DE LA GALERÍA BENTO
    ====================================================================== -->
    @if (selectedPhoto(); as photo) {
      <div (click)="selectedPhoto.set(null)" class="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
        <div (click)="$event.stopPropagation()" class="bg-[#1A1D21] border border-[#E08244]/50 rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl animate-fade-up">
          <div class="relative h-80 sm:h-96">
            <img [src]="photo.imageUrl" [alt]="photo.titleEs" class="w-full h-full object-cover"/>
            <button
              (click)="selectedPhoto.set(null)"
              class="absolute top-4 right-4 w-10 h-10 rounded-full bg-[#0E1012]/85 text-[#FCE8C3] hover:bg-[#E08244] hover:text-[#0E1012] flex items-center justify-center font-bold transition cursor-pointer">
              ✕
            </button>
          </div>
          <div class="p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span class="text-[11px] font-bold uppercase tracking-widest text-[#E08244]">
                {{ lang() === 'es' ? photo.tagEs : photo.tagEn }}
              </span>
              <h3 class="font-serif-editorial text-2xl sm:text-3xl font-semibold text-[#F8F9FA] mt-1">
                {{ lang() === 'es' ? photo.titleEs : photo.titleEn }}
              </h3>
              <p class="text-sm text-[#A3A8B0] mt-1">
                {{ lang() === 'es' ? photo.descEs : photo.descEn }}
              </p>
            </div>
            <a [href]="whatsappUrl()" target="_blank" rel="noopener noreferrer"
               class="shrink-0 px-5 py-3 rounded-full bg-[#E08244] text-[#0E1012] text-xs font-bold uppercase tracking-wider hover:bg-[#FCE8C3] transition">
              Consultar Lote →
            </a>
          </div>
        </div>
      </div>
    }

    <!-- =====================================================================
         MODAL 2: FICHA TÉCNICA PALINOLÓGICA (MELIFLORA SPA)
    ====================================================================== -->
    @if (showLabModal()) {
      <div (click)="showLabModal.set(false)" class="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
        <div (click)="$event.stopPropagation()" class="bg-[#1A1D21] text-[#F8F9FA] rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-[#E08244] animate-fade-up max-h-[90vh] overflow-y-auto">
          <div class="flex items-start justify-between border-b border-[#272B31] pb-4 mb-5">
            <div>
              <span class="text-[10px] font-bold uppercase tracking-widest text-[#E08244]">Evidencia Científica Verificada · Meliflora SpA</span>
              <h3 class="font-serif-editorial text-2xl sm:text-3xl font-bold text-[#FCE8C3]">Ficha Técnica Melisopalinológica</h3>
            </div>
            <button
              (click)="showLabModal.set(false)"
              class="w-9 h-9 rounded-full bg-[#0E1012] text-[#FCE8C3] hover:bg-[#E08244] hover:text-[#0E1012] flex items-center justify-center transition cursor-pointer">
              ✕
            </button>
          </div>

          <div class="space-y-4 text-xs text-[#A3A8B0]">
            <p>
              Análisis certificados por <strong class="text-[#F8F9FA]">Meliflora SpA</strong> (Ing. Agr. Nadia Ríos Miranda, Especialista en Miel) para muestras piloto trazables del sector Curanilahue / Caramávida:
            </p>
            <div class="grid sm:grid-cols-2 gap-4">
              <div class="p-4 rounded-2xl bg-[#14171A] border border-[#272B31]">
                <div class="font-bold text-[#FCE8C3] text-sm">Informe N° 411 · Miel de Tineo</div>
                <div class="text-[11px] text-[#E08244] mb-2">Muestra RP003 · 667 granos contados</div>
                <ul class="space-y-1">
                  <li>• <strong class="text-[#F8F9FA]">Weinmannia trichosperma (Tineo): 69,6%</strong></li>
                  <li>• Myrtaceae spp.: 7,5%</li>
                  <li>• Caldcluvia paniculata (Tiaca): 6,3%</li>
                  <li>• Calceolaria thyrsiflora (Capachito): 5,1%</li>
                </ul>
              </div>
              <div class="p-4 rounded-2xl bg-[#14171A] border border-[#272B31]">
                <div class="font-bold text-[#FCE8C3] text-sm">Informe N° 416 · Miel de Ulmo</div>
                <div class="text-[11px] text-[#E08244] mb-2">Muestra RP004 · 652 granos contados</div>
                <ul class="space-y-1">
                  <li>• <strong class="text-[#F8F9FA]">Eucryphia cordifolia (Ulmo): 81,0%</strong></li>
                  <li>• Tepualia stipularis (Tepú): 4,9%</li>
                  <li>• Aristotelia chilensis (Maqui): 4,0%</li>
                  <li>• Weinmannia trichosperma (Tineo): 2,3%</li>
                </ul>
              </div>
            </div>
          </div>

          <div class="mt-6 flex flex-wrap justify-end gap-3">
            <a [href]="whatsappUrl()" target="_blank" rel="noopener noreferrer"
               class="px-5 py-2.5 rounded-full bg-[#E08244] text-[#0E1012] text-xs font-bold uppercase tracking-wider hover:bg-[#FCE8C3] transition">
              Solicitar Informes Completos por WhatsApp
            </a>
            <button
              (click)="showLabModal.set(false)"
              class="px-5 py-2.5 rounded-full bg-[#0E1012] border border-[#272B31] text-[#F8F9FA] text-xs font-bold uppercase tracking-wider cursor-pointer">
              Cerrar
            </button>
          </div>
        </div>
      </div>
    }
`
})
export class AppComponent implements OnInit {
lang = signal<Language>('es');
isScrolled = signal<boolean>(false);
activeHoney = signal<HoneyTab>('ulmo');
showLabModal = signal<boolean>(false);
selectedPhoto = signal<GalleryItem | null>(null);

// Número WhatsApp institucional configurable de Cooperativa Ragko
private readonly whatsappNumber = '56900000000';

ulmoPollenData: PollenDatum[] = [
{ species: 'Eucryphia cordifolia', commonEs: 'Ulmo', commonEn: 'Ulmo', grains: 528, percentage: 81.0, isPrimary: true },
{ species: 'Tepualia stipularis', commonEs: 'Tepú', commonEn: 'Tepú', grains: 32, percentage: 4.9 },
{ species: 'Aristotelia chilensis', commonEs: 'Maqui', commonEn: 'Maqui Berry', grains: 26, percentage: 4.0 },
{ species: 'Weinmannia trichosperma', commonEs: 'Tineo', commonEn: 'Tineo', grains: 15, percentage: 2.3 },
{ species: 'Myrtaceae spp.', commonEs: 'Mirtáceas nativas', commonEn: 'Native Myrtaceae', grains: 12, percentage: 1.8 }
];

tineoPollenData: PollenDatum[] = [
{ species: 'Weinmannia trichosperma', commonEs: 'Tineo', commonEn: 'Tineo', grains: 464, percentage: 69.6, isPrimary: true },
{ species: 'Myrtaceae spp.', commonEs: 'Mirtáceas nativas', commonEn: 'Native Myrtaceae', grains: 50, percentage: 7.5 },
{ species: 'Caldcluvia paniculata', commonEs: 'Tiaca', commonEn: 'Tiaca', grains: 42, percentage: 6.3 },
{ species: 'Calceolaria thyrsiflora', commonEs: 'Capachito', commonEn: 'Capachito', grains: 34, percentage: 5.1 },
{ species: 'Eucryphia cordifolia', commonEs: 'Ulmo', commonEn: 'Ulmo', grains: 7, percentage: 1.0 }
];

galleryItems: GalleryItem[] = [
{
id: 'origen-bosque',
spanClass: 'md:col-span-7 md:row-span-2',
imageUrl: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1400&q=85',
tagEs: 'Origen · AAVC Caramávida',
tagEn: 'Origin · Caramávida HCVA',
titleEs: 'Santuario Templado Lluvioso en Nahuelbuta',
titleEn: 'Temperate Rainforest Sanctuary in Nahuelbuta',
descEs: '5.739 hectáreas de bosque nativo con aislamiento natural libre de agroquímicos en Curanilahue, Provincia de Arauco.',
descEn: '5,739 hectares of native rainforest with natural agrochemical-free isolation in Curanilahue, Arauco Province.'
},
{
id: 'flor-ulmo',
spanClass: 'md:col-span-5 md:row-span-1',
imageUrl: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=1000&q=85',
tagEs: 'Botánica · Eucryphia cordifolia',
tagEn: 'Botanical · Eucryphia cordifolia',
titleEs: 'Floración Estival de Ulmo',
titleEn: 'Summer Ulmo Blossoming',
descEs: 'Flores blancas aromáticas de enero a marzo que dan origen a nuestra miel más cremosa y bioactiva.',
descEn: 'Aromatic white blossoms from January to March yielding our creamiest, most bioactive honey.'
},
{
id: 'oficio-apicola',
spanClass: 'md:col-span-5 md:row-span-1',
imageUrl: 'https://images.unsplash.com/photo-1568526381923-caf3fd520382?auto=format&fit=crop&w=1000&q=85',
tagEs: 'Oficio · Cooperativa Ragko',
tagEn: 'Craft · Cooperativa Ragko',
titleEs: 'Apicultura Respetuosa del Ciclo Nativo',
titleEn: 'Beekeeping Respecting Native Cycles',
descEs: 'Manejo sanitario trazable bajo Ley N° 21.489, protegiendo las colonias y la biodiversidad local.',
descEn: 'Traceable hive stewardship under Law N° 21.489, safeguarding colonies and local biodiversity.'
},
{
id: 'cosecha-panal',
spanClass: 'md:col-span-6 md:row-span-1',
imageUrl: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=1000&q=85',
tagEs: 'Cosecha · Trazabilidad por Lote',
tagEn: 'Harvest · Batch Traceability',
titleEs: 'Extracción Artesanal en Frío',
titleEn: 'Cold Artisanal Extraction',
descEs: 'Preservamos intactos los compuestos polifenólicos, enzimas naturales y notas aromáticas del bosque.',
descEn: 'Preserving polyphenolic compounds, natural enzymes, and aromatic forest notes intact.'
},
{
id: 'producto-boutique',
spanClass: 'md:col-span-6 md:row-span-1',
imageUrl: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?auto=format&fit=crop&w=1000&q=85',
tagEs: 'Producto Gourmet · Export & B2B',
tagEn: 'Gourmet Product · Export & B2B',
titleEs: 'Envasado de Origen Caramávida',
titleEn: 'Caramávida Origin Bottling',
descEs: 'Formatos boutique de 300g y 500g respaldados por informes melisopalinológicos certificados.',
descEn: 'Boutique 300g and 500g formats backed by certified melissopalynological laboratory reports.'
}
];

private dict: Record<Language, Record<string, string>> = {
es: {
'nav.value': 'Valor D.O.',
'nav.territory': 'Territorio',
'nav.honeys': 'Mieles',
'nav.gallery': 'Galería',
'nav.science': 'Ciencia',
'nav.roadmap': 'Ruta INAPI',
'nav.cta': 'Contacto Directo',

      'hero.kicker': 'Carta de Presentación Boutique · Origen Certificado',
      'hero.title': 'La Esencia de Nahuelbuta: Mieles con Denominación de Origen de Caramávida',
      'hero.subtitle': 'Mieles monoflorales de Ulmo y Tineo cosechadas en el santuario templado lluvioso de Curanilahue, Chile. Excelencia botánica, trazabilidad científica y conservación activa.',
      'hero.medallionsLabel': 'Pilares de Identidad · Cooperativa Apícola Ragko',
      'hero.ctaWhatsapp': 'Conversar por WhatsApp',
      'hero.ctaExplore': 'Explorar Galería y Origen',
      'hero.stat1Label': 'Territorio Protegido',
      'hero.stat2Label': 'Pureza Ulmo / Tineo',

      'medallion.products': 'Mieles',
      'medallion.quality': 'Ciencia',
      'medallion.origin': 'Territorio',
      'medallion.alliances': 'Alianzas',

      'sec2.kicker': 'Propuesta de Valor · El Punto Final',
      'sec2.title': 'De Commodity a Tesoro Gourmet con Identidad Protegida',
      'sec2.lead': 'Transformamos la miel del bosque nativo de Caramávida en el primer producto agroalimentario con Denominación de Origen de toda la Provincia de Arauco.',
      'sec2.bannerTag': 'Hito Histórico Territorial',
      'sec2.bannerTitle': 'Primer Producto Agroalimentario con D.O. de la Provincia de Arauco',
      'sec2.bannerDesc': 'El registro ante INAPI blinda legalmente el nombre Caramávida, certifica el origen botánico mediante palinología y posiciona nuestra miel en mercados gourmet internacionales.',
      'sec2.bannerMetric': 'Prima de Valor Comercial',

      'sec2.card1.tag': 'Diferenciación',
      'sec2.card1.title': 'Protección Legal & Prima de Valor',
      'sec2.card1.desc': 'Reconocimiento oficial ante INAPI (Ley N° 19.039) que impide el uso indebido del origen y eleva el valor comercial hasta un 100% sobre la miel a granel.',
      'sec2.card2.tag': 'Valor Compartido',
      'sec2.card2.title': 'Gobernanza Territorial Asociativa',
      'sec2.card2.desc': 'Articulación entre Cooperativa Ragko, Comité Apícola Nahuelbuta, Bosques y Praderas y Bosque Arauco bajo un Consejo Regulador transparente.',
      'sec2.card3.tag': 'Sostenibilidad',
      'sec2.card3.title': 'Conservación Activa en AAVC',
      'sec2.card3.desc': 'Resguardo productivo de 5.739 hectáreas de Área de Alto Valor de Conservación, protegiendo 929,88 hectáreas de bosques maduros de Tineo y Ulmo.',

      'sec3.kicker': 'El Territorio · AAVC Caramávida',
      'sec3.title': 'Un Santuario Templado Lluvioso en Nahuelbuta',
      'sec3.desc': 'En la ladera occidental de la Cordillera de Nahuelbuta, el aislamiento geográfico natural protege los apiarios de contaminantes agrícolas y mezclas florales no deseadas.',
      'sec3.calendarTitle': 'Calendario Estacional de Floración Nativa',

      'sec4.kicker': 'Colección Monofloral de Origen',
      'sec4.title': 'Dos Tesoros Botánicos del Bosque Nativo',
      'sec4.subtitle': 'Cosechas limitadas de temporada, trazadas por lote para importadores, distribuidores gourmet y retail especializado.',
      'sec4.bloomLabel': 'Floración',
      'sec4.colorLabel': 'Color & Textura',
      'sec4.sensoryLabel': 'Perfil Sensorial',
      'sec4.attributeLabel': 'Atributo Científico',
      'sec4.b2bNote': 'Formatos B2B 300g / 500g bajo protocolo',
      'sec4.inquireBtn': 'Consultar vía WhatsApp',

      'sec4.tineo.badge': 'Cosecha Temprana · Escasa',
      'sec4.tineo.desc': 'Originada en las espigas rojizas y blancas del Tineo adulto. Una miel monofloral de extraordinaria rareza, apreciada por su complejidad aromática y riqueza polifenólica.',
      'sec4.tineo.color': 'Dorado profundo, cristalización suave',
      'sec4.tineo.sensory': 'Notas especiadas y amaderadas del bosque',

      'sec4.ulmo.badge': 'Emblema de Nahuelbuta',
      'sec4.ulmo.desc': 'Proveniente de la floración estival masiva del Ulmo en Caramávida. Destaca por su altísima pureza polínica (81,0%) y su reconocida bioactividad natural.',
      'sec4.ulmo.color': 'Ámbar claro, textura cremosa sedosa',
      'sec4.ulmo.sensory': 'Aroma floral intenso, final elegante',
      'sec4.ulmo.attribute': 'Elevada actividad bactericida natural',

      'sec5gal.kicker': 'Crónica Visual · Bento Grid Editorial',
      'sec5gal.title': 'El Origen, el Oficio y la Miel en Imágenes',
      'sec5gal.subtitle': 'Haz clic sobre cualquier fotografía para explorar los detalles del ecosistema de Caramávida y el trabajo de nuestros apicultores.',

      'sec5.kicker': 'Ciencia, Trazabilidad y Evidencia',
      'sec5.title': 'Rigor Palinológico que Respalda Cada Lote',
      'sec5.subtitle': 'No partimos de promesas, sino de evidencia verificable: análisis melisopalinológicos certificados por Meliflora SpA y estudios de bioactividad.',
      'sec5.previewReportBtn': 'Ver Ficha Técnica Palinológica',

      'sec6.kicker': 'Hoja de Ruta Institucional',
      'sec6.title': 'Camino hacia el Sello de Origen INAPI',
      'sec6.subtitle': 'Estrategia estructurada bajo la Ley N° 19.039 y Decreto Supremo N° 82 para consolidar el registro y proyección internacional.',
      'sec6.step1.title': 'Gobernanza y Catastro',
      'sec6.step1.desc': 'Mesa territorial activa, 15 fichas de productores validadas, protocolo común y registro SAG vigente.',
      'sec6.step2.title': 'Caracterización Científica',
      'sec6.step2.desc': 'Muestreo multi-temporada con cadena de custodia: análisis melisopalinológicos, físico-químicos y sensoriales.',
      'sec6.step3.title': 'Pliego y Control',
      'sec6.step3.desc': 'Redacción del Reglamento de Uso y Control, límites de zona, trazabilidad por lote y Consejo Regulador.',
      'sec6.step4.title': 'Registro INAPI & Minagri',
      'sec6.step4.desc': 'Presentación FPI-27, informe favorable del Ministerio de Agricultura y despliegue comercial en UE y Asia.',
      'sec6.benchKicker': 'Referentes Internacionales que Inspiran el Modelo',
      'sec6.bench1': 'Referente europeo en conservación de bosques mediterráneos mediante pastoreo apícola regulado y parámetros analíticos verificables.',
      'sec6.bench2': 'Vinculada a bosques nativos insulares; logró triplicar el valor comercial del producto apícola local gracias a su D.O.P.',

      'sec8.kicker': 'Conversión Directa · Alianzas B2B',
      'sec8.title': 'Conectemos Directamente para Llevar Caramávida al Mundo',
      'sec8.subtitle': 'Sin formularios extensos ni esperas. Conversa directamente con el equipo comercial de Cooperativa Ragko por WhatsApp para solicitar nuestro dossier B2B o coordinar muestras.',
      'sec8.whatsappBtn': 'Iniciar Conversación en WhatsApp',
      'sec8.dossierBtn': 'Ver Ficha Técnica de Laboratorio',
      'sec8.socialLabel': 'Síguenos y conoce nuestro trabajo territorial',

      'footer.desc': 'Mieles monoflorales de Ulmo y Tineo del bosque nativo de Nahuelbuta. Proyecto de Denominación de Origen y valorización territorial.',
      'footer.navTitle': 'Mapa del Sitio (8 Secciones)',
      'footer.legalTitle': 'Marco Normativo y Gobernanza'
    },
    en: {
      'nav.value': 'D.O. Value',
      'nav.territory': 'Territory',
      'nav.honeys': 'Honeys',
      'nav.gallery': 'Gallery',
      'nav.science': 'Science',
      'nav.roadmap': 'Roadmap',
      'nav.cta': 'Direct Contact',

      'hero.kicker': 'Boutique Institutional Presentation · Certified Origin',
      'hero.title': 'The Essence of Nahuelbuta: Designation of Origin Honeys from Caramávida',
      'hero.subtitle': 'Monofloral Ulmo and Tineo honeys harvested in the temperate rainforest sanctuary of Curanilahue, Chile. Botanical excellence, scientific traceability, and active conservation.',
      'hero.medallionsLabel': 'Identity Pillars · Cooperativa Apícola Ragko',
      'hero.ctaWhatsapp': 'Chat on WhatsApp',
      'hero.ctaExplore': 'Explore Gallery & Origin',
      'hero.stat1Label': 'Protected Territory',
      'hero.stat2Label': 'Ulmo / Tineo Purity',

      'medallion.products': 'Honeys',
      'medallion.quality': 'Science',
      'medallion.origin': 'Territory',
      'medallion.alliances': 'Alliances',

      'sec2.kicker': 'Value Proposition · The Core Purpose',
      'sec2.title': 'From Bulk Commodity to Protected Gourmet Treasure',
      'sec2.lead': 'We transform native rainforest honey from Caramávida into the very first Designation of Origin agri-food product in the Arauco Province.',
      'sec2.bannerTag': 'Historic Territorial Milestone',
      'sec2.bannerTitle': 'First Agri-Food Product with D.O. in the Arauco Province',
      'sec2.bannerDesc': 'Registration before INAPI legally protects the Caramávida name, certifies botanical origin through palynology, and positions our honey in high-end international markets.',
      'sec2.bannerMetric': 'Commercial Value Premium',

      'sec2.card1.tag': 'Differentiation',
      'sec2.card1.title': 'Legal Protection & Value Premium',
      'sec2.card1.desc': 'Official INAPI recognition (Law N° 19.039) preventing misuse of origin and elevating commercial value up to 100% above bulk honey.',
      'sec2.card2.tag': 'Shared Value',
      'sec2.card2.title': 'Associative Territorial Governance',
      'sec2.card2.desc': 'Real collaboration between Cooperativa Ragko, Nahuelbuta Beekeeping Committee, Bosques y Praderas, and Bosque Arauco under a Regulatory Council.',
      'sec2.card3.tag': 'Sustainability',
      'sec2.card3.title': 'Active Conservation in HCVA',
      'sec2.card3.desc': 'Productive stewardship of 5,739 hectares of High Conservation Value Area, protecting 929.88 hectares of mature Tineo and Ulmo native forests.',

      'sec3.kicker': 'The Territory · Caramávida HCVA',
      'sec3.title': 'A Temperate Rainforest Sanctuary in Nahuelbuta',
      'sec3.desc': 'On the western slopes of the Nahuelbuta Mountain Range, natural geographic isolation shields apiaries from agricultural pollutants and unwanted floral blends.',
      'sec3.calendarTitle': 'Seasonal Native Blooming Calendar',

      'sec4.kicker': 'Single-Origin Monofloral Collection',
      'sec4.title': 'Two Botanical Treasures from the Native Forest',
      'sec4.subtitle': 'Limited seasonal harvests, batch-traced for importers, gourmet distributors, and specialty retail.',
      'sec4.bloomLabel': 'Blooming',
      'sec4.colorLabel': 'Color & Texture',
      'sec4.sensoryLabel': 'Sensory Profile',
      'sec4.attributeLabel': 'Scientific Attribute',
      'sec4.b2bNote': '300g / 500g B2B formats under protocol',
      'sec4.inquireBtn': 'Inquire via WhatsApp',

      'sec4.tineo.badge': 'Early Harvest · Rare',
      'sec4.tineo.desc': 'Harvested from the reddish-white flower spikes of mature Tineo trees. An extraordinarily rare monofloral honey prized for its spiced complexity and polyphenolic richness.',
      'sec4.tineo.color': 'Deep amber gold, smooth crystallization',
      'sec4.tineo.sensory': 'Warm spiced and woody rainforest notes',

      'sec4.ulmo.badge': 'Nahuelbuta Emblem',
      'sec4.ulmo.desc': 'Sourced from the summer white blossoms of Ulmo in Caramávida. Distinguished by its exceptional 81.0% pollen purity and natural bioactivity.',
      'sec4.ulmo.color': 'Light amber, silky creamy texture',
      'sec4.ulmo.sensory': 'Intense floral aroma, refined finish',
      'sec4.ulmo.attribute': 'High natural bactericidal activity',

      'sec5gal.kicker': 'Visual Chronicle · Editorial Bento Grid',
      'sec5gal.title': 'Origin, Craft & Honey in Imagery',
      'sec5gal.subtitle': 'Click any photograph to explore details of the Caramávida ecosystem and the artisanal work of our beekeepers.',

      'sec5.kicker': 'Science, Traceability & Evidence',
      'sec5.title': 'Palynological Rigor Backing Every Batch',
      'sec5.subtitle': 'We build on verifiable evidence: certified melissopalynological analyses by Meliflora SpA and bioactivity research collaborations.',
      'sec5.previewReportBtn': 'View Palynological Tech Sheet',

      'sec6.kicker': 'Institutional Roadmap',
      'sec6.title': 'Pathway to Official INAPI Seal of Origin',
      'sec6.subtitle': 'Structured strategy under Chilean Law N° 19.039 and Supreme Decree N° 82 to secure registration and international market protection.',
      'sec6.step1.title': 'Governance & Registry',
      'sec6.step1.desc': 'Active territorial board, 15 validated producer files, shared protocol, and active SAG registration.',
      'sec6.step2.title': 'Scientific Characterization',
      'sec6.step2.desc': 'Multi-season sampling with chain of custody: pollen, physicochemical, and sensory profiling.',
      'sec6.step3.title': 'Specifications & Control',
      'sec6.step3.desc': 'Drafting the Regulation of Use & Control, boundary definition, batch traceability, and Regulatory Council.',
      'sec6.step4.title': 'INAPI & Minagri Registration',
      'sec6.step4.desc': 'FPI-27 filing, favorable Ministry of Agriculture report, and commercial rollout in EU & Asia.',
      'sec6.benchKicker': 'International Benchmarks Inspiring Our Model',
      'sec6.bench1': 'European benchmark in Mediterranean forest conservation through regulated beekeeping and verifiable analytical standards.',
      'sec6.bench2': 'Linked to native island scrublands; tripled the commercial value of local honey through PDO certification.',

      'sec8.kicker': 'Direct Conversion · B2B Partnerships',
      'sec8.title': 'Let’s Connect Directly to Bring Caramávida to the World',
      'sec8.subtitle': 'No lengthy forms or waiting times. Chat directly with Cooperativa Ragko’s commercial team on WhatsApp to request our B2B dossier or sample evaluation.',
      'sec8.whatsappBtn': 'Start WhatsApp Conversation',
      'sec8.dossierBtn': 'View Laboratory Tech Sheet',
      'sec8.socialLabel': 'Follow our territorial beekeeping work',

      'footer.desc': 'Monofloral Ulmo and Tineo honeys from the native forest of Nahuelbuta. Designation of Origin and territorial value creation project.',
      'footer.navTitle': 'Site Map (8 Sections)',
      'footer.legalTitle': 'Regulatory Framework & Governance'
    }
};

ngOnInit(): void {
if (typeof window !== 'undefined') {
this.isScrolled.set(window.scrollY > 40);
}
}

@HostListener('window:scroll', [])
onWindowScroll(): void {
this.isScrolled.set(window.scrollY > 40);
}

setLang(language: Language): void {
this.lang.set(language);
}

t(key: string): string {
return this.dict[this.lang()][key] || key;
}

whatsappUrl(): string {
const text = this.lang() === 'es'
? 'Hola Cooperativa Ragko, me gustaría recibir el dossier comercial y conocer más sobre las mieles de Ulmo y Tineo de Caramávida.'
: 'Hello Cooperativa Ragko, I would like to receive the commercial dossier and learn more about Caramávida Ulmo and Tineo honeys.';
return `https://wa.me/${this.whatsappNumber}?text=${encodeURIComponent(text)}`;
}

whatsappUrlForHoney(variety: 'Ulmo' | 'Tineo'): string {
const text = this.lang() === 'es'
? `Hola Cooperativa Ragko, me interesa consultar disponibilidad B2B y ficha técnica de la Miel Monofloral de ${variety} de Caramávida.`
: `Hello Cooperativa Ragko, I am interested in B2B availability and technical specs for Caramávida Monofloral ${variety} Honey.`;
return `https://wa.me/${this.whatsappNumber}?text=${encodeURIComponent(text)}`;
}
}
