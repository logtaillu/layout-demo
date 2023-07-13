import { INestGrids } from "../interface";

export default class GridItem {
    item: INestGrids;
    top = 0;
    left = 0;
    active = true;
    constructor(item: INestGrids) {
        this.item = item;
    }
    get id() {
        return this.item.id;
    }
    get translate() {
        return `translate(${this.top}px, ${this.left}px)`;
    }
    // 设置偏移
    setTranslate(left: number, top: number) {
        this.left = left;
        this.top = top;
        const ele = document.getElementById(this.id);
        if (ele) {
            ele.style.transform = this.translate;
        }
    }
}