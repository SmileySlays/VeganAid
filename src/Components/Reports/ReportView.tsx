import React, { useState, useEffect } from "react";
import { ReportResult } from "./Report.js";

type ReportViewProps = {
  report: ReportResult | null;
  emptyMessage?: string;
  onUpdateQuantity?: (id: number, newQuantity: number) => void;
  onDelete?: (id: number) => void;
};

export function ReportView({
  report,
  emptyMessage = "No report data available.",
  onUpdateQuantity,
  onDelete,
}: ReportViewProps) {
  const [quantities, setQuantities] = useState<Record<number, string>>({});

  useEffect(() => {
    if (!report) return;
    const map: Record<number, string> = {};
    for (const row of report.rows) {
      if (row.id != null) {
        map[row.id] = row.value;
      }
    }
    setQuantities(map);
  }, [report]);

  if (!report) {
    return (
      <div className="rounded-lg border border-gray-200 bg-gray-50 p-6 text-gray-600">
        {emptyMessage}
      </div>
    );
  }

  const handleBlur = (id: number, originalValue: string) => {
    const current = quantities[id] ?? originalValue;
    if (current === originalValue) return;

    const num = Number(current);
    if (!current || isNaN(num) || num < 0) {
      setQuantities((prev) => ({ ...prev, [id]: originalValue }));
      return;
    }

    onUpdateQuantity?.(id, num);
  };

  const showActions = onUpdateQuantity != null || onDelete != null;

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200">
      <div className="border-b border-gray-200 bg-emerald-50 px-5 py-4">
        <h2 className="text-lg font-bold text-gray-900">{report.title}</h2>
        <p className="mt-1 text-xs text-gray-500">
          Generated at: {report.generatedAt}
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">
                Metric
              </th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">
                Value
              </th>
              {showActions && (
                <th className="px-4 py-3 text-left font-semibold text-gray-700">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white">
            {report.rows.map((row, i) => {
              const rowKey = row.key ?? row.label ?? String(i);
              const hasId = row.id != null;

              return (
                <tr
                  key={rowKey}
                  className={
                    row.isHeader
                      ? "bg-emerald-50 border-t-2 border-emerald-200"
                      : "hover:bg-gray-50"
                  }
                >
                  <td
                    className={
                      row.isHeader
                        ? "px-4 py-3 font-semibold text-emerald-800 truncate max-w-xs"
                        : "px-4 py-3 pl-8 text-gray-600"
                    }
                  >
                    {row.label}
                  </td>
                  <td className="px-4 py-3 text-gray-800">
                    {hasId && onUpdateQuantity ? (
                      <input
                        type="number"
                        value={quantities[row.id!] ?? row.value}
                        min={0}
                        onChange={(e) =>
                          setQuantities((prev) => ({
                            ...prev,
                            [row.id!]: e.target.value,
                          }))
                        }
                        onBlur={() => handleBlur(row.id!, row.value)}
                        className="w-20 rounded border border-gray-300 px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500"
                      />
                    ) : (
                      row.value
                    )}
                  </td>
                  {showActions && (
                    <td className="px-4 py-3">
                      {hasId && onDelete && (
                        <button
                          type="button"
                          onClick={() => onDelete(row.id!)}
                          className="text-xs text-red-500 hover:text-red-700 font-medium transition-colors"
                        >
                          Remove
                        </button>
                      )}
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
