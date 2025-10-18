# Guía Completa y Avanzada de QA Testing — Desde Dummies hasta Experto

Esta guía está diseñada para ayudarte a dominar el testing de software desde cero hasta nivel avanzado, cubriendo todos los aspectos que necesitas conocer para postular como Tester QA profesional.

---

## 📖 Tabla de Contenidos Completa

1. Fundamentos de QA y Testing
2. Definiciones Clave del Mundo QA
3. Ciclo de Vida del Testing (STLC)
4. Tipos de Testing Explicados
5. Testing Manual vs Automatizado
6. Pirámide de Tests y Estrategias
7. Cobertura de Tests (Code Coverage)
8. Mejores Prácticas en Testing
9. Diseño de Casos de Prueba
10. Testing en Metodologías Ágiles
11. Integración con Jira
12. DevOps y CI/CD
13. Herramientas Profesionales
14. Ejemplos Prácticos: Dummies y Avanzados
15. Non-Functional Testing
16. Métricas y Reportes
17. Gestión de Defectos
18. Preparación para Entrevistas
19. Certificaciones y Carrera
20. Recursos y Práctica Continua

---

## 🎯 1. Fundamentos de QA y Testing {#fundamentos}

### ¿Qué es QA?

**Quality Assurance (QA)** es el proceso sistemático de asegurar que un producto de software cumple con los requisitos de calidad especificados. No se trata solo de encontrar bugs, sino de:

- **Prevenir defectos** mediante procesos adecuados
- **Mejorar procesos** de desarrollo continuamente
- **Asegurar calidad** en todas las fases del desarrollo
- **Validar requisitos** funcionales y no funcionales
- **Garantizar satisfacción del usuario** final

### ¿Qué es Testing?

**Testing** es la actividad técnica de ejecutar un software para:
- Encontrar defectos
- Verificar funcionalidad
- Validar que cumple requisitos
- Asegurar que funciona como se espera

### Diferencia QA vs QC vs Testing

| Aspecto | QA | QC | Testing |
|---------|----|----|---------|
| **Enfoque** | Prevención | Detección | Ejecución |
| **Objetivo** | Mejorar procesos | Encontrar defectos | Validar código |
| **Cuándo** | Durante todo el ciclo | Pre-release | Durante desarrollo |
| **Ejemplo** | Definir estándares | Revisión de código | Ejecutar test cases |

### Rol del Tester QA

Un Tester QA moderno debe:
- 📝 Diseñar y ejecutar tests manuales y automatizados
- 🐛 Identificar, documentar y hacer seguimiento de bugs
- 🤝 Colaborar con developers, PMs y stakeholders
- 📊 Analizar métricas y reportar calidad
- 🔄 Participar en sprints y ceremonias ágiles
- 🛠️ Mantener frameworks de automatización
- 🎯 Pensar como usuario final

---

## 🔑 2. Definiciones Clave del Mundo QA {#definiciones}

### Conceptos Básicos

**Bug/Defecto/Issue:**
Desviación del comportamiento esperado. Ejemplo: botón que no responde al click.

**Caso de Prueba (Test Case):**
Documento con pasos específicos, datos de entrada y resultado esperado para verificar una funcionalidad.

**Suite de Tests:**
Conjunto de casos de prueba relacionados agrupados lógicamente.

**Test Plan:**
Documento estratégico que define alcance, enfoque, recursos y cronograma de testing.

**Test Strategy:**
Documento de alto nivel que define estándares, tipos de testing y herramientas a usar.

### Conceptos Intermedios

**Regression Testing:**
Verificar que cambios nuevos no rompieron funcionalidades existentes.

**Smoke Testing:**
Verificación rápida de funcionalidades básicas después de un build (¿el software arranca?).

**Sanity Testing:**
Verificación rápida y superficial de funcionalidad específica después de un fix.

**Exploratory Testing:**
Testing sin script predefinido, guiado por experiencia del tester.

**Acceptance Testing (UAT):**
Testing final por usuarios reales o clientes antes de release.

### Conceptos Avanzados

**TDD (Test-Driven Development):**
Escribir tests antes del código. Flujo: Red → Green → Refactor.

**BDD (Behavior-Driven Development):**
Tests basados en comportamiento del usuario usando lenguaje Gherkin (Given/When/Then).

**Shift-Left Testing:**
Mover actividades de testing hacia etapas tempranas del SDLC.

**Shift-Right Testing:**
Testing en producción usando técnicas como canary releases y feature flags.

**Mutation Testing:**
Introducir cambios intencionales (mutantes) en el código para verificar si los tests los detectan.

**Chaos Engineering:**
Introducir fallas intencionales en producción para verificar resiliencia del sistema.

---

## 🔄 3. Ciclo de Vida del Testing (STLC) {#stlc}

### Las 6 Fases del STLC

#### 1. Análisis de Requisitos
**Objetivo:** Entender qué testear

**Actividades:**
- Revisar documentación (User Stories, BRD, FRD)
- Identificar requisitos testeables
- Participar en grooming sessions
- Identificar ambigüedades y riesgos

**Entregables:**
- RTM (Requirements Traceability Matrix)
- Lista de preguntas/clarificaciones

**Ejemplo Práctico:**
```markdown
User Story: Como usuario, quiero hacer login con email y password

Requisitos Testeables:
- ✅ Login con credenciales válidas debe redirigir a dashboard
- ✅ Login con credenciales inválidas debe mostrar error
- ✅ Email debe validarse formato válido
- ✅ Password debe tener mínimo 8 caracteres
- ✅ Token debe guardarse en localStorage
- ✅ Botón submit debe deshabilitarse durante request
```

#### 2. Planificación de Testing
**Objetivo:** Definir estrategia y recursos

**Actividades:**
- Definir alcance (qué sí, qué no)
- Estimar esfuerzo
- Seleccionar herramientas
- Identificar riesgos
- Definir criterios de entrada/salida

**Entregables:**
- Test Plan
- Schedule
- Matriz de riesgos

**Ejemplo Test Plan:**
```markdown
## Test Plan - Feature Login v2.0

### Alcance
- IN: Login web y mobile
- OUT: Social login (próximo sprint)

### Estrategia
- Manual: Casos críticos (80% cobertura)
- Automatizado: Regresión (100% cobertura)
- Performance: 1000 usuarios concurrentes
- Security: OWASP Top 10

### Recursos
- 2 testers QA
- 1 automation engineer
- Entornos: Dev, Staging, UAT

### Timeline
- Diseño: 2 días
- Ejecución: 3 días
- Retest: 1 día
```

