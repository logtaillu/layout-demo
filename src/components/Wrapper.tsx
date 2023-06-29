/** Wrapper的react组件 */
import { PropsWithChildren, useEffect, useRef } from "react";
import Controller, { IControllerOptions } from "../Controller/Controller";
export interface IWrapper extends IControllerOptions {
    name: string;
    className?: string;
    style?: React.CSSProperties;
}
export default function Wrapper(props: PropsWithChildren<IWrapper>) {
    const { name, children, className, style, ...options } = props;
    const ref = useRef<HTMLDivElement>(null);
    const wrapper = useRef<Controller>(new Controller(name, "", options));
    // 注册wrapper
    useEffect(() => {
        if (ref.current) {
            wrapper.current.init(name, ref.current, options);
        }
    }, [name, options]);
    return (
        <div ref={ref} className={className} style={style}>
            {children}
        </div>
    )
}