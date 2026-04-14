import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
} from "typeorm";
import { v4 as uuidv4 } from "uuid";

@Entity("lease")
export class Lease {
  @PrimaryGeneratedColumn()
  id!: number;   // index

  @Column({ unique: true })
  leaseId!: string;

  @Column()
  tenant!: string;

  @Column()
  property!: string;

  @Column({ type: "date" })
  start!: string;

  @Column({ type: "date" })
  end!: string;

  @Column("decimal", { precision: 10, scale: 2 })
  rent!: number;

  @Column("decimal", { precision: 10, scale: 2, nullable: true })
  deposit!: number;

  @Column({ default: "Active" })
  status!: string;

  @Column({ type: "text", nullable: true })
  notes!: string;

  // User who created this lease (just store ID, no relation)
  @Column()
  userId!: number;

  // Documents in JSON format
  @Column("json", { nullable: true })
  docs!: { name: string; url?: string; type?: string; uploadedAt?: string }[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @BeforeInsert()
  generateLeaseId() {
    this.leaseId = "LSE_" + uuidv4();
  }
}
