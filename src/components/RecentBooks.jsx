import React, { Component } from "react";
import { ListGroup } from "react-bootstrap";
import { Tooltip } from "react-tippy";
import { Link } from "react-router-dom";

export default class RecentBooks extends Component {
  render() {
    return (
      <div>
        <h1 className="display-4 mt-2">Recently Added Books</h1>
        <ListGroup>
          {this.props.books.map((book, index) => {
            return (
              <ListGroup.Item action key={index}>
                <i className="fas fa-book mr-2"></i>
                <Tooltip
                  position="bottom"
                  trigger="mouseenter"
                  animation="perspective"
                  theme="dark"
                  html={
                    <div>
                      <strong>
                        <i>by {book.author}</i>
                      </strong>
                    </div>
                  }
                >
                  {book.name}
                </Tooltip>
                <button
                  style={{
                    float: "right"
                  }}
                  className="btn btn-danger"
                  onClick={this.props.deletBook.bind(this, book.id)}
                >
                  Delete
                </button>
                <Link to="/edit">
                  <button
                    style={{ float: "right" }}
                    className="btn btn-success mr-2"
                    onClick={this.props.editBook.bind(this, book.id)}
                  >
                    Edit
                  </button>
                </Link>
              </ListGroup.Item>
            );
          })}
        </ListGroup>
      </div>
    );
  }
}