#### 3. Diseño de Test Cases
**Objetivo:** Crear casos de prueba detallados

**Actividades:**
- Escribir test cases
- Crear test data
- Diseñar scripts de automatización
- Aplicar técnicas de diseño (equivalence partitioning, boundary value)

**Entregables:**
- Test cases documentados
- Test data preparado

**Ejemplo Test Case:**
```markdown
TC-001: Login exitoso con credenciales válidas

Precondiciones:
- Usuario registrado: user@test.com / Pass123!
- Base de datos limpia

Pasos:
1. Navegar a /login
2. Ingresar email: user@test.com
3. Ingresar password: Pass123!
4. Click en botón "Iniciar Sesión"

Resultado Esperado:
- Redirección a /dashboard
- Token guardado en localStorage
- Nombre de usuario visible en header

Datos de Prueba:
| Email | Password | Resultado |
|-------|----------|-----------|
| user@test.com | Pass123! | Success |

Prioridad: P0 (Critical)
Tipo: Functional
Método: Manual y Automatizado
```

#### 4. Configuración del Entorno
**Objetivo:** Preparar entornos de testing

**Actividades:**
- Configurar test environment
- Instalar herramientas
- Preparar datos de prueba
- Verificar conectividad

**Entregables:**
- Entornos configurados
- Smoke test exitoso

#### 5. Ejecución de Tests
**Objetivo:** Ejecutar casos y reportar defectos

**Actividades:**
- Ejecutar test cases
- Reportar bugs en Jira
- Hacer retest de bugs corregidos
- Actualizar matriz de trazabilidad

**Entregables:**
- Test execution reports
- Bug reports
- Logs y evidencia

#### 6. Cierre del Ciclo
**Objetivo:** Evaluar y documentar

**Actividades:**
- Evaluar cobertura alcanzada
- Analizar métricas
- Lecciones aprendidas
- Archivar artefactos

**Entregables:**
- Test summary report
- Métricas finales
- Retrospectiva

---

## 🔍 4. Tipos de Testing Explicados {#tipos-testing}

### Por Nivel de Testing

#### Tests Unitarios (Unit Testing)
**Qué son:** Prueban la unidad más pequeña de código (función, método, clase) de forma aislada.

**Características:**
- ⚡ Muy rápidos (milisegundos)
- 🎯 Scope pequeño
- 🔒 Completamente aislados (mocks)
- 💰 Baratos de mantener
- 📝 Documentan código

**Cuándo usar:**
- Funciones puras
- Lógica de negocio
- Validaciones
- Utilidades

**Ejemplo Dummies (Principiante):**
```javascript
// Función simple
function sumar(a, b) {
  return a + b;
}

// Test unitario básico
test('suma dos números positivos', () => {
  const resultado = sumar(2, 3);
  expect(resultado).toBe(5);
});

test('suma números negativos', () => {
  expect(sumar(-1, -2)).toBe(-3);
});

test('suma cero', () => {
  expect(sumar(5, 0)).toBe(5);
});
```

**Ejemplo Avanzado (Profesional):**
```javascript
// Función compleja con dependencias
class UserService {
  constructor(db, logger, emailService) {
    this.db = db;
    this.logger = logger;
    this.emailService = emailService;
  }

  async createUser(userData) {
    try {
      // Validar
      if (!userData.email) throw new Error('Email required');
      
      // Verificar existencia
      const exists = await this.db.findByEmail(userData.email);
      if (exists) throw new Error('User already exists');
      
      // Crear
      const user = await this.db.create(userData);
      
      // Log y notificación
      this.logger.info(`User created: ${user.id}`);
      await this.emailService.sendWelcome(user.email);
      
      return user;
    } catch (error) {
      this.logger.error(`Error creating user: ${error.message}`);
      throw error;
    }
  }
}

// Test con mocks avanzados
describe('UserService.createUser', () => {
  let userService, mockDb, mockLogger, mockEmail;

  beforeEach(() => {
    // Preparar mocks
    mockDb = {
      findByEmail: jest.fn(),
      create: jest.fn()
    };
    mockLogger = {
      info: jest.fn(),
      error: jest.fn()
    };
    mockEmail = {
      sendWelcome: jest.fn()
    };
    
    userService = new UserService(mockDb, mockLogger, mockEmail);
  });

  test('debe crear usuario exitosamente', async () => {
    // Arrange
    const userData = { email: 'new@test.com', name: 'Test' };
    mockDb.findByEmail.mockResolvedValue(null);
    mockDb.create.mockResolvedValue({ id: 1, ...userData });
    
    // Act
    const result = await userService.createUser(userData);
    
    // Assert
    expect(mockDb.findByEmail).toHaveBeenCalledWith('new@test.com');
    expect(mockDb.create).toHaveBeenCalledWith(userData);
    expect(mockLogger.info).toHaveBeenCalledWith('User created: 1');
    expect(mockEmail.sendWelcome).toHaveBeenCalledWith('new@test.com');
    expect(result).toEqual({ id: 1, ...userData });
  });

  test('debe lanzar error si email ya existe', async () => {
    // Arrange
    mockDb.findByEmail.mockResolvedValue({ id: 1 });
    
    // Act & Assert
    await expect(
      userService.createUser({ email: 'existing@test.com' })
    ).rejects.toThrow('User already exists');
    
    expect(mockDb.create).not.toHaveBeenCalled();
    expect(mockEmail.sendWelcome).not.toHaveBeenCalled();
  });

  test('debe manejar error de email service sin fallar', async () => {
    // Arrange
    mockDb.findByEmail.mockResolvedValue(null);
    mockDb.create.mockResolvedValue({ id: 1 });
    mockEmail.sendWelcome.mockRejectedValue(new Error('SMTP error'));
    
    // Act & Assert
    await expect(
      userService.createUser({ email: 'test@test.com' })
    ).rejects.toThrow('SMTP error');
    
    expect(mockLogger.error).toHaveBeenCalled();
  });
});
```

#### Tests de Integración
**Qué son:** Prueban la interacción entre múltiples componentes/módulos.

