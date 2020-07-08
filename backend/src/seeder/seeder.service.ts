import { Injectable, Logger } from "@nestjs/common";
import { AdminService } from '../modules/admin/admin.service';

@Injectable()
export class SeederService {
    constructor(
        private readonly logger: Logger,
        private readonly adminService: AdminService,
    ) {}
    async seed() {
        try {
            await this.init();
            this.logger.debug('Successfully completed seeding the users...');
        } catch (e) {
            this.logger.error('Failed seeding the users...');
            throw e.message;
        }
    }
    async init() {
        try {
            await this.adminService.create({
                email: 'admin@verida.com',
                password: 'admin'
            })
        } catch (e) {
            console.log(`Error! ${e.message}`)
        }
    }
}
