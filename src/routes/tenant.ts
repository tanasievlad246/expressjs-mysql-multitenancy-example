import { Router, Request, Response } from 'express';
import { myDataSource } from '../app-data-source';
import { setTenant } from '../middlewares/set-tenant';
import { Tenant } from '../models/tenant.entity';

const router = Router();

router.get('/', setTenant, async (req: Request, res: Response) => {
    const tenantName = req.tenant;

    const tenant = await myDataSource.getRepository(Tenant).findOne({
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

const syncTenantSchema = async (tenantName: string) => {
    await myDataSource.query(`CREATE SCHEMA IF NOT EXISTS ${tenantName};`);
    await myDataSource.query(`USE ${tenantName};`);
    await myDataSource.synchronize();
}

router.post('/', async (req: Request, res: Response) => {
    try {
        const { name } = req.body;
        await myDataSource.query(`USE default_db;`);
        const tenantAlreadyExists = await myDataSource.getRepository(Tenant).findOne({
            where: {
                name
            }
        });

        if (tenantAlreadyExists) {
            return res.status(400).json({
                status: 'fail',
                message: 'Tenant already exists!'
            });
        }

        const user = myDataSource.getRepository(Tenant).create({
            name,
        });
        const results = await myDataSource.getRepository(Tenant).save(user);

        await syncTenantSchema(name);

        res.status(200).json({
            status: 'success',
            data: results
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error
        });
    }
});

export default router;
