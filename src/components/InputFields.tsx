import React from "react";

interface InputFieldProps {
  label: string;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({ label, type = "text", placeholder, value, onChange }) => {
  return (
    <div className="mb-4">
      <label className="block text-white text-sm font-medium mb-2">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>
  );
};

export default InputField;
