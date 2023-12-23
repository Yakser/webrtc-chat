'use client';

import {Streams} from "@/utils/types";


// fixme: looks weird
export function append<T extends object>(newElement: T) {
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

