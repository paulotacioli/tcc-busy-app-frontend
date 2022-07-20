import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Entypo';
import { colors, fonts } from '../../styles';
import { useNavigationParam } from '@react-navigation/native';

import { Button, RadioGroup, Dropdown } from '../../components';

export default function InformacoesScreen(props) {
    const route = useRoute();
    const [usuario, setUsuario] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

     var codigo = route.params.codigo;

    useEffect(() => {
        async function fetchData() {

            const response = await fetch(`https://tcc-busy-backend.herokuapp.com/usuario/${codigo}`);
            const jsonData = await response.json()
            setUsuario(jsonData)
            setIsLoading(false)

        }
        fetchData();
    }, [codigo])


    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={{ paddingBottom: 20 }}
        >

            <View style={styles.equipamentoSection}>
                <Text style={styles.equipamentoectionHeader}>Informações</Text>


                <View style={styles.demoButtonsContainer}>
                    {isLoading ? false :
                        <Text size={30} bold white style={styles.title}>
                        Nome: {usuario.nomeCompleto ? usuario.nomeCompleto : "Não informado"} {"\n"}
                        CPF: {usuario.cpf ? usuario.cpf : "Não informado"} {"\n"}
                        CELULAR: {usuario.celular ? usuario.celular : "Não informado"} {"\n"}
                        EMAIL: {usuario.email ? usuario.email : "Não informado"} {"\n"}  {"\n"}


                        </Text>
                    }



                </View>
            </View>


            {/* <View style={styles.equipamentoSection}>
                <Text style={styles.equipamentoectionHeader}>Ações</Text>

                <View style={styles.demoButtonsContainer}>
                <Button
                            style={[styles.demoButton, { flexBasis: '100%' }]}
                            primary
                            rounded
                            caption="ATUALIZE CADASTRO"
                            onPress={() => {  props.navigation.navigate('Atualizar', { "codigo": codigo })
                        }}
                        />
                        <Button
                            style={[styles.demoButton, { flexBasis: '100%' }]}
                            secondary
                            rounded
                            caption="ATUALIZE SENHA"
                            onPress={() => {}}
                        />

                </View>
            </View> */}


            {/* <View style={styles.equipamentoSection}>
                <Text style={styles.equipamentoectionHeader}>Icons</Text>

                <View style={styles.demoIconsContainer}>
                    <Icon
                        style={styles.demoIcon}
                        name="basecamp"
                        size={25}
                        color="#5759CB"
                    />
                    <Icon style={styles.demoIcon} name="note" size={25} color="#5759CB" />
                    <Icon
                        style={styles.demoIcon}
                        name="flashlight"
                        size={25}
                        color="#5759CB"
                    />
                    <Icon
                        style={styles.demoIcon}
                        name="app-store"
                        size={25}
                        color="#5759CB"
                    />
                    <Icon
                        style={styles.demoIcon}
                        name="baidu"
                        size={25}
                        color="#5759CB"
                    />
                    <Icon
                        style={styles.demoIcon}
                        name="facebook"
                        size={25}
                        color="#5759CB"
                    />
                </View>
                <View style={styles.demoIconsContainer}>
                    <Icon
                        style={[styles.demoIcon, { opacity: 0.5 }]}
                        name="bookmark"
                        size={25}
                        color="#5759CB"
                    />
                    <Icon
                        style={[styles.demoIcon, { opacity: 0.5 }]}
                        name="chat"
                        size={25}
                        color="#5759CB"
                    />
                    <Icon
                        style={[styles.demoIcon, { opacity: 0.5 }]}
                        name="behance"
                        size={25}
                        color="#5759CB"
                    />
                    <Icon
                        style={[styles.demoIcon, { opacity: 0.5 }]}
                        name="calendar"
                        size={25}
                        color="#5759CB"
                    />
                    <Icon
                        style={[styles.demoIcon, { opacity: 0.5 }]}
                        name="camera"
                        size={25}
                        color="#5759CB"
                    />
                    <Icon
                        style={[styles.demoIcon, { opacity: 0.5 }]}
                        name="flattr"
                        size={25}
                        color="#5759CB"
                    />
                </View>
                <View style={styles.demoIconsContainer}>
                    <Icon
                        style={styles.demoIcon}
                        name="colours"
                        size={25}
                        color="#EF1F78"
                    />
                    <Icon
                        style={styles.demoIcon}
                        name="compass"
                        size={25}
                        color="#EF1F78"
                    />
                    <Icon
                        style={styles.demoIcon}
                        name="credit"
                        size={25}
                        color="#EF1F78"
                    />
                    <Icon
                        style={styles.demoIcon}
                        name="cycle"
                        size={25}
                        color="#EF1F78"
                    />
                    <Icon
                        style={styles.demoIcon}
                        name="database"
                        size={25}
                        color="#EF1F78"
                    />
                    <Icon
                        style={styles.demoIcon}
                        name="flickr"
                        size={25}
                        color="#EF1F78"
                    />
                </View>
                <View style={styles.demoIconsContainer}>
                    <Icon
                        style={[styles.demoIcon, { opacity: 0.5 }]}
                        name="documents"
                        size={25}
                        color="#EF1F78"
                    />
                    <Icon
                        style={[styles.demoIcon, { opacity: 0.5 }]}
                        name="download"
                        size={25}
                        color="#EF1F78"
                    />
                    <Icon
                        style={[styles.demoIcon, { opacity: 0.5 }]}
                        name="dribbble"
                        size={25}
                        color="#EF1F78"
                    />
                    <Icon
                        style={[styles.demoIcon, { opacity: 0.5 }]}
                        name="drop"
                        size={25}
                        color="#EF1F78"
                    />
                    <Icon
                        style={[styles.demoIcon, { opacity: 0.5 }]}
                        name="erase"
                        size={25}
                        color="#EF1F78"
                    />
                    <Icon
                        style={[styles.demoIcon, { opacity: 0.5 }]}
                        name="foursquare"
                        size={25}
                        color="#EF1F78"
                    />
                </View>

                <Button
                    style={[styles.demoButton, { flex: 1 }]}
                    primary
                    bordered
                    caption="More Icons"
                />
            </View>

            <View style={styles.equipamentoSection}>
                <Text style={styles.equipamentoectionHeader}>Dropdown</Text>

                <Dropdown
                    style={{ width: '100%', alignSelf: 'center' }}
                    onSelect={() => { }}
                    items={['option 1', 'option 2']}
                />
            </View> */}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.bluish,
        paddingHorizontal: 15,
        paddingTop: 20,
    },
    equipamentoSection: {
        backgroundColor: colors.white,
        paddingHorizontal: 16,
        paddingVertical: 24,
        marginBottom: 20,
        borderRadius: 5,
    },
    equipamentoectionHeader: {
        fontFamily: fonts.primaryRegular,
        color: '#686868',
        fontSize: 24,
        marginBottom: 20,
    },
    demoButtonsContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
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
