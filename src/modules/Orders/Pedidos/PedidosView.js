import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Platform,
  Text,
  FlatList,
  TouchableOpacity,
  Keyboard,
  Dimensions, Alert
  
} from 'react-native';

import { colors, fonts } from '../../../styles';
import axios from 'axios';
import { AuthContext } from '../../../Autentication/ProvedorAutenticacao';

export default class PedidosScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      orders: []
    };
  }
  loadOrders = () =>{
    this.setState({
      orders: []
    }, ()=>{

      axios.get(`https://tcc-busy-backend.herokuapp.com/order/usuario/${this.context.user.cpf}`).then(response => {
        this.setState({
          orders: response.data
        })

        
      }).catch(error => {
        console.log("error", error, `https://tcc-busy-backend.herokuapp.com/order/usuario/${this.context.user.cpf}`)
        Alert.alert("Houve um erro ao carregar seus pedidos!")
        
        
      })
    })
    }
    componentWillUnmount () {
      this.unsubscribe()
    }
    
    componentDidMount(){
      this.loadOrders()
      Keyboard.dismiss()


    this.unsubscribe= this.props.navigation.addListener('focus', () => {
      this.loadOrders()
      Keyboard.dismiss()

    })
  
  }





 
  renderRowThree = ({ item }) => (
    <TouchableOpacity
      key={item.id}
      style={styles.itemThreeContainer}
      //onPress={(e) => this.consultarOrdem(item.id)}
      >
      <View style={styles.itemThreeSubContainer}>
        <View style={styles.itemThreeContent}>
          <Text style={styles.itemThreeStatus}>{item.status} </Text>
          <View>

            <Text style={styles.itemThreeTitle}>R${item.precoServico} </Text>
          <Text style={styles.itemOnePrice} numberOfLines={2}>
           
          Forma de Pagamento: Cartão de Crédito
         
          </Text>

      
          </View>

        </View>
      </View>
      <View style={styles.itemThreeHr} />
    </TouchableOpacity>
  );

  render() {
    const groupedData = this.state.orders
  

    return (
      
      <View style={styles.container}>
        <View style={{ height: 10 }}>
      
        </View>
        <Text style={styles.titleHeader}>Meus Pedidos</Text>
        <Text style={styles.subtitleHeader}>{this.state.orders.length == 0? "Nenhum resultado encontrado":  this.state.orders.length ==1 ? "1 resultado encontrado": this.state.orders.length + " resultados encontrados" }</Text>

        <FlatList
          keyExtractor={item =>
            item.id
          }
          style={{ backgroundColor: colors.white, paddingHorizontal: 15}}
          data={groupedData}
          renderItem={this.renderRowThree}

        />
 
      </View>
    );
  }
}
PedidosScreen.contextType = AuthContext;


const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   backgroundColor: colors.white,
  // },
  
  itemOnePrice: {
    fontFamily: fonts.primaryRegular,
    fontSize: 15,
  },

 
  itemThreeContainer: {
    backgroundColor: 'white',
    

  },
  itemThreeSubContainer: {
    flexDirection: 'row',
    paddingVertical: 40,

  },

  itemThreeContent: {
    flex: 1,
    paddingLeft: 15,
    justifyContent: 'space-between',
  },
  itemThreeStatus: {
    fontFamily: fonts.primaryRegular,
    fontSize: 19,
    color: '#617ae1',
  },
  itemThreeTitle: {
    fontFamily: fonts.primaryBold,
    fontSize: 16,
    color: '#5F5F5F',
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
  subtitleHeader: {
    fontFamily: fonts.primaryRegular,
    color: '#686868',
    textAlign:'right',
    marginRight:15,
    fontSize: 12,
    marginBottom: 20,
    marginTop:5,
  },
  itemThreeHr: {
    flex: 1,
    height: 1,
    backgroundColor: '#e3e3e3',
    marginRight: -15,
  },
  demoButton: {
    marginTop: 8,
    marginBottom: 8,
},
});
