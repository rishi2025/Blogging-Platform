import config from "../config/config.js";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Db_Services {
    client = new Client();
    databases;
    bucket;

    constructor() {
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId);    

        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({ title, slug, content, featured_img, status, user_id }) {
        try {

            return await this.databases.createDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
                {
                    title, 
                    featured_img,
                    status,
                    user_id,
                    content,
                }
            )

        } catch (error) {
            alert("Server Error...! Could not create post, please copy the content then reload and try again. Sorry for inconvenience.");
            console.error("Appwrite serive :: createPost :: error", error);
        }
    }

    async updatePost(slug, { title, content, featured_img, status, user_id }) {
        try {

            return await this.databases.updateDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
                {
                    title,
                    featured_img,
                    status,
                    user_id,
                    content, 
                }
            )

        } catch (error) {
            alert("Server Error...! Could not update post, please copy the content, then reload and try again. Sorry for inconvenience.");
            console.error("Appwrite serive :: updatePost :: error", error);
        }
    }

    async deletePost(slug) {
        try {

            await this.databases.deleteDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug
            )

            return true;

        } catch (error) {
            alert("Server Error...! Could not delete post, please try again. Sorry for inconvenience.");
            console.error("Appwrite serive :: deletePost :: error", error);
            return false;
        }
    }

    async getPost(slug) {
        try {

            return await this.databases.getDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug
            )

        } catch (error) {
            alert("Server Error...! Could not get the post, please double check the URL and try again. Sorry for inconvenience.");
            console.error("Appwrite serive :: getPost :: error", error);
            return false;
        }
    }

    async getAllPosts(query = [Query.equal("status", "active")]) {
        try {

            return await this.databases.listDocuments(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                query,
            )

        } catch (error) {
            alert("Server Error...! Sorry for inconvenience.");
            console.error("Appwrite serive :: getAllPosts :: error", error);
            return false;
        }
    }

    // file upload services
    async uploadFile(file) {
        try {

            return this.bucket.createFile(
                config.appwriteBucketId,
                ID.unique(),
                file,
            )

        } catch (error) {
            alert("Server Error...! Could not upload file, please try again. Sorry for inconvenience.");
            console.error("Appwrite serive :: uploadFile :: error", error);
            return false;
        }
    }

    async deleteFile(fileId) {
        try {

            return this.bucket.deleteFile(
                config.appwriteBucketId,
                fileId,
            )

        } catch (error) {
            alert("Server Error...! File was not deleted from the server, reach out to us for removing it. Sorry for inconvenience.");
            console.error("Appwrite serive :: deleteFile :: error", error);
            return false;
        }
    }

    getFilePreview(fileId) {
        return this.bucket.getFilePreview(
            config.appwriteBucketId,
            fileId,
        )
    }
}

const dbServices = new Db_Services();
export default dbServices;