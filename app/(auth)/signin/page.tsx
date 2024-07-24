'use client';

import Button from '@/components/Buttons/Button';
import MixedInput from '@/components/Input/MixedInput';
import { VALIDATE_INPUT_VALUE } from '@/constans';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';

type SigninInput = {
  email: string;
  password: string;
};

const { email, password } = VALIDATE_INPUT_VALUE;

export default function Signin() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<SigninInput>({ mode: 'all' });

  const onSubmit: SubmitHandler<SigninInput> = async (data, e) => {
    e?.preventDefault();

    // next auth에 signin 데이터 보내줌
    const res = await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false,
    });
    if (res?.ok) router.push('dashboard');
    if (!res?.ok) {
      if (res?.error?.includes('이메일')) setError('email', { message: res?.error });
      if (res?.error?.includes('비밀번호')) setError('password', { message: res?.error });
    }
  };

  return (
    <>
      <form className='flex flex-col' onSubmit={handleSubmit(onSubmit)} method='post'>
        <label className='mb-6 font-semibold'>
          이메일
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
