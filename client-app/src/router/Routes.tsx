import { createBrowserRouter, RouteObject } from "react-router-dom";
import App from "../app/layout/App";
import ActivityDashboard from "../features/activities/dashboard/ActivityDashboard";
import ActivityDetails from "../features/activities/details/ActivityDetails";
import ActivityFrom from "../features/activities/form/ActivityFrom";
import HomePage from "../features/home/HomePage";

export const routes: RouteObject[] = [
    {
        path: '/',
        element: <App />,
        children: [
            { path: '', element: <HomePage /> },
            { path: 'activities', element: <ActivityDashboard /> },
            { path: 'activities/:id', element: <ActivityDetails /> },
            { path: 'createActivity', element: <ActivityFrom key='create' /> },
            { path: 'manage/:id', element: <ActivityFrom key='manage' /> },
        ]
    }
];

export const router = createBrowserRouter(routes);