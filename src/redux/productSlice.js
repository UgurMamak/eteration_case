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

      state.filters.push({
        title: 'Sort By',
        filterName: 'sort',
        type: 'single',
        choices2: ['a', 'b', 'c', 'd'],
        choices: [
          {
            value: 'date-asc',
            title: 'Old to new'
          },
          {
            value: 'date-desc',
            title: 'New to old'
          },
          {
            value: 'price-desc',
            title: 'Price hight to low'
          },
          {
            value: 'price-asc',
            title: 'Price low to High'
          }
        ]
      });

      const tempModels = state.products.map(item => item.model);
      const model = tempModels.filter((item, index) => tempModels.indexOf(item) === index);

      state.filters.push({
        title: 'Models',
        filterName: 'model',
        type: 'multiselect',
        choices: model,
      });

      const tempBrands = state.products.map(item => item.brand);
      const brand = tempBrands.filter((item, index) => tempBrands.indexOf(item) === index);

      state.filters.push({
        title: 'Brands',
        filterName: 'brand',
        type: 'multiselect',
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
      let filteredData = [];
      let productList = state.products;

      // (product.brand == 'Tesla' || product.brand == 'Ford') && (product.model=='a1' || product.model=='a2')
      if (Object.keys(choices).length > 0) {
        console.log("Object.keys(choices).length > 0");

        if (choices['search'].length>0) {
          let searchTerm = choices['search'][0];
          productList = state.products.filter((item) => {
            return item.name.toLowerCase().includes(searchTerm.toLowerCase());
          });
        }


        filteredData = productList.filter(product => {
          let statusArr = [];
          for (let key in choices) {
            if (key === 'sort' || key === 'search') {
              continue;
            }

            if (choices[key].length === 0) {
              continue;
            }

            let status = choices[key].includes(product[key]);
            statusArr.push(status);
          }
          if (statusArr.length > 0) {
            return statusArr.reduce((accumulator, currentValue) => accumulator && currentValue);
          }
          return true;
        });

        if (choices['sort']) {
          const arr = choices['sort'][0].split('-');
          let key = arr[0] === 'date' ? 'createdAt' : arr[0];
          const sort = arr[1];

          if (sort === 'asc') {
            key === 'createdAt' ?
              filteredData.sort((a, b) => new Date(a[key]) - new Date(b[key]))
              : filteredData.sort((a, b) => a[key] - b[key]);
          }

          if (sort === 'desc') {
            key === 'createdAt' ?
              filteredData.sort((a, b) => new Date(b[key]) - new Date(a[key]))
              : filteredData.sort((a, b) => b[key] - a[key]);
          }

        }

        console.log("son==", filteredData);
        state.filteredProducts = filteredData;
      } else {
        console.log("ELSEELSE Object.keys(choices).length > 0");
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