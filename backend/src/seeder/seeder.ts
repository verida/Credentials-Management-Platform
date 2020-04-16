import {Injectable, Logger} from "@nestjs/common";

import { SuperAdminService } from '../modules/super-admin/super-admin.service';

@Injectable()
export class Seeder {
    constructor(
        private readonly logger: Logger,
        private readonly superAdminService: SuperAdminService,
    ) {}
    async seed() {
        try {
            await this.init();
            this.logger.debug('Successfully completed seeding users...');
        } catch (e) {
            this.logger.error('Failed seeding users...');
            throw e.message;
        }
    }
    async init() {
        return await Promise.all(this.superAdminService.create())
            .then(createdLanguages => {
                // Can also use this.logger.verbose('...');
                this.logger.debug(
                    'No. of languages created : ' +
                    // Remove all null values and return only created languages.
                    createdLanguages.filter(
                        nullValueOrCreatedLanguage => nullValueOrCreatedLanguage,
                    ).length,
                );
                return Promise.resolve(true);
            })
            .catch(error => Promise.reject(error));
    }
}
