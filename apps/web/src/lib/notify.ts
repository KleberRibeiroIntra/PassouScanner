import { notifications } from '@mantine/notifications'

export const notify = {
  success: (message: string) => notifications.show({ color: 'green', message }),
  error: (message: string) => notifications.show({ color: 'red', message }),
}
