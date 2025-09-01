```typescript
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Reservation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  restaurantId: number;

  @Column()
  userId: number;

  @Column({ type: 'timestamptz' })
  reservationDate: Date;

  @Column()
  reservationTime: string;

  @Column()
  partySize: number;

  @Column({ nullable: true })
  cancellationReason: string;

  @Column({ default: 'reserved' })
  status: 'reserved' | 'cancelled';
}

```
