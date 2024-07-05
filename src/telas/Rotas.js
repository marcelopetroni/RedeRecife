import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, Text, StyleSheet } from 'react-native';
import Newspaper from '../imagens/Navbar/newspaperSvg.svg'
import Plus  from '../imagens/Navbar/plusSvg.svg'
import Alerta  from '../imagens/Navbar/alertaSvg.svg'

import TelaHome from './TelaHome';
import TelaEducaHub from './TelaEducaHub';
import TelaAjuda from './TelaAjuda';
import TelaAlerta from './TelaAlerta';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const styles = StyleSheet.create({
  title: {
    color: "rgba(77, 77, 77, 0.46)",
    fontSize: 13,
    fontWeight: "500"
  },
});

const TabNavigator = () => {
  return (
    <Tab.Navigator 
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: [
          {
            height: 100,
            display: 'flex',
            alignItems: 'center',
          },
        ],
      }}
    >
      <Tab.Screen
        name="TelaEducaHub"
        component={TelaEducaHub}
        options={{
          title: '',
          headerTransparent: true,
          tabBarIcon: () => (
            <>
              <Newspaper width={40} height={40} />
              <Text style={styles.title}>EducaHub</Text>
            </>
          ),
        }}
      />
      <Tab.Screen
        name="TelaAjuda"
        component={TelaAjuda}
        options={{
          title: '',
          headerTransparent: true,
          tabBarIcon: () => (
            <>
              <Plus width={40} height={40} />
              <Text style={styles.title}>AjudaRecife</Text>
            </>
          ),
        }}
      />
      <Tab.Screen
        name="TelaAlerta"
        component={TelaAlerta}
        options={{
          title: '',
          headerTransparent: true,
          tabBarIcon: () => (
            <>
              <Alerta width={40} height={40} />
              <Text style={styles.title}>Alerta</Text>
            </>
          ),
        }}
      />
      <Stack.Screen
          name="TelaHome"
          component={TelaHome}
          options={{
            title: '',
            headerTransparent: true,
            headerShown: false,
            tabBarButton: () => null, 
          }}
        />
    </Tab.Navigator>
  );
};
function Rotas() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main">
      <Stack.Screen
          name="Main"
          component={TabNavigator}
          options={{
            title: '',
            headerTransparent: true,
            headerShown: false,
          }}
        />
      <Stack.Screen name="TelaHome" 
        component={TelaHome} 
          options={{
            title: '',
            headerTransparent: true,
            headerShown: false,
          }}
          />
        <Stack.Screen name="TelaEducaHub" component={TelaEducaHub} 
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Rotas;