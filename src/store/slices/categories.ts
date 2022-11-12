import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import type {RootState} from '../store';
import {Attribute, Category, FieldChangeParams} from '../../types/types';

export interface CategoriesState {
  list: Category[];
}

const initialState: CategoriesState = {
  list: [],
};

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    addCategory: (state, action: PayloadAction<Category>) => {
      state.list = [
        ...state.list,
        {...action.payload, id: `category${new Date().getTime()}`},
      ];
    },
    removeCategory: (state, action: PayloadAction<number>) => {
      state.list = state.list.filter((_, index) => index !== action.payload);
    },
    addAttribute: (
      state,
      action: PayloadAction<{categoryIndex: number; attribute: Attribute}>,
    ) => {
      const {categoryIndex, attribute} = action.payload;
      const length = state.list[categoryIndex].attributes.length;
      state.list[categoryIndex].attributes.push({
        ...attribute,
        isTitleField: length === 0,
      });
    },
    removeAttribute: (
      state,
      action: PayloadAction<{categoryIndex: number; attributeIndex: number}>,
    ) => {
      const {categoryIndex, attributeIndex} = action.payload;
      let wasTitleField = false;
      state.list[categoryIndex].attributes = state.list[
        categoryIndex
      ].attributes.filter((attribute, index) => {
        if (index === attributeIndex) wasTitleField = !!attribute.isTitleField;
        return index !== attributeIndex;
      });
      if (wasTitleField && state.list[categoryIndex].attributes.length)
        state.list[categoryIndex].attributes[0].isTitleField = true;
    },
    updateCategoryName: (
      state,
      action: PayloadAction<{categoryIndex: number; text: string}>,
    ) => {
      const {categoryIndex, text} = action.payload;
      state.list[categoryIndex].name = text;
    },
    onAttributeNameChange: (
      state,
      action: PayloadAction<FieldChangeParams>,
    ) => {
      const {text, categoryIndex, attributeIndex} = action.payload;
      state.list[categoryIndex].attributes[attributeIndex].title = text;
    },
    changeTitleField: (
      state,
      action: PayloadAction<{categoryIndex: number; attributeIndex: number}>,
    ) => {
      const {categoryIndex, attributeIndex} = action.payload;
      state.list[categoryIndex].attributes = state.list[
        categoryIndex
      ].attributes.map((attribute, index) => {
        return {...attribute, isTitleField: index === attributeIndex};
      });
    },
  },
});

export const {
  addCategory,
  removeCategory,
  addAttribute,
  removeAttribute,
  updateCategoryName,
  onAttributeNameChange,
  changeTitleField,
} = categorySlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCategories = (state: RootState) => state.categories.list;

export default categorySlice.reducer;
