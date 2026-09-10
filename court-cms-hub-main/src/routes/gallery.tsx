import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Shell, PageHeader } from "@/components/site/Shell";
import { useGallery } from "@/lib/cms";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery | Neighbourhood Academy Basketball" },
      {
        name: "description",
        content:
          "Photos from Neighbourhood Academy basketball — game days, training sessions, team bonding and trials.",
      },
      { property: "og:title", content: "Gallery | Neighbourhood Academy Basketball" },
      {
        property: "og:description",
        content: "Photos from Neighbourhood Academy game days, training and club events.",
      },
    ],
  }),
  component: GalleryPage,
});

function GalleryPage() {
  const { data: images = [], isPending } = useGallery();
  const [active, setActive] = useState<string>("all");

  const categories = ["all", ...Array.from(new Set(images.map((i) => i.category).filter(Boolean)))];
  const shown = active === "all" ? images : images.filter((i) => i.category === active);

  return (
    <Shell>
      <PageHeader
        eyebrow="THE ACADEMY IN PICTURES"
        title="Gallery"
        intro="Every photo here is uploaded and captioned by the academy from the admin dashboard."
      />
      <section className="mx-auto max-w-7xl px-5 pb-24 md:px-8">
        {categories.length > 2 && (
          <div className="mb-6 flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setActive(c)}
                className={`rounded-md border px-3 py-1.5 font-mono text-[11px] tracking-widest ${
                  active === c
                    ? "border-transparent bg-primary text-primary-foreground"
                    : "border-border text-muted-foreground hover:text-foreground"
                }`}
              >
                {String(c).toUpperCase()}
              </button>
            ))}
          </div>
        )}

        {shown.length === 0 ? (
          <p className="text-muted-foreground">{isPending ? "Loading…" : "No photos published yet."}</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {shown.map((g) => (
              <figure key={g.id} className="overflow-hidden rounded-2xl border border-border bg-card">
                <img
                  src={g.image_url}
                  alt={g.alt_text ?? g.caption ?? "Neighbourhood Academy basketball"}
                  loading="lazy"
                  className="h-56 w-full object-cover"
                />
                {g.caption && (
                  <figcaption className="px-4 py-3 text-sm text-muted-foreground">{g.caption}</figcaption>
                )}
              </figure>
            ))}
          </div>
        )}
      </section>
    </Shell>
  );
}
