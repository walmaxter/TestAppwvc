import * as React from 'react';
import MapView from 'react-native-maps';
import { Button, View, Text ,TextInput , StyleSheet, Alert, Image, ScrollView } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { Card, ListItem, Input  } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';
import Autocomplete from 'react-native-autocomplete-input';
import RNGooglePlaces from 'react-native-google-places';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator'
//import { Examples } from '@shoutem/ui';


class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {nombre: '', edad: '' , correo: '', dir: '',
    autocomplete:'https://maps.googleapis.com/maps/api/place/autocomplete/json?input=',
    sitio:'',
    parameter:'&inputtype=textquery&fields=formatted_address,name,geometry&key=',
    key:'AIzaSyAdeC347m24SmuEOlHzCA3EX2xrtDY6kGE',
    latitud:'',
    longitud:'',
    };
  }
  validador(){
    if(this.state.nombre.length==0 || this.state.edad.length==0 || this.state.correo.length==0 || this.state.sitio.length==0){
        alert("faltan campos por llenar")
  }
  }
  render() {
    return ( //style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
    <ScrollView >
    <Card title="Datos">
      <View style={styles.container}>
       <View style={styles.busqueda}>
        <GooglePlacesAutocomplete 
                placeholder='Busqueda'
                minLength={2} // minimum length of text to search
                autoFocus={true}
                returnKeyType={'search'} // Can be left out for default return key 
                listViewDisplayed={false}    // true/false/undefined
                fetchDetails={true}
                onPress={(data, details = null) => {
                    this.setState({
                      latitud: JSON.stringify(details.geometry.location.lat),
                      //lastLat || this.state.lastLat,
                      longitud: JSON.stringify(details.geometry.location.lng),
                       //lastLong || this.state.lastLong
                      sitio:JSON.stringify(details.name)
                    });
                    //alert(JSON.stringify(details.name))
                 }
                }
                query={{
                    key: this.state.key,
                    language: 'es'
                }}

                nearbyPlacesAPI='GooglePlacesSearch'
                debounce={300}
            />
       </View>
        <Input          //style={{height: 40}}
          style={styles.textinput}
          label='Nombre'
          placeholder=" Escriba su nombre"
          inlineImageLeft='account-circle'
          leftIcon={
            <Icon name='user' size={20} color='grey' />
           }
           onChangeText={(nombre) => this.setState({nombre})}
           value={this.state.nombre}
        />
        <Input
          style={styles.textinput}
          label='Edad'
          keyboardType = 'numeric'
          placeholder="Edad"
          leftIcon={
            <Icon name='user' size={20}  color='grey' />
           }
           onChangeText={(edad) => this.setState({edad})}
           value={this.state.edad}
        />
        <Input
         style={styles.textinput}
          label='Correo'
          //keyboardType = 'email-address'
          placeholder=" ejemplo@mail.com"
          leftIcon={ <Icon name='user' size={20}  color='grey' />
          }
           onChangeText={(correo) => this.setState({correo})}
           value={this.state.correo}
        />
        
            
      </View>
      <Card>
        <View style={styles.container}>
          <Button
              style={styles.boton}
              title="Registrarse"
              onPress={() => this.props.navigation.navigate('Details',
              {
                nombre:this.state.nombre, edad:this.state.edad,
                correo:this.state.correo, dir:this.state.dir,
                lat:this.state.latitud, lon:this.state.longitud,
                sitio:this.state.sitio
              })}
              //onPress={() => Alert.alert('Simple Button pressed:')}
            />
         </View>
        </Card>
    </Card>
     </ScrollView>
    );
  }
}

class DetailsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nombre: this.props.navigation.state.params.nombre,
      edad: this.props.navigation.state.params.edad,
      correo:this.props.navigation.state.params.correo,
      dir:this.props.navigation.state.params.dir,
      lat:this.props.navigation.state.params.lat,
      lon:this.props.navigation.state.params.lon,
    buscasitio:'https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=',
      sitio:this.props.navigation.state.params.sitio,
      parameter:'&inputtype=textquery&fields=formatted_address,name,geometry&key=',
      key:'AIzaSyAdeC347m24SmuEOlHzCA3EX2xrtDY6kGE',
     marker: {
        latlng:{
          latitude:       null,
          longitude:      null,
          latitudeDelta: 0.0922,          
		      longitudeDelta: 0.0421,
        }
      },
     };
  }
   onMapPress(e) {
    console.log(e.nativeEvent.coordinate.longitude);
    let region = {
      latitude:       e.nativeEvent.coordinate.latitude,
      longitude:      e.nativeEvent.coordinate.longitude,
      latitudeDelta:  0.00922*1.5,
      longitudeDelta: 0.00421*1.5
    }
    this.onRegionChange(region, region.latitude, region.longitude);
  }
  onRegionChange(region, lastLat, lastLong) {
   // alert("coordinates:"+lastLat+","+lastLong )
    this.setState({
      mapRegion: region,
      // If there are no new values set use the the current ones
      lastLat: lastLat || this.state.lastLat,
      lastLong: lastLong || this.state.lastLong
    });
  }

  render() {
    alert(this.state.lat+","+this.state.lon)
    return (
      //<MapView style={{flex: 1}} />
     <MapView style={{flex: 1}}
          showsPointsOfInterest={true}
          showsIndoors={true}
          showsBuildings={true}
          showsTraffic={true}
       region={{          
		      latitude:  10.9878 || this.state.lat,          
	    	  longitude:  -74.7889 || this.state.lon,          
		      latitudeDelta: 0.00422,          
		      longitudeDelta: 0.00421}}        
		      showsUserLocation={true}
          zoomEnabled={true}
          pitchEnabled={true}
          showsCompass={true}
          //onPress={this.onMapPress.bind(this)}
          >
          <MapView.Marker
            coordinate={{
              latitude: (this.state.lastLat + 0.00050) || 10.9878,
              longitude: (this.state.lastLong + 0.00050) || -74.7889,
            }}
            title={this.state.nombre} description={"edad:"+this.state.edad+" e-mail"+this.state.correo}
            >
            <View>
             <Card>
              <Text style={{color: '#000'}} >
                          {this.state.sitio}
                        
              </Text>
             </Card> 
            </View>
          </MapView.Marker>
          
        </MapView>
     /* <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details Screen  {this.state.nombre}
        { this.state.lastLong }  { this.state.lastLat }
        </Text>
      </View> */
      
    );
  }
}

const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    Details: DetailsScreen,
  },
  {
    initialRouteName: 'Home',
  }
);

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
   textinput: {
    borderColor:'powderblue',
    paddingTop:10,
    height: 40,
    width:320,
    Color: '#fff',
    textAlign:'center',
    borderBottomWidth: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boton:{ 
    borderRadius: 35,
    marginTop:110,
    },
  busqueda: {
    flex: 1,
    justifyContent: 'center',
    width:280,
    //paddingTop: Constants.statusBarHeight
  }
});
/*https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=Museum%20of%20Contemporary%20Art%20Australia&inputtype=textquery&fields=formatted_address,name,geometry&key=AIzaSyBlkDqzHjcgNDy7HGpnW_LmrWDXd9q1FHI*/
/*
https://maps.googleapis.com/maps/api/place/autocomplete/json?input=Museum%20of%20Contemporary%20Art%20Australia&inputtype=textquery&fields=formatted_address,name,geometry&key=AIzaSyBlkDqzHjcgNDy7HGpnW_LmrWDXd9q1FHI
*/