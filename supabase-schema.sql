-- ============================================================
--  Chartered Connects — Supabase Schema
--  Run this in: Supabase Dashboard → SQL Editor → New query
-- ============================================================

-- 1. Newsletter Subscribers
create table if not exists subscribers (
  id            bigint generated always as identity primary key,
  email         text not null unique,
  first_name    text not null default '',
  subscribed_at timestamptz not null default now()
);

-- 2. Articleship Applications
create table if not exists applications (
  id                      bigint generated always as identity primary key,
  application_id          uuid not null unique,
  firm_id                 text,
  firm_name               text,
  student_name            text not null,
  email                   text not null,
  phone                   text,
  ca_level                text,
  current_status          text,
  start_preference        text,
  previous_articleship    boolean,
  previous_firm           text,
  transfer_reason         text,
  why_this_firm           text,
  specialisation_interest text,
  cv_file_name            text,
  applied_at              timestamptz not null default now()
);

-- 3. Firm Registrations
create table if not exists firm_registrations (
  id              bigint generated always as identity primary key,
  firm_name       text not null,
  contact_person  text,
  email           text not null,
  city            text,
  phone           text,
  registered_at   timestamptz not null default now()
);

-- 4. City Alert Subscriptions
create table if not exists city_alerts (
  id          bigint generated always as identity primary key,
  email       text not null,
  city        text not null,
  created_at  timestamptz not null default now()
);

-- 5. Podcast Guest Applications
create table if not exists guest_applications (
  id               bigint generated always as identity primary key,
  name             text,
  email            text not null,
  phone            text,
  designation      text,
  company          text,
  linkedin_url     text,
  topic_idea       text,
  years_experience text,
  availability     text,
  applied_at       timestamptz not null default now()
);

-- ============================================================
--  Seed existing 3 subscribers from data/subscribers.json
-- ============================================================
insert into subscribers (email, first_name, subscribed_at)
values
  ('ca.aakashaggarwal2017@gmail.com', 'Aakash',         '2026-03-26T10:12:35.829Z'),
  ('ca.parveen01@gmail.com',          'Parveen Garg',   '2026-03-26T10:46:42.588Z'),
  ('pmandiratta@gmail.com',           'Prarthana',      '2026-03-26T13:38:31.476Z')
on conflict (email) do nothing;
