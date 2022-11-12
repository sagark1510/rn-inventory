import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import {memo, useCallback} from 'react';
import GroupedMachineList from '../screens/GroupedMachineList';
import Home from '../screens/ManagerCategories';
import {useAppSelector} from '../store/hooks';
import {selectCategories} from '../store/slices/categories';

const Drawer = createDrawerNavigator();

const Navigator = memo(() => {
  const categories = useAppSelector(selectCategories);

  const renderList = (index: number) => () =>
    <GroupedMachineList categoryIndex={index} />;

  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name="Dashboard" component={renderList(-1)} />
        {categories.map(({name}, index) => (
          <Drawer.Screen
            name={name || `Category ${index + 1}`}
            key={name + index}
            component={renderList(index)}
          />
        ))}
        <Drawer.Screen name="Manage Categories" component={Home} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
});

export default Navigator;
