import React, {memo, useCallback, useMemo} from 'react';
import {FlatList, View} from 'react-native';
import {Text, Card, Button} from 'react-native-paper';
import {
  useDeviceOrientation,
  useDimensions,
} from '@react-native-community/hooks';
import Container from '../components/Container/Container';
import FormGenerator from '../components/FormGenerator/FormGenerator';
import {useAppDispatch, useAppSelector} from '../store/hooks';
import {selectCategories} from '../store/slices/categories';
import machines, {
  addMachine,
  removeMachine,
  selectMachines,
  updateMachineAttribeValue,
} from '../store/slices/machines';
import {Category, Machine} from '../types/types';
import {
  getMachinesByCategory,
  getMachineTitle,
  mapMachineValuesToCategoryAttribs,
  populateMachineAttributes,
} from '../utils/machines';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

interface IProps {
  categoryIndex: number;
}

const GroupedMachineList: React.FC<IProps> = memo(({categoryIndex}) => {
  const dispatch = useAppDispatch();
  const machines = useAppSelector(selectMachines);
  const categories = useAppSelector(selectCategories);
  const filteredCategories = useMemo(() => {
    if (categoryIndex < 0) return categories;
    return categories.filter((_, index) => index === categoryIndex);
  }, [categoryIndex]);
  const dimension = useDimensions();
  const {left, right} = useSafeAreaInsets();
  const orientation = useDeviceOrientation();

  const isTwoColumn = dimension.window.width > 400;
  const containerWidth = useMemo(() => {
    if (isTwoColumn) return (dimension.window.width - left - right - 20) / 2;
    return '100%';
  }, [orientation, dimension, left, right, isTwoColumn]);

  const addNewMachine = (category: Category) => {
    dispatch(
      addMachine({
        id: `machine-${new Date().getTime()}`,
        categoryId: category.id as string,
        attributes: populateMachineAttributes(category.attributes),
      }),
    );
  };

  const deleteMachine = (id: string) => {
    dispatch(removeMachine(id));
  };

  const onMachineAttribValueUpdate = useCallback(
    (fieldId: string, value: string | boolean, machineId: string) => {
      // console.log(fieldId, value, categoryId);
      dispatch(
        updateMachineAttribeValue({
          fieldId,
          value,
          machineId,
        }),
      );
    },
    [machines],
  );

  const renderMachine = (machine: Machine, item: Category) => {
    return (
      <Card style={{marginBottom: 10, width: containerWidth}}>
        <Card.Title
          title={getMachineTitle(machine.attributes, item.attributes)}
          right={() => (
            <Button icon="delete" onPress={() => deleteMachine(machine.id)}>
              Remove
            </Button>
          )}
        />
        <Card.Content>
          <FormGenerator
            formFields={mapMachineValuesToCategoryAttribs(
              item.attributes,
              machine.attributes,
            )}
            onFieldChange={(fieldId, value) =>
              onMachineAttribValueUpdate(fieldId, value, machine.id)
            }
          />
        </Card.Content>
      </Card>
    );
  };

  const renderMachines = useCallback(
    (item: Category) => {
      const categoryMachine = getMachinesByCategory(
        machines,
        item.id as string,
      );
      return (
        <FlatList
          renderItem={({item: machine}) => renderMachine(machine, item)}
          data={categoryMachine}
          keyExtractor={(_, index) => `categoey-${index}-machine`}
          ListEmptyComponent={() => (
            <View style={{paddingTop: 100}}>
              <Text style={{textAlign: 'center', color: '#aaa'}}>
                No machines added
              </Text>
            </View>
          )}
          numColumns={isTwoColumn ? 2 : 1}
        />
      );
    },
    [machines],
  );

  const renderCategory = useCallback(
    ({item, index}: {item: Category; index: number}) => {
      return (
        <View>
          <Card.Title
            titleStyle={{fontSize: 24, fontWeight: 'bold'}}
            title={item.name}
            right={() => (
              <Button
                icon="plus"
                mode="contained"
                onPress={() => addNewMachine(item)}>
                Add new machine
              </Button>
            )}
          />
          {renderMachines(item)}
        </View>
      );
    },
    [machines],
  );

  return (
    <Container>
      <FlatList
        data={filteredCategories}
        renderItem={renderCategory}
        keyExtractor={(_, index) => `category-machine-${index}`}
        ItemSeparatorComponent={() => (
          <View style={{marginTop: 30, height: 1, backgroundColor: '#ccc'}} />
        )}
        contentContainerStyle={{padding: 10}}
        showsVerticalScrollIndicator={false}
      />
    </Container>
  );
});

export default GroupedMachineList;
