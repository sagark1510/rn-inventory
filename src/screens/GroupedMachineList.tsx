import React, {memo} from 'react';
import {View} from 'react-native';
import {Text} from 'react-native-paper';

interface IProps {
  categoryIndex: number;
}

const GroupedMachineList: React.FC<IProps> = memo(({categoryIndex}) => {
  return (
    <View>
      <Text>Filter = {categoryIndex}</Text>
    </View>
  );
});

export default GroupedMachineList;
