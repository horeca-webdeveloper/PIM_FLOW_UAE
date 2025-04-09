import React from "react";

const InputComponent = ({
    label,
    type,
    name,
    value,
    onChange,
    placeholder,
    width,
    bgTransparent,
    icons,
    ...props
}) => {
    return (
        <div className="space-y-2">
            <label className="block text-[16px] font-medium leading-[21.82px] text-[#616161]">
                {label}
            </label>
            <div className={`relative ${width ? `w-${width}` : 'w-[50%]'}`}>
                <input
                    key={name}
                    type={type}
                    id={type}
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    {...props}
                    className={`w-full border border-gray-300 rounded ${type !== 'file' ? 'p-2' : 'p-1'} pr-10
                        focus:outline-none focus:ring-2 focus:ring-blue-500
                        file:bg-[#26683A] file:text-white file:border-none file:px-4 file:py-2 file:rounded
                        ${bgTransparent ? 'bg-transparent' : 'bg-[#F5F8F8]'} file:cursor-pointer`}
                />
                {icons && (
                    <img src={icons} alt="icon" className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5" />
                )}
            </div>
        </div>
    );
};

export default React.memo(InputComponent);
