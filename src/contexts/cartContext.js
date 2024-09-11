import React, {createContext, useReducer} from "react";
import { CartReducer } from "./cartReducer";

export const CartContext = createContext();

const storage = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
const initialState = {cartItems: storage}

const CartContextProvider = ({children}) =>{
    const [state, dispatch] = useReducer(CartReducer, initialState);
    
    const addProduct = payload =>{
        dispatch({ type: "Add", payload});
        return state.cartItems;
    }

    const removeProduct = payload => {
        dispatch({ type: "Remove", payload})
        return state.cartItems;
    }

    const increaseQuantity = payload => {
        dispatch({ type: "IncQty", payload})
        return state.cartItems;
    }

    const decreaseQuantity = payload => {
        dispatch({ type: "DecQty", payload})
        return state.cartItems;
    }

    const clearBasket = () => {
        dispatch({ type: "Clear", payload: undefined})
        return state.cartItems;
    }

    const getItems = () => {
        return state.cartItems;
    }

    const contextValues = {
        addProduct,
        removeProduct,
        increaseQuantity,
        decreaseQuantity,
        clearBasket,
        getItems,
        ...state
    }

    return(
      <CartContext.Provider value={contextValues}>
        {children}
      </CartContext.Provider>
    )
}
export default CartContextProvider