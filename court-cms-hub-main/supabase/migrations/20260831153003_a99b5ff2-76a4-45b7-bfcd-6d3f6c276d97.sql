
REVOKE ALL ON FUNCTION public.enforce_two_admins() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.touch_updated_at() FROM PUBLIC, anon, authenticated;

DROP POLICY "public read published news" ON public.news;
CREATE POLICY "anon read published news" ON public.news FOR SELECT TO anon USING (status = 'published');
CREATE POLICY "auth read news" ON public.news FOR SELECT TO authenticated USING (status = 'published' OR public.is_admin());

REVOKE ALL ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon;
REVOKE ALL ON FUNCTION public.is_admin() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated;
GRANT EXECUTE ON FUNCTION public.is_admin() TO authenticated;
