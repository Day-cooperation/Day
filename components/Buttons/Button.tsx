import { Button as NextButton } from '@nextui-org/react';
import { ButtonProps as NextButtonProps } from '@nextui-org/react';

type ButtonProps = NextButtonProps & {
  type?: 'button' | 'submit' | 'reset';
  children?: React.ReactNode;
  sizes?: 'xl' | 'lg' | 'md' | 'sm';
  variant?: 'solid' | 'bordered';
  disabled?: boolean;
};

export default function Button({
  type = 'button',
  children = '생성하기',
  sizes = 'xl',
  variant = 'bordered',
  disabled = false,
  ...props
}: ButtonProps) {
  let sizeValue;

  switch (sizes) {
    case 'xl': {
      sizeValue = 'w-full';
      break;
    }
    case 'lg': {
      sizeValue = 'w-[291px]';
      break;
    }
    case 'md': {
      sizeValue = 'w-[150px]';
      break;
    }
    case 'sm': {
      sizeValue = 'w-[84px]';
      break;
    }
    default: {
      return;
    }
  }
  const variantValue =
    variant === 'solid'
      ? 'bg-blue-500 data-[hover=true]:bg-blue-600  text-white data-[pressed=true]:bg-blue-800 data-[disabled=true]:bg-slate-400 '
      : 'bg-white text-blue-500 data-[hover=true]:border-blue-600 data-[hover=true]:text-blue-600 data-[pressed=true]:border-blue-800 data-[pressed=true]:text-blue-800 data-[disabled=true]:text-slate-400 data-[disabled=true]:border-slate-400 border-blue-500';
  return (
    <NextButton
      type={type}
      variant={variant}
      className={`${sizeValue} py-3 text-white data-[hover=true]:!opacity-100 ${variantValue} data-[disabled=true]:opacity-100 border-1 data-[pressed=true]:scale-100`}
      radius='md'
      disableRipple
      disableAnimation
      isDisabled={disabled}
      {...props}
    >
      {children}
    </NextButton>
  );
}
