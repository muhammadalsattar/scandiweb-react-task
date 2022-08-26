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

const setLoadedProducts = (loadedProducts) => {
    return {
        type: 'SET_LOADED_PRODUCTS',
        loadedProducts
    }
}

export { setProducts, setActiveProduct, setLoadedProducts };