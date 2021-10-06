import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

import Button from '../../Atoms/Button'

interface Props {
  onPressMore: () => void
  onPressLess: () => void
  quantity: number
}

const ProductQuantity = ({
  onPressMore,
  onPressLess,
  quantity
}: Props): JSX.Element => (
  <View style={styles.container}>
    <Button buttonText='-' onPress={onPressLess} />
    <Text>{quantity}</Text>
    <Button buttonText='+' onPress={onPressMore} />
  </View>
)

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center'
  }
})

export default ProductQuantity
