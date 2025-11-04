# 📚 Guía 3: Framework Mocha - Base Fundamental

## 🎯 Objetivos de Aprendizaje

Al completar esta guía serás capaz de:

1. **Explicar** la historia y filosofía de Mocha
2. **Dominar** la sintaxis completa de Mocha (describe, it, hooks)
3. **Configurar** Mocha para diferentes tipos de proyectos
4. **Implementar** patterns avanzados de testing con Mocha
5. **Integrar** Mocha con assertion libraries y herramientas
6. **Entender** por qué Mocha es la base de Mochawesome

---

## 📖 Conceptos Teóricos

### 🏛️ Historia y Filosofía de Mocha

#### **Los Orígenes (2011)**
Mocha fue creado por **TJ Holowaychuk** (también creator de Express.js) con una filosofía específica:

> **"Flexible, feature-rich JavaScript test framework running on Node.js and in the browser"**

#### **Filosofía Core de Mocha:**

1. **🎨 Flexibilidad Máxima**
   - No assumptions sobre assertion library
   - Multiple testing styles (BDD, TDD, Exports)
   - Configuración granular de cada aspecto

2. **🌐 Cross-Platform**
   - Node.js y Browser support nativo
   - Mismo código de tests en diferentes entornos

3. **📊 Rich Reporting**
   - Sistema de reporters extensible
   - Multiple output formats
   - Base para herramientas como Mochawesome

4. **⚡ Performance**
   - Async testing de primera clase
   - Control granular de timeouts
   - Parallel execution support

#### **¿Por Qué Mocha Sigue Siendo Relevante en 2024?**

```
Mocha Timeline:
2011 ├── Created by TJ Holowaychuk
2012 ├── Browser support added
2013 ├── Async/await support
2014 ├── Reporter ecosystem explosion
2015 ├── ES6 modules support
2016 ├── Mochawesome created
2017 ├── Hook improvements
2018 ├── Parallel testing
2019 ├── TypeScript integration
2020 ├── ESM native support
2021 ├── Performance improvements
2022 ├── Better CI/CD integration
2023 ├── Modern Node.js features
2024 ├── Still the foundation for many tools
```

### 🏗️ Arquitectura de Mocha

#### **Core Components:**

```
┌─────────────────────────────────────────┐
│               MOCHA CORE                │
├─────────────────────────────────────────┤
│  🎭 Test Interfaces                     │
│  ├── BDD (describe/it)                  │
│  ├── TDD (suite/test)                   │
│  ├── Exports (module.exports)           │
│  └── QUnit (QUnit style)                │
├─────────────────────────────────────────┤
│  🔄 Test Runner Engine                  │
│  ├── File discovery                     │
│  ├── Test execution order               │
│  ├── Hook management                    │
│  └── Error handling                     │
├─────────────────────────────────────────┤
│  ⏱️ Lifecycle Management                │
│  ├── before() - Setup global            │
│  ├── beforeEach() - Setup per test      │
│  ├── afterEach() - Cleanup per test     │
│  └── after() - Cleanup global           │
├─────────────────────────────────────────┤
│  📊 Reporter Interface                  │
│  ├── Event-driven reporting             │
│  ├── Multiple output formats            │
│  ├── Custom reporter support            │
│  └── Real-time feedback                 │
└─────────────────────────────────────────┘
```

#### **Event-Driven Architecture:**

Mocha emite eventos que los reporters capturan:

```javascript
// Eventos principales que emite Mocha
const events = [
  'start',      // Test suite started
  'suite',      // Suite started
  'test',       // Test started
  'pending',    // Test skipped
  'pass',       // Test passed
  'fail',       // Test failed
  'end',        // Test suite ended
  'hook',       // Hook executed
  'hook end'    // Hook completed
];
```

### 🎯 Sintaxis Fundamental de Mocha

#### **1. BDD Interface (Behavior-Driven Development)**

La interfaz más popular, usada en el 80% de proyectos:

```javascript
// Estructura básica BDD
describe('Suite principal', () => {
  describe('Subsuite - Funcionalidad específica', () => {
    it('should do something specific', () => {
      // Test code aquí
    });
    
    it('should handle edge cases', () => {
      // Otro test
    });
  });
});
```

#### **Anatomía Completa de un Test:**

