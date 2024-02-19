import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';


function Navbartop({ children }) {
    const history= useHistory()
    //logout
    function logout(){
        sessionStorage.clear();
        history.push('/login');
    }
    return (
        <div style={{width:"98%",height:"100vh"}}>
            <Navbar expand="lg" className="bg-success">
                <Container fluid>
                    <Navbar.Brand href="/">Chat</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                        >
                            <Button variant="outline-warning" className='nav-btn-Participant' onClick={() => { history.push('/addnumber') }}>Add new Chat</Button>
                        </Nav>
                        <Nav> <Button variant="outline-warning" className='nav-btn-out' onClick={() =>logout() }>Logout</Button></Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <main>
                {children}
            </main>
        </div>
    );
}

export default Navbartop;