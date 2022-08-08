import React, { Component} from 'react'
import {Button, Form, Row, Container, Col} from 'react-bootstrap'
import axios from 'axios'
import { Grid, Avatar, Typography } from '@material-ui/core'
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import {withRouter} from '../pages/withRouter';



class Register extends Component {
   
    constructor(){
        super()
        this.state ={
            user_id:'',
            
            username:'', 
            password:'',
            location:'',
            URL:'',
            product_id:'',
            role:'',
            certifications:'',
            n_lots:'',

            password1: '',
           
            message:'', 
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
        // checking password correction and fill the all form
        // after regestratioin redirect to login
        e.preventDefault()
        if(this.state.password === this.state.password1){
            if( this.state.username){
                axios.post('http://localhost:5002/register', this.state)
                .then((response)=>{
                
                    if(response.data.message){
                        this.setState({
                            message:response.data.message,
                            flag: 1
                        })
                        setTimeout(()=>{
                            this.props.navigate('/login')
                        }, 500)
                    }else{
                        this.setState({
                            message:response.data.warning, 
                            flag: 2 
                        })
                    }
                    
                })
                
            }else{
                e.preventDefault()
                alert("Please fill all form")
            }
        }else{
            e.preventDefault()
            alert("Entered Passwords are not match\nPlease try again")
        }
    
    }
    render(){
    let message;
    if(this.state.flag === 1){
        message = <div className="alert alert-danger alert-dismissible fade show" role="alert">
                    <strong>{this.state.message}</strong><br/> 
                </div>
    }else if(this.state.flag === 2){
        message = <div className="alert alert-danger alert-dismissible fade show" role="alert">
                    <strong>{this.state.message}</strong><br/> 
                    Forget Your password?<a href='#'>Click Here</a>
                </div>
    }

   
    const headerStyle = { margin: 0 }
    const avatarStyle = { backgroundColor: '#1bbd7e' }
        return (
            <>
            
            <Container>
                <Row>
                <Col>{message}</Col>
                <Col>
                <Grid align='center' style={{
                    position:"relative",
                    left:"100px",
                  
                }}>
                    <Avatar style={avatarStyle}>
                        <AddCircleOutlineOutlinedIcon />
                    </Avatar>
                    <h2 style={headerStyle}>Sign Up</h2>
                    <Typography variant='caption' gutterBottom>Please fill this form to create an account !</Typography>
                </Grid>
                <Form  style={{
                            marginLeft:"520px"
                        }}>
                    
                   
                    <Form.Group >
                    <Form.Label >User Name</Form.Label>
                    <Form.Control name='username' type="text" placeholder="User Name" onChange={this.changeHandler} required/>
                    </Form.Group>
                    <Form.Group >
                    <Form.Label>Location</Form.Label>
                    <Form.Control name='location' type="text" placeholder="location" onChange={this.changeHandler} required/>
                    </Form.Group>
                    <Form.Group >
                    <Form.Label>URL</Form.Label>
                    <Form.Control name='URL' type="text" placeholder="URL" onChange={this.changeHandler} required/>
                    </Form.Group>
                    <Form.Group >
                    <Form.Label>product_id</Form.Label>
                    <Form.Control name='product_id' type="text" placeholder="product_id" onChange={this.changeHandler} required/>
                    </Form.Group>
                    <Form.Group >
                    <Form.Label>role</Form.Label>
                    <Form.Control name='role' type="text" placeholder="role" onChange={this.changeHandler} required/>
                    </Form.Group>
                    <Form.Group >
                    <Form.Label>certifications</Form.Label>
                    <Form.Control name='certifications' type="text" placeholder="certifications" onChange={this.changeHandler} required/>
                    </Form.Group>
                    <Form.Group >
                    <Form.Label>n_lots</Form.Label>
                    <Form.Control name='n_lots' type="text" placeholder="n_lots" onChange={this.changeHandler} required/>
                    </Form.Group>

                  

                    
                    <Form.Group >
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
                    }} name='password' type="password" placeholder="Password" onChange={this.changeHandler} required />
                    </Form.Group>

                    <Form.Group >
                    <Form.Label style={{marginTop:"20px",color: "#212529"}}>Confirm Password</Form.Label>
                    <Form.Control  style={{
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
                    }}name='password1' type="password"  onChange={this.changeHandler} placeholder="Password" />
                    </Form.Group>
                   
                    <Button style={{    color: "#fff",
                                         backgroundColor: "#007bff",
                                         borderColor: "#007bff",
                                          width:"71px",
                                         height:"36px",cursor: "pointer",    border:" 1px solid transparent",    padding: ".375rem .75rem",
                                       marginTop:"10px",
                                        borderRadius: ".25rem",
                                         }} onClick={this.submit} variant="primary" type="submit">
                    Submit
                    </Button>
                    <p style={{marginTop:"20px",
                     marginLeft:"70px", fontWeight: "400",color: "#212529",}} className="forgot-password text-right">
                          Already have an account ?<a  style={{    color: "#007bff",
                                                                 textDecoration: "none",
                                                               backgroundColor: "transparent",
                                                              }} href="/Login">Sign In</a>
                        </p>
                </Form>  
                </Col>
                <Col></Col>
                </Row>
            </Container>
                
            </>
        )}
}

export default withRouter(Register);