type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
      type: Key
    }
    : {
      type: Key
      payload: M[Key]
    }
}

export enum Types {
  Add = 'ADD_PRODUCT',
  Remove = 'REMOVE_PRODUCT'
}

interface Product {
  id: number
  name: string
  price: number
  quantity: number
  totalPrice: number
}

interface ProductPayload {
  [Types.Add]: {
    id: number
    name: string
    price: number
  }
  [Types.Remove]: {
    id: number
  }
}

export type ProductActions = ActionMap<ProductPayload>[keyof ActionMap<ProductPayload>]

export const productReducer = (state: Product[], action: ProductActions): Product[] => {
  const itemExists = state.find(product => product.id === action.payload.id)

  switch (action.type) {
    case 'ADD_PRODUCT':
      if (itemExists != null) {
        return state.map(product =>
          product.id === itemExists.id
            ? {
              ...product,
              quantity: product.quantity + 1,
              totalPrice: product.price * (product.quantity + 1)
            } : product
        )
      }

      return [
        ...state,
        {
          id: action.payload.id,
          name: action.payload.name,
          price: action.payload.price,
          quantity: 1,
          totalPrice: action.payload.price
        }
      ]
    case 'REMOVE_PRODUCT':
      if ((itemExists != null) && itemExists.quantity > 1) {
        return state.map(product =>
          product.id === itemExists.id
            ? {
              ...product,
              quantity: product.quantity - 1,
              totalPrice: product.price * (product.quantity - 1)
            } : product
        )
      }

      return [
        ...state.filter(product => product.id !== action.payload.id)
      ]
    default:
      return state
  }
}
