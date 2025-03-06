export interface IBaseRepository<T> {
    findAll(): Promise<T[]>;
    findOne(id: number): Promise<T | undefined>;
    create(entity: T): Promise<T>;
    update(id: number, entity: Partial<T>): Promise<void>;
    delete(id: number): Promise<void>;
}