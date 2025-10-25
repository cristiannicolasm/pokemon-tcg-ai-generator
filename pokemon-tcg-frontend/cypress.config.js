import { defineConfig } from 'cypress';

export default defineConfig({
  // ========================================
  // CONFIGURACIÓN E2E
  // ========================================
  e2e: {
    // -------------------------------------
    // URLs BASE
    // -------------------------------------
    /**
     * Base URL del Frontend (Vite corriendo localmente)
     * - En desarrollo: http://localhost:5173
     * - En CI/CD: Se sobrescribe con variable de entorno
     */
    baseUrl: 'http://localhost:5173',

    /**
     * Variables de entorno accesibles en tests
     * Uso: Cypress.env('apiUrl')
     */
    env: {
      // URL del Backend (Docker)
      apiUrl: 'http://localhost:8000',
      
      // Endpoints específicos (para no hardcodear en tests)
      endpoints: {
        login: '/api/auth/login/',
        register: '/api/auth/register/',
        expansions: '/api/expansions/',
        cards: '/api/cards/',
        userCards: '/api/user-cards/',
        userCardsGrouped: '/api/user-cards/grouped/'
      },

      // Credenciales de test (NO usar en producción)
      testUser: {
        email: 'test@example.com',
        password: 'testpass123'
      }
    },

    // -------------------------------------
    // VIEWPORT (TAMAÑO DE VENTANA)
    // -------------------------------------
    /**
     * Tamaño del navegador durante tests
     * - Desktop estándar: 1280x720
     * - Puedes sobrescribir en tests individuales
     */
    viewportWidth: 1280,
    viewportHeight: 720,

    // -------------------------------------
    // TIMEOUTS (Tiempos de Espera)
    // -------------------------------------
    /**
     * Tiempo máximo para comandos de Cypress (ej: cy.get())
     * - Default: 4000ms (4 segundos)
     * - Aumentado a 10s porque tu backend en Docker puede ser lento
     */
    defaultCommandTimeout: 10000,

    /**
     * Tiempo máximo para peticiones HTTP (cy.request, cy.intercept)
     * - Aumentado porque Docker puede tener latencia
     */
    requestTimeout: 10000,

    /**
     * Tiempo máximo para cy.visit() (cargar página)
     */
    pageLoadTimeout: 30000,

    /**
     * Tiempo para esperar que un elemento exista en DOM
     */
    responseTimeout: 10000,

    // -------------------------------------
    // EVIDENCIAS (Videos y Screenshots)
    // -------------------------------------
    /**
     * Grabar videos de todos los tests
     * - true en CI/CD (para debugging)
     * - false en desarrollo (más rápido)
     */
    video: true,

    /**
     * Carpeta donde guardar videos
     */
    videosFolder: 'cypress/videos',

    /**
     * Comprimir videos para ahorrar espacio
     */
    videoCompression: 32,

    /**
     * Tomar screenshot automáticamente cuando un test falla
     */
    screenshotOnRunFailure: true,

    /**
     * Carpeta de screenshots
     */
    screenshotsFolder: 'cypress/screenshots',

    // -------------------------------------
    // RETRY LOGIC (Reintentos)
    // -------------------------------------
    /**
     * Número de reintentos si un test falla
     * - runMode: Cuando ejecutas con 'cypress run' (CI/CD)
     * - openMode: Cuando ejecutas con 'cypress open' (desarrollo)
     */
    retries: {
      runMode: 2,    // 2 reintentos en CI/CD (tests pueden ser flaky)
      openMode: 0    // 0 reintentos en desarrollo (queremos ver errores inmediatos)
    },

    // -------------------------------------
    // NAVEGADOR Y SEGURIDAD
    // -------------------------------------
    /**
     * Desactivar checks de seguridad que pueden interferir
     * - chromeWebSecurity: Permite llamadas cross-origin (frontend:5173 → backend:8000)
     */
    chromeWebSecurity: false,

    /**
     * Configuración de Firefox 
     */
    firefoxGcInterval: {
      runMode: 1,
      openMode: null
    },

    // -------------------------------------
    // ARCHIVOS Y PATTERNS
    // -------------------------------------
    /**
     * Pattern de archivos de tests E2E
     */
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',

    /**
     * Archivos a ignorar
     */
    excludeSpecPattern: [
      '**/__snapshots__/*',
      '**/__image_snapshots__/*'
    ],

    /**
     * Carpeta de archivos de soporte (commands.js, etc.)
     */
    supportFile: 'cypress/support/e2e.js',

    /**
     * Carpeta de fixtures (datos de prueba)
     */
    fixturesFolder: 'cypress/fixtures',

    // -------------------------------------
    // OPCIONES EXPERIMENTALES
    // -------------------------------------
    /**
     * Features experimentales de Cypress
     */
    experimentalStudio: false,          // Grabar tests interactivamente
    experimentalWebKitSupport: false,   // Safari (no estable aún)
    experimentalMemoryManagement: true, // Mejor manejo de memoria

    // -------------------------------------
    // NODE EVENTS (Plugins)
    // -------------------------------------
    setupNodeEvents(on, config) {
      /**
       * Hook para configurar plugins
       * - Configurar Mochawesome (reportes HTML)
       * - Configurar Coverage (cobertura de código)
       * - Integrar con otras herramientas
       */

      // Ejemplo: Log cuando un test falla
      on('task', {
        log(message) {
          console.log('🔴 TEST FAILURE:', message);
          return null;
        },
        
        // Task para limpiar base de datos antes de tests (OPCIONAL)
        resetDB() {
          // Aquí llamaría a un endpoint del backend
          // que resetea la DB a estado conocido
          console.log('🔄 Resetting database...');
          return null;
        }
      });

      // Retornar config modificado
      return config;
    },
  },

  // ========================================
  // CONFIGURACIÓN COMPONENT TESTING (OPCIONAL)
  // ========================================
  component: {
    devServer: {
      framework: 'react',
      bundler: 'vite',
    },
    specPattern: 'src/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: 'cypress/support/component.js'
  },
});
