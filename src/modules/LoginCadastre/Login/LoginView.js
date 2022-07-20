import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native';
import { AuthConsumer } from '../../../Autentication/ProvedorAutenticacao';

import { colors, fonts } from '../../../styles';

import { Button, RadioGroup, Dropdown, TextInput, } from '../../../components';
import { TextInputMask } from 'react-native-masked-text'
import { componentFromStream } from 'recompose';

import { StackActions, NavigationActions, CommonActions } from '@react-navigation/native';
import messaging from '@react-native-firebase/messaging';


export function LoginScreen(props) {
    const [mensagemErro, setMensagemErro] = useState(null);
    const [carregando, setCarregando] = useState(false);

    const navigation = useNavigation();

    //Essa função é responsável por pegar o token FCM do celular gerado pelo firebase e colocar no banco de dados pessoal, para identificação 
    //de usuários por FCM.
    cadastrarToken = async (cpf) => {

        try {
            // Ignore all that permission request stuff. You need to do it but it is UNRELATED to tokens.
            // Handle your permissions separately. Ideally with react-native-permissions

            // From the example https://rnfirebase.io/messaging/server-integration#saving-tokens
            const token = await messaging().getToken();

            //Atualiza o banco de dados com o token e usuario
            await axios.post(`https://tcc-busy-backend.herokuapp.com/notificacao-firebase`, {
                usuario: cpf.replace(".", "").replace(".", "").replace(".", "").replace("-", ""),
                chaveFirebase: token
            })
                .then(response => {

                }).catch(error => {
                    setMensagemErro(error)
                })

            // Listen to whether the token changes
            let tokenRefreshListenerUnsubscriber = messaging().onTokenRefresh(token => {
                 axios.post(`https://tcc-busy-backend.herokuapp.com/notificacao-firebase`, {
                    usuario: cpf.replace(".", "").replace(".", "").replace(".", "").replace("-", ""),
                    chaveFirebase: token
                })
                    .then(response => {

                    }).catch(error => {
                        setMensagemErro(error)
                    })

            });
        } catch (e) {
            console.error('token registration failed?', e);
        }
    }

    // consultarAutorizacoes = async (cpf, token) => {
    //     await axios.get(`https://tcc-busy-backend.herokuapp.com/usuario/${cpf.replace(".", "").replace(".", "").replace(".", "").replace("-", "")}`)
    //         .then(response => {
    //             if (response.data.aprovado == 2) {
    //                 try {

    //                     AsyncStorage.setItem('app-token', token)
    //                     props.iniciarSessao()
    //                     this.cadastrarToken(cpf)
    //                     this.redirecionar()

    //                     setCarregando(false)
    //                 } catch (error) {
    //                     setMensagemErro("Erro ao definir token. Caso erro persista contate a equipe de TI.")
    //                     setCarregando(false)
    //                 }
    //             } else {
    //                 setMensagemErro("Seu perfil é de adminstrador, acesse o sistema apenas pelo browser.")
    //                 setCarregando(false)
    //             }
    //         }).catch(error => {
    //             setMensagemErro(error.response.data.error)
    //             setCarregando(false)
    //         })

    // }


    entrar = async (cpf, senha) => {
        setCarregando(true)
        setMensagemErro(null)

        if (cpf == '' || cpf == null) {

            setMensagemErro("CPF deve ser informado!")
            return true;
        } else if (senha == '' || senha == null) {

            setMensagemErro("Senha deve ser informada!")
            return true;
        } else {

            await axios.post("https://tcc-busy-backend.herokuapp.com/authenticate", {
                cpf: cpf.replace(".", "").replace(".", "").replace(".", "").replace("-", ""),
                senha: senha,
            }).then(response => {
                // consultarAutorizacoes(cpf, response.data.token).then(result => {
                // }).catch(error => { });
                    AsyncStorage.setItem('app-token', response.data.token)
                    props.iniciarSessao()
                    this.cadastrarToken(cpf.replace(".", "").replace(".", "").replace(".", "").replace("-", ""))
                    this.redirecionar()

                    setCarregando(false)

            }).catch(error => {
                setMensagemErro(error)

            })

        }


    }


    redirecionar = () => {
        setCarregando(false)
        navigation.navigate('Pedido')

    }

    const [cpf, setCpf] = useState('');
    const [senha, setSenha] = useState('');

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={{ paddingBottom: 20 }}
        >

            <View style={styles.equipamentoSection}>
                <Text style={styles.equipamentoectionHeader}>Login</Text>




                <View style={styles.demoButtonsContainer}>

                    <TextInputMask
                        placeholderTextColor={'gray'}
                        style={styles.inputField}
                        placeholder={'CPF'}
                        type={'cpf'}
                        value={cpf}
                        onChangeText={text => setCpf(text)}
                    />
                    <TextInput
                        placeholderTextColor={'gray'}
                        style={styles.inputField}
                        secureTextEntry={true}
                        placeholder={'SENHA'}
                        value={senha}
                        autoFocus={true}
                        onChangeText={text => setSenha(text)}
                    />

                    <Text style={styles.mensagemDeErroField}>{mensagemErro}</Text>

                    <View style={styles.botoes}>
                        <Button
                            style={[styles.demoButton, { flexBasis: '47%' }]}
                            primary
                            rounded
                            caption="Entre"
                            onPress={() => { entrar(cpf, senha) }}
                        />
                        <Button
                            style={[styles.demoButton, { flexBasis: '47%' }]}
                            secondary
                            rounded
                            caption="Cadastre"
                            onPress={() => navigation.navigate('Cadastro')}
                        />
                    </View>


                </View>
            </View>



        </ScrollView>
    );
} export default () => (
    <AuthConsumer>
        {(context) => (<LoginScreen iniciarSessao={context.iniciarSessao} />)}
    </AuthConsumer>

)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.bluish,
        paddingHorizontal: 15,
        paddingTop: 20,
    },
    inputContainer: {
        borderLeftWidth: 4,
        borderRightWidth: 4,
        height: 70
    },
    botoes: {
        marginTop: 50,
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    input: {
        height: 70,
        backgroundColor: '#ffffff',
        paddingLeft: 15,
        paddingRight: 15,
    },
    mensagemDeErroField: {
        color: 'red',
        marginTop: 30,
        justifyContent: 'space-between',
        textAlign: 'center',


    },
    equipamentoSection: {
        backgroundColor: colors.white,
        paddingHorizontal: 16,
        paddingVertical: 24,
        marginBottom: 20,
        borderRadius: 5,
    },
    inputField: {
        borderBottomWidth: 0.5,
        width: '100%',
        borderBottomColor: 'gray',
        textAlign: 'center',
        color: 'black',
        // placeholderTextColor: 'gray',
        marginTop: 10,
    },
    inputFieldErro: {
        borderBottomWidth: 1,
        width: '100%',
        borderBottomColor: 'red',
        textAlign: 'center',
        color: 'red',
        // placeholderTextColor: 'gray',
        marginTop: 10,
    },
    mensagemErro: {
        color: 'red',
        marginTop: '2',
        marginBottom: '2',
    },
    equipamentoectionHeader: {
        fontFamily: fonts.primaryRegular,
        color: '#686868',
        textAlign: 'center',
        fontSize: 24,
        marginBottom: 20,
    },
    demoButtonsContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    demoIconsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 3,
        marginBottom: 20,
    },
    demoButton: {
        marginTop: 8,
        marginBottom: 8,
    },
    demoItem: {
        marginVertical: 15,
    },
});
