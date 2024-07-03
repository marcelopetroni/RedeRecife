import React from 'react'
import { StyleSheet, Text, View } from 'react-native';

export default function TelaUm() {
  return (
    <View style={styles.container}>
      <Text>Tela Um</Text>
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