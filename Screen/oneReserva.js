import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, Text, View, ImageBackground, ScrollView, SafeAreaView, Image, TextInput, TouchableOpacity , Dimensions } from 'react-native';


import { DataTable } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons'; 
const { width: WIDTH } = Dimensions.get('window')
import Toast from 'react-native-toast-message';
const {height:HEIGHT} =Dimensions.get('window')
export default function OnrReservation({ route, navigation }) {
    const { itemId, getReservations} = route.params;

    useEffect(async () => {
      console.log(getReservations._id)
      getS()
    }, []); 
    
    const getS = async() => {
    
      const data =await getUserData();
    
       await fetch("http://192.168.43.230:3001/reservation/getByS/"+data.data.station._id
    )
        .then((res) => res.json())
        .then((resJSON) => {
          console.warn(resJSON)
          
          setData(resJSON);
          
        
        })
        .catch((err) => console.error(err));
    
      }

    const[reservation , setReservation]=useState('')
    useEffect(async () => {
      
        if (getReservations) {
            setReservation(getReservations)
        }
        console.log(reservation._id)
      
    }, []);

    const Approuver = async (_id) => {

    
      
      fetch("http://192.168.43.230:3001/reservation/updateEtat/"+_id
   , {
          method: 'PUT',
        
          headers:{
              "Content-Type" : 'application/json',
              "Accept":'application/json'
             
          },
         
  
        
      }).then(res=>res.json())
      .then(async data=>{
    
       
        Toast.show({
          type: 'success',
         
          text1:'Succés',
          text2:'Réservation refusée avec succée ',
          autoHide: true,
          visibilityTime: 50000000000,
          autoHide: true,
          onHide: () =>{
                           
            navigation.navigate('Prix', {
             itemId: reservation._id,
             getReservationn: reservation,
           });
           },
          onShow: () =>{navigation.navigate('Prix', {
            itemId: reservation._id,
            getReservationn: reservation,
          })},
        })  
    
     
      })
      .catch(err=>{
        Toast.show({
          type: 'error',
          text1:'Echec',
          text2:'Echec de refus',
          visibilityTime: 1000,
          position: 'top',
        })  
        console.log(err)
      });
    }
  
  
  
   // aprouve2
   const Approuver1 = async (_id) => {
  
      
        
    fetch("http://192.168.43.230:3001/reservation/updateEtatRefuse/"+_id
  , {
        method: 'PUT',
      
        headers:{
            "Content-Type" : 'application/json',
            "Accept":'application/json'
           
        },
       
  
      
    }).then(res=>res.json())
    .then(async data=>{
     
     
        Toast.show({
          type: 'success',
         
          text1:'Succés',
          text2:'Réservation refusée avec succée',
          autoHide: true,
          visibilityTime: 50000000000,
          autoHide: true,
          onHide: () =>{ navigation.navigate('Dashboard') },
          onShow: () =>{},
        })  
    
        getS()
  
 
  
   
    })
    .catch(err=>{
      Toast.show({
        type: 'error',
        text1:'Echec',
        text2:'Echec de refus',
        visibilityTime: 1000,
        position: 'top',
      })  
      console.log(err)
    });
  }
  
   
  
    
    return (

        <SafeAreaView style={{backgroundColor:'white' ,height:HEIGHT,}}>
            <ScrollView >
            <Toast ref={(ref)=>{Toast.setRef(ref)}}/>    
            <Text style={{color:'black' , fontWeight:'bold' , fontSize:19 , alignSelf:'center' ,marginTop:110  , marginBottom:50}}>Informations de la réservation</Text>
           
           <Text style={{fontWeight:'bold' , alignSelf:'center' , marginTop:40}}> {reservation.etat == "confirme"? (
                            <Text style={{color:'green'}}> Accepter</Text>
                         
                        ) : reservation.etat == "attente" ? (
                         
                            <Text style={{color:'blue'}}>En Attente...</Text>
                         
                        ) : (<Text style={{color:'red'}}>refuser</Text>)}</Text>
                <View style={styles.container}>
        <DataTable>
        <DataTable.Header>
        <DataTable.Cell style={{fontSize:20}}><Ionicons
              name="person"
              size={20}
              color="#427CA2"
              
            />    Nom client</DataTable.Cell>
            <DataTable.Title style={{width:WIDTH/2 , marginLeft:40}}>{reservation.Nom_client}</DataTable.Title>
      
            
             
             </DataTable.Header>
    
             <DataTable.Header>
        <DataTable.Cell ><Ionicons
              name="person"
              size={20}
              color="#427CA2"
            
            />    Prenom </DataTable.Cell>
            <DataTable.Title style={{width:WIDTH/2 , marginLeft:40}}>{reservation.Prenom_client}</DataTable.Title>
      
            
             
             </DataTable.Header>
    
          {/*<DataTable.Row>
            <DataTable.Cell>Numéro du téléphone</DataTable.Cell>
            <DataTable.Cell>{reservation.Num_Client}</DataTable.Cell>
           
        </DataTable.Row>*/}
    
    
    
             <DataTable.Header>
        <DataTable.Cell style={{fontSize:20}}><Ionicons
              name="car"
              size={22}
              color="#427CA2"
              style={{marginRight: 10}}
            />    Nature</DataTable.Cell>
            <DataTable.Title style={{width:WIDTH/2 , marginLeft:40}}>{reservation.Nature_vehicule}</DataTable.Title>
      
            
             
             </DataTable.Header>
          <DataTable.Header>
           
            <DataTable.Title style={{width:WIDTH/2 , marginLeft:40}}>          {reservation.date_heure}</DataTable.Title>
          
          </DataTable.Header>
        
          <DataTable.Header>
            <DataTable.Cell>    Action</DataTable.Cell>
            <DataTable.Title  style={{width:WIDTH/2 , marginLeft:80 }}>
               <TouchableOpacity onPress={() => { Approuver(reservation._id)}} >
                 <AntDesign name="checkcircle"  size={27} color="#22780F"  />     
                </TouchableOpacity>
                </DataTable.Title>
                <DataTable.Title>         
                <TouchableOpacity onPress={() => { Approuver1(reservation._id)}}>  
                                  
                                   <MaterialIcons name='delete'size= {30} color='#D90115'   />  
                </TouchableOpacity>
                          
              </DataTable.Title>
          
          </DataTable.Header>
    
        </DataTable>
      </View>
                   
                    
               
                
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 20,
      
      },
   
   f:{
      fontStyle:'italic',
      color:'red'
   }
   
   

});