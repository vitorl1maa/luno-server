import { Client } from 'pg';

export const PostgresClient = {
    client: undefined as unknown as Client,

    async connect(): Promise<void> {
        const host = process.env.POSTGRES_HOST || "localhost";
        const port = parseInt(process.env.POSTGRES_PORT || "5432", 10);
        const user = process.env.POSTGRES_USER || "postgres";
        const password = process.env.POSTGRES_PASSWORD || "admin";
        const database = process.env.POSTGRES_DB || "users-db";

        const client = new Client({
            host,
            port,
            user,
            password,
            database
        });

        await client.connect();
        this.client = client;

        console.log("Connected to PostgreSQL!");
    }
}