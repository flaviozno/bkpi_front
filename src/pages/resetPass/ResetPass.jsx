import React from 'react';
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useParams, useHistory } from "react-router-dom";
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import styled from 'styled-components';

const createUserFormSchema = z.object({
  password: z.string().min(6, '6 no mínimo!'),
  confirmPassword: z.string().min(6, '6 no mínimo!')
}).refine((data) => {
  return data.password === data.confirmPassword;
}, "Passwords do not match!");


export default function ResetPass() {
  const {
    register,
    handleSubmit,
    formState: { errors } } = useForm({
      mode: "onChange",
      shouldFocusError: true,
      reValidateMode: "onChange",
      resolver: zodResolver(createUserFormSchema)
    })
  const history = useHistory()
  const { token } = useParams();
  const handleLogin = async (data) => {
    try {
      let response = await axios.post('https://flavio-api-bkpi.herokuapp.com/reset-password', {
        password: data.password,
        confirmPassword: data.confirmPassword,
        token: token
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
    } finally {
      history.push('/login')
    }
  }


  return (
    <Container>
      <ToastContainer />
      <Title>Reset Password</Title>
      <Form onSubmit={handleSubmit(handleLogin)}>
        <FormGroup>
          <Label htmlFor=''> Password </Label>
          <Input
            type='password'
            {...register('password')}
          />
          {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
        </FormGroup>
        <FormGroup>
          <Label htmlFor=''> Confirm Password </Label>
          <Input
            type='password'
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && <ErrorMessage>{errors.confirmPassword.message}</ErrorMessage>}
        </FormGroup>

        <ButtonWrapper>
          <Button type="submit">Reset</Button>
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