**Ejemplo Dummies:**
```python
# Backend: Test de integración simple
def test_user_can_save_and_retrieve(db):
    # Crear usuario
    user = User.objects.create(username='test', email='test@test.com')
    
    # Recuperar de DB
    retrieved = User.objects.get(username='test')
    
    assert retrieved.email == 'test@test.com'
```

**Ejemplo Avanzado:**
```python
import pytest
from django.test import Client
from unittest.mock import patch, Mock

@pytest.mark.django_db
class TestUserCardIntegration:
    """Tests de integración: API + DB + External Service"""
    
    def test_add_card_to_collection_complete_flow(self):
        # Arrange: Preparar datos
        client = Client()
        user = User.objects.create_user('test', 'test@test.com', 'pass')
        expansion = Expansion.objects.create(name='Base Set')
        
        # Mock external API (Pokemon TCG API)
        with patch('services.pokemon_api.get_card_details') as mock_api:
            mock_api.return_value = {
                'id': 'base1-4',
                'name': 'Charizard',
                'rarity': 'Rare Holo'
            }
            
            # Act: Login y agregar carta
            client.login(username='test', password='pass')
            response = client.post('/api/user-cards/', {
                'card_id': 'base1-4',
                'quantity': 1,
                'condition': 'NM'
            })
            
            # Assert: Verificar respuesta
            assert response.status_code == 201
            
            # Verificar DB
            user_card = UserCard.objects.get(user=user)
            assert user_card.card.name == 'Charizard'
            assert user_card.quantity == 1
            
            # Verificar API externa fue llamada
            mock_api.assert_called_once_with('base1-4')
            
            # Verificar stats actualizadas
            stats = UserStats.objects.get(user=user)
            assert stats.total_cards == 1
            assert stats.unique_cards == 1
```

#### Tests Funcionales (Component Testing)
**Qué son:** Prueban componentes completos desde perspectiva del usuario, sin navegador real.

**Ejemplo Dummies:**
```javascript
import { render, screen, fireEvent } from '@testing-library/react';
import LoginForm from './LoginForm';

test('muestra error con email inválido', () => {
  // Renderizar componente
  render(<LoginForm />);
  
  // Interactuar
  const emailInput = screen.getByLabelText('Email');
  fireEvent.change(emailInput, { target: { value: 'invalid' } });
  fireEvent.blur(emailInput);
  
  // Verificar
  expect(screen.getByText('Email inválido')).toBeInTheDocument();
});
```

**Ejemplo Avanzado:**
```javascript
import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import CardCollection from './CardCollection';

// Mock server para interceptar requests
const server = setupServer(
  rest.get('/api/expansions', (req, res, ctx) => {
    return res(ctx.json([
      { id: 1, name: 'Base Set', cards_count: 102 }
    ]));
  }),
  rest.get('/api/user-cards', (req, res, ctx) => {
    const expansion = req.url.searchParams.get('expansion');
    return res(ctx.json([
      { 
        id: 1, 
        card_name: 'Charizard',
        quantity: 1,
        condition: 'NM' 
      }
    ]));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('CardCollection - Functional Tests', () => {
  test('flujo completo: cargar expansiones, filtrar y ver detalles', async () => {
    const user = userEvent.setup();
    
    // Renderizar
    render(<CardCollection />);
    
    // Verificar loading state
    expect(screen.getByText('Cargando expansiones...')).toBeInTheDocument();
    
    // Esperar carga
    await waitFor(() => {
      expect(screen.getByText('Base Set')).toBeInTheDocument();
    });
    
    // Seleccionar expansión
    await user.click(screen.getByText('Base Set'));
    
    // Verificar carga de cartas
    await waitFor(() => {
      expect(screen.getByText('Charizard')).toBeInTheDocument();
    });
    
    // Verificar detalles
    const card = screen.getByTestId('card-1');
    expect(within(card).getByText('Cantidad: 1')).toBeInTheDocument();
    expect(within(card).getByText('NM')).toBeInTheDocument();
    
    // Click en detalles
    await user.click(within(card).getByRole('button', { name: 'Ver detalles' }));
    
    // Verificar modal
    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument();
      expect(screen.getByText('Detalles de Charizard')).toBeInTheDocument();
    });
  });

  test('maneja error de API correctamente', async () => {
    // Override mock para simular error
    server.use(
      rest.get('/api/expansions', (req, res, ctx) => {
        return res(ctx.status(500));
      })
    );
    
    render(<CardCollection />);
    
    await waitFor(() => {
      expect(screen.getByText('Error al cargar expansiones')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Reintentar' })).toBeInTheDocument();
    });
  });
});
```

#### Tests E2E (End-to-End)
**Qué son:** Prueban la aplicación completa en un navegador real, simulando usuario final.

**Ejemplo Dummies (Cypress):**
```javascript
describe('Login Flow', () => {
  it('usuario puede hacer login', () => {
    cy.visit('/login');
    cy.get('input[name="email"]').type('user@test.com');
    cy.get('input[name="password"]').type('password123');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/dashboard');
  });
});
```

