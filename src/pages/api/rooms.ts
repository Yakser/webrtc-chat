import {NextApiRequest} from 'next';

import {NextApiResponseServerIO} from '@/utils/types';

export default async function handler(req: NextApiRequest, res: NextApiResponseServerIO) {
    try {
    } catch (error) {
        console.log(error);
    }
    res.end();
}