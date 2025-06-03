import express from 'express';
import { config } from 'dotenv'
import { PostgresClient } from './database/postgres';
import userRoutes from './routes/user/user.routes';
import authRoutes from './routes/auth/auth.routes';
import { authMiddleware } from './middleware/auth-middleware';

const main = async () => {
    config();
    const app = express();
    app.use(express.json());

    await PostgresClient.connect();

    app.use(authRoutes);
    // app.use(authMiddleware);
    app.use(userRoutes);

    const port = process.env.PORT || 8000;
    app.listen(port, () => {
        console.log(`Servidor rodando em http://localhost:${port}`);
    });
};

main();


