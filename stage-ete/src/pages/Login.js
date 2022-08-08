import React, { Component} from 'react';
import {Button, Form, Row, Container, Col} from 'react-bootstrap'
import axios from 'axios'
import { Grid, Avatar, } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {withRouter} from '../pages/withRouter';


class Login extends Component{
    
    constructor(){
        super()
        this.state ={
            username: '', 
            password:'',
           
          
            logedInName:'', 
            logedFailed:'',
            flag: null,
        }
    }
    

    changeHandler = (ev)=>{
        let nam = ev.target.name
        let val = ev.target.value
        this.setState({
            [nam]: val
        })
    }

    submit = (e)=>{
        e.preventDefault()
        axios.post('http://localhost:5002/login', this.state)
                .then((response)=>{
                   if(response.data.length){
                    this.setState({
                            logedInName: response.data[0].username.toUpperCase(),
                            flag: 1
                            }) 
                          
                            
                       
                   }else{
                    this.setState({
                        logedFailed: response.data.message,
                        flag: 0
                    })
               
                    }
                
                })
    }
    // componentDidMount() {
    //     axios.get("http://localhost:3001/login").then((response)=>{
    //             if(response.data.logedIn){
    //                 // this.setState({
    //                 //     user: response.data
    //                 // })
    //                 console.log(response)
    //             }
    //         })
    // }
    render(){
        axios.defaults.withCredentials = true;
        //showing welcome or wrong username or password message
        let loginStatus;
        if(this.state.flag === 1){
        //loginStatus = <div  className="alert alert-success alert-dismissible fade show" role="alert">
                      //  <strong style={{position:'absolute',bottom:"100px",left:"960px"}}>Welcome {this.state.logedInName}</strong>
                    //</div>
        //} else if(this.state.flag === 0){
        //loginStatus =   <div  style={{position:'absolute',top:"500px",left:"960px"}} className="alert alert-danger alert-dismissible fade show" role="alert">
                            //<strong >{this.state.logedFailed}</strong><br/> Please try again!
                        //</div>
       }   
       
        



        const avatarStyle={backgroundColor:'#1bbd7e'}
        return (
            <>
            <img src="https://i.pinimg.com/736x/13/88/dc/1388dc2487cb62bb47607cf1809b29ad.jpg"></img>
                <Container  className="my-5">
                    <Row>
                    <Col></Col>
                    <Col>
                    <Grid align='center' style={{
                            position:'absolute',bottom:"480px",left:"980px"
                        }}>
                     <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
                    <h2>Sign In</h2>
                    </Grid>
                        <Form style={{
                            marginLeft:"800px",position:'absolute',top:"200px",left:"100px"
                        }}>
                        <Form.Group controlId="formBasicEmail">
                        <Form.Label style={{color: "#212529"}}>User Name</Form.Label>
                        <Form.Control style={{ fontFamily:"'Sora', sans-serif" ,
                    fontWeight:"400",marginBottom:"20px"}}onChange={this.changeHandler} name='username' type="text" placeholder="User name" required/>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                        <Form.Label style={{marginTop:"20px",color: "#212529"}}>Password</Form.Label>
                        <Form.Control style={{
                    marginTop:"10px",width:"50%",height:"40px",borderColor:"rgba(0,0,0,0.1)",
                    padding:"12px 20px",
                    margin: "8px 0",
                    marginRight: "450px",
                    display: "block",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    boxSizing: "border-box",
                    alignItems: "center",
                    fontFamily:"'Sora', sans-serif" ,
                    fontWeight:"40",
                    marginBottom:"20px",
                    }} onChange={this.changeHandler} name='password' type="password" placeholder="Password" />
                        </Form.Group>





                       

                       
                       
                        <Button style={{    color: "#fff",
                                         backgroundColor: "#007bff",
                                         borderColor: "#007bff",
                                          width:"71px",
                                         height:"36px",cursor: "pointer",    border:" 1px solid transparent",    padding: ".375rem .75rem",
                                       marginTop:"10px",
                                        borderRadius: ".25rem",
                                         }}
                                         onClick={this.submit} variant="primary" type="submit">
                        Submit
                        </Button>
                        <p style={{marginTop:"20px",
                     marginLeft:"70px", fontWeight: "400",color: "#212529",}} className="forgot-password text-right">
                          Don't have an account ? <a style={{    color: "#007bff",
                                                                 textDecoration: "none",
                                                               backgroundColor: "transparent",
                                                              }} href="/register">Sign Up</a>
                        </p>
                        </Form>
                    </Col>
                    <Col>{loginStatus}</Col>
                    </Row>
                   
                </Container>
                
            </>
        )}
}

export default withRouter(Login);