import { PropsWithChildren } from "react";
import { IGridOptions, defaultOptions } from "../Controller/Controller";
export interface IGrid extends IGridOptions {
    // 是否容器
    container?: boolean;
}
export default function Grid(props: PropsWithChildren<IGrid>) {
    const { children, container, ...gridOptions } = props;
    const options = { ...defaultOptions, ...gridOptions };
    return (
        <div data-container={container}>
            {children}
        </div>
    )
}