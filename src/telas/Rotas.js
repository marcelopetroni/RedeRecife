import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import TelaHome from './TelaHome';
import TelaEducaHub from './TelaEducaHub';
import TelaAjuda from './TelaAjuda';
import TelaAlerta from './TelaAlerta';
import TelaAbrigo from './TelaAbrigo';

const Stack = createStackNavigator();

function Rotas() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="TelaHome">
        <Stack.Screen name="TelaEducaHub" component={TelaEducaHub} 
            options={{
              title: '',
              headerTransparent: true,
              headerShown: false,
            }}
          />
        <Stack.Screen name="TelaHome" component={TelaHome} 
          options={{
            title: '',
            headerTransparent: true,
            headerShown: false,
          }}
          />
        <Stack.Screen name="TelaAjuda" component={TelaAjuda} 
          options={{
            title: '',
            headerTransparent: true,
            headerShown: false,
          }}
        />
        <Stack.Screen name="TelaAlerta" component={TelaAlerta} 
          options={{
            title: '',
            headerTransparent: true,
            headerShown: false,
          }}
        />
        <Stack.Screen name="TelaAbrigo" component={TelaAbrigo} 
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