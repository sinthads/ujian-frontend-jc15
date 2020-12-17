import React, { Component } from 'react';
import Axios from "axios";
import {api_url} from "../helpers/api_url";
import {Table, Button} from "reactstrap"

class TransactionPage extends Component {
    state = { transaction: []  }


    componentDidMount() {
		this.fetchTransaction();
	}

	fetchTransaction = () => {
		Axios.get(`${api_url}/transaction`)
			.then((res) => {
				this.setState({
					transaction: res.data,
				});
			})
			.catch((err) => {});
    };

    cancelOrder = (id, items) => {
		items.forEach((val) => {
			Axios.get(`${api_url}/products?name=${val.name}`)
				.then((res) => {
					Axios.patch(`${api_url}/products/${res.data[0].id}`, {
						stock: res.data[0].stock + val.qty,
					})
						.then((res) => {})
						.catch((err) => {});
				})
				.catch((err) => {});
		});
		Axios.delete(`${api_url}/transaction/${id}`)
			.then((result) => {
				this.fetchTransaction();
			})
			.catch((err) => {});
	};

    
    renderTransaction = () => {
		const { transaction } = this.state;

		return transaction.map((val, index) => {
			let res = val.items.map((val) => {
				return (
					<div className="d-flex justify-content-between">
						<div>name: {val.name}</div>
						<img src={val.image} alt="img not found" height="40px" />

						<div>price: {val.price}</div>
						<div>qty: {val.qty}</div>
					</div>
				);
			});
			return (
				<tr>
					<td>{index + 1}</td>
					<td>{val.date}</td>
					<td>{res}</td>
					<td>{val.total}</td>
					<td>Belum Bayar</td>
					<td>
                        <Button 
                        onClick={() => this.cancelOrder(val.id, val.items)}
                        >
							Cancel Order
						</Button>
					</td>
					<td></td>
				</tr>
			);
		});
	};





    render() { 
        return ( 
            <div>
                <Table style={{ textAlign: "center" }}>
					<thead>
						<tr>
							<th>#</th>
							<th>Date</th>
							<th>Items</th>
							<th>Detail</th>
							<th>Status</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>{this.renderTransaction()}</tbody>
				</Table>

            </div>
         );
    }
}
 
export default TransactionPage;