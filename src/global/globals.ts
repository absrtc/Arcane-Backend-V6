import dotenv from 'dotenv';
dotenv.config();

export const globals = {
    BackendName: process.env.NAME || "Arcane",
    ConnectionUri: process.env.DATABASE || "mongodb://localhost:27017/Arcane",
    PORT: process.env.PORT || 3551
};
