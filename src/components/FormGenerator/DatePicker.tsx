import React, {memo, useState} from 'react';
import {View} from 'react-native';
import RNDatePicker from 'react-native-date-picker';
import {Button} from 'react-native-paper';

interface IProps {
  title: string;
  date: Date;
  onChange: (value: string) => void;
}

const DatePicker: React.FC<IProps> = memo(props => {
  const {date, title, onChange} = props;
  const [open, setOpen] = useState(false);
  return (
    <View>
      <Button mode="outlined" onPress={() => setOpen(true)}>
        {title} : {date.toDateString()}
      </Button>
      <RNDatePicker
        modal
        mode="date"
        open={open}
        date={date}
        onConfirm={date => {
          setOpen(false);
          onChange(date.toISOString());
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </View>
  );
});

export default DatePicker;
