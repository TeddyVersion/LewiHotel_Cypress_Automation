describe('Lewi Hotels and Resorts Automation Tests', () => {
  
    beforeEach(() => {
      // Visit the homepage before each test
      cy.visit('https://www.lewihotelsandresort.com/');
    });
  
    it('Homepage Load Test', () => {
      cy.get('body').should('exist'); // Check that the body loads
      cy.get('header').should('be.visible'); // Check header visibility
    });
  
    it('Navigation Menu Test', () => {
      cy.get('nav').find('a').each(($el) => {
        cy.wrap($el).click();
        cy.url().should('include', $el.prop('href')); // Validate the URL
        cy.go('back'); // Go back to homepage for the next test
      });
    });
  
    it('Room Booking Functionality', () => {
      cy.get('#booking-form') // Adjust the selector as needed
        .type('Sample Booking Data') // Fill the form (customize as needed)
        .submit();
      cy.get('.confirmation-message') // Adjust the selector for confirmation message
        .should('contain', 'Thank you for your booking');
    });
  
    it('Room Availability Search', () => {
      cy.get('#search-input') // Adjust the selector as needed
        .type('2024-10-05 to 2024-10-10') // Adjust date range
        .submit();
      cy.get('.availability-results') // Adjust selector for results
        .should('exist');
    });
  
    it('Contact Form Submission', () => {
      cy.get('#contact-form') // Adjust the selector as needed
        .type('Sample Contact Data') // Fill the form (customize as needed)
        .submit();
      cy.get('.success-message') // Adjust the selector for success message
        .should('contain', 'Message sent successfully');
    });
  
    it('Visual Regression Test for Home Page', () => {
      cy.get('body').toMatchImageSnapshot(); // Requires cypress-image-snapshot plugin
    });
  
    it('Responsive Design Test', () => {
      cy.viewport('iphone-6'); // Change to other viewports as needed
      cy.get('body').should('be.visible');
    });
  
    it('User Login and Logout Test', () => {
      cy.get('#login-button').click(); // Adjust as needed
      cy.get('#username').type('testuser'); // Enter test credentials
      cy.get('#password').type('password'); // Enter test credentials
      cy.get('#submit').click();
      cy.get('.user-dashboard').should('exist');
      cy.get('#logout-button').click();
      cy.url().should('include', '/'); // Check if redirected to homepage
    });
  
    it('Testimonials Section Test', () => {
      cy.get('.testimonials').should('be.visible');
    });
  
    it('404 Page Handling Test', () => {
      cy.visit('/non-existent-page'); // Adjust with a non-existent URL
      cy.get('.error-404').should('contain', 'Page not found'); // Adjust selector as needed
    });
  });
  