import React from "react";

function Logo({src, className = '', width = '100px', alt='Logo', company='BlogiFy', horizontal = false}) {
    return (
        <div className={`items-center gap-3 text-xl font-bold  ${(horizontal ? "flex flex-col" : "flex flex-row")}`}>
            <img
                src={src}
                className={`${className}`}
                width={width}
                alt={alt}
            />
            <h4>{company}</h4>
        </div>
    )
};

export default Logo;