import {FieldPacket} from "mysql2";

export interface NewAdEntity extends Omit<AdEntity, 'id'> {
    id?: string;
}

export type AdRecordResults = [AdEntity[], FieldPacket[]]

export interface SimpleAdEntity {
    id: string;
}

export interface AdEntity extends SimpleAdEntity {
    title: string,
    description: string,
}

