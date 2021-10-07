import React from 'react'
import { render, fireEvent } from '@testing-library/react-native'
import * as fetchHook from '../../hooks/useFetch'
import { AppContext } from '../../state/context'
import Product from '.'

const fakeProduct = {
  id: 1,
  name: 'product name',
  colour: 'black',
  price: 10,
  img: 'http://someimage.png',
  quantity: 1,
  totalPrice: 1000
}

describe('<Product />', () => {
  let useFetchMock: jest.SpyInstance
  let dispatchMock: jest.Mock
  let initialState: {
    state: { products: [] }
    dispatch: () => void
  }
  let route: any

  beforeEach(() => {
    useFetchMock = jest.spyOn(fetchHook, 'useFetch')
    dispatchMock = jest.fn()
    initialState = {
      state: { products: [] },
      dispatch: dispatchMock
    }
    route = {
      key: 'key',
      name: 'Product',
      params: { productId: 1 },
      path: undefined
    }
  })

  afterEach(() => {
    useFetchMock.mockRestore()
    dispatchMock.mockRestore()
  })

  it('should call to fetch the product from the api', () => {
    useFetchMock.mockReturnValueOnce({
      loading: false,
      data: {
        data: fakeProduct
      },
      error: false
    })
    render(
      <AppContext.Provider value={initialState}>
        <Product route={route} />
      </AppContext.Provider>
    )

    expect(useFetchMock).toHaveBeenCalledTimes(1)
    expect(useFetchMock).toHaveBeenCalledWith('/products/products/1')
  })

  it('should display a loading message when the data is loading', () => {
    useFetchMock.mockReturnValueOnce({
      loading: true,
      data: null,
      error: false
    })
    const { toJSON } = render(
      <AppContext.Provider value={initialState}>
        <Product route={route} />
      </AppContext.Provider>
    )

    expect(toJSON()).toMatchSnapshot()
  })

  it('should display an error message when an error is returned', () => {
    useFetchMock.mockReturnValueOnce({
      loading: false,
      data: null,
      error: true
    })
    const { toJSON } = render(
      <AppContext.Provider value={initialState}>
        <Product route={route} />
      </AppContext.Provider>
    )

    expect(toJSON()).toMatchSnapshot()
  })

  it('should dispatch a product to the store on button press', () => {
    useFetchMock.mockReturnValueOnce({
      loading: false,
      data: {
        data: fakeProduct
      },
      error: false
    })
    const { getByText } = render(
      <AppContext.Provider value={initialState}>
        <Product route={route} />
      </AppContext.Provider>
    )
    const addProductButton = getByText('Add Product to Basket')
    fireEvent.press(addProductButton)

    expect(dispatchMock).toHaveBeenCalledTimes(1)
    expect(dispatchMock).toHaveBeenCalledWith({
      type: 'ADD_PRODUCT',
      payload: {
        id: 1,
        name: 'product name',
        price: 10
      }
    })
  })
})
