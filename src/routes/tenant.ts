import { Router, Request, Response } from 'express';
import { myDataSource } from '../app-data-source';
import { setTenant } from '../middlewares/set-tenant';
import { Tenant } from '../models/tenant.entity';

const router = Router();

router.get('/', setTenant, async (req: Request, res: Response) => {
    const tenantName = req.tenant;

    const tenant = await req.entityManager.connection.getRepository(Tenant).findOne({
        where: {
            name: tenantName
        }
    });

    if (!tenant) {
        return res.status(404).json({
            status: 'fail',
            message: 'Tenant not found!'
        });
    }

    res.status(200).json({
        status: 'success',
        data: tenant
    });
});

router.post('/', async (req: Request, res: Response) => {
    try {
        const { name } = req.body;
        console.log(req.body)
        await myDataSource.query(`CREATE SCHEMA IF NOT EXISTS ${name}`);
        await myDataSource.query(`USE ${name}`);
        await myDataSource.synchronize();

        const user = myDataSource.getRepository(Tenant).create({
            name,
        });
        const results = await myDataSource.getRepository(Tenant).save(user);

        res.status(200).json({
            status: 'success',
            data: results
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        });
    }
});

export default router;
