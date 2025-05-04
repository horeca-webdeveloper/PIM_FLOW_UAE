import React, { useEffect, useState, useMemo } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";

const animatedComponents = makeAnimated();

export default function MultiSelectComponent({
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
    const formattedOptions = useMemo(
        () =>
            option?.map((item) => ({
                value: item.id,
                label: item.name,
            })) || [],
        [option]
    );

    const [selectedValue, setSelectedValue] = useState(isMulti ? [] : null);

    // ✅ Format default values safely
    useEffect(() => {
        if (defaultValues && formattedOptions.length > 0) {
            if (isMulti && Array.isArray(defaultValues)) {
                const formatted = defaultValues.map((item) =>
                    typeof item === "object" ? item : formattedOptions.find((opt) => opt.value === item)
                );
                setSelectedValue(formatted);
            } else if (!isMulti) {
                const formatted = typeof defaultValues === "object"
                    ? defaultValues
                    : formattedOptions.find((opt) => opt.value === defaultValues);
                setSelectedValue(formatted);
            }
        }
    }, [defaultValues, formattedOptions, isMulti]);

    // ✅ Format controlled value safely
    useEffect(() => {
        if (value && formattedOptions.length > 0) {
            if (isMulti && Array.isArray(value)) {
                const formatted = value.map((item) =>
                    typeof item === "object" ? item : formattedOptions.find((opt) => opt.value === item)
                );
                setSelectedValue(formatted);
            } else if (!isMulti) {
                const formatted = typeof value === "object"
                    ? value
                    : formattedOptions.find((opt) => opt.value === value);
                setSelectedValue(formatted);
            }
        }
    }, [value, formattedOptions, isMulti]);

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
                options={formattedOptions}
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
