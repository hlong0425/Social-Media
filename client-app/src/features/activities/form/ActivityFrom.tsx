import { observer } from 'mobx-react-lite'
import { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Form, Segment } from 'semantic-ui-react'
import { v4 as uuid } from 'uuid';
import { LoadingComponent } from '../../../app/layout/LoadingComponent';
import { Activity } from '../../../app/models/activity';
import { useStore } from '../../../app/stores/store';

const initialState = {
    id: '',
    title: '',
    category: '',
    description: '',
    date: '',
    city: '',
    venue: '',
}

const ActivityFrom = () => {
    const { activityStore } = useStore();
    const { updateActivity, createActivity, loading, loadActivity, loadingInitial } = activityStore;
    const [activityValue, setActivityValue] = useState<Activity>(initialState);
    const { id } = useParams();
    const navigate = useNavigate();

    function handleSubmit() {
        if (!activityValue.id) {
            activityValue.id = uuid();
            createActivity(activityValue).then(() => navigate(`/activities/${activityValue.id}`));
        }
        else {
            updateActivity(activityValue).then(() => navigate(`/activities/${activityValue.id}`));
        }
    }

    useEffect(() => {
        if (id) loadActivity(id).then(activity => setActivityValue(activity ?? initialState))
    }, [id, loadActivity]);

    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = event.target;
        setActivityValue(pre => {
            return { ...pre, [name]: value }
        })
    }

    if (loadingInitial) return <LoadingComponent content='Loading activity...' />

    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off'>
                <Form.Input placeholder='Title' value={activityValue?.title} name='title' onChange={handleInputChange} />
                <Form.TextArea placeholder='Description' value={activityValue?.description} name='description' onChange={handleInputChange} />
                <Form.Input placeholder='Category' name='category' value={activityValue?.category} onChange={handleInputChange} />
                <Form.Input type='date' placeholder='Date' name='date' value={activityValue?.date} onChange={handleInputChange} />
                <Form.Input placeholder='City' name='city' value={activityValue?.city} onChange={handleInputChange} />
                <Form.Input placeholder='Venue' name='venue' value={activityValue?.venue} onChange={handleInputChange} />
                <Button loading={loading} floated='right' positive type='submit' content='Submit' />
                <Button floated='right' type='button' content='Cancel'></Button>
            </Form>
        </Segment>
    )
}

export default observer(ActivityFrom);