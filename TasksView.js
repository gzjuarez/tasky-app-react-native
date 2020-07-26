import React from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';
import {Text, Button} from 'react-native-elements';
import {useAuth} from './AuthProvider';
import {useTasks} from './TasksProvider';
import {TaskItem} from './TaskItem';
import {AddTaskView} from './AddTaskView';

// The Tasks View displays the list of tasks of the parent TasksProvider.
// It has a button to log out and a button to add a new task.
export function TasksView() {
  // Get the logOut function from the useAuth hook.
  const {logOut} = useAuth();

  // Get the list of tasks and the projectId from the useTasks hook.

  const {tasks, projectId} = useTasks();


  return (
    <View style={styles.container}>
      

      {/* <Text h2>{projectId}</Text> */}
      <View style={styles.myButton1}></View>

      <ScrollView style={styles.taskList}>
        {tasks.map(task => (

          <TaskItem key={`${task._id}`} task={task} />

        ))}
      </ScrollView>

      <View style={{flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'center'}}>
        <AddTaskView />
        <Button type="clear" title="Log Out" onPress={logOut} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#d8d9da',
    alignItems: "stretch",
    justifyContent: 'flex-start',
    borderRadius:30,
    width: '100%',
    height: '100%',
    paddingRight: 15,
    paddingLeft: 15,
    paddingTop: 15,
    flexDirection:'column'
  },
  taskList:{
    marginTop:40,
  },
  myButtonG:{
    flex:4,
    //backgroundColor:'#00b5b8',
    //alignItems: "stretch",
    flexDirection: 'row',
    flexWrap:'wrap',
    justifyContent: 'space-evenly',
    alignItems: 'flex-start',
    alignContent: 'space-around',

  },
  myButton1:{
    height: 100,
    width: 100,
    borderRadius:200, 
    backgroundColor:'#00b5b8',
    alignSelf: 'center',
    marginBottom: 20,
  },
});