# 📚 Guía 2: Introducción a los Test Runners

## 🎯 Objetivos de Aprendizaje

Al completar esta guía serás capaz de:

1. **Definir** qué es un test runner y por qué es esencial
2. **Comparar** los test runners más populares (Jest, Mocha, Vitest, etc.)
3. **Seleccionar** el test runner apropiado para diferentes tipos de proyectos
4. **Configurar** un test runner básico desde cero
5. **Evaluar** trade-offs entre diferentes herramientas
6. **Migrar** entre test runners cuando sea necesario

---

## 📖 Conceptos Teóricos

### 🤔 ¿Qué es un Test Runner?

Un **test runner** es una herramienta que:
- 🔍 **Descubre** archivos de test automáticamente
- ▶️ **Ejecuta** los tests en orden específico
- 📊 **Reporta** resultados de manera legible
- 🎯 **Maneja** configuración y setup/teardown
- 🔧 **Integra** con herramientas de desarrollo

#### **Analogía Simple:**
> Un test runner es como un **director de orquesta** que coordina todos los músicos (tests) para crear una sinfonía armoniosa (test suite completa).

### 🏗️ Arquitectura de un Test Runner

```
┌─────────────────────────────────────────┐
│             TEST RUNNER                 │
├─────────────────────────────────────────┤
│  📁 Test Discovery Engine               │
│  ├── Busca archivos *.test.js           │
│  ├── Aplica patrones de exclusión       │
│  └── Ordena tests por prioridad         │
├─────────────────────────────────────────┤
│  ⚙️ Execution Environment               │
│  ├── Setup global (before all)          │
│  ├── Setup por test (before each)       │
│  ├── Cleanup (after each/all)           │
│  └── Manejo de timeouts                 │
├─────────────────────────────────────────┤
│  🔍 Assertion Library                   │
│  ├── expect(), toBe(), toEqual()        │
│  ├── Matchers personalizados            │
│  └── Error formatting                   │
├─────────────────────────────────────────┤
│  📊 Reporter System                     │
│  ├── Console output                     │
│  ├── HTML reports                       │
│  ├── JSON/XML output                    │
│  └── Coverage reports                   │
└─────────────────────────────────────────┘
```

### 🌟 Test Runners Populares: Comparación Completa

#### **1. Jest - El Rey del Frontend**

**🎯 Fortalezas:**
- ✅ **Zero Configuration** - Funciona out of the box
- ✅ **Built-in Mocking** - Sistema de mocks robusto
- ✅ **Snapshot Testing** - Para componentes UI
- ✅ **Code Coverage** - Incluido sin configuración
- ✅ **Watch Mode** - Re-ejecuta tests automáticamente
- ✅ **Parallel Execution** - Tests rápidos en múltiples workers

**❌ Debilidades:**
- ❌ **Más pesado** - Mayor overhead para proyectos simples
- ❌ **Menos flexible** - Configuración rígida
- ❌ **ES Modules** - Historically problematic (mejorado en v28+)

**🎪 Mejor para:**
- React/Vue/Angular applications
- Proyectos que necesitan zero-config
- Teams que quieren todo incluido

```javascript
// jest.config.js
module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
  moduleNameMapping: {
    '\\.(css|less|scss)$': 'identity-obj-proxy'
  },
  collectCoverageFrom: [
    'src/**/*.{js,jsx}',
    '!src/index.js'
  ]
};
```

#### **2. Mocha - El Veterano Flexible**

**🎯 Fortalezas:**
- ✅ **Extremadamente flexible** - Configurable hasta el detalle
- ✅ **Ecosistema maduro** - Muchísimas extensiones
- ✅ **Multiple interfaces** - BDD, TDD, exports
- ✅ **Browser support** - Puede correr en navegador
- ✅ **Async-friendly** - Manejo excelente de promesas

**❌ Debilidades:**
- ❌ **Requires setup** - Necesitas configurar assertion library
- ❌ **No built-in mocking** - Requiere librerías adicionales
- ❌ **No coverage** - Necesitas Istanbul/nyc

**🎪 Mejor para:**
- Node.js applications
- Proyectos que necesitan máxima flexibilidad
- Testing de APIs y backend services

```javascript
// mocha.opts
--require @babel/register
--recursive
--timeout 5000
--reporter spec
test/**/*.test.js
```

#### **3. Vitest - El Moderno Veloz**

