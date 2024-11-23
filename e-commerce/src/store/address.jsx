import { createSlice } from "@reduxjs/toolkit";

const addRess = createSlice({
    name: 'address',
    initialState: {
        items: [],
        selectedAddressDefault: null,
    }, reducers: {
        addAddress(state, action) {
            const newAddress = action.payload
            const existingItem = state.items.find(item => item.streetAddress === newAddress.streetAddress);
            console.log('Yeni ürün', newAddress)
            if (!existingItem) {
                state.items.push({
                    district: newAddress.district,
                    addressName: newAddress.addressName,
                    streetAddress: newAddress.streetAddress,
                    city: newAddress.city,
                    zipCode: newAddress.zipCode,
                    country: newAddress.country
                })
                const updateAddres = [...state.items];
                sessionStorage.setItem('address', JSON.stringify(updateAddres))
                console.log('Address log successful', newAddress)
            } else {
                console.log('address log is failaure')
            }
        },
        selectAddressRedux(state, action) {
            state.selectedAddressDefault = action.payload
        },
        removeAddress(state, action) {
            const address = action.payload;
            state.items = state.items.filter(items => items.streetAddress !== address.streetAddress)

            sessionStorage.setItem('address', JSON.stringify(state.items))
        }
    }
})

export const { addAddress, selectAddressRedux, removeAddress } = addRess.actions;
export default addRess.reducer