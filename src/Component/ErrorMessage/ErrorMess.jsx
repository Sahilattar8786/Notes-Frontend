import React, { Children } from 'react'
import { Alert } from 'react-bootstrap'
export default function ErrorMess({ variant = "info", children }) {
  return (
    <div>
      <Alert variant={variant} style={{fontSize:20}}>
        <strong>{children}</strong>
      </Alert>
    </div>
  )
}
