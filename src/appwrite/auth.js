import config from "../config/config.js";
import { Client, Account, ID } from "appwrite";

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId);    

        this.account = new Account(this.client);
    }

    async createAccount({ email, password, name }) {
        try {

            const userAccount = await this.account.create(ID.unique(), email, password, name);

            if (userAccount)
                return this.login({email, password});

            else
                return userAccount;

        } catch (error) {
            alert("Something went wrong, Try creating the account again...");
            throw error;
        }
    }

    async login({ email, password }) {
        try {

            return await this.account.createEmailPasswordSession(email, password);

        } catch (error) {
            alert("Oops! Wrong credentials...");
            throw error;
        }
    }

    async getCurrentUser() {
        try {

            return await this.account.get();

        } catch (error) {
            alert("Please Login to read and create blogs...");
            console.error("Appwrite serive :: getCurrentUser :: error", error);
        }

        return null;
    }

    async logout() {
        try {

            return await this.account.deleteSessions();

        } catch (error) {
            alert("Please try for logout again...");
            console.error("Appwrite serive :: logout :: error", error);
        }
    }
}

const authService = new AuthService();

export default authService;