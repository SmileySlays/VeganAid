import React, { useState } from "react";
import { ReportResult } from "./Report.js";

type ReportViewProps = {
  report: ReportResult | null;
  emptyMessage?: string;
  onDelete?: (id: number) => void;
  onUpdateQuantity?: (id: number, quantity: number) => void;
};

export function ReportView({
  report,
  emptyMessage = "No report data available.",
  onDelete,
  onUpdateQuantity,
}: ReportViewProps) {
  const isInteractive = Boolean(onDelete || onUpdateQuantity);

  if (!report) {
    return (
      <div className="rounded-3xl border border-emerald-200 bg-white/60 backdrop-blur-xl p-6 text-gray-600 shadow-lg">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-emerald-200 bg-white/70 backdrop-blur-xl shadow-2xl">
      <div className="border-b border-emerald-100 bg-emerald-50 px-6 py-5">
        <h2 className="text-2xl font-bold text-gray-900">{report.title}</h2>
        <p className="mt-1 text-sm text-gray-600">
          Generated at: {report.generatedAt}
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">
                {isInteractive ? "Food" : "Metric"}
              </th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">
                Quantity
              </th>
              {isInteractive && (
                <th className="px-4 py-3 text-left font-semibold text-gray-700">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {report.rows.map((row) => (
              <InteractiveRow
                key={row.id ?? row.label}
                row={row}
                isInteractive={isInteractive}
                onDelete={onDelete}
                onUpdateQuantity={onUpdateQuantity}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

type InteractiveRowProps = {
  row: { id?: number; label: string; value: string };
  isInteractive: boolean;
  onDelete?: (id: number) => void;
  onUpdateQuantity?: (id: number, quantity: number) => void;
};

function InteractiveRow({
  row,
  isInteractive,
  onDelete,
  onUpdateQuantity,
}: InteractiveRowProps) {
  const [localQty, setLocalQty] = useState(row.value);
  const [saving, setSaving] = useState(false);

  const canEdit = isInteractive && row.id !== undefined && onUpdateQuantity;
  const canDelete = isInteractive && row.id !== undefined && onDelete;

  const commitQuantity = async () => {
    if (!canEdit) return;
    const parsed = Number(localQty);
    if (isNaN(parsed) || parsed < 0) {
      setLocalQty(row.value);
      return;
    }
    if (String(parsed) === row.value) return;
    setSaving(true);
    await onUpdateQuantity!(row.id!, parsed);
    setSaving(false);
  };

  return (
    <tr className="hover:bg-gray-50">
      <td className="px-4 py-3 text-gray-900">{row.label}</td>
      <td className="px-4 py-3 text-gray-900">
        {canEdit ? (
          <input
            type="number"
            min="0"
            value={localQty}
            disabled={saving}
            onChange={(e) => setLocalQty(e.target.value)}
            onBlur={commitQuantity}
            onKeyDown={(e) => {
              if (e.key === "Enter") (e.target as HTMLInputElement).blur();
            }}
            className="w-24 rounded-lg border border-emerald-300 px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 disabled:opacity-50"
          />
        ) : (
          row.value
        )}
      </td>
      {isInteractive && (
        <td className="px-4 py-3">
          {canDelete && (
            <button
              type="button"
              onClick={() => onDelete!(row.id!)}
              className="rounded-lg bg-red-100 px-3 py-1 text-xs font-semibold text-red-700 hover:bg-red-200 transition-colors"
            >
              Remove
            </button>
          )}
        </td>
      )}
    </tr>
  );
}
