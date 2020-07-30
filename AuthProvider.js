import React, {useContext, useState} from 'react';
import Realm from 'realm';
import {getRealmApp} from './getRealmApp';

// Access the Realm App.
const app = getRealmApp();

// Create a new Context object that will be provided to descendants of the AuthProvider.
const AuthContext = React.createContext(null);

// The AuthProvider is responsible for user management and provides the
// AuthContext value to its descendants. Components under an AuthProvider can
// use the useAuth() hook to access the auth value.
const AuthProvider = ({children}) => {
    const hardcoded_users = {
      '5f22e81e4ac29c60609e4378': {
        'name': 'gerajuarez',
        'email': 'gerajuarez@itesm.mx',
        'total_points': 4,
        'color': '#9cc9ad'
      },
      '5f22edfbe08f6af1b528d50d': {
        'name': 'fernandaz',
        'email': 'fernandaz@mail.com',
        'total_points': 10,
        'color': '#f7c035'
      },
      '5f22ee56b22a2a77f9931cd4': {
        'name': 'juanner',
        'email': 'juanner@gmail.com',
        'total_points': 5,
        'color': '#a4cafd'
      }
    }  
    const [user, setUser] = useState(null);
    const [db, setDB] = useState(hardcoded_users);
    const [hd_colors, setHDColors] = useState(['#00b5b8', '#f7c035', '#00b8']);

    
  
    // The log in function takes an email and password and uses the Email/Password
    // authentication provider to log in.
    const logIn = async (email, password) => {
      console.log(`Logging in as ${email}...`);
      const creds = Realm.Credentials.emailPassword(email, password);
      const newUser = await app.logIn(creds);
      console.log(`Logged in as ${newUser.identity}`);
      if (newUser.identity in db) {
        console.log('old')
      } else {
        console.log('new')
        console.log(newUser.identity)
        let newDB = db;
        let createdUser = {
          name: email.split('@')[0],
          email: email,
          total_points: 0,
          color: hd_colors[getRandomInt()]
        }
        newDB[newUser.identity] = createdUser;
        setDB(newDB);
      }
      setUser(newUser);
    };

    const getCurentUser = () => {
      return db[user.identity].name
    };

    const getCurentUserColor = () => {
      if (db[user.identity]) {
        return db[user.identity].color || '#00b5b8'
      }
      else
        return '#00b5b8'
    };

    const getCurentUserPoints = () => {
      if (db[user.identity]) {
        return db[user.identity].total_points || 0
      }
      else
        return 0
    };
  
    // Log out the current user.
    const logOut = () => {
      if (user == null) {
        console.warn("Not logged in -- can't log out!");
        return;
      }
      console.log('Logging out...');
      user.logOut();
      setUser(null);
    };
  
    // The register function takes an email and password and uses the emailPassword
    // authentication provider to register the user.
    const registerUser = async (email, password) => {
      console.log(`Registering as ${email}...`);
      await app.auth.emailPassword.registerEmail(email, password);
    };

    const [currentView, setView] = useState('TasksView');
    const changeView = (view) => {
      setView(view);
    };

    const addPoints = (points) => {
      db[user.identity].total_points += points
    }

    const getRandomInt = () => {
      let min = 0;
      let max = 12;
      min = Math.ceil(min);
      max = Math.floor(max);
      return (Math.floor(Math.random() * (max - min + 1)) + min) % 3;
    }
  
    return (
      <AuthContext.Provider
        value={{
          logIn,
          logOut,
          registerUser,
          user,
          changeView,
          currentView,
          addPoints,
          getCurentUser,
          getCurentUserColor,
          getCurentUserPoints
        }}>
        {children}
      </AuthContext.Provider>
    );
};

// The useAuth hook can be used by components under an AuthProvider to access
// the auth context value.
const useAuth = () => {
    const auth = useContext(AuthContext);
    if (auth == null) {
      throw new Error('useAuth() called outside of a AuthProvider?');
    }
    return auth;
};
  
export {AuthProvider, useAuth};
