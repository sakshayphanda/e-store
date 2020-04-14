export const notificationsData = {
  offline: {
    icon: 'fas fa-exclamation-circle',
    style: {
      background: '#ec5656'
    },
    message: 'No internet',
    buttons: [
    ]
  },
  online: {
    icon: 'fas fa-wifi',
    style: {
      background: '#71b971'
    },
    message: 'Internet is now connected',
    buttons: [
    ]
  },
  slow: {
    style: {
      background: '#6565e8'
    },
    message: 'Slow Network detected. You may experience delay in response',
    buttons: []
  },
  cart: {
    style: {
      background: '#71b971'
    },
    message: 'Added to cart',
    buttons: []
  }
};
