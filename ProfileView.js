import React from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';
import {Text, Button} from 'react-native-elements';
import {useAuth} from './AuthProvider';
import {useTasks} from './TasksProvider';

export function ProfileView() {
    const {logOut} = useAuth();
    const {tasks, projectId} = useTasks();

    return (
        <View style={styles.container}>
            <Text>Hey</Text>
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
      flexDirection:'column',
    },
});