import React from 'react'
import { FlatList, Text } from 'react-native'

import Loading from '../../components/Atoms/Loading'
import ProductCard from '../../components/Molecules/ProductCard'
import { useFetch } from '../../hooks/useFetch'

interface Props {
  navigation: any
}

const Home = ({ navigation }: Props): JSX.Element => {
  const { loading, data, error } = useFetch('/products/products')

  if (loading) return <Loading />

  if (error || data === null) return <Text>Error Fetching data</Text>

  const products: Product[] = data.data

  return (
    <FlatList
      data={products}
      renderItem={({ item }: { item: Product }) => {
        const { id } = item

        const onPress = (id: number): void => {
          navigation.navigate('Product', {
            productId: id
          })
        }

        return (
          <ProductCard
            product={item}
            onPress={() => onPress(id)}
            buttonText='View Product'
          />
        )
      }}
    />
  )
}

export default Home
