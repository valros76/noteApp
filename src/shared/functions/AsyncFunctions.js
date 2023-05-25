import AsyncStorage from "@react-native-async-storage/async-storage";

export async function initProfileName(name = null) {
   try {
      const jsonValue = await AsyncStorage.getItem("@profile");
      if (jsonValue === null) {
         await AsyncStorage.setItem("@profile", JSON.stringify(name !== null ? name : "Connected user"));
      }
   } catch (err) {
      console.log(err);
   }
}


export async function initUsername(name = null){
   try{
      const jsonValue = await AsyncStorage.getItem("@username");
      if(jsonValue === null){
         await AsyncStorage.setItem("@username", JSON.stringify(name !== null ? name : "NewUser"));
      }
   }catch(err){
      console.log("initUsername :" + err);
   }
}

export async function getProfileName() {
   try {
      const value = await AsyncStorage.getItem("@profile");
      if (value !== null) {
         return JSON.parse(value);
      } else {
         return "Invité";
      }
   } catch (err) {
      console.log("getProfileName : " + err);
   }
}

export async function getUsername(){
   try{
      const value = await AsyncStorage.getItem("@username");
      if(value !== null){
         return JSON.parse(value);
      }else{
         return null;
      }
   }catch(err){
      console.log("getUsername : " + err);
   }
}

export async function setUsername(username = null){
   try{
      if(username !== null){
         await AsyncStorage.setItem("@username", JSON.stringify(username));
      }
   }catch(err){
      console.log("setUsername : " + err);
   }
}

export async function mergeUsername(newValue = null){
   try{
      if(newValue !== null){
         const jsonValue = await AsyncStorage.getItem("@username");
         if(jsonValue === null){
            initUsername();
         }
         await AsyncStorage.mergeItem("@username", JSON.stringify(jsonValue));
      }
   }catch(err){
      console.log("mergeUsername : " + err);
   }
}

export async function deleteUsername(){
   try{
      await AsyncStorage.removeItem("@username");
   }catch(err){
      console.log("deleteUsername : " + err);
   }
}

export async function logUsername(){
   try{
      const jsonValue = await AsyncStorage.getItem("@username");
      if(jsonValue !== null){
         console.log(`Username : ${jsonValue}`);
      }else{
         console.log("Username is null");
      }
   }catch(err){
      console.log("Erreur logUsername : " + err);
   }
}