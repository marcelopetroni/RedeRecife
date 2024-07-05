import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, StyleSheet } from 'react-native';
import Newspaper from '../imagens/Navbar/newspaperSvg.svg';
import Plus from '../imagens/Navbar/plusSvg.svg';
import Alerta from '../imagens/Navbar/alertaSvg.svg';

import TelaHome from './TelaHome';
import TelaEducaHub from './TelaEducaHub';
import TelaAjuda from './TelaAjuda';
import TelaAlerta from './TelaAlerta';
import TelaAbrigo from './TelaAbrigo';
import TelaMovimento from './TelaSocial';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


const styles = StyleSheet.create({
  tabBarIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: 'rgba(77, 77, 77, 0.46)',
    fontSize: 13,
    fontWeight: '500',
    textAlign: 'center',
  },
});

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 100,
          display: 'flex',
          alignItems: 'center',
        },
      }}
    >
      <Stack.Screen
        name="TelaHome"
        component={TelaHome}
        options={{
          tabBarIcon: () => (null),
          title: '',
          headerTransparent: true,
          headerShown: false,
          tabBarButton: () => null,
        }}
      />
      <Tab.Screen
        name="TelaEducaHub"
        component={TelaEducaHub}
        options={{
          tabBarIcon: () => (
            <View style={styles.tabBarIconContainer}>
              <Newspaper width={40} height={40} />
              <Text style={styles.title}>EducaHub</Text>
            </View>
          ),
          title: '',
          headerTransparent: true,
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="TelaAjuda"
        component={TelaAjuda}
        options={{
          tabBarIcon: () => (
            <View style={styles.tabBarIconContainer}>
              <Plus width={40} height={40} />
              <Text style={styles.title}>AjudaRecife</Text>
            </View>
          ),
          title: '',
          headerTransparent: true,
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="TelaAlerta"
        component={TelaAlerta}
        options={{
          tabBarIcon: () => (
            <View style={styles.tabBarIconContainer}>
              <Alerta width={40} height={40} />
              <Text style={styles.title}>Alerta</Text>
            </View>
          ),
          title: '',
          headerTransparent: true,
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="TelaAbrigo"
        component={TelaAbrigo}
        options={{
          tabBarIcon: () => (null),
          title: '',
          headerTransparent: true,
          headerShown: false,
          tabBarButton: () => null,
        }}
      />
      <Tab.Screen
        name="TelaMovimento"
        component={TelaMovimento}
        options={{
          tabBarIcon: () => (null),
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
      <TabNavigator />
    </NavigationContainer>
  );
}

export default Rotas;