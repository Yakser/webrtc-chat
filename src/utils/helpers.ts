'use client';

import {KeyValue, Streams} from "@/utils/types";
import {LocalStorageKeys} from "@/utils/constants";
import React from "react";

export function append<T>(appendant: any) {
    return (target: KeyValue<T> | T[]) => {
        if (target instanceof Array) return target.concat(appendant);

        return {...target, ...appendant};
    };
}

export function removeUserStream(userId: string): ((streams: Streams) => Streams) {
    return (streams: Streams) => {
        const newStreams: any = {};
        for (const key in streams) {
            if (key != userId) newStreams[userId] = streams[userId];
        }
        return newStreams;
    }
}


export function getUsername(): string {
    return localStorage.getItem(LocalStorageKeys.USERNAME) || 'Anonymous';
}
