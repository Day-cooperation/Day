'use client';

import { signin } from '@/api/auth';
import Button from '@/components/Buttons/Button';
import MixedInput from '@/components/Input/MixedInput';
import { VALIDATE_INPUT_VALUE } from '@/constans';
import { useMutation } from '@tanstack/react-query';
import { AxiosError, isAxiosError } from 'axios';
import Link from 'next/link';
import { SubmitHandler, useForm } from 'react-hook-form';

type SigninInput = {
  email: string;
  password: string;
};

interface ErrorResponse {
  message: string;
}

const { email, password } = VALIDATE_INPUT_VALUE;

export default function Signin() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<SigninInput>({ mode: 'all' });
  const mutation = useMutation({
    mutationFn: (data: SigninInput) => signin(data),
    onError: (error: AxiosError<ErrorResponse>) => {
      if (!isAxiosError(error)) return;
      if (error.response?.data.message.includes('이메일')) {
        setError('email', { message: error.response.data.message });
      }
      if (error.response?.data.message.includes('비밀번호')) {
        setError('password', { message: error.response.data.message });
      }
    },
  });

  const onSubmit: SubmitHandler<SigninInput> = (data) => {
    mutation.mutate(data);
  };
  const { isPending } = mutation;
  if (isPending) {
    return <div>loading...</div>;
  }

  return (
    <>
      <form className='flex flex-col' onSubmit={handleSubmit(onSubmit)}>
        <label className='mb-6 font-semibold'>
          아이디
          <MixedInput
            size='full'
            name='email'
            type='text'
            errorMessage={errors.email?.message}
            props={{
              maxLength: 30,
              placeholder: '이메일을 입력해주세요',
              className: 'mt-3',
              autoComplete: 'on',
              ...register('email', {
                required: email.message.required,
                pattern: { value: email.regexp, message: email.message.pattern },
              }),
            }}
          />
        </label>
        <label className='mb-12 font-semibold'>
          비밀번호
          <MixedInput
            size='full'
            name='password'
            type='password'
            errorMessage={errors.password?.message}
            props={{
              maxLength: 15,
              placeholder: '비밀번호를 입력해주세요',
              className: 'mt-3',
              autoComplete: 'on',
              ...register('password', {
                required: password.message.required,
                minLength: { value: 8, message: password.message.length },
                pattern: { value: password.regexp, message: password.message.pattern },
              }),
            }}
          />
        </label>
        <Button className='w-full' variant='solid' type='submit'>
          로그인
        </Button>
      </form>
      <div className='font-medium text-slate-800 text-center my-10'>
        <span>
          솔리드 투 두가 처음이신가요?
          <Link className='underline text-[15px] font-medium text-[#3182f6] pl-1' href={'/signup'}>
            회원가입
          </Link>
        </span>
      </div>
    </>
  );
}
