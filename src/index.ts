import express, { Request, Response, NextFunction } from 'express';
import { config } from 'dotenv';
import { PostgresClient } from './database/postgres';
import userRoutes from './routes/user/user.routes';
import authRoutes from './routes/auth/auth.routes';
import { authMiddleware } from './middlewares/auth-middleware';
import { corsMiddleware, securityHeaders } from './middlewares/cors-middleware';

// Configuração de variáveis de ambiente
config();

// Validação de variáveis de ambiente obrigatórias
const requiredEnvVars = ['JWT_SECRET', 'DATABASE_URL'];
const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);

if (missingEnvVars.length > 0) {
    throw new Error(`Variáveis de ambiente obrigatórias não definidas: ${missingEnvVars.join(', ')}`);
}

const app = express();
const port = process.env.PORT || 8000;

// Middlewares
app.use(express.json());
app.use(corsMiddleware);
app.use(securityHeaders);

// Rotas
app.use(authRoutes);
app.use(authMiddleware as express.RequestHandler);
app.use(userRoutes);

// Tratamento de erros global
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error('Erro não tratado:', err);
    res.status(500).json({ error: 'Erro interno do servidor' });
});

// Tratamento de rotas não encontradas
app.use((req: Request, res: Response) => {
    res.status(404).json({ error: 'Rota não encontrada' });
});

const server = app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});

// Graceful shutdown
const gracefulShutdown = async () => {
    console.log('Recebido sinal de desligamento. Encerrando conexões...');

    server.close(async () => {
        try {
            await PostgresClient.client.end();
            console.log('Conexões encerradas com sucesso');
            process.exit(0);
        } catch (error) {
            console.error('Erro ao encerrar conexões:', error);
            process.exit(1);
        }
    });
};

process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);

// Inicialização do banco de dados
PostgresClient.connect().catch(error => {
    console.error('Erro ao conectar ao banco de dados:', error);
    process.exit(1);
});