```javascript
describe('Calculator', () => {
  // Variables compartidas a nivel de suite
  let calculator;
  
  // Setup antes de TODA la suite
  before(() => {
    console.log('Setting up calculator test suite');
    // Database connections, server startup, etc.
  });
  
  // Setup antes de CADA test
  beforeEach(() => {
    calculator = new Calculator();
    // Reset state, clear mocks, etc.
  });
  
  // Cleanup después de CADA test
  afterEach(() => {
    calculator = null;
    // Clean up test data, reset mocks
  });
  
  // Cleanup después de TODA la suite
  after(() => {
    console.log('Tearing down calculator test suite');
    // Close connections, cleanup global state
  });
  
  describe('Basic Operations', () => {
    it('should add two numbers correctly', () => {
      const result = calculator.add(2, 3);
      expect(result).to.equal(5);
    });
    
    it('should handle negative numbers', () => {
      const result = calculator.add(-2, 3);
      expect(result).to.equal(1);
    });
    
    // Test pendiente (skipped)
    it.skip('should handle floating point precision', () => {
      // Este test se saltará
    });
    
    // Test que solo se ejecuta este (para debugging)
    it.only('should multiply correctly', () => {
      // Solo este test se ejecutará
      const result = calculator.multiply(3, 4);
      expect(result).to.equal(12);
    });
  });
  
  describe('Error Handling', () => {
    it('should throw error for division by zero', () => {
      expect(() => calculator.divide(5, 0)).to.throw('Division by zero');
    });
  });
});
```

#### **2. TDD Interface (Test-Driven Development)**

```javascript
// TDD style - menos común pero útil para TDD puristas
suite('Calculator', () => {
  setup(() => {
    // Equivale a beforeEach
  });
  
  teardown(() => {
    // Equivale a afterEach
  });
  
  test('should add numbers', () => {
    // Equivale a it()
  });
});
```

#### **3. Exports Interface**

```javascript
// Exports style - para quienes prefieren module.exports
module.exports = {
  'Calculator': {
    'should add numbers': function() {
      // Test code
    },
    
    'should multiply numbers': function() {
      // Test code
    }
  }
};
```

### ⚡ Async Testing en Mocha

#### **1. Callback Style (Legacy)**

```javascript
describe('Async Operations - Callbacks', () => {
  it('should complete async operation', (done) => {
    setTimeout(() => {
      expect(true).to.be.true;
      done(); // CRÍTICO: llamar done() para indicar completion
    }, 100);
  });
  
  it('should handle async errors', (done) => {
    asyncOperation((err, result) => {
      if (err) return done(err); // Pass error to Mocha
      expect(result).to.equal('success');
      done();
    });
  });
});
```

#### **2. Promise Style (Moderno)**

```javascript
describe('Async Operations - Promises', () => {
  it('should resolve promise', () => {
    // Return promise - Mocha esperará automáticamente
    return fetchUserData(123).then(user => {
      expect(user.name).to.equal('John Doe');
    });
  });
  
  it('should reject promise on error', () => {
    return fetchUserData(999)
      .then(() => {
        throw new Error('Should have failed');
      })
      .catch(err => {
        expect(err.message).to.include('User not found');
      });
  });
});
```

#### **3. Async/Await Style (Preferido)**

```javascript
describe('Async Operations - Async/Await', () => {
  it('should handle async operations', async () => {
    const user = await fetchUserData(123);
    expect(user.name).to.equal('John Doe');
    expect(user.active).to.be.true;
  });
  
  it('should handle async errors', async () => {
    try {
      await fetchUserData(999);
      throw new Error('Should have failed');
    } catch (error) {
      expect(error.message).to.include('User not found');
    }
  });
  
  // También funciona en hooks
  beforeEach(async () => {
    await setupTestDatabase();
    await seedTestData();
  });
});
```

### 🔧 Configuración Avanzada de Mocha

#### **1. Archivo de Configuración (.mocharc.json)**

```json
{
  "spec": [
    "test/**/*.test.js",
    "src/**/*.test.js"
  ],
  "exclude": [
    "test/fixtures/**",
    "test/helpers/**"
  ],
  "require": [
    "@babel/register",
    "./test/setup.js"
  ],
  "reporter": "spec",
  "timeout": 5000,
  "recursive": true,
  "exit": true,
  "bail": false,
  "parallel": false,
  "jobs": 4,
  "watch": false,
  "watch-files": [
    "lib/**/*.js",
    "test/**/*.js"
  ],
  "watch-ignore": [
    "node_modules/**/*",
    ".git/**/*"
  ],
  "diff": true,
  "full-trace": false,
  "grep": null,
  "invert": false,
  "check-leaks": false,
  "globals": ["sinon", "expect"],
  "retries": 0,
  "slow": 75,
  "ui": "bdd",
  "color": true
}
```

