const setProducts = (products) => {
    return {
        type: 'SET_PRODUCTS',
        products
    }
}
const setActiveProduct = (product) => {
    return {
        type: 'SET_ACTIVE_PRODUCT',
        product
    }
}

export { setProducts, setActiveProduct };