import { useState } from "react";

type SavedFood = {
  id?: number;
  food_description: string;
  quantity: number;
  nutrients: any[];
  created_at?: string;
};

type SavedFoodsListProps = {
  foods: SavedFood[];
  onQuantityUpdate: (id: number, newQuantity: number) => void;
  onDelete: (id: number) => void;
};

export function SavedFoodsList({
  foods,
  onQuantityUpdate,
  onDelete,
}: SavedFoodsListProps) {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editQty, setEditQty] = useState<number>(1);
  const [savingId, setSavingId] = useState<number | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const handleEditStart = (food: SavedFood) => {
    setEditingId(food.id!);
    setEditQty(food.quantity);
  };

  const handleSave = async (id: number) => {
    try {
      setSavingId(id);
      const response = await fetch(`/api/foods/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity: editQty }),
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(`Failed to update: ${response.status} ${text}`);
      }

      onQuantityUpdate(id, editQty);
      setEditingId(null);
    } catch (err) {
      console.error("Failed to update quantity", err);
    } finally {
      setSavingId(null);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      setDeletingId(id);
      const response = await fetch(`/api/foods/${id}`, { method: "DELETE" });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(`Failed to delete: ${response.status} ${text}`);
      }

      onDelete(id);
    } catch (err) {
      console.error("Failed to delete food", err);
    } finally {
      setDeletingId(null);
    }
  };

  if (foods.length === 0) {
    return (
      <p className="text-sm text-gray-500 py-2">No foods logged yet.</p>
    );
  }

  return (
    <div className="divide-y divide-gray-100">
      {foods.map((food) => {
        if (!food.id) return null;
        const isEditing = editingId === food.id;
        const isSaving = savingId === food.id;
        const isDeleting = deletingId === food.id;

        return (
          <div
            key={food.id}
            className="flex items-center justify-between gap-4 py-3"
          >
            <span className="text-sm text-gray-800 flex-1 truncate">
              {food.food_description}
            </span>

            {isEditing ? (
              <div className="flex items-center gap-2 shrink-0">
                <input
                  type="number"
                  value={editQty}
                  onChange={(e) => setEditQty(Number(e.target.value))}
                  min={0}
                  className="w-20 rounded border border-gray-300 px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSave(food.id!);
                    if (e.key === "Escape") setEditingId(null);
                  }}
                  autoFocus
                />
                <button
                  onClick={() => handleSave(food.id!)}
                  disabled={isSaving}
                  className="text-sm bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1 rounded disabled:opacity-50 transition-colors"
                >
                  {isSaving ? "Saving…" : "Save"}
                </button>
                <button
                  onClick={() => setEditingId(null)}
                  className="text-sm border border-gray-300 hover:bg-gray-50 px-3 py-1 rounded transition-colors"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3 shrink-0">
                <span className="text-sm text-gray-500">qty: {food.quantity}</span>
                <button
                  onClick={() => handleEditStart(food)}
                  className="text-sm text-emerald-700 hover:text-emerald-900 font-medium transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(food.id!)}
                  disabled={isDeleting}
                  className="text-sm text-red-500 hover:text-red-700 font-medium disabled:opacity-50 transition-colors"
                >
                  {isDeleting ? "Deleting…" : "Delete"}
                </button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
