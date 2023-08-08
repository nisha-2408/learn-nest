import { DataSource, DataSourceOptions } from "typeorm";
import entities from '../tables';

export const dataSourceOptions: DataSourceOptions = {
    type: 'postgres',
    host: '0.0.0.0',
    port: 5438,
    username: 'postgres',
    password: 'postgres',
    database: 'postgres',
    entities: entities,
}

const appDataSource = new DataSource(dataSourceOptions)

export default appDataSource;


