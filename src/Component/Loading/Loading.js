import React from 'react'
import { Spinner } from 'react-bootstrap'
export default function Loading() {
  return (
    <div style={{display:'flex',justifyContent:'center',alignItems:'center',height:'100%',width:"100%"}}>
      <Spinner style={{width:100,height:100}} animation="grow" variant="primary"/>
    </div>
  )
}
