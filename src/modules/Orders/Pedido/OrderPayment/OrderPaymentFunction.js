import React, { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet, View, Text, ScrollView, Alert, TouchableOpacity, TextInput } from "react-native";
import ListAdressesViewFunction from '../ListAdresses/ListAdressesViewFunction'
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import Button from '../../../../components/Button';
import SelectDropdown from 'react-native-select-dropdown'
import Icon from 'react-native-vector-icons/FontAwesome';
import CheckBox from '@react-native-community/checkbox';


const OrderPaymentFunction = (props) =>{
  const [paymentsMethods, setPaymentsMethods] = useState([])
  const [paymentMethod, setPaymentMethod] = useState("")

  const [cpfNota, setCpfNota] = useState("");
  useEffect(() => {

    setPaymentsMethods([])
    axios.post("https://tcc-busy-backend.herokuapp.com/payment/list-payment-methods", {
      cpf: props.cpf
    }).then(response => {
      console.log("222", response.data, response.data.length)
      for (let i = 0; i < response.data.length; i++) {
        console.log("response.data[i].tipoServico333", response.data[i])
        setPaymentsMethods(paymentsMethods => [...paymentsMethods, response.data[i]]);

      }
      console.log("tipoServicoPrestacaoSelect444", paymentsMethods)

    }).catch(error => {
      console.log(error)
      Alert.alert("Erro ao consultar tipos de serviços")

    })
  },
    [])


    setPropsPayment = () =>{
      console.log("stprospay")
      props.payment(paymentMethod, cpfNota);
    }
  
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ padding: 10 }}
    >
      <SafeAreaView>


        <Text style={{ fontFamily: 'CaviarDreams', fontSize: 15, marginTop: 40 }}>Forma de Pamento</Text>

        <SelectDropdown
          data={paymentsMethods}
          // defaultValueByIndex={1}
          // defaultValue={'Egypt'}
          onSelect={(selectedItem, index) => {
            console.log(selectedItem.id)
            setPaymentMethod(selectedItem.id)

          }}
          defaultButtonText={'Selecione Pagamento'}
          buttonTextAfterSelection={(selectedItem, index) => {
            return <Text>Cartão Crédito           *** {selectedItem.last4}</Text>;
          }}
          rowTextForSelection={(item, index) => {
            return <Text>Cartão Crédito           *** {item.last4}</Text>;
          }}
          buttonStyle={styles.dropdown1BtnStyle}
          buttonTextStyle={styles.dropdown1BtnTxtStyle}
          renderDropdownIcon={isOpened => {
            return;
          }}
          dropdownIconPosition={'right'}
          dropdownStyle={styles.dropdown1DropdownStyle}
          rowStyle={styles.dropdown1RowStyle}
          rowTextStyle={styles.dropdown1RowTxtStyle}
        />

        <Text style={{ fontFamily: 'CaviarDreams', fontSize: 15, marginTop: 40 }}>CPF na Nota?</Text>
      
        <TextInput
          style={styles.inputObservacao}
          onChangeText={setCpfNota}
          editable
          maxLength={16}
          placeholder="CPF na Nota"
          value={cpfNota}
        />
        <Button
          style={[styles.demoButton, { flexBasis: '100%' }]}
          primary
          disabled
          caption="Finalizar Compra"
          onPress={() => setPropsPayment()}
        />


      </SafeAreaView>
    </ScrollView>
  );
};

export default OrderPaymentFunction;

const styles = StyleSheet.create({
  container: {



  },
  icon: {
    marginLeft: 10,
  },
  input: {
    height: 20,
    marginTop: 10,
    marginBottom: 10,
    margin: 0,
    borderWidth: 1,
    borderColor: 'white',
    padding: 10,
    backgroundColor: 'white'
  },
  
  inputObservacao: {
    height: 50,
    marginTop: 10,
    marginBottom: 10,
    margin: 0,
    borderWidth: 1,
    borderColor: 'white',
    padding: 10,
    backgroundColor: 'white'
  },
  demoButton: {

    marginTop: 8,
    marginBottom: 8,
  },
  dropdownButtonText: {
    flex: 1,
    fontSize: 18,
    color: "#FF0049",
    textAlign: "center",
    marginHorizontal: 8,
  },

  dropdown1BtnStyle: {
    width: '100%',
    height: 50,
    backgroundColor: '#FFFFFF',
    marginBottom: 10,
    borderRadius: 0,
    borderWidth: 1,
    borderColor: '#DEDEDE',
  },
  dropdown1BtnTxtStyle: { color: '#8E8E8E', textAlign: 'center', fontSize: 14 },
  dropdown1DropdownStyle: { backgroundColor: '#EFEFEF' },
  dropdown1RowStyle: { backgroundColor: '#EFEFEF', borderBottomColor: '#DEDEDE' },
  dropdown1RowTxtStyle: { color: '#707070', textAlign: 'center' },

});
