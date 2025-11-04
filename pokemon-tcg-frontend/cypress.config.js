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
    //baseUrl: 'http://localhost:5173',
    baseUrl: 'http://localhost:4173',
    /**
     * Variables de entorno accesibles en tests
     * Uso: Cypress.env('apiUrl')
     */
    env: {
      // URL del Backend (Docker)
      apiUrl: 'http://web:8000',
      
      // Endpoints específicos (para no hardcodear en tests)
      endpoints: {
        login: 'http://localhost:4173/login/',
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
     * - 32 = buena calidad con menor tamaño
     */
    videoCompression: 32,

    /**
     * Grabar videos solo cuando tests fallan (ahorra espacio)
     * - true: Solo videos de tests fallidos
     * - false: Videos de todos los tests
     */
    videoUploadOnPasses: false,

    /**
     * Tomar screenshot automáticamente cuando un test falla
     */
    screenshotOnRunFailure: true,

    /**
     * Carpeta de screenshots
     */
    screenshotsFolder: 'cypress/screenshots',

    /**
     * Configuración de captura de pantalla
     */
    screenshotConfig: {
      capture: 'fullPage',  // Capturar página completa
      scale: false,         // No escalar (mejor calidad)
      disableTimersAndAnimations: true,  // Evitar animaciones en screenshots
      blackout: ['.sensitive-data'],     // Ocultar elementos sensibles
      clip: null,           // Capturar toda la pantalla
      padding: null         // Sin padding adicional
    },

    /**
     * Tiempo de retención de videos (en días)
     * - Los videos antiguos se pueden limpiar automáticamente
     */
    trashAssetsBeforeRuns: true,  // Limpiar assets anteriores antes de ejecutar

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
    // REPORTES (Mochawesome)
    // -------------------------------------
    /**
     * Reporter para generar reportes HTML profesionales
     */
    reporter: 'mochawesome',
    reporterOptions: {
      // Ubicación de reportes
      reportDir: 'cypress/reports/mochawesome',
      
      // Generar archivos JSON individuales (se combinan después)
      overwrite: false,
      html: false,
      json: true,
      
      // Incluir assets (screenshots, videos) en el reporte
      inlineAssets: true,
      
      // Configuración adicional
      reportTitle: 'Pokemon TCG - E2E Test Report',
      reportPageTitle: 'Cypress E2E Tests',
      embeddedScreenshots: true,
      showPassed: true,
      showFailed: true,
      showPending: true,
      showSkipped: false,
      code: true,
      autoOpen: false,
      timestamp: 'isoDateTime'
    },

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

      // Task personalizada para logging
      on('task', {
        log(message) {
          console.log('🔴 TEST FAILURE:', message);
          return null;
        },
        
        // Task para limpiar base de datos antes de tests
        resetDB() {
          console.log('🔄 Resetting database...');
          return null;
        },

        // Task para análisis de performance
        logPerformance(data) {
          console.log('📊 PERFORMANCE DATA:', JSON.stringify(data, null, 2));
          return null;
        }
      });

      // Configurar before:run para limpiar reportes anteriores
      on('before:run', async (details) => {
        console.log('🚀 Starting E2E Test Suite...');
        console.log(`📱 Browser: ${details.browser.name} ${details.browser.version}`);
        console.log(`📊 Specs to run: ${details.specs.length}`);
      });

      // Configurar after:run para generar reporte consolidado
      on('after:run', async (results) => {
        console.log('✅ E2E Tests completed!');
        console.log(`� Results: ${results.totalPassed}/${results.totalTests} passed`);
        
        if (results.totalFailed > 0) {
          console.log(`❌ Failed tests: ${results.totalFailed}`);
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
