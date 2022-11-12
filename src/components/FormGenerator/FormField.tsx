import React, {memo, useState} from 'react';
import {Field} from '../../types/types';
import {TextInput, Switch} from 'react-native-paper';
import Checkbox from './Checkbox';
import DatePicker from './DatePicker';

interface IProps {
  field: Field;
  onChange: (value: string | boolean) => void;
}

const FormField: React.FC<IProps> = memo(({field, onChange}) => {
  switch (field.type) {
    case 'string':
      return (
        <TextInput
          mode="outlined"
          key={field.title}
          label={field.title}
          value={field.value as string}
          onChangeText={onChange}
        />
      );
    case 'number':
      return (
        <TextInput
          key={field.title}
          label={field.title}
          value={field.value as string}
          keyboardType="number-pad"
          mode="outlined"
          onChangeText={onChange}
        />
      );
    case 'checkbox':
      return (
        <>
          <Checkbox
            checked={!!field.value}
            title={field.title}
            onChange={onChange}
          />
        </>
      );
    case 'date':
      return (
        <>
          <DatePicker
            date={field.value ? new Date(field.value as string) : new Date()}
            title={field.title}
            onChange={onChange}
          />
        </>
      );
    default:
      return null;
  }
});

export default FormField;
