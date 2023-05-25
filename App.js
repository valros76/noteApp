import React, { useState, useEffect } from 'react';
import { getUsername } from './src/shared/functions/AsyncFunctions';
import { NavigationContainer } from '@react-navigation/native';
import { NavigationTabs } from './src/navigation';
import { NoteProvider } from './src/shared/context';
import {deleteUsername} from './src/shared/functions/AsyncFunctions';

export default function App() {

  const [userName, setUserName] = useState({});

  const findUser = async () => {
    const result = await getUsername("@username");
    if (result !== undefined && result !== null) {
      setUserName(JSON.parse(result));
    } else {
      setUserName(undefined);
    }
  }

  useEffect(() => {
    findUser();
  }, []);

  const modifyGlobalUsername = (newName)=>{
    setUserName({ name: newName });
  }

  return(
    <NavigationContainer>
      <NoteProvider>
        <NavigationTabs 
          userName={userName?.name}
          modifyGlobalUsername={modifyGlobalUsername}
        />
      </NoteProvider>
    </NavigationContainer>
  )

}