import React, {memo} from 'react';
import {View} from 'react-native';
import {Text, Switch} from 'react-native-paper';

interface IProps {
  checked: boolean;
  title: string;
}

const Checkbox: React.FC<IProps> = memo(props => {
  const {checked, title} = props;

  return (
    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
      <Text>{title}</Text>
      <Switch value={checked} onValueChange={() => {}} />
    </View>
  );
});

export default Checkbox;
