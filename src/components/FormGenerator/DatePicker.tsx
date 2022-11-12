import React, {memo, useState} from 'react';
import {View} from 'react-native';
import RNDatePicker from 'react-native-date-picker';
import {Button} from 'react-native-paper';

interface IProps {
  title: string;
  date: Date;
}

const DatePicker: React.FC<IProps> = memo(props => {
  const {date, title} = props;
  const [open, setOpen] = useState(false);
  return (
    <View>
      <Button onPress={() => setOpen(true)}>{title}</Button>
      <RNDatePicker
        modal
        mode="date"
        open={open}
        date={date}
        onConfirm={date => {
          setOpen(false);
          //   setDate(date)
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </View>
  );
});

export default DatePicker;
