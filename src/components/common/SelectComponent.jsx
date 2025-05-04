import React from "react";
const SelectComponent = ({ label, name, value, onChange, defaultOption, width, option, ...props }) => {
 
    return (
        <div className="space-y-1 mb-2">
            <div className="flex items-center">
                <label
                    className="block text-[16px] font-medium leading-[21.82px] text-[#616161] capitalize"
                >
                    {label}
                </label>

            </div>
            <select
                key={name}
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                {...props}
                className={`${width ? `w-${width}` : 'w-[50%]'}  p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 `}
            >
                <option value="">{!!defaultOption && defaultOption ? defaultOption : 'Single Select'}</option>
                {!!option && option.map((item) => {
                    return (<option value={item.id} key={item.id}>{item.name}</option>)
                })}
            </select>
        </div>
    );
}

export default React.memo(SelectComponent);

