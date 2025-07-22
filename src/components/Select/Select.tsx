"use client";

import type React from "react";
import Image from "next/image";

interface SelectProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: string[] | { value: string; label: string }[];
}

const Select: React.FC<SelectProps> = ({ value, onChange, options }) => {
  const formattedOptions =
    Array.isArray(options) && typeof options[0] === "string"
      ? (options as string[]).map((option) => ({
          value: option,
          label: option,
        }))
      : (options as { value: string; label: string }[]);

  return (
    <div className="flex items-center space-x-3 text-gray-700 h-[56px]">
      <span className="font-medium">Genre</span>
      <span className="text-gray-400">|</span>
      <div className="relative">
        <select
          value={value}
          onChange={onChange}
          className="appearance-none bg-transparent border-none outline-none pr-6 font-medium text-gray-700 cursor-pointer"
        >
          <option value="">All</option>
          {formattedOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <Image
          className="absolute right-0 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
          src="/arrow.svg"
          alt="Arrow Icon"
          width={20}
          height={20}
        />
      </div>
    </div>
  );
};

export default Select;
