import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Geometry } from "geojson";
import { Incident } from "./Incident";

@Entity()
export class Location {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column({ type: "geometry", nullable: false, unique: true })
	coordinates: Geometry;

	@Column({ type: "text", nullable: false })
	address: string;

	@OneToMany(() => Incident, (incident) => incident.location, { cascade: true })
	incidents: Incident[];
}
