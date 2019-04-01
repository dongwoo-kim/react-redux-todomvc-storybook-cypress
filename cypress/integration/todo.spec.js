const todos = [
  {
    id: 1,
    text: 'Have Breakfast',
    completed: true
  },
  {
    id: 2,
    text: 'Have Lunch',
    completed: false
  }
];

beforeEach(() => {
  cy.server();
  cy.route('/todos', todos);
});

describe('should render todo items', () => {
  it('All', () => {
    cy.visit('/All');

    cy.get('[data-testid=todo-item').within(items => {
      expect(items).to.have.length(2);
      expect(items[0]).to.contain('Have Breakfast');
      expect(items[0]).to.have.class('completed');

      expect(items[1]).to.contain('Have Lunch');
      expect(items[1]).not.to.have.class('completed');
    });
  });

  it('Active', () => {
    cy.visit('/Active');

    cy.get('[data-testid=todo-item').within(items => {
      expect(items).to.have.length(1);

      expect(items[0]).to.contain('Have Lunch');
      expect(items[0]).not.to.have.class('completed');
    });
  });

  it('Completed', () => {
    cy.visit('/Completed');

    cy.get('[data-testid=todo-item').within(items => {
      expect(items).to.have.length(1);

      expect(items[0]).to.contain('Have Breakfast');
      expect(items[0]).to.have.class('completed');
    });
  });
});

it('Add Todo', () => {
  const reqStub = cy.stub();
  cy.route({ method: 'PUT', url: '/todos', onRequest: reqStub }).as('sync');
  cy.visit('/All');

  cy.get('[data-testid="todo-input"]').type('Have a Coffee{enter}');

  cy.get('[data-testid="todo-item"]').within(items => {
    expect(items).to.have.length(3);

    expect(items[2]).to.contain('Have a Coffee');
    expect(items[2]).not.to.have.class('completed');
  });

  cy.wait('@sync').then(() => {
    expect(reqStub.args[0][0].request.body).to.eql([
      ...todos,
      {
        id: 3,
        text: 'Have a Coffee',
        completed: false
      }
    ]);
  });
});
