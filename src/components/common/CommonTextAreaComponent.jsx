import React from "react";

const CommonTextAreaComponent = ({
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
            <label className="block text-[16px] font-medium leading-[21.82px] mt-3 text-[#616161]">
                {label}
            </label>
            <div className={`relative ${width ? `w-${width}` : 'w-[50%]'}`}>
                <textarea
                    key={name}
                    type={type}
                    id={type}
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    {...props}
                    className={`w-full border border-gray-300 rounded ${type !== 'file' ? 'p-2 ' : 'p-1 pr-10'} 
                        focus:outline-none focus:ring-2 focus:ring-blue-500
                        file:bg-[#26683A] file:text-white file:border-none file:px-4 file:py-2 file:rounded
                        ${bgTransparent ? 'bg-transparent' : 'bg-[#F5F8F8]'} file:cursor-pointer`}
                />
                 
            </div>
        </div>
    );
};

export default React.memo(CommonTextAreaComponent);
