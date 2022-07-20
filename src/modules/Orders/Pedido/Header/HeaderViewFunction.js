import React, { useState } from "react";
import { FlatList, SafeAreaView, View, StatusBar, StyleSheet, Text, TouchableOpacity } from "react-native";

const HeaderViewFunction = (props) => {
  const [selectedId, setSelectedId] = useState(null);
  
  // setPropsOpened = (value) =>{
  //   props.opened(value);

  // }

  const ItemIgnoreLast = ({ item, onPress, backgroundColor, textColor }) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]} >
      <View style={{ flexDirection: "row" }}>
  
        <View style={[styles.circleOrdem]}>
          <Text style={[styles.title, textColor]}>{item.ordem}</Text>
  
        </View>
  
        <Text style={[styles.title, textColor]}>{item.destino}</Text>
      </View>
    </TouchableOpacity>
  );
  
  const Item = ({ item, onPress, backgroundColor, textColor }) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]} >
      <View style={{ flexDirection: "row" }}>
  
        <View style={[styles.circleOrdem]}>
          <Text style={[styles.title, textColor]}>{item.ordem}</Text>
  
        </View>
  
        <Text style={[styles.title, textColor]}>{item.destino}</Text>
      </View>
    </TouchableOpacity>
  );

  const ItemPreco = ({ preco, backgroundColor, textColor }) => (
    <TouchableOpacity  
   // onPress={() => setPropsAdress(0)} 
    style={[styles.item, backgroundColor]} >
      <View style={{ flexDirection: "row" }}>
  
        <View style={[styles.circleOrdem]}>
          <Text style={[styles.title, textColor]}>Preço do Serviço R$ {preco}</Text>
  
        </View>
  
        {/* <Text style={[styles.title, textColor]}>Serviço ID {servicoId}</Text> */}
      </View>
    </TouchableOpacity>
  );

  
  const ItemClosed = ({ quantidadeDestinos, backgroundColor, textColor }) => (
    <TouchableOpacity  
   // onPress={() => setPropsAdress(0)} 
    style={[styles.item, backgroundColor]} >
      <View style={{ flexDirection: "row" }}>
  
        <View style={[styles.circleOrdem]}>
          <Text style={[styles.title, textColor]}>{quantidadeDestinos} destinos</Text>
  
        </View>
  
        {/* <Text style={[styles.title, textColor]}>Serviço ID {servicoId}</Text> */}
      </View>
    </TouchableOpacity>
  );
  
  const renderItemOpened = ({ item }) => {
    const backgroundColor = item.id === selectedId ? "#5EB4FF" : "#5EB4FF";
    const color = item.id === selectedId ? 'white' : 'white';

    return (
      <Item
        item={item}
        onPress={() => setSelectedId(item.id)}
        backgroundColor={{ backgroundColor }}
        textColor={{ color }}
      />
    );
  };


  console.log("props.order.length", props.order.length," ", props.opened)
  return (
    <SafeAreaView style={styles.container}>
      {/* {props.order.length >= 1?
      
      props.opened==0 ? */}

      {props.order.length >= 1 && props.opened == 0 ?
        <FlatList
          data={props.order}
          renderItem={renderItemOpened}
          keyExtractor={(item) => item.ordem}
          extraData={selectedId}
        /> : false}

      {props.order.length >= 1 && props.opened == 1 ?
        <ItemClosed
          quantidadeDestinos={props.order.length}
          backgroundColor={{ backgroundColor: "#5EB4FF" }}
          textColor={{ color: "white" }}
          /> : false}

      {props.order.length >= 1 && props.opened == 2?
        <Item
          item={props.order[props.order.length]}
          // onPress={() => setSelectedId(item.id)}
          backgroundColor={{ backgroundColor: "#5EB4FF" }}
          textColor={{ color: "white" }} /> : false}

      {props.order.length >= 0 && props.opened == 3 ?
        <ItemIgnoreLast
          item={props.order[props.order.length - 1]}
          // onPress={() => setSelectedId(item.id)}
          backgroundColor={{ backgroundColor: "#5EB4FF" }}
          textColor={{ color: "white" }} /> : false}

        {props.order.length >= 1 && props.opened == 4 ?
        <>
        <ItemClosed
          quantidadeDestinos={props.order.length}
          backgroundColor={{ backgroundColor: "#5EB4FF" }}
          textColor={{ color: "white" }}
          />
           <ItemPreco
          preco={props.preco}
          backgroundColor={{ backgroundColor: "#E9E9E9" }}
          textColor={{ color: "#3D3D3D" }}
          /> 
          </> : false}
          

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  // container: {


  // },
  item: {
    padding: 15,
    marginVertical: 0.4,
    marginHorizontal: 0,
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

export default HeaderViewFunction;
