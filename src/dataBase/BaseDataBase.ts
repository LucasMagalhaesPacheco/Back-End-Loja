import knex, { Knex } from "knex"
import * as dotenv from 'dotenv'

dotenv.config()


class BaseDataBase {

    // Se tiver conexao , ele é knex , senao ele é null
    private connetion: Knex | null = null;

    protected getConnetion = () => {
        // senao tiver conexao com o banco de dados , cria uma !
        if (!this.connetion) {
            this.connetion = knex({
                client: "mysql",
                connection: {
                    host: process.env.DB_HOST,
                    user: process.env.DB_USER,
                    database: process.env.DB_SCHEMA ,
                    password: process.env.DB_PASSWORD,
                    port: 3306,
                    multipleStatements: true
                }
            })
        }

        return this.connetion
    }
}
export default BaseDataBase