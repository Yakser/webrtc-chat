import { NextApiRequest } from 'next';
import { Server as ServerIO } from 'socket.io';

import {NextApiResponseServerIO, User} from '@/utils/types';
import { SOCKET_PATH } from '@/utils/constants';

export default async function handler (req: NextApiRequest, res: NextApiResponseServerIO) {
    if (res.socket.server.io === undefined) {
        console.log('Socket is initializing');

        const httpServer = res.socket.server;
        const io = new ServerIO(httpServer, { path: SOCKET_PATH });
        res.socket.server.io = io;

        io.on('connection', (socket) => {
            console.log('connected');

            socket.on('room:join', ({ roomId, userId, userName }) => {

                console.log('room:join', roomId, userId, userName);
                socket.join(roomId);
                socket.to(roomId).emit('user:joined', {userId, userName});

                socket.on('disconnect', () => {
                    socket.to(roomId).emit('user:left', userId);
                });

                socket.on('user:leave', (userId) => {
                    socket.to(roomId).emit('user:left', userId);
                });

            });

            socket.on('user:connect', (user: User) => {
                console.log('user connect', user);
                socket.broadcast.emit('user:connected', user);
                // socket.emit('user:connected', user)
            });
        });
    }

    res.end();
}