create table if not exists public.app_state (
  id text primary key,
  state jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

create or replace function public.touch_app_state_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists app_state_updated_at on public.app_state;

create trigger app_state_updated_at
before update on public.app_state
for each row
execute function public.touch_app_state_updated_at();

alter table public.app_state enable row level security;

drop policy if exists "festival app can read state" on public.app_state;
drop policy if exists "festival app can insert state" on public.app_state;
drop policy if exists "festival app can update state" on public.app_state;

create policy "festival app can read state"
on public.app_state
for select
to anon
using (id = 'main');

create policy "festival app can insert state"
on public.app_state
for insert
to anon
with check (id = 'main');

create policy "festival app can update state"
on public.app_state
for update
to anon
using (id = 'main')
with check (id = 'main');