**Ejemplo Avanzado (Playwright):**
```javascript
import { test, expect } from '@playwright/test';

test.describe('E2E: Complete User Journey', () => {
  test.beforeEach(async ({ page }) => {
    // Setup: Limpiar cookies y storage
    await page.context().clearCookies();
  });

  test('registro → login → agregar carta → logout', async ({ page, context }) => {
    // 1. REGISTRO
    await page.goto('/register');
    
    await page.fill('[data-testid="username"]', 'newuser123');
    await page.fill('[data-testid="email"]', 'newuser@test.com');
    await page.fill('[data-testid="password"]', 'SecurePass123!');
    await page.fill('[data-testid="password-confirm"]', 'SecurePass123!');
    
    // Interceptar request de registro
    const [registerResponse] = await Promise.all([
      page.waitForResponse(resp => 
        resp.url().includes('/api/auth/register') && resp.status() === 201
      ),
      page.click('[data-testid="submit-register"]')
    ]);
    
    expect(registerResponse.status()).toBe(201);
    
    // Verificar mensaje de éxito
    await expect(page.locator('.success-message')).toContainText('Registro exitoso');
    
    // 2. LOGIN AUTOMÁTICO
    await page.waitForURL('**/login');
    await page.fill('[data-testid="username"]', 'newuser123');
    await page.fill('[data-testid="password"]', 'SecurePass123!');
    
    // Interceptar login
    const [loginResponse] = await Promise.all([
      page.waitForResponse('/api/auth/login'),
      page.click('[data-testid="submit-login"]')
    ]);
    
    // Verificar token guardado
    const localStorage = await page.evaluate(() => window.localStorage.getItem('token'));
    expect(localStorage).toBeTruthy();
    
    // 3. NAVEGAR A COLECCIÓN
    await page.waitForURL('**/dashboard');
    await expect(page.locator('h1')).toContainText('Mi Colección Pokémon');
    
    // Verificar que user está logueado
    await expect(page.locator('[data-testid="username-display"]')).toContainText('newuser123');
    
    // 4. AGREGAR CARTA
    await page.click('[data-testid="add-card-button"]');
    
    // Buscar carta
    await page.fill('[data-testid="search-card"]', 'Charizard');
    await page.keyboard.press('Enter');
    
    // Esperar resultados
    await page.waitForSelector('[data-testid="search-results"]');
    
    // Seleccionar primera carta
    await page.click('[data-testid="card-result"]:first-child');
    
    // Configurar detalles
    await page.selectOption('[data-testid="condition"]', 'NM');
    await page.fill('[data-testid="quantity"]', '2');
    
    // Guardar
    const [addCardResponse] = await Promise.all([
      page.waitForResponse('/api/user-cards/'),
      page.click('[data-testid="save-card"]')
    ]);
    
    expect(addCardResponse.status()).toBe(201);
    
    // Verificar carta en colección
    await expect(page.locator('[data-testid="card-list"]')).toContainText('Charizard');
    await expect(page.locator('[data-testid="quantity"]')).toContainText('2');
    
    // 5. LOGOUT
    await page.click('[data-testid="user-menu"]');
    await page.click('[data-testid="logout"]');
    
    // Verificar redirección
    await page.waitForURL('**/login');
    
    // Verificar token eliminado
    const loggedOutStorage = await page.evaluate(() => window.localStorage.getItem('token'));
    expect(loggedOutStorage).toBeNull();
  });

  test('maneja errores de red correctamente', async ({ page, context }) => {
    // Simular falla de red
    await context.route('**/api/**', route => route.abort());
    
    await page.goto('/dashboard');
    
    // Verificar mensaje de error
    await expect(page.locator('.error-banner')).toContainText('Error de conexión');
    await expect(page.locator('[data-testid="retry-button"]')).toBeVisible();
  });

  test('funciona en múltiples resoluciones', async ({ page }) => {
    const viewports = [
      { width: 1920, height: 1080, name: 'Desktop' },
      { width: 768, height: 1024, name: 'Tablet' },
      { width: 375, height: 667, name: 'Mobile' }
    ];

    for (const viewport of viewports) {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.goto('/dashboard');
      
      // Verificar elementos visibles
      await expect(page.locator('h1')).toBeVisible();
      
      // Screenshot para comparación visual
      await page.screenshot({ 
        path: `screenshots/dashboard-${viewport.name}.png`,
        fullPage: true 
      });
    }
  });
});
```

### Por Conocimiento del Sistema

#### Caja Negra (Black Box Testing)
**Qué es:** Testing sin conocimiento del código interno, solo basado en requisitos.

**Técnicas:**
- Equivalence Partitioning
- Boundary Value Analysis
- Decision Tables
- State Transition Testing

**Ejemplo:**
```markdown
Funcionalidad: Campo "Edad" en formulario
Requisitos: Edad entre 18 y 100

Equivalence Partitioning:
- Clase 1 (inválida): < 18
- Clase 2 (válida): 18-100
- Clase 3 (inválida): > 100

Test Cases:
- TC1: Edad = 10 → Error "Debe ser mayor de 18"
- TC2: Edad = 18 → Aceptado (boundary)
- TC3: Edad = 50 → Aceptado (medio)
- TC4: Edad = 100 → Aceptado (boundary)
- TC5: Edad = 105 → Error "Edad máxima 100"
```

#### Caja Blanca (White Box Testing)
**Qué es:** Testing con conocimiento completo del código interno.

**Técnicas:**
- Statement Coverage
- Branch Coverage
- Path Coverage
- Condition Coverage

**Ejemplo:**
```javascript
// Código a testear
function procesarPago(monto, metodoPago) {
  if (monto <= 0) {                    // Branch 1
    return { error: 'Monto inválido' };
  }
  
  if (metodoPago === 'tarjeta') {      // Branch 2
    if (monto > 1000) {                // Branch 3
      return { success: true, requiere3DS: true };
    }
    return { success: true, requiere3DS: false };
  }
  
  if (metodoPago === 'paypal') {       // Branch 4
    return { success: true, redirect: 'paypal.com' };
  }
  
  return { error: 'Método no soportado' };
}

// Tests para 100% branch coverage
describe('procesarPago - White Box', () => {
  test('branch 1: monto inválido', () => {
    expect(procesarPago(0, 'tarjeta')).toEqual({ error: 'Monto inválido' });
  });
  
  test('branch 2-3: tarjeta con monto alto', () => {
    expect(procesarPago(1500, 'tarjeta')).toEqual({ 
      success: true, 
      requiere3DS: true 
    });
  });
  
  test('branch 2: tarjeta con monto bajo', () => {
    expect(procesarPago(500, 'tarjeta')).toEqual({ 
      success: true, 
      requiere3DS: false 
    });
  });
  
  test('branch 4: paypal', () => {
    expect(procesarPago(100, 'paypal')).toEqual({ 
      success: true, 
      redirect: 'paypal.com' 
    });
  });
  
  test('método no soportado', () => {
    expect(procesarPago(100, 'bitcoin')).toEqual({ 
      error: 'Método no soportado' 
    });
  });
});
```

#### Caja Gris (Grey Box Testing)
**Qué es:** Combinación de ambos - conocimiento parcial del código.

### Por Objetivo

#### Smoke Testing
**Cuándo:** Después de cada build
**Objetivo:** Verificar que funcionalidades críticas funcionan
**Duración:** 5-15 minutos

**Ejemplo Checklist:**
```markdown
✅ La aplicación arranca sin errores
✅ Login funciona
✅ Dashboard carga
✅ Menú de navegación responde
✅ Al menos un feature crítico funciona
```

#### Sanity Testing
**Cuándo:** Después de un bug fix o cambio menor
**Objetivo:** Verificar que el fix funcionó y no rompió nada relacionado

#### Regression Testing
**Cuándo:** Antes de cada release
**Objetivo:** Asegurar que cambios no rompieron funcionalidades existentes