**🎯 Fortalezas:**
- ✅ **Super rápido** - Basado en Vite, HMR para tests
- ✅ **Jest-compatible API** - Drop-in replacement
- ✅ **ES Modules native** - Sin problemas de compatibilidad
- ✅ **TypeScript built-in** - Soporte nativo
- ✅ **Watch mode increíble** - Solo re-ejecuta tests afectados

**❌ Debilidades:**
- ❌ **Relativamente nuevo** - Menos ecosystem maduro
- ❌ **Vite dependency** - Atado al ecosistema Vite
- ❌ **Menor adopción** - Menos recursos/ejemplos

**🎪 Mejor para:**
- Vite projects (Vue, React con Vite)
- Proyectos modernos con ES modules
- Developer experience prioritario

```javascript
// vitest.config.js
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setup.ts'
  }
})
```

#### **4. Otros Test Runners Notables**

**Ava:**
- Minimal, concurrent, fast
- Mejor para: Node.js, APIs simples

**Tape:**
- Minimal, no magic, TAP output
- Mejor para: Proyectos pequeños, filosofía minimal

**Jasmine:**
- Behavior-driven development
- Mejor para: BDD workflow, Angular (historically)

### 🤔 ¿Cómo Elegir el Test Runner Correcto?

#### **Matriz de Decisión:**

```
┌─────────────────┬─────────┬─────────┬─────────┬─────────┐
│   Criterio      │  Jest   │  Mocha  │ Vitest  │   Ava   │
├─────────────────┼─────────┼─────────┼─────────┼─────────┤
│ Setup Complexity│    🟢    │    🔴    │    🟡    │    🟢    │
│ Performance     │    🟡    │    🟡    │    🟢    │    🟢    │
│ Flexibility     │    🟡    │    🟢    │    🟡    │    🔴    │
│ Ecosystem       │    🟢    │    🟢    │    🟡    │    🔴    │
│ Documentation   │    🟢    │    🟢    │    🟡    │    🟡    │
│ Learning Curve  │    🟢    │    🔴    │    🟢    │    🟢    │
│ TypeScript      │    🟡    │    🔴    │    🟢    │    🟡    │
│ Watch Mode      │    🟢    │    🔴    │    🟢    │    🟡    │
└─────────────────┴─────────┴─────────┴─────────┴─────────┘
```

#### **Árbol de Decisión:**

```
¿Qué tipo de proyecto tienes?
├── Frontend (React/Vue/Angular)
│   ├── ¿Usas Vite? → Vitest
│   ├── ¿Quieres zero-config? → Jest
│   └── ¿Necesitas máxima flexibilidad? → Mocha
├── Backend/API (Node.js)
│   ├── ¿Proyecto simple? → Ava/Tape
│   ├── ¿Máxima configurabilidad? → Mocha
│   └── ¿Jest-like experience? → Jest
├── Library/Package
│   ├── ¿Minimal footprint? → Ava
│   ├── ¿Cross-environment testing? → Mocha
│   └── ¿Modern tooling? → Vitest
└── Monorepo/Complex
    ├── ¿Consistency across projects? → Jest
    ├── ¿Per-project optimization? → Mixed approach
    └── ¿Performance critical? → Vitest
```

---

## 💻 Ejemplos Prácticos

### **Ejemplo 1: Setup de Jest para React Project**

```bash
# Instalación
npm install --save-dev jest @testing-library/react @testing-library/jest-dom
```

```javascript
// jest.config.js
module.exports = {
  // Entorno de testing
  testEnvironment: 'jsdom',
  
  // Setup files
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
  
  // Module mapping para assets
  moduleNameMapping: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/test/__mocks__/fileMock.js'
  },
  
  // Coverage configuration
  collectCoverageFrom: [
    'src/**/*.{js,jsx}',
    '!src/index.js',
    '!src/reportWebVitals.js'
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  },
  
  // Test patterns
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.{js,jsx}',
    '<rootDir>/src/**/*.{test,spec}.{js,jsx}'
  ]
};

// src/setupTests.js
import '@testing-library/jest-dom';

// Mock global objects
global.fetch = jest.fn();
global.console = {
  ...console,
  error: jest.fn(),
  warn: jest.fn()
};

// src/components/Button.test.jsx
import { render, screen, fireEvent } from '@testing-library/react';
import Button from './Button';

describe('Button Component', () => {
  test('renders button with text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });
  
  test('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
  
  test('applies correct CSS classes', () => {
    render(<Button variant="primary">Primary Button</Button>);
    expect(screen.getByText('Primary Button')).toHaveClass('btn-primary');
  });
});
```

