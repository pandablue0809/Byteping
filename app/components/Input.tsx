import React from "react";

interface InputProps {
  id?: string;
  label: string;
  type?: string;
  disabled?: boolean;
  required?: boolean;
  error: boolean;
}

const Input: React.FC<InputProps> = () => {
  return <div>Input</div>;
};

export default Input;
