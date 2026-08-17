import {it, expect, descibe, vi} from 'vitest';
import { Product } from './Product';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import axios from 'axios';

vi.mock('axios');

describe('Product component', ()=>{
    it('displays the product details correctly', ()=>{
        let i =  {
                    id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                    image: "images/products/athletic-cotton-socks-6-pairs.jpg",
                    name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
                    rating: {
                        stars: 4.5,
                        count: 87
                    },
                    priceCents: 1090,
                    keywords: ["socks", "sports", "apparel"]
                }
        const loadcart = vi.fn();
        render(<Product i={i} loadcart={loadcart} />)

        expect(screen.getByText('Black and Gray Athletic Cotton Socks - 6 Pairs')).toBeInTheDocument();

        expect(screen.getByTestId('product-image')).toHaveAttribute('src', 'images/products/athletic-cotton-socks-6-pairs.jpg');
        expect(screen.getByTestId('product-rating-stars-img')).toHaveAttribute('src', `images/ratings/rating-${4.5 * 10}.png`)
    })

    it('adds a product to a cart', async()=>{
    let i =  {
                    id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                    image: "images/products/athletic-cotton-socks-6-pairs.jpg",
                    name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
                    rating: {
                        stars: 4.5,
                        count: 87
                    },
                    priceCents: 1090,
                    keywords: ["socks", "sports", "apparel"]
                }
        const loadcart = vi.fn();
        render(<Product i={i} loadcart={loadcart} />)

        const user = userEvent.setup();
        const add_to_cart_button = screen.getByTestId('add-to-cart-test');
        await user.click(add_to_cart_button);

        expect(axios.post).toHaveBeenCalledWith(
            '/api/cart-items',
            {
                ProductId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity: 1
            }
        )
    })
})