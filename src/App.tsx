import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import {
  Search,
  CheckCircle2,
  Clock,
  Lock,
  Unlock,
  BookOpen,
  Award,
  Filter,
  RotateCcw,
  ChevronRight,
  Info,
  Sparkles,
  Layers,
  ArrowRight,
  ArrowLeft,
  CheckCheck,
  GraduationCap,
  X,
  Eye,
  HelpCircle
} from 'lucide-react';

// ==========================================
// DATOS DEL PLAN DE ESTUDIOS 2018
// ==========================================
const SUBJECTS_DATA = [
  // PRIMER AÑO
  {
    id: 'IC101',
    year: 1,
    period: 'ANUAL',
    name: 'Matemática I',
    cursarReg: [],
    cursarApr: [],
    rendirApr: [],
  },
  {
    id: 'IC102',
    year: 1,
    period: 'ANUAL',
    name: 'Álgebra',
    cursarReg: [],
    cursarApr: [],
    rendirApr: [],
  },
  {
    id: 'IC103',
    year: 1,
    period: 'ANUAL',
    name: 'Algoritmos y Estructura de Datos',
    cursarReg: [],
    cursarApr: [],
    rendirApr: [],
  },
  {
    id: 'IC111',
    year: 1,
    period: '1°C',
    name: 'Fundamentos de Informática',
    cursarReg: [],
    cursarApr: [],
    rendirApr: [],
  },
  {
    id: 'IC112',
    year: 1,
    period: '1°C',
    name: 'Inglés Técnico I',
    cursarReg: [],
    cursarApr: [],
    rendirApr: [],
  },
  {
    id: 'IC121',
    year: 1,
    period: '2°C',
    name: 'Sistemas de Representación',
    cursarReg: ['IC111'],
    cursarApr: [],
    rendirApr: ['IC111'],
  },
  {
    id: 'IC122',
    year: 1,
    period: '2°C',
    name: 'Química',
    cursarReg: [],
    cursarApr: [],
    rendirApr: [],
  },

  // SEGUNDO AÑO
  {
    id: 'IC211',
    year: 2,
    period: '1°C',
    name: 'Matemática II',
    cursarReg: ['IC101', 'IC102'],
    cursarApr: [],
    rendirApr: ['IC101', 'IC102'],
  },
  {
    id: 'IC212',
    year: 2,
    period: '1°C',
    name: 'Física Mecánica',
    cursarReg: ['IC101', 'IC102'],
    cursarApr: [],
    rendirApr: ['IC101', 'IC102'],
  },
  {
    id: 'IC213',
    year: 2,
    period: '1°C',
    name: 'Fundamentos de Computación I',
    cursarReg: ['IC111'],
    cursarApr: [],
    rendirApr: ['IC111'],
  },
  {
    id: 'IC221',
    year: 2,
    period: '2°C',
    name: 'Arquitectura de Computadoras',
    cursarReg: ['IC111'],
    cursarApr: [],
    rendirApr: ['IC111'],
  },
  {
    id: 'IC222',
    year: 2,
    period: '2°C',
    name: 'Matemática III',
    cursarReg: ['IC211'],
    cursarApr: [],
    rendirApr: ['IC211'],
  },
  {
    id: 'IC223',
    year: 2,
    period: '2°C',
    name: 'Electricidad y Electromagnetismo',
    cursarReg: ['IC211', 'IC212'],
    cursarApr: [],
    rendirApr: ['IC211', 'IC212'],
  },
  {
    id: 'IC224',
    year: 2,
    period: '2°C',
    name: 'Programación',
    cursarReg: ['IC103', 'IC213'],
    cursarApr: [],
    rendirApr: ['IC103', 'IC213'],
  },

  // TERCER AÑO
  {
    id: 'IC311',
    year: 3,
    period: '1°C',
    name: 'Probabilidad y Estadística',
    cursarReg: ['IC211'],
    cursarApr: ['IC101', 'IC102'],
    rendirApr: ['IC101', 'IC102', 'IC211'],
  },
  {
    id: 'IC312',
    year: 3,
    period: '1°C',
    name: 'Circuitos Eléctricos',
    cursarReg: ['IC223'],
    cursarApr: ['IC101', 'IC102'],
    rendirApr: ['IC101', 'IC102', 'IC223'],
  },
  {
    id: 'IC313',
    year: 3,
    period: '1°C',
    name: 'Materiales y Dispositivos Electrónicos',
    cursarReg: ['IC122', 'IC223'],
    cursarApr: ['IC101', 'IC102'],
    rendirApr: ['IC101', 'IC102', 'IC122', 'IC223'],
  },
  {
    id: 'IC314',
    year: 3,
    period: '1°C',
    name: 'Organización Empresarial',
    cursarReg: ['IC211'],
    cursarApr: ['IC111'],
    rendirApr: ['IC111', 'IC211'],
  },
  {
    id: 'IC315',
    year: 3,
    period: '1°C',
    name: 'Sistemas Operativos',
    cursarReg: ['IC103', 'IC221'],
    cursarApr: ['IC111'],
    rendirApr: ['IC111', 'IC103', 'IC221'],
  },
  {
    id: 'IC321',
    year: 3,
    period: '2°C',
    name: 'Electrónica Analógica',
    cursarReg: ['IC313'],
    cursarApr: [],
    rendirApr: ['IC313'],
  },
  {
    id: 'IC322',
    year: 3,
    period: '2°C',
    name: 'Fundamentos de Computación II',
    cursarReg: ['IC213'],
    cursarApr: ['IC103', 'IC111'],
    rendirApr: ['IC103', 'IC111', 'IC213'],
  },
  {
    id: 'IC323',
    year: 3,
    period: '2°C',
    name: 'Comunicación de Datos',
    cursarReg: ['IC222', 'IC223'],
    cursarApr: ['IC101', 'IC102'],
    rendirApr: ['IC101', 'IC102', 'IC222', 'IC223'],
  },
  {
    id: 'IC324',
    year: 3,
    period: '2°C',
    name: 'Señales y Sistemas',
    cursarReg: ['IC222'],
    cursarApr: ['IC101', 'IC102'],
    rendirApr: ['IC101', 'IC102', 'IC222'],
  },

  // CUARTO AÑO
  {
    id: 'IC411',
    year: 4,
    period: '1°C',
    name: 'Sistemas Digitales',
    cursarReg: ['IC321'],
    cursarApr: ['IC211', 'IC212', 'IC213'],
    rendirApr: ['IC211', 'IC212', 'IC213', 'IC321'],
    generalRuleNote: 'Requiere todo 1°C de 2° Año aprobado',
  },
  {
    id: 'IC412',
    year: 4,
    period: '1°C',
    name: 'Redes I',
    cursarReg: ['IC221', 'IC323'],
    cursarApr: ['IC211', 'IC212', 'IC213'],
    rendirApr: ['IC211', 'IC212', 'IC213', 'IC221', 'IC323'],
    generalRuleNote: 'Requiere todo 1°C de 2° Año aprobado',
  },
  {
    id: 'IC413',
    year: 4,
    period: '1°C',
    name: 'Ingeniería de Software I',
    cursarReg: ['IC224', 'IC311', 'IC314'],
    cursarApr: ['IC211', 'IC212', 'IC213'],
    rendirApr: ['IC211', 'IC212', 'IC213', 'IC224', 'IC311', 'IC314'],
    generalRuleNote: 'Requiere todo 1°C de 2° Año aprobado',
  },
  {
    id: 'IC414',
    year: 4,
    period: '1°C',
    name: 'Base de Datos',
    cursarReg: ['IC224'],
    cursarApr: ['IC211', 'IC212', 'IC213'],
    rendirApr: ['IC211', 'IC212', 'IC213', 'IC224'],
    generalRuleNote: 'Requiere todo 1°C de 2° Año aprobado',
  },
  {
    id: 'IC415',
    year: 4,
    period: '1°C',
    name: 'Inteligencia Computacional',
    cursarReg: ['IC224', 'IC322', 'IC411'],
    cursarApr: ['IC211', 'IC212', 'IC213'],
    rendirApr: ['IC211', 'IC212', 'IC213', 'IC224', 'IC322', 'IC411'],
    generalRuleNote: 'Requiere todo 1°C de 2° Año aprobado',
  },
  {
    id: 'IC421',
    year: 4,
    period: '2°C',
    name: 'Redes II',
    cursarReg: ['IC412'],
    cursarApr: ['IC221', 'IC222', 'IC223', 'IC224', 'IC323'],
    rendirApr: ['IC221', 'IC222', 'IC223', 'IC224', 'IC323', 'IC412'],
    generalRuleNote: 'Requiere todo 2°C de 2° Año aprobado',
  },
  {
    id: 'IC422',
    year: 4,
    period: '2°C',
    name: 'Sistemas Embebidos',
    cursarReg: ['IC323', 'IC411'],
    cursarApr: ['IC221', 'IC222', 'IC223', 'IC224'],
    rendirApr: ['IC221', 'IC222', 'IC223', 'IC224', 'IC323', 'IC411'],
    generalRuleNote: 'Requiere todo 2°C de 2° Año aprobado',
  },
  {
    id: 'IC423',
    year: 4,
    period: '2°C',
    name: 'Ingeniería de Software II',
    cursarReg: ['IC413'],
    cursarApr: ['IC221', 'IC222', 'IC223', 'IC224'],
    rendirApr: ['IC221', 'IC222', 'IC223', 'IC224', 'IC413'],
    generalRuleNote: 'Requiere todo 2°C de 2° Año aprobado',
  },
  {
    id: 'IC424',
    year: 4,
    period: '2°C',
    name: 'Sistemas de Control y Automatización',
    cursarReg: ['IC324', 'IC411'],
    cursarApr: ['IC221', 'IC222', 'IC223', 'IC224'],
    rendirApr: ['IC221', 'IC222', 'IC223', 'IC224', 'IC324', 'IC411'],
    generalRuleNote: 'Requiere todo 2°C de 2° Año aprobado',
  },

  // QUINTO AÑO
  {
    id: 'IC511',
    year: 5,
    period: '1°C',
    name: 'Internet de las Cosas, Sensores y Redes',
    cursarReg: ['IC421', 'IC422'],
    cursarApr: ['IC311', 'IC312', 'IC313', 'IC314', 'IC315', 'IC411', 'IC412'],
    rendirApr: ['IC311', 'IC312', 'IC313', 'IC314', 'IC315', 'IC411', 'IC412', 'IC421', 'IC422'],
    generalRuleNote: 'Requiere todo 1°C de 3° Año aprobado',
  },
  {
    id: 'IC512',
    year: 5,
    period: '1°C',
    name: 'Procesamiento Digital de Señales',
    cursarReg: ['IC324', 'IC422'],
    cursarApr: ['IC311', 'IC312', 'IC313', 'IC314', 'IC315'],
    rendirApr: ['IC311', 'IC312', 'IC313', 'IC314', 'IC315', 'IC324', 'IC422'],
    generalRuleNote: 'Requiere todo 1°C de 3° Año aprobado',
  },
  {
    id: 'IC513',
    year: 5,
    period: '1°C',
    name: 'Economía',
    cursarReg: [],
    cursarApr: ['IC311', 'IC312', 'IC313', 'IC314', 'IC315'],
    rendirApr: ['IC311', 'IC312', 'IC313', 'IC314', 'IC315'],
    generalRuleNote: 'Requiere todo 1°C de 3° Año aprobado',
  },
  {
    id: 'IC514',
    year: 5,
    period: '1°C',
    name: 'Higiene, Seguridad y Medio Ambiente',
    cursarReg: [],
    cursarApr: ['IC311', 'IC312', 'IC313', 'IC314', 'IC315'],
    rendirApr: ['IC311', 'IC312', 'IC313', 'IC314', 'IC315'],
    generalRuleNote: 'Requiere todo 1°C de 3° Año aprobado',
  },
  {
    id: 'IC515',
    year: 5,
    period: '1°C',
    name: 'Gestión de Proyectos',
    cursarReg: ['IC413'],
    cursarApr: ['IC311', 'IC312', 'IC313', 'IC314', 'IC315'],
    rendirApr: ['IC311', 'IC312', 'IC313', 'IC314', 'IC315', 'IC413'],
    generalRuleNote: 'Requiere todo 1°C de 3° Año aprobado',
  },
  {
    id: 'IC521',
    year: 5,
    period: '2°C',
    name: 'Legislación',
    cursarReg: [],
    cursarApr: ['IC321', 'IC322', 'IC323', 'IC324'],
    rendirApr: ['IC321', 'IC322', 'IC323', 'IC324'],
    generalRuleNote: 'Requiere todo 2°C de 3° Año aprobado',
  },
  {
    id: 'IC522',
    year: 5,
    period: '2°C',
    name: 'Proyecto Final Integrador',
    cursarReg: ['IC422', 'IC515'],
    cursarApr: ['IC321', 'IC322', 'IC323', 'IC324'],
    rendirApr: ['IC321', 'IC322', 'IC323', 'IC324', 'IC422', 'IC515'],
    generalRuleNote: 'Requiere todo 2°C de 3° Año aprobado',
  },
  {
    id: 'ICO51',
    year: 5,
    period: '2°C',
    name: 'Optativa I (Ver columna Optativas)',
    cursarReg: [],
    cursarApr: ['IC321', 'IC322', 'IC323', 'IC324'],
    rendirApr: ['IC321', 'IC322', 'IC323', 'IC324'],
    generalRuleNote: 'Se elige de la lista de Optativas',
    isPlaceholderOptativa: true,
  },
  {
    id: 'ICO52',
    year: 5,
    period: '2°C',
    name: 'Optativa II (Ver columna Optativas)',
    cursarReg: [],
    cursarApr: ['IC321', 'IC322', 'IC323', 'IC324'],
    rendirApr: ['IC321', 'IC322', 'IC323', 'IC324'],
    generalRuleNote: 'Se elige de la lista de Optativas',
    isPlaceholderOptativa: true,
  },

  // OPTATIVAS (Columna 6)
  {
    id: 'ICO523',
    year: 6,
    period: '2°C',
    name: 'Seguridad en Sistemas',
    cursarReg: ['IC414', 'IC423', 'IC511'],
    cursarApr: ['IC321', 'IC322', 'IC323', 'IC324'],
    rendirApr: ['IC321', 'IC322', 'IC323', 'IC324', 'IC414', 'IC423', 'IC511'],
    generalRuleNote: 'Optativa • Requiere todo 2°C de 3° Año aprobado',
    isOptativa: true,
  },
  {
    id: 'ICO524',
    year: 6,
    period: '2°C',
    name: 'Modelos y Simulación',
    cursarReg: [],
    cursarApr: ['IC321', 'IC322', 'IC323', 'IC324'],
    rendirApr: ['IC321', 'IC322', 'IC323', 'IC324'],
    generalRuleNote: 'Optativa • Requiere todo 2°C de 3° Año aprobado',
    isOptativa: true,
  },
  {
    id: 'ICO525',
    year: 6,
    period: '2°C',
    name: 'Sistemas de Control Industriales',
    cursarReg: ['IC421', 'IC424'],
    cursarApr: ['IC321', 'IC322', 'IC323', 'IC324'],
    rendirApr: ['IC321', 'IC322', 'IC323', 'IC324', 'IC421', 'IC424'],
    generalRuleNote: 'Optativa • Requiere todo 2°C de 3° Año aprobado',
    isOptativa: true,
  },
  {
    id: 'ICO526',
    year: 6,
    period: '2°C',
    name: 'Diseño de Sistemas Embebidos',
    cursarReg: ['IC422'],
    cursarApr: ['IC321', 'IC322', 'IC323', 'IC324'],
    rendirApr: ['IC321', 'IC322', 'IC323', 'IC324', 'IC422'],
    generalRuleNote: 'Optativa • Requiere todo 2°C de 3° Año aprobado',
    isOptativa: true,
  },
  {
    id: 'ICO527',
    year: 6,
    period: '2°C',
    name: 'Fundamentos del Proc. Digital de Imágenes',
    cursarReg: ['IC512'],
    cursarApr: ['IC321', 'IC322', 'IC323', 'IC324'],
    rendirApr: ['IC321', 'IC322', 'IC323', 'IC324', 'IC512'],
    generalRuleNote: 'Optativa • Requiere todo 2°C de 3° Año aprobado',
    isOptativa: true,
  },
  {
    id: 'ICO528',
    year: 6,
    period: '2°C',
    name: 'Inglés Técnico II',
    cursarReg: [],
    cursarApr: ['IC321', 'IC322', 'IC323', 'IC324'],
    rendirApr: ['IC321', 'IC322', 'IC323', 'IC324'],
    generalRuleNote: 'Optativa • Requiere todo 2°C de 3° Año aprobado',
    isOptativa: true,
  },
];

