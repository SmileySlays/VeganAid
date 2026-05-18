import React from "react";

type NutritionItem = {
  name: string;
  value: number;
  unit: string;
};

type NutritionTableProps = {
  items: NutritionItem[];
  as?: "table";
};

export function NutritionTable({ items, as = "table"} : NutritionTableProps){
    return (
        <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-200 bg-white text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-3 text-left font-semibold text-gray-700">Nutrient</th>
            <th className="px-4 py-3 text-left font-semibold text-gray-700">Amount</th>
            <th className="px-4 py-3 text-left font-semibold text-gray-700">Unit</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {items.map((item) => (
            <tr key={item.name} className="hover:bg-gray-50">
              <td className="px-4 py-3 text-gray-900">{item.name}</td>
              <td className="px-4 py-3 text-gray-900">{item.value}</td>
              <td className="px-4 py-3 text-gray-900">{item.unit}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}