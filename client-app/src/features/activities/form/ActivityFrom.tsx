import { observer } from 'mobx-react-lite'
import { ChangeEvent, useState } from 'react';
import { Button, Form, Segment } from 'semantic-ui-react'
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
    const { selectedActivity, closeForm, updateActivity, createActivity, loading } = activityStore;

    const [activityValue, setActivityValue] = useState<Activity>(selectedActivity ?? initialState);

    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = event.target;
        setActivityValue(pre => {
            return { ...pre, [name]: value }
        })
    }

    function handleSubmitForm() {
        if (activityValue.id) {
            updateActivity(activityValue);
        }
        else {
            createActivity(activityValue);
        }
    }

    return (
        <Segment clearing>
            <Form onSubmit={handleSubmitForm} autoComplete='off'>
                <Form.Input placeholder='Title' value={activityValue?.title} name='title' onChange={handleInputChange} />
                <Form.TextArea placeholder='Description' value={activityValue?.description} name='description' onChange={handleInputChange} />
                <Form.Input placeholder='Category' name='category' value={activityValue?.category} onChange={handleInputChange} />
                <Form.Input type='date' placeholder='Date' name='date' value={activityValue?.date} onChange={handleInputChange} />
                <Form.Input placeholder='City' name='city' value={activityValue?.city} onChange={handleInputChange} />
                <Form.Input placeholder='Venue' name='venue' value={activityValue?.venue} onChange={handleInputChange} />
                <Button loading={loading} floated='right' positive type='submit' content='Submit' />
                <Button onClick={closeForm} floated='right' type='button' content='Cancel'></Button>
            </Form>
        </Segment>
    )
}

export default observer(ActivityFrom);