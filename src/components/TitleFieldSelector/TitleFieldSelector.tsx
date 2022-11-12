import React, {memo, useState} from 'react';
import {Menu, Button} from 'react-native-paper';
import {Attribute} from '../../types/types';

interface IProps {
  onFieldSelected: (fieldIndex: number) => void;
  fields: Attribute[];
}

const TitleFieldSelector: React.FC<IProps> = memo(props => {
  const {onFieldSelected, fields} = props;
  const [visible, setVisible] = useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const onSelect = (index: number) => {
    closeMenu();
    onFieldSelected(index);
  };

  return (
    <Menu
      visible={visible}
      onDismiss={closeMenu}
      anchor={
        <Button mode="contained" onPress={openMenu}>
          Title Field: {fields.find(field => field.isTitleField)?.title}
        </Button>
      }>
      {fields.map((field, index) => (
        <Menu.Item onPress={() => onSelect(index)} title={field.title} />
      ))}
    </Menu>
  );
});

export default TitleFieldSelector;
