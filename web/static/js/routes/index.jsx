import React from 'react'
import { IndexRoute, Route } from 'react-router'
import MainLayout from 'layouts/Main'
import AuthenticatedContainer from 'containers/Authenticated'
import HomeIndex from 'containers/Home'
import RegistrationsNew from 'containers/Registrations/New'
import SessionsNew from 'containers/Sessions/New'
import BoardsShow from 'containers/Boards/Show'
import CardsShow from 'containers/Cards/Show'

export default () => (
  <Route component={MainLayout}>
    <Route path="/sign_up" component={RegistrationsNew} />
    <Route path="/sign_in" component={SessionsNew} />

    <Route path="/" component={AuthenticatedContainer}>
      <IndexRoute component={HomeIndex} />

      <Route path="/boards/:id" component={BoardsShow}>
        <Route path="cards/:id" component={CardsShow} />
      </Route>
    </Route>
  </Route>
)