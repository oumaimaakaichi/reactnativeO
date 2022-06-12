import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, ScrollView, Button, TextInput, Text, Image, TouchableOpacity, Icon , Dimensions } from 'react-native';
import React, { useEffect, useState } from "react";
import { getUserData, LogoutUser, storeUserData, updateUserData } from "../utils/AsyncStorageFunctions";

import Toast from 'react-native-toast-message';
import axios from 'axios';
;
const {width:WIDTH} =Dimensions.get('window')
import * as FilesSystem from 'expo-file-system';

const {height:HEIGHT} =Dimensions.get('window')

export default function Prix({route, navigation }) {

 const[station , setStation]=useState('')
 const { itemId,  getReservationn} = route.params;
  const[prix , setPrix]=useState('')

  const[reservation , setReservation]=useState('')
  useEffect(async () => {
    
      if (getReservationn) {
          setReservation(getReservationn)
      }
      console.log(getReservationn._id)
    
  }, []);


  useEffect(async () => {
    const data = await getUserData();
    setStation(data);
    
 
  }, []);




  const editPrix = async () => {
    console.log(reservation._id)
    
    
    fetch("http://192.168.43.230:3001/reservation/mR/" +  reservation._id, {
      method: "PUT",
      headers: {
        "Content-Type": 'application/json',
      },
      body: JSON.stringify({
       prix:prix

      }
      )
    }).then(res => res.json())
      .then(async (res) => {
        

        {
          Toast.show({
            type: 'success',
            position: 'top',
            text1:'Succes',
            text2:'Ajout de prix validé',
            autoHide: true,
            visibilityTime: 1000,
            autoHide: true,
          
            onHide: () =>{ navigation.navigate('Dashboard') },
          })  
        }
        console.log(res)
       
      }


      )
      .catch((err) => {
        Toast.show({
          type: 'error',
          text1:'Modification ',
          text2:'Ajout de prix éroner',
          visibilityTime: 1000,
          position: 'top',
        }) 
        console.warn(err) })
  }

  
  
  return (
    <>
      {reservation != undefined ?
        <ScrollView style={{backgroundColor:'white' , height:HEIGHT}}>

          <Toast />
         
         

          <View style={styles.container1}>

            <View style={styles.wrapper}>

                <View style={styles.emailInput}>
                <Text style={styles.a}>Prix du lavage</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                placeholder="Prix en dinar"
                onChangeText={text => setPrix(text)}
               
              /></View>
             

  



         
       
        
        
 
             
              <TouchableOpacity style={styles.btnLogin} onPress={() => {
                editPrix()
              }}>
                <Text style={styles.TextBtn}>Envoyer</Text>

              </TouchableOpacity>
            </View>
          </View>

        </ScrollView>

        : null}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container1: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapper: {
  
    marginTop: 70
  },
  input: {
   /* marginBottom: 12,
    borderWidth: 2,
    borderColor: '#bbb',
    borderRadius: 10,
    paddingHorizontal: 14,
    borderColor: '#007BFF',
    //backgroundColor: '#4A919E',
    padding: 15,
    margin: 5,*/
    width: WIDTH-30,
   
   marginTop: 20,
        borderRadius: 5,
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderColor: "rgba(0, 0, 0, 0.2)",
        borderWidth: 1,
        marginBottom: 8,
        borderColor: '#427CA2',
  },
 a: {
      fontWeight:'bold',
      fontSize:20,
      marginTop:50
 },

  link: {
    color: 'blue',
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 0,
    marginTop: 10
  },
  logoContainer: {
    alignItems: 'center'
  },
  btnLogin: {
   /* width: 250,
    height: 45,
    borderRadius: 25,
    backgroundColor: '#4A919E',
    justifyContent: 'center',
    marginTop: 10,
    alignItems: 'center',
    alignSelf: 'center'*/
    borderColor: '#007BFF',
    backgroundColor: '#427CA2',
    padding: 15,
    borderRadius:10,
    margin: 5,
    width: WIDTH-40,
   
  },
  TextBtn: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center'
  },
  uploadBtnContainer: {
    height: 125,
    width: 125,
    borderRadius: 125 / 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderStyle: 'dashed',
    borderWidth: 1,
  marginTop: -60,
 overflow: 'hidden',
 marginRight:15
  },
  uploadBtn: {
    textAlign: 'center',
    fontSize: 16,
    opacity: 0.3,
    fontWeight: 'bold',
  },
  mapp: {
    alignSelf: 'stretch', 
    height: 250,
    width: 300,
   
  },
  containers: {
    flex: 1,
    backgroundColor: "white",
  },
  skip: {
    textAlign: 'center',
    padding: 10,
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 2,
    opacity: 0.5,
  },
  containerr: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ac : {
    width: 10,
  height: 50,
  flexDirection: "row",
 
   
    
  },
  emailInput:{
    
  
  }
});