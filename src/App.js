import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Security, ImplicitCallback, SecureRoute } from "@okta/okta-react";
import { Container } from "react-bootstrap";
import NavBar from "./layout/NavBar";
import Home from "./components/Home";
import RecentBooks from "./components/RecentBooks";
import AddBook from "./components/AddBook";
import EditBook from "./components/EditBook";
import StaffLogin from "./Auth/StaffLogin";
import StaffInfo from "./Auth/StaffInfo";

class App extends Component {
  state = {
    bookList: [],
    updateId: 0
  };

  componentDidMount() {
    this.getBooks();
  }

  getBooks = () => {
    fetch("http://localhost:4000/bookList")
      .then(data => data.json())
      .then(books => {
        this.setState({
          bookList: books
        });
      })
      .catch(err => console.log(err));
  };

  deletBook = id => {
    // this.setState(prevState => {
    //   const updatedBooks = prevState.bookList.filter(book => {
    //     if (book.id !== id) {
    //       return {
    //         book
    //       };
    //     }
    //     return null;
    //   });
    //   return {
    //     bookList: updatedBooks
    //   };
    // });
    fetch(`http://localhost:4000/bookList/${id}`, {
      method: "DELETE"
    })
      .then(() => {
        console.log("Removed");
        this.getBooks();
      })
      .catch(err => {
        console.error(err);
      });
  };

  editBook = id => {
    this.setState({
      updateId: id
    });
  };

  editBookHandler = (values, url, event) => {
    event.preventDefault();
    // this.state.bookList.filter(book => {
    //   if (book.id === this.state.updateId) {
    //     book.author = values.author;
    //     book.name = values.name;
    //   }
    //   return null;
    // });
    // this.setState({
    //   bookList: this.state.bookList
    // });

    const newValues = {
      id: this.state.updateId,
      name: values.name,
      author: values.author
    };

    fetch(`http://localhost:4000/bookList/${this.state.updateId}`, {
      method: "put",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newValues)
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        this.getBooks();
      })
      .catch(err => console.error(err));

    url.history.push("/recent");
  };

  addBookHandler = (values, url, event) => {
    event.preventDefault();
    let tid = this.state.bookList.length + 1;
    const newValues = {
      id: tid,
      name: values.bookName,
      author: values.author
    };
    // const updated = this.state.bookList.concat(newValues);
    // this.setState({
    //   bookList: updated
    // });

    fetch("http://localhost:4000/bookList", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newValues)
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        this.getBooks();
      });

    url.history.push("/recent");
  };

  handleSubmit = (values, url, user, event) => {
    event.preventDefault();
    if (
      values.email === this.state.authEmail &&
      values.password === this.state.authPass
    ) {
      this.setState({
        isLoggedIn: true
      });
      url.history.push(`/${user}-info`);
    } else {
      url.history.push(`/${user}-login`);
    }
  };

  onAuthRequired = ({ history }) => {
    history.push("/login");
  };

  render() {
    return (
      <Router>
        <React.Fragment>
          <Security
            issuer="https://dev-228006.okta.com/oauth2/default"
            clientId="0oa1r3rsalWDyAGtY357"
            redirectUri={window.location.origin + "/implicit/callback"}
            onAuthRequired={this.onAuthRequired}
          >
            <NavBar />
            <Container>
              <Route exact path="/" render={props => <Home />} />

              <Route
                path="/recent"
                render={props => (
                  <RecentBooks
                    {...props}
                    books={this.state.bookList}
                    deletBook={this.deletBook}
                    editBook={this.editBook}
                  />
                )}
              />

              <SecureRoute
                path="/add"
                render={props => (
                  <AddBook
                    {...props}
                    values={this.state.bookList}
                    addBookHandler={this.addBookHandler}
                  />
                )}
              />

              <SecureRoute
                path="/edit"
                render={props => (
                  <EditBook
                    {...props}
                    values={this.state.bookList}
                    editBookHandler={this.editBookHandler}
                  />
                )}
              />

              <Route
                path="/login"
                render={props => (
                  <StaffLogin baseUrl="https://dev-228006.okta.com" />
                )}
              />

              <SecureRoute
                exact
                path="/staff-info"
                render={props => <StaffInfo />}
              />

              <Route path="/implicit/callback" component={ImplicitCallback} />
            </Container>
          </Security>
        </React.Fragment>
      </Router>
    );
  }
}
export default App;
