import React, { forwardRef, ForwardRefRenderFunction } from "react";
import "./FilmContainer.scss";

interface Props {
    className?: string;
    children: any;
}

const FilmContainer: ForwardRefRenderFunction<HTMLDivElement, Props> = (props, ref) => {
    const { children, className = "" } = props;
    const cName: string = `film-container ${className}`;

    return (
        <div ref={ref} className={cName}>
            {children}
        </div>
    );
};

export default forwardRef(FilmContainer);
