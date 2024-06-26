import {Socket as NetSocket} from 'net';
import {Server as HTTPServer} from 'http';
import {NextApiResponse} from 'next/types';
import {Server as SocketIOServer} from 'socket.io';
// @ts-expect-error Cannot find module socket.io/dist/typed-events, but it exists
import {DefaultEventsMap} from 'socket.io/dist/typed-events';
import {Socket as ClientSocket} from 'socket.io-client';
import React from "react";
import {MediaConnection} from "peerjs";


export type NextApiResponseServerIO = NextApiResponse & {
    socket: NetSocket & {
        server: HTTPServer & {
            io: SocketIOServer;
        };
    };
};

export type SocketType = ClientSocket<DefaultEventsMap, DefaultEventsMap>;
export type Nullable<T> = T | null;
export type PeerId = string;
export type Status = 'loading' | 'idle' | 'rejected' | 'success';

export type Streams = Record<string, React.JSX.Element>;
export type Peers = Record<string, MediaConnection>;
export type User = {
    id: string,
    name: string,
};