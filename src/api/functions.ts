import {
  Base,
  Bowl,
  ExtraIngredient,
  Ingredient,
  PlaceOrder,
  Sauce,
  Size,
} from '.';
import client from '@utils/client';

export async function getBowls(): Promise<Bowl[]> {
  const response = await client.get('/bowls');
  return response.data.data;
}

export async function getSizes(): Promise<Size[]> {
  const response = await client.get('/sizes');
  return response.data.data;
}

export async function getBases(): Promise<Base[]> {
  const response = await client.get('/bases');
  return response.data.data;
}

export async function getSauces(): Promise<Sauce[]> {
  const response = await client.get('/sauces');
  return response.data.data;
}

export async function getIngredients(): Promise<Ingredient[]> {
  const response = await client.get('/ingredients');
  return response.data.data;
}

export async function getExtraIngredients(): Promise<ExtraIngredient[]> {
  const response = await client.get('/extra_ingredients');
  return response.data.data;
}

export async function createOrder(orders: PlaceOrder[]) {
  const response = await client.post('/create_order', orders);
  return response.data;
}
