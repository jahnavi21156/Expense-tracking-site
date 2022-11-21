import React, { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import NavBar from "../NavBar";

import {
  Row,
  Col,
  Card,
  Form,
  InputGroup,
  FormControl,
  Button,
  Alert,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone,
  faEnvelope,
  faLock,
  faUndo,
  faUserPlus,
  faUser,
  faAddressBook,
} from "@fortawesome/free-solid-svg-icons";
import MyToast from "../MyToast";

const REGISTER_URL = "http://localhost:8080/user/register";
const CHECK_URL = "http://localhost:8080/user/check";
 const USER_REQUEST = "USER_REQUEST";
 const USER_SUCCESS = "USER_SUCCESS";
 const USER_FAILURE = "USER_FAILURE";
 const USER_SAVED_SUCCESS = "USER_SAVED_SUCCESS";

const userRequest = () => {
    return {
      type: USER_REQUEST,
    };
  };
  
  const userSavedSuccess = (user) => {
    return {
      type: USER_SAVED_SUCCESS,
      payload: user,
    };
  };
  
  const userSuccess = (users) => {
    return {
      type: USER_SUCCESS,
      payload: users,
    };
  };
  
  const userFailure = (error) => {
    return {
      type: USER_FAILURE,
      payload: error,
    }};

const Register = (props) => {
  const [show, setShow] = useState(false);
  const [s,setS]= useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState();


  const initialState = {
    id:"",
    name: "",
    address: "",
    email: "",
    password: "",
    mobile: "",
  };

  const [user, setUser] = useState(initialState);

  const userChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };
  const idchange = (event) => {
    const { name, value } = event.target;
    setUser ({id: event.target.value})
    setUser({ ...user, [name]: value, id: value });
  };
  

  const dispatch = useDispatch();

  

  const registerUser = async() =>  {
    console.log(user.name==null);

    if(!user.name||!user.email||!user.address||!user.mobile||!user.password)
    {
      setS(true);
          setError("Empty Field");
    }
    else if(!user.email.match(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/))
    {
      setS(true);
      setError("Invalid Email");
    }
    else if(!user.password.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/))
    {
      setS(true);
      setError("Minimum eight characters, at least one letter and one number");
    }
    else if(!user.mobile.match(/^[0-9]{10}$/))
    {
      setS(true);
      setError("Invalid Phone number");
    }

    else
    {
    try {
        const r= await axios.post(CHECK_URL, user);
        if(r.status==404)
        {
          setS(true);
          setError("Invalid email and password");
        }
        else{
          const response = await axios.post(REGISTER_URL, user);

          localStorage.getItem("jwtToken", response.data.token);
          setShow(true);
          setMessage(response.message);
          resetRegisterForm();
          setTimeout(() => {
            setShow(false);
            props.history.push("/login")});
        }
        

      
    } catch (error) {
      setS(true);
          setError("Error while register new user or email Already in Use");
        console.log(error);
    }
  }
  };



  const resetRegisterForm = () => {
    setUser(initialState);
  };

  return (
    <div>
        <NavBar/>
        <br></br>
    <br></br>
    <br></br>
    <br></br>
    
      <div style={{ display: show ? "block" : "none" }}>
        <MyToast show={show} message={message} type={"success"} />
      </div>
      <Row className="justify-content-md-center">
        <Col xs={5}>

          {s ?(<Alert variant="danger" onClose={() => setShow(false)} dismissible>
            {error}
          </Alert>):(<div></div>)} 
           
          
        
          <Card className={"border border-dark bg-dark text-white"}>
            <Card.Header>
              <FontAwesomeIcon icon={faUserPlus} /> Register
            </Card.Header>
            <Card.Body>
              <Form.Row>
                <Form.Group as={Col}>
                  <InputGroup>
                    <InputGroup.Prepend>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faUser} />
                      </InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                      autoComplete="off"
                      type="text"
                      name="name"
                      value={user.name}
                      onChange={userChange}
                      className={"bg-dark text-white"}
                      placeholder="Enter Name"
                    />
                  </InputGroup>
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col}>
                  <InputGroup>
                    <InputGroup.Prepend>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faEnvelope} />
                      </InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                      required
                      autoComplete="off"
                      type="text"
                      name="email"
                      value={user.email}
                      onChange={userChange}
                      className={"bg-dark text-white"}
                      placeholder="Enter Email Address"
                    />
                  </InputGroup>
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col}>
                  <InputGroup>
                    <InputGroup.Prepend>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faLock} />
                      </InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                      required
                      autoComplete="off"
                      type="password"
                      name="password"
                      value={user.password}
                      onChange={userChange}
                      className={"bg-dark text-white"}
                      placeholder="Enter Password"
                    />
                  </InputGroup>
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col}>
                  <InputGroup>
                    <InputGroup.Prepend>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faPhone} />
                      </InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                      autoComplete="off"
                      type="text"
                      name="mobile"
                      value={user.mobile}
                      onChange={idchange}
                      className={"bg-dark text-white"}
                      placeholder="Enter Mobile Number"
                    />
                  </InputGroup>
                  <Form.Row>
                <Form.Group as={Col}>
                  <br></br>
                  <InputGroup>
                    <InputGroup.Prepend>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faAddressBook} />
                      </InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                      autoComplete="off"
                      type="text"
                      name="address"
                      value={user.address}
                      onChange={userChange}
                      className={"bg-dark text-white"}
                      placeholder="Address"
                    />
                  </InputGroup>
                </Form.Group>
              </Form.Row>
                </Form.Group>
              </Form.Row>
            </Card.Body>
            <Card.Footer style={{ textAlign: "right" }}>
              <Button
                size="sm"
                type="button"
                variant="success"
                onClick={registerUser}
                disabled={user.email.length === 0 || user.password.length === 0}
              >
                <FontAwesomeIcon icon={faUserPlus} /> Register
              </Button>{" "}
              <Button
                size="sm"
                type="button"
                variant="info"
                onClick={resetRegisterForm}
              >
                <FontAwesomeIcon icon={faUndo} /> Reset
              </Button>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Register;
