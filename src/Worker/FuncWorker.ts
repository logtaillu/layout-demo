/**
 * create worker for function, and need to destroy by self
 * worker: get params by post message, and receive by onmessage(inner), callback to onmessage
 */
import { NOOP } from "../const";
type IWorkerFunc<T> = (data: T) => any;
export default class FuncWorker<T = Float32Array> {
    workers: Worker[] = [];
    actives: Worker[] = [];
    run;
    destroy;
    constructor(func: IWorkerFunc<T>, num: number) {
        if (this.isWorkerSupport()) {
            this.workers = [];
            this.actives = [];
            const blobUrl = this.getBlobUrl(func);
            for (let i = 0; i < num; i++) {
                const w = new Worker(blobUrl);
                this.workers.push(w);
            }
            this.run = this.getWorkerRun();
        } else {
            this.run = this.createPromise(func);
            this.destroy = NOOP;
        }
    }

    // if support worker
    isWorkerSupport() {
        return !!(window.Worker && window.URL && window.Blob);
    }
    // create promise for no worker mode
    createPromise(func: IWorkerFunc<T>) {
        return (dataary: T) => {
            return new Promise((resolve) => {
                const res = func(dataary);
                if (res?.then) {
                    res.then(resolve);
                } else {
                    resolve(res);
                }
            })
        }
    }

    // get worker content
    getBlobUrl(func: Function) {
        // onmessage的时候执行函数，然后postmessage回调回去
        const str = `self.onmessage=function(ev){
            const data = new Float32Array(ev.data);
            const res = ${func.toString()}(data);
            postMessage(res.buffer, [res.buffer]);
        }`;
        return URL.createObjectURL(
            new Blob([str], {
                type: 'application/javascript',
            })
        );
    }

    getWorkerRun() {
        const t = this;
        return (dataary: T) => {
            return new Promise((resolve) => {
                const worker = this.workers.pop();
                if (worker) {
                    this.actives.push(worker);
                    worker.onmessage = (ev) => {
                        const data = new Float32Array(ev.data);
                        resolve(data);
                    }
                    worker.postMessage(dataary.buffer, [dataary.buffer]);
                } else {
                    resolve(false);
                }
            })
        }
    }
}