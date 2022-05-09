import React, { Component } from 'react';
import { Form ,FormGroup,Label,Input,Container,Card,Button } from "reactstrap"
import { Fragment } from 'react';
import axios from 'axios';
import { toast } from "react-toastify"



class AddEmployee extends Component {
    constructor(props){
        super(props);
        this.state = this.initialState;
        this.employeeChange = this.employeeChange.bind(this);
        this.addEmployee = this.addEmployee.bind(this);
    };

    initialState = {
        code:'',name:'',address:'',salary:'',age:'',post:'',mailid:''
    };

    componentDidMount() {
        const employeeId = +this.props.match.params.code;
        if(employeeId) {
            this.findEmployeeByCode(employeeId);
        };
    };

    findEmployeeByCode = (employeeId) => {
        axios.get("http://localhost:9090/staffapi/findStaff/" +employeeId)
            .then(response => {
                if(response.data != null){
                    this.setState({
                        code: this.state.code,
                        name: this.state.name,
                        address: this.state.address,
                        salary: this.state.salary,
                        age: this.state.age,
                        post: this.state.post,
                        mailid: this.state.mailid
                    });
                }
            }).catch((error) => {
                console.error("Error -"+error);
            });
    }

    resetEmployee = () => {
        this.setState(() => this.initialState);
    };

    addEmployee = event => {
        event.preventDefault();

        const employee = {
            code: this.state.code,
            name: this.state.name,
            address: this.state.address,
            salary: this.state.salary,
            age: this.state.age,
            post: this.state.post,
            mailid: this.state.mailid
        };
        axios.post("http://localhost:9090/staffapi/newstaff",employee)
        .then(response => {
            if(response.data != null){
                this.setState(this.initialState);
                toast("Employee Saved Successfully.");
            }
        });
    };

    employeeChange = event => {
        this.setState({
            [event.target.name]:event.target.value
        });
    };

    employeeList = () => {
        return this.props.history.push("/view-employees");
    };

    render() {
        const {code, name, address, salary, age, post, mailid} = this.state;


        return (
            <Fragment>
                <Card>
                    <h2 className="text-center">Input Employee Details</h2>
                    <hr />
                    <Form onSubmit={this.addEmployee} onReset={this.resetEmployee} id="employeeFormID">
                        <FormGroup>
                        <Label for="code">Employee Id</Label>
                        <Input type="text" name="code" id="code" placeholder="Enter Employee Code" autoComplete="off" required
                        value={code}
                        onChange={this.employeeChange}
                        />
                        </FormGroup>
                        <FormGroup>
                        <Label for="name">Employee Name</Label>
                        <Input type="text" name="name" id="name" placeholder="Enter Employee Full Name" autoComplete="off" required
                        value={name}
                        onChange={this.employeeChange}
                        />
                        </FormGroup>
                        <FormGroup>
                        <Label for="address">Employee Address</Label>
                        <Input type="text" name="address" id="address" placeholder="Enter Employee Address" autoComplete="off" required
                        value={address}
                        onChange={this.employeeChange}
                        />
                        </FormGroup>
                        <FormGroup>
                        <Label for="salary">Employee Salary</Label>
                        <Input type="text" name="salary" id="salary" placeholder="Enter Employee Salary" autoComplete="off" required
                        value={salary}
                        onChange={this.employeeChange}
                        />
                        </FormGroup>
                        <FormGroup>
                        <Label for="age">Employee Age</Label>
                        <Input type="text" name="age" id="age" placeholder="Enter Employee Age" autoComplete="off" required
                        value={age}
                        onChange={this.employeeChange}
                        />
                        </FormGroup>
                        <FormGroup>
                        <Label for="post">Employee Post</Label>
                        <Input type="select" name="post" id="post" required
                        value={post}
                        onChange={this.employeeChange}
                        >
                        <option>Select</option>
                        <option>Reseptionist</option>
                        <option>Manager</option>
                        <option>Cleaner</option>
                        <option>Kitchen</option>
                        </Input>
                        </FormGroup>
                        <FormGroup>
                        <Label for="mailid">Employee Mail ID</Label>
                        <Input type="text" name="mailid" id="mailid" placeholder="Enter Employee Mail ID" autoComplete="off" required
                        value={mailid}
                        onChange={this.employeeChange}
                        />
                        </FormGroup>
                        <Container className="text-center">
                        <Button type="submit" color="success">Add Employee</Button>
                        <Button type="reset" color="warning ml-3">Clear</Button>
                        <Button type="button" color="secondary ml-3" onClick={this.employeeList.bind()}>Employee List</Button>
                        </Container>
                    </Form>
                </Card>
            </Fragment>
        );
    }
}

export default AddEmployee;