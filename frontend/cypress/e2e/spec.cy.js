
describe('test de connexion admin', () => {
  it('Logs in successfully', () => {

    //Visiter la page Home
    cy.visit('http://localhost:3000')

    //cy.get('#login').should('exist').should('be.visible').click()
    // Visiter la page de connexion
    cy.visit('http://localhost:3000/login')

    // Remplir le formulaire de connexion avec des informations valides
    cy.get('input[name="email"]').type('david.abruzzo@sfr.fr')
    cy.get('input[name="password"]').type('Davjess0806-')

    // Cliquer sur le bouton de connexion
    cy.get('button[type="submit"]').click()

        // Vérifier que l'utilisateur est connecté en vérifiant un élément distinctif

    
    cy.get('#admin').should('exist').should('be.visible')
    cy.get('#logout').should('exist').should('be.visible')

    cy.visit('http://localhost:3000/admin')

     // Cliquez sur le bouton "Logout" pour exécuter la fonction logout
     cy.get('#logout button').click()
    

    //cy.get('#login').should('exist').should('be.visible')
    
  })
})
