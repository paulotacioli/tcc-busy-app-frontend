import React , { useState, useEffect } from 'react';
import { Provider } from 'react-redux';
import { View, ActivityIndicator, StyleSheet, AppRegistry  } from 'react-native';
import { PersistGate } from 'redux-persist/integration/react';
import { NavigationContainer } from '@react-navigation/native';
import { colors } from './src/styles';
import { registerRootComponent } from 'expo';
import { store, persistor } from './src/redux/store';
import ProvedorAutenticacao from './src/Autentication/ProvedorAutenticacao';
import AppView from './src/modules/AppViewContainer';
import FlashMessage from "react-native-flash-message";

export default function App() {


  return (
    <Provider store={store}>
          <ProvedorAutenticacao>

      <NavigationContainer>
        <PersistGate
          loading={
            // eslint-disable-next-line react/jsx-wrap-multilines
            <View style={styles.container}>
              <ActivityIndicator color={colors.red} />
            </View>
          }
          persistor={persistor}
        >
          <AppView />
          <FlashMessage position="top" />

        </PersistGate>
      </NavigationContainer>
      
      </ProvedorAutenticacao>

    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: 'white',
  },
});
registerRootComponent(App);