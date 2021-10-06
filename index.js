/**
 * @format
 */
import * as React from 'react'
import { AppRegistry } from 'react-native'
import App from './App'
import { name as appName } from './app.json'
import { NavigationContainer } from '@react-navigation/native'
import { AppProvider } from './src/state/context'

export default function MainApp () {
  return (
    <NavigationContainer>
      <AppProvider>
        <App />
      </AppProvider>
    </NavigationContainer>
  )
}

AppRegistry.registerComponent(appName, () => MainApp)
