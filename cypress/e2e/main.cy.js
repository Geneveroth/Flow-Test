import mainPage from '../pages/mainPage'

const homePage = new mainPage();

describe('OMDb Technical Tests', () => {
    //using beforeEach instead of before because it will navigate out of the shadow DOM after each individual command. Re-navigating is not ideal-this is to be fixed.
    beforeEach(() => {
        homePage.visit();
    })

    it('Complete a search', () => {
        homePage.getMovie('crow');
    })

    it('Test Autocomplete Timing', () => {
          let started          
        cy.get('input#search').type('velc')
        .then(() => {
            started = +new Date();
        });
        cy.get('[class="movie-list-item"]').should('be.visible')
        .then(() => {
            const finished = +new Date()
            const elapsed = finished-started
            expect(elapsed, 'cards appear in less than 300ms').to.be.lessThan(301)
        });        
    })
    
    it('Validate Card Contents', () => {
        homePage.getMovie('hat');
        homePage.cardImg();
        homePage.cardYear();
        homePage.cardYearText();
        homePage.cardTitle();
    })

    it('Validate Card Image Size', () => {
        homePage.getMovie('fun');
        cy.get('movie-image').eq(0)
        .find('img')
        .invoke('css', 'width')
        .then(str => parseInt(str)).should('eq', 40)
    })

    it('Validate Search Bar Highlight', () => {
        cy.get('input#search').click();
    })
})