import { NextApiRequest } from 'next';
import { Server as ServerIO } from 'socket.io';

import { NextApiResponseServerIO } from '@/utils/types';
import { SOCKET_PATH } from '@/utils/constants';

export default async function handler (req: NextApiRequest, res: NextApiResponseServerIO) {
    if (!res.socket.server.io) {
        console.log('Socket is initializing');

        const httpServer = res.socket.server;
        const io = new ServerIO(httpServer, { path: SOCKET_PATH });
        res.socket.server.io = io;

        io.on('connection', (socket) => {
            console.log('connected');

            socket.on('room:join', ({ room, userID }) => {
                socket.join(room);
                socket.to(room).emit('user:joined', userID);

                socket.on('disconnect', () => {
                    socket.to(room).emit('user:left', userID);
                });

                socket.on('user:leave', (userID) => {
                    socket.to(room).emit('user:left', userID);
                });

            });
        });
    }

    res.end();
}