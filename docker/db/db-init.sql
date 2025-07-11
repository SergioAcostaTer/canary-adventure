CREATE TYPE oauth_provider AS ENUM ('google');

CREATE TYPE user_role AS ENUM ('user', 'moderator', 'admin', 'superadmin');

CREATE TYPE user_plan AS ENUM ('free', 'premium');

CREATE TABLE users (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
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
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  last_login_at TIMESTAMPTZ
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_users_oauth_id ON users(oauth_id);


INSERT INTO users (email, username, full_name, avatar_url, oauth_provider, oauth_id, role, plan, locale)
VALUES ('Sergio@example.com', 'Sergio', 'Sergio Perez', 'http://example.com/avatar.jpg', 'google', '123456789', 'user', 'free', 'en');