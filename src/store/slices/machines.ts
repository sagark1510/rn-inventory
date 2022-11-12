import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import type {RootState} from '../store';
import {Attribute, Category, Machine} from '../../types/types';

export interface MachinesState {
  list: Machine[];
}

const initialState: MachinesState = {
  list: [],
};

export const machinesSlice = createSlice({
  name: 'machines',
  initialState,
  reducers: {
    addMachine: (state, action: PayloadAction<Machine>) => {
      state.list = [...state.list, action.payload];
    },
    removeMachine: (state, action: PayloadAction<string>) => {
      state.list = state.list.filter(machine => machine.id !== action.payload);
    },
    updateMachineAttribeValue: (
      state,
      action: PayloadAction<{
        fieldId: string;
        machineId: string;
        value: string | boolean;
      }>,
    ) => {
      const {machineId, fieldId, value} = action.payload;
      const index = state.list.findIndex(machine => machine.id === machineId);
      console.log('machine index: ', index);
      if (index >= 0) {
        state.list[index].attributes = state.list[index].attributes.map(
          attrib => {
            if (attrib.fieldId === fieldId) return {...attrib, value};
            return attrib;
          },
        );
      }
    },
    generateMachineField: (
      state,
      action: PayloadAction<{category: Category; field: Attribute}>,
    ) => {
      const {category, field} = action.payload;
      const machines = state.list.filter(
        machine => machine.categoryId === category.id,
      );
      machines.forEach(machine => {
        machine.attributes.push({
          fieldId: `machine-field-${new Date().getTime()}-${
            machine.attributes.length
          }`,
          value: '',
          categoryFieldId: field.fieldId as string,
        });
      });
    },
    removeMachineField: (
      state,
      action: PayloadAction<{category: Category; field: Attribute}>,
    ) => {
      const {category, field} = action.payload;
      const machines = state.list.filter(
        machine => machine.categoryId === category.id,
      );
      machines.forEach(machine => {
        machine.attributes = machine.attributes.filter(
          attrib => attrib.categoryFieldId !== field.fieldId,
        );
      });
    },
  },
});

export const {
  addMachine,
  removeMachine,
  updateMachineAttribeValue,
  generateMachineField,
  removeMachineField,
} = machinesSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectMachines = (state: RootState) => state.machines.list;

export default machinesSlice.reducer;
