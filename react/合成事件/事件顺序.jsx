import React from "react";

class EventDemo extends React.Component {
  constructor(props) {
    super(props);
    this.parent = React.createRef();
    this.child = React.createRef();
  }
  componentDidMount() {
    this.parent.current.addEventListener("click", (e) => {
      console.log("dom parent");
    });
    this.child.current.addEventListener("click", (e) => {
      console.log("dom child");
    });
    document.addEventListener("click", (e) => {
      console.log("document");
    });
  }

  childClick = (e) => {
    console.log("react child");
  };

  parentClick = (e) => {
    console.log("react parent");
  };

  render() {
    return (
      <div onClick={this.parentClick} ref={this.parent}>
        <div onClick={this.childClick} ref={this.child}>
          test Event
        </div>
      </div>
    );
  }
}

export default EventDemo;
