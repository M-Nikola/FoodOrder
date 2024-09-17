import {create} from 'zustand';
import {Order} from '@api/index';

type OrderState = {
  step: number;
  currentOrder: Partial<Order>;
  editOrderIndex?: number;
  cart: Order[];
};

interface Actions {
  resetState: () => void;
  setStep: (newStep: number) => void;
  updateCurrentOrder: (data: Partial<Order>) => void;
  addToCart: (order: Order) => void;
  removeFromCart: (orderIndex: number) => void;
  updateOrderCount: (orderIndex: number, count: number) => void;
  setEditOrderIndex: (orderIndex?: number) => void;
  finishEditing: (orderIndex: number, order: Order) => void;
}

const initialState: OrderState = {
  step: 1,
  currentOrder: {},
  cart: [],
};

export const useOrderStore = create<OrderState & Actions>((set: Function) => ({
  ...initialState,
  resetState: () => {
    set((): OrderState => initialState);
  },
  setStep: (newStep: number) => {
    set((state: OrderState): OrderState => ({...state, step: newStep}));
  },
  updateCurrentOrder: (data: Partial<Order>) => {
    set(
      (state: OrderState): OrderState => ({
        ...state,
        currentOrder: {...state.currentOrder, ...data},
      }),
    );
  },
  addToCart: (order: Order) => {
    set(
      (state: OrderState): OrderState => ({
        ...state,
        cart: [...state.cart, {...order, count: 1}],
        currentOrder: {},
        step: 1,
      }),
    );
  },
  removeFromCart: (orderIndex: number) => {
    set(
      (state: OrderState): OrderState => ({
        ...state,
        cart: state.cart.filter((_, index) => index !== orderIndex),
      }),
    );
  },
  updateOrderCount: (orderIndex: number, count: number) => {
    set(
      (state: OrderState): OrderState => ({
        ...state,
        cart: state.cart.map((order, index) => {
          if (index === orderIndex) {
            return {...order, count};
          }
          return order;
        }),
      }),
    );
  },
  setEditOrderIndex: (orderIndex?: number) => {
    set(
      (state: OrderState): OrderState => ({
        ...state,
        editOrderIndex: orderIndex,
      }),
    );
  },
  finishEditing: (orderIndex: number, order: Order) => {
    set(
      (state: OrderState): OrderState => ({
        ...state,
        step: 1,
        editOrderIndex: undefined,
        currentOrder: {},
        cart: state.cart.map((item, index) => {
          if (index === orderIndex) {
            return order;
          }
          return item;
        }),
      }),
    );
  },
}));
