import React from "react";

export default class App extends React.Component {

 constructor(props) {

   super(props);

   this.input = React.createRef();

 }


 handleSubmit = (event) => {

   alert('輸入名字：' + this.input.current.value);

   event.preventDefault();

 }


 render() {

   return (

     <form onSubmit={this.handleSubmit}>

       <label>

         Name:

         <input type="text" defaultValue="Bob" ref={this.input} />

       </label>

       <input type="submit" value="Submit" />

     </form>

   );

 }

}

