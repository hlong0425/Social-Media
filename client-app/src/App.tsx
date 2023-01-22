import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { Header } from 'semantic-ui-react';
import List from 'semantic-ui-react/dist/commonjs/elements/List';

function App() {
  const [activities, setActivities] = useState([]) as any;

  useEffect(() => {
    axios.get('http://localhost:5000/api/activities')
      .then(response => {
        setActivities(response.data);
      });
  }, []);

  return (
    <div className="App">
      <Header as='h2' icon='user' content='Reactivities' />
      <img src={logo} className="App-logo" alt="logo" />
      <List.Item>
        {activities.sort((a: any, b: any) => +a.title.slice(-1) - +b.title.slice(-1)).map((activity: any) => (<li key={activity.id}>{activity.title}</li>))}
      </List.Item>
    </div>
  );
}

export default App;
