'use client';
import { signup } from '@/lib/api/auth';
import Button from '@/components/Buttons/Button';
import MixedInput from '@/components/Input/MixedInput';
import ConfirmPopup from '@/components/Popup/ConfirmPopup';
import { VALIDATE_INPUT_VALUE } from '@/constans';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

type SignupInput = {
  name: string;
  email: string;
  password: string;
  passwordConfirm?: string;
};

interface ErrorResponse {
  message: string;
}

const { name, email, password, passwordConfirm } = VALIDATE_INPUT_VALUE;

export default function Signup() {
  const confirmRef = useRef<HTMLDialogElement>(null);
  const [confirm, setConfirm] = useState({ message: '', setDeleteId: 0 });
  const handleConfirmClick = () => {
    signIn();
  };
  const {
    register,
    setError,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<SignupInput>({ mode: 'all' });
  const mutation = useMutation({
    mutationFn: (data: Omit<SignupInput, 'passwordConfirm'>) => signup(data),
    onSuccess: () => {
      setConfirm({ message: '회원가입이 완료되었습니다.', setDeleteId: 0 });
      confirmRef.current?.showModal();
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      if (error.response?.data.message.includes('이메일')) {
        setError('email', { message: error.response.data.message });
      }
    },
  });
  const onSubmit: SubmitHandler<SignupInput> = (data, e) => {
    e?.preventDefault();
    delete data.passwordConfirm;
    mutation.mutate(data);
  };

  return (
    <>
      <ConfirmPopup
        type='popup'
        dialogRef={confirmRef}
        confirmText={confirm.message}
        onConfirmClick={handleConfirmClick}
      />
      <form className='flex flex-col' onSubmit={handleSubmit(onSubmit)} method='post'>
        <label className='mb-6 font-semibold'>
          이름
          <MixedInput
            size='full'
            name='name'
            type='text'
            errorMessage={errors.name?.message}
            props={{
              placeholder: '이름을 입력해주세요',
              className: 'mt-3',
              maxLength: 8,
              autoComplete: 'on',
              ...register('name', {
                required: name.message.required,
                minLength: { value: 2, message: name.message.length },
                maxLength: 8,
              }),
            }}
          />
        </label>
        <label className='mb-6 font-semibold'>
          이메일
          <MixedInput
            size='full'
            name='email'
            type='text'
            errorMessage={errors.email?.message}
            props={{
              placeholder: '이메일을 입력해주세요',
              className: 'mt-3',
              autoComplete: 'on',
              maxLength: 30,
              ...register('email', {
                required: email.message.required,
                pattern: { value: email.regexp, message: email.message.pattern },
              }),
            }}
          />
        </label>
        <label className='mb-6 font-semibold'>
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
        <label className='mb-12 font-semibold'>
          비밀번호 확인
          <MixedInput
            size='full'
            name='passwordConfirm'
            type='password'
            errorMessage={errors.passwordConfirm?.message}
            props={{
              placeholder: '비밀번호를 다시 한 번 입력해주세요',
              className: 'mt-3',
              autoComplete: 'on',
              ...register('passwordConfirm', {
                required: passwordConfirm.message.required,
                validate: {
                  match: (value) => {
                    const { password } = getValues();
                    return value === password || passwordConfirm.message.notMatch;
                  },
                },
              }),
            }}
          />
        </label>
        <Button className='w-full' variant='solid' type='submit'>
          회원가입하기
        </Button>
      </form>
      <div className='font-medium text-slate-800 text-center my-10'>
        <span>
          이미 회원이신가요?
          <Link className='underline text-[15px] font-medium text-[#3182f6] pl-1' href={'/signin'}>
            로그인
          </Link>
        </span>
      </div>
    </>
  );
}
