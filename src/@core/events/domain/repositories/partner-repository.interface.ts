import { IRepository } from "src/@core/common/domain/repository-interface";
import { Partner } from "../entities/partner.entity";

export interface IPartnerRepository extends IRepository<Partner> {}