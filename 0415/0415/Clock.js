import React from 'react'

export default class Clock extends React.Component {
    constructor(props) {
        super(props);
        this.state = { date: new Date().toLocaleTimeString() };
    }

    componentDidMount() {
        this.timer = setInterval(
            () => this.setState({ date: new Date().toLocaleTimeString() }), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.timer)
    }

    render() {
        return (
            <div>
                <h2>現在時間是{this.state.date}.</h2>
            </div>
        );
    }
}
