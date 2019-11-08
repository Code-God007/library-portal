import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class AddBook extends Component {
  state = {
    author: "",
    bookName: ""
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render() {
    const { author, bookName } = this.state;
    const values = { author, bookName };
    let url = this.props;
    return (
      <div className="container">
        <div className="col">
          <h1 className="display-3 mt-2">Add Book</h1>
          <form onSubmit={this.props.addBookHandler.bind(this, values, url)}>
            <div className="form-group">
              <input
                type="text"
                placeholder="Book Name..."
                className="form-control"
                name="bookName"
                onChange={this.handleChange}
              />
              <input
                type="text"
                placeholder="Author..."
                className="form-control mt-2"
                name="author"
                onChange={this.handleChange}
              />
              <button className="col btn btn-primary mt-2">Add</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(AddBook);
