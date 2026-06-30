export type Nutrient = {
  nutrientId?: number;
  nutrientName?: string;
  nutrientNumber?: string;
  unitName?: string;
  value?: number;
  amount?: number;
  name?: string;
  unit?: string;
};

export type NutritionEntry = {
  id?: number;
  food_description: string;
  quantity: number;
  nutrients?: Nutrient[];
  created_at?: string;
};

export type ReportRow = {
  key?: string;
  id?: number;
  label: string;
  value: string;
  isHeader?: boolean;
};

export type ReportResult = {
  title: string;
  generatedAt: string;
  rows: ReportRow[];
};

export abstract class Report {
  protected title: string;

  constructor(title: string) {
    this.title = title;
  }

  abstract generate(): ReportResult;

  protected formatDate(date: Date): string {
    return date.toLocaleString();
  }

  protected getNutrientValue(nutrients: Nutrient[], ...names: string[]): number {
    for (const n of nutrients) {
      const name = (n.nutrientName ?? n.name ?? "").toLowerCase();
      if (names.some((target) => name.includes(target.toLowerCase()))) {
        return Number(n.value ?? n.amount ?? 0);
      }
    }
    return 0;
  }
}
