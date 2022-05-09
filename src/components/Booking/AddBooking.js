import React, { Component } from 'react';
import { Form ,FormGroup,Label,Input,Container,Card,Button } from "reactstrap"
import { Fragment } from 'react';
import axios from 'axios';
import { toast } from "react-toastify"

class AddBooking extends Component {
    constructor(props){
        super(props);
        this.state = this.initialState;
        this.bookingChange = this.bookingChange.bind(this);
        this.AddBooking = this.AddBooking.bind(this);
    };

    initialState = {
        id:'',numOfGuests:'',checkin:'',checkout:'',roomId:'',userName:""
    };

    componentDidMount() {
        const bookingId = +this.props.match.params.id;
        if(bookingId) {
            this.findBookingByCode(bookingId);
        };
    };

    findBookingByCode = (bookingId) => {
        axios.get("http://localhost:9090/findbooking/" +bookingId)
            .then(response => {
                if(response.data != null){
                    this.setState({
                        id: this.state.id,
                        number_of_adults: this.state.number_of_adults,
                        number_of_children: this.state.number_of_children,
                        phone: this.state.phone,
                        check_in: this.state.check_in,
                        check_out: this.state.check_out,
                        room_assign: this.state.room_assign
                    });
                }
            }).catch((error) => {
                console.error("Error -"+error);
            });
    };

    resetBooking = () => {
        this.setState(() => this.initialState);
    };

    AddBooking = event => {
        event.preventDefault();

        const booking = {
            id: this.state.id,
            number_of_adults: this.state.number_of_adults,
            number_of_children: this.state.number_of_children,
            phone: this.state.phone,
            check_in: this.state.check_in,
            check_out: this.state.check_out,
            room_assign: this.state.room_assign
        };
        axios.post("http://localhost:8004/api/v2/booking",booking)
        .then(response => {
            if(response.data != null){
                this.setState(this.initialState);
                toast.info("Booking Has been Added Successfully.");
            }
        });
    };

    bookingChange = event => {
        this.setState({
            [event.target.name]:event.target.value
        });
    };

    bookingList = () => {
        return this.props.history.push("/view-bookings");
    };


    render() {
        const {id, number_of_adults, number_of_children, phone, check_in, check_out, room_assign} = this.state;

        return (
            <Fragment >
                <Card style={{marginTop:"0px",backgroundColor:"rgba(255, 255, 255, 0.68)",borderRadius:"20px"}}>
                    <h2 className="text-center">Enter Booking Details</h2>
                    <hr />
                    <Form onSubmit={this.AddBooking} onReset={this.resetBooking} id="employeeFormID">
                        <FormGroup>
                        <Label for="id">Booking Id</Label>
                        <Input type="text" name="id" id="id" placeholder="Enter Booking Id" autoComplete="off" required
                        value={id}
                        onChange={this.bookingChange}
                        />
                        </FormGroup>
                        <FormGroup>
                        <Label for="number_of_adults">Number Of Adults</Label>
                        <Input type="text" name="number_of_adults" id="number_of_adults" placeholder="Enter no. of adults" autoComplete="off" required
                        value={number_of_adults}
                        onChange={this.bookingChange}
                        />
                        </FormGroup>
                        <FormGroup>
                        <Label for="number_of_children">Number Of Children</Label>
                        <Input type="text" name="number_of_children" id="number_of_children" placeholder="Enter no. of children" autoComplete="off" required
                        value={number_of_children}
                        onChange={this.bookingChange}
                        />
                        </FormGroup>
                        <FormGroup>
                        <Label for="phone">Guest Phone Number</Label>
                        <Input type="text" name="phone" id="phone" placeholder="Enter Guest Phone Number" autoComplete="off" required
                        value={phone}
                        onChange={this.bookingChange}
                        />
                        </FormGroup>
                        <FormGroup>
                        <Label for="check_in">Select Check In Date</Label>
                        <Input type="date" name="check_in" id="check_in" placeholder="Enter guest Check In date" autoComplete="off" required
                        value={check_in}
                        onChange={this.bookingChange}
                        />
                        </FormGroup>
                        <FormGroup>
                        <Label for="check_out">Select Check In Date</Label>
                        <Input type="date" name="check_out" id="check_out" placeholder="Enter Guest Check Out Date" autoComplete="off" required
                        value={check_out}
                        onChange={this.bookingChange}
                        />
                        </FormGroup>
                        <FormGroup>
                        <Label for="room_assign">Room Assigned</Label>
                        <Input type="text" name="room_assign" id="room_assign" placeholder="Enter Assigned Room ID" autoComplete="off" required
                        value={room_assign}
                        onChange={this.bookingChange}
                        />
                        </FormGroup>
                        <Container className="text-center">
                        <Button type="submit" color="success">Add Booking</Button>
                        <Button type="reset" color="warning ml-3">Clear</Button>
                        <Button type="button" color="secondary ml-3" onClick={this.bookingList.bind()}>Booking List</Button>
                        </Container>
                    </Form>
                </Card>
            </Fragment>
        );
    }
}

export default AddBooking;