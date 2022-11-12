import {FieldTypes} from '../constants/constants';

export type FieldType = typeof FieldTypes[number]['type'];

export interface Field {
  type: FieldType;
  value: string | number | boolean;
  title: string;
}

export interface Attribute {
  title: string;
  type: FieldType;
  isTitleField?: boolean;
}

export interface Category {
  name: string;
  attributes: Attribute[];
}

export interface FieldChangeParams {
  text: string;
  attributeIndex: number;
  categoryIndex: number;
}
