import React from "react";
import { View, Text, Image, StyleSheet, StatusBar, TextInput, Animated, Dimensions, TouchableOpacity } from "react-native";
import { TypingAnimation } from 'react-native-typing-animation';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import * as Animatable from 'react-native-animatable';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      typing_email: false,
      typing_password: false,
      animation_login: new Animated.Value(width - 40),
      enable: true
    }
  }

  _foucus(value) {
    if (value == "email") {
      this.setState({
        typing_email: true,
        typing_password: false
      })
    }
    else {
      this.setState({
        typing_email: false,
        typing_password: true
      })
    }
  }

  _typing() {
    return (
      <TypingAnimation
        dotColor="#3E3F94"
        style={{ marginRight: 25 }}
      />
    )
  }

  _animation() {
    Animated.timing(
      this.state.animation_login,
      {
        toValue: 40,
        duration: 250
      }
    ).start();

    setTimeout(() => {
      this.setState({
        enable: false,
        typing_email: false,
        typing_password: false
      })
    }, 150);
  }

  render() {
    const width = this.state.animation_login;
    return (
      <View style={styles.container}>

        <StatusBar barStyle="light-content" />

        <View style={styles.header}>

          <View style={styles.containerLogo}>

            <Image source={require('./logo.png')} style={styles.logo} />

          </View>

        </View>

        <View style={styles.footer}>

          <Text style={[styles.title, {
            marginTop: 50
          }]}>E-mail</Text>

          <View style={styles.action}>
            <TextInput
              placeholder="Digite seu email.."
              style={styles.textInput}
              onFocus={() => this._foucus("email")}
            />
            {this.state.typing_email ?
              this._typing()
              : null}
          </View>

          <Text style={[styles.title, {
            marginTop: 20
          }]}>Senha</Text>

          <View style={styles.action}>
            <TextInput
              secureTextEntry
              placeholder="Digite sua senha.."
              style={styles.textInput}
              onFocus={() => this._foucus("password")}
            />
            {this.state.typing_password ?
              this._typing()
              : null}
          </View>

          <TouchableOpacity
            onPress={() => this._animation()}>
            <View style={styles.button_container}>
              <Animated.View style={[styles.animation, {
                width
              }]}>
                {this.state.enable ?
                  <Text style={styles.textLogin}>Acessar</Text>
                  :
                  <Animatable.View
                    animation="bounceIn"
                    delay={50}>
                    <FontAwesome
                      name="check"
                      color="white"
                      size={20}
                    />
                  </Animatable.View>
                }
              </Animated.View >
            </View>
          </TouchableOpacity>

          <View style={styles.signUp}>
            <Text style={{ color: 'black' }}>Criar conta gratuita</Text>
          </View>

        </View>

      </View>
    )
  }
}

const width = Dimensions.get("screen").width;

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center'
  },
  header: {
    flex: 1,
  },
  logo: {
    width: 150,
    height: 150,
    marginTop: 80
  },
  footer: {
    flex: 2,
    padding: 20
  },
  containerLogo: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: "100%",
    height: '100%'
  },
  title: {
    color: 'black',
    fontWeight: 'bold'
  },
  action: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#3E3F94'
  },
  textInput: {
    flex: 1,
    marginTop: 5,
    paddingBottom: 5,
    color: '#3E3F94'
  },
  button_container: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  animation: {
    backgroundColor: '#3E3F94',
    paddingVertical: 10,
    marginTop: 30,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textLogin: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18
  },
  signUp: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20
  }
});