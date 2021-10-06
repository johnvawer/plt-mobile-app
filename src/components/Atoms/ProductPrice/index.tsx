import React from 'react'
import { Text } from 'react-native'

interface Props {
  amount: number
}

const ProductPrice = ({ amount }: Props): JSX.Element => (
  <Text>£{amount.toFixed(2)}</Text>
)

export default ProductPrice
