import { createSlice } from "@reduxjs/toolkit";


const creditCardSlice = createSlice({
    name: 'credit',
    initialState: {
        items: [],
    },
    reducers: {
        addCreditCard(state, action) {
            const newCart = action.payload;
            if (Array.isArray(state.items)) {
                const existingItem = state.items.find(item => item.cardNumber === newCart.cardNumber);

                if (!existingItem) {
                    state.items.push({
                        cardNumber: newCart.cardNumber,
                        cardholderName: newCart.cardholderName,
                        expirationDate: newCart.expirationDate,
                        cvc: newCart.cvc,
                    });
                }
                const updateCards = [...state.items]
                sessionStorage.setItem('credit', JSON.stringify(updateCards))
                console.log("Kart eklendi: ", newCart);  // Kart eklenirken log alıyoruz
            } else {
                console.log("Kart zaten mevcut.");
            }
        },
        removeCreditCart(state, action) {
            const cart = action.payload
            state.items = state.items.filter(items => !(items.cardNumber === cart.cardNumber))
            sessionStorage.setItem('credit', JSON.stringify(state.items))
        }
    }
})
export const { addCreditCard, removeCreditCart } = creditCardSlice.actions;
export default creditCardSlice.reducer;