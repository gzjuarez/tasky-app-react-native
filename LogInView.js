import React, {useState} from 'react';
import {Button,Input, Text} from 'react-native-elements';
import { StyleSheet, View } from 'react-native';
import {useAuth} from './AuthProvider';

// This view has an input for email and password and logs in the user when the
// login button is pressed.
export function LogInView() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState();

  const {logIn, registerUser} = useAuth();

  const [authMode, setAuthMode] = useState('Login');

  return (
    <View style={styles.container}>
      
      <ToogleFamilyMembers setAuthMode={setAuthMode} authMode={authMode} />

      <Text style={styles.loginText}>{authMode}</Text>
      <Input
        autoCapitalize="none"
        placeholder="email"
        onChangeText={setEmail}
      />
      <Input
        secureTextEntry={true}
        placeholder="password"
        onChangeText={setPassword}
      />
      <Button
        buttonStyle={{backgroundColor: '#5FD6AB'}}
        containerStyle={{
          marginBottom:-20
        }}
        onPress={async () => {
          console.log(`${authMode} button pressed with email ${email}`);
          setError(null);
          try {
            if (authMode === 'Login') {

              await logIn(email, password);

            } else {

              await registerUser(email, password);

              setAuthMode('Login');
            }
          } catch (e) {
            setError(`Operation failed: ${e.message}`);
          }
        }}
        title={authMode}
      />
      <Text>{error}</Text>
      <ToggleAuthModeComponent setAuthMode={setAuthMode} authMode={authMode} />
      
    </View>
  );
}

const ToogleFamilyMembers = ({authMode, setAuthMode}) => {
  if (authMode === 'Login') {
    return (
      <>
      <View style={styles.title}>
        <Text style={styles.darkText}>Family </Text>
        <Text style={styles.lightText}>Members</Text>
      </View>
      <View style={styles.myButtonG}>
        <View style={styles.myButton1}></View>
        <View style={styles.myButton2}></View>
        <View style={styles.myButton3}></View>
      </View>
      </>
    );
  } else {
    return (
      <></>
    );
  }
};

const ToggleAuthModeComponent = ({authMode, setAuthMode}) => {
  if (authMode === 'Login') {
    return (
      <View style={{flexDirection: 'row', alignContent: 'flex-start', paddingBottom:50}}>
      <Text style={{
        color:"#000000",
        fontFamily: 'sans-serif-light',
        fontSize:15,
        marginTop:10
      }}
      onPress={async () => {
        setAuthMode('Register');
      }}
      >Create</Text>
      <Button
        title="New Account"
        type="clear"
        buttonStyle={{color: 'red'}}
        onPress={async () => {
          setAuthMode('Register');
        }}
        titleStyle={{
          color:'#93988f',
          fontFamily: 'sans-serif-light',
          fontSize:15
        }}
      />
      </View>
    );
  } else {
    return (
      <Button
        title="Have an account already? Login"
        type="clear"
        onPress={async () => {
          setAuthMode('Login');
        }}
      />
    );
  }
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#d8d9da',
    alignItems: "stretch",
    justifyContent: 'center',
    borderRadius:30,
    width: '100%',
    height: '100%',
    paddingRight: 15,
    paddingLeft: 15,
  },
  title:{
    flex:1,
    flexDirection:'row',
    marginTop:40,
    fontFamily: 'sans-serif-light'
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
  loginText:{
    color:"#000000",
    fontSize:20,
    flexDirection:'row',
    fontFamily: 'sans-serif-light'
  },
  myButtonG:{
    flex:5,
    //backgroundColor:'#5FD6AB',
    flexDirection: 'row',
    flexWrap:'wrap',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    alignContent: 'space-around',
    paddingHorizontal:10

  },
  myButton1:{
    height: 100,
    width: 100,  //The Width must be the same as the height
    borderRadius:200, //Then Make the Border Radius twice the size of width or Height
    backgroundColor:'#5FD6AB',
  },
  myButton2:{
    height: 100,
    width: 100,
    borderRadius:200,
    backgroundColor:'#F2D269',
  },
  myButton3:{
    height: 100,
    width: 100,  //The Width must be the same as the height
    borderRadius:200, //Then Make the Border Radius twice the size of width or Height
    backgroundColor:'#919FEE',
  },
});
