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

    return (
        <div ref={ref} className={cx("film-container", `${className}`)}>
            {children}
        </div>
    );
};

export default forwardRef(FilmContainer);
