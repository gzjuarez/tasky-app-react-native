import React, {useState} from 'react';
import {View} from 'react-native';
import {Overlay, Input, Button, Icon, Text} from 'react-native-elements';
import NumericInput from 'react-native-numeric-input'

import {useTasks} from './TasksProvider';

// The AddTaskView is a button for adding tasks. When the button is pressed, an
// overlay shows up to request user input for the new task name. When the
// "Create" button on the overlay is pressed, the overlay closes and the new
// task is created in the realm.
export function AddTaskView() {
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [newTaskName, setNewTaskName] = useState('');
  const [newTaskPoint, setNewTaskPoint] = useState(0);

  const {createTask} = useTasks();

  return (
    <>
      <Overlay
        isVisible={overlayVisible}
        overlayStyle={{width: '90%'}}
        onBackdropPress={() => setOverlayVisible(false)}>
        <>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Icon
              raised
              name='navigate-before'
              type='material'
              onPress={() => {
                setOverlayVisible(false);
              }}
            />
            <Icon
              raised
              name='check'
              type='material'
              onPress={() => {
                setOverlayVisible(false);
                createTask(newTaskName, newTaskPoint);
              }}
            />
          </View>

          <Text>Which chore you want to add?</Text>
          <Text>Specify the prize and describe the chore</Text>
              
          <View style={{alignItems: 'center', margin:25}}>
            <NumericInput
              onChange={value => setNewTaskPoint(value)}
              rounded
              textColor='#59656F'
              iconStyle={{ color: 'white' }}
              rightButtonBackgroundColor='#00b5b8'
              leftButtonBackgroundColor='#00b8'
              minValue={0}
              valueType="integer"
              totalWidth={150}
              totalHeight={60}
              style={{alignItems: 'center'}}
            />
          </View>

          <Input
            label="Name"
            placeholder="Clean your bedroom"
            onChangeText={(text) => setNewTaskName(text)}
            autoFocus={true}
          />
          <Input
            label="Description"
            placeholder="Do not forget to sort your toys..."
            //onChangeText={(text) => setNewTaskName(text)}
          />
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Icon
              raised
              reverse
              name='trash'
              type='evilicon'
              color='#00b5b8'
            />
            <Icon
              raised
              reverse
              name='restaurant'
              type='material'
              color='#00b5b8'
            />
            <Icon
              raised
              reverse
              name='pencil'
              type='evilicon'
              color='#00b5b8'
            />
          </View>

          <Button
            title="Create"
            type="clear"
            onPress={() => {
              setOverlayVisible(false);
              createTask(newTaskName, newTaskPoint);
            }}
          />
        </>
      </Overlay>
      <Icon
        raised
        name='add'
        type='material'
        color='#93988f'
        onPress={() => {
          setOverlayVisible(true);
        }}
      />
    </>
  );
}
