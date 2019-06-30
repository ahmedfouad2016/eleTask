import React, { Component } from "react";
import { ActivityIndicator, View } from "react-native";
import Styles from "./Styles";

export default class Loading extends Component {
  render() {
    return (
      <View style={Styles.container}>
        <ActivityIndicator size="large" color="#ff0000" />
      </View>
    );
  }
}
