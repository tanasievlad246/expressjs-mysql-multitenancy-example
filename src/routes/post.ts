import { Router, Request, Response } from 'express';
import { setTenant } from '../middlewares/set-tenant';
import { myDataSource } from '../app-data-source';
import { Post } from '../models/post.entity';

const router = Router();

router.get('/', setTenant, async (req: Request, res: Response) => {
    try {
        const results = await myDataSource.getRepository(Post).find();
        res.status(200).json({
            status: 'success',
            data: results
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            status: 'fail',
            message: error.message
        });
    }
});

router.post('/', setTenant, async (req: Request, res: Response) => {
    try {
        const { title, body } = req.body;

        const post = myDataSource.getRepository(Post).create({
            title,
            body,
        });
        const results = await myDataSource.getRepository(Post).save(post);

        res.status(200).json({
            status: 'success',
            data: results
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            status: 'fail',
            message: error
        });
    }
});

export default router;
