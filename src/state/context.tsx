import { createContext, Dispatch } from 'react'
import { productReducer, ProductActions } from './reducer'
interface ComputedProduct {
  id: number
  name: string
  price: number
  quantity: number
  totalPrice: number
}

interface InitialState {
  products: ComputedProduct[]
}

export const initialState = {
  products: []
}

export const AppContext = createContext<{
  state: InitialState
  dispatch: Dispatch<ProductActions>
}>({
  state: initialState,
  dispatch: () => null
})

export const mainReducer = ({ products }: InitialState, action: ProductActions): { products: ComputedProduct[] } => ({
  products: productReducer(products, action)
})
