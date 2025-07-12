-- Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "postgis";

-- Enums
CREATE TYPE oauth_provider AS ENUM ('google', 'facebook', 'apple', 'email');
CREATE TYPE user_role AS ENUM ('user', 'admin', 'moderator');
CREATE TYPE user_plan AS ENUM ('free', 'premium', 'enterprise');
CREATE TYPE subscription_status AS ENUM ('active', 'canceled', 'past_due', 'unpaid');
CREATE TYPE price_level AS ENUM ('free', 'low', 'medium', 'high', 'luxury');
CREATE TYPE difficulty_level AS ENUM ('easy', 'moderate', 'hard', 'extreme');
CREATE TYPE itinerary_status AS ENUM ('draft', 'published', 'archived');

-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  username VARCHAR(32) UNIQUE NOT NULL,
  full_name VARCHAR(120),
  avatar_url TEXT,
  oauth_provider oauth_provider NOT NULL DEFAULT 'google',
  oauth_id TEXT NOT NULL,
  role user_role NOT NULL DEFAULT 'user',
  plan user_plan NOT NULL DEFAULT 'free',
  locale VARCHAR(10) DEFAULT 'en',
  is_active BOOLEAN DEFAULT TRUE,
  deleted_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  last_login_at TIMESTAMPTZ
);

-- Categories table
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug VARCHAR(100) UNIQUE NOT NULL,
  icon_url TEXT,
  color VARCHAR(7),
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  deleted_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Category translations
CREATE TABLE category_translations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  category_id UUID NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
  language_code VARCHAR(10) NOT NULL,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(category_id, language_code)
);

-- Places table
CREATE TABLE places (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug VARCHAR(255) UNIQUE NOT NULL,
  category_id UUID REFERENCES categories(id),
  location GEOGRAPHY(Point, 4326) NOT NULL,
  address TEXT,
  phone VARCHAR(20),
  website_url TEXT,
  email VARCHAR(255),
  price_level price_level DEFAULT 'medium',
  average_rating DECIMAL(3,2) DEFAULT 0.00,
  total_reviews INTEGER DEFAULT 0,
  opening_hours JSONB,
  accessibility_features JSONB,
  amenities TEXT[],
  tags TEXT[],
  emotion_tags TEXT[],
  image_urls TEXT[],
  is_featured BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  deleted_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
  -- embedding VECTOR(1536) -- Optional for semantic search
);

-- Place translations
CREATE TABLE place_translations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  place_id UUID NOT NULL REFERENCES places(id) ON DELETE CASCADE,
  language_code VARCHAR(10) NOT NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  short_description VARCHAR(500),
  tips TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(place_id, language_code)
);

-- Adventures table
CREATE TABLE adventures (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug VARCHAR(255) UNIQUE NOT NULL,
  category_id UUID REFERENCES categories(id),
  duration_minutes INTEGER NOT NULL,
  difficulty_level difficulty_level DEFAULT 'moderate',
  price_level price_level DEFAULT 'medium',
  min_participants INTEGER DEFAULT 1,
  max_participants INTEGER,
  age_restrictions JSONB,
  equipment_needed TEXT[],
  weather_dependent BOOLEAN DEFAULT FALSE,
  season_availability TEXT[],
  tags TEXT[],
  emotion_tags TEXT[],
  image_urls TEXT[],
  average_rating DECIMAL(3,2) DEFAULT 0.00,
  total_reviews INTEGER DEFAULT 0,
  booking_url TEXT,
  contact_info JSONB,
  is_featured BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  deleted_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
  -- embedding VECTOR(1536) -- Optional for semantic search
);

-- Adventure translations
CREATE TABLE adventure_translations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  adventure_id UUID NOT NULL REFERENCES adventures(id) ON DELETE CASCADE,
  language_code VARCHAR(10) NOT NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  short_description VARCHAR(500),
  requirements TEXT,
  what_to_bring TEXT,
  cancellation_policy TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(adventure_id, language_code)
);

-- Adventure places (many-to-many relationship)
CREATE TABLE adventure_places (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  adventure_id UUID NOT NULL REFERENCES adventures(id) ON DELETE CASCADE,
  place_id UUID NOT NULL REFERENCES places(id) ON DELETE CASCADE,
  sort_order INTEGER DEFAULT 0,
  is_main_location BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(adventure_id, place_id)
);

