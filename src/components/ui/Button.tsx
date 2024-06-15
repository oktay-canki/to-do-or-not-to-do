interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button = ({ children, className, ...props }: ButtonProps) => {
  return (
    <button
      className={`outline-none border-none bg-accent rounded-md p-3 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