#### **2. Configuración Programática**

```javascript
// mocha.config.js
module.exports = {
  spec: 'test/**/*.test.js',
  
  // Setup files
  require: [
    '@babel/register',
    './test/setup.js'
  ],
  
  // Timeout configuration
  timeout: process.env.CI ? 10000 : 5000,
  
  // Reporter based on environment
  reporter: process.env.CI ? 'json' : 'spec',
  
  // Parallel execution in CI
  parallel: process.env.CI === 'true',
  
  // Exit behavior
  exit: true,
  
  // Global setup
  bail: process.env.NODE_ENV === 'production'
};
```

#### **3. Environment-Specific Configuration**

```javascript
// test/setup.js - Global test setup
const chai = require('chai');
const sinon = require('sinon');
const chaiAsPromised = require('chai-as-promised');
const chaiHttp = require('chai-http');

// Setup chai
chai.use(chaiAsPromised);
chai.use(chaiHttp);

global.expect = chai.expect;
global.should = chai.should();
global.sinon = sinon;

// Global test configuration
process.env.NODE_ENV = 'test';
process.env.LOG_LEVEL = 'error';

// Database setup
before(async () => {
  await require('./helpers/database').connect();
});

after(async () => {
  await require('./helpers/database').disconnect();
});

// Global error handling
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});
```

---

## 💻 Ejemplos Prácticos

### **Ejemplo 1: Pokemon TCG API Testing con Mocha**

```javascript
// test/api/cards.test.js
const { expect } = require('chai');
const request = require('supertest');
const app = require('../../src/app');
const Card = require('../../src/models/Card');

describe('Cards API', () => {
  beforeEach(async () => {
    // Clean database before each test
    await Card.deleteMany({});
  });
  
  describe('GET /api/cards', () => {
    beforeEach(async () => {
      // Seed test data
      await Card.create([
        {
          name: 'Pikachu',
          type: 'Electric',
          hp: 60,
          expansion: 'base1'
        },
        {
          name: 'Charizard',
          type: 'Fire',
          hp: 120,
          expansion: 'base1'
        }
      ]);
    });
    
    it('should return all cards', async () => {
      const res = await request(app)
        .get('/api/cards')
        .expect(200);
      
      expect(res.body).to.be.an('array');
      expect(res.body).to.have.lengthOf(2);
      expect(res.body[0]).to.have.property('name');
      expect(res.body[0]).to.have.property('type');
    });
    
    it('should filter cards by type', async () => {
      const res = await request(app)
        .get('/api/cards?type=Electric')
        .expect(200);
      
      expect(res.body).to.have.lengthOf(1);
      expect(res.body[0].name).to.equal('Pikachu');
    });
    
    it('should filter cards by expansion', async () => {
      const res = await request(app)
        .get('/api/cards?expansion=base1')
        .expect(200);
      
      expect(res.body).to.have.lengthOf(2);
    });
  });
  
  describe('POST /api/cards', () => {
    it('should create a new card', async () => {
      const cardData = {
        name: 'Blastoise',
        type: 'Water',
        hp: 100,
        expansion: 'base1'
      };
      
      const res = await request(app)
        .post('/api/cards')
        .send(cardData)
        .expect(201);
      
      expect(res.body).to.have.property('id');
      expect(res.body.name).to.equal('Blastoise');
      
      // Verify it was saved to database
      const savedCard = await Card.findById(res.body.id);
      expect(savedCard).to.not.be.null;
      expect(savedCard.name).to.equal('Blastoise');
    });
    
    it('should validate required fields', async () => {
      const invalidCard = {
        type: 'Water'
        // Missing required fields
      };
      
      const res = await request(app)
        .post('/api/cards')
        .send(invalidCard)
        .expect(400);
      
      expect(res.body).to.have.property('error');
      expect(res.body.error).to.include('name');
    });
  });
});
```

### **Ejemplo 2: Frontend Component Testing**

