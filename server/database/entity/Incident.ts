import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User";
import { Location } from "./Location";
import { Min, IsDate } from "class-validator";

@Entity()
export class Incident {
	@PrimaryGeneratedColumn({ type: "uuid" })
	id: string;

	@Min(20)
	@Column({ type: "text" })
	description: string;

	@IsDate()
	@Column({ type: "timestamptz" })
	reported: Date;

	@ManyToOne(() => User, (user) => user.incidents)
	user: User;

	@ManyToOne(() => Location, (location) => location.incidents)
	location: Location;
}
