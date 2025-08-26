```typescript
import { NotificationEvent } from '../enums/notification-event.enum';
import { DeliveryMethod } from '../enums/delivery-method.enum';

export interface NotificationPreference {
  eventType: NotificationEvent;
  deliveryMethod: DeliveryMethod;
  enabled: boolean;
  startTime?: string;
  endTime?: string;
}
```