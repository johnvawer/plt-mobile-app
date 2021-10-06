import React from 'react'
import { Pressable, Text, StyleSheet } from 'react-native'

interface Props {
  onPress: () => void
  buttonText: string
}

const Button = ({ onPress, buttonText }: Props): JSX.Element => (
  <Pressable onPress={onPress} style={styles.button}>
    <Text>{buttonText}</Text>
  </Pressable>
)

const styles = StyleSheet.create({
  button: {
    borderColor: 'black',
    borderWidth: 1,
    margin: 5,
    backgroundColor: 'white',
    padding: 10,
    alignItems: 'center'
  }
})

export default Button
