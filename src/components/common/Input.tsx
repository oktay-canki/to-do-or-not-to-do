interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

const Input = ({ label, error, icon, className, ...props }: InputProps) => {
  return (
    <div className="flex flex-col">
      {label && (
        <label className="flex items-center gap-2 px-1 mb-2">
          {icon && icon}
          {label}
        </label>
      )}
      <input
        className={`border-0 rounded-md outline-none p-4 bg-secondary ${className}`}
        {...props}
      />
      {error && <label className="text-danger">* {error}</label>}
    </div>
  );
};

export default Input;
