import React from 'react';
import {
  StyleSheet,
  View,
  ImageBackground,
  Image,
} from 'react-native';

import { Alert } from 'react-native';
import { fonts, colors } from '../../../styles';
import { Text } from '../../../components/StyledText';
const logoTransparent = require('../../../../assets/images/logo/logo-transparent.png')

export default function LogoScreen(props) {

  onSuccess = e => {
    Alert.alert(
      'Escaneado!',
      `QRCode escaneado com sucesso. Máquina ID${e.data}. Realizar manutenção?`,
      [
        { text: 'OK', onPress: () => { this.redirecionar(e.data) } },
      ],
      { cancelable: false },
    );

  };

  redirecionar = (codigo) => {
    this.scanner.reactivate()
    props.navigation.navigate('Equipamento', { codigo })

  }

  return (
    <View style={styles.container}>

      <ImageBackground
        source={require('../../../../assets/images/background.png')}
        style={styles.bgImage}
        resizeMode="cover"
      >
        <View style={styles.section}>
          <Text hCenter size={15} white>
          </Text>
        </View>
        <View>

        </View>
        <View style={styles.section}>
     
          <Text size={30} bold white style={styles.title}>
            BUSY
          </Text>
        </View>
        <View style={[styles.section, styles.sectionLarge]}>
          <Text color="#19e7f7" hCenter size={20} style={styles.description}>
            {' '}
         
          </Text>
          <Image
              style={styles.tinyLogo}
              source={logoTransparent}
            />
          {/* <View style={styles.priceContainer}>
            <View style={{ flexDirection: 'row' }}>
              <Text white bold size={50} style={styles.price}>
                {isExtended ? '$499' : '$99'}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.priceLink}
              onPress={() =>
                isExtended ? setIsExtended(false) : setIsExtended(true)
              }
            >
              <Text white size={14}>
                {isExtended
                  ? 'Multiple Applications License'
                  : 'Single Application License'}
              </Text>
            </TouchableOpacity>
          </View> */}
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  bgImage: {
    flex: 1,
    marginHorizontal: -20,
  },
  section: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionLarge: {
    flex: 2,
    justifyContent: 'space-around',
  },
  sectionHeader: {
    marginBottom: 8,
  },
  priceContainer: {
    alignItems: 'center',
  },
  description: {
    padding: 15,
    lineHeight: 25,
    width: 400,
    textAlign: 'center'
  },
  titleDescription: {
    color: '#19e7f7',
    textAlign: 'center',

    fontFamily: fonts.primaryRegular,
    fontSize: 15,
  },
  title: {
    marginTop: 30,
    textAlign: 'center'
  },
  price: {
    marginBottom: 5,
  },
  tinyLogo: {
    width: '100%',
    height: '100%',
    marginBottom:60,
  },
  priceLink: {
    borderBottomWidth: 1,
    borderBottomColor: colors.primary,
  },
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777'
  },
  textBold: {
    fontWeight: '500',
    color: '#000'
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)'
  },
  buttonTouchable: {
    padding: 16
  }
});
