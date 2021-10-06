import React from 'react'
import { render } from '@testing-library/react-native'
import Basket from '.'

describe('<Basket />', () => {
  it('should render correctly', () => {
    const { toJSON } = render(<Basket />)
    expect(toJSON()).toMatchSnapshot()
  })
})
