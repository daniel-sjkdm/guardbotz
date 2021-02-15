import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import { Incident } from "./Incident";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 30, unique: true })
    email: string;

    @Column({ type: "boolean", default: false })
    verified_email: boolean;

    @Column({ type: "int", default: 0 })
    age: number;

    @OneToMany(() => Incident, (incident) => incident.user, { cascade: true })
    incidents: Incident[];
    
}
