-- Migration: Replace Stripe fields with Lemon Squeezy fields in subscriptions table
-- Run this in Supabase SQL Editor

-- Add Lemon Squeezy columns
ALTER TABLE subscriptions
  ADD COLUMN IF NOT EXISTS ls_subscription_id TEXT UNIQUE,
  ADD COLUMN IF NOT EXISTS ls_customer_id TEXT;

-- If you want to drop the old Stripe columns (optional — safe to keep for reference):
-- ALTER TABLE subscriptions DROP COLUMN IF EXISTS stripe_customer_id;
-- ALTER TABLE subscriptions DROP COLUMN IF EXISTS stripe_subscription_id;

-- Update the check constraint on status to include 'paused' (Lemon Squeezy supports pausing)
ALTER TABLE subscriptions
  DROP CONSTRAINT IF EXISTS subscriptions_status_check;

ALTER TABLE subscriptions
  ADD CONSTRAINT subscriptions_status_check
  CHECK (status IN ('active', 'trialing', 'past_due', 'paused', 'canceled', 'inactive'));
