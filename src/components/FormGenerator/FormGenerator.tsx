import React, {memo, useCallback} from 'react';
import {View} from 'react-native';
import {IconButton} from 'react-native-paper';
import {Field} from '../../types/types';
import FormField from './FormField';

interface IProps {
  formFields: Field[];
  onAttributeRemove: (index: number) => void;
}

const FormGenerator: React.FC<IProps> = memo(props => {
  const {formFields, onAttributeRemove} = props;

  return formFields.map((field, index) => {
    return (
      <View key={field.title + index} style={{marginBottom: 16}}>
        <View style={{flexDirection: 'row'}}>
          <View style={{flex: 1}}>
            <FormField field={field} />
          </View>
          <IconButton icon="delete" onPress={() => onAttributeRemove(index)} />
        </View>
      </View>
    );
  });
});

export default FormGenerator;
