import React, { useEffect, useState } from 'react'
import './App.css';
import Landing from './Landing';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import AdminLogin from './Admin/Pages/Login'
import AdminRegister from './Admin/Pages/Register'
import AdminNgoList from './Admin/Pages/ngoList'
import AdminVolList from './Admin/Pages/VolList'
import AdminProfile from './Admin/Pages/AdminProfile'
import NgoLogin from './NGO/Pages/Login' 
import NgoDashboard from './NGO/Pages/ngoDashboard' 
import NgoRegister from './NGO/Pages/Register' 
import NgoProfile from './NGO/Pages/ngoProfile' 
import VolLogin from './Volunteer/Pages/Login'
import VolDashboard from './Volunteer/Pages/VolDashboard'
import VolRegister from './Volunteer/Pages/Register'
import VolProfile from './Volunteer/Pages/volProfile'

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState("");
  const [val,setVal]=useState("")

  useEffect(()=>{
    const role=localStorage.getItem("role")
    const token=localStorage.getItem("token")
    if(role && token){
      setIsLoggedIn(true);
      setUserType(role)
    }
    console.log(isLoggedIn,role)
  },[userType])

  
  const handleLogin = (type) => {
    console.log("type")
    setIsLoggedIn(true);
    setUserType(type);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserType(null);
  };

  return (
    <Router>
      <Switch>
        <Route path="/admin/login" exact={true}>
          {isLoggedIn && userType === 'admin' ? (
            <Redirect to="/admin/ngolist" />
          ) : (
            <AdminLogin onLogin={() => handleLogin('admin')} />
          )}
        </Route>
        <Route path="/ngo/login" exact={true}>
          {isLoggedIn && userType === 'ngo' ? (
            <Redirect to="/ngo/dashboard" />
            ) : (
              <NgoLogin onLogin={() => handleLogin('ngo')} />
              )}
              </Route>
          <Route path="/volunteer/login" exact={true}>
          {isLoggedIn && userType === 'vol' ? (
            <Redirect to="/volunteer/dashboard" />
            ) : (
              <VolLogin onLogin={() => handleLogin('vol')} />
              )}
            </Route>
        <Route path="/admin/ngolist" exact={true}>
          {isLoggedIn && userType === 'admin' ? (
            <AdminNgoList onLogout={handleLogout} />
            ) : (
              <Redirect to="/admin/login" />
              )}
        </Route>
        <Route path="/admin/vollist" exact={true}>
          {isLoggedIn && userType === 'admin' ? (
            <AdminVolList onLogout={handleLogout} />
            ) : (
              <Redirect to="/admin/login" />
              )}
        </Route>
        <Route path="/ngo/dashboard" exact={true}>
          {isLoggedIn && userType === 'ngo' ? (
            <NgoDashboard onLogout={handleLogout} />
            ) : (
              <Redirect to="/ngo/login" />
              )}
              </Route>
              <Route path="/volunteer/dashboard" exact={true}>
              {isLoggedIn && userType === 'vol' ? (
                <VolDashboard onLogout={handleLogout} />
                ) : (
            <Redirect to="/volunteer/login" />
            )}
          </Route>
        <Route path="/admin/profile" exact={true}>
          {isLoggedIn && userType === 'admin' ? (
            <AdminProfile />
            ) : (
              <Redirect to="/admin/login" />
              )}
        </Route>
        <Route path="/ngo/profile" exact={true}>
          {isLoggedIn && userType === 'ngo' ? (
            <NgoProfile />
            ) : (
              <Redirect to="/ngo/login" />
              )}
              </Route>
              <Route path="/volunteer/profile" exact={true}>
              {isLoggedIn && userType === 'vol' ? (
                <VolProfile />
                ) : (
                  <Redirect to="/vol/login" />
                  )}
                </Route>
        {/* <Route path="/admin/register" exact={true}><AdminRegister onLogin={() => handleLogin('admin')}/></Route> */}
        <Route path="/volunteer/register" exact={true}>
          {isLoggedIn && userType === 'vol'?(<Redirect to="/volunteer/dashboard" />)
          :(
            <VolRegister onLogin={() => handleLogin('vol')}/>)}
          </Route>
        <Route path="/ngo/register" exact={true}>
          {isLoggedIn && userType === 'ngo' ?
          <Redirect to="/ngo/dashboard" />
          :<NgoRegister onLogin={() => handleLogin('ngo')}/>
        }
        </Route>
        <Route path="/" exact={true}>
          <Landing/>
        </Route>
        <Route path="/:page">
          <Redirect to="/"/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
