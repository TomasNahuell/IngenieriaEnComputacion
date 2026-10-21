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
  EyeOff,
  User,
  Trash2,
  HelpCircle,
  AlertTriangle,
  XCircle,
  AlertCircle,
  TrendingUp,
  BarChart3,
  FileSpreadsheet,
  Zap,
  Target,
  Edit3,
  Flame,
  Check,
  Calendar,
  Save,
  Share2
} from 'lucide-react';

// Tipos de estado posibles para una materia
export type SubjectStatus =
  | 'pendiente'
  | 'en_curso'
  | 'condicional'
  | 'regularizada'
  | 'aprobada'
  | 'libre';

export interface GradeInfo {
  grade?: number;
  statusText: string;
  origin: string;
}

// ==========================================
// DATOS DEL PLAN DE ESTUDIOS 2018 (ACTUALIZADOS)
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
    cursarReg: [],
    cursarApr: [],
    rendirApr: [],
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
    cursarReg: ['IC111', 'IC103'],
    cursarApr: [],
    rendirApr: ['IC111', 'IC103'],
  },
  {
    id: 'IC221',
    year: 2,
    period: '2°C',
    name: 'Arquitectura de Computadoras',
    cursarReg: ['IC112'],
    cursarApr: ['IC111'],
    rendirApr: ['IC111', 'IC112'],
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
    cursarReg: ['IC212', 'IC102', 'IC101'],
    cursarApr: [],
    rendirApr: ['IC212', 'IC102', 'IC101'],
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
    rendirApr: ['IC211'],
  },
  {
    id: 'IC312',
    year: 3,
    period: '1°C',
    name: 'Circuitos Eléctricos',
    cursarReg: ['IC223', 'IC222'],
    cursarApr: ['IC102', 'IC101', 'IC211'],
    rendirApr: ['IC223', 'IC222'],
  },
  {
    id: 'IC313',
    year: 3,
    period: '1°C',
    name: 'Materiales y Dispositivos Electrónicos',
    cursarReg: ['IC122', 'IC223'],
    cursarApr: ['IC101', 'IC102'],
    rendirApr: ['IC122', 'IC223'],
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
    rendirApr: ['IC103', 'IC221'],
  },
  {
    id: 'IC321',
    year: 3,
    period: '2°C',
    name: 'Electrónica Analógica',
    cursarReg: ['IC313', 'IC112', 'IC312'],
    cursarApr: [],
    rendirApr: ['IC313', 'IC312', 'IC112'],
  },
  {
    id: 'IC322',
    year: 3,
    period: '2°C',
    name: 'Fundamentos de Computación II',
    cursarReg: ['IC213'],
    cursarApr: ['IC103', 'IC111'],
    rendirApr: ['IC213'],
  },
  {
    id: 'IC323',
    year: 3,
    period: '2°C',
    name: 'Comunicación de Datos',
    cursarReg: ['IC222', 'IC223'],
    cursarApr: ['IC101', 'IC102'],
    rendirApr: ['IC222', 'IC223'],
  },
  {
    id: 'IC324',
    year: 3,
    period: '2°C',
    name: 'Señales y Sistemas',
    cursarReg: ['IC222'],
    cursarApr: ['IC101', 'IC102'],
    rendirApr: ['IC222'],
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
  },
  {
    id: 'IC412',
    year: 4,
    period: '1°C',
    name: 'Redes I',
    cursarReg: ['IC221', 'IC323'],
    cursarApr: ['IC211', 'IC212', 'IC213'],
    rendirApr: ['IC213', 'IC221', 'IC323'],
  },
  {
    id: 'IC413',
    year: 4,
    period: '1°C',
    name: 'Ingeniería de Software I',
    cursarReg: ['IC224', 'IC311', 'IC314'],
    cursarApr: ['IC211', 'IC212', 'IC213'],
    rendirApr: ['IC211', 'IC212', 'IC224', 'IC311', 'IC314'],
  },
  {
    id: 'IC414',
    year: 4,
    period: '1°C',
    name: 'Bases de Datos',
    cursarReg: ['IC224'],
    cursarApr: ['IC211', 'IC212', 'IC213'],
    rendirApr: ['IC211', 'IC212', 'IC224'],
  },
  {
    id: 'IC415',
    year: 4,
    period: '1°C',
    name: 'Inteligencia Computacional',
    cursarReg: ['IC224', 'IC322', 'IC311', 'IC324'],
    cursarApr: ['IC211', 'IC212', 'IC213'],
    rendirApr: ['IC224', 'IC322', 'IC211', 'IC212', 'IC324', 'IC311'],
  },
  {
    id: 'IC421',
    year: 4,
    period: '2°C',
    name: 'Redes II',
    cursarReg: ['IC412'],
    cursarApr: ['IC221', 'IC222', 'IC223', 'IC224', 'IC323'],
    rendirApr: ['IC224', 'IC412'],
  },
  {
    id: 'IC422',
    year: 4,
    period: '2°C',
    name: 'Sistemas Embebidos',
    cursarReg: ['IC323', 'IC411'],
    cursarApr: ['IC221', 'IC222', 'IC223', 'IC224'],
    rendirApr: ['IC224', 'IC411', 'IC221', 'IC323'],
  },
  {
    id: 'IC423',
    year: 4,
    period: '2°C',
    name: 'Ingeniería de Software II',
    cursarReg: ['IC413'],
    cursarApr: ['IC221', 'IC222', 'IC223', 'IC224'],
    rendirApr: ['IC221', 'IC222', 'IC223', 'IC413'],
  },
  {
    id: 'IC424',
    year: 4,
    period: '2°C',
    name: 'Sistemas de Control y Automatización',
    cursarReg: ['IC324', 'IC411', 'IC312', 'IC321'],
    cursarApr: ['IC221', 'IC222', 'IC223', 'IC224'],
    rendirApr: ['IC224', 'IC324', 'IC411', 'IC312', 'IC321', 'IC221'],
  },

  // QUINTO AÑO
  {
    id: 'IC511',
    year: 5,
    period: '1°C',
    name: 'Internet de las Cosas, Sensores y Redes',
    cursarReg: ['IC421', 'IC422'],
    cursarApr: ['IC311', 'IC312', 'IC313', 'IC314', 'IC315', 'IC411', 'IC412'],
    rendirApr: ['IC311', 'IC312', 'IC313', 'IC314', 'IC315', 'IC421', 'IC422'],
  },
  {
    id: 'IC512',
    year: 5,
    period: '1°C',
    name: 'Procesamiento Digital de Señales',
    cursarReg: ['IC324', 'IC422'],
    cursarApr: ['IC311', 'IC312', 'IC313', 'IC314', 'IC315'],
    rendirApr: ['IC311', 'IC312', 'IC313', 'IC314', 'IC315', 'IC324', 'IC422'],
  },
  {
    id: 'IC513',
    year: 5,
    period: '1°C',
    name: 'Economía',
    cursarReg: [],
    cursarApr: ['IC311', 'IC312', 'IC313', 'IC314', 'IC315'],
    rendirApr: ['IC311', 'IC312', 'IC313', 'IC314', 'IC315'],
  },
  {
    id: 'IC514',
    year: 5,
    period: '2°C',
    name: 'Higiene, Seguridad y Medio Ambiente',
    cursarReg: [],
    cursarApr: ['IC321', 'IC322', 'IC323', 'IC324'],
    rendirApr: ['IC321', 'IC322', 'IC323', 'IC324'],
  },
  {
    id: 'IC515',
    year: 5,
    period: '1°C',
    name: 'Gestión de Proyectos',
    cursarReg: ['IC413'],
    cursarApr: ['IC311', 'IC312', 'IC313', 'IC314', 'IC315'],
    rendirApr: ['IC312', 'IC313', 'IC315', 'IC413'],
  },
  {
    id: 'IC521',
    year: 5,
    period: '2°C',
    name: 'Legislación',
    cursarReg: [],
    cursarApr: ['IC321', 'IC322', 'IC323', 'IC324'],
    rendirApr: ['IC321', 'IC322', 'IC323', 'IC324'],
  },
  {
    id: 'IC522',
    year: 5,
    period: '2°C',
    name: 'Proyecto Final Integrador',
    cursarReg: ['IC422', 'IC515'],
    cursarApr: ['IC321', 'IC322', 'IC323', 'IC324'],
    rendirApr: ['IC321', 'IC322', 'IC323', 'IC324', 'IC422', 'IC515'],
  },
  {
    id: 'ICO51',
    year: 5,
    period: '2°C',
    name: 'Optativa I (Elegir de columna)',
    cursarReg: [],
    cursarApr: ['IC321', 'IC322', 'IC323', 'IC324'],
    rendirApr: ['IC321', 'IC322', 'IC323', 'IC324'],
    isPlaceholderOptativa: true,
  },
  {
    id: 'ICO52',
    year: 5,
    period: '2°C',
    name: 'Optativa II (Elegir de columna)',
    cursarReg: [],
    cursarApr: ['IC321', 'IC322', 'IC323', 'IC324'],
    rendirApr: ['IC321', 'IC322', 'IC323', 'IC324'],
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
    isOptativa: true,
  },
];