**Ejemplo:**
```javascript
// Suite de regresión automatizada
describe('Regression Suite - User Authentication', () => {
  test('REG-001: Login con credenciales válidas', () => { /* ... */ });
  test('REG-002: Logout limpia sesión', () => { /* ... */ });
  test('REG-003: Token expira después de 1 hora', () => { /* ... */ });
  test('REG-004: Refresh token funciona', () => { /* ... */ });
});
```

---

## ⚖️ 5. Testing Manual vs Automatizado {#manual-vs-auto}

### Comparación Detallada

| Aspecto | Manual | Automatizado |
|---------|--------|--------------|
| **Velocidad** | 🐌 Lento | ⚡ Rápido (una vez creado) |
| **Costo Inicial** | 💰 Bajo | 💰💰💰 Alto |
| **Costo a Largo Plazo** | 💰💰💰 Alto | 💰 Bajo |
| **Repetibilidad** | ❌ Baja | ✅ Perfecta |
| **Detecta Issues UX** | ✅ Excelente | ❌ Limitado |
| **Mantenimiento** | 🟢 Bajo | 🔴 Alto |
| **Cobertura** | 🟡 Limitada | 🟢 Amplia |
| **Exploratory** | ✅ Sí | ❌ No |
| **Feedback** | 🐌 Horas/Días | ⚡ Minutos |

### Cuándo Usar Manual

✅ **Usar Manual para:**
- Exploratory testing
- Usability testing
- Tests únicos o de corto plazo
- Verificación visual y UX
- Tests ad-hoc
- Nuevas funcionalidades (primera vez)

### Cuándo Usar Automatizado

✅ **Usar Automatizado para:**
- Regression testing
- Tests repetitivos
- Tests de carga/performance
- CI/CD pipelines
- Smoke tests
- Tests de integración
- Cross-browser testing

### Estrategia Híbrida (Recomendado)

```markdown
## Ejemplo: Feature "Checkout de Compra"

### Manual (Primera Iteración)
- Explorar flujo completo
- Verificar UX y mensajes
- Probar edge cases inesperados
- Documentar findings

### Automatizado (Segunda Iteración)
- Automatizar happy path
- Automatizar casos críticos
- Incluir en suite de regresión
- Ejecutar en CI/CD

### Manual Continuo
- Exploratory testing cada sprint
- Verificación visual de diseño
- Testing en dispositivos reales
- UAT con usuarios finales
```

---

## 🏔️ 6. Pirámide de Tests y Estrategias {#piramide}

### La Pirámide Clásica

```
          /\
         /  \      E2E (5-10%)
        / UI \     - Lentos, costosos
       /------\    - Solo flujos críticos
      /        \   
     / Integr. \   Integration (20-30%)
    /    ción   \  - Módulos trabajando juntos
   /------------\  
  /              \  Unit Tests (60-70%)
 /   Unitarios   \ - Base sólida
/                 \- Rápidos y específicos
-------------------
```

### Distribución Recomendada

**Para aplicación web típica:**
- 60-70% Unitarios → Lógica de negocio, utilidades, validaciones
- 20-30% Integración → APIs, componentes con estado, DB
- 5-10% E2E → Flujos críticos (login, checkout, core features)

**Para microservicios:**
- 50% Unitarios
- 40% Integración (entre servicios)
- 10% E2E

### Anti-Patterns a Evitar

#### Ice Cream Cone (❌ Malo)
```
              ____
             /    \
            /  E2E \    ← Demasiados E2E
           /________\
          /          \
         / Integration\
        /              \
       /    Unitarios   \  ← Pocos unitarios
      /__________________\
```

**Problemas:**
- Tests lentos
- Costoso de mantener
- Feedback tardío

#### Testing Trophy (Kent C. Dodds)
```
        ____
       /    \
      /  E2E \     ← Pocos E2E
     /________\
    /          \
   /            \
  / Integration  \  ← Énfasis en integración
 /________________\
/                  \
/     Unit + Static \ ← Base sólida
/____________________\
```

**Ventajas:**
- Balance entre confianza y velocidad
- Buenos para frontend moderno

### Estrategias Avanzadas

#### 1. Risk-Based Testing
Priorizar tests según impacto del negocio:

```markdown
## Matriz de Riesgo

| Funcionalidad | Probabilidad Bug | Impacto | Prioridad |
|---------------|------------------|---------|-----------|
| Pagos | Media | Crítico | P0 |
| Login | Alta | Alto | P0 |
| Búsqueda | Media | Medio | P1 |
| Perfil | Baja | Bajo | P2 |

Estrategia:
- P0: Cobertura 100% (unit + integration + E2E)
- P1: Cobertura 80% (unit + integration)
- P2: Cobertura 60% (principalmente unit)
```

#### 2. Equivalence Partitioning
Dividir inputs en clases equivalentes:

**Ejemplo:**
```javascript
// Funcionalidad: Descuento por edad
// Reglas:
// - 0-17: No válido
// - 18-25: 20% descuento
// - 26-64: Sin descuento
// - 65+: 15% descuento senior

// Particiones:
const testCases = [
  { edad: -1, clase: 'inválida', esperado: 'error' },
  { edad: 10, clase: 'menor', esperado: 'error' },
  { edad: 18, clase: 'joven-inicio', esperado: 0.20 },
  { edad: 22, clase: 'joven-medio', esperado: 0.20 },
  { edad: 25, clase: 'joven-fin', esperado: 0.20 },
  { edad: 26, clase: 'adulto-inicio', esperado: 0 },
  { edad: 45, clase: 'adulto-medio', esperado: 0 },
  { edad: 64, clase: 'adulto-fin', esperado: 0 },
  { edad: 65, clase: 'senior-inicio', esperado: 0.15 },
  { edad: 80, clase: 'senior-medio', esperado: 0.15 },
  { edad: 120, clase: 'senior-extremo', esperado: 0.15 }
];
```

#### 3. Boundary Value Analysis
Probar límites:

```javascript
// Para campo "Stock" (1-999)
const boundaryTests = [
  { valor: 0, esperado: 'error' },      // Justo debajo
  { valor: 1, esperado: 'válido' },     // Límite inferior
  { valor: 2, esperado: 'válido' },     // Justo arriba
  { valor: 998, esperado: 'válido' },   // Justo debajo
  { valor: 999, esperado: 'válido' },   // Límite superior
  { valor: 1000, esperado: 'error' }    // Justo arriba
];
```

