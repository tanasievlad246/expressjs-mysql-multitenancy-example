import { Request, Response, NextFunction } from 'express';
import { myDataSource } from '../app-data-source';
import { Tenant } from '../models/tenant.entity';
import { DataSource, EntityManager } from "typeorm";


declare global {
    namespace Express {
        export interface Request {
            tenant?: string,
            entityManager?: EntityManager
        }
    }
}

export const setTenant = async (req: Request, res: Response, next: NextFunction) => {
    const tenant = req.headers['x-tenant'] as string;
    console.log(tenant)
    if (!tenant) {
        return res.status(400).json({
            status: 'fail',
            message: 'No tenant provided!'
        });
    }

    try {
        await myDataSource.manager.connection.query(`USE ${tenant}`);

        req.tenant = tenant;
        req.entityManager = myDataSource.manager;
    } catch (error) {
        return res.status(400).json({
            status: 'fail',
            message: 'Tenant not found!'
        });
    }

    next();
}