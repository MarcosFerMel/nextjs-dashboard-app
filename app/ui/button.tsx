import clsx from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger';
}

export function Button({
  children,
  className,
  variant = 'primary',
  ...rest
}: ButtonProps) {
  const variantClasses = {
    primary: 'bg-blue-500 hover:bg-blue-400 active:bg-blue-600 focus-visible:outline-blue-500',
    secondary: 'bg-gray-500 hover:bg-gray-400 active:bg-gray-600 focus-visible:outline-gray-500',
    danger: 'bg-red-500 hover:bg-red-400 active:bg-red-600 focus-visible:outline-red-500',
  };

  return (
    <button
      {...rest}
      className={clsx(
        'flex h-10 items-center rounded-lg px-4 text-sm font-medium text-white transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 aria-disabled:cursor-not-allowed aria-disabled:opacity-50',
        variantClasses[variant],
        className,
      )}
    >
      {children}
    </button>
  );
}
