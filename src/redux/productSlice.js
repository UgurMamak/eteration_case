import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';


export const getProducts = createAsyncThunk(
  'products/getproducts',
  async () => {
    const url = new URL('https://5fc9346b2af77700165ae514.mockapi.io/products');
    const response = await axios.get(url);
    return response.data;
  }
);

export const productSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    filteredProducts: [],
    selectedFilters: {},
    filters: [],
    loading: false,
    value: 0,
    tempSelectData: []
  },
  reducers: {
    getFilterChoices: (state) => {
      const tempModels = state.products.map(item => item.model);
      const model = tempModels.filter((item, index) => tempModels.indexOf(item) === index);

      state.filters.push({
        title: 'Models',
        filterName: 'model',
        choices: model,
      });

      const tempBrands = state.products.map(item => item.brand);
      const brand = tempBrands.filter((item, index) => tempBrands.indexOf(item) === index);

      state.filters.push({
        title: 'Brands',
        filterName: 'brand',
        choices: brand,
      });

    },

    updateSelectedFilters: (state, { payload }) => {
      state.selectedFilters = {
        ...state.selectedFilters,
        ...payload
      }
    },

    getFilteredProducts: (state) => {

      const choices = { ...state.selectedFilters };
      let filterStatus = true;

      // (product.brand == 'Tesla' || product.brand == 'Ford') && (product.model=='a1' || product.model=='a2')
      if(Object.keys(choices).length>0){
        let filteredData = state.products.filter(product =>{
          let statusArr=[];
           for(let key in choices){
            let status = choices[key].includes(product[key]);
            statusArr.push(status);
           }
          return statusArr.reduce((accumulator, currentValue)=>accumulator && currentValue);
        });
        state.filteredProducts = filteredData;
      }else{
        state.filteredProducts = state.products; 
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProducts.pending, (state, action) => {
      console.log("pending")
    })
      .addCase(getProducts.fulfilled, (state, action) => {
        console.log("fullfilled");
        state.products = action.payload;
      })
      .addCase(getProducts.rejected, (state, action) => {
        console.log("rejected")
      })
  },
})

export const { getFilterChoices, getFilteredProducts, updateSelectedFilters } = productSlice.actions;
export default productSlice.reducer