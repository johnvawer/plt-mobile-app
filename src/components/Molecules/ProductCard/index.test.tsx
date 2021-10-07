import React from 'react'
import { render, fireEvent } from '@testing-library/react-native'
import ProductCard from '.'

describe('<ProductCard />', () => {
  let props: {
    onPress: () => void
    product: Product
    buttonText: string
  }
  let onPress: jest.Mock

  beforeEach(() => {
    onPress = jest.fn()
    props = {
      onPress,
      product: {
        id: 1,
        name: 'Black Dress',
        colour: 'Black',
        img: 'http://www.image.com/someimage.png',
        price: 10
      },
      buttonText: 'My Button Text'
    }
  })

  afterEach(() => {
    onPress.mockRestore()
  })

  describe('<ProductPrice />', () => {
    it('should take the props and render them correctly', () => {
      const { toJSON } = render(<ProductCard {...props} />)

      expect(toJSON()).toMatchSnapshot()
    })

    it('should call the onPress prop on button press', () => {
      const { getByText } = render(<ProductCard {...props} />)
      const button = getByText('My Button Text')
      fireEvent.press(button)

      expect(onPress).toHaveBeenCalledTimes(1)
    })

    it('should replace insecure image protocols', () => {
      const { getByTestId } = render(<ProductCard {...props} />)
      const image = getByTestId('productCardImage')

      expect(image.props.source.uri).toEqual('https://www.image.com/someimage.png')
    })
  })
})
