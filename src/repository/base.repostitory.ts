import { IBaseRepository } from "../models/baseRepository.interface.js";

// change to whichever database you are using
export class BaseRepository<T> implements IBaseRepository<T> {
    private data: Map<number, T> = new Map();
    private currentId: number = 1;

    async findAll(): Promise<T[]> {
        return Array.from(this.data.values());
    }

    async findOne(id: number): Promise<T | undefined> {
        return this.data.get(id);
    }

    async create(entity: T): Promise<T> {
        const id = this.currentId++;
        this.data.set(id, entity);
        return entity;
    }

    async update(id: number, entity: Partial<T>): Promise<void> {
        const existingEntity = this.data.get(id);
        if (existingEntity) {
            const updatedEntity = { ...existingEntity, ...entity };
            this.data.set(id, updatedEntity as T);
        }
    }

    async delete(id: number): Promise<void> {
        this.data.delete(id);
    }
}