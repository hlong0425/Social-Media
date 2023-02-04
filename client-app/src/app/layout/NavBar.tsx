import { NavLink } from 'react-router-dom';
import { Button, Container, Menu } from 'semantic-ui-react'

export const NavBar = () => {
    return (
        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item as={NavLink} to='/' header name="Reactivities">
                    <img src='/assets/logo.png' alt='logo' style={{ marginRight: '10px' }}></img>
                    <div>Reactivities</div>
                </Menu.Item>
                <Menu.Item as={NavLink} to='/activities' header name="Activities" />
                <Menu.Item header name="Reactivities">
                    <Button as={NavLink} to='/createActivity' positive content='Create Activity' ></Button>
                </Menu.Item>
            </Container>
        </Menu>
    )
}
