import { createFileRoute } from "@tanstack/react-router";
import { Shell, PageHeader } from "@/components/site/Shell";
import { Eyebrow, Panel } from "@/components/site/pieces";
import { useContentBlocks, useSiteSettings } from "@/lib/cms";

export const Route = createFileRoute("/main")({
  head: () => ({
    meta: [
      { title: "About the Academy | Neighbourhood Academy" },
      {
        name: "description",
        content:
          "Who we are, how we train and what the Neighbourhood Academy basketball programme offers young players.",
      },
      { property: "og:title", content: "About the Academy | Neighbourhood Academy" },
      {
        property: "og:description",
        content: "Our story, philosophy, facilities and upcoming academy events.",
      },
    ],
  }),
  component: MainPage,
});

const FEATURED = ["team_bonding", "open_trials"];

function MainPage() {
  const { data: blocks = [] } = useContentBlocks("main");
  const { data: s } = useSiteSettings();

  const story = blocks.filter((b) => !FEATURED.includes(b.block_key));
  const featured = FEATURED.map((k) => blocks.find((b) => b.block_key === k)).filter(Boolean) as typeof blocks;

  return (
    <Shell>
      <main>
        <PageHeader
          eyebrow="THE CLUB"
          title={s?.academy_name ?? "Neighbourhood Academy"}
          intro={s?.description}
        />

        {featured.length > 0 && (
          <section className="mx-auto max-w-7xl px-5 pb-14 md:px-8">
            <div className="grid gap-6 md:grid-cols-2">
              {featured.map((b) => (
                <Panel key={b.id}>
                  {b.image_url && (
                    <img
                      src={b.image_url}
                      alt={b.heading ?? "Academy"}
                      loading="lazy"
                      className="mb-4 aspect-[16/9] w-full rounded-xl object-cover"
                    />
                  )}
                  <Eyebrow>ACADEMY</Eyebrow>
                  <h2 className="mt-2 text-3xl">{b.heading}</h2>
                  {b.body && (
                    <p className="mt-3 whitespace-pre-line text-sm text-muted-foreground">{b.body}</p>
                  )}
                </Panel>
              ))}
            </div>
          </section>
        )}

        <section className="mx-auto max-w-7xl px-5 pb-20 md:px-8">
          <div className="grid gap-6 md:grid-cols-2">
            {story.map((b) => (
              <Panel key={b.id}>
                {b.image_url && (
                  <img
                    src={b.image_url}
                    alt={b.heading ?? "Academy"}
                    loading="lazy"
                    className="mb-4 aspect-[16/9] w-full rounded-xl object-cover"
                  />
                )}
                <Eyebrow>{(b.block_key ?? "").toUpperCase().replace(/_/g, " ")}</Eyebrow>
                <h2 className="mt-2 text-2xl">{b.heading}</h2>
                <p className="mt-3 whitespace-pre-line text-sm text-muted-foreground">{b.body}</p>
              </Panel>
            ))}
            {story.length === 0 && <p className="text-sm text-muted-foreground">Content coming soon.</p>}
          </div>
        </section>
      </main>
    </Shell>
  );
}
