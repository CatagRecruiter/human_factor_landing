import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  Command, 
  ArrowRight, 
  Sliders, 
  DollarSign, 
  FileText, 
  Download, 
  User, 
  Sparkles, 
  Calendar, 
  Volume2, 
  Languages, 
  X
} from 'lucide-react';
import { sound } from '../lib/sound';

export interface CommandItem {
  id: string;
  category: string;
  title: string;
  subtitle?: string;
  icon: React.ReactNode;
  shortcut?: string;
  action: () => void;
}

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  lang: 'en' | 'es';
  onScrollTo: (id: string) => void;
  onToggleSound: () => void;
  sfxOn: boolean;
  onToggleLang: () => void;
  onOpenTour: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  lang,
  onScrollTo,
  onToggleSound,
  sfxOn,
  onToggleLang,
  onOpenTour
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const commands: CommandItem[] = [
    // Modules Navigation
    {
      id: 'tool',
      category: lang === 'es' ? 'Módulos' : 'Modules',
      title: lang === 'es' ? 'Analizador BARS & Arena de Candidatos' : 'BARS Arena & Job Analyzer',
      subtitle: lang === 'es' ? 'Módulo 1: Calificación objetiva con anclajes conductuales' : 'Module 1: Objective evaluation with behavioral rating scales',
      icon: <Sliders className="w-4 h-4 text-purple-600" />,
      shortcut: '1',
      action: () => {
        onScrollTo('interview-tool');
        onClose();
      }
    },
    {
      id: 'calculator',
      category: lang === 'es' ? 'Módulos' : 'Modules',
      title: lang === 'es' ? 'Calculadora de Ineficiencia (Simulador P&L)' : 'Inefficiency Cost Calculator (P&L Simulator)',
      subtitle: lang === 'es' ? 'Módulo 2: Desperdicio financiero y horas de ingeniería' : 'Module 2: Real financial bleed and engineering waste',
      icon: <DollarSign className="w-4 h-4 text-purple-600" />,
      shortcut: '2',
      action: () => {
        onScrollTo('interview-cost');
        onClose();
      }
    },
    {
      id: 'methodology',
      category: lang === 'es' ? 'Módulos' : 'Modules',
      title: lang === 'es' ? 'Ciencia Predictiva vs. Intuición' : 'Predictive Science vs. Gut Feeling',
      subtitle: lang === 'es' ? 'Comparativa de métodos y fiabilidad psicométrica' : 'Method comparison and psychometric predictive validity',
      icon: <Sparkles className="w-4 h-4 text-purple-600" />,
      action: () => {
        onScrollTo('talent-science');
        onClose();
      }
    },
    {
      id: 'playbook',
      category: lang === 'es' ? 'Módulos' : 'Modules',
      title: lang === 'es' ? 'Descargar Playbook de Selección (PDF)' : 'Download Selection Playbook (PDF)',
      subtitle: lang === 'es' ? 'Marco práctico de entrevistas estructuradas y BARS' : 'Practical framework for structured behavioral hiring',
      icon: <Download className="w-4 h-4 text-purple-600" />,
      action: () => {
        onScrollTo('playbook');
        onClose();
      }
    },
    {
      id: 'about',
      category: lang === 'es' ? 'Módulos' : 'Modules',
      title: lang === 'es' ? 'Sobre Catalina Gil Sierra' : 'About Catalina Gil Sierra',
      subtitle: lang === 'es' ? 'Perfil ejecutivo, trayectoria y portafolio' : 'Executive profile, track record and credentials',
      icon: <User className="w-4 h-4 text-purple-600" />,
      action: () => {
        onScrollTo('about-me');
        onClose();
      }
    },

    // Actions
    {
      id: 'book',
      category: lang === 'es' ? 'Acciones' : 'Actions',
      title: lang === 'es' ? 'Agendar Consulta de 15 Minutos' : 'Book 15-Minute Consultation',
      subtitle: 'cal.com/catalinagil',
      icon: <Calendar className="w-4 h-4 text-purple-600" />,
      shortcut: '↵',
      action: () => {
        window.open('https://cal.com/catalinagil', '_blank');
        onClose();
      }
    },
    {
      id: 'tour',
      category: lang === 'es' ? 'Acciones' : 'Actions',
      title: lang === 'es' ? 'Iniciar Tour Guiado Interactivo' : 'Start Interactive Guided Tour',
      subtitle: lang === 'es' ? 'Paso a paso por los dos módulos principales' : 'Step-by-step walkthrough of both modules',
      icon: <Sparkles className="w-4 h-4 text-purple-600" />,
      action: () => {
        onOpenTour();
        onClose();
      }
    },

    // Preferences
    {
      id: 'toggle-sound',
      category: lang === 'es' ? 'Preferencias' : 'Preferences',
      title: sfxOn ? (lang === 'es' ? 'Silenciar Efectos de Audio' : 'Mute Tactile Audio FX') : (lang === 'es' ? 'Activar Efectos de Audio' : 'Enable Tactile Audio FX'),
      subtitle: sfxOn ? 'Web Audio: ON' : 'Web Audio: OFF',
      icon: <Volume2 className="w-4 h-4 text-purple-600" />,
      action: () => {
        onToggleSound();
        onClose();
      }
    },
    {
      id: 'toggle-lang',
      category: lang === 'es' ? 'Preferencias' : 'Preferences',
      title: lang === 'es' ? 'Switch to English' : 'Cambiar a Español',
      subtitle: lang === 'es' ? 'Current: Español' : 'Current: English',
      icon: <Languages className="w-4 h-4 text-purple-600" />,
      action: () => {
        onToggleLang();
        onClose();
      }
    }
  ];

  const filteredCommands = commands.filter(c => 
    c.title.toLowerCase().includes(query.toLowerCase()) ||
    c.subtitle?.toLowerCase().includes(query.toLowerCase()) ||
    c.category.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
      sound.playTone(450, 'sine', 0.05);
    }
  }, [isOpen]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      sound.playClick();
      setSelectedIndex(prev => (prev + 1) % (filteredCommands.length || 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      sound.playClick();
      setSelectedIndex(prev => (prev - 1 + filteredCommands.length) % (filteredCommands.length || 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredCommands[selectedIndex]) {
        sound.playSuccess();
        filteredCommands[selectedIndex].action();
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 sm:pt-28 px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/45 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.2, ease: [0.28, 0.11, 0.32, 1] }}
            className="relative w-full max-w-xl rounded-3xl border border-[var(--apple-border)] bg-[var(--apple-surface)]/95 shadow-2xl backdrop-blur-2xl text-[var(--apple-text-primary)] overflow-hidden z-10"
            onKeyDown={handleKeyDown}
          >
            {/* Search Input Bar */}
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-[var(--apple-border)]">
              <Search className="w-4 h-4 text-purple-600 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder={lang === 'es' ? 'Buscar o saltar a una sección...' : 'Type a command or search...'}
                className="w-full bg-transparent text-sm font-medium text-[var(--apple-text-primary)] placeholder-[var(--apple-text-tertiary)] focus:outline-none"
              />
              <div className="flex items-center gap-1.5 shrink-0">
                <kbd className="hidden sm:inline-flex items-center gap-0.5 px-2 py-0.5 text-[10px] font-mono font-semibold rounded-md bg-[var(--apple-surface-secondary)] border border-[var(--apple-border)] text-[var(--apple-text-secondary)]">
                  ESC
                </kbd>
                <button
                  onClick={onClose}
                  className="p-1 rounded-full text-[var(--apple-text-tertiary)] hover:text-[var(--apple-text-primary)] hover:bg-[var(--apple-surface-secondary)] transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Command List */}
            <div className="max-h-80 overflow-y-auto p-2 space-y-1">
              {filteredCommands.length === 0 ? (
                <div className="py-8 text-center text-xs text-[var(--apple-text-tertiary)]">
                  {lang === 'es' ? 'No se encontraron resultados.' : 'No commands found.'}
                </div>
              ) : (
                filteredCommands.map((item, idx) => {
                  const isSelected = idx === selectedIndex;
                  return (
                    <div
                      key={item.id}
                      onClick={() => {
                        sound.playSuccess();
                        item.action();
                      }}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={`flex items-center justify-between p-2.5 rounded-xl cursor-pointer transition-all ${
                        isSelected 
                          ? 'bg-purple-600/10 text-purple-700 font-semibold' 
                          : 'text-[var(--apple-text-primary)] hover:bg-[var(--apple-surface-secondary)]'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className={`p-2 rounded-lg border transition-colors ${
                          isSelected 
                            ? 'bg-white border-purple-300 shadow-xs' 
                            : 'bg-[var(--apple-surface-secondary)] border-[var(--apple-border)]'
                        }`}>
                          {item.icon}
                        </div>
                        <div className="min-w-0">
                          <div className="text-xs truncate">{item.title}</div>
                          {item.subtitle && (
                            <div className="text-[10px] text-[var(--apple-text-tertiary)] truncate">
                              {item.subtitle}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--apple-text-tertiary)] px-2 py-0.5 rounded bg-[var(--apple-surface-secondary)]">
                          {item.category}
                        </span>
                        {item.shortcut ? (
                          <kbd className="px-1.5 py-0.5 text-[10px] font-mono rounded border border-[var(--apple-border)] bg-[var(--apple-surface-solid)] text-[var(--apple-text-tertiary)]">
                            {item.shortcut}
                          </kbd>
                        ) : (
                          <ArrowRight className={`w-3.5 h-3.5 transition-transform ${isSelected ? 'translate-x-0.5 text-purple-600' : 'opacity-0'}`} />
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer Keyboard Hints */}
            <div className="px-4 py-2 bg-[var(--apple-surface-secondary)]/80 border-t border-[var(--apple-border)] flex items-center justify-between text-[11px] text-[var(--apple-text-tertiary)] font-mono">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <kbd className="px-1 py-0.5 rounded border border-[var(--apple-border)] bg-[var(--apple-surface)] text-[9px]">↑</kbd>
                  <kbd className="px-1 py-0.5 rounded border border-[var(--apple-border)] bg-[var(--apple-surface)] text-[9px]">↓</kbd>
                  <span>{lang === 'es' ? 'Navegar' : 'Navigate'}</span>
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1 py-0.5 rounded border border-[var(--apple-border)] bg-[var(--apple-surface)] text-[9px]">↵</kbd>
                  <span>{lang === 'es' ? 'Seleccionar' : 'Select'}</span>
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Command className="w-3 h-3" />
                <span>Raycast / Linear Style</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
