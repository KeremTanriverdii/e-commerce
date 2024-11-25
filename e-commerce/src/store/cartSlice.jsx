import { createSlice } from '@reduxjs/toolkit'
import { Cookies } from 'react-cookie';
const cookies = new Cookies();

const getInitialCart = () => {
    // Get initializion and get cookie 'cart'
    const cookieCart = cookies.get('cart');
    if (cookieCart) {
        return cookieCart
    } else {
        return [];
    }
}
const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: getInitialCart(),
        totalQuantity: getInitialCart().reduce((acc, item) => acc + item.quantity, 0),
        // Uniqie id number
        uniqueItemCount: new Set(getInitialCart().map(item => `${item.id}-${item.selectedSize}`)).size,
    },
    reducers: {
        // Product and values add for cookie
        addToCart: (state, action) => {
            const newItem = action.payload;
            const existingItem = state.items.find(item =>
                item.id === newItem.id &&
                item.selectedSize === newItem.selectedSize &&
                newItem.selectedColor === newItem.selectedColor)
            console.log(existingItem)
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.items.push({
                    id: newItem.id,
                    name: newItem.name,
                    price: newItem.price,
                    imageUrl: newItem.imageUrl,
                    quantity: newItem.quantity || 1,
                    slug: newItem.slug,
                    selectedSize: newItem.selectedSize,  // Beden
                    selectedColor: newItem.selectedColor,  // Renk
                    variantId: newItem.variantId,
                    variantImageUrl: newItem.variantImageUrl
                });
            }
            const limitedData = state.items.map(item => ({
                id: item.id,
                name: item.name,
                selectedSize: item.selectedSize,
                color: item.selectedColor,
                price: item.price,
                slug: item.slug,
                quantity: item.quantity,
                variantImageUrl: item.variantImageUrl
            }))

            state.totalQuantity = state.items.reduce((acc, item) => acc + item.quantity, 0);
            state.uniqueItemCount = new Set(state.items.map(item => `${item.variantId}-${item.id}-${item.selectedSize}`)).size
            // Save cookies
            cookies.set('cart', JSON.stringify(limitedData), {
                path: '/', expires:
                    new Date(Date.now() + 604800000)
            })
        },
        // Delete product basket and cookie and return empty array
        removeToCart(state, action) {
            const { id,selectedSize } = action.payload

            state.items = state.items.filter(item => item.id !== id && item.selectedSize !== selectedSize);

            const limitedData = state.items.map(item => ({
                id: item.id,
                name: item.name,
                size: item.size,
                color: item.color,
                imageUrl: item.imageUrl,
                quantity: item.quantity
            }));

            state.totalQuantity = state.items.reduce((acc, item) => acc + item.quantity, 0);
            state.uniqueItemCount = new Set(state.items.map(item => `${item.id}-${item.selectedSize}`)).size;
            // Save cookies
            cookies.set('cart', JSON.stringify(limitedData), { path: '/', expires: new Date(Date.now() + 604800000) });
        },
        // Reduce product quantity
        reduceQuantity(state, action) {
            const newItem = action.payload;
            const existingItem = state.items.find(item => item.id === newItem.id && item.selectedSize === newItem.selectedSize)
            if (existingItem && existingItem.quantity > 1) {
                existingItem.quantity -= 1;
            }
            const limitedData = state.items.map(item => ({
                id: item.id,
                name: item.name,
                selectedSize: item.selectedSize,
                quantity: item.quantity,
                imageUrl: item.imageUrl
            }))
            state.totalQuantity = state.items.reduce((acc, item) => acc + item.quantity, 0);
            // Save Cookie
            cookies.set('cart', JSON.stringify(limitedData), {
                path: '/', expires:
                    new Date(Date.now() + 604800000)
            })
        },
        // Delete all product,cookie and return empty array
        clearCart(state) {
            state.items = []
            state.totalQuantity = 0
            state.uniqueItemCount = 0
            cookies.remove('cart')
        }
    },
});
// export to all redux funcinality
export const { addToCart, removeToCart, clearCart, reduceQuantity } = cartSlice.actions;
export default cartSlice.reducer;