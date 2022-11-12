import React, {memo, useState} from 'react';
import {Menu, Button} from 'react-native-paper';
import {FieldTypes} from '../../constants/constants';
import {Attribute, FieldType} from '../../types/types';

interface IProps {
  onFieldTypeSelected: (field: Attribute) => void;
}

const FieldTypeSelector: React.FC<IProps> = memo(props => {
  const {onFieldTypeSelected} = props;
  const [visible, setVisible] = useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const onSelect = (type: FieldType) => {
    closeMenu();
    const field: Attribute = {
      title: 'Field',
      type,
    };
    onFieldTypeSelected(field);
  };

  return (
    <Menu
      visible={visible}
      onDismiss={closeMenu}
      anchor={
        <Button mode="contained" onPress={openMenu}>
          Add Field
        </Button>
      }>
      {FieldTypes.map(fieldType => (
        <Menu.Item
          onPress={() => onSelect(fieldType.type)}
          title={fieldType.name}
        />
      ))}
    </Menu>
  );
});

export default FieldTypeSelector;
