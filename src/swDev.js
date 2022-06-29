export default function swDev() {
  function determineAppServerKey() {
    const vapidPublicKey =
      "BAEP-v4KSdz5D2ZozCb63nUAtMHeUokD9B_n5fXpRlvPDQ8O69G_ZOVfafjAyjaF7k9iMUqrL9je8shMyIppJBo";
    return urlBase64ToUint8Array(vapidPublicKey);
  }

  function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/\-/g, '+')
      .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }

  let swUrl = `${process.env.PUBLIC_URL}/sw.js`
  navigator.serviceWorker.register(swUrl).then((response) => {
    console.log("response", response)

    return response.pushManager.getSubscription()
      .then(function (subscription) {
        response.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: determineAppServerKey()
        })


      })

  })
}