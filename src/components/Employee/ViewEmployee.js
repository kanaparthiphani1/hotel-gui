import React, { Component } from 'react';
import { Button, ButtonGroup } from 'reactstrap';
import { toast } from "react-toastify"


import axios from 'axios';
import { Link } from 'react-router-dom';

class ViewEmployee extends Component {

    constructor(props){
        super(props);
        this.state = {
            employees : []
        };
    }

    componentDidMount(){
        this.getallemployees();
    }

    getallemployees(){
        axios.get("http://localhost:9090/staffapi/findAllstaff")
        .then(response => response.data)
        .then(data => {
            this.setState({employees: data})
        });
    };

    deleteEmployee = (code) => {
        axios.delete("http://localhost:9090/staffapi/deleteStaff/" +code)
        .then(response => {
            if(response.data != null){
                alert("Employee Deleted Successfully.");
                toast.warning("Employee Has been Deleted Successfully");
                this.setState({
                    employees: this.state.employees.filter(employees => employees.code != code)
                });
            }
        });
    };


    render() {
        return (
            <div>
                <h2 className="text-center"> Employee Data </h2>
                <hr />
                <div className="row">
                    <table className="table table-striped table-bordered">

                        <thead>
                            <tr>
                                <th>Employee Id</th>
                                <th>Employee Name</th>
                                <th>Employee Address</th>
                                <th>Employee Salary</th>
                                <th>Employee Age</th>
                                <th>Employee Post</th>
                                <th>Employee Mail ID</th>
                                <th>ACTION</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.employees.length ===0 ?
                                <tr>
                                    <td colSpan="8">No Employee Available.</td>
                                </tr>:
                                this.state.employees.map(
                                    employees =>
                                    <tr key ={employees.id}>
                                        <td>{employees.code}</td>
                                        <td>{employees.name}</td>
                                        <td>{employees.address}</td>
                                        <td>{employees.salary}</td>
                                        <td>{employees.age}</td>
                                        <td>{employees.post}</td>
                                        <td>{employees.mailid}</td>
                                        <td>
                                        <ButtonGroup>
                                        <Link to={"updateStaff/"+employees.code}  className="btn btn-primary">Update</Link>{''}
                                        {/* <Button color="info">Update</Button> */}
                                        <Button color="secondary" onClick={this.deleteEmployee.bind(this, employees.code)}>Delete</Button>
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

export default ViewEmployee;