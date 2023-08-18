import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Home from './Home';
import { CurrentUserContextProvider,  } from '../context/UserContext'; // Adjust the import path

describe('<Home />', () => {
  it('renders', () => {
    // Mount the Home component within a mock UserContextProvider
    cy.mount(
      <BrowserRouter>
      <CurrentUserContextProvider user={{/* mock user data */}}>
        <Home />
      </CurrentUserContextProvider>
      </BrowserRouter>  
    );
  });
});
