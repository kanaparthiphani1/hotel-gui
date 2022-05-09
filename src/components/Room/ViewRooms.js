import { Button, ButtonGroup } from 'reactstrap';
import React, { Component } from 'react';
import { toast } from "react-toastify"
import axios from 'axios';
import { Link } from 'react-router-dom';

class ViewRooms extends Component {
    constructor(props){
        super(props)
        this.state={
            rooms : []
        };
    }

    componentDidMount(){
      this.getRooms();  
    }

    getRooms(){
        axios.get("http://localhost:9090/roomapi/findAllRooms")
        .then(response => response.data)
        .then((data)=>{
            this.setState({rooms: data})
        });
    };

    deleteRoom = (roomNum) => {
        axios.delete("http://localhost:9090/roomapi/deleteRoom/" +roomNum)
        .then(response => {
            if(response.data != null){
                alert("Room Deleted Successfully.");
                toast.warning("Room Has been Deleted Successfully");
                this.setState({
                    rooms: this.state.rooms.filter(room => room.roomNum !== roomNum)
                });
            }
        });
    };

    render() {
        return (
            <div>
                <h2 className="text-center"> Room Data </h2>
                <div className="row">
                    <table className="table table-striped table-bordered">

                        <thead>
                            <tr>
                                <th>Room Number</th>
                                <th>Room Type</th>
                                <th>Room Feature</th>
                                <th>Room Capacity</th>
                                <th>Room Price</th>
                                <th>Room Status</th>
                                <th>ACTION</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.rooms.length ===0 ?
                                <tr>
                                    <td colSpan="7">No Rooms Available.</td>
                                </tr>:
                                this.state.rooms.map(
                                    room =>
                                    <tr key ={room.id}>
                                        <td>{room.roomNum}</td>
                                        <td>{room.roomType}</td>
                                        <td>{room.roomFeatures}</td>
                                        <td>{room.roomCapacity}</td>
                                        <td>{room.roomPrice}</td>
                                        <td>{room.roomStatus}</td>
                                        <td>
                                        <ButtonGroup>
                                        <Link to={"updateRoom/"+room.roomNum}  className="btn btn-primary">Update</Link>{''}
                                        {/* <Button color="info">Update</Button>{ ''} */}
                                        <Button color="secondary" onClick={this.deleteRoom.bind(this, room.roomNum)}>Delete</Button>
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

export default ViewRooms;