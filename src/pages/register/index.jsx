import React, { useState } from 'react';
import { Button, Form, Input, message, notification } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { registerUserAPI } from '../../services/api';

const RegisterPage = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const onFinish = async (values) => {
        setIsLoading(true);
        const { fullName, email, password, phone } = values;
        const res = await registerUserAPI(fullName, email, password, phone)
        if (res?.data?._id) {
            message.success('Đăng kí người dùng thành công')
            navigate('/login')
            setIsLoading(false);
        } else {
            notification.error({
                message: 'Error',
                description: res.message && res.message.length > 0 ? res.message[0] : res.message,
                duration: 5
            });
            setIsLoading(false);
        }
    };

    return (
        <div style={{ backgroundColor: '#f8f8f8', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div
                style={{
                    maxWidth: 460,
                    width: '100%',
                    backgroundColor: '#fff',
                    padding: '20px',
                    borderRadius: '10px',
                    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                }}
            >
                <h2 style={{ textAlign: 'center' }}>Đăng kí người dùng mới</h2>
                <Form
                    style={{
                        width: '100%',
                    }}
                    layout="vertical"
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Form.Item
                        labelCol={{ span: 24 }}
                        label="Full Name"
                        name="fullName"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your full name!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your email!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item
                        label="Phone"
                        name="phone"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your phone!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Button type="primary" htmlType="submit" loading={isLoading} disabled={isLoading}>{isLoading ? 'Registering...' : 'Register'}</Button>
                    <Form>
                        <p style={{ textAlign: 'center' }}>Already have an account? <Link to='/login'>Login</Link></p>
                    </Form>
                </Form>
            </div>
        </div>
    );
};

export default RegisterPage;
