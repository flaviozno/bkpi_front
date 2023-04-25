import React from 'react';
import { Link } from 'react-router-dom';
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import styled from 'styled-components';

const createUserFormSchema = z.object({
  email: z.string().nonempty(' O e-mail é obrigatório!').email('Formato inválido').toLowerCase(),
})

export default function ForgetPass() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control } = useForm({
      mode: "onChanges",
      shouldFocusError: true,
      reValidateMode: "onChange",
      resolver: zodResolver(createUserFormSchema)
    })

  const handleLogin = async (data) => {
    try {
      let response = await axios.post('http://127.0.0.1:8000/forgot-password', {
        email: data.email
      })
      if (response && response.data.message) {
        toast.success(response.data.message, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        })
      }
    } catch (error) {
      toast.error('Ocorreu um erro!', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }


  return (
    <Container>
      <ToastContainer />
      <Title>Recovery Password</Title>
      <Form onSubmit={handleSubmit(handleLogin)}>
        <FormGroup>
          <Label htmlFor="email">Email:</Label>
          <Input
            type="email"
            {...register('email')}
          />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </FormGroup>
        <ButtonWrapper>
          <Button type="submit">Send</Button>
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
