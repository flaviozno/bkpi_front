import React from 'react'
import { useHistory } from 'react-router-dom';
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, useFieldArray } from 'react-hook-form'
import { supabase } from '../../lib/supabase'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';

const createUserFormSchema = z.object({
  avatar: z.instanceof(FileList).transform(list => list.item(0)).refine(file => file?.size <= 8 * 1024 * 1024, 'O arquivo precisa ter no máximo 8Mb!'),
  name: z.string().nonempty(' O nome é obrigatŕio!').transform(name => {
    return name.trim().split(' ').map(word => {
      return word[0].toUpperCase().concat(word.substring(1))
    }).join(' ')
  }),
  email: z.string().nonempty(' O e-mail é obrigatório!').email('Formato inválido').toLowerCase(),
  password: z.string().min(6, '6 no mínimo!'),
  foods: z.array(z.object({
    title: z.string().nonempty(' O titulo é obrigatório!'),
  })).min(1, 'Adicione alguma comida pfv!').refine(data => {
    if (data.length === 1) return true
    else
      for (let i = 0; i < data.length; i++) {
        for (let j = i + 1; j < data.length; j++)
          if (data[i]?.title === data[j]?.title)
            return false
          else return true
      }
  }
    , 'Existem elementos duplicados!')
})

export default function RegisterForm() {
  const history = useHistory();
  const uuid = uuidv4();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control } = useForm({
      mode: "onChange",
      shouldFocusError: true,
      reValidateMode: "onChange",
      resolver: zodResolver(createUserFormSchema)
    })


  const { fields, append, remove } = useFieldArray({
    control,
    name: 'foods',
  })

  const addNewTech = () => {
    append({ title: '', knowledge: 1 })
  }
  const createUser = async (data) => {
    const foods_ = []
    data.foods.map(dt => foods_.push(dt.title))
    let response = null
    const id = uuid
    if (data.avatar)
      response = await supabase.storage.from('react').upload(`${data.avatar.name}+${id}`, data.avatar)
    if (response.error) {
      toast.error('Ocorreu um erro ao carregar sua foto!', {
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
    else {
      try {
        response = await axios.post('http://127.0.0.1:8000/users', {
          name: data.name,
          email: data.email,
          password: data.password,
          avatar_url: response.data.path,
          foods: foods_
        })
      } catch (error) {
        toast.error(error.response.data.detail, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        await supabase.storage.from('react').remove(`${data.avatar.name}+${id}`)
      } finally {
        history.push('/login')
      }
    }
  }


  return (
    <Container>
      <ToastContainer />
      <Title>Register</Title>
      <Form
        onSubmit={handleSubmit(createUser)}
      >
        <FormGroup>
          <input
            id='inputFile'
            type='file'
            accept='image/*'
            {...register('avatar')}
          />
          {errors.avatar && <ErrorMessage>{errors.avatar.message}</ErrorMessage>}
        </FormGroup>
        <FormGroup>
          <Label htmlFor=''> Nome </Label>
          <Input
            type='name'
            {...register('name')}
          />
          {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
        </FormGroup>
        <FormGroup>
          <Label htmlFor=''> E-mail </Label>
          <Input
            type='email'
            {...register('email')}
          />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </FormGroup>

        <FormGroup>
          <Label htmlFor=''> Senha </Label>
          <Input
            type='password'
            {...register('password')}
          />
          {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
        </FormGroup>



        <FormGroup>
          <Label htmlFor=''> Comidas favoritas </Label>
          <Button type='Button' onClick={addNewTech} className='bg-zinc-100 p-1 rounded'> Adicionar </Button>
        </FormGroup>
        {errors.foods && <ErrorMessage>{errors.foods.message}</ErrorMessage>}
        {fields.map((field, index) => {
          return (
            <Wrapper key={field.id}>
              <Input
                type='text'
                {...register(`foods.${index}.title`)}
              />
              {errors.foods?.[index]?.title && <ErrorMessage>{errors.foods?.[index]?.title.message}</ErrorMessage>}
              <RemoveButton type='Button' onClick={() => remove(index)}> X </RemoveButton>
            </Wrapper>
          )
        })}

        <Button
          type='submit'
        >
          Register
        </Button>
      </Form>
    </Container>
  )
}

const Wrapper = styled.div`
  display: flex;
  margin-bottom: 10px;
  *{
    margin-right: 10px;
  }
`

const RemoveButton = styled.button`
  display: flex;
  width: 50px;
  height: 50px;
  align-items: center;
  text-align: center;
  justify-content: center;
  font-size: 1.2rem;
  background-color: #FF3535;
  color: #fff;
  border-radius: 10px;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #fd4444;
  }
`

const Container = styled.div`
  background-color: #bbf7d0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
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
