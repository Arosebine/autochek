import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Vehicle } from './vehicle.entity';

@Entity()
export class LoanApplication {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  applicantName: string;

  @Column('decimal', { precision: 10, scale: 2 })
  applicantIncome: number;

  @Column('decimal', { precision: 10, scale: 2 })
  loanAmount: number;

  @Column() 
  applicantCreditScore: number;

  @Column()
  loanTerm: number;

  @Column()
  eligibilityStatus: string

  @Column()
  interestRate: number

  @Column({ enum: [ "pending", "approved", "rejected"], default: "pending" })
  status: string;

  @ManyToOne(() => Vehicle, (vehicle) => vehicle.loanApplications)
  vehicle: Vehicle;
}