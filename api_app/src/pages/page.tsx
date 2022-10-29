import React from 'react'
//import { useMyQueryQuery } from '../utils/__generated__/graphql'
import {Spinner} from "react-bootstrap";

import { useQuery, gql} from '@apollo/client';

const MyQuery = gql`
  query MyQuery {
    test {
      ID
      password
      username
    }
  }
`;


export const Page = () => {
  const {loading, data, error} = useQuery(MyQuery);

  return <div>
    <h2>not poo</h2>
    {
      loading ?
      <Spinner animation="border"/> :
      data.test.map(({ ID, password, username}:{ID: number,password: string, username: string}) => (
        <div key={ID}>
          <h3>{username}</h3>
          <br />
          <b>About this location:</b>
          <p>{password}</p>
          <br />
        </div>
      ))
    }
    <h3>after poo</h3>
  </div>
}