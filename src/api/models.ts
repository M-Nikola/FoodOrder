export type Bowl = {
  id: number;
  name: string;
  description: string;
  image: {
    id: number;
  };
  imagePath: string;
};

export type Base = {
  id: number;
  name: string;
  description: string;
  image: {
    id: number;
  };
  imagePath: string;
};

export type Size = {
  id: number;
  name: string;
  description: string;
  currency: string;
  price: number;
};

export type Sauce = {
  id: number;
  name: string;
  description: string;
};

export type Ingredient = {
  id: number;
  name: string;
};

export type ExtraIngredient = {
  id: number;
  name: string;
  currency: string;
  price: number;
};

export type Order = {
  count: number;
  bowl: Bowl;
  size: Size;
  base: Base;
  sauce: Sauce;
  ingredients?: Ingredient[];
  extraIngredients?: ExtraIngredient[];
};

export type PlaceOrder = {
  bowlId: string;
  sizeId: string;
  baseId: string;
  sauceId: string;
  ingredients: string[];
  extraIngredients: string[];
};
