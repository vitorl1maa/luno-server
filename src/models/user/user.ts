export interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    cpf: string;
    phone?: string;
    password?: string;
    createdAt: Date;
    updatedAt: Date;
}