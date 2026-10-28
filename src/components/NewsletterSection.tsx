import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Newspaper, Clock, ArrowRight, X, Mail, Check } from 'lucide-react';
import { TRANSLATIONS, ArticleItem } from '../lib/translations';
import { sound } from '../lib/sound';

interface Props {
  lang: 'en' | 'es';
}

export const NewsletterSection: React.FC<Props> = ({ lang }) => {
  const t = TRANSLATIONS[lang].newsletter;
  const [selectedArticle, setSelectedArticle] = useState<ArticleItem | null>(null);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    sound.playChord();
    setSubscribed(true);
  };

  return (
    <section id="newsletter" className="space-y-8 scroll-mt-24">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[var(--apple-border)] pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 rounded-full bg-purple-500/10 text-purple-700 font-mono text-[11px] font-bold border border-purple-500/20">
              {t.badge}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--apple-text-primary)]">
            {t.title}
          </h2>
          <p className="text-xs sm:text-sm text-[var(--apple-text-secondary)] mt-1 max-w-xl">
            {t.subtitle}
          </p>
        </div>

        {/* Quick Subscribe Mini Form */}
        {!subscribed ? (
          <form onSubmit={handleSubscribe} className="flex items-center gap-2 w-full sm:w-auto">
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder={t.emailPlaceholder}
              className="text-xs rounded-xl border border-[var(--apple-border)] bg-[var(--apple-surface)] px-3.5 py-2.5 text-[var(--apple-text-primary)] focus:outline-none focus:border-purple-600 w-full sm:w-60"
            />
            <button
              type="submit"
              className="apple-button whitespace-nowrap text-xs py-2.5 px-4 font-semibold shadow-sm cursor-pointer"
            >
              {t.subscribeBtn}
            </button>
          </form>
        ) : (
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-50 text-purple-700 text-xs font-semibold border border-purple-200">
            <Check className="h-4 w-4" />
            <span>{t.subscribedSuccess}</span>
          </div>
        )}
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {t.articles.map(article => (
          <div
            key={article.id}
            onClick={() => {
              sound.playClick();
              setSelectedArticle(article);
            }}
            className="apple-card p-6 cursor-pointer hover:border-purple-500/40 transition-all space-y-4 group flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono text-[11px] font-bold text-purple-700 bg-purple-500/10 px-2.5 py-0.5 rounded-full border border-purple-500/20">
                  {article.category}
                </span>
                <span className="text-[var(--apple-text-tertiary)] flex items-center gap-1 text-[11px]">
                  <Clock className="w-3 h-3" />
                  {article.readTime}
                </span>
              </div>

              <h3 className="text-base sm:text-lg font-bold text-[var(--apple-text-primary)] group-hover:text-purple-700 transition-colors leading-snug">
                {article.title}
              </h3>

              <p className="text-xs text-[var(--apple-text-secondary)] leading-relaxed">
                {article.excerpt}
              </p>
            </div>

            <div className="pt-3 border-t border-[var(--apple-border)] flex items-center justify-between text-xs text-purple-700 font-semibold">
              <span className="text-[11px] text-[var(--apple-text-tertiary)]">{article.date}</span>
              <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                {lang === 'es' ? 'Leer artículo completo' : 'Read full teardown'} <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Full Article Modal Reading View */}
      <AnimatePresence>
        {selectedArticle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="apple-card max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 sm:p-8 space-y-6 bg-[var(--apple-surface)] shadow-2xl relative"
            >
              <button
                onClick={() => setSelectedArticle(null)}
                className="absolute top-5 right-5 p-1.5 rounded-full bg-[var(--apple-surface-secondary)] text-[var(--apple-text-secondary)] hover:text-[var(--apple-text-primary)] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="space-y-2 border-b border-[var(--apple-border)] pb-4">
                <span className="font-mono text-xs font-bold text-purple-700 bg-purple-500/10 px-2.5 py-0.5 rounded-full border border-purple-500/20">
                  {selectedArticle.category}
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-[var(--apple-text-primary)]">
                  {selectedArticle.title}
                </h2>
                <div className="text-xs text-[var(--apple-text-tertiary)] flex items-center gap-3">
                  <span>{selectedArticle.date}</span>
                  <span>•</span>
                  <span>{selectedArticle.readTime}</span>
                </div>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-[var(--apple-text-secondary)] leading-relaxed">
                {selectedArticle.content.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>

              <div className="pt-4 border-t border-[var(--apple-border)] flex justify-end">
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="apple-button text-xs py-2 px-4 cursor-pointer"
                >
                  {lang === 'es' ? 'Cerrar Artículo' : 'Close Article'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
