import React from 'react';
import { useRoutes } from 'react-router-dom';
import { authRoutes } from './sections/auth';
import { useAppRoutes } from './sections/app';
import NotFoundPage from '../pages/notFound/not-found-page';
import DetailsTicket from '../components/home/view/detailsTicket';

const Router = () => {
    const appRoutes = useAppRoutes();
    const routes = useRoutes([
        {
            path: '*',
            element: <NotFoundPage />
        },
        {
            path: '/details-ticket',
            element: <DetailsTicket />
        },
        ...authRoutes,
        ...appRoutes 
    ]);

    return routes;
};

export default Router;
