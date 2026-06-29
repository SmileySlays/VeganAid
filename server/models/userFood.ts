export type Nutrient = {
  nutrientName: string;
  value: number;
};

export type UserFood = {
  id: number;
  user_id: number;
  food_fdc_id?: number | null;
  food_description: string;
  quantity: number;
  nutrients: Nutrient[];
  created_at: Date;
};

export type CreateUserFoodInput = {
  user_id: number;
  food_fdc_id?: number;
  food_description: string;
  quantity: number;
  nutrients: Nutrient[];
};
