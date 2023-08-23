import { Request, Response, NextFunction } from 'express';
import { myDataSource } from '../app-data-source';
import { EntityManager } from "typeorm";


declare global {
    namespace Express {
        export interface Request {
            tenant?: string,
        }
    }
}

export const setTenant = async (req: Request, res: Response, next: NextFunction) => {
    const tenant = req.headers['x-tenant'] as string;

    if (!tenant) {
        return res.status(400).json({
            status: 'fail',
            message: 'No tenant provided!'
        });
    }

    try {
        await myDataSource.query(`USE ${tenant}`);

        req.tenant = tenant;
    } catch (error) {
        return res.status(400).json({
            status: 'fail',
            message: 'Tenant not found!'
        });
    }

    next();
}