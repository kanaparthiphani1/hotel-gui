import { Fragment, useState } from "react"
import { Form ,FormGroup,Label,Input,Container,Card } from "reactstrap"
import React from "react"
import { Button } from "reactstrap"
import axios from "axios"
import ROOM_URL from '../../services/Room';
import { toast } from "react-toastify"


const AddRoom = () => {


  const [room, setRoom] = useState({});
  //Form Handler Function
  const handleForm=(e)=>{
    console.log(room);
    postDatatoServer(room);
    e.preventDefault();
  };

  //Creating function to Post data on server
  const postDatatoServer=(data)=>{
    axios.post(`${ROOM_URL}/newRoom`,data).then(
      (response)=>{
        console.log(response);
        console.log("Success");
        toast.info("Room Has been Added Successfully");
      },
      (error)=>{
        console.log(error);
        console.log("Error");
        toast.warning("ERROR! Something Went Wrong");
      }
    )
  };

    return (
        <Fragment>
          <Card>
        <h2 className="text-center my=3">Input Room Details </h2>
        <hr />
        <Form onSubmit={handleForm}>
        <FormGroup>
        <Label for="roomId">Room Num</Label>
        <Input type="text" name="roomId" id="roomId" placeholder="Enter Room Num to Assign Room ID" autoComplete="off"
        onChange={ (e) => {
          setRoom({...room, roomNum:e.target.value})}}
        />
      </FormGroup>
      <FormGroup row>
        <Label for="roomType" sm={2}>Room Type</Label>
          <Input type="select" name="roomType" id="roomType"
          onChange={ (e) => {
            setRoom({...room, roomType:e.target.value})}}
          >
            <option>Select</option>
            <option>Standard</option>
            <option>Deluxe</option>
            <option>Executive</option>
            <option>Suite</option>
            <option>Presidential</option>
          </Input>
      </FormGroup>
      <FormGroup>
        <Label for="roomView">Room View</Label>
        <Input type="text" name="roomView" id="roomId" placeholder="Enter The Room View Feature." 
        onChange={ (e) => {
          setRoom({...room, roomFeatures:e.target.value})}}
        />
      </FormGroup>
      <FormGroup>
        <Label for="roomCap">Room Capacity</Label>
        <Input type="text" name="roomId" id="roomCap" placeholder="Enter The Capacity of the Room." autoComplete="off"
        onChange={ (e) => {
          setRoom({...room, roomCapacity:e.target.value})}}
        />
      </FormGroup>
      <FormGroup>
        <Label for="roomPrice">Room Price</Label>
        <Input type="text" name="roomPrice" id="roomPrice" placeholder="Enter Room Price Per Night Stay." autoComplete="off"
        onChange={ (e) => {
          setRoom({...room, roomPrice:e.target.value})}}
        />
      </FormGroup>
      <FormGroup>
        <Label for="roomStatus">Room Status</Label>
        <Input type="text" name="roomStatus" id="roomStatus" placeholder="Enter Room Status" 
        onChange={ (e) => {
          setRoom({...room, roomStatus:e.target.value})}}
        />
      </FormGroup>
      <Container className="text-center">
      <Button type="submit" color="success">Add Room</Button>
      <Button type="reset" color="warning ml-3">Clear</Button>
      </Container>
        </Form>
        </Card>
    </Fragment>
    ) 
}

export default AddRoom;