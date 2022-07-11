import {ValidationError} from "../utils/errors";
import {pool} from "../utils/db";
import {v4 as uuid} from 'uuid';
import {AdEntity, AdRecordResults, NewAdEntity, SimpleAdEntity} from "../types";

export class AdRecord implements AdEntity {
    public id: string;
    public title: string;
    public description: string;

    constructor(obj: NewAdEntity) {
        if (!obj.title || obj.title.length > 100) {
            throw new ValidationError('Nazwa ogłoszenia nie może być pusta ani przekraczać 100 znaków.');
        }
        if (obj.description.length > 1024) {
            throw new ValidationError('Długość opisu nie może przekraczać 1024 znaków.');
        }

        this.id = obj.id;
        this.title = obj.title;
        this.description = obj.description;
    }

    static async getOne(id: string): Promise<AdRecord | null> {
        const [results] = await pool.execute("SELECT * FROM `todolistdb` WHERE id =  :id", {
            id,
        }) as AdRecordResults;
        return results.length === 0 ? null : new AdRecord(results[0]);
    }

    static async findAll(title: string): Promise<SimpleAdEntity[] | null> {
        const [results] = await pool.execute("SELECT * FROM `todolistdb` WHERE title LIKE  :search", {
            search: `%${title === null ? "" : title}%`,
        }) as AdRecordResults;
        return results.length > 0 ? results.map(result => {
            const {
                id,
                title,
                description,
            } = result;
            return {
                id,
                title,
                description,
            }
        }) : [];
    }

    static async findExact(title: string): Promise<SimpleAdEntity[] | null> {
        const [results] = await pool.execute("SELECT * FROM `todolistdb` WHERE title = :title", {
            title,
        }) as AdRecordResults;
        return results.length > 0 ? results.map(result => {
            const {
                id,
                title,
                description,
            } = result;
            return {
                id,
                title,
                description,
            }
        }) : [];
    }

    async insert(): Promise<boolean> {
        if (!this.id) {
            this.id = uuid();
        } else {
            throw new Error('cannot insert something that is already inserted')
        }
        const ad = await AdRecord.findExact(this.title);
        if (!ad.length) {
            await pool.execute("INSERT INTO `todolistdb`(`id`, `title`, `description`) VALUES(:id, :title, :description)", this);
            return true
        }
        return false
    }

    async delete(): Promise<void> {
        const ad = await AdRecord.findExact(this.title);
        await pool.execute("DELETE FROM `todolistdb` WHERE id=:id", {id: ad[0].id});
    }

}
