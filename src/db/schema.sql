CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'user',
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS evaluations (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  startup_name VARCHAR(255),
  report_name VARCHAR(255),
  status VARCHAR(50) DEFAULT 'in_progress',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS primary_data (
  id SERIAL PRIMARY KEY,
  evaluation_id INTEGER REFERENCES evaluations(id) ON DELETE CASCADE,
  country VARCHAR(255),
  business_category VARCHAR(255),
  nace_category VARCHAR(255),
  use_extended_nace BOOLEAN DEFAULT FALSE,
  product_or_service VARCHAR(50),
  is_launched BOOLEAN DEFAULT FALSE,
  startup_stage VARCHAR(100),
  innovation_approach VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS stage1_scores (
  id SERIAL PRIMARY KEY,
  evaluation_id INTEGER REFERENCES evaluations(id) ON DELETE CASCADE,
  category VARCHAR(50) NOT NULL,
  topic VARCHAR(100) NOT NULL,
  magnitude VARCHAR(50),
  scale VARCHAR(50),
  irreversibility VARCHAR(50),
  likelihood VARCHAR(50),
  is_applicable BOOLEAN DEFAULT TRUE,
  score NUMERIC(5,2),
  is_material BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS stage1_financial (
  id SERIAL PRIMARY KEY,
  evaluation_id INTEGER REFERENCES evaluations(id) ON DELETE CASCADE,
  kpi_name VARCHAR(100) NOT NULL,
  is_evaluated BOOLEAN DEFAULT FALSE,
  rating VARCHAR(100),
  score INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS stage2_risks (
  id SERIAL PRIMARY KEY,
  evaluation_id INTEGER REFERENCES evaluations(id) ON DELETE CASCADE,
  category VARCHAR(100) NOT NULL,
  question TEXT,
  probability VARCHAR(50),
  impact VARCHAR(50),
  is_applicable BOOLEAN DEFAULT TRUE,
  score NUMERIC(5,2)
);

CREATE TABLE IF NOT EXISTS stage2_opportunities (
  id SERIAL PRIMARY KEY,
  evaluation_id INTEGER REFERENCES evaluations(id) ON DELETE CASCADE,
  category VARCHAR(100) NOT NULL,
  question TEXT,
  likelihood VARCHAR(50),
  impact VARCHAR(50),
  is_applicable BOOLEAN DEFAULT TRUE,
  score NUMERIC(5,2)
);

CREATE TABLE IF NOT EXISTS sdg_mappings (
  id SERIAL PRIMARY KEY,
  evaluation_id INTEGER REFERENCES evaluations(id) ON DELETE CASCADE,
  sdg_number INTEGER NOT NULL,
  sdg_title VARCHAR(255),
  source VARCHAR(50)
);