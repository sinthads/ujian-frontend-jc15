import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
	Collapse,
	Navbar,
	NavbarToggler,
	NavbarBrand,
	Nav,
	NavItem,
	NavLink,
	UncontrolledDropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
	NavbarText,
} from "reactstrap";
import {logoutAction} from "../redux/actions"
import {Link} from "react-router-dom"



class NavigationBar extends Component {
    state = { isOpen: false };

	toggle = () => {
		this.setState({ isOpen: !this.state.isOpen });
    };

    logout = () => {
		const { logoutAction } = this.props;
		logoutAction();
		localStorage.removeItem("id");
	};
    
    navbarLogedIn = () => {
        const { userID } = this.props;
		if (userID !== 0) {
			return (
				<DropdownMenu right>
					<Link to="/">
						<DropdownItem onClick={this.logout}>Log Out</DropdownItem>
					</Link>
					<Link to="/cart" className="notification">
						<DropdownItem>Cart </DropdownItem>
						<span className="badge">{this.props.cart.length}</span>
					</Link>
					<DropdownItem divider />
					<Link to="/history">
						<DropdownItem>History</DropdownItem>
					</Link>
				</DropdownMenu>
			);
		} else {
			return (
				<DropdownMenu right>
					<Link to="/login">
						<DropdownItem>Login</DropdownItem>
					</Link>
				</DropdownMenu>
			);
		}
  
    }

    render() { 
        const {userEmail} = this.props;

        return (
            <div>
				<Navbar style={{backgroundColor: "#ba494b", color: "white"}} dark expand="md">
					<NavbarBrand href="/">Shoes</NavbarBrand>
					<NavbarToggler onClick={this.toggle} />
					<Collapse isOpen={this.state.isOpen} navbar>
						<Nav className="mr-auto" navbar>
							<UncontrolledDropdown nav inNavbar>
								<DropdownToggle nav caret>
									User
								</DropdownToggle>
								{this.navbarLogedIn()}
							</UncontrolledDropdown>
						</Nav>
						<NavbarText>{userEmail !== "" ? userEmail : ""}</NavbarText>
					</Collapse>
				</Navbar>
            </div>
          );    
    }
}

const mapStatetoProps = (state) => {
    return {
        userID: state.user.id,
		userEmail: state.user.email,
		cart: state.cart.cart
    }
}


 
export default connect (mapStatetoProps, {logoutAction}) (NavigationBar);