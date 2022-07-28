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

export { addToCart, removeFromCart };