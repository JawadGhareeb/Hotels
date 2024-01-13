import { Client, Account, Databases } from "appwrite";

const client = new Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("651a8b98ef18faf7d38b");

export const account = new Account(client);

export const databases = new Databases(client);

export { ID } from "appwrite";