const YEAR_COLUMNS = [
  { year: 1, title: '1° Año', subtitle: 'Ciclo Básico' },
  { year: 2, title: '2° Año', subtitle: 'Fundamentos' },
  { year: 3, title: '3° Año', subtitle: 'Tecnologías Básicas' },
  { year: 4, title: '4° Año', subtitle: 'Especialización' },
  { year: 5, title: '5° Año', subtitle: 'Integración y Práctica' },
  { year: 6, title: 'Optativas', subtitle: 'Elegir 2 asignaturas (2°C)' },
];

export default function App() {
  // Estado de avance del alumno guardado en localStorage
  // Valores posibles por ID: 'pendiente' | 'regularizada' | 'aprobada'
  const [statusMap, setStatusMap] = useState(() => {
    try {
      const saved = localStorage.getItem('ing_comp_2018_progress');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [selectedId, setSelectedId] = useState('IC311');
  const [hoveredId, setHoveredId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterMode, setFilterMode] = useState('ALL'); // 'ALL', 'CAN_CURSAR', 'CAN_RENDIR', 'APROBADAS', 'REGULARIZADAS', 'PENDIENTES'
  const [showConnections, setShowConnections] = useState(true);
  const [showHelpModal, setShowHelpModal] = useState(false);

  // Referencias para dibujar las líneas conectoras SVG
  const boardRef = useRef(null);
  const cardRefs = useRef({});
  const [svgLines, setSvgLines] = useState([]);

  // Guardar cambios en localStorage
  useEffect(() => {
    try {
      localStorage.setItem('ing_comp_2018_progress', JSON.stringify(statusMap));
    } catch (e) {
      console.error('No se pudo guardar en localStorage', e);
    }
  }, [statusMap]);

  // Mapa rápido por ID
  const subjectsById = useMemo(() => {
    const map = {};
    SUBJECTS_DATA.forEach((s) => {
      map[s.id] = s;
    });
    return map;
  }, []);

  // Calcular qué materias desbloquea cada asignatura (hacia adelante)
  const unlocksMap = useMemo(() => {
    const map = {};
    SUBJECTS_DATA.forEach((s) => {
      map[s.id] = { forCursarReg: [], forCursarApr: [], forRendirApr: [] };
    });
    SUBJECTS_DATA.forEach((target) => {
      target.cursarReg.forEach((reqId) => {
        if (map[reqId]) map[reqId].forCursarReg.push(target.id);
      });
      target.cursarApr.forEach((reqId) => {
        if (map[reqId]) map[reqId].forCursarApr.push(target.id);
      });
      target.rendirApr.forEach((reqId) => {
        if (map[reqId]) map[reqId].forRendirApr.push(target.id);
      });
    });
    return map;
  }, []);

  // Obtener el estado de una materia
  const getSubjectStatus = useCallback(
    (id) => statusMap[id] || 'pendiente',
    [statusMap]
  );

  // Verificar si el alumno cumple las condiciones para CURSAR y para RENDIR una materia
  const checkEligibility = useCallback(
    (subject) => {
      const currentStatus = getSubjectStatus(subject.id);
      const isRegOrApr = (id) => {
        const st = getSubjectStatus(id);
        return st === 'regularizada' || st === 'aprobada';
      };
      const isApr = (id) => getSubjectStatus(id) === 'aprobada';

      // Requisitos para cursar:
      // 1. Todas las de cursarReg deben estar regularizadas o aprobadas
      const missingCursarReg = subject.cursarReg.filter((id) => !isRegOrApr(id));
      // 2. Todas las de cursarApr deben estar aprobadas
      const missingCursarApr = subject.cursarApr.filter((id) => !isApr(id));

      const canCursar =
        missingCursarReg.length === 0 && missingCursarApr.length === 0;

      // Requisitos para rendir:
      // Todas las de rendirApr deben estar aprobadas
      const missingRendirApr = subject.rendirApr.filter((id) => !isApr(id));
      const canRendir = missingRendirApr.length === 0;

      return {
        currentStatus,
        canCursar,
        canRendir,
        missingCursarReg,
        missingCursarApr,
        missingRendirApr,
      };
    },
    [getSubjectStatus]
  );

  // Cambiar estado de una materia haciendo clic (Ciclo: pendiente -> regularizada -> aprobada -> pendiente)
  const cycleStatus = (id, e) => {
    if (e) e.stopPropagation();
    const current = getSubjectStatus(id);
    const next =
      current === 'pendiente'
        ? 'regularizada'
        : current === 'regularizada'
        ? 'aprobada'
        : 'pendiente';

    setStatusMap((prev) => ({
      ...prev,
      [id]: next,
    }));
  };

  // Fijar un estado directo
  const setDirectStatus = (id, newStatus) => {
    setStatusMap((prev) => ({
      ...prev,
      [id]: newStatus,
    }));
  };

  // Acciones rápidas por lote (ej. Aprobar 1° Año, etc.)
  const markYearAs = (yearNum, statusValue) => {
    setStatusMap((prev) => {
      const next = { ...prev };
      SUBJECTS_DATA.filter((s) => s.year === yearNum).forEach((s) => {
        next[s.id] = statusValue;
      });
      return next;
    });
  };

  const resetAllProgress = () => {
    setStatusMap({});
  };

  // Materia activa para inspección / resaltado de relaciones
  const activeSubjectId = hoveredId || selectedId;
  const activeSubject = activeSubjectId ? subjectsById[activeSubjectId] : null;
  const selectedSubject = selectedId ? subjectsById[selectedId] : null;

  // Determinar la relación de cualquier tarjeta respecto a la materia activa
  const getRelationToActive = useCallback(
    (id) => {
      if (!activeSubject) return null;
      if (id === activeSubject.id) return 'ACTIVE';

      const isCursarApr = activeSubject.cursarApr.includes(id);
      const isCursarReg = activeSubject.cursarReg.includes(id);
      const isRendirApr = activeSubject.rendirApr.includes(id);

      if (isCursarApr) return 'REQ_CURSAR_APR';
      if (isCursarReg) return 'REQ_CURSAR_REG';
      if (isRendirApr) return 'REQ_RENDIR_APR';

      // Verificar si la materia activa desbloquea a `id`
      const target = subjectsById[id];
      if (target) {
        if (
          target.cursarReg.includes(activeSubject.id) ||
          target.cursarApr.includes(activeSubject.id) ||
          target.rendirApr.includes(activeSubject.id)
        ) {
          return 'UNLOCKS';
        }
      }

      return null;
    },
    [activeSubject, subjectsById]
  );

  // Calcular líneas SVG entre la materia activa y sus correlativas
  const updateSvgLines = useCallback(() => {
    if (!showConnections || !activeSubject || !boardRef.current) {
      setSvgLines([]);
      return;
    }

    const boardRect = boardRef.current.getBoundingClientRect();
    const activeEl = cardRefs.current[activeSubject.id];
    if (!activeEl) {
      setSvgLines([]);
      return;
    }

    const activeRect = activeEl.getBoundingClientRect();
    const lines = [];

    // 1. Líneas desde requisitos (hacia la materia activa)
    const allReqs = new Set([
      ...activeSubject.cursarApr,
      ...activeSubject.cursarReg,
      ...activeSubject.rendirApr,
    ]);

    allReqs.forEach((reqId) => {
      const reqEl = cardRefs.current[reqId];
      if (!reqEl) return;
      const reqRect = reqEl.getBoundingClientRect();

      let type = 'REQ_RENDIR_APR';
      if (activeSubject.cursarApr.includes(reqId)) type = 'REQ_CURSAR_APR';
      else if (activeSubject.cursarReg.includes(reqId)) type = 'REQ_CURSAR_REG';

      const startX = reqRect.right - boardRect.left;
      const startY = reqRect.top + reqRect.height / 2 - boardRect.top;
      const endX = activeRect.left - boardRect.left;
      const endY = activeRect.top + activeRect.height / 2 - boardRect.top;

      lines.push({
        id: `${reqId}->${activeSubject.id}`,
        startX,
        startY,
        endX,
        endY,
        type,
      });
    });

    // 2. Líneas desde la materia activa hacia las materias que desbloquea
    SUBJECTS_DATA.forEach((target) => {
      const isDirectUnlock =
        target.cursarReg.includes(activeSubject.id) ||
        target.cursarApr.includes(activeSubject.id);

      if (isDirectUnlock) {
        const targetEl = cardRefs.current[target.id];
        if (!targetEl) return;
        const targetRect = targetEl.getBoundingClientRect();

        const startX = activeRect.right - boardRect.left;
        const startY = activeRect.top + activeRect.height / 2 - boardRect.top;
        const endX = targetRect.left - boardRect.left;
        const endY = targetRect.top + targetRect.height / 2 - boardRect.top;

        lines.push({
          id: `${activeSubject.id}->${target.id}`,
          startX,
          startY,
          endX,
          endY,
          type: 'UNLOCKS',
        });
      }
    });

    setSvgLines(lines);
  }, [activeSubject, showConnections]);

  useEffect(() => {
    updateSvgLines();
    window.addEventListener('resize', updateSvgLines);
    return () => window.removeEventListener('resize', updateSvgLines);
  }, [updateSvgLines, statusMap, searchQuery, filterMode]);

  // Estadísticas globales de la carrera
  // Nota: La carrera tiene 38 materias obligatorias + 2 optativas = 40 materias totales para recibirse
  const stats = useMemo(() => {
    const coreSubjects = SUBJECTS_DATA.filter(
      (s) => !s.isOptativa && !s.isPlaceholderOptativa
    );
    const optativasList = SUBJECTS_DATA.filter((s) => s.isOptativa);
    const placeholderOpts = SUBJECTS_DATA.filter((s) => s.isPlaceholderOptativa);

    const coreApproved = coreSubjects.filter(
      (s) => getSubjectStatus(s.id) === 'aprobada'
    ).length;
    const optApprovedCount =
      optativasList.filter((s) => getSubjectStatus(s.id) === 'aprobada').length +
      placeholderOpts.filter((s) => getSubjectStatus(s.id) === 'aprobada').length;

    const effectiveOptApproved = Math.min(2, optApprovedCount);
    const totalApproved = coreApproved + effectiveOptApproved;
    const totalCareer = 40; // 38 obligatorias + 2 optativas

    const totalRegular = SUBJECTS_DATA.filter(
      (s) => !s.isPlaceholderOptativa && getSubjectStatus(s.id) === 'regularizada'
    ).length;

    const availableToCursar = SUBJECTS_DATA.filter((s) => {
      if (s.isPlaceholderOptativa) return false;
      const st = getSubjectStatus(s.id);
      if (st !== 'pendiente') return false;
      return checkEligibility(s).canCursar;
    }).length;

    const percentage = Math.round((totalApproved / totalCareer) * 100);

    return {
      totalApproved,
      totalCareer,
      totalRegular,
      availableToCursar,
      percentage,
    };
  }, [getSubjectStatus, checkEligibility]);

  // Filtrado de búsqueda y estado
  const matchesFilter = useCallback(
    (subject) => {
      const matchesSearch =
        searchQuery.trim() === '' ||
        subject.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        subject.id.toLowerCase().includes(searchQuery.toLowerCase());

      if (!matchesSearch) return false;

      const st = getSubjectStatus(subject.id);
      const elig = checkEligibility(subject);

      switch (filterMode) {
        case 'CAN_CURSAR':
          return st === 'pendiente' && elig.canCursar;
        case 'CAN_RENDIR':
          return st === 'regularizada' && elig.canRendir;
        case 'APROBADAS':
          return st === 'aprobada';
        case 'REGULARIZADAS':
          return st === 'regularizada';
        case 'PENDIENTES':
          return st === 'pendiente';
        default:
          return true;
      }
    },
    [searchQuery, filterMode, getSubjectStatus, checkEligibility]
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* ==========================================
          BARRA SUPERIOR Y ESTADÍSTICAS
      ========================================== */}
      <header className="sticky top-0 z-30 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 px-4 py-3 shadow-lg">
        <div className="max-w-[1800px] mx-auto flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          {/* Título e Identidad */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center shadow-md shadow-indigo-500/20">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-lg md:text-xl font-bold tracking-tight text-white">
                    Ingeniería en Computación
                  </h1>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                    Plan 2018
                  </span>
                </div>
                <p className="text-xs text-slate-400">
                  Mapa Interactivo de Correlatividades y Simulador de Avance • 5 Años
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowHelpModal(true)}
              className="lg:hidden p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
              title="Cómo usar el mapa"
            >
              <HelpCircle className="w-5 h-5" />
            </button>
          </div>

          {/* Métricas de Avance */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 lg:flex lg:items-center lg:gap-4">
            <div className="bg-slate-800/70 border border-slate-700/70 rounded-xl px-3.5 py-2 flex items-center gap-3">
              <div className="p-2 rounded-lg bg-emerald-500/15 text-emerald-400">
                <Award className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs text-slate-400">Aprobadas</div>
                <div className="text-sm font-bold text-white">
                  {stats.totalApproved}{' '}
                  <span className="text-slate-500 font-normal">/ {stats.totalCareer}</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-800/70 border border-slate-700/70 rounded-xl px-3.5 py-2 flex items-center gap-3">
              <div className="p-2 rounded-lg bg-amber-500/15 text-amber-400">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs text-slate-400">Regularizadas</div>
                <div className="text-sm font-bold text-white">{stats.totalRegular}</div>
              </div>
            </div>

            <div className="bg-slate-800/70 border border-slate-700/70 rounded-xl px-3.5 py-2 flex items-center gap-3">
              <div className="p-2 rounded-lg bg-cyan-500/15 text-cyan-400">
                <Unlock className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs text-slate-400">Habilitadas Cursar</div>
                <div className="text-sm font-bold text-cyan-300">
                  {stats.availableToCursar} materias
                </div>
              </div>
            </div>

            {/* Barra de porcentaje */}
            <div className="bg-slate-800/70 border border-slate-700/70 rounded-xl px-3.5 py-2 min-w-[160px]">
              <div className="flex justify-between items-center text-xs mb-1">
                <span className="text-slate-400">Avance Carrera</span>
                <span className="font-bold text-emerald-400">{stats.percentage}%</span>
              </div>
              <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-indigo-500 via-cyan-400 to-emerald-400 transition-all duration-500"
                  style={{ width: `${stats.percentage}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Barra de Controles, Filtros y Acciones Rápidas */}
        <div className="max-w-[1800px] mx-auto mt-3 pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
          {/* Buscador y Filtros */}
          <div className="flex flex-wrap items-center gap-2 flex-1">
            <div className="relative min-w-[220px] flex-1 max-w-xs">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar código (IC311) o materia..."
                className="w-full bg-slate-950 border border-slate-700 focus:border-indigo-500 rounded-lg pl-9 pr-8 py-1.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Botones de Filtro */}
            <div className="flex items-center bg-slate-950 p-1 rounded-lg border border-slate-800 overflow-x-auto">
              {[
                { id: 'ALL', label: 'Todas' },
                { id: 'CAN_CURSAR', label: 'Puedo Cursar' },
                { id: 'CAN_RENDIR', label: 'Puedo Rendir Final' },
                { id: 'REGULARIZADAS', label: 'Regularizadas' },
                { id: 'APROBADAS', label: 'Aprobadas' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setFilterMode(tab.id)}
                  className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors whitespace-nowrap ${
                    filterMode === tab.id
                      ? 'bg-indigo-600 text-white shadow'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Botones de Simulación Rápida por Año */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[11px] text-slate-400 mr-1 hidden sm:inline">
              Autocompletar:
            </span>
            {[1, 2, 3, 4].map((yr) => (
              <button
                key={yr}
                onClick={() => markYearAs(yr, 'aprobada')}
                className="text-xs px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-emerald-950/80 hover:text-emerald-300 hover:border-emerald-700/60 border border-slate-700 text-slate-300 transition flex items-center gap-1"
                title={`Marcar todas las materias de ${yr}° Año como Aprobadas`}
              >
                <CheckCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>{yr}° Año</span>
              </button>
            ))}

            <button
              onClick={() => setShowConnections((v) => !v)}
              className={`text-xs px-2.5 py-1.5 rounded-lg border transition flex items-center gap-1.5 ${
                showConnections
                  ? 'bg-indigo-950/60 border-indigo-500/50 text-indigo-300'
                  : 'bg-slate-800 border-slate-700 text-slate-400'
              }`}
              title="Mostrar u ocultar líneas conectoras de correlatividades"
            >
              <Eye className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Líneas</span>
            </button>

            <button
              onClick={resetAllProgress}
              className="text-xs px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-rose-950/70 hover:text-rose-300 border border-slate-700 text-slate-300 transition flex items-center gap-1"
              title="Reiniciar todo el progreso"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reiniciar</span>
            </button>

            <button
              onClick={() => setShowHelpModal(true)}
              className="hidden lg:flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 transition"
            >
              <HelpCircle className="w-3.5 h-3.5 text-indigo-400" />
              <span>Guía</span>
            </button>
          </div>
        </div>
      </header>

      {/* ==========================================
          LEYENDA RÁPIDA DE COLORES Y CORRELATIVAS
      ========================================== */}
      <div className="bg-slate-900/50 border-b border-slate-800/80 px-4 py-2">
        <div className="max-w-[1800px] mx-auto flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400">
          <div className="flex flex-wrap items-center gap-4">
            <span className="font-semibold text-slate-300 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-indigo-400" />
              Al seleccionar una materia:
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-sm bg-amber-500/30 border border-amber-400 inline-block" />
              <strong className="text-amber-300">Regularizada</strong> para cursar
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-sm bg-emerald-500/30 border border-emerald-400 inline-block" />
              <strong className="text-emerald-300">Aprobada</strong> para cursar
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-sm bg-purple-500/30 border border-purple-400 inline-block" />
              <strong className="text-purple-300">Aprobada</strong> para rendir
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-sm bg-cyan-500/30 border border-cyan-400 inline-block" />
              <strong className="text-cyan-300">Desbloquea</strong> (Hacia adelante)
            </span>
          </div>
          <div className="text-[11px] text-slate-400">
            💡 <strong>Clic en una materia</strong> para ver detalles •{' '}
            <strong>Clic en su botón de estado</strong> para cambiar entre{' '}
            <span className="text-slate-300">Pendiente</span> →{' '}
            <span className="text-amber-300">Regular</span> →{' '}
            <span className="text-emerald-300">Aprobada</span>
          </div>
        </div>
      </div>

      {/* ==========================================
          CONTENEDOR PRINCIPAL: MAPA + PANEL LATERAL
      ========================================== */}
      <div className="flex-1 flex flex-col xl:flex-row max-w-[1800px] w-full mx-auto overflow-hidden">
        {/* TABLERO DE COLUMNAS POR AÑO */}
        <div className="flex-1 overflow-x-auto overflow-y-auto p-4 md:p-6">
          <div
            ref={boardRef}
            className="relative min-w-[1280px] grid grid-cols-6 gap-4 pb-8"
          >
            {/* CAPA SVG DE CONEXIONES */}
            {showConnections && (
              <svg className="pointer-events-none absolute inset-0 w-full h-full z-10 overflow-visible">
                <defs>
                  <marker
                    id="arrow-amber"
                    markerWidth="6"
                    markerHeight="6"
                    refX="5"
                    refY="3"
                    orient="auto"
                  >
                    <path d="M0,0 L6,3 L0,6 Z" fill="#f59e0b" />
                  </marker>
                  <marker
                    id="arrow-emerald"
                    markerWidth="6"
                    markerHeight="6"
                    refX="5"
                    refY="3"
                    orient="auto"
                  >
                    <path d="M0,0 L6,3 L0,6 Z" fill="#10b981" />
                  </marker>
                  <marker
                    id="arrow-purple"
                    markerWidth="6"
                    markerHeight="6"
                    refX="5"
                    refY="3"
                    orient="auto"
                  >
                    <path d="M0,0 L6,3 L0,6 Z" fill="#a855f7" />
                  </marker>
                  <marker
                    id="arrow-cyan"
                    markerWidth="6"
                    markerHeight="6"
                    refX="5"
                    refY="3"
                    orient="auto"
                  >
                    <path d="M0,0 L6,3 L0,6 Z" fill="#06b6d4" />
                  </marker>
                </defs>

                {svgLines.map((line) => {
                  const dx = Math.abs(line.endX - line.startX) * 0.45;
                  const d = `M ${line.startX} ${line.startY} C ${
                    line.startX + dx
                  } ${line.startY}, ${line.endX - dx} ${line.endY}, ${
                    line.endX
                  } ${line.endY}`;

                  let stroke = '#94a3b8';
                  let dash = '';
                  let marker = '';

                  if (line.type === 'REQ_CURSAR_REG') {
                    stroke = '#f59e0b';
                    marker = 'url(#arrow-amber)';
                  } else if (line.type === 'REQ_CURSAR_APR') {
                    stroke = '#10b981';
                    marker = 'url(#arrow-emerald)';
                  } else if (line.type === 'REQ_RENDIR_APR') {
                    stroke = '#a855f7';
                    dash = '4 4';
                    marker = 'url(#arrow-purple)';
                  } else if (line.type === 'UNLOCKS') {
                    stroke = '#06b6d4';
                    marker = 'url(#arrow-cyan)';
                  }

                  return (
                    <path
                      key={line.id}
                      d={d}
                      fill="none"
                      stroke={stroke}
                      strokeWidth="2.2"
                      strokeDasharray={dash}
                      markerEnd={marker}
                      className="opacity-80 transition-all duration-300"
                    />
                  );
                })}
              </svg>
            )}

            {/* COLUMNAS DE CADA AÑO */}
            {YEAR_COLUMNS.map((col) => {
              const colSubjects = SUBJECTS_DATA.filter((s) => s.year === col.year);
              const periods = ['ANUAL', '1°C', '2°C'];

              return (
                <div
                  key={col.year}
                  className="flex flex-col bg-slate-900/40 border border-slate-800/80 rounded-2xl p-3 relative"
                >
                  {/* Encabezado de Columna */}
                  <div className="mb-3 pb-2.5 border-b border-slate-800 flex items-center justify-between">
                    <div>
                      <h2 className="text-sm font-bold text-white flex items-center gap-1.5">
                        {col.title}
                      </h2>
                      <p className="text-[11px] text-slate-400">{col.subtitle}</p>
                    </div>
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-slate-800 text-slate-300">
                      {
                        colSubjects.filter(
                          (s) => getSubjectStatus(s.id) === 'aprobada'
                        ).length
                      }
                      /{colSubjects.length}
                    </span>
                  </div>

                  {/* Regla general de 4° y 5° año */}
                  {col.year === 4 && (
                    <div className="mb-3 p-2 rounded-lg bg-indigo-950/40 border border-indigo-500/30 text-[11px] text-indigo-200 leading-tight">
                      <strong>Regla de Ciclo:</strong> 1°C pide todo 2° Año (1°C)
                      aprobado. 2°C pide todo 2° Año (2°C) aprobado.
                    </div>
                  )}
                  {col.year === 5 && (
                    <div className="mb-3 p-2 rounded-lg bg-indigo-950/40 border border-indigo-500/30 text-[11px] text-indigo-200 leading-tight">
                      <strong>Regla de Ciclo:</strong> 1°C pide todo 3° Año (1°C)
                      aprobado. 2°C pide todo 3° Año (2°C) aprobado.
                    </div>
                  )}
                  {col.year === 6 && (
                    <div className="mb-3 p-2 rounded-lg bg-cyan-950/40 border border-cyan-500/30 text-[11px] text-cyan-200 leading-tight">
                      <strong>Requisito General:</strong> Para cursar cualquier
                      Optativa se requiere todo el 2°C de 3° Año aprobado.
                    </div>
                  )}

                  {/* Grupos por Régimen (Anual, 1°C, 2°C) */}
                  <div className="space-y-4 flex-1">
                    {periods.map((period) => {
                      const group = colSubjects.filter((s) => s.period === period);
                      if (group.length === 0) return null;

                      return (
                        <div key={period} className="space-y-2">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-800/90 text-slate-300">
                              {period === 'ANUAL'
                                ? 'Régimen Anual'
                                : period === '1°C'
                                ? '1° Cuatrimestre'
                                : '2° Cuatrimestre'}
                            </span>
                            <div className="h-px bg-slate-800 flex-1" />
                          </div>

                          <div className="space-y-2.5">
                            {group.map((subject) => {
                              const st = getSubjectStatus(subject.id);
                              const elig = checkEligibility(subject);
                              const relation = getRelationToActive(subject.id);
                              const isVisible = matchesFilter(subject);

                              // Estilos dinámicos según relación o estado
                              let cardStyle =
                                'bg-slate-900/90 border-slate-800 hover:border-slate-600';
                              let relationBadge = null;

                              if (relation === 'ACTIVE') {
                                cardStyle =
                                  'bg-indigo-950/90 border-indigo-400 ring-2 ring-indigo-500/50 shadow-lg shadow-indigo-500/10 z-20';
                              } else if (relation === 'REQ_CURSAR_APR') {
                                cardStyle =
                                  'bg-emerald-950/80 border-emerald-400 ring-1 ring-emerald-400/50 z-20';
                                relationBadge = (
                                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                                    Pide Aprobada (Cursar)
                                  </span>
                                );
                              } else if (relation === 'REQ_CURSAR_REG') {
                                cardStyle =
                                  'bg-amber-950/80 border-amber-400 ring-1 ring-amber-400/50 z-20';
                                relationBadge = (
                                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40">
                                    Pide Regular (Cursar)
                                  </span>
                                );
                              } else if (relation === 'REQ_RENDIR_APR') {
                                cardStyle =
                                  'bg-purple-950/80 border-purple-400 ring-1 ring-purple-400/50 z-20';
                                relationBadge = (
                                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/40">
                                    Pide Aprobada (Rendir)
                                  </span>
                                );
                              } else if (relation === 'UNLOCKS') {
                                cardStyle =
                                  'bg-cyan-950/80 border-cyan-400 ring-1 ring-cyan-400/50 z-20';
                                relationBadge = (
                                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                                    Habilita esta materia
                                  </span>
                                );
                              } else {
                                // Color por estado propio cuando no está involucrada en un highlight
                                if (st === 'aprobada') {
                                  cardStyle =
                                    'bg-emerald-950/25 border-emerald-700/50 hover:border-emerald-500/70';
                                } else if (st === 'regularizada') {
                                  cardStyle =
                                    'bg-amber-950/25 border-amber-700/50 hover:border-amber-500/70';
                                } else if (elig.canCursar) {
                                  cardStyle =
                                    'bg-slate-900 border-cyan-500/40 hover:border-cyan-400';
                                }
                              }

                              return (
                                <div
                                  key={subject.id}
                                  ref={(el) => {
                                    cardRefs.current[subject.id] = el;
                                  }}
                                  onClick={() => setSelectedId(subject.id)}
                                  onMouseEnter={() => setHoveredId(subject.id)}
                                  onMouseLeave={() => setHoveredId(null)}
                                  className={`relative rounded-xl border p-2.5 transition-all duration-200 cursor-pointer select-none ${cardStyle} ${
                                    !isVisible ? 'opacity-20 scale-95' : 'opacity-100'
                                  }`}
                                >
                                  {/* Fila Superior: Código + Estado Clickeable */}
                                  <div className="flex items-center justify-between gap-1 mb-1.5">
                                    <div className="flex items-center gap-1.5">
                                      <span className="text-xs font-mono font-bold px-1.5 py-0.5 rounded bg-slate-800 text-slate-200 border border-slate-700">
                                        {subject.id}
                                      </span>
                                      {st === 'pendiente' && elig.canCursar && (
                                        <span
                                          className="text-[10px] px-1.5 py-0.5 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 font-medium flex items-center gap-0.5"
                                          title="Cumplís las correlativas para cursar esta materia"
                                        >
                                          <Unlock className="w-2.5 h-2.5" />
                                          Cursable
                                        </span>
                                      )}
                                      {st === 'pendiente' && !elig.canCursar && (
                                        <span
                                          className="text-[10px] text-slate-500 flex items-center"
                                          title="Faltan correlativas para cursar"
                                        >
                                          <Lock className="w-3 h-3" />
                                        </span>
                                      )}
                                    </div>

                                    {/* Botón rápido de estado */}
                                    <button
                                      onClick={(e) => cycleStatus(subject.id, e)}
                                      className={`text-[10px] font-semibold px-2 py-0.5 rounded-md border transition flex items-center gap-1 ${
                                        st === 'aprobada'
                                          ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300 hover:bg-emerald-500/30'
                                          : st === 'regularizada'
                                          ? 'bg-amber-500/20 border-amber-500/50 text-amber-300 hover:bg-amber-500/30'
                                          : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-slate-200 hover:bg-slate-700'
                                      }`}
                                      title="Clic para cambiar estado: Pendiente → Regularizada → Aprobada"
                                    >
                                      {st === 'aprobada' && (
                                        <>
                                          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                                          Aprobada
                                        </>
                                      )}
                                      {st === 'regularizada' && (
                                        <>
                                          <Clock className="w-3 h-3 text-amber-400" />
                                          Regular
                                        </>
                                      )}
                                      {st === 'pendiente' && <>Pendiente</>}
                                    </button>
                                  </div>

                                  {/* Nombre de la Asignatura */}
                                  <h3 className="text-xs font-semibold text-slate-100 leading-snug mb-1.5">
                                    {subject.name}
                                  </h3>

                                  {/* Badge de Relación si está resaltada */}
                                  {relationBadge && (
                                    <div className="mt-1">{relationBadge}</div>
                                  )}

                                  {/* Resumen compacto de requisitos en la tarjeta */}
                                  {!relationBadge && (
                                    <div className="flex flex-wrap items-center justify-between gap-1 pt-1.5 border-t border-slate-800/80 text-[10px] text-slate-400">
                                      <div className="flex items-center gap-1.5">
                                        {subject.cursarReg.length === 0 &&
                                        subject.cursarApr.length === 0 ? (
                                          <span className="text-slate-500">
                                            Sin correlativas
                                          </span>
                                        ) : (
                                          <>
                                            {subject.cursarReg.length > 0 && (
                                              <span
                                                className="text-amber-400/90"
                                                title={`Regularizadas para cursar: ${subject.cursarReg.join(
                                                  ', '
                                                )}`}
                                              >
                                                Reg: {subject.cursarReg.length}
                                              </span>
                                            )}
                                            {subject.cursarApr.length > 0 && (
                                              <span
                                                className="text-emerald-400/90"
                                                title={`Aprobadas para cursar: ${subject.cursarApr.join(
                                                  ', '
                                                )}`}
                                              >
                                                Apr: {subject.cursarApr.length}
                                              </span>
                                            )}
                                          </>
                                        )}
                                      </div>

                                      {st === 'regularizada' && (
                                        <span
                                          className={`font-medium ${
                                            elig.canRendir
                                              ? 'text-emerald-400'
                                              : 'text-rose-400'
                                          }`}
                                        >
                                          {elig.canRendir
                                            ? '✓ Puede Rendir'
                                            : '✗ Falta Final Previo'}
                                        </span>
                                      )}
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ==========================================
            PANEL INSPECTOR DETALLADO (DERECHA / ABAJO)
        ========================================== */}
        <aside className="w-full xl:w-96 bg-slate-900 border-t xl:border-t-0 xl:border-l border-slate-800 p-5 overflow-y-auto shrink-0">
          {selectedSubject ? (
            (() => {
              const elig = checkEligibility(selectedSubject);
              const unlocks = unlocksMap[selectedSubject.id] || {
                forCursarReg: [],
                forCursarApr: [],
                forRendirApr: [],
              };
              const allUnlockedIds = Array.from(
                new Set([
                  ...unlocks.forCursarReg,
                  ...unlocks.forCursarApr,
                  ...unlocks.forRendirApr,
                ])
              );

              return (
                <div className="space-y-5">
                  {/* Cabecera del Inspector */}
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-md bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                        {selectedSubject.id}
                      </span>
                      <span className="text-xs text-slate-400">
                        {selectedSubject.year === 6
                          ? 'Asignatura Optativa'
                          : `${selectedSubject.year}° Año`}{' '}
                        •{' '}
                        {selectedSubject.period === 'ANUAL'
                          ? 'Anual'
                          : selectedSubject.period}
                      </span>
                    </div>

                    <h2 className="text-lg font-bold text-white leading-snug">
                      {selectedSubject.name}
                    </h2>

                    {selectedSubject.generalRuleNote && (
                      <div className="mt-2 p-2.5 rounded-lg bg-indigo-950/50 border border-indigo-500/30 text-xs text-indigo-200 flex items-start gap-2">
                        <Info className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                        <span>{selectedSubject.generalRuleNote}</span>
                      </div>
                    )}
                  </div>

                  {/* Selector de Estado de la Materia */}
                  <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                    <span className="text-xs font-semibold text-slate-400 block mb-2">
                      Tu estado en esta asignatura:
                    </span>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        {
                          key: 'pendiente',
                          label: 'Pendiente',
                          activeClass:
                            'bg-slate-700 text-white border-slate-500',
                        },
                        {
                          key: 'regularizada',
                          label: 'Regular',
                          activeClass:
                            'bg-amber-500/20 text-amber-300 border-amber-500',
                        },
                        {
                          key: 'aprobada',
                          label: 'Aprobada',
                          activeClass:
                            'bg-emerald-500/20 text-emerald-300 border-emerald-500',
                        },
                      ].map((item) => (
                        <button
                          key={item.key}
                          onClick={() =>
                            setDirectStatus(selectedSubject.id, item.key)
                          }
                          className={`py-2 px-2 rounded-lg text-xs font-semibold border transition flex items-center justify-center gap-1 ${
                            elig.currentStatus === item.key
                              ? item.activeClass
                              : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800'
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>

                    {/* Diagnóstico de disponibilidad */}
                    <div className="mt-3 pt-3 border-t border-slate-800/80 flex flex-col gap-1.5 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">¿Puedo cursarla?</span>
                        {elig.canCursar ? (
                          <span className="text-emerald-400 font-semibold flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Sí, habilitada
                          </span>
                        ) : (
                          <span className="text-rose-400 font-semibold flex items-center gap-1">
                            <Lock className="w-3.5 h-3.5" /> Faltan correlativas
                          </span>
                        )}
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">
                          ¿Puedo rendir el final?
                        </span>
                        {elig.canRendir ? (
                          <span className="text-emerald-400 font-semibold flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Sí, habilitada
                          </span>
                        ) : (
                          <span className="text-rose-400 font-semibold flex items-center gap-1">
                            <Lock className="w-3.5 h-3.5" /> Faltan aprobadas
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* SECCIÓN 1: REQUISITOS PARA CURSAR */}
                  <div className="space-y-3">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                      <ArrowLeft className="w-3.5 h-3.5 text-amber-400" />
                      Requisitos para Cursar
                    </h3>

                    {/* Regularizadas para cursar */}
                    <div className="bg-slate-950/70 rounded-xl p-3 border border-slate-800/90">
                      <div className="text-xs font-semibold text-amber-300 mb-2 flex items-center justify-between">
                        <span>Tener Regularizada (o Aprobada):</span>
                        <span className="font-mono text-[11px]">
                          {selectedSubject.cursarReg.length}
                        </span>
                      </div>
                      {selectedSubject.cursarReg.length === 0 ? (
                        <p className="text-xs text-slate-500">
                          No exige materias regularizadas.
                        </p>
                      ) : (
                        <div className="space-y-1.5">
                          {selectedSubject.cursarReg.map((reqId) => {
                            const reqSub = subjectsById[reqId];
                            const st = getSubjectStatus(reqId);
                            const ok = st === 'regularizada' || st === 'aprobada';
                            return (
                              <div
                                key={reqId}
                                onClick={() => setSelectedId(reqId)}
                                className={`p-2 rounded-lg border text-xs flex items-center justify-between cursor-pointer transition ${
                                  ok
                                    ? 'bg-emerald-950/20 border-emerald-800/50 text-emerald-200'
                                    : 'bg-rose-950/20 border-rose-800/40 text-slate-300 hover:border-slate-600'
                                }`}
                              >
                                <div className="flex items-center gap-2 truncate">
                                  <span className="font-mono font-bold text-[11px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-200">
                                    {reqId}
                                  </span>
                                  <span className="truncate">{reqSub?.name}</span>
                                </div>
                                <span
                                  className={`text-[10px] font-semibold px-1.5 py-0.5 rounded shrink-0 ${
                                    ok
                                      ? 'bg-emerald-500/20 text-emerald-300'
                                      : 'bg-rose-500/20 text-rose-300'
                                  }`}
                                >
                                  {ok ? 'Cumple' : 'Falta Reg.'}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>

                    {/* Aprobadas para cursar */}
                    <div className="bg-slate-950/70 rounded-xl p-3 border border-slate-800/90">
                      <div className="text-xs font-semibold text-emerald-300 mb-2 flex items-center justify-between">
                        <span>Tener Aprobada (Final):</span>
                        <span className="font-mono text-[11px]">
                          {selectedSubject.cursarApr.length}
                        </span>
                      </div>
                      {selectedSubject.cursarApr.length === 0 ? (
                        <p className="text-xs text-slate-500">
                          No exige materias aprobadas para cursar.
                        </p>
                      ) : (
                        <div className="space-y-1.5">
                          {selectedSubject.cursarApr.map((reqId) => {
                            const reqSub = subjectsById[reqId];
                            const st = getSubjectStatus(reqId);
                            const ok = st === 'aprobada';
                            return (
                              <div
                                key={reqId}
                                onClick={() => setSelectedId(reqId)}
                                className={`p-2 rounded-lg border text-xs flex items-center justify-between cursor-pointer transition ${
                                  ok
                                    ? 'bg-emerald-950/20 border-emerald-800/50 text-emerald-200'
                                    : 'bg-rose-950/20 border-rose-800/40 text-slate-300 hover:border-slate-600'
                                }`}
                              >
                                <div className="flex items-center gap-2 truncate">
                                  <span className="font-mono font-bold text-[11px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-200">
                                    {reqId}
                                  </span>
                                  <span className="truncate">{reqSub?.name}</span>
                                </div>
                                <span
                                  className={`text-[10px] font-semibold px-1.5 py-0.5 rounded shrink-0 ${
                                    ok
                                      ? 'bg-emerald-500/20 text-emerald-300'
                                      : 'bg-rose-500/20 text-rose-300'
                                  }`}
                                >
                                  {ok ? 'Aprobada' : 'Falta Final'}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* SECCIÓN 2: REQUISITOS PARA RENDIR FINAL */}
                  <div className="space-y-2">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                      <GraduationCap className="w-3.5 h-3.5 text-purple-400" />
                      Para Rendir Examen Final
                    </h3>
                    <div className="bg-slate-950/70 rounded-xl p-3 border border-slate-800/90">
                      <div className="text-xs font-semibold text-purple-300 mb-2 flex items-center justify-between">
                        <span>Exige Final Aprobado de:</span>
                        <span className="font-mono text-[11px]">
                          {selectedSubject.rendirApr.length}
                        </span>
                      </div>
                      {selectedSubject.rendirApr.length === 0 ? (
                        <p className="text-xs text-slate-500">
                          Sin correlativas para rendir.
                        </p>
                      ) : (
                        <div className="flex flex-wrap gap-1.5">
                          {selectedSubject.rendirApr.map((reqId) => {
                            const ok = getSubjectStatus(reqId) === 'aprobada';
                            return (
                              <button
                                key={reqId}
                                onClick={() => setSelectedId(reqId)}
                                className={`text-xs font-mono px-2 py-1 rounded border transition flex items-center gap-1 ${
                                  ok
                                    ? 'bg-emerald-950/40 border-emerald-600/50 text-emerald-300'
                                    : 'bg-slate-900 border-slate-700 text-slate-300 hover:border-purple-400'
                                }`}
                                title={subjectsById[reqId]?.name}
                              >
                                {reqId}
                                {ok ? (
                                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                                ) : (
                                  <Clock className="w-3 h-3 text-rose-400" />
                                )}
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* SECCIÓN 3: QUÉ MATERIAS DESBLOQUEA HACIA ADELANTE */}
                  <div className="space-y-2">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                      <ArrowRight className="w-3.5 h-3.5 text-cyan-400" />
                      Materias que Desbloquea ({allUnlockedIds.length})
                    </h3>
                    <div className="bg-slate-950/70 rounded-xl p-3 border border-slate-800/90">
                      {allUnlockedIds.length === 0 ? (
                        <p className="text-xs text-slate-500">
                          Esta asignatura no es correlativa de materias posteriores.
                        </p>
                      ) : (
                        <div className="space-y-1.5">
                          {allUnlockedIds.map((targetId) => {
                            const targetSub = subjectsById[targetId];
                            if (!targetSub) return null;
                            const needsReg =
                              targetSub.cursarReg.includes(selectedSubject.id);
                            const needsApr =
                              targetSub.cursarApr.includes(selectedSubject.id);

                            return (
                              <div
                                key={targetId}
                                onClick={() => setSelectedId(targetId)}
                                className="p-2 rounded-lg bg-slate-900/90 border border-slate-800 hover:border-cyan-500/50 text-xs flex items-center justify-between cursor-pointer transition"
                              >
                                <div className="flex items-center gap-2 truncate">
                                  <span className="font-mono font-bold text-[11px] px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                                    {targetId}
                                  </span>
                                  <span className="truncate text-slate-200">
                                    {targetSub.name}
                                  </span>
                                </div>
                                <span className="text-[10px] text-slate-400 shrink-0 ml-2">
                                  {needsApr
                                    ? 'Pide Final'
                                    : needsReg
                                    ? 'Pide Reg.'
                                    : 'Para Rendir'}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })()
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center text-slate-500 py-12">
              <BookOpen className="w-10 h-10 mb-2 stroke-1" />
              <p className="text-sm">
                Seleccioná cualquier materia del mapa para inspeccionar todas sus
                correlatividades.
              </p>
            </div>
          )}
        </aside>
      </div>

      {/* ==========================================
          MODAL DE AYUDA / REGLAS DEL PLAN 2018
      ========================================== */}
      {showHelpModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-indigo-400" />
                Cómo usar el Mapa Interactivo (Plan 2018)
              </h3>
              <button
                onClick={() => setShowHelpModal(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-300 leading-relaxed">
              <p>
                <strong>1. Explorá Correlatividades al Instante:</strong> Pasá el
                mouse o hacé clic sobre cualquier materia para ver conectadas en{' '}
                <span className="text-amber-300 font-semibold">Amarillo</span> las
                que necesitás regularizar, en{' '}
                <span className="text-emerald-300 font-semibold">Verde</span> las
                que necesitás aprobar para cursar, y en{' '}
                <span className="text-cyan-300 font-semibold">Celeste</span> las
                materias futuras que destraba.
              </p>
              <p>
                <strong>2. Simulá tu Avance Académico:</strong> Hacé clic en el
                botón de estado de cada tarjeta (<em>Pendiente → Regular → Aprobada</em>)
                o usá los botones rápidos de <strong>Autocompletar Año</strong> en
                la barra superior. Tu progreso queda guardado automáticamente en tu
                navegador.
              </p>
              <p>
                <strong>3. Reglas Generales de Ciclo Incluidas:</strong>
              </p>
              <ul className="list-disc pl-5 space-y-1 text-slate-400">
                <li>
                  <strong>4° Año (1°C):</strong> Exige tener aprobadas todas las del
                  1°C de 2° Año (IC211, IC212, IC213).
                </li>
                <li>
                  <strong>4° Año (2°C):</strong> Exige tener aprobadas todas las del
                  2°C de 2° Año (IC221, IC222, IC223, IC224).
                </li>
                <li>
                  <strong>5° Año (1°C):</strong> Exige tener aprobadas todas las del
                  1°C de 3° Año (IC311 a IC315).
                </li>
                <li>
                  <strong>5° Año (2°C) y Optativas:</strong> Exige tener aprobadas
                  todas las del 2°C de 3° Año (IC321 a IC324).
                </li>
              </ul>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setShowHelpModal(false)}
                className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition"
              >
                Entendido
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}