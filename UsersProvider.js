import React, {useContext, useState, useEffect, useRef} from 'react';
import Realm from 'realm';
import {useAuth} from './AuthProvider';
import {User} from './schemas';

const UsersContext = React.createContext(null);

const UsersProvider = ({children, projectId}) => {
    // Get the user from the AuthProvider context.
    const {user} = useAuth();
  
    // The tasks list will contain the tasks in the realm when opened.
    const [users, setUsers] = useState([]);
  
    const realmRef = useRef(null);

  useEffect(() => {
    if (user == null) {
      console.warn('TasksView must be authenticated!');
      return;
    }

    const config = {
      schema: [User.schema],
      sync: {
        user,
        partitionValue: projectId,
      },
    };

    console.log(
      `Attempting to open Realm ${projectId} for user ${
        user.identity
      } with config: ${JSON.stringify(config)}...`,
    );

    let canceled = false;

    // Now open the realm asynchronously with the given configuration.
    Realm.open(config)
      .then((openedRealm) => {
        // If this request has been canceled, we should close the realm.
        if (canceled) {
          openedRealm.close();
          return;
        }

        realmRef.current = openedRealm;

        const syncUsers = openedRealm.objects('User');

        openedRealm.addListener('change', () => {
          // On change, update the tasks state variable and re-render.
          setUsers([...syncUsers]);
        });

        // Set the tasks state variable and re-render.
        setUsers([...syncUsers]);
      })
      .catch((error) => console.warn('Failed to open realm:', error));

    // Return the cleanup function to be called when the component is unmounted.
    return () => {
      // Update the canceled flag shared between both this callback and the
      // realm open success callback above in case this runs first.
      canceled = true;

      // If there is an open realm, we must close it.
      const realm = realmRef.current;
      if (realm != null) {
        realm.removeAllListeners();
        realm.close();
        realmRef.current = null;
      }
    };
  }, [user, projectId]); // Declare dependencies list in the second parameter to useEffect().
  

  // Define the function for updating a task's status.
  const setUserPoints = (user, points) => {
    // One advantage of centralizing the realm functionality in this provider is
    // that we can check to make sure a valid status was passed in here.
    console.log(users);
    console.log(user);
    console.log(points);

    const realm = realmRef.current;


    realm.write(() => {

      //task.status = status;
      user.total_points = 10;//user.total_points + task.points;

    });
    console.log(user);
  };


  return (
    <UsersContext.Provider

      value={{

        setUserPoints,
        users,
        projectId,

      }}>

      {children}
    </UsersContext.Provider>
  );
};


const useUsers = () => {
    const value = useContext(TasksContext);
    if (value == null) {
      throw new Error('useUsers() called outside of a UsersProvider?');
    }
    return value;
  };
  
  export {UsersProvider, useUsers};
