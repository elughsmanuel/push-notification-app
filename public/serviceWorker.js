/* eslint-disable no-restricted-globals */

self.addEventListener('push', function(event) {
  const payload = event.data.json();

  const options = {
    body: payload.body,
    icon: payload.icon,
    badge: payload.badge,
    data: payload.data,
  };

  event.waitUntil(
    self.registration.showNotification(payload.title, options)
  );
});