#### 4. Pairwise Testing
Para múltiples parámetros:

```javascript
// Sistema con 3 parámetros:
// Browser: Chrome, Firefox, Safari
// OS: Windows, Mac, Linux
// Network: 3G, 4G, WiFi

// En lugar de 3×3×3 = 27 combinaciones
// Pairwise reduce a ~9 combinaciones que cubren todas las interacciones

const pairwiseTests = [
  { browser: 'Chrome', os: 'Windows', network: '3G' },
  { browser: 'Chrome', os: 'Mac', network: '4G' },
  { browser: 'Chrome', os: 'Linux', network: 'WiFi' },
  { browser: 'Firefox', os: 'Windows', network: '4G' },
  { browser: 'Firefox', os: 'Mac', network: 'WiFi' },
  { browser: 'Firefox', os: 'Linux', network: '3G' },
  { browser: 'Safari', os: 'Windows', network: 'WiFi' },
  { browser: 'Safari', os: 'Mac', network: '3G' },
  { browser: 'Safari', os: 'Linux', network: '4G' }
];
```

---

## 📊 7. Cobertura de Tests (Code Coverage) {#cobertura}

### Tipos de Cobertura

#### 1. Line Coverage
Porcentaje de líneas ejecutadas:

```javascript
function dividir(a, b) {
  if (b === 0) {           // Línea 1
    return 'Error';        // Línea 2
  }
  return a / b;            // Línea 3
}

// Test básico
test('divide 10/2', () => {
  expect(dividir(10, 2)).toBe(5);
});
// Cobertura: 66% (líneas 1 y 3, falta línea 2)

// Test completo
test('divide 10/2', () => {
  expect(dividir(10, 2)).toBe(5);
  expect(dividir(10, 0)).toBe('Error');
});
// Cobertura: 100%
```

#### 2. Branch Coverage
Porcentaje de ramas (if/else) ejecutadas:

```javascript
function calcularDescuento(precio, esMiembro, esVIP) {
  let descuento = 0;
  
  if (esMiembro) {         // Branch 1
    descuento = 0.1;
    
    if (esVIP) {           // Branch 2
      descuento = 0.2;
    }
  }
  
  return precio * (1 - descuento);
}

// Para 100% branch coverage necesitas probar:
test('sin membresía', () => {
  expect(calcularDescuento(100, false, false)).toBe(100);
});

test('miembro regular', () => {
  expect(calcularDescuento(100, true, false)).toBe(90);
});

test('miembro VIP', () => {
  expect(calcularDescuento(100, true, true)).toBe(80);
});
```

#### 3. Function Coverage
Porcentaje de funciones llamadas.

#### 4. Statement Coverage
Porcentaje de sentencias ejecutadas.

### Medir Cobertura

**JavaScript (Jest):**
```json
// package.json
{
  "scripts": {
    "test:coverage": "jest --coverage --coverageReporters=text --coverageReporters=html"
  },
  "jest": {
    "collectCoverageFrom": [
      "src/**/*.{js,jsx}",
      "!src/index.js",
      "!src/**/*.test.js"
    ],
    "coverageThreshold": {
      "global": {
        "branches": 80,
        "functions": 80,
        "lines": 80,
        "statements": 80
      }
    }
  }
}
```

**Python (pytest + coverage):**
```ini
# .coveragerc
[run]
source = src
omit = 
    */tests/*
    */migrations/*
    */settings/*

[report]
exclude_lines =
    pragma: no cover
    def __repr__
    raise AssertionError
    raise NotImplementedError
```

```bash
# Ejecutar con coverage
pytest --cov=src --cov-report=html --cov-report=term-missing
```

### Objetivos de Cobertura Realistas

```markdown
## Por Tipo de Código

- Lógica de negocio crítica: 90-100%
- APIs y servicios: 80-90%
- Componentes UI: 70-80%
- Utilidades: 90-100%
- Configuración: 50-60%
- Scripts de deployment: 40-50%

## Por Complejidad

- Código simple (getters/setters): 60-70%
- Código medio (validaciones): 80-90%
- Código complejo (algoritmos): 90-100%
- Código crítico (pagos, auth): 100%
```

### ⚠️ Advertencia Importante

**Cobertura NO es calidad:**
- 100% cobertura ≠ 0 bugs
- Mejor 60% de tests buenos que 100% de tests malos
- Cobertura es métrica, no objetivo

**Ejemplo de test inútil con 100% cobertura:**
```javascript
// ❌ MAL: 100% cobertura, 0% útil
function sumar(a, b) {
  return a + b;
}

test('llama a sumar', () => {
  sumar(2, 3); // No verifica nada
  expect(true).toBe(true); // Assert vacío
});
// Coverage: 100%, pero test no prueba nada
```

---

## ✨ 8. Mejores Prácticas en Testing {#mejores-practicas}

### Patrón AAA (Arrange-Act-Assert)

```javascript
test('usuario puede actualizar su perfil', () => {
  // ARRANGE (Preparar)
  const usuario = crearUsuarioTest();
  const nuevosDatos = { nombre: 'Juan Actualizado' };
  
  // ACT (Actuar)
  const resultado = actualizarPerfil(usuario.id, nuevosDatos);
  
  // ASSERT (Verificar)
  expect(resultado.nombre).toBe('Juan Actualizado');
});
```

### Given-When-Then (BDD)

```gherkin
Feature: Login de Usuario

Scenario: Login exitoso con credenciales válidas
  Given el usuario está registrado con email "test@test.com"
  And la contraseña es "Pass123!"
  When el usuario ingresa sus credenciales
  And hace click en "Iniciar Sesión"
  Then debe ver la página de dashboard
  And debe ver su nombre en el header
```

### Nombres Descriptivos

```javascript
// ❌ MAL
test('test1', () => { ... });
test('funciona', () => { ... });
test('bug fix', () => { ... });

// ✅ BIEN
test('debe rechazar login con password incorrecto', () => { ... });
test('debe mostrar mensaje de error cuando email es inválido', () => { ... });
test('debe guardar token en localStorage después de login exitoso', () => { ... });
```

### Un Test, Una Cosa

