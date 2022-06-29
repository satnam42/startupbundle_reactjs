// import React, { Component } from "react";

// class SimpleNotification extends Component {
//   constructor() {
//     super();
//     this.showNotification = this.showNotification.bind(this);
//   }

//   componentDidMount() {
//     if (!("Notification" in window)) {
//       console.log("This browser does not support desktop notification");
//     } else {
//       Notification.requestPermission();
//     }
//   }

//   showNotification() {
//     new Notification("Hey");
//   }

//   render() {
//     return (
//       <div style={{ marginTop: "30vh", marginLeft: "30vw" }}>
//         <button onClick={this.showNotification}>
//           Click to show notification
//         </button>
//       </div>
//     );
//   }
// }

// export default SimpleNotification;

import React, { useEffect } from "react";

const SimpleNotification = () => {
  useEffect(() => {
    console.log(window);
    console.log(document);

    if (!("Notification" in window)) {
      console.log("This browser does not support desktop notification");
    } else {
      Notification.requestPermission();
    }
    return () => {};
  }, []);

  const showNotification = () => {
    new Notification("Notifications Ok");
  };

  return (
    <>
      <div style={{ marginTop: "30vh", marginLeft: "30vw" }}>
        <button onClick={() => showNotification()}>
          Click to show notification
        </button>
      </div>
    </>
  );
};

export default SimpleNotification;
