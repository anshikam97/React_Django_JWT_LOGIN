import React, { useState } from 'react'
import { TextField, makeStyles, Button } from '@material-ui/core'
import validator from 'validator'
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        width: '22.7ch',
    },
}));

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

function Signup() {
    const classes = useStyles();

    const [signup, setsignup] = useState({
        first_name : "",
        last_name : "",
        email : "",
        password : "",
        username : ""
    })

    // const [obj, setobj] = useState({})

    // const [emails, setEmail] = useState({})
    // const handleEmail = (e) => {
    //     setEmail(e.target.value)
    // }

    // const [phone, setPhone] = useState("")
    // const handlePhone = (e) => {
    //     setPhone(e.target.value)
    // }

    const submitting = () => {
        axios.post('http://127.0.0.1:8000/auth/register/',{
            
            "first_name": signup.first_name,
            "last_name": signup.last_name,
            "email": signup.email,
            "password": signup.password,
            "username": signup.email
            
        }, {
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(response => {
                console.log(response)
                setsignup({
                    first_name : "",
                    last_name : "",
                    email : "",
                    password : "",
                    username : ""
                })
            })
            .catch(error => {
                console.log(error.response)
            });
    }



    return (
        <div>
            <form>
                <div className={classes.root}>
                    <TextField
                        label="First Name"
                        className={classes.textField}
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                        required
                        size="small"
                        onChange={e => setsignup({...signup, first_name: e.target.value}) }
                    />
                    <TextField
                        label="Last Name"
                        className={classes.textField}
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                        required
                        size="small"
                        onChange={e => setsignup({...signup, last_name: e.target.value}) }
                    />
                </div>
                <TextField
                    label="Email Address"
                    type="email"
                    style={{ margin: 8 }}
                    placeholder=""
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="outlined"
                    size="small"
                    required
                    onChange={e => setsignup({...signup, email: e.target.value, username: e.target.value})}
                />
                <TextField
                    label="Password"
                    type="password"
                    style={{ margin: 8 }}
                    placeholder=""
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="outlined"
                    required
                    size="small"
                    onChange={e => setsignup({...signup, password: e.target.value}) }
                />
                {/* <TextField
                    label="Phone Number"
                    type="number"
                    style={{ margin: 8 }}
                    placeholder=""
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="outlined"
                    size="small"
                    onChange={handlePhone}
                    required
                /> */}
                
                <Button type="submit" variant="contained" color="secondary" onClick={submitting} style={{ width: '99%' }}>
                    Signup
                </Button>
            </form>
        </div>

    )
}

export default Signup
