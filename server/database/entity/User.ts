import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Incident } from "./Incident";
import { IsEmail } from "class-validator";
@Entity()
export class User {
	@PrimaryGeneratedColumn({ type: "uuid" })
	id: string;

	@IsEmail()
	@Column({ type: "varchar", length: 30, unique: true })
	email: string;

	@Column({ type: "boolean", default: false })
	verified_email: boolean;

	@OneToMany(() => Incident, (incident) => incident.user, { cascade: true })
	incidents: Incident[];
}