-- Itineraries table
CREATE TABLE itineraries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  start_date DATE,
  end_date DATE,
  total_duration_minutes INTEGER,
  estimated_budget DECIMAL(10,2),
  currency VARCHAR(3) DEFAULT 'EUR',
  participants INTEGER DEFAULT 1,
  preferences JSONB,
  ai_prompt TEXT,
  status itinerary_status DEFAULT 'draft',
  is_public BOOLEAN DEFAULT FALSE,
  views_count INTEGER DEFAULT 0,
  likes_count INTEGER DEFAULT 0,
  deleted_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Itinerary items table
CREATE TABLE itinerary_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  itinerary_id UUID NOT NULL REFERENCES itineraries(id) ON DELETE CASCADE,
  place_id UUID REFERENCES places(id),
  adventure_id UUID REFERENCES adventures(id),
  day_number INTEGER NOT NULL,
  sort_order INTEGER NOT NULL,
  start_time TIME,
  duration_minutes INTEGER,
  notes TEXT,
  estimated_cost DECIMAL(10,2),
  transportation_info JSONB,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  CONSTRAINT check_place_or_adventure CHECK (
    (place_id IS NOT NULL AND adventure_id IS NULL) OR
    (place_id IS NULL AND adventure_id IS NOT NULL)
  )
);

-- Subscriptions table
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  stripe_subscription_id VARCHAR(255) UNIQUE NOT NULL,
  stripe_customer_id VARCHAR(255) NOT NULL,
  status subscription_status NOT NULL,
  plan user_plan NOT NULL,
  current_period_start TIMESTAMPTZ NOT NULL,
  current_period_end TIMESTAMPTZ NOT NULL,
  cancel_at_period_end BOOLEAN DEFAULT FALSE,
  canceled_at TIMESTAMPTZ,
  trial_start TIMESTAMPTZ,
  trial_end TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Feedback table
CREATE TABLE feedback (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  itinerary_id UUID NOT NULL REFERENCES itineraries(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  helpful_votes INTEGER DEFAULT 0,
  is_verified BOOLEAN DEFAULT FALSE,
  deleted_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, itinerary_id)
);

-- Indexes for users
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_users_oauth_id ON users(oauth_id);
CREATE INDEX idx_users_deleted_at ON users(deleted_at);

-- Indexes for categories
CREATE INDEX idx_categories_slug ON categories(slug);
CREATE INDEX idx_categories_is_active ON categories(is_active);
CREATE INDEX idx_categories_deleted_at ON categories(deleted_at);

-- Indexes for category translations
CREATE INDEX idx_category_translations_language ON category_translations(language_code);
CREATE INDEX idx_category_translations_category_id ON category_translations(category_id);

-- Indexes for places
CREATE INDEX idx_places_location ON places USING GIST(location);
CREATE INDEX idx_places_slug ON places(slug);
CREATE INDEX idx_places_category_id ON places(category_id);
CREATE INDEX idx_places_tags ON places USING GIN(tags);
CREATE INDEX idx_places_emotion_tags ON places USING GIN(emotion_tags);
CREATE INDEX idx_places_price_level ON places(price_level);
CREATE INDEX idx_places_is_featured ON places(is_featured);
CREATE INDEX idx_places_is_active ON places(is_active);
CREATE INDEX idx_places_deleted_at ON places(deleted_at);

-- Indexes for place translations
CREATE INDEX idx_place_translations_language ON place_translations(language_code);
CREATE INDEX idx_place_translations_place_id ON place_translations(place_id);

-- Indexes for adventures
CREATE INDEX idx_adventures_slug ON adventures(slug);
CREATE INDEX idx_adventures_category_id ON adventures(category_id);
CREATE INDEX idx_adventures_duration ON adventures(duration_minutes);
CREATE INDEX idx_adventures_difficulty ON adventures(difficulty_level);
CREATE INDEX idx_adventures_price_level ON adventures(price_level);
CREATE INDEX idx_adventures_tags ON adventures USING GIN(tags);
CREATE INDEX idx_adventures_emotion_tags ON adventures USING GIN(emotion_tags);
CREATE INDEX idx_adventures_is_featured ON adventures(is_featured);
CREATE INDEX idx_adventures_is_active ON adventures(is_active);
CREATE INDEX idx_adventures_deleted_at ON adventures(deleted_at);

-- Indexes for adventure translations
CREATE INDEX idx_adventure_translations_language ON adventure_translations(language_code);
CREATE INDEX idx_adventure_translations_adventure_id ON adventure_translations(adventure_id);

