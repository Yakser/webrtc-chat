import {Socket as NetSocket} from 'net';
import {Server as HTTPServer} from 'http';
import {NextApiResponse} from 'next/types';
import {Server as SocketIOServer} from 'socket.io';
// @ts-ignore
import {DefaultEventsMap} from 'socket.io/dist/typed-events';
import {Socket as ClientSocket} from 'socket.io-client';
import React from "react";

export type NextApiResponseServerIO = NextApiResponse & {
    socket: NetSocket & {
        server: HTTPServer & {
            io: SocketIOServer;
        };
    };
};

export type SocketType = ClientSocket<DefaultEventsMap, DefaultEventsMap>;
export type KeyValue<T> = Record<string, T>;
export type Nullable<T> = T | null;
export type PeerId = string;
export type Status = 'loading' | 'idle' | 'rejected' | 'success';

export type Streams = Record<string, React.ReactNode>;