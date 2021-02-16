interface PGUser {
	email: string;
	uid: string;
}

import { getConnection, getRepository } from "typeorm";
import { User } from "../database/entity/User";

export const createPGUser = async (user: PGUser): Promise<boolean> => {
	try {
		const result = await getConnection()
			.createQueryBuilder()
			.insert()
			.into(User)
			.values(user)
			.execute();
		//console.log("PG result")
		//console.log(result)
		return true;
	} catch (e) {
		console.log(e.message);
		return false;
	}
};

export const getUserByEmail = async (email: string): Promise<User | null> => {
	try {
		const repository = getRepository(User);
		const user = repository.findOne({ email: email });
		return user;
	} catch (e) {
		//console.log(e.code);
		//console.log(e.message);
		return null;
	}
};
