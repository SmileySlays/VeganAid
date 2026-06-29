import { NutritionEntry, Report, ReportResult } from "./Report.js";

export class DailyNutritionSummaryReport extends Report {
  private entries: NutritionEntry[];

  constructor(entries: NutritionEntry[]) {
    super("Daily Nutrition Summary");
    this.entries = entries;
  }

  generate(): ReportResult {
    const totalQuantity = this.entries.reduce(
      (sum, entry) => sum + Number(entry.quantity),
      0,
    );

    return {
      title: this.title,
      generatedAt: this.formatDate(new Date()),
      rows: [
        { label: "Entries", value: String(this.entries.length) },
        { label: "Total Quantity", value: String(totalQuantity) },
      ],
    };
  }
}
