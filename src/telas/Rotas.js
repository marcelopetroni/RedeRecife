import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import TelaUm from './TelaUm';
import TelaDois from './TelaDois';
import TelaTres from './TelaTres';

const Stack = createStackNavigator();

function Rotas() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="TelaUm">
        <Stack.Screen name="TelaUm" component={TelaUm} 
          options={{
            title: '',
            headerTransparent: true,
            headerShown: false,
          }}
          />
        <Stack.Screen name="TelaDois" component={TelaDois} 
          options={{
            title: '',
            headerTransparent: true,
            headerShown: false,
          }}
        />
        <Stack.Screen name="TelaTres" component={TelaTres} 
          options={{
            title: '',
            headerTransparent: true,
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Rotas;