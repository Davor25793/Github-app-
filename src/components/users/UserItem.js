import React  from 'react'
import {Link} from 'react-router-dom'

const  UserItem = ({user}) =>  {

    return (
      <div className="card text-center">
        <img style={{width: '60px'}} className="round-img" src={user.avatar_url} alt=""/>
        <h3>{user.login}</h3>
        <div>
          <Link to={`/user/${user.login}`} className="btn btn-dark btn-sm my-1">More</Link>
        </div>
      </div>
    )
}

export default UserItem
