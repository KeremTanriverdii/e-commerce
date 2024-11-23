import React from 'react'
import { ErrorMessage, Field, Formik } from 'formik'
import * as Yup from 'yup'
import { useDispatch } from 'react-redux'
import { addAddress } from '../store/address'
import { Navigate } from 'react-router-dom'
import { Button } from 'react-bootstrap'

function Address({ onBackToOffCanvasMenuB }) {
    const dispatch = useDispatch()

    const validationSchema = Yup.object({
        addressName: Yup.string()
            .required(''),
        streetAddress: Yup.string()
            .required('Street address is required'),
        district: Yup.string()
            .required('State is required'),
        zipCode: Yup.string()
            .required('Zip Code field is required')
            .matches(/^\d{5}$/, '5 digit number needs to be entered'),
        country: Yup.string()
            .required('This field is required'),
        city: Yup.string()
            .required('City is required')
    })

    return (
        <Formik
            initialValues={{
                addressName: "",
                district: '',
                streetAddress: '',
                city: '',
                zipCode: '',
                country: ''
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
                dispatch(addAddress(values))
                onBackToOffCanvasMenuB()
            }}
        >
            {({ handleSubmit, values }) => (
                <form onSubmit={handleSubmit}
                >
                    <h2>New Address</h2>
                    <div className=''>
                        <Field
                            name="addressName"
                            type="text"
                            placeholder="Addres Name"
                        />
                        <ErrorMessage name='addressName' component="div" />
                        {/* Street Address input field */}
                        <Field
                            name="streetAddress"
                            type="text"
                            placeholder="Street Address"
                            className="w-100 mb-2"

                        />
                        <ErrorMessage name="streetAddress" component="div" />
                        {/* City input Field */}
                        <Field
                            name="city"
                            type="text"
                            placeholder="City"
                            className="w-100 mb-2"

                        />
                        <ErrorMessage name="city" component="div" />

                        {/* Zip Code input field with inline formatting */}
                        <Field
                            name='zipCode'
                            maxLength={5}
                            placeholder='Zip Code'
                            className="w-30"
                        />
                        <ErrorMessage name="zipCode" component="div" />
                        <Field
                            name='district'
                            placeholder='district'
                        />
                        <ErrorMessage name="district" component="div" />
                        {/* Country input field */}
                        <Field
                            name='country'
                            placeholder='Country'
                            className='w-50 ms-auto' />
                        <ErrorMessage name="country" component="div" />

                    </div>

                    {/* Address Save Button */}

                    <Button
                        type='submit'
                        size='lg'
                        variant='warning'
                        className='w-100 mt-3'
                    >
                        Save Card
                    </Button>
                </form>
            )}

        </Formik>
    )
}

export default Address