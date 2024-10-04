describe('Website Testing', () => {
    it('Visits the website and checks title', () => {
      cy.visit('https://example.com');
      cy.title().should('include', 'Example Domain');
    });
  });
  