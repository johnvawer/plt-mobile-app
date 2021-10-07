import React from 'react'
import { render, fireEvent } from '@testing-library/react-native'
import { AppContext } from '../../state/context'
import Basket from '.'

const basketProducts = [{
  id: 1,
  name: 'product one',
  price: 10,
  quantity: 1,
  totalPrice: 10
}, {
  id: 2,
  name: 'product two',
  price: 4,
  quantity: 6,
  totalPrice: 24
}, {
  id: 3,
  name: 'product three',
  price: 2.99,
  quantity: 2,
  totalPrice: 5.98
}]

describe('<Basket />', () => {
  let dispatchMock: jest.Mock
  let initialState: {
    state: { products: ComputedProduct[] }
    dispatch: () => void
  }

  beforeEach(() => {
    dispatchMock = jest.fn()
    initialState = {
      state: { products: [] },
      dispatch: dispatchMock
    }
  })

  afterEach(() => {
    dispatchMock.mockRestore()
  })

  it('should display an empty message if there are no products in the basket', () => {
    const { toJSON } = render(
      <AppContext.Provider value={initialState}>
        <Basket />
      </AppContext.Provider>
    )

    expect(toJSON()).toMatchSnapshot()
  })

  it('should display the correct basket totals', () => {
    initialState.state.products = [...basketProducts]

    const { getByTestId } = render(
      <AppContext.Provider value={initialState}>
        <Basket />
      </AppContext.Provider>
    )
    const totalAmount = getByTestId('totalAmount')
    const totalItems = getByTestId('totalItems')

    expect(totalItems.props.children[1]).toEqual(9)
    expect(totalAmount.props.children.join('')).toEqual('£39.98')
  })

  it('should dispatch to add a product to the store on pressing "+"', () => {
    initialState.state.products = [...basketProducts]

    const { getAllByText } = render(
      <AppContext.Provider value={initialState}>
        <Basket />
      </AppContext.Provider>
    )

    const plusButton = getAllByText('+')
    fireEvent.press(plusButton[0])

    expect(dispatchMock).toHaveBeenCalledTimes(1)
    expect(dispatchMock).toHaveBeenCalledWith({
      type: 'ADD_PRODUCT',
      payload: {
        id: 1,
        name: 'product one',
        price: 10
      }
    })
  })

  it('should dispatch to remove a product to the store on pressing "-"', () => {
    initialState.state.products = [...basketProducts]

    const { getAllByText } = render(
      <AppContext.Provider value={initialState}>
        <Basket />
      </AppContext.Provider>
    )

    const minusButton = getAllByText('-')
    fireEvent.press(minusButton[1])

    expect(dispatchMock).toHaveBeenCalledTimes(1)
    expect(dispatchMock).toHaveBeenCalledWith({
      type: 'REMOVE_PRODUCT',
      payload: {
        id: 2
      }
    })
  })
})
