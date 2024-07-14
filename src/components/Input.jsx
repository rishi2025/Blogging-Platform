import React, { useId } from "react";

const Input = React.forwardRef(function Input({
    label,
    type = "text",
    classname = "",
    ...props
}, ref) {

    const id = useId();

    return (
        <div className="w-full flex flex-col items-center">
            {
                label && <label
                    className="inline-block mb-1 pl-1"
                    htmlFor={id}
                >
                    {label}
                </label>
            }
            <input
                type={type}
                className={`${classname} px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full`}
                ref={ref}
                {...props}
                id={id}
            >
            </input>
        </div>
    )
})

export default Input;