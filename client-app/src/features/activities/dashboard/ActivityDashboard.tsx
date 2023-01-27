import { observer } from 'mobx-react-lite'
import { Grid } from 'semantic-ui-react'
import { useStore } from '../../../app/stores/store'
import { ActivityDetails } from '../details/ActivityDetails'
import ActivityFrom from '../form/ActivityFrom'
import ActivityList from './ActivityList'


const ActivityDashboard = () => {
    const { activityStore } = useStore();
    const { selectedActivity, editMode } = activityStore;

    console.log(selectedActivity);

    return (
        <Grid>
            <Grid.Column width='10'>
                <ActivityList />
            </Grid.Column>
            <Grid.Column width='6'>
                {selectedActivity &&
                    <ActivityDetails />}
                {editMode && <ActivityFrom />}
            </Grid.Column>
        </Grid>
    )
}

export default observer(ActivityDashboard); 