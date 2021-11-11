import knex from 'knex';
import dotenv from 'dotenv';
import users from "./users.json";
import bands from "./bands.json"

dotenv.config();

const connection = knex({
    client: 'mysql',
    connection: {
        host: process.env.DB_HOST,
        port: 3306,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        multipleStatements: true,
    },
});

const createTables = async (): Promise<boolean> => {
    try {
        await connection
            .raw(`
                CREATE TABLE IF NOT EXISTS lama_users (
                    id VARCHAR(255) PRIMARY KEY,
                    name VARCHAR(255) NOT NULL,
                    email VARCHAR(255) NOT NULL UNIQUE,
                    password VARCHAR(255) NOT NULL,
                    role VARCHAR(255) NOT NULL DEFAULT "NORMAL"
                );

                CREATE TABLE IF NOT EXISTS lama_shows (
                    id VARCHAR(255) PRIMARY KEY,
                    week_day VARCHAR(255) NOT NULL,
                    start_time INT NOT NULL,
                    end_time INT NOT NULL,
                    band_id VARCHAR(255) NOT NULL,
                    FOREIGN KEY(band_id) REFERENCES NOME_TABELA_BANDAS(id)
                );

                CREATE TABLE IF NOT EXISTS lama_bands (
                    id VARCHAR(255) PRIMARY KEY,
                    name VARCHAR(255) UNIQUE NOT NULL,
                    music_genre VARCHAR(255) NOT NULL,
                    responsible VARCHAR(255) UNIQUE NOT NULL 
                );
           `);

        console.log("Tabelas criadas com sucesso!");
        return true;
    } catch (e) {
        const error = e as Error;
        console.log(error);
        return false;
    }
};


const insertUsers = async (): Promise<boolean> => {
    try {
        await connection('lama_users').insert(bands);

        console.log("Usuários criados com sucesso!");
        return true;
    } catch (e) {
        const error = e as Error;
        console.log(error);
        return false;
    }
};

const insertBands = async (): Promise<boolean> => {
    try {
        await connection('lama_bands').insert(bands);

        console.log("Posts criados com sucesso!");
        return true;
    } catch (e) {
        const error = e as Error;
        console.log(error);
        return false;
    }
};

const closeConnection = () => { connection.destroy(); };

createTables()
    .then(insertUsers)
    .then(insertBands)
    .finally(closeConnection);