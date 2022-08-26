import { gql } from '@apollo/client';

export const GET_PRODUCTS = gql`
    {
        categories {
            name
            products {
                id
                name
                brand
                attributes {
                    id
                    name
                    type
                    items {
                        id
                        value
                        displayValue
                    }
                }
                description
                gallery
                prices {
                    amount
                    currency {
                        label
                        symbol
                    }
                }
                category
                inStock
            }
        }
    }
`;
export const GET_PRODUCT = id => gql`
{
product(id: "${id}") {
    id
    name
    brand
    attributes{
    id
    name
    type
    items{
        id
        value
        displayValue
    }
    }
    description
    gallery
    prices{
    amount
    currency{
        label
        symbol
    }
    }
    category
    inStock
}
}
`;
export const GET_CATEGORIES = gql`
    {
        categories {
            name
        }
    }
`;
export const GET_CURRNCIES = gql`
    {
        currencies {
            label
            symbol
        }
    }
`;
