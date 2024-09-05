import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import Auth from '../utils/auth';
import { Form, Button } from 'react-bootstrap';

const LoginForm = () => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [loginUser] = useMutation(LOGIN_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({ ...formState, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await loginUser({ variables: { ...formState } });
      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Form onSubmit={handleFormSubmit}>
      <Form.Group>
        <Form.Label>Email:</Form.Label>
        <Form.Control
          type="email"
          name="email"
          placeholder="Your email address"
          value={formState.email}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Password:</Form.Label>
        <Form.Control
          type="password"
          name="password"
          placeholder="Your password"
          value={formState.password}
          onChange={handleChange}
        />
      </Form.Group>
      <Button type="submit">Log In</Button>
    </Form>
  );
};

export default LoginForm;
