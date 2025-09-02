```typescript
  async getNotificationStatus(userId: number): Promise<NotificationDeliveryStatus> {
    const notifications = await this.notificationRepository.find({
      where: { recipient: { id: userId } },
      order: { timestamp: 'DESC' },
    });

    if (notifications.length === 0) {
      return NotificationDeliveryStatus.UNREAD;
    }

    return notifications[0].deliveryStatus;
  }

  async updateNotificationStatus(notificationId: number, status: NotificationDeliveryStatus): Promise<void> {
    const notification = await this.notificationRepository.findOne({ where: { id: notificationId } });

    if (!notification) {
      throw new Error(`Notification with ID ${notificationId} not found.`);
    }

    notification.deliveryStatus = status;
    await this.notificationRepository.save(notification);
  }
```