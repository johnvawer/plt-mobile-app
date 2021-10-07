import React from 'react'
import { render } from '@testing-library/react-native'
import ProductPrice from '.'

describe('<ProductPrice />', () => {
  let props: {
    amount: number
    testID?: string
  }

  beforeEach(() => {
    props = {
      amount: 7,
      testID: 'productPrice'
    }
  })

  describe('<ProductPrice />', () => {
    it('render the price correctly', () => {
      const { getByTestId } = render(<ProductPrice {...props} />)
      const text = getByTestId('productPrice')

      expect(text.props.children.join('')).toEqual('£7.00')
    })
  })
})
