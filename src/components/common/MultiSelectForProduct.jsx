import React, { useEffect, useState, useMemo } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";

const animatedComponents = makeAnimated();

export default function MultiSelectForProduct({ label, name, option, width, defaultValues, onChange, value, ...props }) {

    // ✅ Use useMemo to avoid re-creating formattedOptions on every render
    const formattedOptions = useMemo(
        () => (option ? option.map((item) => ({ value: item.id, label: item.name })) : []),
        [option]
    );

    const [selectedValue, setSelectedValue] = useState([]);

    // ✅ Ensure selected values are properly formatted when defaultValues change
    useEffect(() => {
        if (defaultValues && formattedOptions.length > 0) {
            const formattedDefaultValues = defaultValues.map((item) =>
                typeof item === "object" ? item : formattedOptions.find((opt) => opt.value === item)
            );
            setSelectedValue(formattedDefaultValues);
        }
    }, [defaultValues, formattedOptions]);

    useEffect(() => {
        if (value && formattedOptions.length > 0) {
            const formattedValue = typeof value === "string"
                ? value.split(",").map((val) => formattedOptions.find((opt) => opt.value === val)).filter(Boolean)
                : Array.isArray(value)
                ? value.map((item) =>
                      typeof item === "object" ? item : formattedOptions.find((opt) => opt.value === item)
                  )
                : [];
    
            setSelectedValue(formattedValue);
        }
    }, [value, formattedOptions]);
    


    return (
        <div className="space-y-1 mb-2">
            <div className="flex items-center">
                <label className="block text-[16px] font-medium leading-[21.82px] text-[#616161] capitalize">
                    {label}
                </label>
            </div>

            <Select
                closeMenuOnSelect={false}
                components={animatedComponents}
                value={selectedValue}
                isMulti
                options={formattedOptions || []}
                name={name}
                onChange={(selected) => {
                    const safeSelected = Array.isArray(selected) ? selected : [];
                    setSelectedValue(safeSelected);
            
                    // ✅ Convert selected values into a comma-separated string
                    onChange(safeSelected.map((opt) => opt.value).join(","));
                }}
                {...props}
            />

        </div>
    );
}
