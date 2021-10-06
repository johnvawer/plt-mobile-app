import React, { createContext, useReducer, Dispatch } from 'react'
import { productReducer, ProductActions } from './reducer'

interface Product {
  id: number
  name: string
  price: number
  quantity: number
  totalPrice: number
}

interface InitialState {
  products: Product[]
}

const initialState = {
  products: []
}

const AppContext = createContext<{
  state: InitialState
  dispatch: Dispatch<ProductActions>
}>({
  state: initialState,
  dispatch: () => null
})

const mainReducer = ({ products }: InitialState, action: ProductActions): { products: Product[] } => ({
  products: productReducer(products, action)
})

const AppProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState)

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  )
}

export { AppProvider, AppContext }
