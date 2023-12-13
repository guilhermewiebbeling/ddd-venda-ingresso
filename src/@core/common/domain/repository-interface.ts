import { AggregateRoot } from "./aggregate-root";

export interface IRepository<T extends AggregateRoot> {

    add(entity: T): Promise<void>;

    findById(id: any): Promise<T | null>

    findAll(): Promise<T[]>;

    delete(entity: T): Promise<void>;
}