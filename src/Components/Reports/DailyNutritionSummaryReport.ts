import { NutritionEntry, Report, ReportResult } from "./Report.js";

export class DailyNutritionSummaryReport extends Report {
  private entries: NutritionEntry[];

  constructor(entries: NutritionEntry[]) {
    super("Daily Nutrition Summary");
    this.entries = entries;
  }

  generate(): ReportResult {
    let totalCalories = 0;
    let totalProtein = 0;
    let totalCarbs = 0;
    let totalFat = 0;
    let totalFiber = 0;
    let totalSodium = 0;
    let totalSugar = 0;

    for (const entry of this.entries) {
      const qty = Number(entry.quantity) || 1;
      const nutrients = entry.nutrients ?? [];

      totalCalories += this.getNutrientValue(nutrients, "energy", "calorie") * qty;
      totalProtein += this.getNutrientValue(nutrients, "protein") * qty;
      totalCarbs += this.getNutrientValue(nutrients, "carbohydrate") * qty;
      totalFat += this.getNutrientValue(nutrients, "total lipid", "fat") * qty;
      totalFiber += this.getNutrientValue(nutrients, "fiber") * qty;
      totalSodium += this.getNutrientValue(nutrients, "sodium") * qty;
      totalSugar += this.getNutrientValue(nutrients, "sugar") * qty;
    }

    const fmt = (n: number, unit: string) =>
      `${Math.round(n * 10) / 10} ${unit}`;

    return {
      title: this.title,
      generatedAt: this.formatDate(new Date()),
      rows: [
        { label: "Foods logged", value: String(this.entries.length) },
        { label: "Calories", value: fmt(totalCalories, "kcal") },
        { label: "Protein", value: fmt(totalProtein, "g") },
        { label: "Carbohydrates", value: fmt(totalCarbs, "g") },
        { label: "Fat", value: fmt(totalFat, "g") },
        { label: "Fiber", value: fmt(totalFiber, "g") },
        { label: "Sugar", value: fmt(totalSugar, "g") },
        { label: "Sodium", value: fmt(totalSodium, "mg") },
      ],
    };
  }
}
