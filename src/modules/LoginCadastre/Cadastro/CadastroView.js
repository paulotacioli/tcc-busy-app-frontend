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



export function CadastroScreen(props) {
    const [mensagemErro, setMensagemErro] = useState(null);
    const [mensagemSucesso, setMensagemSucesso] = useState(null);
    const [carregando, setCarregando] = useState(false);
    const [nome, setNome] = useState('');
    const [celular, setCelular] = useState('');
    const [email, setEmail] = useState('');
    const [cpf, setCpf] = useState('');
    const [senha, setSenha] = useState('');
    const [senhaConfirmacao, setSenhaConfirmacao] = useState('');
    const navigation = useNavigation();

    cadastrar = async (cpf, senha, nome, email, celular, senhaConfirmacao) => {
        setMensagemErro(null);
        setMensagemSucesso(null)
        setCarregando(true)

        setMensagemErro(null)
        if (nome == '' || nome == null) {

            setMensagemErro("Nome deve ser informado!")
            return true;
        } else if (celular == '' || celular == null) {

            setMensagemErro("Celular deve ser informado!")
            return true;

        } else if (email == '' || email == null) {

            setMensagemErro("Email deve ser informado!")
            return true;

        } else if (cpf == '' || cpf == null) {

            setMensagemErro("CPF deve ser informado!")
            return true;
        } else if (senha == '' || senha == null) {

            setMensagemErro("Senha deve ser informada!")
            return true;

        } else if (senhaConfirmacao == '' || senhaConfirmacao == null) {

            setMensagemErro("A confimação de senha deve ser informada!")
            return true;

        } else {


            await axios.post("https://engenharia-gestao-hospitalar.herokuapp.com/usuario", {
                cpf: cpf.replace(".", "").replace(".", "").replace(".", "").replace("-", ""),
                senha: senha,
                email: email,
                senhaConfirm: senhaConfirmacao,
                celular: celular,
                aprovado: 2,
                hierarquia: 0,
                nomeCompleto: nome
            }).then(response => {
                try {

                    setMensagemSucesso("Cadastrado com sucesso!")

                } catch (error) {
                    setCarregando(false)

                }


            }).catch(error => {

                setMensagemErro(error.response.data.error)

            })

        }


    }


    redirecionar = () => {
        setCarregando(false)

        navigation.navigate('Login')

    }

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={{ paddingBottom: 20 }}
        >

            <View style={styles.equipamentoSection}>
                <Text style={styles.equipamentoectionHeader}>Cadastre-se</Text>




                <View style={styles.demoButtonsContainer}>
                    <TextInput
                        placeholderTextColor={'gray'}
                        style={styles.inputField}
                        placeholder={'NOME'}
                        value={nome}
                        autoFocus={true}
                        onChangeText={text => setNome(text)}
                    />
                    <TextInputMask
                        placeholderTextColor={'gray'}
                        style={styles.inputField}
                        placeholder={'CELULAR'}
                        type={'cel-phone'}
                        value={celular}
                        onChangeText={text => setCelular(text)}
                    />
                    <TextInput
                        placeholderTextColor={'gray'}
                        style={styles.inputField}
                        placeholder={'EMAIL'}
                        value={email}
                        onChangeText={text => setEmail(text)}
                    />
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
                        onChangeText={text => setSenha(text)}
                    />
                    <TextInput
                        placeholderTextColor={'gray'}
                        style={styles.inputField}
                        secureTextEntry={true}
                        placeholder={'CONFIRMAÇÃO DE SENHA'}
                        value={senhaConfirmacao}
                        onChangeText={text => setSenhaConfirmacao(text)}
                    />

                    <Text style={styles.mensagemDeErroField}>{mensagemErro}</Text>

                    <Text style={styles.mensagemDeSucessoField}>{mensagemSucesso}</Text>

                    <View style={styles.botoes}>
                        <Button
                            style={[styles.demoButton, { flexBasis: '47%' }]}
                            primary
                            rounded
                            caption="Cadastre-se"
                            onPress={() => { cadastrar(cpf, senha, nome, email, celular, senhaConfirmacao) }}
                        />
                        <Button
                            style={[styles.demoButton, { flexBasis: '47%' }]}
                            secondary
                            rounded
                            caption="Login"
                            onPress={() => navigation.navigate('Login')}
                        />
                    </View>


                </View>
            </View>



        </ScrollView>
    );
} export default () => (
    <AuthConsumer>
        { (context) => (<CadastroScreen iniciarSessao={context.iniciarSessao} />)}
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
    mensagemDeSucessoField: {
        color: 'green',
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
