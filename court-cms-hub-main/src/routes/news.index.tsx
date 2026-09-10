import { createFileRoute } from "@tanstack/react-router";
import { Shell, PageHeader } from "@/components/site/Shell";
import { NewsCard } from "@/components/site/pieces";
import { useNews } from "@/lib/cms";

export const Route = createFileRoute("/news/")({
  head: () => ({
    meta: [
      { title: "News | Neighbourhood Academy" },
      { name: "description", content: "Match reports, club announcements and player stories from the academy." },
      { property: "og:title", content: "News | Neighbourhood Academy" },
      { property: "og:description", content: "Match reports and club news from Neighbourhood Academy." },
    ],
  }),
  component: NewsPage,
});

function NewsPage() {
  const { data: news = [] } = useNews();

  return (
    <Shell>
      <main>
        <PageHeader eyebrow="NEWSROOM" title="News" intro="Match reports, announcements and stories from the club." />
        <section className="mx-auto max-w-7xl px-5 pb-20 md:px-8">
          {news.length === 0 ? (
            <p className="text-sm text-muted-foreground">No articles published yet.</p>
          ) : (
            <div className="grid gap-5 md:grid-cols-3">
              {news.map((n) => (
                <NewsCard key={n.id} n={n} />
              ))}
            </div>
          )}
        </section>
      </main>
    </Shell>
  );
}
