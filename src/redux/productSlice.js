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

export const getProductById = createAsyncThunk('products/getProductById',
  async (id) => {
    const url = `https://5fc9346b2af77700165ae514.mockapi.io/products/${id}`;
    const response = await axios.get(url);
    return response.data;
  });

export const productSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    filteredProducts: [],
    selectedFilters: {},
    filters: [],
    loading: false,

    product: {}
  },
  reducers: {
    getFilterChoices: (state) => {

      state.filters.push({
        title: 'Sort By',
        filterName: 'sort',
        type: 'single',
        searchable: false,
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
      const model = tempModels.map((item, index) => {
        if (tempModels.indexOf(item) === index) {
          return {
            title: item,
            value: item
          }
        }
      }).filter(item => !['', null, undefined].includes(item))

      state.filters.push({
        title: 'Models',
        filterName: 'model',
        type: 'multiselect',
        searchable: true,
        choices: model,
      });

      const tempBrands = state.products.map(item => item.brand);
      const brand = tempBrands.map((item, index) => {
        if (tempBrands.indexOf(item) === index) {
          return {
            title: item,
            value: item
          }
        }
      }).filter(item => !['', null, undefined].includes(item))


      state.filters.push({
        title: 'Brands',
        filterName: 'brand',
        type: 'multiselect',
        searchable: true,
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


        if (choices['search'] && choices['search'].length > 0) {
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

        state.filteredProducts = filteredData;
      } else {
        state.filteredProducts = state.products;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProducts.pending, (state, action) => {
    })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.products = action.payload;
      })
      .addCase(getProducts.rejected, (state) => {
      })
      .addCase(getProductById.pending, (state) => { })
      .addCase(getProductById.fulfilled, (state, action) => {
        state.product = action.payload;
      })
      .addCase(getProductById.rejected, (state, action) => { })
  },
})

export const { getFilterChoices, getFilteredProducts, updateSelectedFilters } = productSlice.actions;
export default productSlice.reducer