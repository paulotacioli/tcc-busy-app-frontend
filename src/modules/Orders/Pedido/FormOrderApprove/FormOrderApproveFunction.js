import React, { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet, View, Text, ScrollView, Alert, TouchableOpacity } from "react-native";
import ListAdressesViewFunction from '../ListAdresses/ListAdressesViewFunction'
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import Button from '../../../../components/Button';
import SelectDropdown from 'react-native-select-dropdown'
import Icon from 'react-native-vector-icons/FontAwesome';
import CheckBox from '@react-native-community/checkbox';


const FormOrderApproveFunction = (props) => {
  const [toggleCheckBox, setToggleCheckBox] = useState(false)
  
  sendApproved = (data) => {
    props.approved(data)
    // tipoAtividadeRetiradaPrestacao, nomeContatoRetirada, observacaoRetirada, observacaoPrestacao, tipoServicoPrestacao , finalize
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ padding: 10 }}
    >
      <SafeAreaView>
        <Text style={{ fontFamily: 'CaviarDreams', fontSize: 15, marginTop: 40 }}>As compras a serem realizadas para prestação do serviço serão informadas pelo prestador e comprovada via nota fiscal. Para finalização o valor deve ser aceito assim que informado pelo prestador. Você concorda com esses termos?</Text>

        <TouchableOpacity onPress={() => setToggleCheckBox(!toggleCheckBox)}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 40, marginBottom: 40 }}>
            <CheckBox
              disabled={false}
              value={toggleCheckBox}
              onValueChange={(newValue) => setToggleCheckBox(newValue)}
            />
            <Text style={{ fontWeight: 'bold' }}>Eu entendi e concordo com o termo acima.</Text>
          </View>
        </TouchableOpacity>

      {toggleCheckBox?
        <Button
          style={[styles.demoButton, { flexBasis: '100%' }]}
          primary
          disabled
          caption="Próximo"
          onPress={() => { this.sendApproved(true)}}
        />
        :false}

      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {



  },
  icon: {
    marginLeft: 10,
  },
  input: {
    height: 60,
    marginTop: 10,
    marginBottom: 10,
    margin: 0,
    borderWidth: 1,
    borderColor: 'white',
    padding: 10,
    backgroundColor: 'white'
  },
  inputObservacao: {
    height: 120,
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

export default FormOrderApproveFunction;