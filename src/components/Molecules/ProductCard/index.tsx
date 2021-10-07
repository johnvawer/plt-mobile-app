import React from 'react'
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  StyleSheet
} from 'react-native'
import Button from '../../Atoms/Button'
import ProductPrice from '../../Atoms/ProductPrice'

interface Props {
  onPress: () => void
  product: Product
  buttonText: string
}

const ProductCard = ({ product, onPress, buttonText }: Props): JSX.Element => {
  const { name, price, img, id } = product
  const secureImage = img.split('http://').join('https://')

  return (
    <TouchableOpacity onPress={onPress} key={id}>
      <View style={styles.container}>
        <Image testID='productCardImage' source={{ uri: secureImage }} style={styles.image} />
        <Text>{name}</Text>
        <ProductPrice amount={price} />
        <Button onPress={onPress} buttonText={buttonText} />
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    alignItems: 'center'
  },
  image: {
    height: 300,
    width: 300,
    marginBottom: 10
  }
})

export default ProductCard
