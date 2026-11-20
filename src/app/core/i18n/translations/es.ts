/**
 * Traducción de referencia (español).
 * Su forma define el tipo `Translation`: en.ts y pt.ts deben tener exactamente las mismas claves,
 * de lo contrario la compilación falla.
 * Los textos admiten marcadores {nombre} que se reemplazan con I18nService.format().
 */
export const es = {
  meta: {
    title: 'Cooperativa Ragko · Mieles de Ulmo y Tineo de Caramávida',
    description:
      'Mieles monoflorales de Ulmo y Tineo del bosque nativo de Caramávida, Cordillera de Nahuelbuta, Chile. Trazabilidad por lote y ruta a Denominación de Origen.',
  },

  common: {
    close: 'Cerrar',
    skipToContent: 'Saltar al contenido',
  },

  nav: {
    home: 'Cooperativa Ragko inicio',
    value: 'Valor D.O.',
    territory: 'Territorio',
    honeys: 'Mieles',
    gallery: 'Galería',
    science: 'Ciencia',
    traceability: 'Trazabilidad',
    roadmap: 'Ruta INAPI',
    faq: 'FAQ',
    cta: 'Contacto Directo',
    openMenu: 'Abrir menú',
    closeMenu: 'Cerrar menú',
    mainNav: 'Navegación principal',
    language: 'Idioma',
    changeLanguage: 'Cambiar idioma',
  },

  brand: {
    subtitle: 'Caramávida · Nahuelbuta',
    cooperative: 'Cooperativa Apícola · Caramávida',
  },

  hero: {
    kicker: 'Carta de Presentación Boutique · Origen Certificado',
    title: 'La Esencia de Nahuelbuta: Mieles con Denominación de Origen de Caramávida',
    subtitle:
      'Mieles monoflorales de Ulmo y Tineo cosechadas en el santuario templado lluvioso de Curanilahue, Chile. Excelencia botánica, trazabilidad científica y conservación activa.',
    backgroundAlt: 'Apicultor de Cooperativa Ragko revisando un marco en el apiario de Caramávida',
    medallionsLabel: 'Pilares de Identidad · Cooperativa Apícola Ragko',
    medallions: {
      products: 'Mieles',
      quality: 'Ciencia',
      origin: 'Territorio',
      alliances: 'Alianzas',
    },
    ctaWhatsapp: 'Conversar por WhatsApp',
    ctaExplore: 'Explorar Galería y Origen',
    card: {
      imageAlt: 'Marco de panal con miel operculada y abejas de Cooperativa Ragko',
      seal: 'INAPI · Ruta D.O.',
      kicker: 'Colección Monofloral',
      title: 'Ulmo & Tineo · Caramávida',
      stat1Label: 'Territorio Protegido',
      stat1Value: '5.739 ha',
      stat1Note: 'AAVC Cordillera Nahuelbuta',
      stat2Label: 'Pureza Ulmo / Tineo',
      stat2Value: '81,0% / 69,6%',
      stat2Note: 'Pureza Polínica Certificada',
    },
  },

  value: {
    kicker: 'Propuesta de Valor · El Punto Final',
    title: 'De Commodity a Tesoro Gourmet con Identidad Protegida',
    lead:
      'Transformamos la miel del bosque nativo de Caramávida en el primer producto agroalimentario con Denominación de Origen de toda la Provincia de Arauco.',
    banner: {
      tag: 'Hito Histórico Territorial',
      title: 'Primer Producto Agroalimentario con D.O. de la Provincia de Arauco',
      desc:
        'El registro ante INAPI blinda legalmente el nombre Caramávida, certifica el origen botánico mediante palinología y posiciona nuestra miel en mercados gourmet internacionales.',
      metricValue: '+100%',
      metricLabel: 'Prima de Valor Comercial',
    },
    cards: [
      {
        tag: 'Diferenciación',
        title: 'Protección Legal & Prima de Valor',
        desc:
          'Reconocimiento oficial ante INAPI (Ley N° 19.039) que impide el uso indebido del origen y eleva el valor comercial hasta un 100% sobre la miel a granel.',
        footLeft: 'INAPI · Ley N° 19.039',
        footRight: 'Exportación & Gourmet',
      },
      {
        tag: 'Valor Compartido',
        title: 'Gobernanza Territorial Asociativa',
        desc:
          'Articulación entre Cooperativa Ragko, Comité Apícola Nahuelbuta, Bosques y Praderas y Bosque Arauco bajo un Consejo Regulador transparente.',
        footLeft: 'Ragko · Nahuelbuta · Arauco',
        footRight: 'Consejo Regulador',
      },
      {
        tag: 'Sostenibilidad',
        title: 'Conservación Activa en AAVC',
        desc:
          'Resguardo productivo de 5.739 hectáreas de Área de Alto Valor de Conservación, protegiendo 929,88 hectáreas de bosques maduros de Tineo y Ulmo.',
        footLeft: '5.739 ha AAVC',
        footRight: '929,88 ha Ulmo-Tineo',
      },
    ],
  },

  territory: {
    kicker: 'El Territorio · AAVC Caramávida',
    title: 'Un Santuario Templado Lluvioso en Nahuelbuta',
    desc:
      'En la ladera occidental de la Cordillera de Nahuelbuta, el aislamiento geográfico natural protege los apiarios de contaminantes agrícolas y mezclas florales no deseadas.',
    photoAlt: 'Apicultor de Cooperativa Ragko junto a sus colmenas en la Cordillera de Nahuelbuta',
    photoCaption: 'Ladera Occidental · Cordillera de Nahuelbuta, Curanilahue',
    calendarTitle: 'Calendario Estacional de Floración Nativa',
    calendar: {
      tineo: 'Nov – Dic',
      ulmo: 'Ene – Mar',
    },
    map: {
      kicker: 'Cartografía Territorial Generalizada',
      title: 'Predio Caramávida AAVC · 5.739 ha',
      badge: 'Ley N° 21.489 · Coordenadas Resguardadas',
      ariaLabel:
        'Mapa esquemático del predio Caramávida con el núcleo melífero de Tineo y Ulmo y el radio de vuelo de las abejas',
      core: 'Núcleo Apícola Ragko',
      radius: 'Radio pecoreo: 1,5 km',
      sector: 'Sector Antihuala / Curanilahue',
      north: 'N',
      legend: {
        estate: 'Predio Caramávida (5.739 ha)',
        core: 'Tineo-Ulmo (929,88 ha)',
        flight: 'Vuelo abejas (1,5 km)',
        forest: 'Bosque Nativo AAVC',
      },
    },
  },

  honeys: {
    kicker: 'Colección Monofloral de Origen',
    title: 'Dos Tesoros Botánicos del Bosque Nativo',
    subtitle:
      'Cosechas limitadas de temporada, trazadas por lote para importadores, distribuidores gourmet y retail especializado.',
    tabsLabel: 'Elegir miel',
    labels: {
      bloom: 'Floración',
      color: 'Color & Textura',
      sensory: 'Perfil Sensorial',
      attribute: 'Atributo Científico',
    },
    purity: 'Pureza',
    reportShort: 'Inf.',
    b2bNote: 'Formatos B2B 300g / 500g bajo protocolo',
    inquire: 'Consultar vía WhatsApp',
    tineo: {
      name: 'Miel de Tineo',
      badge: 'Cosecha Temprana · Escasa',
      imageAlt: 'Marco de panal con miel de Tineo operculada, Caramávida',
      desc:
        'Originada en las espigas rojizas y blancas del Tineo adulto. Una miel monofloral de extraordinaria rareza, apreciada por su complejidad aromática y riqueza polifenólica.',
      bloom: 'Noviembre – Diciembre',
      color: 'Dorado profundo, cristalización suave',
      sensory: 'Notas especiadas y amaderadas del bosque',
      attribute: 'Antiox+ 10+ (en ensayo)',
    },
    ulmo: {
      name: 'Miel de Ulmo',
      badge: 'Emblema de Nahuelbuta',
      imageAlt: 'Apicultor de Ragko envasando miel de Ulmo de tono ámbar claro',
      desc:
        'Proveniente de la floración estival masiva del Ulmo en Caramávida. Destaca por su altísima pureza polínica (81,0%) y su reconocida bioactividad natural.',
      bloom: 'Enero – Marzo',
      color: 'Ámbar claro, textura cremosa sedosa',
      sensory: 'Aroma floral intenso, final elegante',
      attribute: 'Elevada actividad bactericida natural',
    },
  },

  gallery: {
    kicker: 'Crónica Visual · Bento Grid Editorial',
    title: 'El Origen, el Oficio y la Miel en Imágenes',
    subtitle:
      'Haz clic sobre cualquier fotografía para explorar los detalles del ecosistema de Caramávida y el trabajo de nuestros apicultores.',
    inquire: 'Consultar Lote →',
    items: {
      'somos-ragko': {
        tag: 'Origen · Apiarios de Caramávida',
        title: 'Somos Ragko: Colmenas entre Praderas y Bosque',
        desc: 'Apiarios instalados en praderas floridas al borde del bosque nativo, lejos de cultivos intensivos y agroquímicos.',
      },
      'inspeccion-marco': {
        tag: 'Oficio · Manejo Sanitario',
        title: 'Inspección Cuidadosa de Cada Colmena',
        desc: 'Revisión periódica de marcos y colonias con manejo sanitario trazable bajo Ley N° 21.489.',
      },
      'miel-cruda': {
        tag: 'Producto · Miel Cruda',
        title: 'Miel Pura, Tal Como Sale de la Colmena',
        desc: 'Sin pasteurizar ni mezclar: conserva sus enzimas, aromas y la textura natural del bosque.',
      },
      'panal-cosecha': {
        tag: 'Cosecha · Trazabilidad por Lote',
        title: 'Marcos Listos para la Extracción',
        desc: 'Cada marco cosechado se registra por lote para asegurar la trazabilidad desde el apiario hasta el envase.',
      },
      'apicultor-territorio': {
        tag: 'Comunidad · Apicultores',
        title: 'Raíces en la Cordillera de Nahuelbuta',
        desc: 'Apicultores locales que conocen cada floración del territorio y cuidan sus colmenas todo el año.',
      },
      carpinteria: {
        tag: 'Oficios · Madera',
        title: 'Manos que Construyen el Territorio',
        desc: 'Oficios locales de la madera que forman parte de la red comunitaria de Ragko.',
      },
      'vivero-nativo': {
        tag: 'Conservación · Vivero Nativo',
        title: 'Especies Nativas para el Bosque del Mañana',
        desc: 'Plantas melíferas nativas que fortalecen el bosque y la alimentación de las abejas.',
      },
      artesano: {
        tag: 'Comunidad · Caramávida',
        title: 'Tradición y Trabajo de Generaciones',
        desc: 'Rostros de la comunidad que sostienen la identidad productiva de Curanilahue.',
      },
    },
  },

  pollen: {
    names: {
      eucryphia: 'Ulmo',
      weinmannia: 'Tineo',
      tepualia: 'Tepú',
      aristotelia: 'Maqui',
      myrtaceae: 'Mirtáceas nativas',
      caldcluvia: 'Tiaca',
      calceolaria: 'Capachito',
      other: 'Otros pólenes',
    },
  },

  science: {
    kicker: 'Ciencia, Trazabilidad y Evidencia',
    title: 'Rigor Palinológico que Respalda Cada Lote',
    subtitle:
      'No partimos de promesas, sino de evidencia verificable: análisis melisopalinológicos certificados por Meliflora SpA y estudios de bioactividad.',
    reportButton: 'Ver Ficha Técnica Palinológica',
    reportLabel: 'Meliflora SpA · Inf. N° {report}',
    ulmoTitle: 'Miel Monofloral de Ulmo',
    tineoTitle: 'Miel Monofloral de Tineo',
    total: 'Total',
    grains: 'granos',
    grainsShort: 'gr.',
    sample: 'Muestra {sample} · Curanilahue',
  },

  trace: {
    kicker: 'Del Panal a tu Mesa · Trazabilidad Interactiva',
    title: 'Rastrea tu Lote',
    subtitle:
      'Cada frasco Ragko lleva un código de lote en su etiqueta. Ingrésalo y descubre de qué floración viene, dónde se cosechó y qué revela su análisis de laboratorio.',
    inputLabel: 'Código de lote',
    placeholder: 'Ej: RGK-UL-416',
    submit: 'Rastrear',
    examples: 'Prueba con un lote piloto:',
    notFound: 'No encontramos el lote «{code}». Revisa el código impreso en la etiqueta o escríbenos por WhatsApp.',
    lot: 'Lote',
    verified: 'Verificado en laboratorio',
    purity: 'Pureza polínica',
    fingerprintTitle: 'Huella Polínica',
    fingerprintHint: 'Cada celda del panal representa el 1% de los granos de polen contados en laboratorio.',
    fingerprintAria: 'Huella polínica del lote {code}: panal de 100 celdas según la proporción de cada especie',
    table: {
      caption: 'Composición polínica del lote {code}',
      species: 'Especie',
      grains: 'Granos',
      share: '%',
    },
    journeyTitle: 'Recorrido del Lote',
    steps: {
      bloom: 'Floración',
      apiary: 'Apiario de origen',
      harvest: 'Cosecha',
      extraction: 'Extracción',
      lab: 'Análisis de laboratorio',
      bottling: 'Envasado',
    },
    apiaryDetail: 'Núcleo Apícola Ragko · Caramávida, Curanilahue',
    apiaryNote: 'Ubicación exacta resguardada según Ley N° 21.489',
    extractionDetail: 'En frío, sin pasteurizar ni filtrar en exceso',
    labDetail: 'Meliflora SpA · Informe N° {report} · Muestra {sample} · {grains} granos',
    bottlingDetail: 'Formatos 300 g y 500 g, sellados con su código de lote',
    lots: {
      ulmo: {
        honey: 'Miel Monofloral de Ulmo',
        bloom: 'Ulmo (Eucryphia cordifolia) · Enero – Marzo',
        harvest: 'Al cierre de la floración estival del Ulmo',
      },
      tineo: {
        honey: 'Miel Monofloral de Tineo',
        bloom: 'Tineo (Weinmannia trichosperma) · Noviembre – Diciembre',
        harvest: 'Cosecha temprana, al término de la floración del Tineo',
      },
    },
    orderLot: 'Consultar disponibilidad de este lote',
    demoNote: 'Lotes piloto basados en los informes N° 411 y 416 de Meliflora SpA.',
  },

  roadmap: {
    kicker: 'Hoja de Ruta Institucional',
    title: 'Camino hacia el Sello de Origen INAPI',
    subtitle:
      'Estrategia estructurada bajo la Ley N° 19.039 y Decreto Supremo N° 82 para consolidar el registro y proyección internacional.',
    phase: 'Fase',
    steps: [
      {
        months: 'Meses 0–4',
        title: 'Gobernanza y Catastro',
        desc: 'Mesa territorial activa, 15 fichas de productores validadas, protocolo común y registro SAG vigente.',
      },
      {
        months: 'Meses 3–12',
        title: 'Caracterización Científica',
        desc: 'Muestreo multi-temporada con cadena de custodia: análisis melisopalinológicos, físico-químicos y sensoriales.',
      },
      {
        months: 'Meses 9–14',
        title: 'Pliego y Control',
        desc: 'Redacción del Reglamento de Uso y Control, límites de zona, trazabilidad por lote y Consejo Regulador.',
      },
      {
        months: 'Meses 14–30+',
        title: 'Registro INAPI & Minagri',
        desc: 'Presentación FPI-27, informe favorable del Ministerio de Agricultura y despliegue comercial en UE y Asia.',
      },
    ],
    benchKicker: 'Referentes Internacionales que Inspiran el Modelo',
    benchmarks: [
      {
        code: 'ES',
        name: 'D.O.P. Miel de La Alcarria (España)',
        desc: 'Referente europeo en conservación de bosques mediterráneos mediante pastoreo apícola regulado y parámetros analíticos verificables.',
      },
      {
        code: 'FR',
        name: 'D.O.P. Miel de Córcega / Mele di Corsica (Francia)',
        desc: 'Vinculada a bosques nativos insulares; logró triplicar el valor comercial del producto apícola local gracias a su D.O.P.',
      },
    ],
  },

  faq: {
    kicker: 'Preguntas Frecuentes',
    title: 'Todo lo que Quieres Saber sobre Nuestra Miel',
    subtitle: 'Pureza, conservación, envíos y pedidos B2B. Si tu duda no está aquí, escríbenos directamente.',
    imageAlt: 'Colmenas de colores de Cooperativa Ragko en la pradera',
    more: '¿Otra pregunta? Escríbenos por WhatsApp',
    // TEXTOS PROVISIONALES: revisar plazos, formatos y vida útil con la información oficial.
    items: [
      {
        category: 'Miel pura',
        question: '¿Cómo sé que su miel es 100% pura?',
        answer:
          'Cada lote se analiza en laboratorio (análisis melisopalinológico de Meliflora SpA) para verificar su origen botánico y su pureza. No agregamos azúcares, jarabes ni aditivos, y no mezclamos miel de otras zonas: lo que envasamos es exactamente lo que producen nuestras colmenas.',
      },
      {
        category: 'Miel pura',
        question: 'Mi miel se cristalizó, ¿está mala?',
        answer:
          'No. La cristalización es un proceso natural y una buena señal de miel cruda y sin procesar. La miel de Ulmo tiende a cristalizar de forma fina y cremosa. Si la prefieres líquida, entibia el frasco a baño María sin superar los 40 °C para no dañar sus enzimas.',
      },
      {
        category: 'Productos',
        question: '¿Qué diferencia hay entre la miel de Ulmo y la de Tineo?',
        answer:
          'La miel de Ulmo es de color ámbar claro, textura cremosa y aroma floral intenso; el Ulmo florece entre enero y marzo. La de Tineo es más escasa, de tono dorado profundo y notas especiadas y amaderadas; se cosecha temprano, entre noviembre y diciembre. Ambas son monoflorales y provienen del bosque nativo de Caramávida.',
      },
      {
        category: 'Conservación',
        question: '¿Cómo debo conservar la miel y cuánto dura?',
        answer:
          'Guárdala bien cerrada, a temperatura ambiente, en un lugar seco y lejos de la luz directa. No es necesario refrigerarla (el frío acelera la cristalización). Bien almacenada, la miel no se echa a perder; recomendamos consumirla dentro de 2 años para disfrutar de su mejor aroma.',
      },
      {
        category: 'Conservación',
        question: '¿Pueden consumirla niños pequeños?',
        answer:
          'Como toda miel cruda, no se recomienda para menores de 12 meses. A partir del año de edad puede formar parte de una dieta equilibrada.',
      },
      {
        category: 'Envíos',
        question: '¿Hacen envíos a todo Chile?',
        answer:
          'Sí. Despachamos a todo el país mediante courier, con un plazo estimado de 3 a 7 días hábiles según la región. Los frascos van protegidos con embalaje reforzado. Coordina tu pedido directamente por WhatsApp.',
      },
      {
        category: 'Envíos',
        question: '¿Venden al por mayor o para exportación?',
        answer:
          'Sí. Atendemos a tiendas gourmet, restaurantes, distribuidores e importadores con formatos de 300 g y 500 g, además de volúmenes a granel según disponibilidad de temporada. Podemos enviar muestras y fichas técnicas para evaluación.',
      },
      {
        category: 'Productos',
        question: '¿Siempre hay stock de ambas mieles?',
        answer:
          'Nuestra producción es limitada y depende de cada floración. La miel de Tineo, en particular, es escasa y suele agotarse antes. Te recomendamos consultar disponibilidad y reservar con anticipación.',
      },
    ],
  },

  contact: {
    kicker: 'Conversión Directa · Alianzas B2B',
    title: 'Conectemos Directamente para Llevar Caramávida al Mundo',
    subtitle:
      'Sin formularios extensos ni esperas. Conversa directamente con el equipo comercial de Cooperativa Ragko por WhatsApp para solicitar nuestro dossier B2B o coordinar muestras.',
    whatsappButton: 'Iniciar Conversación en WhatsApp',
    dossierButton: 'Ver Ficha Técnica de Laboratorio',
    socialLabel: 'Síguenos y conoce nuestro trabajo territorial',
    emailSubject: 'Alianza Comercial Mieles Caramávida',
  },

  footer: {
    desc: 'Mieles monoflorales de Ulmo y Tineo del bosque nativo de Nahuelbuta. Proyecto de Denominación de Origen y valorización territorial.',
    location: 'Curanilahue · Cordillera de Nahuelbuta · Provincia de Arauco, Chile.',
    navTitle: 'Mapa del Sitio',
    legalTitle: 'Marco Normativo y Gobernanza',
    legal: [
      'Ley N° 19.039 (Sello de Origen / Denominación de Origen INAPI).',
      'Ley N° 21.489 (Protección y Fomento Apícola · Registro SAG).',
      'Articulación territorial junto a Comité Apícola Nahuelbuta, Bosques y Praderas y Bosque Arauco.',
    ],
    rights: '© {year} Cooperativa Apícola Ragko · Caramávida, Chile.',
    credit: 'Presentación Boutique B2B & de Origen',
  },

  lab: {
    kicker: 'Evidencia Científica Verificada · Meliflora SpA',
    title: 'Ficha Técnica Melisopalinológica',
    introBefore: 'Análisis certificados por',
    introAfter:
      '(Ing. Agr. Nadia Ríos Miranda, Especialista en Miel) para muestras piloto trazables del sector Curanilahue / Caramávida:',
    reportTitle: 'Informe N° {report} · {honey}',
    sampleLine: 'Muestra {sample} · {grains} granos contados',
    requestButton: 'Solicitar Informes Completos por WhatsApp',
  },

  whatsapp: {
    general:
      'Hola Cooperativa Ragko, me gustaría recibir el dossier comercial y conocer más sobre las mieles de Ulmo y Tineo de Caramávida.',
    honey:
      'Hola Cooperativa Ragko, me interesa consultar disponibilidad B2B y ficha técnica de la {honey} de Caramávida.',
    lot: 'Hola Cooperativa Ragko, quiero consultar la disponibilidad del lote {code} ({honey}).',
  },
};

export type Translation = typeof es;
