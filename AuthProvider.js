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
    const [user, setUser] = useState(null);
    const [db, setDB] = useState({});
    const [hd_colors, setHDColoirs] = useState(['#00b5b8', '#f7c035', '#00b8']);

    const hardcoded_users = {
      'd': {
        'name': '',
        'email': '',
        'total_points': 0,
        'color': '#'
      },
    }
  
    // The log in function takes an email and password and uses the Email/Password
    // authentication provider to log in.
    const logIn = async (email, password) => {
      console.log(`Logging in as ${email}...`);
      const creds = Realm.Credentials.emailPassword(email, password);
      const newUser = await app.logIn(creds);
      console.log(`Logged in as ${newUser.identity}`);
      if (!newUser.identity in db) {
        console.log('new')
      } else {
        console.log('old')
      }
      let newDB = db;
      let createdUser = {
        name: email.split('@')[0],
        email: email,
        total_points: 0,
        color: hd_colors[getRandomInt()]
      }
      newDB[newUser.identity] = createdUser;
      setDB(newDB);
      console.log(db);
      setUser(newUser);
    };

    const getCurentUser = () => {
      return db[user.identity].name
    };

    const getCurentUserColor = () => {
      console.log(db[user.identity])
      if (db[user.identity]) {
        return db[user.identity].color || '#00b5b8'
      }
      else
        return '#00b5b8'
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

    const addPoints = (email, points) => {
      db.email.total_points += points
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
          getCurentUserColor
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
