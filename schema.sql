-- Cloudflare D1 SQL Schema for TalentLens Studio

CREATE TABLE IF NOT EXISTS leads (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT NOT NULL UNIQUE,
  source TEXT DEFAULT 'bars_framework_download',
  ip_country TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS candidate_evaluations (
  id TEXT PRIMARY KEY,
  candidate_name TEXT NOT NULL,
  role_template TEXT NOT NULL,
  fit_pct REAL NOT NULL,
  raw_score REAL NOT NULL,
  verdict TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
