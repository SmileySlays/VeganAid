import { NutritionEntry, Report, ReportResult } from "./Report.js";

export class SavedFoodsReport extends Report {
  private entries: NutritionEntry[];

  constructor(entries: NutritionEntry[]) {
    super("Saved Foods Report");
    this.entries = entries;
  }

  generate(): ReportResult {
    return {
      title: this.title,
      generatedAt: this.formatDate(new Date()),
      rows: this.entries.map((entry) => ({
        id: entry.id,
        label: entry.food_description,
        value: `${entry.quantity}`,
      })),
    };
  }
}
