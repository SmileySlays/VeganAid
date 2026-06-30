import { describe, it, expect } from "vitest";
import { SavedFoodsReport } from "./SavedFoodsReport";
import { DailyNutritionSummaryReport } from "./DailyNutritionSummaryReport";
import { NutritionEntry } from "./Report";

const sampleEntries: NutritionEntry[] = [
  { id: 1, food_description: "Brown Rice", quantity: 2 },
  { id: 2, food_description: "Black Beans", quantity: 1 },
  { id: 3, food_description: "Avocado", quantity: 3 },
];

describe("SavedFoodsReport", () => {
  it("generates a report with the correct title", () => {
    const report = new SavedFoodsReport(sampleEntries).generate();
    expect(report.title).toBe("Saved Foods Report");
  });

  it("includes a generatedAt timestamp", () => {
    const report = new SavedFoodsReport(sampleEntries).generate();
    expect(report.generatedAt).toBeTruthy();
    expect(typeof report.generatedAt).toBe("string");
  });

  it("produces one row per food entry with the correct label and quantity", () => {
    const report = new SavedFoodsReport(sampleEntries).generate();

    expect(report.rows).toHaveLength(3);
    expect(report.rows[0].label).toBe("Brown Rice");
    expect(report.rows[0].value).toBe("2");
    expect(report.rows[1].label).toBe("Black Beans");
    expect(report.rows[1].value).toBe("1");
    expect(report.rows[2].label).toBe("Avocado");
    expect(report.rows[2].value).toBe("3");
  });

  it("includes the entry id on each row so items can be deleted or updated", () => {
    const report = new SavedFoodsReport(sampleEntries).generate();

    expect(report.rows[0].id).toBe(1);
    expect(report.rows[1].id).toBe(2);
    expect(report.rows[2].id).toBe(3);
  });

  it("returns an empty rows array when given no entries", () => {
    const report = new SavedFoodsReport([]).generate();
    expect(report.rows).toHaveLength(0);
  });
});

describe("DailyNutritionSummaryReport", () => {
  it("generates a report with the correct title", () => {
    const report = new DailyNutritionSummaryReport(sampleEntries).generate();
    expect(report.title).toBe("Daily Nutrition Summary");
  });

  it("includes a generatedAt timestamp", () => {
    const report = new DailyNutritionSummaryReport(sampleEntries).generate();
    expect(report.generatedAt).toBeTruthy();
    expect(typeof report.generatedAt).toBe("string");
  });

  it("reports the correct number of food entries", () => {
    const report = new DailyNutritionSummaryReport(sampleEntries).generate();
    const entriesRow = report.rows.find((r) => r.label === "Entries");
    expect(entriesRow?.value).toBe("3");
  });

  it("correctly sums the total quantity across all entries", () => {
    const report = new DailyNutritionSummaryReport(sampleEntries).generate();
    const totalRow = report.rows.find((r) => r.label === "Total Quantity");
    expect(totalRow?.value).toBe("6");
  });

  it("returns zero totals for an empty entries list", () => {
    const report = new DailyNutritionSummaryReport([]).generate();
    const entriesRow = report.rows.find((r) => r.label === "Entries");
    const totalRow = report.rows.find((r) => r.label === "Total Quantity");
    expect(entriesRow?.value).toBe("0");
    expect(totalRow?.value).toBe("0");
  });
});

describe("Report polymorphism", () => {
  it("both report types return a ReportResult with title, generatedAt, and rows", () => {
    const reports = [
      new SavedFoodsReport(sampleEntries).generate(),
      new DailyNutritionSummaryReport(sampleEntries).generate(),
    ];

    for (const report of reports) {
      expect(report).toHaveProperty("title");
      expect(report).toHaveProperty("generatedAt");
      expect(report).toHaveProperty("rows");
      expect(Array.isArray(report.rows)).toBe(true);
    }
  });

  it("each report type produces a different title (polymorphic behavior)", () => {
    const saved = new SavedFoodsReport(sampleEntries).generate();
    const summary = new DailyNutritionSummaryReport(sampleEntries).generate();
    expect(saved.title).not.toBe(summary.title);
  });
});
