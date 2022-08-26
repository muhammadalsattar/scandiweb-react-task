const setCategories = categories => {
    return {
        type: 'SET_CATEGORIES',
        categories,
    };
};
const setDefaultCategory = category => {
    return {
        type: 'SET_DEFAULT_CATEGORY',
        category,
    };
};

export { setCategories, setDefaultCategory };
