import React, { useState } from 'react'
import 'react-datepicker/dist/react-datepicker.css'
import { ErrorMessage, Field, Formik } from 'formik'
import DatePicker from 'react-datepicker'
import { format } from 'date-fns'
import * as Yup from 'yup'
import { Button } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom'
import { addCreditCard } from '../store/creditCartSlice'

function CreditCart({ onBackToOffCanvasMenuA }) {
    const [startDate, setStartDate] = useState(null)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const validationSchema = Yup.object({
        cardNumber: Yup.string()
            .required('Required')
            .matches(/^[0-9]{16}$/, `Must be exactly 16 digits`),
        expirationDate: Yup.string()
            .required('Experation date is required')
            .matches(/^(0[1-9]|1[2])/g, 'Months 1 or 12 must be between')
            .matches(/\d{2}$/, 'Years field must be 2 digits'),
        cvc: Yup.string()
            .required('CVC is required')
            .matches(/^[0-9]{3}$/, `CVC must be 3 digits`),
        cardholderName: Yup.string()
            .required('Cardholder name is required')
            .matches(/^[a-zA-Z\s]+$/, 'Cardholder name must only contain letters and spaces'),
    })


    return (
        <Formik
            initialValues={{
                cardNumber: '',
                expirationDate: '',
                cvc: '',
                cardholderName: '',
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
                dispatch(addCreditCard(values))
                onBackToOffCanvasMenuA()
                console.log('Form values', values)
                console.log('dispatch is programming')
            }}
        >
            {({ handleSubmit, values, setFieldValue }) => (
                <form onSubmit={handleSubmit}
                >
                    <h2>Yeni Kart</h2>
                    <div className=''>
                        {/* Card number input field */}
                        <Field
                            name="cardNumber"
                            type="text"
                            maxLength="16"
                            placeholder="Kart Numarası"
                            values={values.cardNumber}
                            className="w-100 mb-2"
                        // onChange={(e) => {
                        //     const formattedValue = e.target.value
                        //         .replace(/\D/g, '')
                        //         .slice(0, 16)
                        //         .replace(/(\d{4})(?=\d)/g, '$1 ')
                        //         .trim();
                        //     setFieldValue('cardNumber', formattedValue);
                        // }}
                        />
                        <ErrorMessage name="cardNumber" component="div" />

                        {/* ExpirationDate input field with inline formatting */}
                        <Field name="expirationDate">
                            {({ field, form }) => (
                                <DatePicker
                                    maxLength='5'
                                    className="w-30"
                                    selected={startDate}
                                    onChange={(date) => {
                                        setStartDate(date);
                                        form.setFieldValue('expirationDate', format(date, 'MM/yy'));
                                    }}
                                    dateFormat="MM/yy"
                                    showMonthYearPicker
                                    placeholderText="MM/YY"

                                >
                                    <ErrorMessage name="expirationDate" component="div" />
                                </DatePicker>

                            )}
                        </Field>

                        {/* CVC input field */}
                        <Field
                            name='cvc'
                            maxLength='3'
                            placeholder='CVC'
                            className='w-50 ms-auto' />
                        <ErrorMessage name="cvc" component="div" />

                    </div>
                    {/* Cardholder's Name input field */}
                    <Field name="cardholderName"
                        placeholder='Cardholder Name'
                        className='w-100 mt-2' />
                    <ErrorMessage name="cardholderName" component="div" />
                    {/* Card Save Button */}
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

export default CreditCart