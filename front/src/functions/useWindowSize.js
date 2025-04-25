import { useState, useEffect } from "react";

const useWindowSize = () => {
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    useEffect(() => {
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
            document.documentElement.style.setProperty(
                "--window-height",
                `${window.innerHeight}px`
            );
        };

        window.addEventListener("resize", handleResize);
        handleResize();  // Chamando imediatamente para definir o tamanho inicial
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return windowSize;  // Retorna o estado com o tamanho da janela
};

export default useWindowSize;
