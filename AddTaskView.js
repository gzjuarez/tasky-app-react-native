import React, {useState} from 'react';
import {View} from 'react-native';
import {Overlay, Input, Button, Icon, Text} from 'react-native-elements';
import {useTasks} from './TasksProvider';

// The AddTaskView is a button for adding tasks. When the button is pressed, an
// overlay shows up to request user input for the new task name. When the
// "Create" button on the overlay is pressed, the overlay closes and the new
// task is created in the realm.
export function AddTaskView() {
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [newTaskName, setNewTaskName] = useState('');

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
                createTask(newTaskName);
              }}
            />
          </View>

          <Text>Which chore you want to add?</Text>
          <Text>Specify the rpize and describe the chore</Text>

          

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
          <Button
            title="Create"
            onPress={() => {
              setOverlayVisible(false);

              createTask(newTaskName);

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
