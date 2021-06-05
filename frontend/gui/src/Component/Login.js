import React, {useState} from 'react';
import {TextField, Button}  from '@material-ui/core';
import axios from 'axios';

function Login({setShow, setToken, setUser, user, setIds, token}) {

    const submitting = e => {
        e.preventDefault();
        axios.post('http://127.0.0.1:8000/auth/login/',{

            "username": user.username,
            "password": user.password
            
        }, {
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(response => response.data).then(data =>{
            const access = data.access;
            setToken(access);
            const base64Url = access.split('.')[1];
            const base64 = base64Url.replace('-', '+').replace('_', '/');
            const token_info = JSON.parse(window.atob(base64));
            const set_id = token_info.user_id
            setIds(set_id)
            setShow("yes");
            localStorage.setItem('token', access)
            localStorage.setItem('show', 'yes')
            localStorage.setItem('id', set_id)
            // localStorage.setItem(data)
        })
        .catch(error => {
            console.log(error.response);
        });

    }

    // const parseJwt = (t) => {
    //     if (!t) { return; }
    //     const base64Url = t.split('.')[1];
    //     const base64 = base64Url.replace('-', '+').replace('_', '/');
    //     return JSON.parse(window.atob(base64));
    // }


    return (
        <div>
            <form onSubmit={submitting} >
            <TextField
                label="Email Address"
                style={{ margin: 8 }}
                placeholder=""
                type="email"
                fullWidth
                margin="normal"
                InputLabelProps={{
                    shrink: true,
                }}
                variant="outlined"
                size="small"
                required
                onChange={e => setUser({...user, username: e.target.value})}
            />
            <TextField
                label="Password"
                style={{ margin: 8 }}
                type="password"
                placeholder=""
                fullWidth
                margin="normal"
                InputLabelProps={{
                    shrink: true,
                }}
                variant="outlined"
                required
                size="small"
                onChange={e => setUser({...user, password: e.target.value})}
            />
            <Button type="submit" variant="contained" color="secondary"  style={{width:'99%'}}>
                Login
            </Button>
            </form>
        </div>
    )
}

export default Login
