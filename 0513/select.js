import React from "react";

export default class App extends React.Component {

constructor(props) {

  super(props);

  this.state = {value: ''};

}

handleChange = (event) => {

  this.setState({value: event.target.value});

}

handleSubmit = (event) => {

  alert('選擇的口味是：' + this.state.value);

  event.preventDefault();

}

render() {

 let message = '';

 if (this.state.value) {

   message = <h3>選擇的口味是：{this.state.value}</h3>;

 } else {

   message = '';

 }

 return (

   <React.Fragment>

    <form onSubmit={this.handleSubmit}>

      <label>

        選擇喜歡的口味：

        <select value={this.state.value} onChange={this.handleChange}>

          <option value="葡萄柚">葡萄柚</option>

          <option value="檸檬">檸檬</option>

          <option value="西瓜">西瓜</option>

          <option value="芒果">芒果</option>

        </select>

      </label>

      <input type="submit" value="Submit" />

    </form>

    {message}

    </React.Fragment>

  );

}

}

