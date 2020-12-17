import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import {CartPage, LandingPage, LoginPage, TransactionPage} from "./pages";
import {NavigationBar} from "./component";
import {connect} from "react-redux"
import { keepLogin } from './redux/actions';


class App extends Component {
  state = {  }

  componentDidMount(){
    const id = localStorage.getItem("id");
    if (id) {
      this.props.keepLogin(id);
    }
  }

  render() { 
    return ( 
      <div>
        <NavigationBar/>
        <Route path = "/" exact component={LandingPage}/>
        <Route path = "/login" component={LoginPage}/>
        <Route path = "/cart" component={CartPage}/>
        <Route path = "/history" component={TransactionPage}/>
      </div>
     );
  }
}

const mapStatetoProps = (state) => {
	return {
		userID: state.user.id,
	};
};
 
export default connect(mapStatetoProps, {keepLogin})
(App);