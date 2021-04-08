import React from 'react'
import ReactDOM from 'react-dom'



//使用者資訊
function UserInfo(props) {
    return (
        <div className="UserInfo">
            <Avatar user={props.user} />
            <div className="UserInfo-name">{props.user.name}</div>
        </div>
    );

}

//用戶圖片
function Avatar(props) {
    return (
        <img
            className="Avatar"
            src={props.user.avatarUrl}
            alt={props.user.name}
        />
    );
}
//自動偵測日期
function formatDate(date) {
    return date.toLocaleDateString();
}

//資訊
const comment = {
    date: new Date(),
    text: 'I hope you enjoy learning React!',
    author: {
        name: 'Hello Kitty',
        avatarUrl: 'https://placekitten.com/g/64/64',
    },
};

export default class App extends React.Component {
    render() {
        return (
            <div>
                <UserInfo user={this.props.author} />
                <div className="Comment-text">{this.props.text}</div>
                <div className="Comment-date">
                    {formatDate(this.props.date)}
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <App
        date={comment.date}
        text={comment.text}
        author={comment.author}
    />,
    document.getElementById('root')
);