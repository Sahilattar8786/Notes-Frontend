import React from 'react'
import { footer,Container,Row ,Col} from 'react-bootstrap'

export default function Footer() {
  return (
    <>
      <footer style={{
        width:"100px",
        position:"relative",
        bottom:0,
        display:'flex',
        justifyContent:"center"
      }}>
        <Container>
           <Row>
                 <Col className='text-center'>@ <i class="fa fa-copyright" aria-hidden="true">2024</i></Col>
           </Row>
          </Container>
      </footer>
    </>
  )
}
