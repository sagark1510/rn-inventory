import {useNavigation} from '@react-navigation/native';
import React, {memo, useEffect} from 'react';
import {useCallback} from 'react';
import {FlatList, View} from 'react-native';
import {Button, Card, TextInput, IconButton, Text} from 'react-native-paper';
import FieldTypeSelector from '../components/FieldTypeSelector/FieldTypeSelector';
import TitleFieldSelector from '../components/TitleFieldSelector/TitleFieldSelector';
import {useAppDispatch, useAppSelector} from '../store/hooks';
import {
  addAttribute,
  addCategory,
  changeTitleField,
  onAttributeNameChange,
  removeAttribute,
  removeCategory,
  selectCategories,
  updateCategoryName,
} from '../store/slices/categories';
import {Attribute, Category, FieldChangeParams} from '../types/types';

interface RenderFieldParams {
  field: Attribute;
  attributeIndex: number;
  categoryIndex: number;
}

const ManagerCategories = memo(() => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategories);
  const totalCategories = categories.length;

  const onAttributeLabelChange = useCallback((params: FieldChangeParams) => {
    dispatch(onAttributeNameChange(params));
  }, []);

  const onCategoryNameChange = useCallback((index: number, text: string) => {
    dispatch(updateCategoryName({categoryIndex: index, text}));
  }, []);

  const removeField = useCallback(
    (categoryIndex: number, fieldIndex: number) => {
      dispatch(removeAttribute({categoryIndex, attributeIndex: fieldIndex}));
    },
    [],
  );

  const addField = useCallback((index: number, field: Attribute) => {
    dispatch(addAttribute({categoryIndex: index, attribute: field}));
  }, []);

  const onCategoryRemove = useCallback((index: number) => {
    dispatch(removeCategory(index));
  }, []);

  const onChangeTitleField = useCallback(
    (categoryIndex: number, attributeIndex: number) => {
      dispatch(changeTitleField({categoryIndex, attributeIndex}));
    },
    [],
  );

  const onCategoryAdd = useCallback(() => {
    dispatch(
      addCategory({
        name: `New Category Name ${totalCategories + 1}`,
        attributes: [
          {
            type: 'string',
            title: 'field',
            isTitleField: true,
          },
        ],
      }),
    );
  }, [totalCategories]);

  const newCategoryButton = useCallback(() => {
    return (
      <Button icon="plus" mode="text" onPress={onCategoryAdd}>
        Add
      </Button>
    );
  }, []);

  const renderField = useCallback(
    (params: RenderFieldParams) => {
      const {attributeIndex, categoryIndex, field} = params;
      return (
        <View
          style={{
            marginBottom: 16,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View style={{flex: 1}}>
            <TextInput
              mode="outlined"
              label={`Field ${attributeIndex + 1}`}
              placeholder={`Enter field title`}
              value={field.title as string}
              onChangeText={text =>
                onAttributeLabelChange({
                  text,
                  categoryIndex,
                  attributeIndex,
                })
              }
              right={<TextInput.Affix text={field.type} />}
            />
          </View>
          <IconButton
            icon="delete"
            onPress={() => removeField(categoryIndex, attributeIndex)}
          />
        </View>
      );
    },
    [categories],
  );

  const renderCategory = useCallback(
    ({item, index}: {item: Category; index: number}) => {
      const {name, attributes} = item;
      return (
        <Card style={{marginBottom: 10}}>
          <Card.Title
            title={item.name}
            right={() => (
              <Button icon="delete" onPress={() => onCategoryRemove(index)}>
                Remove
              </Button>
            )}
          />
          <Card.Content>
            <View style={{marginBottom: 16}}>
              <TextInput
                label="Name"
                value={name}
                onChangeText={text => onCategoryNameChange(index, text)}
              />
            </View>
            {attributes.map((field: Attribute, attributeIndex: number) =>
              renderField({field, attributeIndex, categoryIndex: index}),
            )}
          </Card.Content>

          <View style={{alignItems: 'center', flex: 1, paddingBottom: 16}}>
            <TitleFieldSelector
              fields={attributes}
              onFieldSelected={fieldIndex =>
                onChangeTitleField(index, fieldIndex)
              }
            />
            <View style={{height: 10}} />
            <FieldTypeSelector
              onFieldTypeSelected={field => addField(index, field)}
            />
          </View>
        </Card>
      );
    },
    [categories],
  );

  useEffect(() => {
    navigation.setOptions({
      headerRight: newCategoryButton,
    });
  }, [totalCategories]);

  return (
    <View style={{padding: 10}}>
      <FlatList
        data={categories}
        renderItem={renderCategory}
        keyExtractor={(item, index) => `catehory-${index}`}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
});

export default ManagerCategories;