```javascript
// test/components/CardList.test.js
const { expect } = require('chai');
const { JSDOM } = require('jsdom');
const sinon = require('sinon');

describe('CardList Component', () => {
  let window, document, CardList;
  
  before(() => {
    // Setup DOM environment
    const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>');
    window = dom.window;
    document = window.document;
    global.window = window;
    global.document = document;
    
    // Load component after DOM setup
    CardList = require('../../src/components/CardList');
  });
  
  beforeEach(() => {
    // Clear DOM
    document.body.innerHTML = '';
  });
  
  describe('render()', () => {
    it('should render empty state when no cards', () => {
      const cardList = new CardList([]);
      const element = cardList.render();
      
      expect(element.textContent).to.include('No cards found');
    });
    
    it('should render card items', () => {
      const cards = [
        { name: 'Pikachu', type: 'Electric' },
        { name: 'Charizard', type: 'Fire' }
      ];
      
      const cardList = new CardList(cards);
      const element = cardList.render();
      
      expect(element.children).to.have.lengthOf(2);
      expect(element.textContent).to.include('Pikachu');
      expect(element.textContent).to.include('Charizard');
    });
  });
  
  describe('filterByType()', () => {
    let cardList;
    
    beforeEach(() => {
      const cards = [
        { name: 'Pikachu', type: 'Electric' },
        { name: 'Charizard', type: 'Fire' },
        { name: 'Blastoise', type: 'Water' }
      ];
      cardList = new CardList(cards);
    });
    
    it('should filter cards by type', () => {
      cardList.filterByType('Electric');
      const element = cardList.render();
      
      expect(element.children).to.have.lengthOf(1);
      expect(element.textContent).to.include('Pikachu');
      expect(element.textContent).to.not.include('Charizard');
    });
    
    it('should show all cards when filter is cleared', () => {
      cardList.filterByType('Electric');
      cardList.filterByType(null);
      const element = cardList.render();
      
      expect(element.children).to.have.lengthOf(3);
    });
  });
});
```

### **Ejemplo 3: Service Layer Testing con Mocks**

```javascript
// test/services/PokemonService.test.js
const { expect } = require('chai');
const sinon = require('sinon');
const axios = require('axios');
const PokemonService = require('../../src/services/PokemonService');

describe('PokemonService', () => {
  let service;
  let axiosStub;
  
  beforeEach(() => {
    service = new PokemonService();
    axiosStub = sinon.stub(axios, 'get');
  });
  
  afterEach(() => {
    sinon.restore();
  });
  
  describe('fetchCardsByExpansion()', () => {
    it('should fetch cards from external API', async () => {
      // Setup mock response
      const mockResponse = {
        data: {
          data: [
            { name: 'Pikachu', type: 'Electric' },
            { name: 'Charizard', type: 'Fire' }
          ]
        }
      };
      axiosStub.resolves(mockResponse);
      
      // Execute
      const result = await service.fetchCardsByExpansion('base1');
      
      // Verify
      expect(axiosStub.calledOnce).to.be.true;
      expect(axiosStub.firstCall.args[0]).to.include('base1');
      expect(result).to.have.lengthOf(2);
      expect(result[0].name).to.equal('Pikachu');
    });
    
    it('should handle API errors gracefully', async () => {
      // Setup error
      axiosStub.rejects(new Error('API Error'));
      
      // Execute and verify error
      try {
        await service.fetchCardsByExpansion('base1');
        throw new Error('Should have thrown');
      } catch (error) {
        expect(error.message).to.include('Failed to fetch cards');
      }
    });
    
    it('should cache successful responses', async () => {
      // Setup mock
      const mockResponse = {
        data: { data: [{ name: 'Pikachu' }] }
      };
      axiosStub.resolves(mockResponse);
      
      // First call
      await service.fetchCardsByExpansion('base1');
      
      // Second call
      await service.fetchCardsByExpansion('base1');
      
      // Should only call API once due to caching
      expect(axiosStub.calledOnce).to.be.true;
    });
  });
  
  describe('formatCardData()', () => {
    it('should format raw API data correctly', () => {
      const rawData = {
        name: 'pikachu',
        types: ['Lightning'],
        hp: '60',
        rarity: 'Common'
      };
      
      const formatted = service.formatCardData(rawData);
      
      expect(formatted.name).to.equal('Pikachu'); // Capitalized
      expect(formatted.type).to.equal('Electric'); // Mapped
      expect(formatted.hp).to.equal(60); // Number
      expect(formatted.rarity).to.equal('Common');
    });
  });
});
```

### **Ejemplo 4: Database Integration Testing**

