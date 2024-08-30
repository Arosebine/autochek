// src/entities/Valuation.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Vehicle } from './vehicle.entity';

@Entity()
export class Valuation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('decimal', { precision: 10, scale: 2 })
  estimatedValue: number;

  @Column({ type: 'date', default: () => 'CURRENT_TIMESTAMP' })
  valuationDate: Date;

  @Column({ type: 'date', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @ManyToOne(() => Vehicle, (vehicle) => vehicle.valuations)
  vehicle: Vehicle;
}
