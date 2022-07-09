const addToCart = (product) => {
    return {
        type: 'ADD_TO_CART',
        product
    }
}
const removeFromCart = (id) => {
    return {
        type: 'REMOVE_FROM_CART',
        id
    }
}

const updateCartItem = (product) => {
    return {
        type: 'UPDATE_CART_ITEM',
        product
    }
}

export { addToCart, removeFromCart, updateCartItem };