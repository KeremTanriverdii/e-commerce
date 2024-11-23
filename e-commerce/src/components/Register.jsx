import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth'
import React, { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import '../css/Card.css'
import { auth } from '../store/Firebase';

function Register() {

    const validationSchema = Yup.object({
        email: Yup.string()
            .required('Required Field')
            .test('is-email', 'Invalid email', (value) => {
                if (value) {
                    return value.includes('@') ? Yup.string().email().isValidSync(value) : true
                }
                return true
            })
        ,
        password: Yup.string()
            .min(8, 'Password character must be less than 8')
            .matches(/[a-z]/, 'Password requires at least one lowercase character')
            .matches(/[A-Z]/, 'Password requires at least one uppercase character')
            .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Şifre en az bir özel karakter içermeli')
            .required('Required Password'),
        rePassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Password must be matched')
            .required('Password repeat required')
    })

    const initialValues = {
        email: '',
        password: '',
        rePassword: ''
    }

    const handleSubmit = async (values) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password)
            const user = userCredential.user

            console.log('User created', user)
        } catch (error) {
            console.log('Kayıtta Hata', error.message)
        }
    }

    return (
        <>
            <Row className='align-items-center justify-content-center min-wh-100'>
                <Col md={4} lg={6} className='d-flex w-100' >
                    <Card border="white" className="w-100">
                        <Row className='g-0'>
                            <Col md={6} lg={6} className='p-4'>
                                <Formik
                                    initialValues={initialValues}
                                    validationSchema={validationSchema}
                                    onSubmit={handleSubmit}
                                >
                                    <Form>
                                        <h2 className='w-100 mb-3'>Register</h2>
                                        <div >
                                            <label htmlFor='E-mail'>E-mail</label>
                                            <Field type='email'
                                                id='email'
                                                name="email"
                                            />
                                            <ErrorMessage name="email" component="div" style={{ color: 'red' }} className="error-message" />
                                        </div>
                                        <div>
                                            <label htmlFor='password'>Password</label>
                                            <Field type='password'
                                                id='password'
                                                name="password"
                                            />
                                            <ErrorMessage name="password" component="div" style={{ color: 'red' }} className="error-message" />
                                        </div>
                                        <div>
                                            <label htmlFor='Re-password'>Re-password</label>
                                            <Field type='password'
                                                id='rePassword'
                                                name="rePassword" />
                                            <ErrorMessage name="rePassword" component="div" style={{ color: 'red' }} className="error-message" />
                                        </div>
                                        <Button type='submit' className='d-flex mx-auto'>Register</Button>
                                        <div className='mt-3'>
                                            <p>Do you have a account?</p>
                                        </div>
                                    </Form>

                                </Formik>
                            </Col>
                            <Col md={4} lg={6} className='d-flex flex-column justify-content-center bg-gradient-primary'>
                                <div>
                                    asd
                                </div>
                            </Col>


                        </Row>
                    </Card>
                </Col>
            </Row>
        </>

    )
}

export default Register