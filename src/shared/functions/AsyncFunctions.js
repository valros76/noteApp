import AsyncStorage from "@react-native-async-storage/async-storage";

export async function initProfileName(name = null) {
  try {
    const jsonValue = await AsyncStorage.getItem('@profile')
    if (jsonValue === null) {
      await AsyncStorage.setItem('@profile', JSON.stringify(name !== null ? name : "Connected User"))
    }
  } catch (e) {
    console.log('Erreur initProfileName : ' + e);
  }
}

export async function initUsername(name = null) {
  try {
    const jsonValue = await AsyncStorage.getItem('@username')
    if (jsonValue === null) {
      await AsyncStorage.setItem('@username', JSON.stringify(name !== null ? name : "NewUser"))
    }
  } catch (e) {
    console.log('Erreur initUsername : ' + e);
  }
}

export async function setProfileName(name = null) {
  try {
    if (name === null) {
      name = "New user";
    }
    await AsyncStorage.setItem('@profile', JSON.stringify(name));
  } catch (e) {
    console.log('Erreur setProfileName : ' + e);
  }
}

export async function setUsername(username = null) {
  try {
    if (username !== null) {
      await AsyncStorage.setItem('@user', JSON.stringify(username));
    }
  } catch (e) {
    console.log('Erreur setUsername : ' + e);
  }
}

export async function mergeProfileName(newValue = null) {
  try {
    if (newValue !== null) {
      const jsonValue = await AsyncStorage.getItem('@profile')
      if (jsonValue === null) {
        initProfileName();
      }
      await AsyncStorage.mergeItem('@profile', JSON.stringify(newValue));
    }
  } catch (e) {

  }
}

export async function mergeUsername(newValue = null) {
  try {
    if (newValue !== null) {
      const jsonValue = await AsyncStorage.getItem('@user')
      if (jsonValue === null) {
        initUsername();
      }
      await AsyncStorage.mergeItem('@user', JSON.stringify(newValue));
    }
  } catch (e) {

  }
}

export async function getProfileName() {
  try {
    const value = await AsyncStorage.getItem('@profile')
    if (value !== null) {
      return JSON.parse(value);
    } else {
      return 'Invité';
    }
  } catch (e) {
    console.log('Erreur getProfileName : ' + e)
  }
}

export async function getUsername() {
  try {
    const value = await AsyncStorage.getItem('@user');
    if (value !== null) {
      return JSON.parse(value);
    } else {
      return null;
    }
  } catch (e) {
    console.log('Erreur getUsername : ' + e)
  }
}

export async function deleteProfileName() {
  try {
    await AsyncStorage.removeItem('@profile');
  } catch (e) {
    console.log('Erreur deleteProfileName : ' + e);
  }
}

export async function deleteUsername() {
  try {
    await AsyncStorage.removeItem('@user');
  } catch (e) {
    console.log('Erreur deleteUsername : ' + e);
  }
}

export async function logProfileName() {
  try {
    const jsonValue = await AsyncStorage.getItem('@profile')
    if (jsonValue !== null) {
      console.log(`ProfileName : ${jsonValue}`);
    } else {
      console.log("ProfileName is null.")
    }
  } catch (e) {
    console.log('Erreur logProfileName : ' + e);
  }
}

export async function logUsername() {
  try {
    const jsonValue = await AsyncStorage.getItem('@user')
    if (jsonValue !== null) {
      console.log(`Username : ${jsonValue}`);
    } else {
      console.log("Username is null.")
    }
  } catch (e) {
    console.log('Erreur logUsername : ' + e);
  }
}