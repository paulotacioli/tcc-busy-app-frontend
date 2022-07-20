import React, { useState } from "react";
import { SafeAreaView, StyleSheet, TextInput } from "react-native";
import ListAdressesViewFunction from '../ListAdresses/ListAdressesViewFunction'
import axios from 'axios';
import FormOrderFunction from '../FormOrder/FormOrderFunction'
const SearchAdressOrderFunction = (props) => {
    const [text, onChangeText] = React.useState("Useless Text");
    const [endereco, setEndereco] = useState("");
    const [jsonData, setJsonData] = useState([]);
    const [enderecoEscohido, setEnderecoEscohido] = useState(false)
    const [complemento, setComplemento] = useState("");

    consultarEndereco = async (enderecoDigitado) => {
        await axios.get(`https://discover.search.hereapi.com/v1/discover?at=-23.25663,-45.88994&q=${enderecoDigitado}&apiKey=Zt2XDlWgrooQ9iZDT5bvfbnCmv1PCjVKj2PvnLAp2gw`)
            .then(response => {
              console.log("response", response.data)
              setJsonData(response.data);

            }).catch(error => {
              console.log("error", error)

            })
           
        // setJsonData({
        //     "items": [
        //         {
        //             "title": "Rua Ibiúna, São José dos Campos - SP, 12233-500, Brasil",
        //             "id": "here:af:street:l5GPlnZb-LU0CZos1WsmeD",
        //             "language": "pt",
        //             "resultType": "street",
        //             "address": {
        //                 "label": "Rua Ibiúna, São José dos Campos - SP, 12233-500, Brasil",
        //                 "countryCode": "BRA",
        //                 "countryName": "Brasil",
        //                 "stateCode": "SP",
        //                 "state": "São Paulo",
        //                 "city": "São José dos Campos",
        //                 "street": "Rua Ibiúna",
        //                 "postalCode": "12233-500"
        //             },
        //             "position": {
        //                 "lat": -23.25663,
        //                 "lng": -45.88994
        //             },
        //             "distance": 0,
        //             "mapView": {
        //                 "west": -45.89003,
        //                 "south": -23.25828,
        //                 "east": -45.88982,
        //                 "north": -23.25499
        //             }
        //         },
        //         {
        //             "title": "Rua Ibiúna, Itaquaquecetuba - SP, 08589-080, Brasil",
        //             "id": "here:af:street:c0b0DPIXUepIpWkMAxRNWC",
        //             "language": "pt",
        //             "resultType": "street",
        //             "address": {
        //                 "label": "Rua Ibiúna, Itaquaquecetuba - SP, 08589-080, Brasil",
        //                 "countryCode": "BRA",
        //                 "countryName": "Brasil",
        //                 "stateCode": "SP",
        //                 "state": "São Paulo",
        //                 "city": "Itaquaquecetuba",
        //                 "street": "Rua Ibiúna",
        //                 "postalCode": "08589-080"
        //             },
        //             "position": {
        //                 "lat": -23.44095,
        //                 "lng": -46.29968
        //             },
        //             "distance": 46581,
        //             "mapView": {
        //                 "west": -46.29973,
        //                 "south": -23.44127,
        //                 "east": -46.29967,
        //                 "north": -23.44062
        //             }
        //         },
        //         {
        //             "title": "Rua Ibiúna, Taboão da Serra - SP, 06780-210, Brasil",
        //             "id": "here:af:street:0fKYoDGtmEel6OcsbGfRhC",
        //             "language": "pt",
        //             "resultType": "street",
        //             "address": {
        //                 "label": "Rua Ibiúna, Taboão da Serra - SP, 06780-210, Brasil",
        //                 "countryCode": "BRA",
        //                 "countryName": "Brasil",
        //                 "stateCode": "SP",
        //                 "state": "São Paulo",
        //                 "city": "Taboão da Serra",
        //                 "district": "Taboão da Serra",
        //                 "street": "Rua Ibiúna",
        //                 "postalCode": "06780-210"
        //             },
        //             "position": {
        //                 "lat": -23.62196,
        //                 "lng": -46.78978
        //             },
        //             "distance": 100387,
        //             "mapView": {
        //                 "west": -46.79107,
        //                 "south": -23.62297,
        //                 "east": -46.78897,
        //                 "north": -23.6209
        //             }
        //         },
        //         {
        //             "title": "Rua Ibiúna, Santo André - SP, 09190-140, Brasil",
        //             "id": "here:af:street:EInckZ0L33.Rwk.mRcu-9C",
        //             "language": "pt",
        //             "resultType": "street",
        //             "address": {
        //                 "label": "Rua Ibiúna, Santo André - SP, 09190-140, Brasil",
        //                 "countryCode": "BRA",
        //                 "countryName": "Brasil",
        //                 "stateCode": "SP",
        //                 "state": "São Paulo",
        //                 "city": "Santo André",
        //                 "street": "Rua Ibiúna",
        //                 "postalCode": "09190-140"
        //             },
        //             "position": {
        //                 "lat": -23.68044,
        //                 "lng": -46.54361
        //             },
        //             "distance": 81645,
        //             "mapView": {
        //                 "west": -46.54422,
        //                 "south": -23.6812,
        //                 "east": -46.54299,
        //                 "north": -23.67967
        //             }
        //         },
        //         {
        //             "title": "Rua Ibíuna, Vila Galvão, Guarulhos - SP, 07061-051, Brasil",
        //             "id": "here:af:street:5clTmyU9r4mzXLQs2oJR7B",
        //             "language": "pt",
        //             "resultType": "street",
        //             "address": {
        //                 "label": "Rua Ibíuna, Vila Galvão, Guarulhos - SP, 07061-051, Brasil",
        //                 "countryCode": "BRA",
        //                 "countryName": "Brasil",
        //                 "stateCode": "SP",
        //                 "state": "São Paulo",
        //                 "city": "Guarulhos",
        //                 "district": "Vila Galvão",
        //                 "street": "Rua Ibíuna",
        //                 "postalCode": "07061-051"
        //             },
        //             "position": {
        //                 "lat": -23.46066,
        //                 "lng": -46.56688
        //             },
        //             "distance": 72732,
        //             "mapView": {
        //                 "west": -46.56709,
        //                 "south": -23.4612,
        //                 "east": -46.56668,
        //                 "north": -23.46013
        //             }
        //         },
        //         {
        //             "title": "Rua Ibiúna, Carapicuíba - SP, 06326-340, Brasil",
        //             "id": "here:af:street:wPOsUAm.SZY.A2pvcWn.XD",
        //             "language": "pt",
        //             "resultType": "street",
        //             "address": {
        //                 "label": "Rua Ibiúna, Carapicuíba - SP, 06326-340, Brasil",
        //                 "countryCode": "BRA",
        //                 "countryName": "Brasil",
        //                 "stateCode": "SP",
        //                 "state": "São Paulo",
        //                 "city": "Carapicuíba",
        //                 "district": "Carapicuíba",
        //                 "street": "Rua Ibiúna",
        //                 "postalCode": "06326-340"
        //             },
        //             "position": {
        //                 "lat": -23.53361,
        //                 "lng": -46.8295
        //             },
        //             "distance": 100710,
        //             "mapView": {
        //                 "west": -46.8468,
        //                 "south": -23.54044,
        //                 "east": -46.82715,
        //                 "north": -23.53133
        //             }
        //         },
        //         {
        //             "title": "Rua Ibiúna, Polvilho, Cajamar - SP, 07750-000, Brasil",
        //             "id": "here:af:street:rmBqInFGlOHqY-8PGz8ctA",
        //             "language": "pt",
        //             "resultType": "street",
        //             "address": {
        //                 "label": "Rua Ibiúna, Polvilho, Cajamar - SP, 07750-000, Brasil",
        //                 "countryCode": "BRA",
        //                 "countryName": "Brasil",
        //                 "stateCode": "SP",
        //                 "state": "São Paulo",
        //                 "city": "Cajamar",
        //                 "district": "Polvilho",
        //                 "street": "Rua Ibiúna",
        //                 "postalCode": "07750-000"
        //             },
        //             "position": {
        //                 "lat": -23.41586,
        //                 "lng": -46.84125
        //             },
        //             "distance": 98728,
        //             "mapView": {
        //                 "west": -46.84162,
        //                 "south": -23.41625,
        //                 "east": -46.84091,
        //                 "north": -23.4155
        //             }
        //         },
        //         {
        //             "title": "Ibiúna, SP, Brasil",
        //             "id": "here:cm:namedplace:23033581",
        //             "language": "pt",
        //             "resultType": "locality",
        //             "localityType": "city",
        //             "address": {
        //                 "label": "Ibiúna, SP, Brasil",
        //                 "countryCode": "BRA",
        //                 "countryName": "Brasil",
        //                 "stateCode": "SP",
        //                 "state": "São Paulo",
        //                 "city": "Ibiúna",
        //                 "postalCode": "18150-000"
        //             },
        //             "position": {
        //                 "lat": -23.65718,
        //                 "lng": -47.22365
        //             },
        //             "distance": 143151,
        //             "mapView": {
        //                 "west": -47.38916,
        //                 "south": -24.02396,
        //                 "east": -46.98583,
        //                 "north": -23.59708
        //             }
        //         }
        //     ]
        // })

    }

    const pullAdress = (data) => {
        setEnderecoEscohido(data)
        this.selectCoordenates(data)

    }

    selectCoordenates = (data) => {
        console.log("select Coorednates working", data)
        props.coordenates(data.position);
    }

    adicionarEndereco = (complemento) =>{
            props.adressWithComplement(`${enderecoEscohido.title} Complemento:${complemento}`);
      }
    
    return (
        <SafeAreaView>


            <TextInput
                style={styles.input}
                onChangeText={setEndereco}
                autoFocus={true}
                blurOnSubmit={true}
                editable={!enderecoEscohido ? true : false}
                onSubmitEditing={() => {
                    consultarEndereco(endereco)

                }}
                value={enderecoEscohido ? enderecoEscohido.title : endereco}

                placeholder="Digite o Endereço"
            />
            {
                !enderecoEscohido ?
                    <ListAdressesViewFunction jsonData={jsonData} adress={pullAdress}></ListAdressesViewFunction>
                    :
                    <TextInput
                        style={styles.input}
                        onChangeText={setComplemento}
                        value={complemento}
                        placeholder="Complemento "
                        autoFocus={true}
                        blurOnSubmit={true}
                        onSubmitEditing={() => {
                            adicionarEndereco(complemento)

                        }}
                    />
            }
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    input: {
        height: 60,

        margin: 0,
        borderWidth: 1,
        borderColor: 'white',
        padding: 10,
        backgroundColor: 'white'
    },
});

export default SearchAdressOrderFunction;