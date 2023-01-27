import { Button, Card, Image, Label } from 'semantic-ui-react'
import { LoadingComponent } from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';

export const ActivityDetails = () => {
    const { activityStore } = useStore();
    const { selectedActivity, closeForm, cancelSelectedActivity, openForm } = activityStore;

    if (!selectedActivity) return <LoadingComponent />

    return (
        <Card fluid>
            <Image src={`/assets/categoryImages/${selectedActivity?.category}.jpg`} wrapped ui={false} />
            <Card.Content>
                <Card.Header>{selectedActivity?.title}</Card.Header>
                <Card.Meta>
                    <span>{selectedActivity?.date}</span>
                </Card.Meta>
                <Card.Description>{selectedActivity?.description}</Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button.Group widths="2">
                    <Button basic color="blue" content='Edit' onClick={() => openForm()} />
                    <Button basic color="grey" content='Cancel' onClick={() => {
                        closeForm();
                        cancelSelectedActivity();
                    }} />
                </Button.Group>
            </Card.Content>
        </Card>
    )
}
