import { Button, Form, Input, message, notification } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { loginUserAPI } from '../../services/api';
import { useState } from 'react';
const LoginPage = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const onFinish = async (values) => {
        setIsLoading(true);
        const { username , password } = values;
        const res = await loginUserAPI(username, password)
        
        if (res?.data) {
            localStorage.setItem('access_token', res.data.access_token);
            message.success('Đăng nhập người dùng thành công')
            navigate('/')
            setIsLoading(false);
        } else {
            notification.error({
                message: 'Error',
                description: res.message && res.message.length > 0 ? res.message[0] : res.message,
                duration: 5
            });
            setIsLoading(false);
        }
    }
    return (
        <div style={{ backgroundColor: '#f8f8f8', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div
                style={{
                    maxWidth: 400,
                    width: '100%',
                    backgroundColor: '#fff',
                    padding: '20px',
                    borderRadius: '10px',
                    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                }}
            >
                <h2 style={{ textAlign: 'center' }}>Đăng nhập</h2>
                <Form
                    style={{
                        width: '100%',
                    }}
                    layout="vertical"
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Username"
                        name="username"
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
                    <Button type="primary" htmlType="submit" loading={isLoading} disabled={isLoading}>{isLoading ? 'Loading...' : 'Login'}</Button>
                    <Form>
                        <p style={{ textAlign: 'center' }}>Don't have an account? <Link to='/register'>Register</Link></p>
                    </Form>
                </Form>
            </div>
        </div>
    )
}

export default LoginPage