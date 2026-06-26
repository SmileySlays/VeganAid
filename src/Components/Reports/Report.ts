export type NutritionEntry = {
  food_description: string;
  calories: number;
  created_at?: string;
};

export type ReportRow = {
  label: string;
  value: string;
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
}
