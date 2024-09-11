const Storage = (cartItems) => {
  localStorage.setItem('cart', JSON.stringify(cartItems.length > 0 ? cartItems : []));
};

export const CartReducer = (state, action) => {
  let index = -1;
  if (action.payload) {
    index = state.cartItems.findIndex(x => x.id === action.payload.id);
  }

  let newItems = [...state.cartItems]; // Create a new array to avoid direct mutation

  switch (action.type) {
    case "Add":
    case "IncQty":
      if (index === -1) {
        // If the item does not exist, add it with a quantity of 1
        newItems = [...newItems, { ...action.payload, quantity: 1 }];
      } else {
        // If the item already exists, increase its quantity
        newItems[index] = { ...newItems[index], quantity: newItems[index].quantity + 1 };
      }
      break;

    case "Remove":
      if (index > -1) {
        // Remove the item by filtering out its id
        newItems = state.cartItems.filter(x => x.id !== action.payload.id);
      }
      break;

    case "DecQty":
      if (index > -1) {
        if (newItems[index].quantity > 1) {
          // Decrease quantity if it's more than 1
          newItems[index] = { ...newItems[index], quantity: newItems[index].quantity - 1 };
        }
      }
      break;

    case "Clear":
      // Clear all items
      newItems = [];
      break;

    default:
      return state;
  }

  // Update local storage and return new state
  Storage(newItems);
  return {
    ...state,
    cartItems: newItems
  };
};
