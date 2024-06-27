import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useLoginMutation, useAdminLoginMutation } from '../../slices/usersApiSlice.js';
import { setAdminCredentials } from '../../slices/authSlice.js';
import { toast } from 'react-toastify';
import FormContainer from '../../components/FormContainer.jsx';
import Spinner from '../../components/SpinnerComponent.jsx';

const LoginPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [login, { isLoading }] = useLoginMutation();
    const [adminLogin, { isLoading: isAdminLoading }] = useAdminLoginMutation();

    const { userInfo, adminInfo } = useSelector(state => state.auth);

    useEffect(() => {
        if (adminInfo) {
            navigate('/admin');
        }
    }, [userInfo, adminInfo, navigate]);

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            if (true) {
                const res = await adminLogin({ email, password }).unwrap();
                dispatch(setAdminCredentials({ ...res }));
                navigate('/admin');
            }
        } catch (err) {
            toast.error(err.data.message, {
                autoClose: 2000,
            });
        }
    };

    if (isLoading || isAdminLoading) {
        return <Spinner />;
    }

    return (
        <FormContainer>
            <h1>Admin Sign In</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group className='my-2' controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        type='email'
                        placeholder='Enter email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group className='my-2' controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Enter password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Button type='submit' variant='primary' className='mt-3'>
                    Sign In
                </Button>
            </Form>
        </FormContainer>
    );
};

export default LoginPage;
