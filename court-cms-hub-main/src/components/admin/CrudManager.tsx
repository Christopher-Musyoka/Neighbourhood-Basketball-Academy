import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Pencil, Plus, Trash2, Upload } from "lucide-react";
import { useAdminMutations, useAdminTable, uploadImage, type Row } from "@/lib/admin";

export type FieldType = "text" | "textarea" | "number" | "date" | "checkbox" | "select" | "image";

export type Field = {
  name: string;
  label: string;
  type?: FieldType;
  options?: { value: string; label: string }[];
  placeholder?: string;
  required?: boolean;
};

export type CrudConfig = {
  table: string;
  title: string;
  description?: string;
  fields: Field[];
  listColumns: string[];
  order?: { column: string; ascending?: boolean };
  defaults?: Row;
};

const input =
  "w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-accent";

export function CrudManager({ config }: { config: CrudConfig }) {
  const { data: rows = [], isPending } = useAdminTable(config.table, config.order);
  const { upsert, remove } = useAdminMutations(config.table);
  const [editing, setEditing] = useState<Row | null>(null);
  const [uploading, setUploading] = useState<string | null>(null);

  const labels = useMemo(
    () => Object.fromEntries(config.fields.map((f) => [f.name, f.label])),
    [config.fields],
  );

  function startNew() {
    setEditing({ ...(config.defaults ?? {}) });
  }

  async function save() {
    if (!editing) return;
    const payload: Row = {};
    if (editing.id) payload.id = editing.id;
    for (const f of config.fields) {
      let v = editing[f.name];
      if (v === "" || v === undefined) v = f.type === "checkbox" ? false : null;
      if (f.type === "number" && v !== null) v = Number(v);
      payload[f.name] = v;
    }
    try {
      await upsert.mutateAsync(payload);
      toast.success("Saved");
      setEditing(null);
    } catch (e: any) {
      toast.error(e?.message ?? "Could not save");
    }
  }

  async function onFile(field: string, file?: File | null) {
    if (!file) return;
    setUploading(field);
    try {
      const { url } = await uploadImage(file);
      setEditing((prev: Row | null) => ({ ...(prev ?? {}), [field]: url }));
      toast.success("Image uploaded");
    } catch (e: any) {
      toast.error(e?.message ?? "Upload failed");
    } finally {
      setUploading(null);
    }
  }

  return (
    <div className="glass rounded-2xl border border-border p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl">{config.title}</h2>
          {config.description && (
            <p className="mt-1 text-sm text-muted-foreground">{config.description}</p>
          )}
        </div>
        <button
          type="button"
          onClick={startNew}
          className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
        >
          <Plus className="size-4" /> Add
        </button>
      </div>

      <div className="mt-5 overflow-x-auto">
        <table className="w-full min-w-[520px] text-sm">
          <thead>
            <tr className="border-b border-border font-mono text-[11px] tracking-widest text-muted-foreground">
              {config.listColumns.map((c) => (
                <th key={c} className="py-2 text-left font-normal">
                  {(labels[c] ?? c).toUpperCase()}
                </th>
              ))}
              <th className="py-2 text-right font-normal">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="border-b border-border last:border-0">
                {config.listColumns.map((c) => {
                  const field = config.fields.find((f) => f.name === c);
                  let value: any = r[c];
                  if (field?.type === "select") {
                    value = field.options?.find((o) => o.value === value)?.label ?? value;
                  }
                  if (field?.type === "image" && value) {
                    return (
                      <td key={c} className="py-2 pr-3">
                        <img src={value} alt="" className="size-10 rounded object-cover" />
                      </td>
                    );
                  }
                  if (typeof value === "boolean") value = value ? "Yes" : "No";
                  return (
                    <td key={c} className="max-w-[240px] truncate py-2 pr-3">
                      {value ?? "—"}
                    </td>
                  );
                })}
                <td className="py-2 text-right">
                  <div className="inline-flex gap-2">
                    <button
                      type="button"
                      aria-label="Edit"
                      onClick={() => setEditing({ ...r })}
                      className="grid size-8 place-items-center rounded-md border border-border hover:bg-muted"
                    >
                      <Pencil className="size-3.5" />
                    </button>
                    <button
                      type="button"
                      aria-label="Delete"
                      onClick={async () => {
                        if (!confirm("Delete this record?")) return;
                        try {
                          await remove.mutateAsync(r.id);
                          toast.success("Deleted");
                        } catch (e: any) {
                          toast.error(e?.message ?? "Could not delete");
                        }
                      }}
                      className="grid size-8 place-items-center rounded-md border border-border text-destructive hover:bg-muted"
                    >
                      <Trash2 className="size-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={config.listColumns.length + 1} className="py-6 text-muted-foreground">
                  {isPending ? "Loading…" : "Nothing here yet."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-background/80 p-4">
          <div className="max-h-[85vh] w-full max-w-xl overflow-y-auto rounded-2xl border border-border bg-card p-6">
            <h3 className="text-xl">
              {editing.id ? "Edit" : "New"} · {config.title}
            </h3>
            <div className="mt-4 grid gap-4">
              {config.fields.map((f) => (
                <label key={f.name} className="grid gap-1.5">
                  <span className="font-mono text-[11px] tracking-widest text-muted-foreground">
                    {f.label.toUpperCase()}
                  </span>
                  {f.type === "textarea" ? (
                    <textarea
                      className={`${input} min-h-28`}
                      value={editing[f.name] ?? ""}
                      placeholder={f.placeholder}
                      onChange={(e) => setEditing({ ...editing, [f.name]: e.target.value })}
                    />
                  ) : f.type === "select" ? (
                    <select
                      className={input}
                      value={editing[f.name] ?? ""}
                      onChange={(e) => setEditing({ ...editing, [f.name]: e.target.value })}
                    >
                      <option value="">— none —</option>
                      {f.options?.map((o) => (
                        <option key={o.value} value={o.value}>
                          {o.label}
                        </option>
                      ))}
                    </select>
                  ) : f.type === "checkbox" ? (
                    <input
                      type="checkbox"
                      className="size-5 accent-current"
                      checked={!!editing[f.name]}
                      onChange={(e) => setEditing({ ...editing, [f.name]: e.target.checked })}
                    />
                  ) : f.type === "image" ? (
                    <div className="grid gap-2">
                      <input
                        className={input}
                        value={editing[f.name] ?? ""}
                        placeholder="Image URL"
                        onChange={(e) => setEditing({ ...editing, [f.name]: e.target.value })}
                      />
                      <label className="inline-flex w-fit cursor-pointer items-center gap-2 rounded-md border border-border px-3 py-2 text-sm hover:bg-muted">
                        <Upload className="size-4" />
                        {uploading === f.name ? "Uploading…" : "Upload picture"}
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => onFile(f.name, e.target.files?.[0])}
                        />
                      </label>
                      {editing[f.name] && (
                        <img
                          src={editing[f.name]}
                          alt=""
                          className="h-28 w-auto rounded-lg object-cover"
                        />
                      )}
                    </div>
                  ) : (
                    <input
                      type={f.type === "number" ? "number" : f.type === "date" ? "date" : "text"}
                      className={input}
                      value={editing[f.name] ?? ""}
                      placeholder={f.placeholder}
                      onChange={(e) => setEditing({ ...editing, [f.name]: e.target.value })}
                    />
                  )}
                </label>
              ))}
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setEditing(null)}
                className="rounded-md border border-border px-4 py-2 text-sm font-semibold hover:bg-muted"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={save}
                disabled={upsert.isPending}
                className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-60"
              >
                {upsert.isPending ? "Saving…" : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
