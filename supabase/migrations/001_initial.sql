-- Enable pgvector extension
create extension if not exists vector;

-- User profiles (extends Supabase Auth)
create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  company text,
  role text,
  sector text,
  locale text default 'en',
  created_at timestamptz default now()
);

-- Agent chat sessions
create table if not exists agent_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id),
  anonymous_id text,
  locale text not null default 'en',
  qualification jsonb,
  recommended_product text,
  status text default 'active',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Agent messages
create table if not exists agent_messages (
  id uuid primary key default gen_random_uuid(),
  session_id uuid references agent_sessions(id) on delete cascade,
  role text not null,
  content text not null,
  metadata jsonb,
  created_at timestamptz default now()
);

-- Contact form submissions
create table if not exists contact_submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  company text,
  message text,
  type text default 'general',
  product text,
  locale text,
  agent_session_id uuid references agent_sessions(id),
  created_at timestamptz default now()
);

-- Knowledge base for RAG
create table if not exists knowledge_chunks (
  id uuid primary key default gen_random_uuid(),
  source_type text not null,
  source_id text,
  locale text not null,
  title text,
  content text not null,
  embedding vector(1536),
  metadata jsonb,
  created_at timestamptz default now()
);

-- Vector similarity search index
create index if not exists knowledge_chunks_embedding_idx
  on knowledge_chunks using ivfflat (embedding vector_cosine_ops) with (lists = 50);

-- RPC function for vector similarity search
create or replace function match_knowledge_chunks(
  query_embedding vector(1536),
  match_locale text,
  match_count int default 5,
  match_threshold float default 0.7
)
returns table (
  id uuid,
  source_type text,
  title text,
  content text,
  metadata jsonb,
  similarity float
)
language plpgsql
as $$
begin
  return query
  select
    kc.id,
    kc.source_type,
    kc.title,
    kc.content,
    kc.metadata,
    1 - (kc.embedding <=> query_embedding) as similarity
  from knowledge_chunks kc
  where kc.locale = match_locale
    and 1 - (kc.embedding <=> query_embedding) > match_threshold
  order by kc.embedding <=> query_embedding
  limit match_count;
end;
$$;
