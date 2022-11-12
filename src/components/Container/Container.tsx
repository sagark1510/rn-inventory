import React, {memo} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDeviceOrientation} from '@react-native-community/hooks';
import {View, ViewProps} from 'react-native';

interface IProps extends ViewProps {}
const Container: React.FC<IProps> = memo(({children, ...rest}) => {
  const orientation = useDeviceOrientation();
  if (orientation.portrait)
    return (
      <View style={{flex: 1}} {...rest}>
        {children}
      </View>
    );
  return (
    <SafeAreaView style={{flex: 1}} {...rest}>
      {children}
    </SafeAreaView>
  );
});

export default Container;
