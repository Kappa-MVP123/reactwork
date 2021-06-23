import React from 'react';
class Football extends React.Component {
 shoot() {
   console.log("按下按鈕");
 }
 render() {
   return (
     <button onClick={this.shoot}>按我</button>
   );
 }
}

export default Football;