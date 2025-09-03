"import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class MatchExplanation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'jsonb' })
  progressData: any; // Can store JSON data

  @Column({ type: 'text' })
  explanation: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}"