CREATE TYPE course_status AS ENUM (
  'draft',
  'published',
  'archived'
);

CREATE TABLE courses (
  id UUID PRIMARY KEY DEFAULT uuidv4(),
  title TEXT NOT NULL,
  status course_status NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE topics (
  id UUID PRIMARY KEY DEFAULT uuidv4(),

  course_id UUID NOT NULL
    REFERENCES courses(id)
    ON DELETE CASCADE,

  title TEXT NOT NULL,

  order_index INTEGER NOT NULL
    CHECK (order_index > 0),

  CONSTRAINT topics_course_order_unique
  UNIQUE (course_id, order_index)
);

CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);