const YEAR_COLUMNS = [
  { year: 1, title: '1° Año', subtitle: 'Ciclo Básico' },
  { year: 2, title: '2° Año', subtitle: 'Fundamentos' },
  { year: 3, title: '3° Año', subtitle: 'Tecnologías Básicas' },
  { year: 4, title: '4° Año', subtitle: 'Especialización' },
  { year: 5, title: '5° Año', subtitle: 'Integración y Práctica' },
  { year: 6, title: 'Optativas', subtitle: 'Elegir 2 materias (2°C)' },
];

// DATOS DE EJEMPLO / PLANTILLA (Plan 3° Año)
const SAMPLE_DEMO_STATUS_MAP: Record<string, SubjectStatus> = {
  IC101: 'aprobada',
  IC102: 'aprobada',
  IC103: 'aprobada',
  IC111: 'aprobada',
  IC112: 'aprobada',
  IC121: 'aprobada',
  IC122: 'aprobada',
  IC211: 'aprobada',
  IC212: 'aprobada',
  IC213: 'aprobada',
  IC221: 'aprobada',
  IC222: 'en_curso',
  IC223: 'regularizada',
  IC224: 'aprobada',
  IC313: 'regularizada',
  IC314: 'regularizada',
  IC315: 'aprobada',
  IC322: 'aprobada',
};

const SAMPLE_DEMO_GRADES_MAP: Record<string, GradeInfo> = {
  IC101: { grade: 7, statusText: 'Aprobado', origin: 'Examen' },
  IC102: { grade: 8, statusText: 'Aprobado', origin: 'Examen' },
  IC103: { grade: 9, statusText: 'Aprobado', origin: 'Examen' },
  IC111: { grade: 6, statusText: 'Aprobado', origin: 'Examen' },
  IC112: { grade: 8, statusText: 'Aprobado', origin: 'Examen' },
  IC121: { grade: 10, statusText: 'Promocionado', origin: 'Promoción' },
  IC122: { grade: 6, statusText: 'Aprobado', origin: 'Examen' },
  IC211: { grade: 6, statusText: 'Aprobado', origin: 'Examen' },
  IC212: { grade: 8, statusText: 'Aprobado', origin: 'Examen' },
  IC213: { grade: 9, statusText: 'Aprobado', origin: 'Examen' },
  IC221: { grade: 8, statusText: 'Aprobado', origin: 'Examen' },
  IC222: { statusText: 'En Curso', origin: 'En Curso' },
  IC223: { statusText: 'Regularidad', origin: 'Regularidad' },
  IC224: { grade: 8, statusText: 'Aprobado', origin: 'Examen' },
  IC313: { statusText: 'Regularidad', origin: 'Regularidad' },
  IC314: { statusText: 'Regularidad', origin: 'Regularidad' },
  IC315: { grade: 8, statusText: 'Aprobado', origin: 'Examen' },
  IC322: { grade: 8, statusText: 'Aprobado', origin: 'Examen' },
};

