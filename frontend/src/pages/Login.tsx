import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { login as AWSLogin, storeUser } from '../tools/Auth';
import ErrorMessage from '../components/Error';

type LoginField = {
  username: string;
  password: string;
};

export default function Login() {
  let history = useHistory();
  const { register, handleSubmit } = useForm<LoginField>();
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (data: LoginField) => {
    setError(null);
    try {
      const token = await AWSLogin(data);
      storeUser({ username: data.username, token: token as string });
      history.push('/');
    } catch (error) {
      if (error.message) {
        setError(error.message);
      } else {
        setError('');
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen ">
      <div className="w-full max-w-xs">
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="mb-4">
            {process.env.APP_AWS || 'Gotagaaaaa'}
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Username"
              name="username"
              ref={register}
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="******************"
              name="password"
              ref={register}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Sign In
            </button>
            <button
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={() => history.push('/register')}
            >
              Register
            </button>
          </div>
          {error && <ErrorMessage message={error} />}
        </form>
      </div>
    </div>
  );
}
