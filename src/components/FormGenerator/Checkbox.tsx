import React, {memo} from 'react';
import {View} from 'react-native';
import {Text, Switch} from 'react-native-paper';

interface IProps {
  checked: boolean;
  title: string;
  onChange: (value: boolean) => void;
}

const Checkbox: React.FC<IProps> = memo(props => {
  const {checked, title, onChange} = props;

  return (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <Switch value={checked} onValueChange={onChange} />
      <View style={{width: 20}} />
      <Text>{title}</Text>
    </View>
  );
});

export default Checkbox;
