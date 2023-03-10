import mainPage from '../pages/mainPage'

const homePage = new mainPage();

describe('OMDb Technical Tests', () => {
    //using beforeEach instead of before because it will navigate out of the shadow DOM after each individual command. Re-navigating is not ideal-this needs to be fixed. cy.session wasn't working because I have no value to pass into the "id" parameter, like there would be if logging in.
    before(() => {
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
        cy.get('[type="text"]').should('have.css', 'outline', 'rgb(0, 0, 0) none 0px').then(($searchBar) => {
            cy.get($searchBar).click();
        })
        cy.get('[type="text"]').invoke('css', 'outline').should('include', 'auto 1px');
    })

    // it('Validate Movie Page Displays Correct Content', () => {
    //    homePage.openCard('shark');
    //    homePage.moviePageImage();
    // })
    // As per the spec, this test does not function, but this is how it would be written if it were to function.

     it('Paste Movie Title', () => {
        // cy.get('[type="text"]').type('fan{selectAll}{ctrl+x}')
        // .trigger('keydown', { keyCode: 17})
        // .trigger('keydown', { keyCode: 88})
        // cy.wait(500)
        // cy.get('[type="text"]').trigger('keyup', { keyCode: 17})
        // .trigger('keyup', { keyCode: 88})
        
        
        // const textToPaste = 'cat'
        // cy.get('[type="text"]').type('pants{selectAll}{backspace}cat', {force:true})

      
        // cy.get('[id="results"]').click({force:true})
        // cy.get('[type="text"]').type('cat').invoke('val').as('paste')
        // cy.get('@paste').then((pasted) => {
        //     cy.get('[id="results"]').click({force:true})
        //     .wait(3000)
        //     cy.get('[type="text"]').type('{selectAll}{ctrl+c}dog',)
        //     .wait(4000)
        //     .invoke('val',pasted)
        // })
    
        // cy.get('[type="text"]').invoke('val', 'cat').then(() => {
            cy.window().its('navigator.clipboard').invoke('writeText','test')
            
        //         win.navigator.clipboard.writeText('copied text')
      
           
        //     .invoke('writeText','test','copied text')
        //     .invoke('readText').should('equal', 'copied text')
        // })

        // cy.window().then(win => {
        //     win.navigator.clipboard.writeText('copied text').then((text) => {
        //         expect(text).to.eq('copied text')
        //     })
        // })

        // cy.get('[type="text"]').invoke('val', textToPaste)
        // cy.wait(3000)
       
        // .type('{backspace}t',{force:true})
        // .trigger('keyup', { keyCode: 49})
        // homePage.cardImg();
        // homePage.cardYear();
        // homePage.cardYearText();
        // homePage.cardTitle();
      })

    it('Mock Movie Data', () => {
        cy.fixture('exampleMovie').then((data) => {
            homePage.populateList('Hat')
            // homePage.cardTitle() 
            //figure out how to use the return of the above method instead of getting it a second time
            cy.get('movie-title').eq(0).find('h3').invoke('text', data.movieTitle)
        })
    })

})