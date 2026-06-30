import { Report, ReportResult } from "./Report.js";

/**
 * Input shape for the nutrient totals report. Each entry is one saved food
 * with a quantity (servings) and the raw nutrients array stored for it.
 */
export type NutrientFoodEntry = {
  quantity: number;
  nutrients: any[];
};

/**
 * NutrientTotalsReport aggregates every nutrient across all of a user's saved
 * foods, scaling each food's nutrient values by its quantity, and produces a
 * single combined total per nutrient.
 *
 * Extends the abstract Report base class and provides its own implementation
 * of generate() (polymorphism).
 */
export class NutrientTotalsReport extends Report {
  private entries: NutrientFoodEntry[];

  constructor(entries: NutrientFoodEntry[]) {
    super("Total Nutrient Intake");
    this.entries = entries;
  }

  generate(): ReportResult {
    const totals = new Map<string, { value: number; unit: string }>();

    for (const entry of this.entries) {
      const qty = Number(entry.quantity) || 0;
      const nutrients = this.normalizeNutrients(entry.nutrients);

      for (const n of nutrients) {
        const name = n?.nutrientName ?? n?.nutrient?.name ?? n?.name;
        const unit = n?.unitName ?? n?.nutrient?.unitName ?? n?.unit ?? "";
        const rawValue = Number(n?.value ?? n?.amount ?? 0);

        if (!name || Number.isNaN(rawValue)) continue;

        const scaled = rawValue * qty;
        const existing = totals.get(name);
        if (existing) {
          existing.value += scaled;
        } else {
          totals.set(name, { value: scaled, unit });
        }
      }
    }

    const rows = Array.from(totals.entries())
      .sort((a, b) => a[0].localeCompare(b[0]))
      .map(([name, { value, unit }]) => ({
        label: name,
        value: `${this.formatNumber(value)}${unit ? ` ${unit.toLowerCase()}` : ""}`,
      }));

    return {
      title: this.title,
      generatedAt: this.formatDate(new Date()),
      rows,
    };
  }

  /**
   * Nutrients may arrive as a parsed array (from JSONB) or as a JSON string
   * (from a text column). Normalize both cases to an array.
   */
  private normalizeNutrients(raw: any): any[] {
    if (Array.isArray(raw)) return raw;
    if (typeof raw === "string") {
      try {
        const parsed = JSON.parse(raw);
        return Array.isArray(parsed) ? parsed : [];
      } catch {
        return [];
      }
    }
    return [];
  }

  /** Round to at most 2 decimal places and drop trailing zeros. */
  private formatNumber(value: number): string {
    return (Math.round(value * 100) / 100).toString();
  }
}
