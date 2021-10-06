import React, { useContext } from 'react'
import { View, Text } from 'react-native'
import { RouteProp } from '@react-navigation/native'
import { HomeStackParamsList } from '../../types/routes'

import Loading from '../../components/Atoms/Loading'
import ProductCard from '../../components/Molecules/ProductCard'

import { Types } from '../../state/reducer'
import { useFetch } from '../../hooks/useFetch'
import { AppContext } from '../../state/context'

interface Props {
  route: RouteProp<HomeStackParamsList, 'Product'>
}

const Product = ({ route }: Props): JSX.Element => {
  const { productId } = route.params
  const { loading, data, error } = useFetch(`/products/products/${productId}`)
  const { dispatch } = useContext(AppContext)

  if (loading) return <Loading />

  if (error || data === null) return <Text>Error fetching product</Text>

  const product: Product = data.data

  const onPress = (): void => {
    const { id, name, price } = product

    dispatch({
      type: Types.Add,
      payload: {
        id,
        name,
        price
      }
    })
  }

  return (
    <View style={{ flex: 1, alignItems: 'stretch' }}>
      <ProductCard
        onPress={onPress}
        product={product}
        buttonText='Add Product to Basket'
      />
    </View>
  )
}

export default Product
