import { NutritionEntry, Report, ReportResult } from "./Report.js";

export class SavedFoodsReport extends Report {
  private entries: NutritionEntry[];

  constructor(entries: NutritionEntry[]) {
    super("Saved Foods");
    this.entries = entries;
  }

  generate(): ReportResult {
    const rows = this.entries.flatMap((entry, i) => {
      const qty = Number(entry.quantity) || 1;
      const nutrients = entry.nutrients ?? [];

      const calories = this.getNutrientValue(nutrients, "energy", "calorie") * qty;
      const protein = this.getNutrientValue(nutrients, "protein") * qty;
      const carbs = this.getNutrientValue(nutrients, "carbohydrate") * qty;
      const fat = this.getNutrientValue(nutrients, "total lipid", "fat") * qty;

      const fmt = (n: number, unit: string) =>
        `${Math.round(n * 10) / 10} ${unit}`;

      return [
        {
          key: `food-${i}`,
          id: entry.id,
          label: entry.food_description,
          value: String(entry.quantity),
          isHeader: true,
        },
        { key: `food-${i}-calories`, label: "Calories", value: fmt(calories, "kcal") },
        { key: `food-${i}-protein`, label: "Protein", value: fmt(protein, "g") },
        { key: `food-${i}-carbs`, label: "Carbs", value: fmt(carbs, "g") },
        { key: `food-${i}-fat`, label: "Fat", value: fmt(fat, "g") },
      ];
    });

    return {
      title: this.title,
      generatedAt: this.formatDate(new Date()),
      rows: rows.length > 0 ? rows : [{ key: "empty", label: "No foods logged yet.", value: "" }],
    };
  }
}