-- Indexes for adventure places
CREATE INDEX idx_adventure_places_adventure_id ON adventure_places(adventure_id);
CREATE INDEX idx_adventure_places_place_id ON adventure_places(place_id);

-- Indexes for itineraries
CREATE INDEX idx_itineraries_user_id ON itineraries(user_id);
CREATE INDEX idx_itineraries_start_date ON itineraries(start_date);
CREATE INDEX idx_itineraries_status ON itineraries(status);
CREATE INDEX idx_itineraries_is_public ON itineraries(is_public);
CREATE INDEX idx_itineraries_deleted_at ON itineraries(deleted_at);

-- Indexes for itinerary items
CREATE INDEX idx_itinerary_items_itinerary_id ON itinerary_items(itinerary_id);
CREATE INDEX idx_itinerary_items_place_id ON itinerary_items(place_id);
CREATE INDEX idx_itinerary_items_adventure_id ON itinerary_items(adventure_id);
CREATE INDEX idx_itinerary_items_day_number ON itinerary_items(day_number);

-- Indexes for subscriptions
CREATE INDEX idx_subscriptions_user_id ON subscriptions(user_id);
CREATE INDEX idx_subscriptions_stripe_subscription_id ON subscriptions(stripe_subscription_id);
CREATE INDEX idx_subscriptions_stripe_customer_id ON subscriptions(stripe_customer_id);
CREATE INDEX idx_subscriptions_status ON subscriptions(status);
CREATE INDEX idx_subscriptions_current_period_end ON subscriptions(current_period_end);

-- Indexes for feedback
CREATE INDEX idx_feedback_user_id ON feedback(user_id);
CREATE INDEX idx_feedback_itinerary_id ON feedback(itinerary_id);
CREATE INDEX idx_feedback_rating ON feedback(rating);
CREATE INDEX idx_feedback_deleted_at ON feedback(deleted_at);

-- Insert categories
INSERT INTO categories (id, slug, icon_url, color, sort_order) VALUES
  (uuid_generate_v4(), 'beaches', 'https://example.com/icons/beach.svg', '#2E86AB', 1),
  (uuid_generate_v4(), 'mountains', 'https://example.com/icons/mountain.svg', '#A23B72', 2),
  (uuid_generate_v4(), 'volcanoes', 'https://example.com/icons/volcano.svg', '#F18F01', 3),
  (uuid_generate_v4(), 'forests', 'https://example.com/icons/forest.svg', '#C73E1D', 4),
  (uuid_generate_v4(), 'museums', 'https://example.com/icons/museum.svg', '#592E83', 5),
  (uuid_generate_v4(), 'gastronomy', 'https://example.com/icons/restaurant.svg', '#F4A261', 6),
  (uuid_generate_v4(), 'water-sports', 'https://example.com/icons/water-sports.svg', '#2A9D8F', 7),
  (uuid_generate_v4(), 'hiking', 'https://example.com/icons/hiking.svg', '#E76F51', 8),
  (uuid_generate_v4(), 'culture', 'https://example.com/icons/culture.svg', '#264653', 9),
  (uuid_generate_v4(), 'wellness', 'https://example.com/icons/wellness.svg', '#E9C46A', 10),
  (uuid_generate_v4(), 'nightlife', 'https://example.com/icons/nightlife.svg', '#6A4C93', 11),
  (uuid_generate_v4(), 'shopping', 'https://example.com/icons/shopping.svg', '#FF6B6B', 12),
  (uuid_generate_v4(), 'family', 'https://example.com/icons/family.svg', '#4ECDC4', 13),
  (uuid_generate_v4(), 'adventure', 'https://example.com/icons/adventure.svg', '#45B7D1', 14),
  (uuid_generate_v4(), 'viewpoints', 'https://example.com/icons/viewpoint.svg', '#96CEB4', 15);

