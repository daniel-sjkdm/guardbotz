import request from "supertest";
import app from "../server";

/**
 * Before all
beforeAll(() => {
	process.env = Object.assign(process.env, { NODE_ENV: "development" });
});
*/

const userData = {
	username: "testuser",
	email: "tylerjesttest21@gmail.com",
	password: "testuserpassword",
};

const token =
	"eyJhbGciOiJSUzI1NiIsImtpZCI6IjYxMDgzMDRiYWRmNDc1MWIyMWUwNDQwNTQyMDZhNDFkOGZmMWNiYTgiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vZGVwbG95bWVudC10ZXN0LTMwMjkxNSIsImF1ZCI6ImRlcGxveW1lbnQtdGVzdC0zMDI5MTUiLCJhdXRoX3RpbWUiOjE2MTM0MTg5MzUsInVzZXJfaWQiOiJjZ1k2MFd2b0E1T1NHUXkxdXF1UTlybUg1ZngyIiwic3ViIjoiY2dZNjBXdm9BNU9TR1F5MXVxdVE5cm1INWZ4MiIsImlhdCI6MTYxMzQxODkzNSwiZXhwIjoxNjEzNDIyNTM1LCJlbWFpbCI6InZhbXBpcmVAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbInZhbXBpcmVAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.XCwL1FsBp3D1yCAdQ41tDlj5XOUW8ypVXpce4JkZ2kEMJ0_O-lxq1x4j-GDuMH5dB1QW5MoUJcw9EGLoj3wZnvf-bZefaGAjC5Iurq5JFDWTQIuKhqkFCmHd0dzosD9iW_kWCsDSWNovK6wv1zc8iC_FjSlLreyRiEYxbzLeD_u-R3eiRH90XMPGUUfwhbh5TinkBexTt5pz8n0H0PlOXs204XkXRjN0uKtIsau3HNrslxPNcT0Wvl3xJ9wS2GTJi-y3Z6fEQGxE7ATlpT0CqgE7ZnCI4Ukn6fbtSUQEZSRnrwJT5h806hCTxG0nRaOqeMBQdJGzcm5QF1oYgCWAdg";

const newPassword = "newuserpassword";
const newUsername = "newusername";

/**
 * USER CRUD ENDPOINTS
 * An user is created at firestore and is automatically added to the postgresql database
 */
describe("USER CRUD", () => {
	it("CREATES USER", async (done) => {
		let res = await request(app).post("/api/auth/").send(userData);
		// @ts-ignore
		// Server responds with 200 (success)
		expect(res.statusCode).toEqual(200);
		// The actual response of the server is 201 (created)
		expect(201);
		done();
	});

	it("GETS USER FROM FIREBASE", async (done) => {
		let res = await request(app)
			.get("/api/auth")
			.query({ userEmail: userData.email });
		// @ts-ignore
		expect(res.statusCode).toEqual(200);
		// The response must have the same user email we registered
		expect(res.body.data.email).toEqual(userData.email);
		done();
	});

	it("GETS USER FROM POSTGRES DATABASE", async (done) => {
		let res = await request(app)
			.get("/api/user")
			.query({ user_email: userData.email });
		// @ts-ignore
		expect(res.statusCode).toEqual(200);
		// @ts-ignore
		// The postgres user record must have the same email
		// as the one we registered
		expect(res.body.data.email).toEqual(userData.email);
		done();
	});
	/*
	it("UPDATES USER", async () => {
		let res = await request(app)
			.put("/api/user")
			.send({
				password: newPassword,
			})
			.set("Authorization", `Bearer ${token}`);
		// @ts-ignore
		expect(res.statusCode).toEqual(200);
	});
    */
	/*
	it("DELETES USER", async () => {
		let res = await request(app)
			.delete("/api/user")
			.set("Authorization", `Bearer ${token}`);
		// @ts-ignore
		expect(res.statusCode).toEqual(200);
		// @ts-ignore
		expect(res.body.error).toBeNull();
	});
    */
});
