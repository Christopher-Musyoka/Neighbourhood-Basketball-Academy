import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Row } from "@/lib/cms";

export type { Row };

/** Current signed-in user + whether they hold the admin role. */
export function useAdminSession() {
  const [userId, setUserId] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let mounted = true;
    supabase.auth.getUser().then(({ data }) => {
      if (!mounted) return;
      setUserId(data.user?.id ?? null);
      setEmail(data.user?.email ?? null);
      setReady(true);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      setUserId(session?.user?.id ?? null);
      setEmail(session?.user?.email ?? null);
      setReady(true);
    });
    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  const roleQuery = useQuery({
    queryKey: ["admin_role", userId],
    enabled: !!userId,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", userId!)
        .maybeSingle();
      if (error) throw error;
      return data?.role ?? null;
    },
  });

  return {
    ready: ready && (!userId || !roleQuery.isPending),
    userId,
    email,
    isAdmin: roleQuery.data === "admin",
  };
}

export function useAdminTable(table: string, order?: { column: string; ascending?: boolean }) {
  return useQuery({
    queryKey: ["admin", table],
    queryFn: async () => {
      let q = supabase.from(table as any).select("*");
      if (order) q = q.order(order.column, { ascending: order.ascending ?? true });
      const { data, error } = await q;
      if (error) throw error;
      return (data ?? []) as Row[];
    },
  });
}

export function useAdminMutations(table: string) {
  const qc = useQueryClient();
  const invalidate = () => qc.invalidateQueries();

  const upsert = useMutation({
    mutationFn: async (row: Row) => {
      const payload = { ...row };
      if (payload.id) {
        const { id, ...rest } = payload;
        const { error } = await supabase.from(table as any).update(rest).eq("id", id);
        if (error) throw error;
      } else {
        delete payload.id;
        const { error } = await supabase.from(table as any).insert(payload as any);
        if (error) throw error;
      }
    },
    onSuccess: invalidate,
  });

  const remove = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from(table as any).delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: invalidate,
  });

  return { upsert, remove };
}

/** Uploads to the private media bucket and returns a long-lived signed URL. */
export async function uploadImage(file: File) {
  const path = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, "_")}`;
  const { error } = await supabase.storage.from("media").upload(path, file, { upsert: false });
  if (error) throw error;
  const { data, error: signErr } = await supabase.storage
    .from("media")
    .createSignedUrl(path, 60 * 60 * 24 * 365 * 5);
  if (signErr) throw signErr;
  return { url: data.signedUrl, path };
}