### **Ejemplo 2: Setup de Mocha para Node.js API**

```bash
# Instalación
npm install --save-dev mocha chai supertest nyc
```

```javascript
// .mocharc.json
{
  "require": ["@babel/register"],
  "recursive": true,
  "timeout": 5000,
  "reporter": "spec",
  "spec": "test/**/*.test.js",
  "watch-files": ["lib/**/*.js", "test/**/*.js"],
  "watch-ignore": ["node_modules/**/*"]
}

// test/setup.js
const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

global.expect = chai.expect;
global.should = chai.should();

// test/api/users.test.js
const request = require('supertest');
const app = require('../../src/app');
const User = require('../../src/models/User');

describe('Users API', () => {
  beforeEach(async () => {
    await User.deleteMany({});
  });
  
  describe('POST /api/users', () => {
    it('should create a new user', async () => {
      const userData = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123'
      };
      
      const res = await request(app)
        .post('/api/users')
        .send(userData)
        .expect(201);
      
      expect(res.body).to.have.property('id');
      expect(res.body.name).to.equal('John Doe');
      expect(res.body.email).to.equal('john@example.com');
      expect(res.body).to.not.have.property('password');
    });
    
    it('should return 400 for invalid email', async () => {
      const userData = {
        name: 'John Doe',
        email: 'invalid-email',
        password: 'password123'
      };
      
      const res = await request(app)
        .post('/api/users')
        .send(userData)
        .expect(400);
      
      expect(res.body).to.have.property('error');
      expect(res.body.error).to.include('email');
    });
  });
  
  describe('GET /api/users/:id', () => {
    it('should get user by id', async () => {
      const user = await User.create({
        name: 'Jane Doe',
        email: 'jane@example.com',
        password: 'hashed-password'
      });
      
      const res = await request(app)
        .get(`/api/users/${user._id}`)
        .expect(200);
      
      expect(res.body.name).to.equal('Jane Doe');
      expect(res.body.email).to.equal('jane@example.com');
    });
  });
});
```

### **Ejemplo 3: Setup de Vitest para Proyecto Moderno**

```bash
# Instalación
npm install --save-dev vitest @vitest/ui jsdom
```

```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config'
import { resolve } from 'path'

export default defineConfig({
  test: {
    // Environment
    environment: 'jsdom',
    
    // Global test APIs
    globals: true,
    
    // Setup files
    setupFiles: ['./src/test/setup.ts'],
    
    // Include/exclude patterns
    include: ['**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    exclude: ['node_modules', 'dist', '.idea', '.git', '.cache'],
    
    // Coverage
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'coverage/**',
        'dist/**',
        'packages/*/test{,s}/**',
        '**/*.d.ts',
        'cypress/**',
        'test{,s}/**',
        'test{,-*}.{js,cjs,mjs,ts,tsx,jsx}',
        '**/*{.,-}test.{js,cjs,mjs,ts,tsx,jsx}',
        '**/__tests__/**',
        '**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress}.config.*',
        '**/.{eslint,mocha,prettier}rc.{js,cjs,yml}'
      ]
    },
    
    // Aliases
    alias: {
      '@': resolve(__dirname, './src')
    }
  }
})

// src/test/setup.ts
import { expect, afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'
import matchers from '@testing-library/jest-dom/matchers'

// Extend Vitest's expect with jest-dom matchers
expect.extend(matchers)

// Cleanup after each test case
afterEach(() => {
  cleanup()
})

// src/utils/math.test.ts
import { describe, it, expect } from 'vitest'
import { add, multiply, divide } from './math'

describe('Math Utils', () => {
  it('should add two numbers correctly', () => {
    expect(add(2, 3)).toBe(5)
    expect(add(-1, 1)).toBe(0)
    expect(add(0, 0)).toBe(0)
  })
  
  it('should multiply two numbers correctly', () => {
    expect(multiply(3, 4)).toBe(12)
    expect(multiply(-2, 3)).toBe(-6)
    expect(multiply(0, 5)).toBe(0)
  })
  
  it('should divide two numbers correctly', () => {
    expect(divide(10, 2)).toBe(5)
    expect(divide(9, 3)).toBe(3)
  })
  
  it('should throw error when dividing by zero', () => {
    expect(() => divide(5, 0)).toThrow('Division by zero')
  })
})
```

