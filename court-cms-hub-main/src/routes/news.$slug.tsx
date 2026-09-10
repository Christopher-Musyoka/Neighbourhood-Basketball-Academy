import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Shell } from "@/components/site/Shell";
import { Eyebrow } from "@/components/site/pieces";
import { formatDate, type Row } from "@/lib/cms";

export const Route = createFileRoute("/news/$slug")({
  head: () => ({
    meta: [
      { title: "Article | Neighbourhood Academy" },
      { name: "description", content: "Read the latest story from Neighbourhood Academy basketball." },
      { property: "og:title", content: "Article | Neighbourhood Academy" },
      { property: "og:description", content: "Read the latest story from Neighbourhood Academy basketball." },
    ],
  }),
  component: Article,
});

function Article() {
  const { slug } = Route.useParams();
  const { data, isPending } = useQuery({
    queryKey: ["news_article", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("news")
        .select("*")
        .eq("slug", slug)
        .eq("status", "published")
        .maybeSingle();
      if (error) throw error;
      return (data ?? null) as Row | null;
    },
  });

  return (
    <Shell>
      <main className="mx-auto max-w-3xl px-5 py-12 md:px-8 md:py-16">
        {isPending && <p className="text-sm text-muted-foreground">Loading…</p>}
        {!isPending && !data && (
          <div>
            <h1 className="text-3xl">Article not found</h1>
            <Link to="/news" className="mt-4 inline-block font-mono text-[11px] tracking-widest hover:text-accent">
              ← BACK TO NEWS
            </Link>
          </div>
        )}
        {data && (
          <article>
            <Eyebrow>
              {(data.category ?? "NEWS").toUpperCase()} · {formatDate(data.published_at)}
              {data.author ? ` · ${data.author}` : ""}
            </Eyebrow>
            <h1 className="mt-3 text-balance text-4xl leading-tight tracking-tight md:text-5xl">{data.title}</h1>
            {data.excerpt && <p className="mt-4 text-pretty text-muted-foreground">{data.excerpt}</p>}
            {data.featured_image_url && (
              <img
                src={data.featured_image_url}
                alt={data.title}
                className="mt-8 aspect-[16/9] w-full rounded-2xl object-cover"
              />
            )}
            <div className="mt-8 whitespace-pre-line text-[15px] leading-relaxed">{data.content}</div>
            <Link to="/news" className="mt-10 inline-block font-mono text-[11px] tracking-widest hover:text-accent">
              ← BACK TO NEWS
            </Link>
          </article>
        )}
      </main>
    </Shell>
  );
}
