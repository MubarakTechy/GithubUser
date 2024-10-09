// import { useState } from 'react';
// import { Text, View, TextInput, Pressable , Image } from 'react-native';


// export default function HomeScreen() {
    

//   const[user, setUser] = useState('');
//   const [username , setUsername] = useState('');
//   async  function fetchApi() {
//     const baseurl = 'https://api.github.com/users'
//     try {
//       const response = await fetch (`${baseurl}/ ${username} `)
//      .then ((res)=>res.json())
//     if (response) {
//       setUser(response)
//     }
//     } catch (error) {
//       console.log(error)
//     }
    
//   }


//   return (


//       <View style={{display:'flex', justifyContent: 'center', alignItems: 'center', padding: 100,   }}>
//            <View>
//                <Text>GITHUB USER</Text>
//                <TextInput onChangeText={setUsername} value={username} placeholder='Enter your userName ' />
//                <Pressable onPress={fetchApi}>
//                    <Text>fetch user</Text>
//                </Pressable>
//            </View>
           
         
//            {user && 
//              <View>
//                 <View>
//                  <Image source={{uri: user.avatar_url}} />
//                </View>
//                <Text> Name : {user.name}</Text>
//                <Text> Name : {user.followers}</Text>
//                <Text> Name : {user.location }</Text>
//                <Text> Name : {user.Id }</Text>
//              </View>
             
//            }

//       </View>
//   );
// }


import React, { useState } from 'react';
import { Text, View, TextInput, Pressable, Image } from 'react-native';

export default function HomeScreen() {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [err, setErr] = useState('');

  async function fetchApi() {
    const baseurl = 'https://api.github.com/users';
    try {
      const response = await fetch(`${baseurl}/${username}`);
      if (!response.ok) {
        throw new Error('User not found');
      }
      const data = await response.json();
      setUser(data);
    } catch (error) {
      console.log(error);
      setUser(null);
      setErr(error.message)
    }
  }

  return ( 
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 5, backgroundColor :"#030327"   }}>
      <View style= {{ backgroundColor: 'red', height: 450,  padding: 20, backgroundColor: 'rgba(10, 1, 62, 0.75)', borderStyle: 'solid', borderColor: 'white', }}>
        <View style= {{gap: 25,}}>
        <Text style={{fontSize: 30, color: 'white',}} >GITHUB USER</Text>
        <TextInput
          onChangeText={setUsername}
          value={username}
          placeholder='Enter your userName'
          style={{ borderWidth: 1, backgroundColor: 'white', padding: 5,  borderColor: "white", width : 250, }}
        />
        <Pressable onPress={fetchApi} style={{ backgroundColor: '#007AFF', padding: 10, borderRadius: 5 }}>
          <Text style={{ color: 'white', textAlign: 'center' }}>Fetch User</Text>
        </Pressable>
      </View>

      {user && user ? (
        <View style={{ marginTop: 20, alignItems: 'center' }}>
          <Image
            source={{ uri: user.avatar_url }}
            style={{ width: 100, height: 100 }}
            width={40} height={40}
          />
          <Text style={{color: "white"}} >User Name: {user.name || 'N/A'}</Text>
          <Text style={{color: "white"}} >Followers: {user.followers}</Text>
          <Text style={{color: "white"}} >Location: {user.location || 'N/A'}</Text>
          <Text style={{color: "white"}} >ID: {user.id}</Text>
        </View>
      ):
      <View><Text style={{color:"white", fontSize:30}}>{err}</Text></View>
      }
        </View>
    </View>
  );
}