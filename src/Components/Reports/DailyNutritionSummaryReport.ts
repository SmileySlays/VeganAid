import { NutritionEntry, Report, ReportResult } from "./Report.js";

export class DailyNutritionSummaryReport extends Report {
  private entries: NutritionEntry[];

  constructor(entries: NutritionEntry[]) {
    super("Daily Nutrition Summary");
    this.entries = entries;
  }

  generate(): ReportResult {
    const totalCalories = this.entries.reduce(
      (sum, entry) => sum + Number(entry.calories),
      0,
    );

    return {
      title: this.title,
      generatedAt: this.formatDate(new Date()),
      rows: [
        { label: "Entries", value: String(this.entries.length) },
        { label: "Total Calories", value: String(totalCalories) },
      ],
    };
  }
}
