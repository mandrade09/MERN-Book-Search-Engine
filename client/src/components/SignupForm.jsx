import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../graphql/mutations';
import Auth from '../utils/auth';
import { Form, Button } from 'react-bootstrap';

const SignupForm = () => {
  const [formState, setFormState] = useState({ username: '', email: '', password: '' });
  const [addUser] = useMutation(ADD_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({ ...formState, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await addUser({ variables: { ...formState } });
      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Form onSubmit={handleFormSubmit}>
      <Form.Group>
        <Form.Label>Username:</Form.Label>
        <Form.Control
          type="text"
          name="username"
          placeholder="Your username"
          value={formState.username}
          onChange={handleChange}
        />
      </Form.Group>
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
      <Button type="submit">Sign Up</Button>
    </Form>
  );
};

export default SignupForm;
