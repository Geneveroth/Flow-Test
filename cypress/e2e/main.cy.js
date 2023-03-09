import mainPage from '../pages/mainPage'

const homePage = new mainPage();

describe('OMDb Technical Tests', () => {
    //using beforeEach instead of before because it will navigate out of the shadow DOM after each individual command. Re-navigating is not ideal-this is to be fixed.
    beforeEach(() => {
        homePage.visit();
    })

    it('Complete a search', () => {
        homePage.populateList('crow');
    })

    it('Test Autocomplete Timing', () => {
          let started          
        cy.get('[type="text"]').type('velc')
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
        homePage.populateList('hat');
        homePage.cardImg();
        homePage.cardYear();
        homePage.cardYearText();
        homePage.cardTitle();
    })

    it('Validate Card Image Size', () => {
        homePage.populateList('fun');
        cy.get('movie-image').eq(0)
        .find('img')
        .invoke('css', 'width')
        .then(str => parseInt(str)).should('eq', 40)
    })

    it('Validate Search Bar Highlight', () => {
        cy.get('[type="text"]').should('have.css', 'outline', 'rgb(0, 0, 0) none 0px')
            .click();
        cy.get('[type="text"]').should('have.css', 'outline', 'rgb(16, 16, 16) auto 1px');
    })

    // it('Validate Movie Page Displays Correct Content', () => {
    //    homePage.openCard('shark');
    //    homePage.moviePageImage();
    // })
    // As per the spec, this test does not function, but this is how it would be written if it were to function.

    // it('Paste Movie Title', () => {
        // cy.get('[type="text"]').type('fan')
        // cy.get('[type="text"]').should('not.be.disabled').type('{selectAll}{ctrl+x}',{force:true})
        
        // const textToPaste = 'pants'
        // cy.get('[type="text"]').invoke('val', textToPaste).then(() => {
        //     cy.get('[type=text]').type('{selectAll}{ctrl+x}')
        //     cy.get('[type=text]').type('{ctrl+x}')
        // })
        // homePage.cardImg();
        // homePage.cardYear();
        // homePage.cardYearText();
        // homePage.cardTitle();
    //   })

    it('Mock Movie Data', () => {
        cy.fixture('exampleMovie').then((data) => {
            homePage.populateList('Hat')
            // homePage.cardTitle() 
            //figure out how to use the return of the above method instead of getting it a second time
            cy.get('movie-title').eq(0).find('h3').invoke('text', data.movieTitle)
        })
    })

})