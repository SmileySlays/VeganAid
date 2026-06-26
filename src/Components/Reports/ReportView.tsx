import React from "react";
import { ReportResult } from "./Report.js";

type ReportViewProps = {
  report: ReportResult | null;
  emptyMessage?: string;
};

export function ReportView({
  report,
  emptyMessage = "No report data available.",
}: ReportViewProps) {
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
                Metric
              </th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">
                Value
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {report.rows.map((row) => (
              <tr key={row.label} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-gray-900">{row.label}</td>
                <td className="px-4 py-3 text-gray-900">{row.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
