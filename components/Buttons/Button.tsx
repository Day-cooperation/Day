import { extendVariants, Button as NextButton } from '@nextui-org/react';
import { ButtonProps as NextButtonProps } from '@nextui-org/react';

type ButtonProps = Omit<NextButtonProps, 'size'> & {
  type?: 'button' | 'submit' | 'reset';
  children?: React.ReactNode;
  size?: 'xl' | 'lg' | 'md' | 'sm';
  variant?: 'solid' | 'bordered';
  disabled?: boolean;
  className?: string;
};

const CustomButton = extendVariants(NextButton, {
  variants: {
    size: {
      xl: 'w-full text-base',
      lg: 'w-[291px] h-[48px] text-base',
      md: 'w-[150px] h-[44px] text-sm',
      sm: 'w-[84px] h-[36px] text-sm',
    },
    variant: {
      solid:
        'bg-green-500 data-[hover=true]:bg-green-600 !text-white data-[pressed=true]:bg-green-800 data-[disabled=true]:bg-slate-400 font-semibold',
      bordered:
        'bg-white !text-green-500 data-[hover=true]:border-green-600 data-[hover=true]:text-green-600 data-[pressed=true]:border-green-800 data-[pressed=true]:text-green-800 border-green-500 font-semibold',
    },
    isDisabled: {
      true: 'opacity-100 text-white font-semibold bg-slate-400 border-slate-400 pointer-events-auto cursor-not-allowed',
    },
  },
});

export default function Button({
  type = 'button',
  children = '생성하기',
  size = 'xl',
  variant = 'bordered',
  disabled = false,
  className,
  ...props
}: ButtonProps) {
  return (
    <CustomButton
      type={type}
      variant={variant}
      size={size}
      className={`py-3 text-white data-[hover=true]:!opacity-100 border-1 data-[pressed=true]:scale-100 ${className}`}
      radius='md'
      disableRipple
      disableAnimation
      isDisabled={disabled}
      {...props}
    >
      {children}
    </CustomButton>
  );
}
