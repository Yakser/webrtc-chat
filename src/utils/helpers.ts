import {KeyValue} from "@/utils/types";

export function isHost(roomId: string): boolean {
    return typeof window !== 'undefined' && !!window.localStorage.getItem(roomId);
}

export function append<T>(appendant: any) {
    return (target: KeyValue<T> | T[]) => {
        if (target instanceof Array) return target.concat(appendant);

        return {...target, ...appendant};
    };
}