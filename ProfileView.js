import React from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';
import {Text, Button, Icon} from 'react-native-elements';
import {useAuth} from './AuthProvider';
import {useTasks} from './TasksProvider';
import {AdMobBanner} from 'react-native-admob';

export function ProfileView() {
    const {logOut, changeView} = useAuth();
    const {tasks, projectId} = useTasks();

    const onFailToRecieveAd = (error) => console.log(error);
    
    return (
        <View style={styles.container}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Icon
            raised
              name='navigate-before'
              type='material'
              onPress={() => {
                changeView('TasksView')
              }}
            />
          </View>
          <View style={styles.myButton1}>
            <Text
              style={{color:'#00b5b8'}}
              onPress={
                () => {
                  changeView('TasksView')
                }
              }>
                Profile
            </Text>
          </View>
          <View style={styles.title}>
            <Text style={styles.darkText}>Hi </Text>
            <Text style={styles.lightText}>Nombre!</Text>
          </View>
          <View style={styles.subtitle}>
            <Text style={styles.darkText2}>This are your points!</Text>
          </View>
          <View style={styles.subtitle}>
            <Text style={styles.points}>35</Text>
          </View>
          <AdMobBanner
            adSize="Banner"
            adUnitID="ca-app-pub-3940256099942544/6300978111"
            didFailToReceiveAdWithError={onFailToRecieveAd}
          />
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
    myButton1:{
      height: 150,
      width: 150,
      borderRadius:300, 
      backgroundColor:'#00b5b8',
      alignSelf: 'center',
      marginTop: 40,
      justifyContent:'center',
      alignItems:'center',
    },
    title:{
      flex:1,
      flexDirection:'row',
      marginTop:40,
      justifyContent: 'center'
    },
    darkText:{
      color:"#000000",
      fontSize:30,
      fontFamily: 'sans-serif-light'
    },
    lightText:{
      color:"#93988f",
      fontSize:30,
      fontFamily: 'sans-serif-light'
    },
    subtitle:{
      flex:1,
      flexDirection:'row',
      justifyContent: 'center',
    },
    darkText2:{
      color:"#000000",
      fontSize:20,
      fontFamily: 'sans-serif-light'
    },
    points:{
      color:"#00b8",
      fontSize:50,
      fontFamily: 'monospace'
    },
});