// src/entities/Vehicle.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Valuation } from './valuation.entity';
import { LoanApplication } from './loanApplication.entity';

@Entity()
export class Vehicle {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, length: 25 })
  vin: string;

  @Column()
  make: string;

  @Column({ enum: ['excellent', 'good', 'fair', 'poor'] })
  condition: string;

  @Column()
  estimatedValue: number;

  @Column()
  model: string;

  @Column()
  year: number;

  @Column({ enum: ['automatic', 'manual', 'sunroof', 'leatherSeats', 'heatedSeats', 'premiumSound', 'navigation'] })
  features: string;

  @Column()
  mileage: number;

  @OneToMany(() => Valuation, (valuation) => valuation.vehicle)
  valuations: Valuation[];

  @OneToMany(() => LoanApplication, (loanApplication) => loanApplication.vehicle)
  loanApplications: LoanApplication[];
}
