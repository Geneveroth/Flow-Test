class mainPage {
    visit() {
        cy.visit("/")
    }
    getMovie(text) {
        cy.get('input#search').type(text);
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
            .find('div')
            .find('h2')
            .should('be.visible')
            .and('have.class', 'movie-year')
    }
    cardYearText() {
        return cy.get('movie-info').eq(0)
            .find('div')
            .find('h5')
            .should('be.visible')
            .and('have.class', 'movie-year-text')
    }  
    openCard() {
        cy.get('movie-list-item').eq(0)
        .find('.movie-list-item').should('be.visible').click()
    }
}
module.exports = mainPage;