```javascript
// ❌ MAL: Test que prueba múltiples cosas
test('formulario funciona', () => {
  expect(validarEmail('test')).toBe(false);
  expect(validarPassword('123')).toBe(false);
  expect(enviarFormulario()).toBe(true);
  expect(guardarEnDB()).toBe(true);
});

// ✅ BIEN: Tests separados
describe('Validaciones de Formulario', () => {
  test('debe rechazar email sin @', () => {
    expect(validarEmail('test')).toBe(false);
  });
  
  test('debe rechazar password corto', () => {
    expect(validarPassword('123')).toBe(false);
  });
});

describe('Envío de Formulario', () => {
  test('debe enviar datos correctamente', () => {
    expect(enviarFormulario(datosValidos)).toBe(true);
  });
  
  test('debe guardar en DB después de envío', async () => {
    await enviarFormulario(datosValidos);
    expect(await buscarEnDB()).toBeDefined();
  });
});
```

### Tests Independientes

```javascript
// ❌ MAL: Tests dependientes
describe('CRUD Usuario', () => {
  let userId;
  
  test('crear usuario', () => {
    userId = crearUsuario('test');
    expect(userId).toBeDefined();
  });
  
  test('actualizar usuario', () => {
    // Depende del test anterior ❌
    actualizarUsuario(userId, { nombre: 'nuevo' });
  });
});

// ✅ BIEN: Tests independientes
describe('CRUD Usuario', () => {
  let userId;
  
  beforeEach(() => {
    // Cada test tiene su propio usuario
    userId = crearUsuario('test');
  });
  
  afterEach(() => {
    // Limpieza después de cada test
    eliminarUsuario(userId);
  });
  
  test('crear usuario establece campos correctos', () => {
    const usuario = obtenerUsuario(userId);
    expect(usuario.nombre).toBe('test');
  });
  
  test('actualizar usuario modifica campos', () => {
    actualizarUsuario(userId, { nombre: 'nuevo' });
    const usuario = obtenerUsuario(userId);
    expect(usuario.nombre).toBe('nuevo');
  });
});
```

### Usar Mocks Apropiadamente

```javascript
// ✅ BIEN: Mock de servicios externos
jest.mock('./emailService', () => ({
  enviarEmail: jest.fn(() => Promise.resolve({ enviado: true }))
}));

test('registro envía email de bienvenida', async () => {
  const usuario = await registrarUsuario(datosUsuario);
  
  expect(emailService.enviarEmail).toHaveBeenCalledWith({
    to: datosUsuario.email,
    subject: 'Bienvenido',
    template: 'welcome'
  });
});

// ❌ MAL: Mock innecesario
jest.mock('./sumar'); // ¿Por qué mockear una función pura simple?

test('suma', () => {
  sumar.mockReturnValue(5);
  expect(sumar(2, 3)).toBe(5); // No estás testeando nada real
});
```

### Test Data Builders

```javascript
// ✅ BIEN: Builder pattern para datos de test
class UsuarioBuilder {
  constructor() {
    this.usuario = {
      nombre: 'Test User',
      email: 'test@test.com',
      edad: 25,
      activo: true
    };
  }
  
  conNombre(nombre) {
    this.usuario.nombre = nombre;
    return this;
  }
  
  conEmail(email) {
    this.usuario.email = email;
    return this;
  }
  
  inactivo() {
    this.usuario.activo = false;
    return this;
  }
  
  build() {
    return this.usuario;
  }
}

// Uso en tests
test('usuario inactivo no puede hacer login', () => {
  const usuario = new UsuarioBuilder()
    .conEmail('inactivo@test.com')
    .inactivo()
    .build();
    
  expect(() => login(usuario)).toThrow('Usuario inactivo');
});
```

### Evitar Tests Frágiles

```javascript
// ❌ FRÁGIL: Depende de implementación interna
test('componente tiene className correcto', () => {
  const { container } = render(<Button />);
  expect(container.firstChild.className).toBe('btn btn-primary');
  // Si cambia el orden de clases, el test falla
});

// ✅ ROBUSTO: Prueba comportamiento
test('botón es visible y clickeable', () => {
  render(<Button>Enviar</Button>);
  const boton = screen.getByRole('button', { name: 'Enviar' });
  expect(boton).toBeVisible();
  expect(boton).not.toBeDisabled();
});
```

### Async/Await Correctamente

```javascript
// ❌ MAL: No espera promesa
test('obtiene usuario', () => {
  obtenerUsuario(1); // Falta await
  expect(usuario).toBeDefined(); // Falla
});

// ✅ BIEN: Usa async/await
test('obtiene usuario', async () => {
  const usuario = await obtenerUsuario(1);
  expect(usuario).toBeDefined();
  expect(usuario.id).toBe(1);
});

// ✅ BIEN: Usa waitFor para UI
test('muestra datos cargados', async () => {
  render(<UserProfile userId={1} />);
  
  await waitFor(() => {
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });
});
```

---

## 📝 9. Diseño de Casos de Prueba {#casos-prueba}

### Plantilla Estándar de Test Case

```markdown
# TC-001: Login con Credenciales Válidas

## Información General
- ID: TC-001
- Módulo: Autenticación
- Prioridad: P0 (Critical)
- Tipo: Functional
- Método: Manual + Automatizado

## Precondiciones
- Usuario registrado en el sistema
- Email: test@example.com
- Password: SecurePass123!
- Base de datos limpia
- Navegador: Chrome latest
- Entorno: Staging

## Datos de Prueba
| Campo | Valor | Tipo |
|-------|-------|------|
| Email | test@example.com | Valid |
| Password | SecurePass123! | Valid |
| Remember Me | true | Boolean |

## Pasos
1. Navegar a https://staging.app.com/login
2. Ingresar email: test@example.com
3. Ingresar password: SecurePass123!
4. Marcar checkbox "Recordarme"
5. Hacer click en botón "Iniciar Sesión"

## Resultado Esperado
- Redirección a /dashboard en <3 segundos
- Token JWT guardado en localStorage
- Cookie de sesión creada (expires: 7 días)
- Nombre de usuario visible en header
- Sin errores en console
- Mensaje de bienvenida mostrado

## Resultado Actual
[Completar durante ejecución]

## Postcondiciones
- Usuario autenticado
- Sesión activa en DB
- Log de login registrado

## Notas
- Si falla, verificar conexión a DB
- Verificar que servicio de auth esté corriendo
- Check logs en: /var/log/auth.log

## Adjuntos
- Screenshot: login-success.png
- Video: login-flow.mp4
- Logs: auth-logs.txt
```

