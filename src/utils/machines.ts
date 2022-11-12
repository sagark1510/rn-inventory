import {Category, Field, Machine, MachineAttributes} from '../types/types';

export const getMachinesByCategory = (
  machines: Machine[],
  categoryId: string,
): Machine[] => {
  return machines.filter(machines => machines.categoryId === categoryId);
};

export const getMachineTitle = (
  machineAttribs: MachineAttributes[],
  categoryAttribs: Category['attributes'],
): string | boolean => {
  const titleField = categoryAttribs.find(attrib => attrib.isTitleField);
  const machineField = machineAttribs.find(
    attrib => attrib.categoryFieldId === titleField?.fieldId,
  );
  return machineField?.value || 'Unnamed field';
};

export const mapMachineValuesToCategoryAttribs = (
  attributes: Category['attributes'],
  machineValues: MachineAttributes[],
): Field[] => {
  return attributes.map(attribute => {
    const machineField = machineValues.find(
      machineValue => machineValue.categoryFieldId === attribute.fieldId,
    );
    console.log('mapMachineValuesToCategoryAttribs', attribute, machineField);
    return {
      title: attribute.title,
      value: machineField?.value || '',
      type: attribute.type,
      fieldId: machineField?.fieldId as string,
    };
  });
};

export const populateMachineAttributes = (
  categoryAttributes: Category['attributes'],
): MachineAttributes[] => {
  return categoryAttributes.map((attrib, index) => {
    return {
      fieldId: `machine-field-${new Date().getTime()}-${index}`,
      value: '',
      categoryFieldId: attrib.fieldId as string,
    };
  });
};
