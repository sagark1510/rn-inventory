import {FieldTypes} from '../constants/constants';

export type FieldType = typeof FieldTypes[number]['type'];

export interface Field {
  type: FieldType;
  value: string | number | boolean;
  title: string;
  fieldId: string;
}

export interface Attribute {
  title: string;
  type: FieldType;
  isTitleField?: boolean;
  fieldId?: string;
}

export interface Category {
  name: string;
  attributes: Attribute[];
  id?: string;
}

export interface FieldChangeParams {
  text: string;
  attributeIndex: number;
  categoryIndex: number;
}

export interface MachineAttributes {
  fieldId: string;
  value: string | boolean;
  categoryFieldId: string;
}

export interface Machine {
  categoryId: string;
  id: string;
  attributes: MachineAttributes[];
}
