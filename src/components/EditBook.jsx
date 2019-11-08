import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class EditBook extends Component {
  state = {
    author: "",
    name: ""
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render() {
    const { author, name } = this.state;
    const values = { name, author };
    let url = this.props;
    return (
      <div>
        <h1 className="display-4 mt-2">Edit Book</h1>

        <form onSubmit={this.props.editBookHandler.bind(this, values, url)}>
          <div className="form-group">
            <input
              type="text"
              placeholder="Book Name..."
              className="form-control"
              name="name"
              onChange={this.handleChange}
              required
            />
            <input
              type="text"
              placeholder="Author..."
              className="form-control mt-2"
              name="author"
              onChange={this.handleChange}
              required
            />
            <button type="submit" className="col btn btn-secondary mt-2">
              Edit
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(EditBook);
