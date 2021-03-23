import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/Home';
import Start from '../screens/Start'


const RootStack = createStackNavigator();



export const RootNavigation = () => {
    return (
        <RootStack.Navigator detachInactiveScreens initialRouteName="Start">
            <RootStack.Screen 
            name="Home" 
            component={Home}
            options={
                {
                    title: "",
                }
            }
            />
            <RootStack.Screen 
            name="Start" 
            component={Start}
            options={
                {
                    headerShown: false,
                }
            }
            />
      </RootStack.Navigator>
    )
}