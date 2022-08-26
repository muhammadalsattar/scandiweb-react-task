const currencies = [
    {
        label: 'USD',
        symbol: '$',
    },
    {
        label: 'GBP',
        symbol: '£',
    },
];
const categories = [
    {
        name: 'category1',
    },
    {
        name: 'category2',
    },
];
const attributes = [
    {
        id: 'Size',
        name: 'Size',
        type: 'text',
        items: [
            {
                id: 40,
                value: '40',
                displayValue: '40',
            },
        ],
    },
    {
        id: 'Color',
        name: 'Color',
        type: 'swatch',
        items: [
            {
                id: 'red',
                value: 'red',
                displayValue: 'Red',
            },
        ],
    },
];
const gallery = [
    'https://dummyimage.com/600x400/000/fff',
    'https://dummyimage.com/600x400/000/ggg',
    'https://dummyimage.com/600x400/000/hhh',
];
const prices = [
    {
        amount: 518.47,
        currency: currencies[0],
    },
    {
        amount: 372.67,
        currency: currencies[1],
    },
];
const products = [
    {
        id: '1',
        name: 'product1',
        brand: 'brand1',
        attributes,
        description: '<p>dummy text</p>',
        gallery,
        prices,
        category: categories[0],
        inStock: true,
        quantity: 1,
        selectedAttr: [{ name: 'Size', value: '40' }],
    },
    {
        id: '2',
        name: 'product2',
        brand: 'brand2',
        attributes,
        description: '<p>dummy text</p>',
        gallery,
        prices,
        category: categories[1],
        inStock: false,
        quantity: 1,
        selectedAttr: [{ name: 'Color', value: 'red' }],
    },
    {
        id: '3',
        name: 'product3',
        brand: 'brand3',
        attributes,
        description: '<p>dummy text</p>',
        gallery,
        prices,
        category: categories[0],
        inStock: false,
        quantity: 1,
        selectedAttr: [{ name: 'Size', value: '41' }],
    },
    {
        id: '4',
        name: 'product4',
        brand: 'brand4',
        attributes,
        description: '<p>dummy text</p>',
        gallery,
        prices,
        category: categories[1],
        inStock: false,
        quantity: 1,
        selectedAttr: [{ name: 'Color', value: 'orange' }],
    },
    {
        id: '5',
        name: 'product5',
        brand: 'brand5',
        attributes,
        description: '<p>dummy text</p>',
        gallery,
        prices,
        category: categories[0],
        inStock: true,
        quantity: 1,
        selectedAttr: [{ name: 'Size', value: '42' }],
    },
    {
        id: '6',
        name: 'product6',
        brand: 'brand6',
        attributes,
        description: '<p>dummy text</p>',
        gallery,
        prices,
        category: categories[1],
        inStock: false,
        quantity: 1,
        selectedAttr: [{ name: 'Color', value: 'green' }],
    },
];

export const initialState = {
    currencies,
    categories,
    products,
};
