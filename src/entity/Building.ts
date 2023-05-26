import { Entity, Column, BaseEntity, Index, PrimaryGeneratedColumn } from "typeorm"

@Entity({engine: 'ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin '})
@Index(["id"], { unique: true }) 
@Index(["building_name_en"], { unique: true })
@Index(["estate_name_en"], { unique: true })
@Index(["building_name_zh"])
@Index(["district","address","year_built"])
@Index(["latitude", "longitude"], { unique: true })
export class Building extends BaseEntity  {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column({length: 1111})
    building_name_en: string

    @Column({length: 1111})
    estate_name_en: string

    @Column({length: 1111, nullable: true, charset: 'utf8mb4', collation: 'utf8mb4_unicode_ci'})
    building_name_zh: string

    @Column({length: 1111})
    district: string

    @Column({length: 1111, nullable: true})
    address: string

    @Column({length: 1111})
    year_built: string

    @Column({length: 1111})
    no_of_units: string

    @Column({length: 1111})
    no_of_storey: string

    @Column({type:'longtext', nullable: true})
    building_description_en: string

    @Column({length: 1111, nullable: true, charset: 'utf8mb4', collation: 'utf8mb4_unicode_ci'})
    building_description_zh: string

    @Column("decimal", {precision: 12, scale: 12})
    latitude: number

    @Column("decimal", {precision: 12, scale: 12})
    longitude: number
}