-- Insert category translations (Spanish)
INSERT INTO category_translations (category_id, language_code, name, description) VALUES
  ((SELECT id FROM categories WHERE slug = 'beaches'), 'es', 'Playas', 'Disfruta de las mejores playas de arena dorada y aguas cristalinas de Canarias'),
  ((SELECT id FROM categories WHERE slug = 'mountains'), 'es', 'Montañas', 'Explora las impresionantes montañas y paisajes volcánicos únicos'),
  ((SELECT id FROM categories WHERE slug = 'volcanoes'), 'es', 'Volcanes', 'Descubre la fascinante actividad volcánica y formaciones geológicas'),
  ((SELECT id FROM categories WHERE slug = 'forests'), 'es', 'Bosques', 'Sumérgete en exuberantes bosques de laurisilva y pinares canarios'),
  ((SELECT id FROM categories WHERE slug = 'museums'), 'es', 'Museos', 'Conoce la rica historia y cultura canaria en museos y centros culturales'),
  ((SELECT id FROM categories WHERE slug = 'gastronomy'), 'es', 'Gastronomía', 'Saborea la auténtica cocina canaria y sus productos locales'),
  ((SELECT id FROM categories WHERE slug = 'water-sports'), 'es', 'Deportes Acuáticos', 'Vive la emoción del surf, buceo y deportes náuticos'),
  ((SELECT id FROM categories WHERE slug = 'hiking'), 'es', 'Senderismo', 'Recorre senderos espectaculares con vistas panorámicas'),
  ((SELECT id FROM categories WHERE slug = 'culture'), 'es', 'Cultura', 'Descubre tradiciones, fiestas y el patrimonio cultural canario'),
  ((SELECT id FROM categories WHERE slug = 'wellness'), 'es', 'Bienestar', 'Relájate y rejuvenece en espacios de paz y tranquilidad'),
  ((SELECT id FROM categories WHERE slug = 'nightlife'), 'es', 'Vida Nocturna', 'Disfruta de la animada vida nocturna y entretenimiento'),
  ((SELECT id FROM categories WHERE slug = 'shopping'), 'es', 'Compras', 'Encuentra productos locales, artesanías y boutiques únicas'),
  ((SELECT id FROM categories WHERE slug = 'family'), 'es', 'Familia', 'Actividades perfectas para disfrutar en familia con niños'),
  ((SELECT id FROM categories WHERE slug = 'adventure'), 'es', 'Aventura', 'Experimenta emociones fuertes y actividades llenas de adrenalina'),
  ((SELECT id FROM categories WHERE slug = 'viewpoints'), 'es', 'Miradores', 'Contempla vistas panorámicas desde los mejores miradores');

-- Insert category translations (English)
INSERT INTO category_translations (category_id, language_code, name, description) VALUES
  ((SELECT id FROM categories WHERE slug = 'beaches'), 'en', 'Beaches', 'Enjoy the best golden sand beaches and crystal clear waters of the Canary Islands'),
  ((SELECT id FROM categories WHERE slug = 'mountains'), 'en', 'Mountains', 'Explore the impressive mountains and unique volcanic landscapes'),
  ((SELECT id FROM categories WHERE slug = 'volcanoes'), 'en', 'Volcanoes', 'Discover the fascinating volcanic activity and geological formations'),
  ((SELECT id FROM categories WHERE slug = 'forests'), 'en', 'Forests', 'Immerse yourself in lush laurel forests and Canarian pine groves'),
  ((SELECT id FROM categories WHERE slug = 'museums'), 'en', 'Museums', 'Learn about the rich Canarian history and culture in museums and cultural centers'),
  ((SELECT id FROM categories WHERE slug = 'gastronomy'), 'en', 'Gastronomy', 'Taste authentic Canarian cuisine and local products'),
  ((SELECT id FROM categories WHERE slug = 'water-sports'), 'en', 'Water Sports', 'Experience the thrill of surfing, diving and water sports'),
  ((SELECT id FROM categories WHERE slug = 'hiking'), 'en', 'Hiking', 'Walk spectacular trails with panoramic views'),
  ((SELECT id FROM categories WHERE slug = 'culture'), 'en', 'Culture', 'Discover traditions, festivals and Canarian cultural heritage'),
  ((SELECT id FROM categories WHERE slug = 'wellness'), 'en', 'Wellness', 'Relax and rejuvenate in spaces of peace and tranquility'),
  ((SELECT id FROM categories WHERE slug = 'nightlife'), 'en', 'Nightlife', 'Enjoy the lively nightlife and entertainment'),
  ((SELECT id FROM categories WHERE slug = 'shopping'), 'en', 'Shopping', 'Find local products, crafts and unique boutiques'),
  ((SELECT id FROM categories WHERE slug = 'family'), 'en', 'Family', 'Perfect activities to enjoy as a family with children'),
  ((SELECT id FROM categories WHERE slug = 'adventure'), 'en', 'Adventure', 'Experience thrills and adrenaline-filled activities'),
  ((SELECT id FROM categories WHERE slug = 'viewpoints'), 'en', 'Viewpoints', 'Contemplate panoramic views from the best viewpoints');