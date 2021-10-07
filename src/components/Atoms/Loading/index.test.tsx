import React from 'react'
import { render } from '@testing-library/react-native'
import Loading from '.'

describe('<Loading />', () => {
  it('should render the element correctly', () => {
    const { toJSON } = render(<Loading />)

    expect(toJSON()).toMatchSnapshot()
  })
})
