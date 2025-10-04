/*
  # TechPulse Brasil - Database Schema

  1. New Tables
    - `categories`
      - `id` (uuid, primary key)
      - `name` (text, unique) - Category name
      - `slug` (text, unique) - URL-friendly slug
      - `description` (text) - Category description
      - `icon` (text) - Lucide icon name
      - `color` (text) - Theme color
      - `created_at` (timestamptz)
    
    - `articles`
      - `id` (uuid, primary key)
      - `title` (text) - Article title
      - `slug` (text, unique) - URL-friendly slug
      - `excerpt` (text) - Short description
      - `content` (text) - Full content
      - `image_url` (text) - Featured image
      - `author` (text) - Author name
      - `category_id` (uuid, foreign key)
      - `is_featured` (boolean)
      - `is_trending` (boolean)
      - `views` (integer)
      - `published_at` (timestamptz)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Public read access for published content
*/

-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  slug text UNIQUE NOT NULL,
  description text DEFAULT '',
  icon text DEFAULT 'Folder',
  color text DEFAULT '#3B82F6',
  created_at timestamptz DEFAULT now()
);

-- Create articles table
CREATE TABLE IF NOT EXISTS articles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  excerpt text DEFAULT '',
  content text DEFAULT '',
  image_url text DEFAULT '',
  author text DEFAULT 'TechPulse Brasil',
  category_id uuid REFERENCES categories(id) ON DELETE SET NULL,
  is_featured boolean DEFAULT false,
  is_trending boolean DEFAULT false,
  views integer DEFAULT 0,
  published_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Anyone can view categories"
  ON categories FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Anyone can view published articles"
  ON articles FOR SELECT
  TO public
  USING (published_at <= now());

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_articles_slug ON articles(slug);
CREATE INDEX IF NOT EXISTS idx_articles_category ON articles(category_id);
CREATE INDEX IF NOT EXISTS idx_articles_published ON articles(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_articles_featured ON articles(is_featured) WHERE is_featured = true;

-- Insert categories
INSERT INTO categories (name, slug, description, icon, color) VALUES
  ('Hardware & Gadgets', 'hardware', 'Lançamentos, análises e reviews dos melhores dispositivos', 'Cpu', '#3B82F6'),
  ('Inteligência Artificial', 'inteligencia-artificial', 'IA, Machine Learning e o futuro da tecnologia', 'Brain', '#8B5CF6'),
  ('Tech na Saúde', 'healthtech', 'Inovações em saúde, telemedicina e biotecnologia', 'HeartPulse', '#10B981'),
  ('Programação & Dev', 'programacao', 'Desenvolvimento, frameworks e carreira tech', 'Code', '#F59E0B')
ON CONFLICT (slug) DO NOTHING;