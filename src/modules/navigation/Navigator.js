import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Keyboard  } from 'react-native';
import {
  createDrawerNavigator,
  DrawerItem,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import NavigatorView from './RootNavigation';

import { AuthConsumer } from '../../Autentication/ProvedorAutenticacao';
const iconHome = require('../../../assets/images/drawer/home.png');
const iconCalendar = require('../../../assets/images/drawer/calendar.png');
const iconGrids = require('../../../assets/images/drawer/grids.png');
const iconPages = require('../../../assets/images/drawer/pages.png');
const iconComponents = require('../../../assets/images/drawer/components.png');
const iconSettings = require('../../../assets/images/drawer/settings.png');

const logoTransparent = require('../../../assets/images/logo/logo-transparent.png')



const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {

  Keyboard.dismiss()




  return (
    <DrawerContentScrollView {...props} style={{ padding: 0 }}>
      {props.user.isUsuarioAutenticado ?
        <View style={styles.avatarContainer}>

<Image
              style={styles.tinyLogo}
              source={logoTransparent}
            />
          <View style={{ paddingLeft: 15 }}>

            <Text style={styles.userName}>{props.user.nome}</Text>
            <Text style={{ color: '#4BC1FD' }}>CPF {props.user.cpf}</Text>
          </View>
        </View> :

        <View style={styles.avatarContainer}>

          <View style={{ paddingLeft: 15 }}>

            <Text style={styles.userName}>BUSY</Text>
            <Text style={{ color: '#4BC1FD' }}>Alocação de serviços</Text>
      
          </View>
        </View>
      }


      {props.user.isUsuarioAutenticado ?
        <View>
          <View style={styles.divider} />
             
<View>

<DrawerItem
  label={() => (
    <View style={styles.menuLabelFlex}>
      <Image
        style={{ width: 20, height: 20 }}
        source={iconHome}
      />
      <Text style={styles.menuTitle}>Novo Pedido</Text>
    </View>
  )}
  onPress={() => props.navigation.navigate('Pedido', { "codigo": props.user.cpf })}
/>


{/* 
</View>
          <View> */}

           

            <DrawerItem
              label={() => (
                <View style={styles.menuLabelFlex}>
                  <Image
                    style={{ width: 20, height: 20 }}
                    source={iconComponents}
                  />
                  <Text style={styles.menuTitle}>Meus Pedidos</Text>
                </View>
              )}
              onPress={() => props.navigation.navigate('Pedidos', { "codigo": props.user.cpf })}
            />

            <DrawerItem
              label={() => (
                <View style={styles.menuLabelFlex}>
                  <Image
                    style={{ width: 20, height: 20 }}
                    source={iconPages}
                  />
                  <Text style={styles.menuTitle}>Formas de Pagamento</Text>
                </View>
              )}
              onPress={() => props.navigation.navigate('Pagamentos', { "codigo": props.user.cpf })}
            />
            <View style={styles.divider} />
            <DrawerItem
              label={() => (
                <View style={styles.menuLabelFlex}>
                  <Image
                    style={{ width: 20, height: 20 }}
                    source={iconSettings}
                  />
                  <Text style={styles.menuTitle}>Minhas Informaçõoes</Text>
                </View>
              )}
              onPress={() => props.navigation.navigate('Informacoes', { "codigo": props.user.cpf })}
            />
            <View style={styles.divider} />
          </View>


          <DrawerItem
            label={() => (
              <View style={styles.menuLabelFlex}>
                <Image
                  style={{ width: 20, height: 20 }}
                  source={iconGrids}
                />
                <Text style={styles.menuTitle}>Logout</Text>
              </View>
            )}
            onPress={() => props.deslogar(props)}
          />
        </View>


        :


        <View>
          <View style={styles.divider} />
          <DrawerItem
            label={() => (
              <View style={styles.menuLabelFlex}>
                <Image
                  style={{ width: 20, height: 20 }}
                  source={iconPages}
                />
                <Text style={styles.menuTitle}>Sobre nós</Text>
              </View>
            )}
            onPress={() => props.navigation.navigate('Logo')}
          />
          <View style={styles.divider} />


          <DrawerItem
            label={() => (
              <View style={styles.menuLabelFlex}>
                <Image
                  style={{ width: 20, height: 20 }}
                  source={iconPages}
                />
                <Text style={styles.menuTitle}>Cadastre-se</Text>
              </View>
            )}
            onPress={() => props.navigation.navigate('Cadastro')}
          />
          <View style={styles.divider} />

          <DrawerItem
            label={() => (
              <View style={styles.menuLabelFlex}>
                <Image
                  style={{ width: 20, height: 20 }}
                  source={iconSettings}
                />
                <Text style={styles.menuTitle}>Login {props.isUsuarioAutenticado}</Text>
              </View>
            )}
            onPress={() => props.navigation.navigate('Login')}
          />
        </View>
      }

    </DrawerContentScrollView>
  );
}

function App(props) {

  function deslogar(props2) {

    props2.navigation.navigate('Login')

    props2.navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
    props.encerrarSessao()


  }



  var usuario = {
    nome: props.user.nome,
    cpf: props.user.cpf,
    isUsuarioAutenticado: props.isUsuarioAutenticado,
    isUsuarioAutorizado: props.isUsuarioAutorizado

  }
  return (

    <Drawer.Navigator
      drawerStyle={{
        backgroundColor: '#3C38B1',
      }}
      drawerContent={props => <CustomDrawerContent {...props} user={usuario} deslogar={deslogar} />}
    >
      <Drawer.Screen name="Homes" component={NavigatorView} />
    </Drawer.Navigator>

  );
} export default () => (


  <AuthConsumer>
    {(context) => (<App user={context.user} isUsuarioAutenticado={context.isAuthenticated} isUsuarioAutorizado={context.autorizado} encerrarSessao={context.encerrarSessao} />)}
  </AuthConsumer>

)



const styles = StyleSheet.create({
  menuTitle: {
    marginLeft: 10,
    color: '#fff'
  },
  menuLabelFlex: {
    display: 'flex',
    flexDirection: 'row'
  },
  userName: {
    color: '#fff',
    fontSize: 18
  },
  divider: {
    borderBottomColor: 'white',
    opacity: 0.2,
    borderBottomWidth: 1,
    margin: 15,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  avatarContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    margin: 20,
    marginBottom: 10
  },  
  tinyLogo: {
    width: 60,
    height: 60,
  },
});

