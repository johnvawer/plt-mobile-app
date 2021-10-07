import React from 'react'
import { render, fireEvent } from '@testing-library/react-native'
import ProductQuantity from '.'

describe('<ProductQuantity />', () => {
  let props: {
    onPressMore: () => void
    onPressLess: () => void
    quantity: number
  }
  let onPressMore: jest.Mock
  let onPressLess: jest.Mock

  beforeEach(() => {
    onPressLess = jest.fn()
    onPressMore = jest.fn()
    props = {
      onPressMore,
      onPressLess,
      quantity: 1
    }
  })

  describe('<ProductQuantity />', () => {
    it('render based on the props correctly', () => {
      const { toJSON } = render(<ProductQuantity {...props} />)

      expect(toJSON()).toMatchSnapshot()
    })

    it('should call the onPressMore prop on pressing the more button', () => {
      const { getByText } = render(<ProductQuantity {...props} />)
      const button = getByText('+')
      fireEvent.press(button)

      expect(onPressMore).toHaveBeenCalledTimes(1)
    })

    it('should call the onPressLess prop on pressing the less button', () => {
      const { getByText } = render(<ProductQuantity {...props} />)
      const button = getByText('-')
      fireEvent.press(button)

      expect(onPressLess).toHaveBeenCalledTimes(1)
    })
  })
})
