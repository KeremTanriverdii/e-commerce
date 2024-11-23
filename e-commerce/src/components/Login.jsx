import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import * as Yup from 'yup';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { Button, Card, Col, Container, Row } from 'react-bootstrap'; // Bootstrap Layout
import { useState } from 'react';
import { auth, provider } from '../store/Firebase';
import '../css/Card.css'; // Styling dosyası
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons'

const LoginPage = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);
    const navigate = useNavigate();

    const LoginValidationSchema = Yup.object({
        email: Yup.string().email('Invalid email').required('Required Field'),
        password: Yup.string().min(8, 'Password character must be less than 8').required('Required Field'),
    });

    const initialValues = {
        email: '',
        password: '',
    };

    const handleGoogleSignIn = async () => {
        try {
            const userCredential = await signInWithPopup(auth, provider);
            const user = userCredential.user;
            navigate('/');
            setUser(user);
        } catch (error) {
            console.log('Error Google Login: ', error);
        }
    };

    const handleLogin = async (values) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, values.email, values.password);
            const user = userCredential.user;
            console.log(user);
            navigate('/');
        } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            if (errorCode === 'auth/user-not-found') {
                alert('User not found');
            } else if (errorCode === 'auth/wrong-password') {
                alert('Wrong Password');
            }
        }
    };

    return (
        <Row className="justify-content-center align-items-center min-vh-100"> {/* Vertical center */}
            <Col md={6} lg={12} className='d-flex w-100'> {/* Responsive width */}
                <Card border="white" className="card-login w-100">
                    <Row className="g-4"> {/* Grid layout for two sections */}
                        {/* Sol taraf - Giriş formu */}
                        <Col md={6} lg={6} className="p-5">

                            <Formik validationSchema={LoginValidationSchema} initialValues={initialValues} onSubmit={handleLogin}>
                                {({ handleSubmit }) => (
                                    <Form onSubmit={handleSubmit}>
                                        <h3>Login</h3>
                                        <div>
                                            <label htmlFor="email">E-mail</label>
                                            <Field type="email" id="email" name="email" className="form-control mb-3" />
                                            <ErrorMessage name="email" component="div" className="error-message" />
                                        </div>
                                        <div>
                                            <label htmlFor="password">Password</label>
                                            <Field type="password" id="password" name="password" className="form-control mb-3" />
                                            <ErrorMessage name="password" component="div" className="error-message" />
                                        </div>
                                        <Button type="submit" variant="outline-primary" className="w-100 mb-3">Sign In</Button>

                                        <div className="text-center">or</div>

                                        <div className='d-flex justify-content-center'>
                                            <Button type="button" onClick={handleGoogleSignIn}
                                                className="btn-social my-3">
                                                <FontAwesomeIcon icon={faGoogle} size='lg' />
                                            </Button>
                                        </div>
                                    </Form>
                                )}
                            </Formik>
                        </Col>

                        {/* Sağ taraf - Mor background */}
                        <Col md={6} lg={6} className="d-flex flex-column justify-content-center bg-gradient-primary text-white p-5">
                            <h3 className="text-white">Welcome Back</h3>
                            <p>Simply Create your account by clicking the Signup Button</p>
                            <Link to="/register">
                                <Button variant="outline-light">Sign Up</Button>
                            </Link>
                        </Col>

                    </Row>
                </Card>
            </Col>
        </Row>
    );
};

export default LoginPage;
