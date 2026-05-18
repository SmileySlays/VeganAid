export type Nutrient = {
  name: string;
  value: number;
  unit: "g" | "mg" | "mcg" | "mg NE" | "mcg DFE" | "mcg RAE";
};

export const nutrients: Nutrient[] = [
  { name: "Added sugars", value: 0, unit: "g" },
  { name: "Biotin", value: 0, unit: "mcg" },
  { name: "Calcium", value: 0, unit: "mg" },
  { name: "Chloride", value: 0, unit: "mg" },
  { name: "Choline", value: 0, unit: "mg" },
  { name: "Cholesterol", value: 0, unit: "mg" },
  { name: "Chromium", value: 0, unit: "mcg" },
  { name: "Copper", value: 0, unit: "mg" },
  { name: "Dietary Fiber", value: 0, unit: "g" },
  { name: "Fat", value: 0, unit: "g" },
  { name: "Folate/Folic Acid", value: 0, unit: "mcg DFE" },
  { name: "Iodine", value: 0, unit: "mcg" },
  { name: "Iron", value: 0, unit: "mg" },
  { name: "Magnesium", value: 0, unit: "mg" },
  { name: "Manganese", value: 0, unit: "mg" },
  { name: "Molybdenum", value: 0, unit: "mcg" },
  { name: "Niacin", value: 0, unit: "mg NE" },
  { name: "Pantothenic Acid", value: 0, unit: "mg" },
  { name: "Phosphorus", value: 0, unit: "mg" },
  { name: "Potassium", value: 0, unit: "mg" },
  { name: "Protein", value: 0, unit: "g" },
  { name: "Riboflavin", value: 0, unit: "mg" },
  { name: "Saturated fat", value: 0, unit: "g" },
  { name: "Selenium", value: 0, unit: "mcg" },
  { name: "Sodium", value: 0, unit: "mg" },
  { name: "Thiamin", value: 0, unit: "mg" },
  { name: "Total carbohydrate", value: 0, unit: "g" },
  { name: "Vitamin A", value: 0, unit: "mcg RAE" },
  { name: "Vitamin B6", value: 0, unit: "mg" },
  { name: "Vitamin B12", value: 0, unit: "mcg" },
  { name: "Vitamin C", value: 0, unit: "mg" },
  { name: "Vitamin D", value: 0, unit: "mcg" },
  { name: "Vitamin E", value: 0, unit: "mg" },
  { name: "Vitamin K", value: 0, unit: "mcg" },
  { name: "Zinc", value: 0, unit: "mg" },
];