import express from 'express';
import { config } from 'dotenv'
import { PostgresClient } from './database/postgres';
import userRoutes from './routes/user/user.routes';
import loginRoutes from './routes/login/login.routes';

const main = async () => {
    config();
    const app = express();
    app.use(express.json());

    await PostgresClient.connect();

    app.use(userRoutes);
    app.use(loginRoutes);

    const port = process.env.PORT || 8000;
    app.listen(port, () => {
        console.log(`Servidor rodando em http://localhost:${port}`);
    });
};

main();


