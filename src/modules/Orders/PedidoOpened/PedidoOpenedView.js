import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, Alert } from 'react-native';
import { useRoute } from '@react-navigation/native';
import HeaderViewFunction from '../Pedido/Header/HeaderViewFunction';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

export default class PedidoOpenedScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            order: []
        };
    }

    componentDidMount() {


    }

    render() {
        return (
            <>
                <View style={styles.containerHeader}>
                    <HeaderViewFunction order={this.state.order} opened={false} ></HeaderViewFunction>
                </View>
            </>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
