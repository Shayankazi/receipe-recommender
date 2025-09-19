import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { cva } from 'class-variance-authority';
import { cn } from '../../theme/tokens';

const inputVariants = cva(
  'flex h-12 w-full rounded-lg border bg-white px-4 py-3 text-base placeholder:text-secondary-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200',
  {
    variants: {
      variant: {
        default: 'border-secondary-200',
        filled: 'border-transparent bg-secondary-50',
        ghost: 'border-transparent bg-transparent',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

const Input = React.forwardRef(({ 
  className, 
  type = 'text',
  variant,
  icon: Icon,
  ...props 
}, ref) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative">
      {Icon && (
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none z-10">
          <Icon size={18} className={cn(
            'transition-colors duration-200',
            isFocused ? 'text-primary-500' : 'text-secondary-400'
          )} />
        </div>
      )}
      
      <input
        type={type}
        className={cn(
          inputVariants({ variant }),
          Icon && 'pl-12',
          className
        )}
        ref={ref}
        onFocus={(e) => {
          setIsFocused(true);
          props.onFocus?.(e);
        }}
        onBlur={(e) => {
          setIsFocused(false);
          props.onBlur?.(e);
        }}
        {...props}
      />
      
    </div>
  );
});

Input.displayName = "Input";

export { Input, inputVariants };
