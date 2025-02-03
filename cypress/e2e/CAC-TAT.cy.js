/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function () {
  beforeEach(function () {
    cy.visit('./src/index.html')
  })

  it('verifica o título da aplicação', function () {

    cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')



  })

  it('preenche os campos obrigatórios e envia o formulário', function () {

    const longText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ac eros nec lacus tincidunt laoreet. Nullam nec velit sed elit luctus venenatis. Nulla facilisi. Sed auctor, mi nec fermentum consectetur, mi mauris luctus n'

    cy.get('#firstName').type('Izabela')
    cy.get('#lastName').type('Costa')
    cy.get('#email').type('izabela@email.com')
    cy.get('#phone').type('(83)9999-0131')
    cy.get('#open-text-area').type(longText, { delay: 0 })
    cy.get('button[type="submit"]').click()

    cy.get('.success').should('be.visible')




  })

  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function () {

    cy.get('#firstName').type('Izabela')
    cy.get('#lastName').type('Costa')
    cy.get('#email').type('izabelaemail.com')
    cy.get('#phone').type('(83)9999-0131')
    cy.get('#open-text-area').type('testando')
    cy.get('button[type="submit"]').click()

    cy.get('.error').should('be.visible')






  })

  it('Campo do telefone segue vazio se preenchido com valor não numérico', function () {


    cy.get('#phone')
      .type('ABC')
      .should('have.value', '')


  })

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function () {


    cy.get('#firstName').type('Izabela')
    cy.get('#lastName').type('Costa')
    cy.get('#email').type('izabela@email.com')
    cy.get('#open-text-area').type('testando')
    cy.get('#phone-checkbox').click()
    cy.get('button[type="submit"]').check()

    cy.get('.error').should('be.visible')


  })
  it('preenche e limpa os campos nome, sobrenome, email e telefone', function () {


    cy.get('#firstName')
      .type('Izabela')
      .should('have.value', 'Izabela')
      .clear()
      .should('have.value', '')
    cy.get('#lastName')
      .type('Costa')
      .should('have.value', 'Costa')
      .clear()
      .should('have.value', '')
    cy.get('#email')
      .type('izabela@email.com')
      .should('have.value', 'izabela@email.com')
      .clear()
      .should('have.value', '')
    cy.get('#phone')
      .type('99990131')
      .should('have.value', '99990131')
      .clear()
      .should('have.value', '')

  })

  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function () {

    cy.get('button[type="submit"]').click()

    cy.get('.error').should('be.visible')


  })

  it('envia o formuário com sucesso usando um comando customizado', function () {


    cy.fillMandatoryFieldsAndSubmit()

    cy.get('.success').should('be.visible')


  })

  it('utilize comando cy.contains', function () {

    cy.get('#firstName').type('Izabela')
    cy.get('#lastName').type('Costa')
    cy.get('#email').type('izabela@email.com')
    cy.get('#phone').type('(83)9999-0131')
    cy.get('#open-text-area').type('testando')
    cy.contains('button', 'Enviar').click()

    cy.get('.success').should('be.visible')

  })

  it('seleciona um produto (YouTube) por seu texto', function () {

    cy.get('#product')
      .select('youtube')
      .should('have.value', 'youtube')

  })

  it('seleciona um produto (Blog) por seu índice', function () {

    cy.get('#product')
      .select(1)
      .should('have.value', 'blog')

  })

  it('marca o tipo de atendimento "Feedback"', function () {

    cy.get('input[type="radio"][value="feedback"]')
      .check()
      .should('be.checked')

  })

  it('marca o tipo de atendimento', function () {

    cy.get('input[type="radio"]')
      .each(typeOfService => {
        cy.wrap(typeOfService)
          .check()
          .should('be.checked')

      })
  })
  it('marca ambos checkboxes, depois desmarca o último', () => {
    cy.get('input[type="checkbox"]')
      .check()
      .should('be.checked')
      .last()
      .uncheck()
      .should('not.be.checked')
  })

  it('seleciona um arquivo da pasta fixtures', () => {
    cy.get('#file-upload')
      .selectFile('cypress/fixtures/example.json')
      .should(input => {
        expect(input[0].files[0].name).to.eq('example.json')
      })


  })

  it('seleciona um arquivo simulando um drag-and-drop', () => {
    cy.get('#file-upload')
      .selectFile('cypress/fixtures/example.json', { action: 'drag-drop' })
      .should(input => {
        expect(input[0].files[0].name).to.eq('example.json')
      })


  })
  it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
    cy.fixture('example.json').as('example')
    cy.get('#file-upload')
      .selectFile('@example')
      .should(input => {
        expect(input[0].files[0].name).to.eq('example.json')
      })
  })

  it('testa a página da política de privacidade de forma independente', () => {
    cy.contains('a', 'Política de Privacidade')
      .should('have.attr', 'href', 'privacy.html')
      .and('have.attr', 'target', '_blank')

  })

  it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
    cy.contains('a', 'Política de Privacidade')
      .invoke('removeAttr', 'target')
      .click()
    
    cy.contains('h1', 'CAC TAT - Política de privacidade')

  })
})









