import { useApolloClient } from '@apollo/client'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { AppLayout, Button } from '../components'
import { GQL_QUERY_LOGIN } from '../graphql/documents/user'

type LoginInput = {
  name: string
  password: string
}

const LogIn: NextPage = () => {
  const router = useRouter()
  const client = useApolloClient()

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<LoginInput>({
    defaultValues: {
      name: 'gouflv',
      password: '123',
    },
  })

  const onSubmit: SubmitHandler<LoginInput> = async data => {
    const {
      data: { login },
    } = await client.query({
      query: GQL_QUERY_LOGIN,
      variables: data,
    })
    localStorage.setItem('token', login.access_token)
    router.push('/')
  }

  return (
    <AppLayout>
      <div className="max-w-lg mx-auto shadow-sm border bg-white rounded px-12 py-8">
        <h1 className="text-3xl text-center mb-8">Welcome to KeepComing</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 gap-6">
            <label className="block">
              <span className="block mb-1 text-gray-600">Username</span>
              <input
                type="text"
                className="
                  block w-full border-transparent bg-gray-50 rounded-md text-lg
                  focus:border-gray-500 focus:bg-white focus:ring-0
                "
                {...register('name', { required: true })}
              />
              {errors.name?.type === 'required' && (
                <div className="text-red-600">Username is required</div>
              )}
            </label>
            <label className="block">
              <span className="block mb-1 text-gray-600">Password</span>
              <input
                type="password"
                className="
                  block w-full border-transparent bg-gray-50 rounded-md text-lg
                  focus:border-gray-500 focus:bg-white focus:ring-0
                "
                {...register('password', { required: true })}
              />
              {errors.password?.type === 'required' && (
                <div className="text-red-600">Password is required</div>
              )}
            </label>
            <div>
              <Button type="primary" size="lg" block htmlType="submit">
                Continue
              </Button>
            </div>
          </div>
        </form>
      </div>
    </AppLayout>
  )
}

export default LogIn
