import React from 'react'
import { useState, useEffect } from 'react'

const url = "https://api.github.com/users"

const GitHubUsers = () => {

    const[users, setUsers] = useState([]);
    const[error, setError] = useState(false);
    const[isLoading, setIsLoading] = useState(false);

    //get the users from the api and pass it to the setUsers
    const getUsers =async() =>{

        setIsLoading(true)
        setError(false)
        try{
        const response = await fetch(url);
        console.log(response);
        if(!response.ok){
            throw new Error("Something went wrong")
        }
        const data = await response.json()
        // console.log(data);
        setUsers(data)
        setIsLoading(false)

        } catch(err){
            console.log(err.message);
            setError(true)
            setIsLoading(false)

        }
    }

    //useEffect call the function that fetches the data once the page loads
    useEffect(()=>{
        getUsers()
    },[])


  return (
    <div className='--bg-primary --py2'>
      
      <div className='container'>
        <header>
            <h1 className='--text-center --text-light'>GitHub Users</h1>
            <div className='--line'></div>
        </header>

        {/* Display loading....when it is still fetching data */}

        {isLoading && (
                <div className='--center-all --p'>
                <h2 className='--text-light'>Laoding....</h2>
                </div>
        ) }
    

        <div className='--grid-25 --py'>
            {/* start mapping immediately the grid display starts, and being down inside a jsx, we use {}
            but because we are checking for error , we dont need the {}*/}
            {error ? (<h4 className='--text-light'>Something went wrong</h4>) : (
                users.map((user)=>{
                    // destructure first
                    const{id, login, avatar_url, html_url} = user;
    
                    return(
                        <div className='--card --bg-light --p --flex-start' key={id}>
                    <img src={avatar_url} alt={login} className='--profile-img --mx'/>
    
                    <span>
                        <h4>{login}</h4>
                        <a href={html_url}>View Profile</a>
                    </span>
                </div>
                    )
    
                })

            )}
            
            
        </div>

      </div>
    </div>
  )
}

export default GitHubUsers