```javascript
// test/integration/database.test.js
const { expect } = require('chai');
const mongoose = require('mongoose');
const User = require('../../src/models/User');
const Card = require('../../src/models/Card');

describe('Database Integration', () => {
  before(async () => {
    // Connect to test database
    await mongoose.connect(process.env.TEST_DB_URL);
  });
  
  beforeEach(async () => {
    // Clear all collections
    await User.deleteMany({});
    await Card.deleteMany({});
  });
  
  after(async () => {
    await mongoose.connection.close();
  });
  
  describe('User-Card Relationships', () => {
    let user, cards;
    
    beforeEach(async () => {
      // Create test data
      user = await User.create({
        email: 'test@example.com',
        username: 'testuser'
      });
      
      cards = await Card.create([
        { name: 'Pikachu', type: 'Electric' },
        { name: 'Charizard', type: 'Fire' }
      ]);
    });
    
    it('should add card to user collection', async () => {
      await user.addCardToCollection(cards[0]._id);
      
      const updatedUser = await User.findById(user._id)
        .populate('collection.cards');
      
      expect(updatedUser.collection.cards).to.have.lengthOf(1);
      expect(updatedUser.collection.cards[0].name).to.equal('Pikachu');
    });
    
    it('should prevent duplicate cards in collection', async () => {
      await user.addCardToCollection(cards[0]._id);
      await user.addCardToCollection(cards[0]._id);
      
      const updatedUser = await User.findById(user._id);
      expect(updatedUser.collection.cards).to.have.lengthOf(1);
    });
    
    it('should calculate collection statistics', async () => {
      await user.addCardToCollection(cards[0]._id);
      await user.addCardToCollection(cards[1]._id);
      
      const stats = await user.getCollectionStats();
      
      expect(stats.totalCards).to.equal(2);
      expect(stats.typeBreakdown).to.have.property('Electric', 1);
      expect(stats.typeBreakdown).to.have.property('Fire', 1);
    });
  });
});
```

---

## 🔧 Hands-on Exercises

### **Ejercicio 1: Convertir Entre Interfaces**

Convierte este test de BDD a TDD interface:

```javascript
// BDD Version
describe('Math Utils', () => {
  beforeEach(() => {
    // setup
  });
  
  it('should add numbers', () => {
    expect(add(2, 3)).to.equal(5);
  });
  
  it('should multiply numbers', () => {
    expect(multiply(2, 3)).to.equal(6);
  });
});
```

**Tu versión TDD:**
```javascript
// Completa aquí...
```

### **Ejercicio 2: Async Testing Practice**

Refactoriza estos tests usando las 3 formas de async (callback, promise, async/await):

```javascript
function fetchUser(id, callback) {
  setTimeout(() => {
    if (id === 1) {
      callback(null, { id: 1, name: 'John' });
    } else {
      callback(new Error('User not found'));
    }
  }, 100);
}

// Implementa tests usando:
// 1. Callback style
// 2. Promise style (promisify first)
// 3. Async/await style
```

### **Ejercicio 3: Advanced Configuration**

Crea una configuración de Mocha que:
- Use diferentes timeouts para CI vs local
- Configure reporters basado en environment
- Include setup files específicos
- Configure parallel execution para CI

```javascript
// mocha.config.js
// Tu configuración aquí...
```

---

## ❓ Preguntas de Entrevista

### **Nivel Junior:**

1. **¿Cuáles son los hooks disponibles en Mocha y cuándo los usarías?**
   - **Respuesta esperada:** before, beforeEach, afterEach, after. Para setup/cleanup global vs per-test.

2. **¿Cuál es la diferencia entre describe e it en Mocha?**
   - **Respuesta esperada:** describe agrupa tests (test suite), it define tests individuales.

3. **¿Cómo manejarías tests asíncronos en Mocha?**
   - **Respuesta esperada:** Callbacks con done(), returning promises, o async/await.

### **Nivel Mid:**

4. **¿Qué es la diferencia entre it.only y it.skip?**
   - **Respuesta esperada:** it.only ejecuta solo ese test, it.skip lo omite. Útil para debugging y development.

5. **¿Cómo configurarías Mocha para diferentes environments?**
   - **Respuesta esperada:** Archivos de config específicos, variables de entorno, configuración programática.

6. **¿Cuál es la diferencia entre las interfaces BDD y TDD en Mocha?**
   - **Respuesta esperada:** BDD usa describe/it (behavior), TDD usa suite/test (más directo).

### **Nivel Senior:**

