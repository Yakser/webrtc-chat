'use client';

import {Streams} from "@/utils/types";
import {LocalStorageKeys} from "@/utils/constants";


// fixme: looks weird
export function append<T extends Object>(newElement: T) {
    return (elements: T): T => {
        return {...elements, ...newElement};
    };
}

export function removeUserStream(userId: string): ((streams: Streams) => Streams) {
    return (streams: Streams) => {
        const newStreams: Streams = {};
        for (const key in streams) {
            if (key != userId) newStreams[userId] = streams[userId];
        }
        return newStreams;
    }
}


export function getUsername(): string {
    return localStorage.getItem(LocalStorageKeys.USERNAME) || 'Anonymous';
}
