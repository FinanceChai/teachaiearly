-- ============================================
-- AI Explorer — Supabase Database Setup
-- Run this in your Supabase SQL Editor
-- ============================================

-- 1. Profiles table
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL DEFAULT 'Explorer',
  avatar TEXT NOT NULL DEFAULT '🚀',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2. Progress table
CREATE TABLE progress (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  completed_lessons TEXT[] NOT NULL DEFAULT '{}',
  completed_challenges INT[] NOT NULL DEFAULT '{}',
  earned_badges TEXT[] NOT NULL DEFAULT '{}',
  xp INT NOT NULL DEFAULT 0,
  streak INT NOT NULL DEFAULT 0,
  last_active_date TEXT NOT NULL DEFAULT '',
  total_minutes INT NOT NULL DEFAULT 0,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 3. Subscriptions table
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  stripe_customer_id TEXT UNIQUE,
  stripe_subscription_id TEXT UNIQUE,
  plan_type TEXT CHECK (plan_type IN ('monthly', 'yearly')),
  status TEXT NOT NULL DEFAULT 'inactive'
    CHECK (status IN ('active', 'trialing', 'past_due', 'canceled', 'inactive')),
  current_period_end TIMESTAMPTZ,
  cancel_at_period_end BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 4. Auto-update updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER progress_updated_at
  BEFORE UPDATE ON progress
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER subscriptions_updated_at
  BEFORE UPDATE ON subscriptions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- 5. Auto-create rows when a new user signs up
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, name, avatar)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'name', 'Explorer'),
    COALESCE(NEW.raw_user_meta_data->>'avatar', '🚀')
  );
  INSERT INTO progress (id) VALUES (NEW.id);
  INSERT INTO subscriptions (id) VALUES (NEW.id);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- 6. Row Level Security (RLS)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

-- Profiles: users can read/update/insert their own row
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Progress: users can read/update/insert their own row
CREATE POLICY "Users can view own progress"
  ON progress FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own progress"
  ON progress FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own progress"
  ON progress FOR INSERT WITH CHECK (auth.uid() = id);

-- Subscriptions: users can read their own row (writes via service role only)
CREATE POLICY "Users can view own subscription"
  ON subscriptions FOR SELECT USING (auth.uid() = id);
