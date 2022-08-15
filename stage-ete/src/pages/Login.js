import { Button, Form, Row, Container, Col } from "react-bootstrap";

import { Grid, Avatar } from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import React, { useRef ,useContext,useEffect } from "react";
import {LoginContext} from "../context/AuthProvider";
import {AuthContext} from '../context/AuthProvider';
import {Link} from 'react-router-dom';
import { useNavigate } from "react-router-dom";



function Login() {

  const username = useRef();
  const password = useRef();
  const [auth, setAuth] = useContext(AuthContext);
  const navigate=useNavigate();
  
 


  const loginContext = useContext(LoginContext);


  useEffect(()=>{
    if(auth){
      switch(auth.role){
        case "Admin":
        return navigate("/", { replace: true });
        case "Producteur":
        return navigate("/producteur", { replace: true });
        case "Moulin":
        return navigate("/moulin", { replace: true });
        case "Labo de control":
        return navigate("/labo", { replace: true });
        case "Unite de stockage":
        return navigate("/stockage", { replace: true });
        case "Unite de mise en bouteille":
        return navigate("/mise_bouteille", { replace: true });
       
        default :
          return navigate("/login", { replace: true });
      }

    }
   
},[auth] );


  const submit = async (e) => {
    e.preventDefault();
    loginContext(username.current.value, password.current.value);
    
  
   
   

  }; 

  const avatarStyle = { backgroundColor: "#1bbd7e" };
  return (
    <>
      <img src="https://i.pinimg.com/736x/13/88/dc/1388dc2487cb62bb47607cf1809b29ad.jpg"></img>
      <Container className="my-5">
        <Row>
          <Col></Col>
          <Col>
            <Grid
              align="center"
              style={{
                position: "absolute",
                bottom: "480px",
                left: "980px",
              }}
            >
              <Avatar style={avatarStyle}>
                <LockOutlinedIcon />
              </Avatar>
              <h2>Sign In</h2>
            </Grid>
            <Form
              style={{
                marginLeft: "800px",
                position: "absolute",
                top: "200px",
                left: "100px",
              }}
            >
              <Form.Group controlId="formBasicEmail">
                <Form.Label style={{ color: "#212529" }}>User Name</Form.Label>
                <input
                  style={{
                    fontFamily: "'Sora', sans-serif",
                    fontWeight: "400",
                    marginBottom: "20px",
                  }}
                  ref={username}
                  name="username"
                  type="text"
                  placeholder="User name"
                  required
                />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label style={{ marginTop: "20px", color: "#212529" }}>
                  Password
                </Form.Label>
                <input
                  style={{
                    marginTop: "10px",
                    width: "50%",
                    height: "40px",
                    borderColor: "rgba(0,0,0,0.1)",
                    padding: "12px 20px",
                    margin: "8px 0",
                    marginRight: "450px",
                    display: "block",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    boxSizing: "border-box",
                    alignItems: "center",
                    fontFamily: "'Sora', sans-serif",
                    fontWeight: "40",
                    marginBottom: "20px",
                  }}
                  ref={password}
                  name="password"
                  type="password"
                  placeholder="Password"
                />
              </Form.Group>

            <Button
                style={{
                  color: "#fff",
                  backgroundColor: "#007bff",
                  borderColor: "#007bff",
                  width: "71px",
                  height: "36px",
                  cursor: "pointer",
                  border: " 1px solid transparent",
                  padding: ".375rem .75rem",
                  marginTop: "10px",
                  borderRadius: ".25rem",
                }}
                onClick={submit}
                variant="primary"
                type="submit"
              >
                Submit
              </Button>
              <p
                style={{
                  marginTop: "20px",
                  marginLeft: "70px",
                  fontWeight: "400",
                  color: "#212529",
                }}
                className="forgot-password text-right"
              >
                Don't have an account ?{" "}
                <a
                  style={{
                    color: "#007bff",
                    textDecoration: "none",
                    backgroundColor: "transparent",
                  }}
                  href="/register"
                >
                  Sign Up
                </a>
              </p>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
}
export default Login;