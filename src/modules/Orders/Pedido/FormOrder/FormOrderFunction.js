import React, { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet, TextInput, Text, ScrollView, Alert } from "react-native";
import ListAdressesViewFunction from '../ListAdresses/ListAdressesViewFunction'
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import Button from '../../../../components/Button';
import SelectDropdown from 'react-native-select-dropdown'
import Icon from 'react-native-vector-icons/FontAwesome';
import { showMessage, hideMessage } from "react-native-flash-message";


const FormOrderFunction = (props) => {
  const [tipoAtividadeRetiradaPrestacao, setTipoAtividadeRetiradaPrestacao] = useState("");
  const [nomeContatoRetirada, setNomeContatoRetirada] = useState("");
  const [observacaoRetirada, setObservacaoRetirada] = useState("");
  const [observacaoPrestacao, setObservacaoPrestacao] = useState("");
  const [tipoServicoPrestacao, setTipoServicoPrestacao] = useState("");
  const [tipoServicoPrestacaoSelect, setTipoServicoPrestacaoSelect] = useState([]);

  const tipoAtividadeRetiradaPrestacaoSelect = ["Retirar um Item", "Prestação de Serviço"]

  useEffect(() => {
    setTipoServicoPrestacaoSelect([])
    axios.get("https://tcc-busy-backend.herokuapp.com/tipos-servicos/select").then(response => {
      console.log("sucesso", response.data, response.data.length)
      for (let i = 0; i < response.data.length; i++) {
        console.log("response.data[i].tipoServico", response.data[i].tipoServico)
        setTipoServicoPrestacaoSelect(tipoServicoPrestacaoSelect => [...tipoServicoPrestacaoSelect, response.data[i].tipoServico]);

      }
      console.log("tipoServicoPrestacaoSelect", tipoServicoPrestacaoSelect)

    }).catch(error => {
      Alert.alert("Erro ao consultar tipos de serviços")

    })
  },
    [])

  alterarSelect = (selectedItem) =>{
    setNomeContatoRetirada("")
    setObservacaoRetirada("")
    setObservacaoPrestacao("")
    setTipoServicoPrestacao("")
    setTipoAtividadeRetiradaPrestacao(selectedItem)

  }
  sendForm = (finalize) => {
    if (tipoAtividadeRetiradaPrestacao == ""){
      showMessage({
          message: "Escolha o Tipo de Atividade a ser Realizada no Endereço Escolhido!",
          description: "Para realizar um pedido você deve informar qual tipo de atividade vai ser realizada no endereço escolhido.",
          type: "warning",
          duration: 3500,

        });
  } else if (tipoAtividadeRetiradaPrestacao == "Prestação de Serviço" && tipoServicoPrestacao=="" ){
    showMessage({
        message: "Escolha o tipo de atividade que vai ser realizada.",
        description: "É necessário informar o tipo de prestação que sera realizada.",
        type: "warning",
        duration: 3500,
      });
    } else if (tipoAtividadeRetiradaPrestacao == "Prestação de Serviço" && observacaoPrestacao=="" ){
      showMessage({
          message: "Escreva os detalhes do serviço que vai ser prestado.",
          description: "É necessário informar detalhes para o prestador do serviço a ser realizado.",
          type: "warning",
          duration: 3500,
  
        });
      } else if (tipoAtividadeRetiradaPrestacao == "Retirar um Item" && observacaoRetirada=="" ){
        showMessage({
            message: "Escreva os detalhes do item que vai ser retirado nesse endereço.",
            description: "É necessário informar os detalhes do item que vai ser retirado.",
            type: "warning",
            duration: 3500,
          });
        } else if (tipoAtividadeRetiradaPrestacao == "Retirar um Item" && nomeContatoRetirada=="" ){
          showMessage({
              message: "Escreva o nome da pessoa a contatar para retirar ou entregar o item.",
              description: "Essa informação é necessária para criação do pedido.",
              type: "warning",
              duration: 3500,
            });
        } else {

    
    props.form(tipoAtividadeRetiradaPrestacao, nomeContatoRetirada, observacaoRetirada,observacaoPrestacao,tipoServicoPrestacao, finalize)
    // tipoAtividadeRetiradaPrestacao, nomeContatoRetirada, observacaoRetirada, observacaoPrestacao, tipoServicoPrestacao , finalize
  }
  }



  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ padding: 10 }}
    >
      <SafeAreaView>
        <SelectDropdown
          data={tipoAtividadeRetiradaPrestacaoSelect}
          // defaultValueByIndex={1}
          // defaultValue={'Egypt'}
          onSelect={(selectedItem, index) => {
            alterarSelect(selectedItem)

          }}
          defaultButtonText={'Selecione Atividade do Local'}
          buttonTextAfterSelection={(selectedItem, index) => {
            return selectedItem;
          }}
          rowTextForSelection={(item, index) => {
            return item;
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

        {tipoAtividadeRetiradaPrestacao == "Retirar um Item" ?
          <>

<TextInput
              style={styles.inputNome}
              multiline={true}
              numberOfLines={4}
              onChangeText={setNomeContatoRetirada}
              placeholder="Nome da pessoa a contatar"
              value={nomeContatoRetirada}
            />

            <TextInput
              style={styles.inputObservacao}
              multiline={true}
              numberOfLines={12}
              onChangeText={setObservacaoRetirada}
              editable
              maxLength={200}
              placeholder="Escreva qual o item que o prestador deve retirar nesse endereço. 
              Exemplo: Retirar o atestado na minha casa."
              value={observacaoRetirada}
            />


          </>
          : tipoAtividadeRetiradaPrestacao == "Prestação de Serviço" ? <>
            <SelectDropdown
              data={tipoServicoPrestacaoSelect}
              // defaultValueByIndex={1}
              // defaultValue={'Egypt'}
              onSelect={(selectedItem, index) => {
                setTipoServicoPrestacao(selectedItem)
              }}
              defaultButtonText={'Selecione Atividade do Local'}
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem;
              }}
              rowTextForSelection={(item, index) => {
                return item;
              }}
              buttonStyle={styles.dropdown1BtnStyle}
              buttonTextStyle={styles.dropdown1BtnTxtStyle}
              renderDropdownIcon={isOpened => {
                return ;
              }}
              dropdownIconPosition={'right'}
              dropdownStyle={styles.dropdown1DropdownStyle}
              rowStyle={styles.dropdown1RowStyle}
              rowTextStyle={styles.dropdown1RowTxtStyle}
            />

            <TextInput
              style={styles.inputObservacao}
              multiline={true}
              numberOfLines={4}
              onChangeText={setObservacaoPrestacao}
              placeholder="Escreva qual o serviço que o prestador deve realizar nesse endereço. 
              Exemplo: Apresentar atestado na farmácia e comprar o remédio XXX "
              value={observacaoPrestacao}
            />


          </> : false}

        {tipoAtividadeRetiradaPrestacao != "" ?
          <>
            <Button
              style={[styles.demoButton, { flexBasis: '100%' }]}
              primary

              caption="Adicionar Mais Endereços"
              onPress={() => this.sendForm(false)}
            />
            <Button
              style={[styles.demoButton, { flexBasis: '100%' }]}
              secondary
              onPress={() => this.sendForm(true)}

              caption="Finalizar Pedido"
            /></>
          : false}


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
  inputNome: {
    height: 60,
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
    marginBottom:10,
    borderRadius: 0,
    borderWidth: 1,
    borderColor: '#DEDEDE',
  },
  dropdown1BtnTxtStyle: { color: '#8E8E8E', textAlign: 'center', fontSize: 14 },
  dropdown1DropdownStyle: { backgroundColor: '#EFEFEF' },
  dropdown1RowStyle: { backgroundColor: '#EFEFEF', borderBottomColor: '#DEDEDE' },
  dropdown1RowTxtStyle: { color: '#707070', textAlign: 'center' },

});

export default FormOrderFunction;