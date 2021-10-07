import React, { useContext, useState, useEffect } from 'react'
import { View, Text, FlatList, StyleSheet } from 'react-native'

import { AppContext } from '../../state/context'
import { Types } from '../../state/reducer'
import ProductQuantity from '../../components/Molecules/ProductQuantity'
import ProductPrice from '../../components/Atoms/ProductPrice'

interface BasketTotals {
  totalAmount: number
  totalItems: number
}

const Basket = (): JSX.Element => {
  const { state, dispatch } = useContext(AppContext)
  const { products } = state
  const [basketTotals, setBasketTotals] = useState<BasketTotals>({
    totalAmount: 0,
    totalItems: 0
  })

  useEffect(() => {
    if (products != null && (products.length > 0)) {
      const currentBasket = products.reduce((totals: BasketTotals, product: ComputedProduct) => {
        totals.totalAmount = totals.totalAmount += product.totalPrice
        totals.totalItems = totals.totalItems += product.quantity
        return totals
      }, {
        totalAmount: 0,
        totalItems: 0
      })

      setBasketTotals(currentBasket)
    }
  }, [products])

  if (products.length === 0) {
    return (
      <View>
        <Text>Your basket is empty</Text>
      </View>
    )
  }

  const onPressMore = (product: ComputedProduct): void => {
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

  const onPressLess = (productId: number): void => {
    dispatch({
      type: Types.Remove,
      payload: {
        id: productId
      }
    })
  }

  return (
    <>
      <View style={{ flex: 0.75 }}>
        <FlatList
          data={products}
          renderItem={({ item }: { item: ComputedProduct }) => {
            return (
              <View style={styles.productRow}>
                <View>
                  <Text>Name: {item.name}</Text>
                  <Text>Price: <ProductPrice amount={item.price} /></Text>
                  <Text>Total Price: <ProductPrice amount={item.totalPrice} /></Text>
                </View>
                <View>
                  <ProductQuantity
                    onPressLess={() => onPressLess(item.id)}
                    onPressMore={() => onPressMore(item)}
                    quantity={item.quantity}
                  />
                </View>
              </View>
            )
          }}
        />
      </View>
      <View style={{ flex: 0.25 }}>
        <Text testID='totalItems'>Total Items: {basketTotals.totalItems}</Text>
        <Text>Total Amount: <ProductPrice testID='totalAmount' amount={basketTotals.totalAmount} /></Text>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  productRow: {
    margin: 10
  }
})

export default Basket
