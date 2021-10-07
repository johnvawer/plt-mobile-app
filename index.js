/**
 * @format
 */
import * as React from 'react'
import { AppRegistry } from 'react-native'
import App from './App'
import { name as appName } from './app.json'
import { NavigationContainer } from '@react-navigation/native'
import { AppContext, mainReducer, initialState } from './src/state/context'

export default function MainApp () {
  const [state, dispatch] = React.useReducer(mainReducer, initialState)

  return (
    <NavigationContainer>
      <AppContext.Provider value={{ state, dispatch }}>
        <App />
      </AppContext.Provider>
    </NavigationContainer>
  )
}

AppRegistry.registerComponent(appName, () => MainApp)
