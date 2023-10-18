import logo from './logo.svg';
import './App.css';

function App() {
  const handleSubscription = async () => {
    console.log('Handling subscription...');

    try {
      const registration = await navigator.serviceWorker.ready;
      const applicationServerKey = 'BHAPStR6i0NCCcEIniu5t7RVjLxdKY-2WF50UyuU42xtAcauh-JZsHBHLRDxCpriFptA7_b6uY-F5SYkRPIAhzo';

      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: applicationServerKey ,
      });

      const subscriptionData = {
        endpoint: subscription.endpoint,
        keys: {
          auth: subscription.toJSON().keys.auth,
          p256dh: subscription.toJSON().keys.p256dh,
        },
      };
  
      await sendSubscriptionToServer(subscriptionData);
    } catch (error) {
      console.error('Error subscribing to push notifications:', error);
    }
  };
  
  const sendSubscriptionToServer = async (subscription) => {
    try {
      const yourAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTEsImVtYWlsIjoiZW1tYWVsdWdiYWp1QGdtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY5NjUxOTE4NCwiZXhwIjoxNjk2NjA1NTg0fQ.UT_qjuLfuFT-bZkSvGMGLKUAy-Otxq02nBnWykVLf6E';

      const response = await fetch('http://localhost:8000/api/v1/admin/save-push-notification-subscription', {
        method: 'POST',
        body: JSON.stringify(subscription),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${yourAccessToken}`
        },
      });
  
      if (response.status === 200) {
        console.log('Subscription data sent to server successfully');
      } else {
        console.error('Failed to send subscription data to server');
      }
      
    } catch (error) {
      console.error('Error sending subscription data:', error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <br></br>
        <button onClick={handleSubscription}>
          Subscribe to Push Notifications
        </button>
      </header>
    </div>
  );
}

export default App;
