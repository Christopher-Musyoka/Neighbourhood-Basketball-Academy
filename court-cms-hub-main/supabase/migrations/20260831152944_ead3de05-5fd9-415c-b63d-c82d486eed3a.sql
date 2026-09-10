
-- ROLES
CREATE TYPE public.app_role AS ENUM ('admin');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  email text,
  role public.app_role NOT NULL DEFAULT 'admin',
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role);
$$;

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT public.has_role(auth.uid(), 'admin'::public.app_role);
$$;

CREATE POLICY "admins read roles" ON public.user_roles FOR SELECT TO authenticated USING (public.is_admin() OR user_id = auth.uid());

-- hard cap of exactly two administrators
CREATE OR REPLACE FUNCTION public.enforce_two_admins()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF (SELECT count(*) FROM public.user_roles WHERE role = 'admin') >= 2 THEN
    RAISE EXCEPTION 'Only two administrator accounts are allowed';
  END IF;
  RETURN NEW;
END;
$$;
CREATE TRIGGER trg_two_admins BEFORE INSERT ON public.user_roles
FOR EACH ROW EXECUTE FUNCTION public.enforce_two_admins();

CREATE OR REPLACE FUNCTION public.touch_updated_at()
RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

-- SITE SETTINGS
CREATE TABLE public.site_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  academy_name text NOT NULL DEFAULT 'Neighbourhood Academy',
  logo_url text,
  hero_image_url text,
  hero_title text,
  hero_subtitle text,
  hero_badge text,
  description text,
  phone text, email text, address text,
  latitude numeric, longitude numeric, map_url text,
  facebook_url text, instagram_url text, twitter_url text, youtube_url text, tiktok_url text,
  seo_title text, seo_description text,
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- CONTENT BLOCKS (editable text anywhere on the site)
CREATE TABLE public.content_blocks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  block_key text NOT NULL UNIQUE,
  page text NOT NULL DEFAULT 'main',
  heading text,
  body text,
  image_url text,
  sort_order int NOT NULL DEFAULT 0,
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.leagues (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  gender text NOT NULL,
  description text,
  active boolean NOT NULL DEFAULT true,
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.seasons (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  start_date date, end_date date,
  active boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.teams (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  gender text NOT NULL,
  league_id uuid REFERENCES public.leagues(id) ON DELETE SET NULL,
  season_id uuid REFERENCES public.seasons(id) ON DELETE SET NULL,
  description text,
  image_url text,
  active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.players (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  team_id uuid REFERENCES public.teams(id) ON DELETE CASCADE,
  league_id uuid REFERENCES public.leagues(id) ON DELETE SET NULL,
  season_id uuid REFERENCES public.seasons(id) ON DELETE SET NULL,
  gender text,
  jersey_number int,
  position text,
  height text,
  date_of_birth date,
  photo_url text,
  biography text,
  stats jsonb NOT NULL DEFAULT '{}'::jsonb,
  active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.coaches (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  team_id uuid REFERENCES public.teams(id) ON DELETE CASCADE,
  league_id uuid REFERENCES public.leagues(id) ON DELETE SET NULL,
  role text,
  photo_url text,
  biography text,
  active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.fixtures (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id uuid REFERENCES public.teams(id) ON DELETE CASCADE,
  league_id uuid REFERENCES public.leagues(id) ON DELETE SET NULL,
  season_id uuid REFERENCES public.seasons(id) ON DELETE SET NULL,
  opponent text NOT NULL,
  match_date date NOT NULL,
  match_time text,
  venue text,
  home_away text NOT NULL DEFAULT 'Home',
  competition text,
  status text NOT NULL DEFAULT 'Scheduled',
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.results (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id uuid REFERENCES public.teams(id) ON DELETE CASCADE,
  league_id uuid REFERENCES public.leagues(id) ON DELETE SET NULL,
  season_id uuid REFERENCES public.seasons(id) ON DELETE SET NULL,
  opponent text NOT NULL,
  match_date date NOT NULL,
  our_score int,
  opponent_score int,
  home_away text NOT NULL DEFAULT 'Home',
  competition text,
  status text NOT NULL DEFAULT 'Final',
  report text,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.standings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  league_id uuid REFERENCES public.leagues(id) ON DELETE CASCADE,
  season_id uuid REFERENCES public.seasons(id) ON DELETE SET NULL,
  team_name text NOT NULL,
  position int NOT NULL DEFAULT 1,
  played int NOT NULL DEFAULT 0,
  won int NOT NULL DEFAULT 0,
  lost int NOT NULL DEFAULT 0,
  points int NOT NULL DEFAULT 0,
  points_for int NOT NULL DEFAULT 0,
  points_against int NOT NULL DEFAULT 0,
  is_academy boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.news (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  excerpt text,
  content text,
  featured_image_url text,
  category text,
  section text NOT NULL DEFAULT 'main',
  league_id uuid REFERENCES public.leagues(id) ON DELETE SET NULL,
  team_id uuid REFERENCES public.teams(id) ON DELETE SET NULL,
  author text,
  published_at date NOT NULL DEFAULT current_date,
  status text NOT NULL DEFAULT 'published',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.gallery (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  image_url text NOT NULL,
  caption text,
  alt_text text,
  category text NOT NULL DEFAULT 'main',
  league_id uuid REFERENCES public.leagues(id) ON DELETE SET NULL,
  team_id uuid REFERENCES public.teams(id) ON DELETE SET NULL,
  season_id uuid REFERENCES public.seasons(id) ON DELETE SET NULL,
  featured boolean NOT NULL DEFAULT false,
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.media (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  url text NOT NULL,
  file_path text,
  caption text,
  alt_text text,
  category text,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  event_date date NOT NULL,
  event_time text,
  location text,
  image_url text,
  category text,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.sponsors (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  logo_url text,
  description text,
  website text,
  sort_order int NOT NULL DEFAULT 0,
  active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  subject text,
  message text NOT NULL,
  status text NOT NULL DEFAULT 'new',
  created_at timestamptz NOT NULL DEFAULT now()
);

-- GRANTS
GRANT SELECT ON public.site_settings, public.content_blocks, public.leagues, public.seasons,
  public.teams, public.players, public.coaches, public.fixtures, public.results,
  public.standings, public.news, public.gallery, public.events, public.sponsors TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.site_settings, public.content_blocks, public.leagues,
  public.seasons, public.teams, public.players, public.coaches, public.fixtures, public.results,
  public.standings, public.news, public.gallery, public.media, public.events, public.sponsors,
  public.contact_messages TO authenticated;
GRANT INSERT ON public.contact_messages TO anon;
GRANT ALL ON public.site_settings, public.content_blocks, public.leagues, public.seasons,
  public.teams, public.players, public.coaches, public.fixtures, public.results, public.standings,
  public.news, public.gallery, public.media, public.events, public.sponsors,
  public.contact_messages TO service_role;

-- RLS: public read, admin write
DO $$
DECLARE t text;
BEGIN
  FOREACH t IN ARRAY ARRAY['site_settings','content_blocks','leagues','seasons','teams','players',
    'coaches','fixtures','results','standings','gallery','events','sponsors'] LOOP
    EXECUTE format('ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY', t);
    EXECUTE format('CREATE POLICY "public read %1$s" ON public.%1$I FOR SELECT USING (true)', t);
    EXECUTE format('CREATE POLICY "admin write %1$s" ON public.%1$I FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin())', t);
  END LOOP;
END $$;

ALTER TABLE public.news ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read published news" ON public.news FOR SELECT USING (status = 'published' OR public.is_admin());
CREATE POLICY "admin write news" ON public.news FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

ALTER TABLE public.media ENABLE ROW LEVEL SECURITY;
CREATE POLICY "admin media" ON public.media FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "anyone can send a message" ON public.contact_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "admins read messages" ON public.contact_messages FOR SELECT TO authenticated USING (public.is_admin());
CREATE POLICY "admins update messages" ON public.contact_messages FOR UPDATE TO authenticated USING (public.is_admin());
CREATE POLICY "admins delete messages" ON public.contact_messages FOR DELETE TO authenticated USING (public.is_admin());

CREATE TRIGGER t1 BEFORE UPDATE ON public.site_settings FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();
CREATE TRIGGER t2 BEFORE UPDATE ON public.content_blocks FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();
CREATE TRIGGER t3 BEFORE UPDATE ON public.news FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

-- SEED
INSERT INTO public.site_settings (academy_name, hero_title, hero_subtitle, hero_badge, description, phone, email, address, latitude, longitude, facebook_url, instagram_url, twitter_url, youtube_url, seo_title, seo_description)
VALUES ('Neighbourhood Academy',
 'THE NEIGHBOURHOOD BASKETBALL ACADEMY',
 'Two boys programmes split across the NBA and NCL, a girls team in the NCL, and a youth pathway that runs through every court in the borough.',
 'NEXT MATCH · SAT 14:30',
 'A neighbourhood basketball academy running boys and girls programmes across two leagues.',
 '+44 20 7946 0112', 'hello@nbhd.academy', '14 Chalk Lane, Borough End, London',
 51.5074, -0.1278,
 'https://facebook.com/', 'https://instagram.com/', 'https://x.com/', 'https://youtube.com/',
 'Neighbourhood Academy | Youth Basketball Club',
 'Boys NBA, Boys NCL and Girls NCL basketball teams, fixtures, results, standings and news from Neighbourhood Academy.');

INSERT INTO public.seasons (name, start_date, end_date, active) VALUES ('2026 Season','2025-09-01','2026-06-30', true);

INSERT INTO public.leagues (name, slug, gender, description, sort_order) VALUES
 ('NBA','boys-nba','boys','The flagship boys competition — Neighbourhood Academy''s senior boys programme.',1),
 ('NCL','boys-ncl','boys','The boys development league, building the next generation of academy players.',2),
 ('NCL','girls-ncl','girls','The girls national community league — our full girls competitive programme.',3);

INSERT INTO public.teams (name, gender, league_id, season_id, description, active)
SELECT 'Neighbourhood Boys NBA','boys', l.id, s.id, 'Our senior boys squad competing in the NBA division.', true
FROM public.leagues l, public.seasons s WHERE l.slug='boys-nba';
INSERT INTO public.teams (name, gender, league_id, season_id, description, active)
SELECT 'Neighbourhood Boys NCL','boys', l.id, s.id, 'The boys development squad competing in the NCL division.', true
FROM public.leagues l, public.seasons s WHERE l.slug='boys-ncl';
INSERT INTO public.teams (name, gender, league_id, season_id, description, active)
SELECT 'Neighbourhood Girls NCL','girls', l.id, s.id, 'Our girls squad competing in the NCL division.', true
FROM public.leagues l, public.seasons s WHERE l.slug='girls-ncl';

INSERT INTO public.content_blocks (block_key, page, heading, body, sort_order) VALUES
 ('main_intro','main','Welcome to Neighbourhood Academy','Neighbourhood Academy is a community basketball club developing boys and girls from U12 through to senior level. We run three competitive squads and an open youth pathway across the borough.',1),
 ('main_mission','main','Our Mission','To give every young person in the neighbourhood a court to play on, a coach who knows their name, and a pathway that takes them as far as their work will carry them.',2),
 ('main_vision','main','Our Vision','A neighbourhood where basketball is the first sport a child tries and the last one they leave.',3),
 ('main_values','main','Our Values','Effort over ego. Team over talent. Neighbourhood over everything.',4),
 ('main_history','main','Our History','Founded in 2019 on a single outdoor court, the academy now fields three league teams and coaches over 140 young players each season.',5),
 ('main_philosophy','main','Basketball Philosophy','We play fast, share the ball and defend as five. Fundamentals first, systems second, freedom earned.',6),
 ('main_youth','main','Youth Development','Age-group sessions run midweek with skills, strength and film work built around each player''s individual development plan.',7),
 ('main_community','main','Community Involvement','Free holiday camps, school outreach and open gym nights keep the courts busy all year round.',8);

INSERT INTO public.standings (league_id, season_id, team_name, position, played, won, lost, points, points_for, points_against, is_academy)
SELECT l.id, s.id, x.team, x.pos, x.p, x.w, x.lo, x.pts, x.pf, x.pa, x.acad
FROM public.leagues l, public.seasons s,
(VALUES
 ('Neighbourhood',1,14,12,2,26,1184,1000,true),
 ('St. Kieran',2,14,11,3,25,1151,1000,false),
 ('Meridian',3,14,9,5,23,1096,1000,false),
 ('Halcyon',4,14,7,7,21,1012,1000,false),
 ('Northgate',5,14,4,10,18,923,1000,false)
) AS x(team,pos,p,w,lo,pts,pf,pa,acad)
WHERE l.slug='boys-nba';

INSERT INTO public.standings (league_id, season_id, team_name, position, played, won, lost, points, points_for, points_against, is_academy)
SELECT l.id, s.id, x.team, x.pos, x.p, x.w, x.lo, x.pts, x.pf, x.pa, x.acad
FROM public.leagues l, public.seasons s,
(VALUES
 ('Rookwood',1,13,11,2,24,1043,932,false),
 ('Kestrel',2,13,10,3,23,1010,940,false),
 ('Neighbourhood',3,13,9,4,22,998,910,true),
 ('Eastgate',4,13,5,8,18,890,955,false),
 ('Brackenhill',5,13,2,11,15,821,1025,false)
) AS x(team,pos,p,w,lo,pts,pf,pa,acad)
WHERE l.slug='boys-ncl';

INSERT INTO public.standings (league_id, season_id, team_name, position, played, won, lost, points, points_for, points_against, is_academy)
SELECT l.id, s.id, x.team, x.pos, x.p, x.w, x.lo, x.pts, x.pf, x.pa, x.acad
FROM public.leagues l, public.seasons s,
(VALUES
 ('Neighbourhood',1,12,12,0,24,912,701,true),
 ('Riverdale',2,12,9,3,21,845,760,false),
 ('Halcyon',3,12,7,5,19,801,788,false),
 ('Northgate',4,12,4,8,16,742,830,false),
 ('Meridian',5,12,1,11,13,668,889,false)
) AS x(team,pos,p,w,lo,pts,pf,pa,acad)
WHERE l.slug='girls-ncl';

INSERT INTO public.players (name, team_id, league_id, season_id, gender, jersey_number, position, height, biography, stats)
SELECT x.n, t.id, t.league_id, t.season_id, 'boys', x.j, x.pos, x.h, x.bio, x.st::jsonb
FROM public.teams t, (VALUES
 ('D. Okafor',7,'PG','1.88m','Floor general and captain, leads the squad in assists.','{"PPG":"19.4","APG":"6.1","RPG":"3.2"}'),
 ('L. Vance',23,'SF','1.96m','Leading scorer with a reliable catch-and-shoot game.','{"PPG":"22.1","RPG":"7.4","SPG":"1.6"}'),
 ('M. Reyes',11,'C','2.04m','Anchors the paint on both ends of the floor.','{"PPG":"15.8","RPG":"11.2","BPG":"2.4"}'),
 ('S. Adeyemi',5,'SG','1.91m','Explosive scorer off the bench turned starter.','{"PPG":"17.6","APG":"3.3","SPG":"2.1"}')
) AS x(n,j,pos,h,bio,st)
WHERE t.name = 'Neighbourhood Boys NBA';

INSERT INTO public.players (name, team_id, league_id, season_id, gender, jersey_number, position, height, biography, stats)
SELECT x.n, t.id, t.league_id, t.season_id, 'boys', x.j, x.pos, x.h, x.bio, x.st::jsonb
FROM public.teams t, (VALUES
 ('J. Whitmore',4,'PG','1.82m','Quick handle, sets the tempo for the development squad.','{"PPG":"14.2","APG":"5.8"}'),
 ('T. Bello',15,'PF','1.98m','Relentless on the glass, improving jump shot.','{"PPG":"12.9","RPG":"9.1"}'),
 ('K. Naylor',8,'SG','1.86m','Best three-point percentage in the squad.','{"PPG":"16.4","3P%":"41"}')
) AS x(n,j,pos,h,bio,st)
WHERE t.name = 'Neighbourhood Boys NCL';

INSERT INTO public.players (name, team_id, league_id, season_id, gender, jersey_number, position, height, biography, stats)
SELECT x.n, t.id, t.league_id, t.season_id, 'girls', x.j, x.pos, x.h, x.bio, x.st::jsonb
FROM public.teams t, (VALUES
 ('A. Mensah',9,'PG','1.74m','Unbeaten season captain, elite defender at the point.','{"PPG":"18.2","APG":"7.0","SPG":"3.1"}'),
 ('R. Kowalski',21,'SF','1.83m','Two-way wing with a growing mid-range game.','{"PPG":"15.5","RPG":"6.8"}'),
 ('N. Ferreira',33,'C','1.90m','Dominant rebounder, leads the league in blocks.','{"PPG":"13.1","RPG":"10.4","BPG":"2.9"}')
) AS x(n,j,pos,h,bio,st)
WHERE t.name = 'Neighbourhood Girls NCL';

INSERT INTO public.coaches (name, team_id, league_id, role, biography)
SELECT x.n, t.id, t.league_id, x.r, x.b FROM public.teams t, (VALUES
 ('Marcus Hale','Head Coach','Fifteen years coaching in the borough, took the NBA squad to back-to-back finals.'),
 ('Priya Raman','Assistant Coach','Skills specialist focused on guard development and shooting mechanics.')
) AS x(n,r,b) WHERE t.name='Neighbourhood Boys NBA';

INSERT INTO public.coaches (name, team_id, league_id, role, biography)
SELECT 'Dean Ferris', t.id, t.league_id, 'Head Coach','Runs the boys development programme and the U14 pathway.'
FROM public.teams t WHERE t.name='Neighbourhood Boys NCL';

INSERT INTO public.coaches (name, team_id, league_id, role, biography)
SELECT 'Lucia Bennett', t.id, t.league_id, 'Head Coach','Former national league guard, now leading the unbeaten girls squad.'
FROM public.teams t WHERE t.name='Neighbourhood Girls NCL';

INSERT INTO public.fixtures (team_id, league_id, season_id, opponent, match_date, match_time, venue, home_away, competition, status)
SELECT t.id, t.league_id, t.season_id, x.o, x.d::date, x.tm, x.v, x.ha, x.c, 'Scheduled'
FROM public.teams t, (VALUES
 ('St. Kieran','2026-09-12','14:30','Chalk Lane Sports Hall','Home','League'),
 ('Meridian','2026-09-19','16:00','Meridian Arena','Away','League'),
 ('Halcyon','2026-09-26','14:30','Chalk Lane Sports Hall','Home','Cup')
) AS x(o,d,tm,v,ha,c) WHERE t.name='Neighbourhood Boys NBA';

INSERT INTO public.fixtures (team_id, league_id, season_id, opponent, match_date, match_time, venue, home_away, competition, status)
SELECT t.id, t.league_id, t.season_id, x.o, x.d::date, x.tm, x.v, x.ha, 'League', 'Scheduled'
FROM public.teams t, (VALUES
 ('Rookwood','2026-09-13','11:00','Rookwood Centre','Away'),
 ('Eastgate','2026-09-20','13:00','Chalk Lane Sports Hall','Home')
) AS x(o,d,tm,v,ha) WHERE t.name='Neighbourhood Boys NCL';

INSERT INTO public.fixtures (team_id, league_id, season_id, opponent, match_date, match_time, venue, home_away, competition, status)
SELECT t.id, t.league_id, t.season_id, x.o, x.d::date, x.tm, x.v, x.ha, 'League', 'Scheduled'
FROM public.teams t, (VALUES
 ('Riverdale','2026-09-13','15:00','Chalk Lane Sports Hall','Home'),
 ('Northgate','2026-09-27','12:30','Northgate Hall','Away')
) AS x(o,d,tm,v,ha) WHERE t.name='Neighbourhood Girls NCL';

INSERT INTO public.results (team_id, league_id, season_id, opponent, match_date, our_score, opponent_score, home_away, competition, status)
SELECT t.id, t.league_id, t.season_id, x.o, x.d::date, x.us, x.them, x.ha, 'League','Final'
FROM public.teams t, (VALUES
 ('Kestrel','2026-03-12',82,74,'Home'),
 ('Meridian','2026-03-05',79,88,'Away'),
 ('Halcyon','2026-02-26',91,72,'Home'),
 ('Northgate','2026-02-19',68,68,'Away'),
 ('Rookwood','2026-02-12',77,65,'Home')
) AS x(o,d,us,them,ha) WHERE t.name='Neighbourhood Boys NBA';

INSERT INTO public.results (team_id, league_id, season_id, opponent, match_date, our_score, opponent_score, home_away, competition, status)
SELECT t.id, t.league_id, t.season_id, x.o, x.d::date, x.us, x.them, x.ha, 'League','Final'
FROM public.teams t, (VALUES
 ('Eastgate','2026-03-08',71,68,'Home'),
 ('Brackenhill','2026-03-01',84,60,'Away')
) AS x(o,d,us,them,ha) WHERE t.name='Neighbourhood Boys NCL';

INSERT INTO public.results (team_id, league_id, season_id, opponent, match_date, our_score, opponent_score, home_away, competition, status)
SELECT t.id, t.league_id, t.season_id, x.o, x.d::date, x.us, x.them, x.ha, 'League','Final'
FROM public.teams t, (VALUES
 ('Riverdale','2026-03-09',64,60,'Away'),
 ('Halcyon','2026-03-02',77,55,'Home')
) AS x(o,d,us,them,ha) WHERE t.name='Neighbourhood Girls NCL';

INSERT INTO public.news (title, slug, excerpt, content, category, section, author, published_at, status) VALUES
 ('Boys NBA edge St. Kieran in the derby','boys-nba-edge-st-kieran','A late run sealed a four-point win in the borough derby.','<p>The boys NBA squad came from six down in the final quarter to take the derby 82-78 at Chalk Lane.</p><p>D. Okafor finished with 21 points and 9 assists.</p>','Match Report','boys-nba','Academy Media','2026-03-12','published'),
 ('Girls NCL sit top of the table','girls-ncl-top-of-table','Twelve games, twelve wins for the girls squad.','<p>The girls remain unbeaten after a composed road win at Riverdale.</p>','Team News','girls-ncl','Academy Media','2026-03-09','published'),
 ('Spring training camp opens for U14s','spring-training-camp-u14','Free places available for the spring holiday camp.','<p>Sessions run daily through the spring break, covering fundamentals, conditioning and small-sided games.</p>','Academy','main','Academy Media','2026-03-01','published'),
 ('Boys NCL climb to third with Eastgate win','boys-ncl-climb-to-third','A three-point win keeps the development squad in the hunt.','<p>A gritty 71-68 win at home moves the NCL boys up to third.</p>','Match Report','boys-ncl','Academy Media','2026-03-08','published');

INSERT INTO public.sponsors (name, description, website, sort_order) VALUES
 ('CourtSide Co.','Kit and equipment partner.','https://example.com',1),
 ('Northgate Sport','Community sport funding partner.','https://example.com',2),
 ('Arena Energy','Match day energy partner.','https://example.com',3),
 ('Borough Bank','Youth programme sponsor.','https://example.com',4);

INSERT INTO public.events (name, description, event_date, event_time, location, category) VALUES
 ('Spring Holiday Camp','Five days of skills, scrimmages and film for U12–U16.','2026-04-06','09:00','Chalk Lane Sports Hall','Academy'),
 ('Open Trials 2026/27','Trials for all boys and girls squads ahead of the new season.','2026-06-14','10:00','Chalk Lane Sports Hall','Trials');
