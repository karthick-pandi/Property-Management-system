import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
class MaintenanceRequest {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  propertyId!: string;

  @Column({ nullable: true })
  tenantId?: string;

  @Column()
  title!: string;

  @Column('text')
  description!: string;

  @Column()
  priority!: string;

  @Column()
  status!: string;

  @Column({ nullable: true })
  assignedTo!: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  estimatedCost!: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  actualCost!: number;

  @Column({ nullable: true })
  scheduledDate!: Date;

  @Column({ nullable: true })
  completedDate!: Date;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}

export default MaintenanceRequest;