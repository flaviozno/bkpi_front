import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { z } from 'zod'
import { login } from '../redux/actions/user'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

const createUserFormSchema = z.object({
  email: z.string().nonempty(' O e-mail é obrigatório!').email('Formato inválido').toLowerCase(),
  password: z.string().min(6, '6 no mínimo!'),
})

export default function LoginPage() {
  const history = useHistory();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors } } = useForm({
      mode: "onChange",
      shouldFocusError: true,
      reValidateMode: "onChange",
      resolver: zodResolver(createUserFormSchema)
    })

  const handleLogin = async (data) => {
    try {
      const response = await axios.post('https://flavio-api-bkpi.herokuapp.com/login', {
        email: data.email,
        password: data.password
      })
      if (response && response.data?.access_token) {
        const userData = {
          user: {
            email: data.email,
            name: response.data.user_name,
            photo: response.data.user_photo,
            foods: response.data.foods
          },
          access_token: response.data.access_token
        }
        dispatch(login(userData))
      }
    } catch (error) {
      toast.error('Something is wrong!', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      })
    } finally {
      history.push('/')
    }
  }

  return (
    <Container>
      <Title>Login</Title>
      <Form onSubmit={handleSubmit(handleLogin)}>
        <FormGroup>
          <Label htmlFor="email">Email:</Label>
          <Input
            type="email"
            {...register('email')}
          />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </FormGroup>
        <FormGroup>
          <Label htmlFor="password">Password:</Label>
          <Input
            type="password"
            {...register('password')}
          />
          <Forget to="/forget-password">Forget password!</Forget>
          {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
        </FormGroup>
        <ButtonWrapper>
          <Button type="submit">Login</Button>
          <ButtonRedirect to="/register"> Register </ButtonRedirect>
        </ButtonWrapper>
      </Form>

    </Container>
  )
}

const ButtonWrapper = styled.div`
    display: flex;
    *{
        margin: 2px;
    }
`

const Container = styled.div`
  background-color: #bbf7d0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 1rem;

  :hover{
    cursor: pointer;
  }
`;

const ErrorMessage = styled.div`
  color: red;
  margin-bottom: 1rem;
`;

const Forget = styled(Link)`
  color: red;
  text-decoration: underline;
  cursor: pointer;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
`;

const Label = styled.label`
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  padding: 0.5rem;
  font-size: 1.2rem;
  border: none;
  border-radius: 0.5rem;
  width: 100%;
  &:focus {
    outline: none;
    border-color: transparent;
    box-shadow: none;
  }
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  font-size: 1.2rem;
  background-color: #22c55e;
  color: #fff;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;

  &:hover {
    background-color: #20b858;
  }
`;

const ButtonRedirect = styled(Link)`
  text-decoration: none;
  padding: 0.5rem 1rem;
  font-size: 1.2rem;
  background-color: #22c55e;
  color: #fff;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;

  &:hover {
    background-color: #20b858;
  }
`;