7. **¿Cómo optimizarías performance de tests en Mocha para proyectos grandes?**
   - **Respuesta esperada:** Parallel execution, selective testing, proper mocking, test organization.

8. **¿Cómo implementarías un custom reporter para Mocha?**
   - **Respuesta esperada:** Extender Base reporter, escuchar eventos de Mocha, implementar métodos específicos.

9. **¿Qué patterns usarías para testing de integración con Mocha?**
   - **Respuesta esperada:** Setup/teardown de databases, containerization, test doubles, environment isolation.

---

## 📈 Métricas de Éxito

### **Conocimiento Teórico:**
- [ ] Entiendes la filosofía y arquitectura de Mocha
- [ ] Dominas las diferentes interfaces (BDD, TDD, Exports)
- [ ] Conoces todos los hooks y su propósito

### **Aplicación Práctica:**
- [ ] Puedes configurar Mocha para diferentes tipos de proyectos
- [ ] Manejas async testing con confianza
- [ ] Implementas patterns avanzados de testing

### **Debugging y Troubleshooting:**
- [ ] Debuggeas tests problemáticos
- [ ] Optimizas configuración de Mocha
- [ ] Integras Mocha con herramientas externas

---

## 🔗 Referencias Adicionales

### **Documentación Oficial:**
- 📄 [Mocha Documentation](https://mochajs.org/)
- 📄 [Mocha GitHub Repository](https://github.com/mochajs/mocha)
- 📄 [Mocha Wiki](https://github.com/mochajs/mocha/wiki)

### **Guides y Tutorials:**
- 📚 [Mocha Testing Guide](https://blog.logrocket.com/a-quick-and-complete-guide-to-mocha-testing-d0e7ea09f09d/)
- 📚 [Advanced Mocha Patterns](https://martinfowler.com/articles/mochasalt.html)
- 📚 [Testing Node.js with Mocha](https://www.digitalocean.com/community/tutorials/test-a-node-restful-api-with-mocha-and-chai)

### **Integration Guides:**
- 🔧 [Mocha + Chai Integration](https://www.chaijs.com/guide/installation/#node-js)
- 🔧 [Mocha + Sinon for Mocking](https://sinonjs.org/releases/latest/mocks/)
- 🔧 [Mocha + Supertest for APIs](https://github.com/visionmedia/supertest)

### **Advanced Topics:**
- 🎯 [Custom Reporters Development](https://mochajs.org/#third-party-reporters)
- 🎯 [Mocha Parallel Mode](https://mochajs.org/#parallel-tests)
- 🎯 [Mocha in Browser](https://mochajs.org/#running-mocha-in-the-browser)

---

## ➡️ Conexión al Siguiente Tema

**¿Listo para el Punto 4?**

Ahora que dominas **Mocha** (la base), es momento de entender el **ecosystem de reportes** que se construye sobre esta base sólida.

**🎯 Próximo tema: "Conceptos de Test Reporting"**

Aprenderás:
- Qué son los test reporters y por qué son críticos
- Diferentes tipos de reportes y sus audiencias
- Cómo Mocha alimenta el sistema de reporting
- La base teórica antes de implementar Mochawesome

**Pre-requisitos cumplidos:** ✅
- Dominas la sintaxis y configuración de Mocha
- Entiendes la arquitectura event-driven de Mocha
- Puedes escribir tests complejos con hooks y async
- Comprendes por qué Mocha es tan flexible

**🔗 Connection Point:**
Mocha emite eventos → Reporters capturan eventos → Generan reportes
Esta es la base de **todo** el sistema que implementamos en tu proyecto.

---

## 📝 Checklist de Completitud

**Antes de pasar al siguiente tema, asegúrate de:**

- [ ] Entender la filosofía y historia de Mocha
- [ ] Dominar sintaxis BDD completa (describe, it, hooks)
- [ ] Poder manejar tests asíncronos con confianza
- [ ] Haber configurado Mocha para al menos un proyecto
- [ ] Entender cómo Mocha emite eventos para reporters
- [ ] Haber completado al menos 2 de los 3 exercises prácticos
- [ ] Poder responder al menos 7 de las 9 preguntas de entrevista

**¡Con esta base sólida en Mocha, entenderás perfectamente cómo funciona Mochawesome por dentro!**

---

*Mocha es el motor que alimenta todo el ecosystem de reporting. Con este knowledge, ya estás listo para entender cómo los reporters transforman los eventos de Mocha en beautiful, actionable reports.*