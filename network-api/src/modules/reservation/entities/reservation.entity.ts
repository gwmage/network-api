// ... other imports and decorators ...
import { ReservationStatus } from '../enums/reservation-status.enum';

// ... other entity properties
  @Column({ type: 'enum', enum: ReservationStatus, default: ReservationStatus.RESERVED })
  status: ReservationStatus;
// ...