import React, { forwardRef, ForwardRefRenderFunction } from "react";
import classNames from "classnames/bind";

import styles from "./FilmContainer.module.scss";

interface Props {
    className?: string;
    children: any;
}

const cx = classNames.bind(styles);

const FilmContainer: ForwardRefRenderFunction<HTMLDivElement, Props> = (
    props,
    ref
) => {
    const { children, className = "" } = props;
    const cName: string = `film-container ${className}`;

    return (
        <div ref={ref} className={cx("filmContainer", `${className}`)}>
            {children}
        </div>
    );
};

export default forwardRef(FilmContainer);
