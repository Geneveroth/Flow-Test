class mainPage {
    visit() {
        cy.visit("/")
    }
    populateList(text) {
        cy.get('[type="text"]').type(text);
        return cy.get('[class="movie-list-item"]').eq(0).should('be.visible');
    }
    cardImg() {
        return cy.get('movie-image').eq(0)
            .find('img')
            .should('be.visible')
            .and('have.class', 'movie-img')
    }
    cardTitle() {
        return cy.get('movie-title').eq(0)
            .find('h3')
            .should('be.visible')
            .and('have.class', 'movie-title')
    }
    cardYear() {
        return cy.get('movie-info').eq(0)
            .find('h2')
            .should('be.visible')
            .and('have.class', 'movie-year')
    }
    cardYearText() {
        return cy.get('movie-info').eq(0)
            .find('h5')
            .should('be.visible')
            .and('have.class', 'movie-year-text')
    }  
    openCard(text) {
        cy.get('[type="text"]').type(text);
        cy.get('[class="movie-list-item"]').eq(0).click();
    }
    moviePageImage() {
        return cy.get('movie-card').eq(0)
            .find('img')
            .should('be.visible')
            .and('have.attr', 'src')
    }

}
module.exports = mainPage;