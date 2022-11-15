import React, { useEffect, useState } from "react";

// interface Props {
//     class: [string],
//     delay: number
// }

// class i: xác định class hiện tại, i + 1 class sẽ được thêm vào
function useDisappearCss(classList: any, delay: number, isSidebar: boolean) {
    const [flag, setFlag] = useState(true);

    useEffect(() => {
        if (isSidebar) {
            setFlag(true);
            return;
        }

        for (let key = 0; key < classList.length; key += 2) {
            const elem: any = document.querySelector(`.${classList[key]}`);
            if (elem) elem.classList.add(classList[key + 1]);
        }

        const handle = setTimeout(() => {
            setFlag(false);
        }, delay);

        return () => {
            clearTimeout(handle);
        };
    }, [isSidebar]);

    return flag;
}

export default useDisappearCss;
