import { useQuery } from '@apollo/client';
import React from 'react'
import { ListOfFriends, ThisUser } from '../api/queries';

type Friend = {
  Nickname: string,
  friend: {
    ID:number,
    Username:string,
    date_of_birth:string,
  }
}

function FriendsSection({
  ID
}:{ID:number}) {
  const {loading, data, error} = useQuery(ListOfFriends(ID));
  return (
    <div>
      <h3>Friends ...</h3>
      {
        loading ? 
          <p>loading...</p>
          :
          error ? <span className="error"> ERROR </span>
          : 
          data.firends.map((fr:Friend) => (
            <div>
              {fr.Nickname ? fr.Nickname : fr.friend.Username}
              <p>{fr.friend.date_of_birth}</p>
            </div>
          ))

      }
      
    </div>
  )
}

export default FriendsSection