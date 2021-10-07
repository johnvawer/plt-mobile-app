import React from 'react'
import { Text } from 'react-native'

interface Props {
  amount: number
  testID?: string
}

const ProductPrice = ({ amount, testID = '' }: Props): JSX.Element => (
  <Text testID={testID}>£{amount.toFixed(2)}</Text>
)

export default ProductPrice
