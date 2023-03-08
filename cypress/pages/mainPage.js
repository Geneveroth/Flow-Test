class mainPage {
    visit() {
        cy.visit("/")
    }
    search(text) {
        cy.get('input#search').type(text);
        cy.get('[class="movie-list-item"]:nth(0)').should('be.visible')
    }
    autocomplete(text) {
        let started          
        cy.get('input#search').type(text)
        .then(() => {
            started = +new Date()
        });
        cy.get('[class="movie-list-item"]:nth(0)').should('be.visible')
        .then(() => {
            const finished = +new Date()
            const elapsed = finished-started
            expect(elapsed, 'cards appear in less than 300ms').to.be.lessThan(301)
        });        
    }
    
}
module.exports = mainPage;