import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Card, Image } from 'semantic-ui-react'
import { LoadingComponent } from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';

const ActivityDetails = () => {
    const { activityStore } = useStore();
    const { selectedActivity: activity, loadActivity, loadingInitial } = activityStore;
    const { id } = useParams()

    console.log(activity);

    useEffect(() => {
        if (id) loadActivity(id);
    }, [id, loadActivity, activity]);

    if (loadingInitial && !activity) return <LoadingComponent />

    return (
        <Card fluid>
            <Image src={`/assets/categoryImages/${activity?.category}.jpg`} wrapped ui={false} />
            <Card.Content>
                <Card.Header>{activity?.title}</Card.Header>
                <Card.Meta>
                    <span>{activity?.date}</span>
                </Card.Meta>
                <Card.Description>{activity?.description}</Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button.Group widths="2">
                    <Button as={Link} to={`/manage/${activity?.id}`} basic color="blue" content='Edit' />
                    <Button as={Link} to={'/activities'} basic color="grey" content='Cancel' />
                </Button.Group>
            </Card.Content>
        </Card>
    )
}

export default observer(ActivityDetails); 