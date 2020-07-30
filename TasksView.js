import React from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';
import {Text, Button} from 'react-native-elements';
import {useAuth} from './AuthProvider';
import {useTasks} from './TasksProvider';
import {TaskItem} from './TaskItem';
import {AddTaskView} from './AddTaskView';
import {AdMobBanner} from 'react-native-admob';
import { paymentRequest } from 'react-native-paypal';

// The Tasks View displays the list of tasks of the parent TasksProvider.
// It has a button to log out and a button to add a new task.
export function TasksView() {
  // Get the logOut function from the useAuth hook.
  const {logOut, changeView, user} = useAuth();

  // Get the list of tasks and the projectId from the useTasks hook.

  const {tasks, projectId} = useTasks();


  const payPalRequest1 = async () => {
    try {
      const {
        nonce,
        payerId,
        email,
        firstName,
        lastName,
        phone 
      } = await requestOneTimePayment(
        'A21AAFsR6onkFqbQBDHuriTSL_Y13ZezwU81S8aOwpds7TTj82sgbdcMwLHlkbHr2w4TcrddOECkJOUmBNTlwVIbz2_kZCevQ',
        {
          amount: '5', // required
          // any PayPal supported currency (see here: https://developer.paypal.com/docs/integration/direct/rest/currency-codes/#paypal-account-payments)
          currency: 'MX',
          // any PayPal supported locale (see here: https://braintree.github.io/braintree_ios/Classes/BTPayPalRequest.html#/c:objc(cs)BTPayPalRequest(py)localeCode)
          localeCode: 'es_MX', 
          shippingAddressRequired: false,
          userAction: 'commit', // display 'Pay Now' on the PayPal review page
          // one of 'authorize', 'sale', 'order'. defaults to 'authorize'. see details here: https://developer.paypal.com/docs/api/payments/v1/#payment-create-request-body
          intent: 'authorize', 
        }
      );
    } catch (e) {
      console.log(e)
    }
  };

  const payPalRequest = () => {
    console.log('hey')
    paymentRequest({
      clientId: 'Aba9TT2hvg19sTsqy-DYAWaTwoW6Qtx7uk8C-x8fGGO94YZBMHDVK4UIRqkPZZmmNphmdYv_xexTJiju',
      environment: 0,
      price: '20.00',
      currency: 'MX',
      description: 'PayPal Test'
    }).then((confirm, payment) => {
      console.log('Paid');
    })
    .catch((error_code) => console.error('Failed to pay through PayPal'));
  }

  const onFailToRecieveAd = (error) => console.log(error);

  return (
    <View style={styles.container}>
      

      {/* <Text h2>{projectId}</Text> */}
      <View style={styles.myButton1}>
        <Text
          style={{color:'#00b5b8'}}
          onPress={
            () => {
              //console.log(user)
              changeView('ProfileView')
              //payPalRequest()
            }
          }>
            Profile
        </Text>
      </View>

      <ScrollView style={styles.taskList}>
        {tasks.map(task => (

          <TaskItem key={`${task._id}`} task={task} />

        ))}
      </ScrollView>

      <View style={{flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'center'}}>
        <AddTaskView />
        <Button type="clear" title="Log Out" onPress={logOut} />
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
  taskList:{
    marginTop:40,
    //justifyContent:'center',
    //alignSelf:'center'
    //alignContent:'flex-start'
    marginHorizontal: 60
  },
  myButtonG:{
    flex:4,
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
    justifyContent:'center',
    alignItems:'center',
  },
});