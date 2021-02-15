import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Incident } from "./Incident";


@Entity()
export class Location {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", nullable: true, unique: true })
    coordinates: string;

    @Column({ type: "varchar", nullable: false, unique: true })
    address: string;

    @OneToMany(() => Incident, (incident) => incident.location, { cascade: true })
    incidents: Incident[];

}