import { createSlice } from '@reduxjs/toolkit';

export const basketSlice = createSlice({
  name: 'basket',
  initialState: {
    basket: {
      basketItem: [],
    }
  },
  reducers: {
    getBasket: (state) => {
      if (localStorage.getItem("basket")) {
        state.basket = JSON.parse(localStorage.getItem("basket"));
      }
    },
    setBasket: (state, { payload }) => {
      let {product,count} =payload;
      let basket = { ...state.basket };
      let itemIndex = basket.basketItem.findIndex(item => item.product.id === product.id);

      if (itemIndex > -1) {
        basket.basketItem[itemIndex].quantity  += count;
        basket.basketItem[itemIndex].totalPrice=product.price*basket.basketItem[itemIndex].quantity;

        if(basket.basketItem[itemIndex].quantity <= 0){
          basket.basketItem.splice(itemIndex, 1);
        }

      }else{
        basket.basketItem.push({product:product,quantity:1,totalPrice:product.price*1});
      }

      let basketTotalPrice = 0.0;

      basket.basketItem.forEach((item) => {
        basketTotalPrice += item.totalPrice
      });

      basket.basketTotalPrice = basketTotalPrice;


      state.basket=basket;
      localStorage.setItem("basket", JSON.stringify(basket));
    }
  }
})

export const { getBasket, setBasket } = basketSlice.actions;
export default basketSlice.reducer;