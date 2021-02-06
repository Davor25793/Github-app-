import {BrowserRouter, Route, Switch} from 'react-router-dom'
import React, {Component, Fragment} from 'react'
import Navbar from './components/layout/Navbar'
import Users from './components/users/Users'
import Search from './components/users/Search'
import Alert from './components/layout/Alert'
import About from './components/pages/About'
import User from './components/users/User'
import axios from 'axios'


class App extends Component {

  state = {
    users: [],
    repos: [],
    user: {},
    loading: false,
    alert: null
  }

  // async componentDidMount(){


  //   this.setState({loading: true});

  //   const res = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
      
  //   this.setState({
  //     users: res.data,
  //     loading: false
  //   })

  //   // console.log(res.data)
    
  // }


  //Search github users
  searchUsers = async text => {

    this.setState({
      loading: true
    })

    const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)

    this.setState({
      users: res.data.items, //Nije mi jasno zašto res.data.items
      loading: false
    })

    // console.log(res) //EVO ZAŠTO, SAMO ULOGIRAJ RESPONSE I SVE ĆEŠ VIDJETI!!
  }


  //Fetch a single user
  getUser = async (username) => {

    this.setState({
      loading: true
    })

    const res = await axios.get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)

    this.setState({
      user: res.data,
      loading: false
    })

  }

  //GET REPOS
  getUserRepos = async (username) => {

    this.setState({
      loading: true
    })

    const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)

    this.setState({
      repos: res.data,
      loading: false
    })

  }

  


  //Clear github users
  clearUsers = () => {
    this.setState({
      users: [],
      loading: false
    })
  }

  //Set alert
  setAlert = (msg, type) => {
    this.setState({
      alert: {msg, type}
    })
  }

  //Remove alert
  removeAlert = () => {
    this.setState({
      alert: null
    })
  }


  render(){

    const {users, loading, user, repos} = this.state
 
    return (
      <BrowserRouter>
      <div className="App">
        <Navbar title="Github finder" icon="fab fa-github"/>
        <div className="container">
          <Alert alert={this.state.alert}/>
          <Switch>
            <Route exact path="/" render={props => (
              <Fragment>
                <Search searchUsers={this.searchUsers} clearUsers={this.clearUsers} showClear={this.state.users.length > 0 ? true : false} setAlert={this.setAlert} removeAlert={this.removeAlert}/>
                <Users users={users} loading={loading}/>
              </Fragment>
            )}/>
            <Route exact path="/about" component={About} />
            <Route exact path="/user/:login" render={props => (
              <User {...props} getUser={this.getUser} user={user} loading={loading} getUserRepos={this.getUserRepos} repos={repos}/>
            )} />
          </Switch>
        </div>
      </div>
      </BrowserRouter>
    );
  }
}

export default App;
