import React, { useContext, useEffect, useState } from 'react'
import { createNativeStackNavigator, NativeStackNavigationOptions } from '@react-navigation/native-stack'
import { HomeStackParamsList } from './src/types/routes'

import Home from './src/screens/Home'
import Product from './src/screens/Product'
import Basket from './src/screens/Basket'
import Button from './src/components/Atoms/Button'

import { AppContext } from './src/state/context'

const screenOptions = ({ navigation }: any): NativeStackNavigationOptions => ({
  headerRight: () => {
    const { state } = useContext(AppContext)
    const [basketItems, setBasketItems] = useState<number>(0)
    const { products } = state

    useEffect(() => {
      if (products != null && (products.length > 0)) {
        const totalProducts = products.reduce((total, product) => {
          total += product.quantity
          return total
        }, 0)
        setBasketItems(totalProducts)
      } else {
        setBasketItems(0)
      }
    }, [products])

    return (
      <Button
        buttonText={`${basketItems} in Basket`}
        onPress={() => navigation.navigate('Basket')}
      />
    )
  }
})

const Stack = createNativeStackNavigator<HomeStackParamsList>()

const App = (): JSX.Element => (
  <Stack.Navigator>
    <Stack.Screen
      name='Home'
      component={Home}
      options={screenOptions}
    />
    <Stack.Screen
      name='Product'
      component={Product}
      options={screenOptions}
    />
    <Stack.Screen
      name='Basket'
      component={Basket}
    />
  </Stack.Navigator>
)

export default App
