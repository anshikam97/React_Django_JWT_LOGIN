import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Profile from './Profile'

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={2}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));



export default function TabProfile({setShow, setToken, token, setIds, ids}) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleShow = () => {
    
    setShow("no")
    localStorage.setItem('show', 'no')
    setToken("")
    setIds("")
    localStorage.setItem('id','')
    localStorage.setItem('token','')
  }
  
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" style={{ backgroundColor:'#903b02', alignItems: 'strech'}}>
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example" >
          <Tab label="Profile" {...a11yProps(0)} />
          <Tab label="Logout" onClick={handleShow} {...a11yProps(0)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
          <Profile ids={ids} setIds={setIds} token={token} />
      </TabPanel>
    </div>
  );
}