### **Ejemplo 4: Pokemon TCG Project - Comparación de Test Runners**

```javascript
// Jest version - src/utils/cardHelpers.test.js
describe('Card Helpers', () => {
  test('should format card price correctly', () => {
    expect(formatPrice(1234.56)).toBe('$1,234.56');
  });
  
  test('should get correct type color', () => {
    expect(getTypeColor('Fire')).toBe('#FF6B35');
    expect(getTypeColor('Water')).toBe('#0066CC');
  });
});

// Mocha version - test/utils/cardHelpers.test.js
const { expect } = require('chai');
const { formatPrice, getTypeColor } = require('../../src/utils/cardHelpers');

describe('Card Helpers', () => {
  it('should format card price correctly', () => {
    expect(formatPrice(1234.56)).to.equal('$1,234.56');
  });
  
  it('should get correct type color', () => {
    expect(getTypeColor('Fire')).to.equal('#FF6B35');
    expect(getTypeColor('Water')).to.equal('#0066CC');
  });
});

// Vitest version - src/utils/cardHelpers.test.ts
import { describe, it, expect } from 'vitest'
import { formatPrice, getTypeColor } from './cardHelpers'

describe('Card Helpers', () => {
  it('should format card price correctly', () => {
    expect(formatPrice(1234.56)).toBe('$1,234.56')
  })
  
  it('should get correct type color', () => {
    expect(getTypeColor('Fire')).toBe('#FF6B35')
    expect(getTypeColor('Water')).toBe('#0066CC')
  })
})
```

---

## 🔧 Hands-on Exercises

### **Ejercicio 1: Test Runner Detective**

Analiza estos archivos de configuración e identifica qué test runner es y por qué:

**Config A:**
```javascript
module.exports = {
  testEnvironment: 'node',
  collectCoverageFrom: ['src/**/*.js'],
  setupFilesAfterEnv: ['./jest.setup.js']
};
```

**Config B:**
```json
{
  "require": ["@babel/register"],
  "recursive": true,
  "reporter": "mochawesome"
}
```

**Config C:**
```typescript
export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom'
  }
})
```

### **Ejercicio 2: Migración de Test Runner**

Convierte este test de Jest a Mocha:

```javascript
// Jest version
describe('User Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  test('should create user successfully', async () => {
    const mockUser = { id: 1, name: 'John' };
    const createUser = jest.fn().mockResolvedValue(mockUser);
    
    const result = await userService.create({ name: 'John' });
    
    expect(createUser).toHaveBeenCalledWith({ name: 'John' });
    expect(result).toEqual(mockUser);
  });
});
```

**Tu versión en Mocha:**
```javascript
// Completa aquí...
```

### **Ejercicio 3: Selección de Test Runner**

Para cada escenario, elige el test runner más apropiado y justifica:

1. **Startup con React + TypeScript, team de 3 devs, necesitan lanzar MVP rápido**
2. **Librería de Node.js que será publicada en NPM, necesita compatibilidad máxima**
3. **Aplicación Vue 3 con Vite, team experimentado, performance crítico**
4. **Migración de sistema legacy, equipo conservador, máxima estabilidad**

---

## ❓ Preguntas de Entrevista

### **Nivel Junior:**

1. **¿Qué es un test runner y por qué lo necesitamos?**
   - **Respuesta esperada:** Herramienta que encuentra, ejecuta y reporta tests automáticamente. Evita ejecutar tests manualmente uno por uno.

2. **¿Cuál es la diferencia entre Jest y Mocha?**
   - **Respuesta esperada:** Jest es zero-config con todo incluido, Mocha es más flexible pero requiere configuración adicional.

3. **¿Qué comandos básicos conoces para ejecutar tests?**
   - **Respuesta esperada:** `npm test`, `npm run test:watch`, `npm run test:coverage`.

### **Nivel Mid:**

4. **¿Cómo configurarías Jest para un proyecto React con TypeScript?**
   - **Respuesta esperada:** Configurar testEnvironment: 'jsdom', setupFiles, moduleNameMapping para assets, preset para TypeScript.

5. **¿Cuándo elegirías Mocha sobre Jest?**
   - **Respuesta esperada:** Cuando necesitas máxima flexibilidad, testing de APIs Node.js, o tienes requirements específicos que Jest no maneja bien.

