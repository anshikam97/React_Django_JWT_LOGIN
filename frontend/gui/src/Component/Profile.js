import React, { useState, useEffect } from 'react'
import { TextField, makeStyles, Button } from '@material-ui/core'
import axios from 'axios'

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        //     marginRight: theme.spacing(0.5),
        width: '22.7ch',
    },
}));


function Profile({setIds, ids, token}) {

    const [obj, setobj] = useState({
        id: {},
        user: {
            id: {},
            first_name: "",
            last_name: "",
            email: "",
        },
        phone_no: "",
        address: ""

    })

    useEffect(() => {

        const handleapi = () => {

            axios.get(`http://127.0.0.1:8000/profile/${ids}/`, {
                headers: {
                  'Authorization': `Bearer ${token}`
                }
              }).then((res) => res.data).then((data) => {
                const inp = data[0]
                setobj(inp)
            })
            .catch(error => {
                console.log(error.response);
            });
        };
        handleapi();
    }, []);

    const addUpdate = () => {
        axios.put(`http://127.0.0.1:8000/profile/update/${obj.id}/`, {
            
                "id": obj.id,
                "user": {
                    "id": obj.user.id,
                    "first_name": obj.user.first_name,
                    "last_name": obj.user.last_name,
                    "email": obj.user.email
                },
                "phone_no": obj.phone_no,
                "address": obj.address
            
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            console.log(response)
        })
        .catch(error => {
             console.log(error.response)
        });
    }


    const classes = useStyles();
    return (
        <div>
            <form>
                <div className={classes.root}>
                    <TextField
                        label="First Name"
                        id="outlined-margin-none"
                        className={classes.textField}
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                        size="small"
                        value={obj.user.first_name}
                        onChange={e => setobj({ ...obj, user: { first_name: e.target.value, last_name: obj.user.last_name, email: obj.user.email } })}
                    />
                    <TextField
                        label="Last Name"
                        id="outlined-margin-none"
                        className={classes.textField}
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                        size="small"
                        value={obj.user.last_name}
                        onChange={e => setobj({ ...obj, user: { first_name: obj.user.first_name, last_name: e.target.value, email: obj.user.email } })}
                    />
                </div>

                <TextField
                    id="outlined-full-width"
                    label="Email Address"
                    style={{ margin: 8 }}
                    placeholder=""
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="outlined"
                    size="small"
                    value={obj.user.email}
                    onChange={e => setobj({ ...obj, user: { first_name: obj.user.first_name, last_name: obj.user.last_name, email: e.target.value } })}
                />

                <TextField
                    id="outlined-full-width"
                    label="Phone Number"
                    style={{ margin: 8 }}
                    placeholder=""
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="outlined"
                    size="small"
                    name="obj.phone_no"
                    value={obj.phone_no}
                    onChange={e => setobj({ ...obj, phone_no: e.target.value })}
                />
                <TextField
                    id="outlined-multiline-static"
                    label="Address"
                    style={{ margin: 8 }}
                    fullWidth
                    multiline
                    rows={4}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="outlined"
                    size="small"
                    value={obj.address}
                    onChange={e => setobj({ ...obj, address: e.target.value })}
                />
                <Button variant="contained" onClick={addUpdate} color="secondary" style={{ width: '99%' }}>
                    Update
                </Button>
            </form>
        </div>

    )
}

export default Profile
