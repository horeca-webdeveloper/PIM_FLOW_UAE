import React, { useEffect, useState, useMemo } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";

const animatedComponents = makeAnimated();

export default function MultiSelectComponentForProducts({
    label,
    name,
    option,
    width,
    defaultValues,
    onChange,
    value,
    disabled,
    isMulti = true,
    ...props
}) {
    

    const [selectedValue, setSelectedValue] = useState(isMulti ? [] : null);

    // ✅ Format default values safely
    useEffect(() => {
        if (defaultValues && option.length > 0) {
            if (isMulti && Array.isArray(defaultValues)) {
                const formatted = defaultValues.map((item) =>
                    typeof item === "object" ? item : option.find((opt) => opt.value === item)
                );
                setSelectedValue(formatted);
            } else if (!isMulti) {
                const formatted = typeof defaultValues === "object"
                    ? defaultValues
                    : option.find((opt) => opt.value === defaultValues);
                setSelectedValue(formatted);
            }
        }
    }, [defaultValues, option, isMulti]);

    // ✅ Format controlled value safely
    useEffect(() => {
        if (value && option.length > 0) {
            if (isMulti && Array.isArray(value)) {
                const formatted = value.map((item) =>
                    typeof item === "object" ? item : option.find((opt) => opt.value === item)
                );
                setSelectedValue(formatted);
            } else if (!isMulti) {
                const formatted = typeof value === "object"
                    ? value
                    : option.find((opt) => opt.value === value);
                setSelectedValue(formatted);
            }
        }
    }, [value, option, isMulti]);

    return (
        <div className="space-y-1 mb-2">
            <div className="flex items-center">
                <label className="block text-[16px] font-medium leading-[21.82px] text-[#616161] capitalize ">
                    {label}
                </label>
            </div>

            <Select
            
                closeMenuOnSelect={!isMulti}
                components={animatedComponents}
                value={selectedValue}
                isMulti={isMulti}
                options={option}
                name={name}
                onChange={(selected) => {
                    setSelectedValue(selected);
                    onChange?.(selected);
                }}
                isDisabled={disabled}
            
                {...props}
                className={`${width ? `w-${width}` : "w-[50%]"} focus:outline-none focus:ring-2 focus:ring-blue-500 `}

                
            />
        </div>
    );
}
