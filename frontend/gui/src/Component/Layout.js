import React, {useState} from 'react'
import { Container } from '@material-ui/core'
import TabUI from './TabUI'
import TabProfile from './TabProfile'

function Layout() {

    const [show, setShow] = useState(localStorage.getItem('show'));

    const [user, setUser] = useState({
        username : "",
        password : ""
    });

    const [token, setToken] = useState(localStorage.getItem('token'));

    const [ids , setIds] = useState(localStorage.getItem('id'));

    return (
        <div className="app">
            <Container style={{ backgroundColor: '#cfe8fc', height: '500px', width: '500px' }}>
                {show === "no" || show ==="" ? <TabUI setShow={setShow} setToken={setToken} setUser= {setUser} user={user} setIds={setIds} token={token} />:<TabProfile setShow={setShow} setIds={setIds} ids={ids} setToken={setToken} token={token} />}
            </Container>
        </div>
    )
}

export default Layout
