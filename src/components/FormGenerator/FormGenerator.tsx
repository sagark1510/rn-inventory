import React, {memo, useCallback} from 'react';
import {View} from 'react-native';
import {Field} from '../../types/types';
import FormField from './FormField';

interface IProps {
  formFields: Field[];
  onFieldChange: (fieldId: string, value: string | boolean) => void;
}

const FormGenerator: React.FC<IProps> = memo(props => {
  const {formFields, onFieldChange} = props;
  // console.log(formFields);
  return (
    <>
      {formFields.map((field, index) => {
        return (
          <View key={field.title + index} style={{marginBottom: 16}}>
            <View style={{flexDirection: 'row'}}>
              <View style={{flex: 1}}>
                <FormField
                  field={field}
                  onChange={value => onFieldChange(field.fieldId, value)}
                />
              </View>
            </View>
          </View>
        );
      })}
    </>
  );
});

export default FormGenerator;
