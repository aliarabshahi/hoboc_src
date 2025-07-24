// app/components/ui/multi-select.tsx
"use client";
import { useState, useEffect } from "react";

interface MultiSelectProps {
  options: { value: number; label: string }[];
  selected: number[];
  onChange: (selected: number[]) => void;
  placeholder?: string;
  required?: boolean;
}

export function MultiSelect({
  options,
  selected,
  onChange,
  placeholder = "Select...",
  required = false,
}: MultiSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredOptions = options.filter(option =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleOption = (value: number) => {
    const newSelected = selected.includes(value)
      ? selected.filter(v => v !== value)
      : [...selected, value];
    onChange(newSelected);
  };

  return (
    <div className="relative">
      <div
        className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-2 focus:ring-hoboc focus:border-hoboc block p-3 transition cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selected.length === 0 ? (
          <span className="text-gray-400">{placeholder}</span>
        ) : (
          <div className="flex flex-wrap gap-1">
            {selected.map(value => {
              const option = options.find(o => o.value === value);
              return (
                <span
                  key={value}
                  className="bg-hoboc/10 text-hoboc dark:text-hoboc-light px-2 py-1 rounded text-xs"
                >
                  {option?.label}
                </span>
              );
            })}
          </div>
        )}
      </div>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg">
          <div className="p-2 border-b border-gray-200 dark:border-gray-700">
            <input
              type="text"
              placeholder="جستجو..."
              className="w-full p-2 bg-gray-50 dark:bg-gray-700 rounded text-sm"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              autoFocus
            />
          </div>
          <div className="max-h-60 overflow-y-auto">
            {filteredOptions.length === 0 ? (
              <div className="p-3 text-sm text-gray-500 dark:text-gray-400">
                موردی یافت نشد
              </div>
            ) : (
              filteredOptions.map(option => (
                <div
                  key={option.value}
                  className={`p-3 text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2 ${
                    selected.includes(option.value)
                      ? "bg-hoboc/10 text-hoboc dark:text-hoboc-light"
                      : "text-gray-700 dark:text-gray-300"
                  }`}
                  onClick={() => toggleOption(option.value)}
                >
                  <input
                    type="checkbox"
                    checked={selected.includes(option.value)}
                    readOnly
                    className="rounded text-hoboc focus:ring-hoboc"
                  />
                  {option.label}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}