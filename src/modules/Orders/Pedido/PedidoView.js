import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, Alert } from 'react-native';
import { useRoute } from '@react-navigation/native';
import axios from 'axios';
import { colors, fonts } from '../../../styles';
import { AuthConsumer } from '../../../Autentication/ProvedorAutenticacao';
import { useNavigation } from '@react-navigation/native';
import MapViewFunction from './Map/MapViewFunction';
import AsyncStorage from '@react-native-community/async-storage';
import { showMessage, hideMessage } from "react-native-flash-message";

import HeaderViewFunction from './Header/HeaderViewFunction';
import SearchAdressOrderFunction from './SearchAdressOrder/SearchAdressOrderViewFunction';
import FormOrderFunction from './FormOrder/FormOrderFunction';
import FormOrderApproveFunction from './FormOrderApprove/FormOrderApproveFunction';
import OrderPaymentFunction from './OrderPayment/OrderPaymentFunction';

export function PedidoScreen(props) {
    const route = useRoute();
    //Variaveis de controle de esteira de criação de order
    const [formOpened, setFormOpened] = useState(false); //default is false
    const [formApproveOpened, setFormApproveOpened] = useState(false); //default is false
    const [orderPaymentOpened, setOrderPaymentOpened] = useState(false)  //default is false
    const [headerOpened, setHeaderOpened] = useState(0) //default is 0

    //Variavies de controle de Mapa da esteira de criação de order
    const [markerReady, setMarkerReady] = useState(false);
    const [coordenates, setCoordenates] = useState();

    //Variaveis de controle de cálculo de preço e controle de ID da esteira de order
    const [orderCalculated, setOrderCalculated] = useState(0);
    const [id, setId] = useState("");
    const [order, setOrder] = useState([
    //     {
    //     "destino": "R. Ibiuna, 352 - Bosque dos EucaliptosSão José dos Campos - SP, 12233-500",
    //     "ordem": 1,
    //     "tipoAtividadeRetiradaPrestacao": "Retirar um Item",
    //     "nomeContatoRetirada": "Maria Lucia Pereira",
    //     "observacaoRetirada": "Retirar item"
    // },

    // {
    //     "destino": "Vale Sul Shopping, Av. Andrômeda, 227 - Jardim Satélite, São José dos Campos - SP, 12230-000",
    //     "ordem": 2,
    //     "tipoAtividadeRetiradaPrestacao": "Prestacao",
    //     "nomeContatoRetirada": "Maria Lucia Pereira",
    //     "observacaoPrestacao": "Prestar um serviço com o objeto que foi retirado e que vai ser descrito aqui",
    //     "tipoServicoPrestacao": "Levar Item no Correio"
    // }
    ]) //default is []
    const navigation = useNavigation();

    const pullCoordanates = (data) => {
        setCoordenates(data)
        setMarkerReady(true)
    }

    const pullPayment = (payment, cpf) =>{
        console.log("pullpayments", payment, id)
        if (payment == null || payment == ""){
            showMessage({
                message: "Escolha uma forma de pagamento!",
                description: "Para realizar um pedido você deve realizar escolher uma forma de pagamento.",
                type: "danger",
                backgroundColor: "red", // background color
                color: "white", // text color
              });
        } else {

        
        axios.post("https://tcc-busy-backend.herokuapp.com/order/procurar-alocacao", {
            id: id,
            card:payment,
        })
            .then(response => {
                setFormOpened(false); //default is false
                setFormApproveOpened(false); //default is false
                setOrderPaymentOpened(false)  //default is false
                setHeaderOpened(0) //default is 0
                setMarkerReady(false);
                setCoordenates();
                setOrderCalculated(0);
                setId("");
                setOrder([]);
                showMessage({
                    message: "Pedido Criado com Sucesso!",
                    type: "success",
                  });
                navigation.navigate('Pedidos', { "codigo": props.user })


             
            }).catch(error => {
                console.log(error)
                showMessage({
                    message: "Erro ao cadastrar o pedido.",
                    description: "Ocorreu um erro ao cadastrar o pedido. Verifique os dados do pedido e tente novamente.",
                    type: "danger",
                    backgroundColor: "red", // background color
                    color: "white", // text color
                  });

            })
        }
    }

    const pullApproved = () => {
        setFormApproveOpened(false)
        setOrderPaymentOpened(true)
        setHeaderOpened(4)
    }

    const pullAdressWithComplement = (data) => {
        const newOrder = {
            "destino": data,
            "ordem": order.length + 1,
            "tipoAtividadeRetiradaPrestacao": "",
            "nomeContatoRetirada": "",
            "observacaoRetirada": "",
            "observacaoPrestacao": "",
            "tipoServicoPrestacao": "",
        }

        setOrder(order => [...order, newOrder]);
        setFormOpened(true)
        setHeaderOpened(3)

    }

    const pullAdressForm = (tipoAtividadeRetiradaPrestacao, nomeContatoRetirada, observacaoRetirada, observacaoPrestacao, tipoServicoPrestacao, finalize) => {
        let updateOrder = [...order]; // copying the old datas array
        updateOrder[order.length - 1].tipoAtividadeRetiradaPrestacao = tipoAtividadeRetiradaPrestacao; // replace e.target.value with whatever you want to change it to
        updateOrder[order.length - 1].nomeContatoRetirada = nomeContatoRetirada;
        updateOrder[order.length - 1].observacaoRetirada = observacaoRetirada;
        updateOrder[order.length - 1].observacaoPrestacao = observacaoPrestacao;
        updateOrder[order.length - 1].tipoServicoPrestacao = tipoServicoPrestacao;
        setOrder(updateOrder);

        {
            finalize ?
                axios.post("https://tcc-busy-backend.herokuapp.com/order", {
                    "usuario": {
                        "cpf": props.user
                    },
                    destino: order
                })

                    .then(response => {
                        
                        setHeaderOpened(0);
                        setFormApproveOpened(true);
                        setOrderCalculated(response.data.precoServico)
                        setId(response.data.id)

                        setFormOpened(true);
                    }).catch(error => {
                        console.log(error)
                        Alert.alert("Erro ao cadastrar a ordem: " + error)

                    })
                :

                setFormOpened(false);
            setHeaderOpened(1)
        }


    }

    return (
        <>
            {!formOpened && !formApproveOpened && !orderPaymentOpened ?
                <View style={styles.containerMap}>
                    <MapViewFunction coordenates={coordenates} markerReady={markerReady}></MapViewFunction>
                </View>
                : false}
            <View style={styles.containerHeader}>
                <HeaderViewFunction order={order} opened={headerOpened} preco={orderCalculated}></HeaderViewFunction>
            </View>
            {!formOpened && !formApproveOpened && !orderPaymentOpened ?
                <View style={styles.containerSearch}>
                    <SearchAdressOrderFunction coordenates={pullCoordanates} adressWithComplement={pullAdressWithComplement}></SearchAdressOrderFunction>
                </View>
                : !formApproveOpened && !orderPaymentOpened ?
                    <View style={styles.containerForm}>
                        <FormOrderFunction form={pullAdressForm}></FormOrderFunction>
                    </View> : false
            }
            {formApproveOpened ?
                <View style={styles.containerForm}>
                    <FormOrderApproveFunction approved={pullApproved}></FormOrderApproveFunction>
                </View>
                : false}
            {orderPaymentOpened ?
                <View style={styles.containerForm}>
                    <OrderPaymentFunction payment={pullPayment} cpf={props.user}></OrderPaymentFunction>
                </View>
                : false}
        </>

    );
}
export default () => (
    <AuthConsumer>
        {(context) => (<PedidoScreen user={context.user.cpf} />)}
    </AuthConsumer>

)
const styles = StyleSheet.create({
    containerMap: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    containerHeader: {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 100,
    },
    containerSearch: {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 100,
    },
    containerForm: {

        zIndex: 100,

    },
});
