import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User";
import { Location } from "./Location";
import { Min, Max, IsDate,  } from "class-validator";


@Entity()
export class Incident {

    @PrimaryGeneratedColumn()
    id: number;

    @Min(20)
    @Column({ type: "text", unique: true})
    description: string;

    @IsDate()
    @Column({ type: "timestamptz" })
    reported: Date

    @ManyToOne(() => User, (user) => user.incidents)
    user: User;

    @ManyToOne(() => Location, (location) => location.incidents)
    location: Location;
}