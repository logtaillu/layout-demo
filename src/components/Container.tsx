// 从Grid扩展出来的容器类型
import { PropsWithChildren } from "react";
import { IGridOptions } from "../Controller/Controller";
import Grid from "./Grid";

export default function Container(props: PropsWithChildren<IGridOptions>) { 
    return (
        <Grid container={true}  {...props} />
    )
}