## Configuring Scheduled Notifications
#### Schedule (local) notifications via scheduleNotificationAsync().

That method takes one argument - an object where you set the content and the trigger.

##### other properties could be added.

- You find a complete list (+ explanations) of content properties here: https://docs.expo.dev/versions/latest/sdk/notifications/#notificationcontentinput

- And a complete list (+ explanations) of trigger properties here: https://docs.expo.dev/versions/latest/sdk/notifications/#notificationtriggerinput

- The trigger type may be confusing - it's basically a combination of multiple supported object types.

- You could either set an interval in seconds (as we did in the previous lecture) as described here: https://docs.expo.dev/versions/latest/sdk/notifications/#timeintervalnotificationtrigger

- Or you set a specific date (incl. time) at which the notification will be delivered: https://docs.expo.dev/versions/latest/sdk/notifications/#datetriggerinput

- Or you set a daily time at which the notification will be sent (Android-only): https://docs.expo.dev/versions/latest/sdk/notifications/#dailynotificationtrigger

- Or a weekly trigger (Android-only): https://docs.expo.dev/versions/latest/sdk/notifications/#weeklynotificationtrigger

- Or a yearly trigger (Android-only): https://docs.expo.dev/versions/latest/sdk/notifications/#yearlynotificationtrigger

- Or a specific date (iOS-only): https://docs.expo.dev/versions/latest/sdk/notifications/#calendarnotificationtrigger