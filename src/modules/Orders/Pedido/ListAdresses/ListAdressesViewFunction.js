import React, { useState, useEffect } from "react";
import { FlatList, SafeAreaView, View, StatusBar, StyleSheet, Text, TouchableOpacity } from "react-native";


const ListAdressesViewFunction = (props) => {
  const [selectedId, setSelectedId] = useState(null);
  const [carregar, setCarregar] = useState(true)

  console.log("listAdress", props.jsonData)

  setPropsAdress = (endereco) =>{
    props.adress(endereco);
  }

  const Item = ({ item, backgroundColor, textColor }) => (
    <TouchableOpacity onPress={() => setPropsAdress(item)} style={[styles.item, backgroundColor]} >
      <View style={{ flexDirection: "row" }}>
  
        <View style={[styles.circleOrdem]}>
          <Text style={[styles.title, textColor]}>{item.title}</Text>
  
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderItemAdress= ({ item }) => {
    const backgroundColor = item.id === selectedId ? "#5EB4FF" : "#5EB4FF";
    const color = item.id === selectedId ? 'white' : 'white';

    return (
      <Item
        item={item}
      
        backgroundColor={{ backgroundColor }}
        textColor={{ color }}
      />
    );
  };


  return (
  carregar? 
    <SafeAreaView style={styles.container}>

        <FlatList
          data={props.jsonData? props.jsonData.items : false}
          renderItem={renderItemAdress}
          keyExtractor={(item) => item.title}
          extraData={selectedId}
        />
        

    </SafeAreaView>
    :false
  );
};

const styles = StyleSheet.create({
  // container: {


  // },
  item: {
    padding: 15,
    marginVertical: 3,
    marginHorizontal: 3,
  },
  title: {
    fontSize: 13,
  },
  circleOrdem: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  containerInput: {
    flex: 1
  },
  inner: {
    padding: 24,
    flex: 1,
    justifyContent: "space-around"
  },
  header: {
    fontSize: 36,
    marginBottom: 48
  },
  textInput: {
    height: 40,
    borderColor: "#000000",
    borderBottomWidth: 1,
    marginBottom: 36
  },
  btnContainer: {
    backgroundColor: "white",
    marginTop: 12
  },

});

export default ListAdressesViewFunction;
