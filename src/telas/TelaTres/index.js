import React from 'react'
import { StyleSheet, Text, View } from 'react-native';

export default function TelaTres() {
  return (
    <View style={styles.container}>
      <Text>Tela Tres</Text>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
});