import { INestGrids } from "../interface";
import GridItem from "./GridItem";
import NestMap, { IItemOrAry } from "./NestMap";
const createItem = (info: INestGrids) => new GridItem(info);
export default class LayoutController {
    // grids map
    items: NestMap<INestGrids, GridItem> = new NestMap([], createItem);

    // add items
    add(val: IItemOrAry<INestGrids>, parentId?: string) {
        this.items.add(val, parentId);
        this.refresh();
    }

    // refresh layouts
    refresh() {
        // todo
    }
}