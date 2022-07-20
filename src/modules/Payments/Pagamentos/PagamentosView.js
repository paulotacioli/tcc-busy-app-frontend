import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Platform,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions, Alert
  
} from 'react-native';
import { Button } from '../../../components';

import { colors, fonts } from '../../../styles';
import axios from 'axios';

import { RadioGroup, GridRow } from '../../../components';
import { AuthContext } from '../../../Autentication/ProvedorAutenticacao';

export default class PagamentosScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      pagamentos: []
    };
  }

  loadCards = () =>{
    this.setState({
      pagamentos: []
    }, ()=>{

      axios.post(`https://tcc-busy-backend.herokuapp.com/payment/list-payment-methods`,{
        cpf: this.context.user.cpf
      }
      
      ).then(response => {
        this.setState({
          pagamentos: response.data
        })

        
      }).catch(error => {
        Alert.alert("Houve um erro ao carregar seus pagamentos! Vamos tentar novamente mais tarde?")
        
        
      })
    })
    }
    componentWillUnmount () {
      this.unsubscribe()
    }
    
    componentDidMount(){
      this.loadCards()

    this.unsubscribe= this.props.navigation.addListener('focus', () => {
      this.loadCards()

    })
  
  }

  deleteCard = (id) =>{
    axios.post(`https://tcc-busy-backend.herokuapp.com/payment/delete`,{
        cpf: this.context.user.cpf,
        number: id
    }
         
        ).then(response => {
          this.loadCards()
      

        }).catch(error => {
            Alert.alert("Houve um erro ao deletar seu pagamento! Vamos tentar novamente mais tarde?")


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
          <Text style={styles.itemThreeBrand}>{item.titulo} </Text>
          <View>

           
            <View style={{ flexDirection: "row" }}>
            <Text style={styles.itemThreeTitleRow}>{item.brand}</Text>
          
          <Text style={styles.itemThreeTitleRowLeft}>**** {item.last4}</Text>
       </View>
                          {/* //this.deleteCard(item.id) */}
          

  
          </View>

        </View>
      </View>
      <View style={styles.itemThreeHr} />
    </TouchableOpacity>
  );

  render() {
    const groupedData = this.state.pagamentos
  

    return (
      <>
      <View style={styles.container}>
        <View style={{ height: 10 }}>
      
        </View>
        <Text style={styles.titleHeader}>Minhas Formas de Pagamento </Text>
        <Text style={styles.subtitleHeader}>{this.state.pagamentos.length == 0? "Nenhum resultado encontrado":  this.state.pagamentos.length ==1 ? "1 resultado encontrado": this.state.pagamentos.length + " resultados encontrados" }</Text>

        <FlatList
          keyExtractor={item =>
            item.id
          }
          style={{ backgroundColor: colors.white, paddingHorizontal: 15 }}
          data={groupedData}
          renderItem={this.renderRowThree}

        />
      
      </View>
      <View style={styles.containerBottom}>
      <Button
                        style={[styles.demoButton, { flexBasis: '100%' }]}
                        primary
                        rounded
                        caption="Adicionar Cartão"
                        onPress={() =>this.props.navigation.navigate('CartaoCredito',  {"codigo": this.context.user.cpf} )}
                                />
    </View>
    </>
    );
  }
}
PagamentosScreen.contextType = AuthContext;


const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   backgroundColor: colors.white,
  // },
  containerBottom:{
    right: 10,
    left: 10,
    position: 'absolute',
    bottom: 10,
  },
  tabsContainer: {
    alignSelf: 'stretch',
    marginTop: 30,
  },
  itemOneContainer: {
    flex: 1,
    width: Dimensions.get('window').width / 2 - 40,
  },
  itemOneImageContainer: {
    borderRadius: 3,
    overflow: 'hidden',
  },
  itemOneImage: {
    height: 200,
    width: Dimensions.get('window').width / 2 - 40,
  },
  itemOneTitle: {
    fontFamily: fonts.primaryRegular,
    fontSize: 15,
  },
  itemOneSubTitle: {
    fontFamily: fonts.primaryRegular,
    fontSize: 13,
    color: '#B2B2B2',
    marginVertical: 3,
  },
  itemOnePrice: {
    fontFamily: fonts.primaryRegular,
    fontSize: 15,
  },
  itemOneRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  itemOneContent: {
    marginTop: 5,
    marginBottom: 10,
  },
  itemTwoContainer: {
    paddingBottom: 10,
    backgroundColor: 'white',
    marginVertical: 5,
  },
  itemTwoContent: {
    padding: 20,
    position: 'relative',
    marginHorizontal: Platform.OS === 'ios' ? -15 : 0,
    height: 150,
  },
  itemTwoTitle: {
    color: colors.white,
    fontFamily: fonts.primaryBold,
    fontSize: 20,
  },
  itemTwoSubTitle: {
    color: colors.white,
    fontFamily: fonts.primaryRegular,
    fontSize: 15,
    marginVertical: 5,
  },
  itemTwoPrice: {
    color: colors.white,
    fontFamily: fonts.primaryBold,
    fontSize: 20,
  },
  itemTwoImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  itemTwoOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: '#6271da',
    opacity: 0.5,
  },
  itemThreeContainer: {
    backgroundColor: 'white',
    
  },
  itemThreeSubContainer: {
    flexDirection: 'row',
    paddingVertical: 30,
  },
  itemThreeImage: {
    height: 100,
    width: 100,
  },
  itemThreeContent: {
    flex: 1,
    paddingLeft: 15,
    justifyContent: 'space-between',
  },
  itemThreeBrand: {
    fontFamily: fonts.primaryRegular,
    fontSize: 14,
    color: '#617ae1',
  },
  itemThreeTitle: {
    fontFamily: fonts.primaryBold,
    fontSize: 16,
    color: '#5F5F5F',
  },
  itemThreeTitleRow: {
    fontFamily: fonts.primaryRegular,
    fontSize: 20,
    color: '#000080',
    marginLeft:10,
    

  },
  itemThreeTitleRowLeft:{
    fontFamily: fonts.primaryBold,
    fontSize: 20,
    color: '#5F5F5F',
    textAlign:'right',
    marginLeft: Dimensions.get('window').width / 2 - 90,


  },
  itemThreeSubtitle: {
    fontFamily: fonts.primaryRegular,
    fontSize: 12,
    color: '#a4a4a4',
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
  itemThreeMetaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemThreePrice: {
    fontFamily: fonts.primaryRegular,
    fontSize: 15,
    color: '#5f5f5f',
    textAlign: 'right',
  },
  itemThreeHr: {
    flex: 1,
    height: 1,
    backgroundColor: '#e3e3e3',
    marginRight: -15,
  },
  badge: {
    backgroundColor: colors.secondary,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  demoButtonsContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
},
  demoButton: {
    marginTop: 8,
    marginBottom: 8,
},
});
