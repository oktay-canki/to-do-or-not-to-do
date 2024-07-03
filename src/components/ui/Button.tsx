interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button = ({ children, className, ...props }: ButtonProps) => {
  return (
    <button
      className={`flex items-center justify-center outline-none border-none bg-accent p-3 disabled:opacity-75 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
