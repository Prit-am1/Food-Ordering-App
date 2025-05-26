import React from "react";

class User extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      count: 0,
      userInfo: {
        avatar_url: "dummy_url",
        name: "dummy_name",
        location: "dummy_location",
      },
    };
  }

  async componentDidMount() {
    const data = await fetch("https://api.github.com/users/Prit-am1");
    const result = await data.json();
    console.log(result);

    this.setState({
      userInfo: result,
    });
  }

  componentDidUpdate() {
    console.log("This will run after componetDidMount");
  }

  componentWillUnmount() {
    console.log("This will run after componetDidUnmount");
  }

  render() {
    const { name, location, avatar_url } = this.state.userInfo;
    const { count } = this.state;

    return (
      <div className="body-card">
        <h2>count : {count}</h2>
        <button
          onClick={() => {
            this.setState({
              count: count + 1,
            });
          }}
        >
          Count Increase
        </button>
        <img src={avatar_url} />
        <h1>User name: {name}</h1>
        <h2>User Location: {location}</h2>
      </div>
    );
  }
}

export default User;
