import { INestGrids } from "../interface";
import NestMap from "./NestMap";

export default class LayoutController {
    // grids map
    items: NestMap<INestGrids> = new NestMap();

    // add items
    add() {
        // todo
    }

    // refresh layouts
    refresh() {
        // todo
    }
}