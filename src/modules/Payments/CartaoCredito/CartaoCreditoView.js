
import * as React from 'react';

import { StyleSheet, Alert, KeyboardAvoidingView, Text, Platform, View } from 'react-native';
import { useRoute } from '@react-navigation/native';
import CreditCard from 'react-native-credit-card-form-ui';
import axios from 'axios';
import { Button } from '../../../components';
import { colors, fonts } from '../../../styles';

import { showMessage, hideMessage } from "react-native-flash-message";


export default function CartaoCreditoScreen(props) {


  const creditCardRef = React.useRef();
  const route = useRoute();
  var codigo = route.params.codigo;
  const handleSubmit = React.useCallback(() => {
    if (creditCardRef.current) {
      const { error, data } = creditCardRef.current.submit();
      console.log('ERROR: ', error);
      // console.log('CARD DATA: ', data);


      if (!error) {
        axios.post("https://tcc-busy-backend.herokuapp.com/payment", {
          cpf: codigo,
          number: data.number,
          exp_month: data.expiration.split('/')[0],
          exp_year: data.expiration.split('/')[1],
          cvc: data.cvv,
        }).then(response => {
          showMessage({
            message: "Cartão Cadastrado com Sucesso!",
            type: "success",
                        // backgroundColor: "#7FFF00", // background color
            // color: "#000000", // text color
          });
          props.navigation.navigate('Pagamentos', { codigo })

        }).catch(error => {
          showMessage({
            message: "Erro ao cadastrar o cartão.",
            description: "Ocorreu um erro ao cadastrar o cartão. Verifique os dados informados do cartão e tente novamente.",
            type: "danger",
            backgroundColor: "red", // background color
            color: "white", // text color
          });
        })
      } else {
        console.log(error)
        console.log("erro", error)
        var erroSearch = JSON.stringify(error);
        var errorFormated = ["", ""];
        if (erroSearch.includes("Card number is invalid")) errorFormated = ["Número do cartão é inválido.", "Verifique o número do cartão e tente novamente."]
        if (erroSearch.includes("Card expiration is invalid")) errorFormated = ["Data de expiração do cartão inválida.", "Verifique a data de expiração do cartão e tente novamente."]
        if (erroSearch.includes("Holder Name is invalid")) errorFormated = ["Nome do Titular do cartão inválida.", "Verifique o nome do titular do cartão e tente novamente."]
        if (erroSearch.includes("errors occurred")) errorFormated = ["Existem campos não preenchidos no formulário do cartão.", "Verifique todos os campos do cartão e tente novamente."]
        if (erroSearch.includes("Card CVV is invalid")) errorFormated = ["Código CVC do cartão inválido.", "Verifique código CVC do cartão e tente novamente."]
        if (errorFormated[0] == "")  errorFormated = ["Ocorreu um erro não identificado.", "Reinicie o aplicativo e tente novamente."]
        

        showMessage({
          message: errorFormated[0],
          description: errorFormated[1],
          type: "danger",
          backgroundColor: "red", // background color
          color: "white", // text color
        });

      }

    }
  }, []);




  validationError = () => {

    console.log("validationError")

  }


  return (

    <>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={20}
        style={styles.container}>



        <CreditCard ref={creditCardRef} background={"#ADD8E6"} placeholderTextColor={"#FFFAF0"} />
        <View style={styles.containerBottom}>
          <Button
            style={[styles.demoButton, { flexBasis: '100%' }]}
            primary
            rounded
            caption="Adicionar Cartão"
            onPress={handleSubmit}
          />
        </View>
      </KeyboardAvoidingView>



    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',


  },

  containerBottom: {
    right: 10,
    left: 10,
    position: 'absolute',
    bottom: 10,
  },
  titleHeader: {
    fontFamily: fonts.primaryRegular,
    color: '#686868',
    marginRight: 10,
    marginLeft: 20,
    fontSize: 24,
    marginBottom: 20,
    marginTop: 20,
  },
});
