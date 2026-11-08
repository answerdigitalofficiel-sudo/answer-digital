import { statusMeta } from "@/lib/quote";

export function StatusBadge({ status }: { status: string }) {
  const meta = statusMeta(status);
  return (
    <span className={`inline-flex items-center whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-inset ${meta.tone}`}>
      {meta.label}
    </span>
  );
}
