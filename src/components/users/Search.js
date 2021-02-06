import React, { Component } from 'react'

class Search extends Component {

  state = {
    text: ''
  }


  onSubmit = (e) => {
    e.preventDefault()

    if(this.state.text === ''){
      this.props.setAlert('Please enter something', 'light')
    }else{
      this.props.searchUsers(this.state.text)
      this.setState({
        text: ''
      })
      this.props.removeAlert()
    }
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {

    const {showClear, clearUsers} = this.props

    return (
      <div>
        <form onSubmit={this.onSubmit} className="form">
          <input type="text" name="text" placeholder="Search users..." value={this.state.text} onChange={this.onChange}/>
          <input type="submit" value="Search" className="btn btn-dark btn-block"/>
        </form>
        {showClear && (
          <button className="btn btn-light btn-block" onClick={clearUsers}>Clear</button>
        )}
        
      </div>
    )
  }
}

export default Search