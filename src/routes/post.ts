import { Router, Request, Response } from 'express';

const router = Router();

router.get('/', (req: Request, res: Response) => {
    res.status(200).json({
        status: 'success',
        message: 'Hello from the server side!',
    });
});

router.post('/', (req: Request, res: Response) => {
    res.status(200).json({
        status: 'success',
        message: 'You can post to this endpoint!',
    });
});

export default router;