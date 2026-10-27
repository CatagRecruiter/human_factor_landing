import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Newspaper, Clock, ArrowRight, X, Mail, Check, Sparkles } from 'lucide-react';
import { ARTICLES_DATA, Article } from '../lib/dataContent';
import { sound } from '../lib/sound';

export const NewsletterSection: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
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
            <span className="px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-500 font-mono text-[11px] font-bold border border-blue-500/20">
              MARKET INTEL
            </span>
            <span className="text-xs text-[var(--apple-text-tertiary)] font-medium">
              Bi-weekly dispatch on Talent Science & European Markets
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--apple-text-primary)]">
            Market Signals & Psychometrics Dispatch
          </h2>
          <p className="text-xs sm:text-sm text-[var(--apple-text-secondary)] mt-1 max-w-xl">
            Real data from European tech hubs, behavioral scoring case studies, and modern hiring infrastructure teardowns. Published every 48 hours.
          </p>
        </div>

        {/* Quick Subscribe Mini Form */}
        {!subscribed ? (
          <form onSubmit={handleSubscribe} className="flex items-center gap-2 w-full sm:w-auto">
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="name@company.com"
              className="text-xs rounded-xl border border-[var(--apple-border)] bg-[var(--apple-surface)] px-3.5 py-2.5 text-[var(--apple-text-primary)] focus:outline-none focus:border-blue-500 w-full sm:w-60"
            />
            <button
              type="submit"
              className="apple-button whitespace-nowrap text-xs py-2.5 px-4 font-semibold shadow-sm"
            >
              Subscribe
            </button>
          </form>
        ) : (
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/10 text-emerald-600 text-xs font-semibold border border-emerald-500/20">
            <Check className="h-4 w-4" />
            <span>Subscribed to bi-weekly dispatch</span>
          </div>
        )}
      </div>

      {/* Articles Grid (Editorial Style similar to Juan's layout) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {ARTICLES_DATA.map(article => (
          <div
            key={article.id}
            onClick={() => {
              sound.playTone(520, 'sine', 0.05);
              setSelectedArticle(article);
            }}
            className="group cursor-pointer rounded-2xl border border-[var(--apple-border)] bg-[var(--apple-surface)] p-6 transition-all hover:border-blue-500/40 hover:shadow-md flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between text-[11px] text-[var(--apple-text-tertiary)] font-mono">
                <span className="font-semibold text-blue-500 uppercase tracking-wider">
                  {article.category}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {article.readTime}
                </span>
              </div>

              <h3 className="text-base sm:text-lg font-bold text-[var(--apple-text-primary)] group-hover:text-blue-500 transition-colors leading-snug">
                {article.title}
              </h3>

              <p className="text-xs text-[var(--apple-text-secondary)] leading-relaxed line-clamp-3">
                {article.excerpt}
              </p>
            </div>

            <div className="flex items-center justify-between pt-4 mt-4 border-t border-[var(--apple-border)] text-xs text-[var(--apple-text-tertiary)]">
              <span>{article.date}</span>
              <span className="text-blue-500 font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Read dispatch <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Article Reader Modal */}
      <AnimatePresence>
        {selectedArticle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedArticle(null)}
              className="fixed inset-0 bg-black/50 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 15 }}
              className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-3xl border border-[var(--apple-border)] bg-[var(--apple-surface)]/95 p-6 sm:p-8 shadow-2xl backdrop-blur-xl"
            >
              <button
                onClick={() => setSelectedArticle(null)}
                className="absolute right-4 top-4 p-2 rounded-full text-[var(--apple-text-tertiary)] hover:bg-[var(--apple-hover)] hover:text-[var(--apple-text-primary)]"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="space-y-4">
                <div className="flex items-center gap-2 text-[11px] font-mono text-blue-500 uppercase font-semibold">
                  <span>{selectedArticle.category}</span>
                  <span>•</span>
                  <span>{selectedArticle.date}</span>
                  <span>•</span>
                  <span>{selectedArticle.readTime}</span>
                </div>

                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--apple-text-primary)]">
                  {selectedArticle.title}
                </h2>

                <div className="space-y-3.5 text-xs sm:text-sm text-[var(--apple-text-secondary)] leading-relaxed border-t border-[var(--apple-border)] pt-4">
                  {selectedArticle.content.map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                  ))}
                </div>

                <div className="pt-6 border-t border-[var(--apple-border)] flex items-center justify-between">
                  <span className="text-xs text-[var(--apple-text-tertiary)]">
                    Written by Catalina Gil Sierra
                  </span>
                  <button
                    onClick={() => setSelectedArticle(null)}
                    className="apple-button text-xs py-2 px-4 font-semibold"
                  >
                    Done Reading
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