export default function App() {
  // Nombre del estudiante (opcional y personalizable para cualquier usuario)
  const [studentName, setStudentName] = useState<string>(() => {
    try {
      return localStorage.getItem('ing_comp_student_name') || '';
    } catch {
      return '';
    }
  });

  // Estado de materias (inicialmente limpio para cualquier estudiante nuevo)
  const [statusMap, setStatusMap] = useState<Record<string, SubjectStatus>>(() => {
    try {
      const saved = localStorage.getItem('ing_comp_progress');
      if (saved) return JSON.parse(saved);
      return {};
    } catch {
      return {};
    }
  });

  // Notas y calificaciones (inicialmente limpio)
  const [gradesMap, setGradesMap] = useState<Record<string, GradeInfo>>(() => {
    try {
      const saved = localStorage.getItem('ing_comp_grades');
      if (saved) return JSON.parse(saved);
      return {};
    } catch {
      return {};
    }
  });

  // Materia seleccionada (inicialmente null para vista completa)
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // Modal para confirmar limpieza total
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [collapsedYears, setCollapsedYears] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem('ing_comp_collapsed_years');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Guardar años colapsados en localStorage
  useEffect(() => {
    try {
      localStorage.setItem('ing_comp_collapsed_years', JSON.stringify(collapsedYears));
    } catch (e) {
      console.error(e);
    }
  }, [collapsedYears]);

  const toggleYearCollapse = (year: number) => {
    setCollapsedYears((prev) =>
      prev.includes(year) ? prev.filter((y) => y !== year) : [...prev, year]
    );
  };

  const collapseCompletedYears = () => {
    const completed = YEAR_COLUMNS.filter((col) => {
      const yearSubjects = SUBJECTS_DATA.filter((s) => s.year === col.year);
      return (
        yearSubjects.length > 0 &&
        yearSubjects.every((s) => getSubjectStatus(s.id) === 'aprobada')
      );
    }).map((col) => col.year);

    setCollapsedYears((prev) => Array.from(new Set([...prev, ...completed])));
  };

  const expandAllYears = () => {
    setCollapsedYears([]);
  };

  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterMode, setFilterMode] = useState<
    'ALL' | 'CAN_CURSAR' | 'CAN_RENDIR' | 'APROBADAS' | 'REGULARIZADAS' | 'EN_CURSO' | 'CONDICIONALES' | 'LIBRES' | 'PENDIENTES'
  >('ALL');
  const [showConnections, setShowConnections] = useState(true);

  // Modales
  const [showGradesModal, setShowGradesModal] = useState(false);
  const [showStrategyModal, setShowStrategyModal] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);

  // Atajo de teclado: Escape cierra panel lateral o modales
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (showGradesModal) setShowGradesModal(false);
        else if (showStrategyModal) setShowStrategyModal(false);
        else if (showHelpModal) setShowHelpModal(false);
        else if (selectedId) setSelectedId(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showGradesModal, showStrategyModal, showHelpModal, selectedId]);

  // SVG connector lines
  const boardRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [svgLines, setSvgLines] = useState<any[]>([]);

  // Guardar en localStorage
  useEffect(() => {
    try {
      localStorage.setItem('ing_comp_student_name', studentName);
    } catch (e) {
      console.error(e);
    }
  }, [studentName]);

  useEffect(() => {
    try {
      localStorage.setItem('ing_comp_progress', JSON.stringify(statusMap));
    } catch (e) {
      console.error(e);
    }
  }, [statusMap]);

  useEffect(() => {
    try {
      localStorage.setItem('ing_comp_grades', JSON.stringify(gradesMap));
    } catch (e) {
      console.error(e);
    }
  }, [gradesMap]);

  // Mapa rápido por ID
  const subjectsById = useMemo(() => {
    const map: Record<string, any> = {};
    SUBJECTS_DATA.forEach((s) => {
      map[s.id] = s;
    });
    return map;
  }, []);

  const getSubjectStatus = useCallback(
    (id: string): SubjectStatus => statusMap[id] || 'pendiente',
    [statusMap]
  );

  const getSubjectGrade = useCallback(
    (id: string): GradeInfo | undefined => gradesMap[id],
    [gradesMap]
  );

  // Verificación de condiciones de elegibilidad
  const checkEligibility = useCallback(
    (subject: any) => {
      const currentStatus = getSubjectStatus(subject.id);
      const isRegOrApr = (id: string) => {
        const st = getSubjectStatus(id);
        return st === 'regularizada' || st === 'aprobada';
      };
      const isApr = (id: string) => getSubjectStatus(id) === 'aprobada';
      const isLib = (id: string) => getSubjectStatus(id) === 'libre';

      // Requisitos para cursar
      const missingCursarReg = subject.cursarReg.filter((id: string) => !isRegOrApr(id));
      const missingCursarApr = subject.cursarApr.filter((id: string) => !isApr(id));
      const blockedByLibre = [...subject.cursarReg, ...subject.cursarApr, ...subject.rendirApr].filter(
        (id: string) => isLib(id)
      );

      const canCursar =
        missingCursarReg.length === 0 && missingCursarApr.length === 0 && blockedByLibre.length === 0;

      // Requisitos para rendir
      const missingRendirApr = subject.rendirApr.filter((id: string) => !isApr(id));
      const canRendir =
        missingRendirApr.length === 0 &&
        (currentStatus === 'regularizada' || currentStatus === 'aprobada') &&
        blockedByLibre.length === 0;

      return {
        currentStatus,
        canCursar,
        canRendir,
        missingCursarReg,
        missingCursarApr,
        missingRendirApr,
        blockedByLibre,
        isCondicional: currentStatus === 'condicional',
        isLibre: currentStatus === 'libre',
      };
    },
    [getSubjectStatus]
  );

  // Cambiar estado directo
  const setDirectStatus = (id: string, newStatus: SubjectStatus) => {
    setStatusMap((prev) => ({
      ...prev,
      [id]: newStatus,
    }));
  };

  // Ciclar estado al hacer clic en badge (Ciclo extendido con libre y condicional)
  const cycleStatus = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const current = getSubjectStatus(id);
    const order: SubjectStatus[] = [
      'pendiente',
      'en_curso',
      'condicional',
      'regularizada',
      'aprobada',
      'libre',
    ];
    const currentIndex = order.indexOf(current);
    const next = order[(currentIndex + 1) % order.length];
    setDirectStatus(id, next);
  };

  // Actualizar nota de una materia (y si es >= 4, marcar aprobada automáticamente si estaba pendiente)
  const updateGrade = (id: string, grade?: number, statusText?: string, origin?: string) => {
    setGradesMap((prev) => {
      const current = prev[id] || { statusText: 'Aprobado', origin: 'Examen' };
      return {
        ...prev,
        [id]: {
          ...current,
          ...(grade !== undefined ? { grade } : {}),
          ...(statusText !== undefined ? { statusText } : {}),
          ...(origin !== undefined ? { origin } : {}),
        },
      };
    });

    if (grade !== undefined && grade >= 4 && getSubjectStatus(id) === 'pendiente') {
      setDirectStatus(id, 'aprobada');
    }
  };

  // Limpiar todos los datos para empezar de cero
  const clearAllData = () => {
    setStatusMap({});
    setGradesMap({});
    setCollapsedYears([]);
    setSelectedId(null);
    setShowResetConfirm(false);
  };

  // Cargar plantilla de datos de ejemplo
  const loadSampleData = () => {
    setStatusMap(SAMPLE_DEMO_STATUS_MAP);
    setGradesMap(SAMPLE_DEMO_GRADES_MAP);
    setShowResetConfirm(false);
  };

  // Estadísticas globales y cálculo de promedio
  const stats = useMemo(() => {
    let approved = 0;
    let regular = 0;
    let enCurso = 0;
    let condicional = 0;
    let libre = 0;
    let sumGrades = 0;
    let countGrades = 0;

    SUBJECTS_DATA.forEach((s) => {
      const st = statusMap[s.id] || 'pendiente';
      if (st === 'aprobada') approved++;
      else if (st === 'regularizada') regular++;
      else if (st === 'en_curso') enCurso++;
      else if (st === 'condicional') condicional++;
      else if (st === 'libre') libre++;

      const gr = gradesMap[s.id];
      if (gr && typeof gr.grade === 'number' && gr.grade > 0) {
        sumGrades += gr.grade;
        countGrades++;
      }
    });

    const totalCore = 36; // Materias obligatorias + 2 optativas
    const percentage = Math.min(100, Math.round((approved / totalCore) * 100));
    const average = countGrades > 0 ? (sumGrades / countGrades).toFixed(2) : '0.00';

    return {
      approved,
      regular,
      enCurso,
      condicional,
      libre,
      total: totalCore,
      percentage,
      average,
      countGrades,
    };
  }, [statusMap, gradesMap]);

  // Análisis de Estrategia para las Próximas Mesas
  const strategyAnalysis = useMemo(() => {
    const regularSubjects = SUBJECTS_DATA.filter((s) => getSubjectStatus(s.id) === 'regularizada');
    const ranking = regularSubjects.map((subject) => {
      const unblocksCursar: any[] = [];
      const unblocksRendir: any[] = [];

      SUBJECTS_DATA.forEach((target) => {
        if (target.id === subject.id) return;
        if (target.cursarApr.includes(subject.id)) {
          unblocksCursar.push(target);
        }
        if (target.rendirApr.includes(subject.id)) {
          unblocksRendir.push(target);
        }
      });

      const impactScore = unblocksCursar.length * 2 + unblocksRendir.length;
      return {
        subject,
        unblocksCursar,
        unblocksRendir,
        impactScore,
      };
    });

    ranking.sort((a, b) => b.impactScore - a.impactScore);

    const conditionalSubjects = SUBJECTS_DATA.filter((s) => getSubjectStatus(s.id) === 'condicional').map(
      (s) => {
        const eligibility = checkEligibility(s);
        return {
          subject: s,
          missingCursarReg: eligibility.missingCursarReg.map((id) => subjectsById[id]?.name || id),
          missingCursarApr: eligibility.missingCursarApr.map((id) => subjectsById[id]?.name || id),
        };
      }
    );

    const freeSubjects = SUBJECTS_DATA.filter((s) => getSubjectStatus(s.id) === 'libre').map((s) => {
      const blockedDownstream: any[] = [];
      SUBJECTS_DATA.forEach((target) => {
        if (
          target.cursarReg.includes(s.id) ||
          target.cursarApr.includes(s.id) ||
          target.rendirApr.includes(s.id)
        ) {
          blockedDownstream.push(target);
        }
      });
      return {
        subject: s,
        blockedDownstream,
      };
    });

    return {
      ranking,
      conditionalSubjects,
      freeSubjects,
    };
  }, [statusMap, checkEligibility, subjectsById, getSubjectStatus]);

  // Materia activa para inspección
  const activeSubjectId = hoveredId || selectedId;
  const activeSubject = activeSubjectId ? subjectsById[activeSubjectId] : null;
  const selectedSubject = selectedId ? subjectsById[selectedId] : null;

  // Determinar la relación de cualquier tarjeta respecto a la materia activa
  const getRelationToActive = useCallback(
    (id: string) => {
      if (!activeSubject) return null;
      if (id === activeSubject.id) return 'ACTIVE';

      const isCursarApr = activeSubject.cursarApr.includes(id);
      const isCursarReg = activeSubject.cursarReg.includes(id);
      const isRendirApr = activeSubject.rendirApr.includes(id);

      if (isCursarApr) return 'REQ_CURSAR_APR';
      if (isCursarReg) return 'REQ_CURSAR_REG';
      if (isRendirApr) return 'REQ_RENDIR_APR';

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

  // Calcular líneas SVG conectoras
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
    const lines: any[] = [];

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
  }, [showConnections, activeSubject]);

  useEffect(() => {
    updateSvgLines();
    const handleResize = () => updateSvgLines();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [updateSvgLines, activeSubjectId, selectedId, collapsedYears]);

  // Estilos y badges de estado
  const getStatusBadge = (status: SubjectStatus) => {
    switch (status) {
      case 'aprobada':
        return {
          label: 'Aprobada',
          icon: <CheckCircle2 className="w-3.5 h-3.5" />,
          classes: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
        };
      case 'regularizada':
        return {
          label: 'Regular',
          icon: <Clock className="w-3.5 h-3.5" />,
          classes: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
        };
      case 'en_curso':
        return {
          label: 'En Curso',
          icon: <BookOpen className="w-3.5 h-3.5" />,
          classes: 'bg-blue-500/20 text-blue-300 border-blue-500/40',
        };
      case 'condicional':
        return {
          label: 'Condicional',
          icon: <AlertTriangle className="w-3.5 h-3.5" />,
          classes: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
        };
      case 'libre':
        return {
          label: 'Libre',
          icon: <XCircle className="w-3.5 h-3.5" />,
          classes: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
        };
      default:
        return {
          label: 'Pendiente',
          icon: <Lock className="w-3.5 h-3.5 text-slate-400" />,
          classes: 'bg-slate-800 text-slate-400 border-slate-700',
        };
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* HEADER PRINCIPAL */}
      <header className="sticky top-0 z-30 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 px-4 py-3 shadow-lg">
        <div className="max-w-[1900px] mx-auto flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4">
          {/* Logo y Título */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-indigo-500/25">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-lg md:text-xl font-bold tracking-tight text-white">
                    {studentName ? `Plan de ${studentName}` : 'Ingeniería en Computación'}
                  </h1>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                    Plan 2018
                  </span>
                </div>
                <p className="text-xs text-slate-400">
                  Mapa Interactivo • Simulación de Correlatividades y Avance
                </p>
              </div>
            </div>

            {/* Campo de Nombre del Estudiante (Desktop) */}
            <div className="hidden md:flex items-center gap-2 bg-slate-950/70 border border-slate-800 rounded-xl px-2.5 py-1.5 focus-within:border-indigo-500 transition ml-4">
              <User className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
              <input
                type="text"
                placeholder="Ingresá tu nombre..."
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                className="bg-transparent text-xs text-white placeholder-slate-500 focus:outline-none w-32 md:w-36 font-medium"
                title="Personalizá la página con tu nombre"
              />
              {studentName && (
                <button
                  onClick={() => setStudentName('')}
                  className="text-slate-500 hover:text-slate-300 text-[10px]"
                  title="Borrar nombre"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Botones de acción móvil */}
            <div className="flex items-center gap-2 xl:hidden">
              <button
                onClick={() => setShowGradesModal(true)}
                className="px-2.5 py-1.5 rounded-lg bg-emerald-600/30 border border-emerald-500/40 text-emerald-300 text-xs font-semibold flex items-center gap-1.5"
              >
                <Award className="w-3.5 h-3.5" />
                <span>{stats.countGrades > 0 ? `⭐ ${stats.average}` : 'Notas'}</span>
              </button>
              <button
                onClick={() => setShowStrategyModal(true)}
                className="px-2.5 py-1.5 rounded-lg bg-indigo-600/30 border border-indigo-500/40 text-indigo-300 text-xs font-semibold flex items-center gap-1.5"
              >
                <Target className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Barra de Progreso y Estadísticas Rápidas */}
          <div className="flex flex-wrap items-center gap-4 py-1 px-3 bg-slate-950/60 border border-slate-800 rounded-xl">
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 font-medium">Progreso:</span>
              <div className="w-32 md:w-44 bg-slate-800 rounded-full h-2.5 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-indigo-500 via-cyan-400 to-emerald-400 h-2.5 rounded-full transition-all duration-500"
                  style={{ width: `${stats.percentage}%` }}
                />
              </div>
              <span className="text-xs font-bold text-white min-w-[3rem]">
                {stats.percentage}%
              </span>
            </div>

            <div className="h-4 w-px bg-slate-800 hidden sm:block" />

            {/* Badges de Conteo */}
            <div className="flex items-center gap-2 text-xs">
              <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-medium">
                {stats.approved} Aprobadas
              </span>
              <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 font-medium">
                {stats.regular} Regulares
              </span>
              <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30 font-medium">
                {stats.enCurso} En Curso
              </span>
              {stats.condicional > 0 && (
                <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30 font-medium">
                  {stats.condicional} Condicional
                </span>
              )}
              {stats.libre > 0 && (
                <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30 font-medium">
                  {stats.libre} Libre
                </span>
              )}
            </div>
          </div>

          {/* BOTONES PRINCIPALES: Mis Notas & Estrategia */}
          <div className="flex items-center gap-2.5">
            {/* BOTÓN MIS NOTAS (DESTACADO SEGÚN PEDIDO) */}
            <button
              onClick={() => setShowGradesModal(true)}
              className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold text-xs flex items-center gap-2 shadow-lg shadow-emerald-600/25 transition transform active:scale-95"
              title="Abrir historial de notas y cargar tus calificaciones"
            >
              <Award className="w-4 h-4 text-emerald-200" />
              <span>Mis Notas & Analítico</span>
              <span className="px-1.5 py-0.5 rounded-md bg-white/20 text-white font-mono text-[11px] font-bold">
                {stats.countGrades > 0 ? `⭐ ${stats.average}` : 'Cargar'}
              </span>
            </button>

            {/* BOTÓN ESTRATEGIA & MESAS */}
            <button
              onClick={() => setShowStrategyModal(true)}
              className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold text-xs flex items-center gap-2 shadow-lg shadow-indigo-600/25 transition transform active:scale-95"
              title="Analizar prioridades para la próxima mesa y materias condicionales"
            >
              <Target className="w-4 h-4 text-indigo-200" />
              <span>Estrategia & Mesas</span>
              {strategyAnalysis.ranking.length > 0 && (
                <span className="w-2 h-2 rounded-full bg-cyan-300 animate-pulse" />
              )}
            </button>

            {/* Ayuda */}
            <button
              onClick={() => setShowHelpModal(true)}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition"
              title="Cómo usar la herramienta"
            >
              <HelpCircle className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* BARRA DE FILTROS Y BÚSQUEDA */}
        <div className="max-w-[1900px] mx-auto mt-3 pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
          {/* Buscador */}
          <div className="relative flex-1 min-w-[220px] max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar por materia o código (ej. IC223, Álgebra)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs"
              >
                ✕
              </button>
            )}
          </div>

          {/* Filtros de Estado */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            <span className="text-slate-400 mr-1 flex items-center gap-1 text-[11px]">
              <Filter className="w-3 h-3" /> Filtrar:
            </span>

            {[
              { id: 'ALL', label: 'Todas' },
              { id: 'CAN_CURSAR', label: 'Puedo Cursar' },
              { id: 'CAN_RENDIR', label: 'Puedo Rendir' },
              { id: 'APROBADAS', label: 'Aprobadas' },
              { id: 'REGULARIZADAS', label: 'Regulares' },
              { id: 'EN_CURSO', label: 'En Curso' },
              { id: 'CONDICIONALES', label: 'Condicionales' },
              { id: 'LIBRES', label: 'Libres' },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setFilterMode(f.id as any)}
                className={`px-2.5 py-1 rounded-md transition font-medium text-[11px] ${
                  filterMode === f.id
                    ? 'bg-indigo-600 text-white shadow'
                    : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Controles de Años / Despejar Espacio */}
          <div className="flex items-center gap-1.5 text-xs bg-slate-950/80 px-2.5 py-1 rounded-lg border border-slate-800">
            <span className="text-slate-400 mr-1 flex items-center gap-1 text-[11px] font-medium">
              <Eye className="w-3 h-3 text-indigo-400" /> Años:
            </span>
            {YEAR_COLUMNS.map((col) => {
              const isCollapsed = collapsedYears.includes(col.year);
              return (
                <button
                  key={col.year}
                  onClick={() => toggleYearCollapse(col.year)}
                  className={`px-2 py-0.5 rounded text-[11px] font-bold transition border ${
                    !isCollapsed
                      ? 'bg-indigo-600/30 text-indigo-200 border-indigo-500/40 hover:bg-indigo-600/40'
                      : 'bg-slate-900 text-slate-500 border-slate-800 hover:text-slate-300'
                  }`}
                  title={`${!isCollapsed ? 'Ocultar / Colapsar' : 'Mostrar'} ${col.title}`}
                >
                  {col.year <= 5 ? `${col.year}°` : 'Opt'}
                </button>
              );
            })}
            {collapsedYears.length > 0 ? (
              <button
                onClick={expandAllYears}
                className="text-[10px] text-indigo-400 hover:text-indigo-300 underline font-semibold ml-1"
                title="Expandir todos los años"
              >
                Mostrar todos
              </button>
            ) : (
              <button
                onClick={collapseCompletedYears}
                className="text-[10px] text-emerald-400 hover:text-emerald-300 underline font-semibold ml-1"
                title="Ocultar automáticamente los años donde tenés todo aprobado (ej. 1° Año)"
              >
                Ocultar aprobados
              </button>
            )}
          </div>

          {/* Opciones visuales */}
          <div className="flex items-center gap-3 text-xs">
            <label className="flex items-center gap-1.5 text-slate-300 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={showConnections}
                onChange={(e) => setShowConnections(e.target.checked)}
                className="rounded border-slate-700 bg-slate-900 text-indigo-600 focus:ring-0"
              />
              <span className="text-[11px]">Líneas de Correlatividad</span>
            </label>

            <button
              onClick={() => setShowResetConfirm(true)}
              className="text-[11px] text-rose-400 hover:text-rose-300 flex items-center gap-1 hover:underline ml-1 font-medium"
              title="Limpiar y reiniciar todo el avance para empezar desde cero"
            >
              <Trash2 className="w-3 h-3" />
              Limpiar Avance
            </button>
          </div>
        </div>
      </header>

      {/* ÁREA DE TRABAJO PRINCIPAL: TABLERO + SIDEBAR */}
      <div className="flex-1 flex overflow-hidden">
        {/* TABLERO DE MATERIAS ORGANIZADO POR AÑOS */}
        <main
          ref={boardRef}
          className="flex-1 overflow-x-auto overflow-y-auto p-4 md:p-6 relative"
          style={{ minHeight: 'calc(100vh - 120px)' }}
        >
          {/* LÍNEAS SVG CONECTORAS */}
          <svg
            className="absolute inset-0 pointer-events-none w-full h-full z-10"
            style={{ overflow: 'visible' }}
          >
            <defs>
              <marker
                id="arrow-cyan"
                viewBox="0 0 10 10"
                refX="7"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto-start-reverse"
              >
                <path d="M 0 1 L 9 5 L 0 9 z" fill="#06b6d4" />
              </marker>
              <marker
                id="arrow-amber"
                viewBox="0 0 10 10"
                refX="7"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto-start-reverse"
              >
                <path d="M 0 1 L 9 5 L 0 9 z" fill="#f59e0b" />
              </marker>
              <marker
                id="arrow-emerald"
                viewBox="0 0 10 10"
                refX="7"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto-start-reverse"
              >
                <path d="M 0 1 L 9 5 L 0 9 z" fill="#10b981" />
              </marker>
            </defs>

            {svgLines.map((line) => {
              let strokeColor = '#06b6d4';
              let markerEnd = 'url(#arrow-cyan)';
              let strokeDash = '';

              if (line.type === 'REQ_CURSAR_REG') {
                strokeColor = '#f59e0b';
                markerEnd = 'url(#arrow-amber)';
                strokeDash = '4 3';
              } else if (line.type === 'REQ_CURSAR_APR') {
                strokeColor = '#10b981';
                markerEnd = 'url(#arrow-emerald)';
              } else if (line.type === 'REQ_RENDIR_APR') {
                strokeColor = '#8b5cf6';
                markerEnd = '';
                strokeDash = '2 2';
              }

              // Curva suave Bézier
              const dx = Math.abs(line.endX - line.startX) * 0.5;
              const pathD = `M ${line.startX} ${line.startY} C ${line.startX + dx} ${line.startY}, ${
                line.endX - dx
              } ${line.endY}, ${line.endX} ${line.endY}`;

              return (
                <path
                  key={line.id}
                  d={pathD}
                  fill="none"
                  stroke={strokeColor}
                  strokeWidth="2.2"
                  strokeDasharray={strokeDash}
                  markerEnd={markerEnd}
                  opacity="0.85"
                />
              );
            })}
          </svg>

          {/* COLUMNAS POR AÑO */}
          <div className="flex gap-4 min-w-max pb-12">
            {YEAR_COLUMNS.map((col) => {
              const yearSubjects = SUBJECTS_DATA.filter((s) => s.year === col.year);
              const isCollapsed = collapsedYears.includes(col.year);

              // VISTA COLAPSADA (TIRA VERTICAL COMPACTA PARA DESPEJAR ESPACIO)
              if (isCollapsed) {
                const approvedInYear = yearSubjects.filter((s) => getSubjectStatus(s.id) === 'aprobada').length;
                const totalInYear = yearSubjects.length;
                const allApproved = approvedInYear === totalInYear && totalInYear > 0;

                return (
                  <div
                    key={col.year}
                    onClick={() => toggleYearCollapse(col.year)}
                    className="w-14 md:w-16 flex-shrink-0 flex flex-col items-center justify-between bg-slate-900/60 hover:bg-slate-900 border border-slate-800/80 hover:border-indigo-500/50 rounded-2xl p-3 cursor-pointer transition group select-none shadow-sm"
                    title={`Hacé clic para expandir ${col.title} (${approvedInYear}/${totalInYear} aprobadas)`}
                  >
                    <div className="flex flex-col items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleYearCollapse(col.year);
                        }}
                        className="p-1.5 rounded-lg bg-slate-800 group-hover:bg-indigo-600 text-slate-400 group-hover:text-white transition"
                        title="Expandir columna"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <span
                        className="text-xs font-bold text-slate-300 group-hover:text-white tracking-widest uppercase transition mt-2"
                        style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
                      >
                        {col.title}
                      </span>
                    </div>

                    <div className="flex flex-col items-center gap-1.5">
                      <span
                        className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                          allApproved
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                            : 'bg-slate-800 text-slate-400 border border-slate-700'
                        }`}
                      >
                        {approvedInYear}/{totalInYear}
                      </span>
                      {allApproved && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                    </div>
                  </div>
                );
              }

              return (
                <div
                  key={col.year}
                  className="w-[270px] md:w-[290px] flex-shrink-0 flex flex-col bg-slate-900/40 rounded-2xl border border-slate-800/80 p-3"
                >
                  {/* Encabezado de la columna */}
                  <div className="pb-3 mb-3 border-b border-slate-800 flex items-center justify-between">
                    <div>
                      <h2 className="text-sm font-bold text-white tracking-wide">
                        {col.title}
                      </h2>
                      <p className="text-[11px] text-slate-400">{col.subtitle}</p>
                    </div>

                    <div className="flex items-center gap-1">
                      {col.year <= 5 && (
                        <button
                          onClick={() => {
                            // Autocompletar año como aprobadas
                            setStatusMap((prev) => {
                              const next = { ...prev };
                              yearSubjects.forEach((s) => {
                                next[s.id] = 'aprobada';
                              });
                              return next;
                            });
                          }}
                          className="px-1.5 py-0.5 rounded text-[10px] bg-slate-800 hover:bg-emerald-600/30 hover:text-emerald-300 text-slate-400 transition"
                          title="Aprobar todo el año"
                        >
                          ✓ Todo
                        </button>
                      )}
                      <button
                        onClick={() => toggleYearCollapse(col.year)}
                        className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition"
                        title="Ocultar/Colapsar este año para despejar espacio"
                      >
                        <EyeOff className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Lista de Materias de este Año */}
                  <div className="flex flex-col gap-2.5">
                    {yearSubjects.map((subject) => {
                      const status = getSubjectStatus(subject.id);
                      const grade = getSubjectGrade(subject.id);
                      const eligibility = checkEligibility(subject);
                      const relation = getRelationToActive(subject.id);
                      const isSelected = selectedId === subject.id;
                      const badge = getStatusBadge(status);

                      // Filtro de búsqueda
                      if (searchQuery) {
                        const q = searchQuery.toLowerCase();
                        const matchesName = subject.name.toLowerCase().includes(q);
                        const matchesId = subject.id.toLowerCase().includes(q);
                        if (!matchesName && !matchesId) return null;
                      }

                      // Filtro por Estado
                      if (filterMode === 'CAN_CURSAR' && !eligibility.canCursar) return null;
                      if (filterMode === 'CAN_RENDIR' && !eligibility.canRendir) return null;
                      if (filterMode === 'APROBADAS' && status !== 'aprobada') return null;
                      if (filterMode === 'REGULARIZADAS' && status !== 'regularizada') return null;
                      if (filterMode === 'EN_CURSO' && status !== 'en_curso') return null;
                      if (filterMode === 'CONDICIONALES' && status !== 'condicional') return null;
                      if (filterMode === 'LIBRES' && status !== 'libre') return null;

                      // Resaltado de relaciones
                      let relationBorder = '';
                      let relationBg = '';

                      if (relation === 'ACTIVE') {
                        relationBorder = 'ring-2 ring-indigo-400 border-indigo-400';
                        relationBg = 'bg-indigo-950/40';
                      } else if (relation === 'REQ_CURSAR_REG') {
                        relationBorder = 'ring-2 ring-amber-400 border-amber-400';
                        relationBg = 'bg-amber-950/30';
                      } else if (relation === 'REQ_CURSAR_APR') {
                        relationBorder = 'ring-2 ring-emerald-400 border-emerald-400';
                        relationBg = 'bg-emerald-950/30';
                      } else if (relation === 'REQ_RENDIR_APR') {
                        relationBorder = 'ring-2 ring-purple-400 border-purple-400';
                        relationBg = 'bg-purple-950/30';
                      } else if (relation === 'UNLOCKS') {
                        relationBorder = 'ring-2 ring-cyan-400 border-cyan-400';
                        relationBg = 'bg-cyan-950/30';
                      }

                      return (
                        <div
                          key={subject.id}
                          ref={(el) => (cardRefs.current[subject.id] = el)}
                          onClick={() => setSelectedId(subject.id)}
                          onMouseEnter={() => setHoveredId(subject.id)}
                          onMouseLeave={() => setHoveredId(null)}
                          className={`group relative rounded-xl border p-2.5 transition-all duration-200 cursor-pointer select-none ${
                            relationBorder ||
                            (isSelected
                              ? 'border-indigo-500 ring-1 ring-indigo-500 bg-indigo-950/20 shadow-lg'
                              : 'border-slate-800 bg-slate-900/70 hover:border-slate-700 hover:bg-slate-900')
                          } ${relationBg}`}
                        >
                          {/* Encabezado de la Tarjeta: Código, Período y Nota */}
                          <div className="flex items-center justify-between gap-1 mb-1.5">
                            <div className="flex items-center gap-1.5">
                              <span className="font-mono text-[10px] font-bold text-slate-400 group-hover:text-indigo-300 transition">
                                {subject.id}
                              </span>
                              <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-300 font-medium">
                                {subject.period}
                              </span>
                            </div>

                            {/* Insignia de Calificación si está disponible */}
                            {grade?.grade ? (
                              <span
                                className={`text-[10px] font-bold px-1.5 py-0.2 rounded-md flex items-center gap-1 ${
                                  grade.grade >= 8
                                    ? 'bg-emerald-500/30 text-emerald-200 border border-emerald-500/40'
                                    : 'bg-indigo-500/30 text-indigo-200 border border-indigo-500/40'
                                }`}
                                title={`${grade.statusText} (${grade.origin})`}
                              >
                                ⭐ {grade.grade}
                              </span>
                            ) : null}
                          </div>

                          {/* Nombre de la Materia */}
                          <h3 className="text-xs font-semibold text-white leading-snug line-clamp-2 mb-2">
                            {subject.name}
                          </h3>

                          {/* Estado Actual (Clic para ciclar) */}
                          <div className="flex items-center justify-between pt-1 border-t border-slate-800/80">
                            <button
                              onClick={(e) => cycleStatus(subject.id, e)}
                              className={`px-2 py-0.5 rounded-md border text-[10px] font-semibold flex items-center gap-1 transition ${badge.classes} hover:brightness-125`}
                              title="Hacé clic para cambiar de estado (Pendiente → En Curso → Condicional → Regular → Aprobada → Libre)"
                            >
                              {badge.icon}
                              <span>{badge.label}</span>
                            </button>

                            {/* Alerta de Cursar / Rendir */}
                            <div className="flex items-center gap-1">
                              {status === 'libre' ? (
                                <span
                                  className="text-[10px] text-rose-400 flex items-center gap-0.5 font-bold"
                                  title="Quedaste libre: tenés que recursar o rendir libre"
                                >
                                  <XCircle className="w-3 h-3 text-rose-400" /> Libre
                                </span>
                              ) : status === 'condicional' ? (
                                <span
                                  className="text-[10px] text-purple-300 flex items-center gap-0.5 font-bold"
                                  title="Cursando condicional"
                                >
                                  <AlertTriangle className="w-3 h-3 text-purple-400" /> Cond.
                                </span>
                              ) : status === 'regularizada' ? (
                                <span
                                  className={`text-[10px] flex items-center gap-0.5 font-medium ${
                                    eligibility.canRendir ? 'text-emerald-400' : 'text-slate-500'
                                  }`}
                                  title={
                                    eligibility.canRendir
                                      ? '¡Lista para rendir examen final!'
                                      : 'Faltan materias aprobadas para poder rendir final'
                                  }
                                >
                                  {eligibility.canRendir ? '🎯 Rendible' : 'Falta final'}
                                </span>
                              ) : status === 'pendiente' ? (
                                <span
                                  className={`text-[10px] flex items-center gap-0.5 font-medium ${
                                    eligibility.canCursar ? 'text-emerald-400' : 'text-slate-500'
                                  }`}
                                >
                                  {eligibility.canCursar ? (
                                    <>
                                      <Unlock className="w-3 h-3" /> Cursable
                                    </>
                                  ) : (
                                    <>
                                      <Lock className="w-3 h-3" /> Bloqueada
                                    </>
                                  )}
                                </span>
                              ) : null}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </main>

        {/* PANEL LATERAL DE DETALLES (INSPECCIÓN Y CONTROL RÁPIDO) */}
        {selectedSubject && (
          <aside className="w-80 md:w-96 bg-slate-900 border-l border-slate-800 p-4 flex flex-col overflow-y-auto shrink-0 shadow-2xl">
            {/* Header del Panel */}
            <div className="flex items-start justify-between pb-3 border-b border-slate-800">
              <div>
                <span className="font-mono text-xs font-bold text-indigo-400">
                  {selectedSubject.id} • {selectedSubject.period}
                </span>
                <h2 className="text-base font-bold text-white leading-tight mt-0.5">
                  {selectedSubject.name}
                </h2>
                <span className="text-[11px] text-slate-400">
                  {selectedSubject.year <= 5 ? `${selectedSubject.year}° Año` : 'Optativa'}
                </span>
              </div>
              <button
                onClick={() => setSelectedId(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition -mr-1"
                title="Cerrar ventana de detalles (o presioná Esc)"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Selector de Estados Rápidos de 1 Clic */}
            <div className="mt-4">
              <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-2">
                Estado Actual de la Materia
              </label>
              <div className="grid grid-cols-2 gap-1.5 text-xs">
                {[
                  { id: 'aprobada', label: 'Aprobada', icon: CheckCircle2, color: 'text-emerald-300 bg-emerald-950/40 border-emerald-500/50' },
                  { id: 'regularizada', label: 'Regularizada', icon: Clock, color: 'text-amber-300 bg-amber-950/40 border-amber-500/50' },
                  { id: 'en_curso', label: 'En Curso', icon: BookOpen, color: 'text-blue-300 bg-blue-950/40 border-blue-500/50' },
                  { id: 'condicional', label: 'Condicional', icon: AlertTriangle, color: 'text-purple-300 bg-purple-950/40 border-purple-500/50' },
                  { id: 'libre', label: 'Quedó Libre', icon: XCircle, color: 'text-rose-300 bg-rose-950/40 border-rose-500/50' },
                  { id: 'pendiente', label: 'Pendiente', icon: Lock, color: 'text-slate-400 bg-slate-800/40 border-slate-700' },
                ].map((st) => {
                  const isCurrent = getSubjectStatus(selectedSubject.id) === st.id;
                  const Icon = st.icon;
                  return (
                    <button
                      key={st.id}
                      onClick={() => setDirectStatus(selectedSubject.id, st.id as SubjectStatus)}
                      className={`px-2.5 py-2 rounded-lg border text-left flex items-center gap-1.5 transition ${
                        isCurrent
                          ? `${st.color} font-bold ring-2 ring-indigo-500/50`
                          : 'border-slate-800 bg-slate-950/60 text-slate-400 hover:text-white hover:bg-slate-800'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5 shrink-0" />
                      <span className="text-[11px]">{st.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Editor de Calificación */}
            <div className="mt-4 p-3 bg-slate-950/70 border border-slate-800 rounded-xl">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-white flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-indigo-400" />
                  Calificación y Origen
                </span>
                {getSubjectGrade(selectedSubject.id)?.grade && (
                  <span className="text-xs font-bold text-emerald-400">
                    Nota: {getSubjectGrade(selectedSubject.id)?.grade}
                  </span>
                )}
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <label className="text-[10px] text-slate-400 block mb-1">Nota (1 a 10):</label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    placeholder="Ej. 8"
                    value={getSubjectGrade(selectedSubject.id)?.grade || ''}
                    onChange={(e) => {
                      const val = e.target.value ? parseInt(e.target.value) : undefined;
                      updateGrade(selectedSubject.id, val);
                    }}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-400 block mb-1">Origen:</label>
                  <select
                    value={getSubjectGrade(selectedSubject.id)?.origin || 'Examen'}
                    onChange={(e) => updateGrade(selectedSubject.id, undefined, undefined, e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                  >
                    <option value="Examen">Examen</option>
                    <option value="Promoción">Promoción</option>
                    <option value="Regularidad">Regularidad</option>
                    <option value="En Curso">En Curso</option>
                    <option value="Equivalencia">Equivalencia</option>
                  </select>
                </div>
              </div>
            </div>

            {/* SECCIÓN CORRELATIVIDADES EXACTAS */}
            <div className="mt-4 space-y-4 text-xs">
              {/* Para Cursar */}
              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                <h4 className="font-semibold text-white mb-2 flex items-center justify-between">
                  <span>Requisitos para Cursar:</span>
                  {checkEligibility(selectedSubject).canCursar ? (
                    <span className="text-emerald-400 text-[11px] font-bold">✓ Habilitado</span>
                  ) : (
                    <span className="text-rose-400 text-[11px] font-bold">✕ Inhabilitado</span>
                  )}
                </h4>

                {/* Regularizadas necesarias */}
                <div className="mb-2">
                  <span className="text-[11px] text-amber-300 font-medium block mb-1">
                    • Regularizada necesaria ({selectedSubject.cursarReg.length}):
                  </span>
                  {selectedSubject.cursarReg.length === 0 ? (
                    <p className="text-[11px] text-slate-500 italic pl-3">Ninguna</p>
                  ) : (
                    <div className="space-y-1 pl-2">
                      {selectedSubject.cursarReg.map((reqId: string) => {
                        const reqSub = subjectsById[reqId];
                        const reqSt = getSubjectStatus(reqId);
                        const ok = reqSt === 'regularizada' || reqSt === 'aprobada';
                        const isLib = reqSt === 'libre';
                        return (
                          <div
                            key={reqId}
                            onClick={() => setSelectedId(reqId)}
                            className="flex items-center justify-between text-[11px] p-1 rounded hover:bg-slate-800 cursor-pointer"
                          >
                            <span className="text-slate-300 truncate">{reqSub?.name || reqId}</span>
                            <span
                              className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${
                                isLib
                                  ? 'bg-rose-500/20 text-rose-300'
                                  : ok
                                  ? 'bg-emerald-500/20 text-emerald-300'
                                  : 'bg-slate-800 text-slate-400'
                              }`}
                            >
                              {isLib ? 'Libre' : ok ? 'Cumplido' : 'Pendiente'}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Aprobadas necesarias para cursar */}
                <div>
                  <span className="text-[11px] text-emerald-300 font-medium block mb-1">
                    • Aprobada necesaria para cursar ({selectedSubject.cursarApr.length}):
                  </span>
                  {selectedSubject.cursarApr.length === 0 ? (
                    <p className="text-[11px] text-slate-500 italic pl-3">Ninguna</p>
                  ) : (
                    <div className="space-y-1 pl-2">
                      {selectedSubject.cursarApr.map((reqId: string) => {
                        const reqSub = subjectsById[reqId];
                        const ok = getSubjectStatus(reqId) === 'aprobada';
                        return (
                          <div
                            key={reqId}
                            onClick={() => setSelectedId(reqId)}
                            className="flex items-center justify-between text-[11px] p-1 rounded hover:bg-slate-800 cursor-pointer"
                          >
                            <span className="text-slate-300 truncate">{reqSub?.name || reqId}</span>
                            <span
                              className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${
                                ok ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-800 text-slate-400'
                              }`}
                            >
                              {ok ? 'Aprobada' : 'Falta'}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>

              {/* Para Rendir Final */}
              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                <h4 className="font-semibold text-white mb-2 flex items-center justify-between">
                  <span>Requisitos para Rendir Examen Final:</span>
                  {checkEligibility(selectedSubject).canRendir ? (
                    <span className="text-emerald-400 text-[11px] font-bold">✓ Puede rendir</span>
                  ) : (
                    <span className="text-amber-400 text-[11px] font-bold">Pendiente</span>
                  )}
                </h4>

                <div>
                  <span className="text-[11px] text-purple-300 font-medium block mb-1">
                    • Finales aprobados requeridos ({selectedSubject.rendirApr.length}):
                  </span>
                  {selectedSubject.rendirApr.length === 0 ? (
                    <p className="text-[11px] text-slate-500 italic pl-3">Ninguna</p>
                  ) : (
                    <div className="space-y-1 pl-2">
                      {selectedSubject.rendirApr.map((reqId: string) => {
                        const reqSub = subjectsById[reqId];
                        const ok = getSubjectStatus(reqId) === 'aprobada';
                        return (
                          <div
                            key={reqId}
                            onClick={() => setSelectedId(reqId)}
                            className="flex items-center justify-between text-[11px] p-1 rounded hover:bg-slate-800 cursor-pointer"
                          >
                            <span className="text-slate-300 truncate">{reqSub?.name || reqId}</span>
                            <span
                              className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${
                                ok ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-800 text-slate-400'
                              }`}
                            >
                              {ok ? 'Aprobada' : 'Pendiente'}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>

              {/* Materias que Desbloquea */}
              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                <h4 className="font-semibold text-cyan-300 mb-2 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  Materias Futuras que Desbloquea
                </h4>
                {(() => {
                  const unlocks = SUBJECTS_DATA.filter(
                    (t) =>
                      t.cursarReg.includes(selectedSubject.id) ||
                      t.cursarApr.includes(selectedSubject.id) ||
                      t.rendirApr.includes(selectedSubject.id)
                  );

                  if (unlocks.length === 0) {
                    return <p className="text-[11px] text-slate-500 italic">No tiene correlativas posteriores.</p>;
                  }

                  return (
                    <div className="space-y-1">
                      {unlocks.map((target) => (
                        <div
                          key={target.id}
                          onClick={() => setSelectedId(target.id)}
                          className="flex items-center justify-between text-[11px] p-1 rounded hover:bg-slate-800 cursor-pointer"
                        >
                          <span className="text-slate-200 truncate">{target.name}</span>
                          <span className="font-mono text-[10px] text-cyan-400">{target.id}</span>
                        </div>
                      ))}
                    </div>
                  );
                })()}
              </div>
            </div>
          </aside>
        )}
      </div>

      {/* ============================================================ */}
      {/* MODAL 1: MIS NOTAS Y ANALÍTICO ACADÉMICO (OVERLAY PRINCIPAL) */}
      {/* ============================================================ */}
      {showGradesModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 md:p-6 animate-in fade-in duration-150">
          <div className="bg-slate-900 border border-slate-700/80 rounded-2xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
            {/* Header del Modal */}
            <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-gradient-to-r from-slate-900 via-slate-800/80 to-slate-900">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-md shadow-emerald-500/25">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    Historial Académico y Registro de Calificaciones
                  </h3>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs text-slate-400">Ingeniería en Computación • Plan 2018</span>
                    <span className="text-slate-600">•</span>
                    <div className="flex items-center gap-1.5 bg-slate-950/60 px-2 py-0.5 rounded border border-slate-700">
                      <User className="w-3 h-3 text-indigo-400" />
                      <input
                        type="text"
                        placeholder="Tu nombre..."
                        value={studentName}
                        onChange={(e) => setStudentName(e.target.value)}
                        className="bg-transparent text-xs text-white placeholder-slate-500 focus:outline-none w-32 font-medium"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setShowGradesModal(false)}
                className="text-slate-400 hover:text-white p-2 rounded-lg hover:bg-slate-800 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Banner de Ayuda para cualquier alumno */}
            <div className="bg-indigo-950/40 border-b border-indigo-500/20 px-5 py-2.5 flex items-center justify-between text-xs text-indigo-200">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>
                  Ingresá tus notas y condición. Al ingresar una nota (4 al 10), la materia se marca aprobada y tu promedio se calcula al instante.
                </span>
              </div>
              <button
                onClick={loadSampleData}
                className="shrink-0 ml-3 text-[11px] text-cyan-300 hover:text-cyan-200 underline font-medium"
                title="Cargar datos de ejemplo de 3° año"
              >
                Cargar plantilla de ejemplo
              </button>
            </div>

            {/* Tarjetas de Resumen Superior */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 p-5 bg-slate-950/60 border-b border-slate-800">
              <div className="p-3 bg-slate-900/90 border border-emerald-500/30 rounded-xl">
                <span className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">
                  Promedio General
                </span>
                <div className="text-2xl font-black text-emerald-400 mt-0.5 flex items-baseline gap-1.5">
                  ⭐ {stats.average}
                  <span className="text-xs text-slate-400 font-normal">
                    ({stats.countGrades} notas)
                  </span>
                </div>
              </div>

              <div className="p-3 bg-slate-900/90 border border-indigo-500/30 rounded-xl">
                <span className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">
                  Materias Aprobadas
                </span>
                <div className="text-2xl font-black text-indigo-300 mt-0.5">
                  {stats.approved}{' '}
                  <span className="text-xs text-slate-400 font-normal">
                    / {stats.total} ({stats.percentage}%)
                  </span>
                </div>
              </div>

              <div className="p-3 bg-slate-900/90 border border-amber-500/30 rounded-xl">
                <span className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">
                  Regularizadas
                </span>
                <div className="text-2xl font-black text-amber-300 mt-0.5">
                  {stats.regular}{' '}
                  <span className="text-xs text-slate-400 font-normal">para rendir</span>
                </div>
              </div>

              <div className="p-3 bg-slate-900/90 border border-blue-500/30 rounded-xl">
                <span className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">
                  En Curso / Condicional
                </span>
                <div className="text-2xl font-black text-blue-300 mt-0.5">
                  {stats.enCurso + stats.condicional}
                </div>
              </div>
            </div>

            {/* Tabla de Calificaciones */}
            <div className="flex-1 overflow-y-auto p-5">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400 uppercase tracking-wider text-[10px]">
                      <th className="py-2.5 px-3">Código</th>
                      <th className="py-2.5 px-3">Asignatura</th>
                      <th className="py-2.5 px-3">Año / Período</th>
                      <th className="py-2.5 px-3">Estado</th>
                      <th className="py-2.5 px-3">Nota</th>
                      <th className="py-2.5 px-3">Origen / Condición</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 font-medium">
                    {SUBJECTS_DATA.map((s) => {
                      const st = getSubjectStatus(s.id);
                      const gr = getSubjectGrade(s.id);
                      const isApproved = st === 'aprobada';

                      return (
                        <tr
                          key={s.id}
                          className={`hover:bg-slate-800/40 transition ${
                            isApproved ? 'bg-emerald-950/10' : ''
                          }`}
                        >
                          <td className="py-2 px-3 font-mono text-[11px] text-slate-400 font-bold">
                            {s.id}
                          </td>
                          <td className="py-2 px-3 text-white font-semibold">{s.name}</td>
                          <td className="py-2 px-3 text-slate-400">
                            {s.year <= 5 ? `${s.year}° Año` : 'Optativa'} • {s.period}
                          </td>
                          <td className="py-2 px-3">
                            <select
                              value={st}
                              onChange={(e) => setDirectStatus(s.id, e.target.value as SubjectStatus)}
                              className={`bg-slate-950 border border-slate-700 rounded px-1.5 py-1 text-[11px] font-semibold focus:outline-none focus:border-indigo-500 ${getStatusBadge(st).classes}`}
                            >
                              <option value="pendiente">Pendiente</option>
                              <option value="en_curso">En Curso</option>
                              <option value="condicional">Condicional</option>
                              <option value="regularizada">Regular</option>
                              <option value="aprobada">Aprobada</option>
                              <option value="libre">Libre</option>
                            </select>
                          </td>
                          <td className="py-2 px-3">
                            <input
                              type="number"
                              min="1"
                              max="10"
                              placeholder="-"
                              value={gr?.grade || ''}
                              onChange={(e) => {
                                const val = e.target.value ? parseInt(e.target.value) : undefined;
                                updateGrade(s.id, val);
                              }}
                              className="w-16 bg-slate-950 border border-slate-700 rounded px-2 py-1 text-xs text-white font-bold text-center focus:outline-none focus:border-indigo-500"
                            />
                          </td>
                          <td className="py-2 px-3 text-slate-300">
                            <select
                              value={gr?.origin || (isApproved ? 'Examen' : '-')}
                              onChange={(e) => updateGrade(s.id, undefined, undefined, e.target.value)}
                              className="bg-slate-950 border border-slate-700 rounded px-1.5 py-1 text-[11px] text-slate-300 focus:outline-none focus:border-indigo-500"
                            >
                              <option value="-">-</option>
                              <option value="Examen">Examen</option>
                              <option value="Promoción">Promoción</option>
                              <option value="Regularidad">Regularidad</option>
                              <option value="En Curso">En Curso</option>
                              <option value="Equivalencia">Equivalencia</option>
                            </select>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Footer con Acciones */}
            <div className="p-4 bg-slate-950/80 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setShowResetConfirm(true)}
                  className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1.5 hover:underline font-medium"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Limpiar todas las notas y avance
                </button>
                <button
                  onClick={loadSampleData}
                  className="text-xs text-slate-400 hover:text-white flex items-center gap-1.5 hover:underline"
                  title="Carga una plantilla de ejemplo para ver cómo funciona"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Cargar plantilla de ejemplo
                </button>
              </div>

              <button
                onClick={() => setShowGradesModal(false)}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md transition"
              >
                Guardar y Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* MODAL 2: ESTRATEGIAS ACADÉMICAS, PRÓXIMAS MESAS Y CONDICIONAL */}
      {/* ============================================================ */}
      {showStrategyModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 md:p-6 animate-in fade-in duration-150">
          <div className="bg-slate-900 border border-slate-700/80 rounded-2xl max-w-3xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-md shadow-indigo-500/25">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    Estrategia Académica & Próximas Mesas de Examen
                  </h3>
                  <p className="text-xs text-slate-400">
                    Análisis de cuellos de botella, finales clave y cursada condicional
                  </p>
                </div>
              </div>

              <button
                onClick={() => setShowStrategyModal(false)}
                className="text-slate-400 hover:text-white p-2 rounded-lg hover:bg-slate-800 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Contenido de Estrategias */}
            <div className="flex-1 overflow-y-auto p-5 space-y-6">
              {/* SECCIÓN 1: RANKING DE FINALES A RENDIR */}
              <div>
                <h4 className="text-sm font-bold text-white flex items-center gap-2 mb-2">
                  <Flame className="w-4 h-4 text-amber-400" />
                  Prioridad para las Próximas Mesas (Materias Regulares a Rendir)
                </h4>
                <p className="text-xs text-slate-400 mb-3">
                  Ordenadas de mayor a menor impacto: te muestra cuántas materias destrabás inmediatamente al aprobar cada final.
                </p>

                {strategyAnalysis.ranking.length === 0 ? (
                  <div className="p-4 rounded-xl bg-slate-950/50 border border-slate-800 text-xs text-slate-400">
                    No tenés materias en condición regular actualmente.
                  </div>
                ) : (
                  <div className="space-y-3">
                    {strategyAnalysis.ranking.map((item, idx) => (
                      <div
                        key={item.subject.id}
                        className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition"
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <span className="font-mono text-xs font-bold text-indigo-400">
                              #{idx + 1} • {item.subject.id}
                            </span>
                            <h5 className="text-sm font-bold text-white">
                              {item.subject.name}
                            </h5>
                          </div>
                          <span className="px-2 py-1 rounded bg-amber-500/20 text-amber-300 font-bold text-xs border border-amber-500/30">
                            Impacto: {item.impactScore} pts
                          </span>
                        </div>

                        <div className="mt-2.5 text-xs text-slate-300 space-y-1">
                          {item.unblocksCursar.length > 0 && (
                            <p>
                              👉 <strong className="text-emerald-400">Habilita a Cursar:</strong>{' '}
                              {item.unblocksCursar.map((u) => u.name).join(', ')}
                            </p>
                          )}
                          {item.unblocksRendir.length > 0 && (
                            <p>
                              👉 <strong className="text-cyan-400">Habilita a Rendir:</strong>{' '}
                              {item.unblocksRendir.map((u) => u.name).join(', ')}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* SECCIÓN 2: CURSADA CONDICIONAL */}
              <div>
                <h4 className="text-sm font-bold text-white flex items-center gap-2 mb-2">
                  <AlertTriangle className="w-4 h-4 text-purple-400" />
                  Materias en Cursado Condicional
                </h4>
                <p className="text-xs text-slate-400 mb-3">
                  Materias en las que estás anotado condicionalmente mientras regularizás o aprobás sus requisitos previos.
                </p>

                {strategyAnalysis.conditionalSubjects.length === 0 ? (
                  <div className="p-4 rounded-xl bg-slate-950/50 border border-slate-800 text-xs text-slate-400">
                    No tenés materias marcadas como condicionales. Podés marcar cualquier materia como "Condicional" desde su tarjeta o panel lateral para simular esta estrategia.
                  </div>
                ) : (
                  <div className="space-y-3">
                    {strategyAnalysis.conditionalSubjects.map((item) => (
                      <div
                        key={item.subject.id}
                        className="p-3.5 rounded-xl bg-purple-950/20 border border-purple-500/40"
                      >
                        <h5 className="text-sm font-bold text-purple-200">
                          {item.subject.name} ({item.subject.id})
                        </h5>
                        <p className="text-xs text-slate-300 mt-1">
                          Requisitos que debés regularizar o rendir para no perder la condicionalidad:
                        </p>
                        <ul className="list-disc pl-5 mt-1 text-xs text-purple-300">
                          {item.missingCursarReg.map((m, i) => (
                            <li key={i}>Regularizar: {m}</li>
                          ))}
                          {item.missingCursarApr.map((m, i) => (
                            <li key={i}>Aprobar Final: {m}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* SECCIÓN 3: MATERIAS LIBRES */}
              <div>
                <h4 className="text-sm font-bold text-white flex items-center gap-2 mb-2">
                  <XCircle className="w-4 h-4 text-rose-400" />
                  Materias Quedadas Libres
                </h4>
                <p className="text-xs text-slate-400 mb-3">
                  Materias donde perdiste la regularidad. Esto frena correlatividades posteriores hasta que las recurses o apruebes en examen libre.
                </p>

                {strategyAnalysis.freeSubjects.length === 0 ? (
                  <div className="p-4 rounded-xl bg-slate-950/50 border border-slate-800 text-xs text-emerald-400">
                    ✓ ¡Excelente! No tenés ninguna materia en condición libre.
                  </div>
                ) : (
                  <div className="space-y-3">
                    {strategyAnalysis.freeSubjects.map((item) => (
                      <div
                        key={item.subject.id}
                        className="p-3.5 rounded-xl bg-rose-950/20 border border-rose-500/40"
                      >
                        <h5 className="text-sm font-bold text-rose-200">
                          {item.subject.name} ({item.subject.id})
                        </h5>
                        <p className="text-xs text-rose-300 mt-1">
                          Esta condición bloquea las siguientes asignaturas futuras:
                        </p>
                        <p className="text-xs text-slate-300 mt-0.5">
                          {item.blockedDownstream.map((b) => b.name).join(', ') || 'Ninguna inmediata'}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 bg-slate-950/80 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => setShowStrategyModal(false)}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition"
              >
                Entendido
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* MODAL 3: AYUDA Y GUÍA */}
      {/* ============================================================ */}
      {showHelpModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
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
                <strong>1. Estados de Materias:</strong> Cada tarjeta tiene 6 estados posibles:
                <br />• <strong>Aprobada (Verde):</strong> Examen final o promoción aprobada.
                <br />• <strong>Regular (Amarillo):</strong> Cursada aprobada, lista para rendir final.
                <br />• <strong>En Curso (Azul):</strong> La estás cursando este cuatrimestre.
                <br />• <strong>Condicional (Violeta):</strong> La estás cursando bajo régimen condicional.
                <br />• <strong>Libre (Rojo):</strong> Perdiste la regularidad (recursar o rendir libre).
                <br />• <strong>Pendiente (Gris):</strong> Aún no iniciada.
              </p>
              <p>
                <strong>2. Mis Notas y Analítico:</strong> Tocá el botón verde en la barra superior para ver tus notas reales, calcular tu promedio general en tiempo real y editar cualquier nota.
              </p>
              <p>
                <strong>3. Estrategia & Mesas:</strong> Tocá el botón violeta para ver qué materias te conviene rendir primero para destrabar la mayor cantidad de asignaturas.
              </p>
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
      {/* ============================================================ */}
      {/* MODAL 4: CONFIRMACIÓN PARA REINICIAR / LIMPIAR TODO */}
      {/* ============================================================ */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-500/20 border border-rose-500/30 flex items-center justify-center text-rose-400 shrink-0">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">¿Reiniciar todo el avance?</h3>
                <p className="text-xs text-slate-400">Esta acción dejará el mapa en blanco.</p>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Se restablecerán todas las materias a estado <strong>Pendiente</strong> y se borrarán todas las notas cargadas para que comiences desde cero con tu propio plan.
            </p>

            <div className="pt-2 flex items-center justify-end gap-2">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition"
              >
                Cancelar
              </button>
              <button
                onClick={clearAllData}
                className="px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold transition flex items-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Sí, Limpiar Todo
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
