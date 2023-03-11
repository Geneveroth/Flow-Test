class mainPage {
    visit() {
        cy.visit("/")
    }
    searchBar() {
       return cy.get('[type="text"]')
    }
    populateList(text, i) {
        cy.get('[type="text"]').type(text);
        return cy.get('[class="movie-list-item"]').eq(i).should('be.visible');
    }
    cardImg(i) {
        return cy.get('movie-image').eq(i)
            .find('img')
            .should('be.visible')
            .and('have.class', 'movie-img')
    }
    cardTitle(i) {
        return cy.get('movie-title').eq(i)
            .find('h3')
            .should('be.visible')
            .and('have.class', 'movie-title')
    }
    cardYear(i) {
        return cy.get('movie-info').eq(i)
            .find('h2')
            .should('be.visible')
            .and('have.class', 'movie-year')
    }
    cardYearText(i) {
        return cy.get('movie-info').eq(i)
            .find('h5')
            .should('be.visible')
            .and('have.class', 'movie-year-text')
    }  
    openCard(text, i) {
        cy.get('[type="text"]').type(text);
        cy.get('[class="movie-list-item"]').eq(i).click();
    }
    moviePageImage(i) {
        return cy.get('movie-card').eq(i)
        .find('img')
        .should('be.visible')
        .and('have.attr', 'src')
    }

}
module.exports = mainPage;