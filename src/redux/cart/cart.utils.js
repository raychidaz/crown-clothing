export const addItemToCart = (cartItems, cartItemToAdd) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToAdd.id,
  );

  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === cartItemToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem,
    );
  }

  return [...cartItems, { ...cartItemToAdd, quantity: 1 }];
};

export const removeItemFromCart = (cartItems, cartItemToRemove) =>
  cartItems.flatMap((cartItem) => {
    return cartItem.id !== cartItemToRemove.id
      ? cartItem
      : cartItem.quantity === 1
      ? []
      : { ...cartItem, quantity: cartItem.quantity - 1 };
  });

/* if the cartItem ID is NOT the same as  the cartItemToRemove ID we just KEEP/return the cartItem 
  
  else
  
  if the cartItem ID  (IS) the same as  the cartItemToRemove ID we 
  we are removing One cart Item

  if existing cartItem quantity is = 1, we will return an empty array that gets flattened thereby filtering out the remaining 1 cart item 
  
  otherwise decrease the quantity and keep every other cart item the same because they dont need to be modified

  */