6. **¿Qué es el watch mode y por qué es importante?**
   - **Respuesta esperada:** Modo que re-ejecuta tests automáticamente cuando cambian archivos. Mejora developer experience y feedback loop.

### **Nivel Senior:**

7. **¿Cómo optimizarías performance de tests en un proyecto grande?**
   - **Respuesta esperada:** Parallel execution, test sharding, selective test running, mocking pesado, CI optimization.

8. **¿Cómo migrarías de Jest a Vitest en un proyecto existente?**
   - **Respuesta esperada:** Análisis de compatibilidad, migración gradual, configuración equivalente, testing de la migración.

9. **¿Qué consideraciones tendrías para elegir test runner en un monorepo?**
   - **Respuesta esperada:** Consistency vs optimization, shared configuration, caching, workspace support.

---

## 📈 Métricas de Éxito

### **Conocimiento Teórico:**
- [ ] Puedes explicar diferencias entre 3+ test runners
- [ ] Entiendes criterios de selección para diferentes proyectos
- [ ] Conoces pros/cons de cada herramienta principal

### **Aplicación Práctica:**
- [ ] Has configurado al menos 2 test runners diferentes
- [ ] Puedes migrar tests entre test runners
- [ ] Optimizas configuración para tu contexto específico

### **Resolución de Problemas:**
- [ ] Debuggeas problemas de configuración de test runners
- [ ] Adaptass test runners a requirements específicos
- [ ] Evalúas trade-offs técnicos correctamente

---

## 🔗 Referencias Adicionales

### **Documentación Oficial:**
- 📄 [Jest Documentation](https://jestjs.io/docs/getting-started)
- 📄 [Mocha Documentation](https://mochajs.org/)
- 📄 [Vitest Documentation](https://vitest.dev/)
- 📄 [Ava Documentation](https://github.com/avajs/ava)

### **Comparaciones Detalladas:**
- 📊 [Jest vs Mocha vs Jasmine](https://raygun.com/blog/javascript-unit-testing-frameworks/)
- 📊 [Test Runner Performance Comparison](https://blog.logrocket.com/comparing-best-javascript-unit-testing-frameworks/)
- 📊 [2024 Testing Tools Survey](https://2023.stateofjs.com/en-US/libraries/testing/)

### **Setup Guides:**
- 🔧 [Jest with React TypeScript](https://create-react-app.dev/docs/running-tests/)
- 🔧 [Mocha with ES6](https://mochajs.org/#compilers)
- 🔧 [Vitest Migration Guide](https://vitest.dev/guide/migration.html)

### **Advanced Topics:**
- 🎯 [Test Runner Performance Optimization](https://kentcdodds.com/blog/making-your-ui-tests-resilient-to-change)
- 🎯 [Custom Test Reporters](https://jestjs.io/docs/configuration#reporters)
- 🎯 [Parallel Testing Strategies](https://blog.logrocket.com/testing-node-js-mocha-chai/)

---

## ➡️ Conexión al Siguiente Tema

**¿Listo para el Punto 3?**

Ahora que entiendes los **test runners** y sus diferencias, es hora de profundizar en **Mocha** específicamente, que es la base de muchas herramientas de testing incluido **Mochawesome**.

**🎯 Próximo tema: "Framework Mocha: Base Fundamental"**

Aprenderás:
- Historia y filosofía de Mocha
- Arquitectura interna de Mocha
- Sintaxis avanzada y patrones
- Hooks y lifecycle management
- Configuración avanzada
- Integration con assertion libraries

**Pre-requisitos cumplidos:** ✅
- Entiendes qué es un test runner
- Conoces las diferencias entre herramientas principales
- Puedes configurar un test runner básico

---

## 📝 Checklist de Completitud

**Antes de pasar al siguiente tema, asegúrate de:**

- [ ] Entender qué hace un test runner internamente
- [ ] Poder comparar Jest, Mocha, y Vitest con criterios técnicos
- [ ] Haber configurado al menos un test runner desde cero
- [ ] Saber cuándo elegir cada herramienta
- [ ] Haber completado al menos 2 de los 3 exercises prácticos
- [ ] Poder responder al menos 6 de las 9 preguntas de entrevista

**¡Con esto dominado, estarás listo para deep-dive en Mocha!**

---

*Has completado el foundation de test runners. Siguiente parada: dominar Mocha, la base que alimenta el ecosystem de reporting que implementamos en tu proyecto.*