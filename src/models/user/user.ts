export interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    gender: "MALE" | "FEMALE" | "OTHER";
    phone: string;
    password?: string;
    createdAt: Date;
    updatedAt: Date;
}