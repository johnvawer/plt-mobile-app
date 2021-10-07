import React from 'react'
import { render, fireEvent } from '@testing-library/react-native'
import Button from '.'

describe('<Button />', () => {
  let props: {
    onPress: () => void
    buttonText: string
  }
  let onPress: jest.Mock

  beforeEach(() => {
    onPress = jest.fn()
    props = {
      onPress,
      buttonText: 'My Button Text'
    }
  })

  afterEach(() => {
    onPress.mockRestore()
  })

  describe('<Button />', () => {
    it('render the button correctly', () => {
      const { getByText } = render(<Button {...props} />)
      const button = getByText('My Button Text')

      expect(button.props.children).toEqual('My Button Text')
    })
  })

  it('should call the onPress prop on button press', () => {
    const { getByText } = render(<Button {...props} />)
    const button = getByText('My Button Text')
    fireEvent.press(button)

    expect(onPress).toHaveBeenCalledTimes(1)
  })
})
