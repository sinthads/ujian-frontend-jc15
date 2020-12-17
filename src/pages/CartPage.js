import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Table } from "reactstrap";
import {fetchCartAction, addQtyAction, subQtyAction, deleteCartAction, checkoutAction} from "../redux/actions"
import Swal from "sweetalert2";


class CartPage extends Component {
    state = {  }

    componentDidMount() {
		const { userID, fetchCartAction } = this.props;
		fetchCartAction(userID);
    }

    addQty = (name, qty, id) => {
		const { addQtyAction, userID } = this.props;
		addQtyAction(name, qty, id, userID);
	};
	subQty = (name, qty, id) => {
		const { subQtyAction, userID } = this.props;
		subQtyAction(name, qty, id, userID);
    };
    
    deleteBtn = (id, userID) => {
		const { deleteCartAction } = this.props;
		deleteCartAction(id, userID);
    };
    
    grandTotal = () => {
		const { cart } = this.props;
		let total = 0;
		cart.forEach((val) => {
			total += val.qty * val.price;
		});
		return total;
    };

    checkOut = () => {
		const { cart, userID, checkoutAction } = this.props;
		let date = new Date();
		let day = date.getDate();
		let month = date.getMonth();
		let year = date.getFullYear();
		const data = {
			date: `${day}-${month}-${year}`,
			total: this.grandTotal(),
			items: cart,
			userID: userID,
		};
		checkoutAction(data);
	};

    
    checkOutAlert = () => {
		Swal.fire({
			title: "Are you sure want to checkout?",
			icon: "question",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Check Out",
		}).then((result) => {
			if (result.isConfirmed) {
				Swal.fire("Success!", "Your cart has been checked out.", "success");
				this.checkOut();
			}
		});
	};

    
    renderCart = () => {
		const { cart } = this.props;
		return cart.map((val) => {
			return (
				<tr>
					<td>{val.name}</td>
					<td>
						<img src={val.image} alt="img not found" height="50px" />
					</td>
					<td>
						<Button onClick={() => this.subQty(val.name, val.qty, val.id)}>
							-
						</Button>
					</td>
					<td>{val.qty}</td>
					<td>
						<Button onClick={() => this.addQty(val.name, val.qty, val.id)}>
							+
						</Button>
					</td>
					<td>{val.qty * val.price}</td>
					<td>
						<Button onClick={() => this.deleteBtn(val.id, val.userID)}>
							delete
						</Button>
					</td>
				</tr>
			);
		});
	};



    render() { 
		const { cart } = this.props;
		if (cart.length === 0) {
			return (
				<div>
					<h3>Your cart is empty</h3>
				</div>
			);
		}
		return (
			<div>
				<Table style={{ textAlign: "center" }}>
					<thead>
						<tr>
							<th>Name</th>
							<th>Image</th>
							<th colspan="3">Qty</th>
							<th>Price</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>{this.renderCart()}</tbody>
					<tfoot>
						<tr>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td>
								<h3>GrandTotal:</h3>
							</td>
							<td> Rp. {this.grandTotal().toLocaleString()}</td>
							<td>
								<Button onClick={this.checkOutAlert}>Check Out</Button>
							</td>
						</tr>
					</tfoot>
				</Table>
			</div>
		);
	}
}

const mapStatetoProps = (state) => {
	return {
		cart: state.cart.cart,
		userID: state.user.id,
	};
};


export default connect (mapStatetoProps, {fetchCartAction, addQtyAction, subQtyAction, deleteCartAction, checkoutAction})(CartPage);