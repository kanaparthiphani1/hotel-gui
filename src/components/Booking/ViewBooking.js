import React, { Component } from 'react';
import { Button, ButtonGroup } from 'reactstrap';
import { toast } from "react-toastify"


import axios from 'axios';
import { Link } from 'react-router-dom';


class ViewBooking extends Component {
    constructor(props){
        super(props);
        this.state = {
            bookings : []
        };

    };

    componentDidMount(){
        this.getallbookings();
    };

    getallbookings(){
        axios.get("http://localhost:9090/findallbookings")
        .then(response => response.data)
        .then(data => {
            this.setState({bookings: data})
        });
    };
    deleteBooking = (id) => {
        axios.delete("http://localhost:9090/deletebooking/" +id)
        .then(response => {
            if(response.data != null){
                alert("Booking Deleted Successfully.");
                toast.warning("Booking Has been Deleted Successfully");
                this.setState({
                    bookings: this.state.bookings.filter(bookings => bookings.id != id)
                });
            }
        });
    };
    render() {
        return (
            <div>
            <h2 className="text-center"> Booking Data </h2>
            <hr />
            <div className="row">
                <table className="table table-striped table-bordered">

                    <thead>
                        <tr>
                            <th>Booking Id</th>
                            <th>Adults</th>
                            <th>Children</th>
                            <th>Guest Phone Number</th>
                            <th>Guest Check_In Date</th>
                            <th>Guest Check_Out Date</th>
                            <th>Room Assigned</th>
                            <th>ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.bookings.length ===0 ?
                            <tr>
                                <td colSpan="8">No Booking Has bee Made.</td>
                            </tr>:
                            this.state.bookings.map(
                                bookings =>
                                <tr>
                                    <td>{bookings.id}</td>
                                    <td>{bookings.number_of_adults}</td>
                                    <td>{bookings.number_of_children}</td>
                                    <td>{bookings.phone}</td>
                                    <td>{bookings.check_in}</td>
                                    <td>{bookings.check_out}</td>
                                    <td>{bookings.room_assign}</td>
                                    <td>
                                    <ButtonGroup>
                                    <Link to={"updateBooking/"+bookings.id}  className="btn btn-primary">Update</Link>{''}
                                    <Button color="secondary" onClick={this.deleteBooking.bind(this, bookings.id)}>Delete</Button>
                                    </ButtonGroup>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>

                </table>

            </div>
        </div>
        );
    }
}

export default ViewBooking;