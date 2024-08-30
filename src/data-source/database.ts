import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Vehicle } from '../vehicle/entities/vehicle.entity';
import { Valuation } from '../vehicle/entities/valuation.entity';
import { LoanApplication } from '../vehicle/entities/loanApplication.entity';

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: ':memory:',
  synchronize: true,
  logging: false,
  entities: [Vehicle, Valuation, LoanApplication],
  migrations: [],
  subscribers: [],
});



const connectDB = AppDataSource.initialize()
  .then(async () => {
    console.log('Data Source has been initialized!');
  })
  .catch((error) => console.log(error));


export default connectDB;
