import React from 'react'
import { render, fireEvent } from '@testing-library/react-native'
import * as fetchHook from '../../hooks/useFetch'
import Home from '.'

const fakeProduct = {
  id: 1,
  name: 'product name',
  colour: 'black',
  price: 10,
  img: 'http://someimage.png'
}

describe('<Home />', () => {
  let useFetchMock: jest.SpyInstance

  beforeEach(() => {
    useFetchMock = jest.spyOn(fetchHook, 'useFetch')
  })

  afterEach(() => {
    useFetchMock.mockRestore()
  })

  it('should call the api to fetch products', () => {
    useFetchMock.mockReturnValueOnce({
      loading: false,
      data: {
        data: [fakeProduct]
      },
      error: false
    })
    render(<Home navigation={{ navigate: jest.fn() }} />)

    expect(useFetchMock).toHaveBeenCalledTimes(1)
    expect(useFetchMock).toHaveBeenCalledWith('/products/products')
  })

  it('should display a loading message when the data is loading', () => {
    useFetchMock.mockReturnValueOnce({
      loading: true,
      data: null,
      error: false
    })
    const { toJSON } = render(<Home navigation={{ navigate: jest.fn() }} />)

    expect(toJSON()).toMatchSnapshot()
  })

  it('should display an error message if an error is returned', () => {
    useFetchMock.mockReturnValueOnce({
      loading: false,
      data: null,
      error: true
    })
    const { toJSON } = render(<Home navigation={{ navigate: jest.fn() }} />)

    expect(toJSON()).toMatchSnapshot()
  })

  it('should render the products correctly', () => {
    useFetchMock.mockReturnValueOnce({
      loading: false,
      data: {
        data: [fakeProduct]
      },
      error: true
    })
    const { toJSON } = render(<Home navigation={{ navigate: jest.fn() }} />)

    expect(toJSON()).toMatchSnapshot()
  })

  it('should navigate to the product screen on button press', () => {
    useFetchMock.mockReturnValueOnce({
      loading: false,
      data: {
        data: [fakeProduct]
      },
      error: false
    })

    const mockedNavigate = jest.fn()

    const { getByText } = render(<Home navigation={{ navigate: mockedNavigate }} />)
    const button = getByText('View Product')
    fireEvent.press(button)

    expect(mockedNavigate).toHaveBeenCalledTimes(1)
    expect(mockedNavigate).toHaveBeenCalledWith('Product', {
      productId: 1
    })
  })
})
