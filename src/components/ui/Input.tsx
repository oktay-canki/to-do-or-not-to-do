import { forwardRef } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon, className, ...props }, ref) => {
    return (
      <div className="flex flex-col flex-1">
        {label && (
          <label className="flex items-center gap-2 px-1 mb-2">
            {icon && icon}
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`border-0 rounded-md outline-none p-4 bg-primary transition-all ${className}`}
          {...props}
          autoComplete="off"
        />
        {error && <label className="text-danger mt-1 px-1">* {error}</label>}
      </div>
    );
  }
);

export default Input;
