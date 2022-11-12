import React, {memo, useState} from 'react';
import {Field} from '../../types/types';
import {TextInput, Switch} from 'react-native-paper';
import Checkbox from './Checkbox';
import DatePicker from './DatePicker';

interface IProps {
  field: Field;
}

const FormField: React.FC<IProps> = memo(({field}) => {
  switch (field.type) {
    case 'string':
      return (
        <TextInput
          key={field.title}
          label={field.title}
          value={field.value as string}
        />
      );
    case 'number':
      return (
        <TextInput
          key={field.title}
          label={field.title}
          value={field.value as string}
          keyboardType="number-pad"
        />
      );
    case 'checkbox':
      return (
        <>
          <Checkbox checked={!!field.value} title={field.title} />
        </>
      );
    case 'date':
      return (
        <>
          <DatePicker
            date={new Date(field.value as string)}
            title={field.title}
          />
        </>
      );
    default:
      return null;
  }
});

export default FormField;
