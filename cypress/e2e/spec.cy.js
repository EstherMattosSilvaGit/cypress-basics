describe('Trello App Tests', () => {
  // Capturar erros não capturados da aplicação
  Cypress.on('uncaught:exception', (err, runnable) => {
    // Logar o erro para debug
    console.error('Uncaught Exception:', err)
    // Retornar false para não falhar o teste
    return false
  })

  beforeEach(() => {
    // Acessa a página inicial do Trello
    cy.visit('/')
  })

  it('deve exibir a página inicial', () => {
    cy.contains('My Boards').should('be.visible')
    cy.contains('Create New Board').should('be.visible')
  })

  it('deve abrir o modal de criar board', () => {
    cy.get('#createBoardBtn').click()
    cy.contains('Create New Board').should('be.visible')
    cy.get('#boardNameInput').should('be.visible')
  })

  it('deve fechar o modal ao clicar em Cancel', () => {
    cy.get('#createBoardBtn').click()
    cy.get('#cancelCreateBtn').click()
    cy.get('#createBoardModal').should('not.have.class', 'show')
  })

  it('deve criar um novo board com sucesso', () => {
    cy.get('#createBoardBtn').click()
    cy.get('#boardNameInput').type('Meu Primeiro Board')
    cy.get('#confirmCreateBtn').click()
    
    // Verifica se foi redirecionado para a página do board
    cy.url().should('include', '/board/')
  })

  it('deve criar múltiplos boards', () => {
    // Criar primeiro board
    cy.get('#createBoardBtn').click()
    cy.get('#boardNameInput').type('Board 1')
    cy.get('#confirmCreateBtn').click()
    cy.url().should('include', '/board/')
    
    // Voltar e criar segundo board
    cy.visit('/')
    cy.get('#createBoardBtn').click()
    cy.get('#boardNameInput').type('Board 2')
    cy.get('#confirmCreateBtn').click()
    cy.url().should('include', '/board/')
  })

  it('deve permitir criar board com tecla Enter', () => {
    cy.get('#createBoardBtn').click()
    cy.get('#boardNameInput').type('Board com Enter')
    cy.get('#boardNameInput').type('{enter}')
    
    // Verifica se foi redirecionado
    cy.url().should('include', '/board/')
  })
})