### Plantilla para Testing Exploratorio

```markdown
# Sesión de Testing Exploratorio

## Charter
Explorar funcionalidad de búsqueda de cartas en la colección
para identificar problemas de UX y rendimiento

## Duración: 60 minutos
- Inicio: 2024-01-15 10:00
- Fin: 2024-01-15 11:00

## Áreas Exploradas
1. Búsqueda por nombre
2. Filtros de expansión
3. Ordenamiento de resultados
4. Paginación
5. Búsqueda vacía
6. Caracteres especiales

## Observaciones
### Issues Encontrados
1. [BUG] Búsqueda con 1 carácter lanza 500 error
   - Severidad: High
   - Reproducible: Sí
   
2. [UX] Loading state no se muestra durante búsqueda
   - Severidad: Medium
   - Reproducible: Sí

3. [PERFORMANCE] Búsqueda con >1000 resultados tarda >10s
   - Severidad: Medium
   - Reproducible: A veces

### Áreas que Funcionan Bien
- Autocompletado es rápido y preciso
- Filtros se aplican correctamente
- Diseño responsive funciona bien

## Próximos Pasos
- Reportar bugs en Jira
- Sugerir optimización de queries
- Crear tests automatizados para casos edge
```

---

## 🏃 10. Testing en Metodologías Ágiles {#agile}

### Testing en Scrum

#### Sprint Planning
**QA participa en:**
- Estimar esfuerzo de testing
- Definir Definition of Done
- Identificar riesgos de testing
- Proponer criterios de aceptación

**Ejemplo Definition of Done:**
```markdown
## Definition of Done - Feature Login

✅ Código escrito y revisado (PR aprobado)
✅ Tests unitarios pasando (>80% coverage)
✅ Tests de integración implementados
✅ Tests funcionales creados
✅ Tests manuales ejecutados (checklist)
✅ No hay bugs P0 o P1 abiertos
✅ Documentación actualizada
✅ Desplegado en staging
✅ Aprobado por PO
✅ Performance test pasando (<2s respuesta)
```

#### Daily Standup
**QA reporta:**
```markdown
✔️ Ayer: Ejecuté suite de regresión, encontré 2 bugs (BUG-123, BUG-124)
⏳ Hoy: Voy a hacer retest de bugs corregidos y automatizar casos de login
⚠️ Blockers: Necesito acceso a entorno de staging
```

#### Sprint Review
**QA demuestra:**
- Cobertura de tests alcanzada
- Bugs encontrados y resueltos
- Métricas de calidad

#### Sprint Retrospective
**QA propone mejoras:**
```markdown
## Retrospectiva - Sprint 12

### 🟢 Qué salió bien
- Automatización de regresión ahorró 4 horas
- Encontramos bugs temprano (shift-left)

### 🔴 Qué mejorar
- Tests E2E muy lentos (15min)
- Falta comunicación con devs sobre testability

### 💡 Acciones
- Paralelizar E2E tests (reduce a 5min)
- Sesión semanal sobre "cómo escribir código testeable"
```

### Testing en Kanban

**Columnas típicas:**
```
Backlog → Ready → Dev → Code Review → QA → Done
```

**WIP Limits:**
```markdown
Backlog: ∞
Ready: 5
Dev: 3
Code Review: 2
QA: 2  ← Límite para evitar bottleneck
Done: ∞
```

### ATDD (Acceptance Test-Driven Development)

**Flujo:**
1. **Refinement:** Definir criterios de aceptación
2. **Pre-Development:** Escribir tests de aceptación (fallando)
3. **Development:** Implementar hasta que tests pasen
4. **Done:** Tests pasando = feature completa

**Ejemplo:**
```gherkin
# Durante refinement (antes de codear)
Feature: Agregar Carta a Colección

Scenario: Usuario agrega carta nueva
  Given el usuario está logueado
  And está en la página de búsqueda
  When busca "Charizard"
  And selecciona la primera carta
  And hace click en "Agregar a Colección"
  Then debe ver mensaje "Carta agregada exitosamente"
  And la carta debe aparecer en su colección
  And el contador de cartas debe incrementar en 1
```

### BDD (Behavior-Driven Development)

**Herramientas:** Cucumber, Behave (Python), Jest-Cucumber (JS)

**Ejemplo completo:**
```gherkin
# features/login.feature
Feature: Autenticación de Usuario
  Como usuario registrado
  Quiero poder hacer login
  Para acceder a mi colección de cartas

  Background:
    Given existe un usuario con email "user@test.com" y password "Pass123!"

  Scenario: Login exitoso
    Given el usuario está en la página de login
    When ingresa email "user@test.com"
    And ingresa password "Pass123!"
    And hace click en "Iniciar Sesión"
    Then debe ver la página de dashboard
    And debe ver su email "user@test.com" en el header

  Scenario: Login con password incorrecto
    Given el usuario está en la página de login
    When ingresa email "user@test.com"
    And ingresa password "WrongPass"
    And hace click en "Iniciar Sesión"
    Then debe ver mensaje de error "Credenciales inválidas"
    And debe permanecer en la página de login

  Scenario Outline: Validación de campos
    Given el usuario está en la página de login
    When ingresa email "<email>"
    And ingresa password "<password>"
    And hace click en "Iniciar Sesión"
    Then debe ver error "<error>"

    Examples:
      | email           | password  | error                  |
      |                 | Pass123!  | Email es requerido     |
      | invalid         | Pass123!  | Email inválido         |
      | user@test.com   |           | Password es requerido  |
      | user@test.com   | 123       | Password muy corto     |
```

**Step Definitions (JavaScript):**
```javascript
// features/step_definitions/login.steps.js
const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('chai');

Given('existe un usuario con email {string} y password {string}', 
  async function(email, password) {
    await this.db.createUser({ email, password });
  }
);

Given('el usuario está en la página de login', async function() {
  await this.page.goto('/login');
});

When('ingresa email {string}', async function(email) {
  await this.page.fill('[data-testid="email"]// features/step_definitions/login.steps.js
const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('chai');

Given('existe un usuario con email {string} y password {string}', 
  async function(email, password) {
    await this.db.createUser({ email, password });
  }
);

Given('el usuario está en la página de login', async function() {
  await this.page.goto('/login');
});

When('ingresa email {string}', async function(email) {
  await this.page.fill('[data-testid="email"]