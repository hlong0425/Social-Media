import { Button, Container, Menu } from 'semantic-ui-react'
import { useStore } from '../stores/store';

export const NavBar = () => {
    const { activityStore } = useStore();
    const { openForm, selectActivity } = activityStore;


    return (
        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item header name="Reactivities">
                    <img src='/assets/logo.png' alt='logo' style={{ marginRight: '10px' }}></img>
                    <div>Reactivities</div>
                </Menu.Item>
                <Menu.Item header name="Activities" />
                <Menu.Item header name="Reactivities">
                    <Button onClick={() => {
                        openForm();
                        selectActivity("");
                    }} positive content="Create Activity" />
                </Menu.Item>
            </Container>
        </Menu>
    )
}
