# 📚 Guía 7: Configuración de Mochawesome en Proyectos Reales

## 🎯 Objetivos de Aprendizaje

Al completar esta guía serás capaz de:

1. **Implementar** Mochawesome en diferentes tipos de proyectos reales
2. **Configurar** setups específicos para Cypress, Jest, y Playwright
3. **Optimizar** configuraciones para diferentes environments (dev, staging, prod)
4. **Resolver** problemas comunes de implementación
5. **Adaptar** Mochawesome a requirements específicos de equipos
6. **Escalar** configuraciones para proyectos enterprise

---

## 📖 Conceptos Teóricos

### 🏗️ Patrones de Implementación por Tipo de Proyecto

#### **Taxonomía de Proyectos y Sus Needs:**

```
PROJECT TYPES & MOCHAWESOME PATTERNS:

🌐 FRONTEND APPLICATIONS
├── React/Vue/Angular SPA
│   ├── Focus: Component testing + E2E
│   ├── Tools: Cypress + Jest
│   └── Mochawesome: Visual regression, user flows
│
├── Static Sites (JAMstack)
│   ├── Focus: Build process + content
│   ├── Tools: Playwright + Vitest
│   └── Mochawesome: Cross-browser compatibility
│
└── Progressive Web Apps
    ├── Focus: Performance + offline functionality
    ├── Tools: Cypress + Lighthouse CI
    └── Mochawesome: Performance metrics integration

🔧 BACKEND APPLICATIONS  
├── REST APIs
│   ├── Focus: Endpoint testing + integration
│   ├── Tools: Mocha + Supertest
│   └── Mochawesome: API documentation reports
│
├── GraphQL APIs
│   ├── Focus: Schema + resolver testing
│   ├── Tools: Jest + Apollo Testing
│   └── Mochawesome: Query complexity analysis
│
└── Microservices
    ├── Focus: Service isolation + contracts
    ├── Tools: Multiple test runners
    └── Mochawesome: Service-specific + aggregated reports

🎯 FULL-STACK APPLICATIONS
├── E-commerce Platforms
│   ├── Focus: User journeys + payments
│   ├── Tools: Cypress + Jest + Playwright
│   └── Mochawesome: Customer flow visualization
│
├── SaaS Applications
│   ├── Focus: Feature testing + user management
│   ├── Tools: Multi-environment testing
│   └── Mochawesome: Feature adoption metrics
│
└── Enterprise Applications
    ├── Focus: Compliance + security + scale
    ├── Tools: Comprehensive test suites
    └── Mochawesome: Audit trails + executive reports
```

### 🎨 Configuration Patterns por Framework

#### **1. Cypress Projects Pattern**

```javascript
// Patrón estándar para proyectos Cypress
const cypressPattern = {
  // Basic setup
  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: 'cypress/reports/mochawesome',
    overwrite: false,
    html: true,
    json: true,
    timestamp: 'mmddyyyy_HHMMss'
  },
  
  // Environment-specific variations
  environments: {
    development: {
      autoOpen: true,
      charts: true,
      code: true,
      consoleReporter: 'spec'
    },
    
    staging: {
      autoOpen: false,
      charts: true,
      code: false,
      embeddedScreenshots: true
    },
    
    production: {
      autoOpen: false,
      charts: false,
      code: false,
      inline: true,
      quiet: true
    }
  }
};
```

#### **2. Jest Projects Pattern**

```javascript
// Pattern para proyectos que usan Jest + Cypress
const jestCypressPattern = {
  // Jest configuration
  jest: {
    testEnvironment: 'jsdom',
    reporters: [
      'default',
      ['jest-html-reporter', {
        pageTitle: 'Unit Test Report',
        outputPath: 'reports/jest/index.html',
        includeFailureMsg: true
      }]
    ]
  },
  
  // Cypress configuration
  cypress: {
    reporter: 'mochawesome',
    reporterOptions: {
      reportDir: 'reports/cypress',
      reportFilename: 'e2e-report'
    }
  },
  
  // Unified reporting script
  scripts: {
    'test:all': 'npm run test:unit && npm run test:e2e && npm run reports:merge'
  }
};
```

### 🌍 Environment-Specific Configurations

#### **Multi-Environment Strategy:**

```javascript
// config/mochawesome.config.js
class MochawesomeEnvironmentConfig {
  static getConfig(environment = 'development') {
    const baseConfig = {
      reporter: 'mochawesome',
      reporterOptions: {
        reportTitle: process.env.PROJECT_NAME || 'Test Results',
        reportPageTitle: `${environment.toUpperCase()} Test Report`,
        timestamp: 'isoDateTime',
        html: true,
        json: true
      }
    };
    
    const environmentConfigs = {
      development: {
        reportDir: 'reports/dev',
        autoOpen: true,
        charts: true,
        code: true,
        consoleReporter: 'spec',
        embeddedScreenshots: true,
        inlineAssets: false,
        overwrite: true
      },
      
      testing: {
        reportDir: 'reports/test',
        autoOpen: false,
        charts: true,
        code: false,
        consoleReporter: 'min',
        embeddedScreenshots: true,
        inlineAssets: true,
        overwrite: false
      },
      
      staging: {
        reportDir: 'reports/staging',
        autoOpen: false,
        charts: true,
        code: false,
        consoleReporter: 'json',
        embeddedScreenshots: true,
        inlineAssets: true,
        overwrite: false,
        reportFilename: '[status]_[datetime]-staging-report'
      },
      
      production: {
        reportDir: 'reports/prod',
        autoOpen: false,
        charts: false,
        code: false,
        consoleReporter: 'json',
        embeddedScreenshots: false,
        inlineAssets: true,
        overwrite: false,
        quiet: true,
        reportFilename: '[status]_[datetime]-prod-report'
      },
      
      ci: {
        reportDir: process.env.CI_REPORTS_DIR || 'reports/ci',
        autoOpen: false,
        charts: false,
        code: false,
        consoleReporter: 'json',
        embeddedScreenshots: false,
        inlineAssets: true,
        overwrite: true,
        quiet: true,
        reportFilename: 'ci-report-[datetime]'
      }
    };
    
    return {
      ...baseConfig,
      reporterOptions: {
        ...baseConfig.reporterOptions,
        ...environmentConfigs[environment]
      }
    };
  }
}

module.exports = MochawesomeEnvironmentConfig;
```

---

## 💻 Ejemplos Prácticos

### **Ejemplo 1: E-commerce Platform Setup**

```javascript
// cypress.config.js - E-commerce platform
const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    
    // Environment-based configuration
    ...require('./config/mochawesome.config').getConfig(process.env.NODE_ENV),
    
    // E-commerce specific reporter options
    reporterOptions: {
      reportDir: `reports/ecommerce/${process.env.NODE_ENV || 'dev'}`,
      reportTitle: 'E-commerce Platform Test Results',
      reportPageTitle: 'Shopping Cart & Checkout Tests',
      reportFilename: '[status]_[datetime]-ecommerce-tests',
      
      // E-commerce specific settings
      charts: true,
      code: false,
      embeddedScreenshots: true,
      inlineAssets: true,
      
      // Custom data for e-commerce context
      customData: {
        environment: process.env.NODE_ENV,
        paymentGateway: process.env.PAYMENT_GATEWAY || 'stripe',
        shippingProvider: process.env.SHIPPING_PROVIDER || 'fedex',
        testDataVersion: process.env.TEST_DATA_VERSION || '1.0'
      }
    },
    
    // E-commerce specific test settings
    viewportWidth: 1280,
    viewportHeight: 720,
    video: true,
    videoCompression: 32,
    screenshotOnRunFailure: true,
    
    // Test patterns for e-commerce
    specPattern: [
      'cypress/e2e/user-authentication/**/*.cy.js',
      'cypress/e2e/product-catalog/**/*.cy.js',
      'cypress/e2e/shopping-cart/**/*.cy.js',
      'cypress/e2e/checkout-process/**/*.cy.js',
      'cypress/e2e/payment-processing/**/*.cy.js',
      'cypress/e2e/order-management/**/*.cy.js'
    ],
    
    setupNodeEvents(on, config) {
      // E-commerce specific post-processing
      on('after:run', (results) => {
        // Calculate business metrics
        const businessMetrics = calculateEcommerceMetrics(results);
        
        // Generate business-focused report
        generateBusinessReport(results, businessMetrics);
        
        // Send alerts for critical failures
        if (hasCriticalFailures(results)) {
          sendCriticalAlert(results);
        }
      });
      
      // Custom tasks for e-commerce testing
      on('task', {
        // Database seeding for test data
        seedTestData: async (scenario) => {
          return await seedEcommerceData(scenario);
        },
        
        // Payment gateway test setup
        setupPaymentMocks: async (provider) => {
          return await setupPaymentProvider(provider);
        },
        
        // Inventory management for tests
        resetInventory: async () => {
          return await resetTestInventory();
        }
      });
    }
  }
});

// Helper functions for e-commerce testing
function calculateEcommerceMetrics(results) {
  const tests = results.runs.flatMap(run => run.tests);
  
  return {
    userJourneySuccess: calculateUserJourneyMetrics(tests),
    checkoutFunnelAnalysis: analyzeCheckoutFunnel(tests),
    paymentGatewayReliability: analyzePaymentTests(tests),
    performanceMetrics: calculatePerformanceMetrics(tests)
  };
}

function generateBusinessReport(results, metrics) {
  const businessReport = {
    executionSummary: {
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV,
      totalRevenuePaths: metrics.userJourneySuccess.revenuePaths,
      criticalUserFlows: metrics.checkoutFunnelAnalysis.criticalFlows
    },
    
    businessImpact: {
      checkoutSuccess: metrics.checkoutFunnelAnalysis.successRate,
      paymentReliability: metrics.paymentGatewayReliability.successRate,
      averageCheckoutTime: metrics.performanceMetrics.checkoutDuration,
      mobileResponsiveness: metrics.performanceMetrics.mobileScore
    },
    
    riskAssessment: {
      criticalFailures: results.totalFailed,
      affectedUserFlows: identifyAffectedFlows(results),
      businessRisk: calculateBusinessRisk(results, metrics)
    }
  };
  
  // Save business report
  require('fs').writeFileSync(
    'reports/business-impact-report.json',
    JSON.stringify(businessReport, null, 2)
  );
}
```

### **Ejemplo 2: SaaS Application Multi-Tenant Setup**

```javascript
// cypress.config.js - SaaS Multi-tenant setup
const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    // Multi-tenant base URLs
    baseUrl: process.env.TENANT_BASE_URL || 'http://localhost:3000',
    
    // SaaS-specific Mochawesome configuration
    reporter: 'mochawesome',
    reporterOptions: {
      reportDir: `reports/saas/${process.env.TENANT_ID || 'default'}`,
      reportTitle: `SaaS Platform Tests - ${process.env.TENANT_NAME || 'Default Tenant'}`,
      reportPageTitle: 'Multi-Tenant SaaS Test Results',
      reportFilename: '[status]_[datetime]-tenant-[TENANT_ID]-report',
      
      // SaaS specific configuration
      charts: true,
      code: false,
      embeddedScreenshots: true,
      inlineAssets: true,
      
      // Custom tenant data
      customData: {
        tenantId: process.env.TENANT_ID,
        tenantName: process.env.TENANT_NAME,
        subscriptionTier: process.env.SUBSCRIPTION_TIER || 'free',
        featureFlags: JSON.parse(process.env.FEATURE_FLAGS || '{}'),
        testSuite: process.env.TEST_SUITE || 'full'
      }
    },
    
    // Environment variables for multi-tenancy
    env: {
      tenantId: process.env.TENANT_ID,
      apiEndpoint: process.env.API_ENDPOINT,
      authDomain: process.env.AUTH_DOMAIN,
      subscriptionTier: process.env.SUBSCRIPTION_TIER
    },
    
    setupNodeEvents(on, config) {
      // Multi-tenant test configuration
      on('before:run', (details) => {
        console.log(`🏢 Testing tenant: ${process.env.TENANT_NAME}`);
        console.log(`📋 Subscription tier: ${process.env.SUBSCRIPTION_TIER}`);
        console.log(`🎯 Test suite: ${process.env.TEST_SUITE}`);
      });
      
      on('after:run', (results) => {
        // Tenant-specific reporting
        generateTenantReport(results);
        
        // Aggregate cross-tenant metrics
        updateCrossTenantMetrics(results);
        
        // Feature usage analytics
        trackFeatureUsage(results);
      });
      
      // Tenant-specific tasks
      on('task', {
        // Tenant data setup
        setupTenantData: async (tenantConfig) => {
          return await initializeTenantData(tenantConfig);
        },
        
        // Feature flag testing
        toggleFeatureFlag: async (feature, enabled) => {
          return await updateFeatureFlag(feature, enabled);
        },
        
        // Subscription tier simulation
        setSubscriptionTier: async (tier) => {
          return await simulateSubscriptionTier(tier);
        }
      });
    }
  }
});

// Multi-tenant reporting utilities
function generateTenantReport(results) {
  const tenantMetrics = {
    tenant: {
      id: process.env.TENANT_ID,
      name: process.env.TENANT_NAME,
      tier: process.env.SUBSCRIPTION_TIER
    },
    
    testResults: {
      total: results.totalTests,
      passed: results.totalPassed,
      failed: results.totalFailed,
      duration: results.totalDuration
    },
    
    featureAnalysis: analyzeFeatureUsage(results),
    performanceByTier: analyzePerformanceByTier(results),
    subscriptionLimits: validateSubscriptionLimits(results)
  };
  
  // Save tenant-specific report
  const reportPath = `reports/tenants/${process.env.TENANT_ID}-metrics.json`;
  require('fs').writeFileSync(reportPath, JSON.stringify(tenantMetrics, null, 2));
}

function updateCrossTenantMetrics(results) {
  // Aggregate data across all tenants
  const aggregateFile = 'reports/cross-tenant-metrics.json';
  let aggregateData = {};
  
  try {
    aggregateData = JSON.parse(require('fs').readFileSync(aggregateFile, 'utf8'));
  } catch (error) {
    aggregateData = { tenants: {}, summary: {} };
  }
  
  // Update tenant data
  aggregateData.tenants[process.env.TENANT_ID] = {
    lastRun: new Date().toISOString(),
    passRate: (results.totalPassed / results.totalTests) * 100,
    subscriptionTier: process.env.SUBSCRIPTION_TIER,
    featureFlags: JSON.parse(process.env.FEATURE_FLAGS || '{}')
  };
  
  // Update summary
  const allTenants = Object.values(aggregateData.tenants);
  aggregateData.summary = {
    totalTenants: allTenants.length,
    averagePassRate: allTenants.reduce((sum, t) => sum + t.passRate, 0) / allTenants.length,
    tierDistribution: calculateTierDistribution(allTenants),
    lastUpdated: new Date().toISOString()
  };
  
  require('fs').writeFileSync(aggregateFile, JSON.stringify(aggregateData, null, 2));
}
```

### **Ejemplo 3: Microservices Architecture Setup**

```javascript
// config/microservices-mochawesome.js
class MicroservicesMochawesomeConfig {
  constructor(serviceName, servicePort) {
    this.serviceName = serviceName;
    this.servicePort = servicePort;
    this.baseConfig = this.createBaseConfig();
  }
  
  createBaseConfig() {
    return {
      reporter: 'mochawesome',
      reporterOptions: {
        reportDir: `reports/services/${this.serviceName}`,
        reportTitle: `${this.serviceName} Service Tests`,
        reportPageTitle: `Microservice: ${this.serviceName}`,
        reportFilename: `[status]_[datetime]-${this.serviceName}-service`,
        
        // Microservices-specific settings
        charts: true,
        code: false,
        embeddedScreenshots: true,
        inlineAssets: true,
        
        // Service metadata
        customData: {
          serviceName: this.serviceName,
          servicePort: this.servicePort,
          serviceVersion: process.env.SERVICE_VERSION || '1.0.0',
          buildNumber: process.env.BUILD_NUMBER || 'local',
          deploymentEnvironment: process.env.DEPLOYMENT_ENV || 'development'
        }
      }
    };
  }
  
  // Configuration for different service types
  getAPIServiceConfig() {
    return {
      ...this.baseConfig,
      reporterOptions: {
        ...this.baseConfig.reporterOptions,
        reportTitle: `${this.serviceName} API Tests`,
        customData: {
          ...this.baseConfig.reporterOptions.customData,
          serviceType: 'api',
          endpoints: this.getServiceEndpoints(),
          dependencies: this.getServiceDependencies()
        }
      }
    };
  }
  
  getUIServiceConfig() {
    return {
      ...this.baseConfig,
      reporterOptions: {
        ...this.baseConfig.reporterOptions,
        reportTitle: `${this.serviceName} UI Tests`,
        embeddedScreenshots: true,
        video: true,
        customData: {
          ...this.baseConfig.reporterOptions.customData,
          serviceType: 'ui',
          browserSupport: ['chrome', 'firefox', 'safari'],
          viewports: ['desktop', 'tablet', 'mobile']
        }
      }
    };
  }
  
  getDatabaseServiceConfig() {
    return {
      ...this.baseConfig,
      reporterOptions: {
        ...this.baseConfig.reporterOptions,
        reportTitle: `${this.serviceName} Database Tests`,
        charts: false, // Database tests usually don't need charts
        customData: {
          ...this.baseConfig.reporterOptions.customData,
          serviceType: 'database',
          databaseType: process.env.DB_TYPE || 'postgresql',
          migrations: this.getMigrationInfo()
        }
      }
    };
  }
  
  getServiceEndpoints() {
    // Return service-specific endpoints
    return [
      `http://localhost:${this.servicePort}/health`,
      `http://localhost:${this.servicePort}/api/v1`,
      `http://localhost:${this.servicePort}/metrics`
    ];
  }
  
  getServiceDependencies() {
    // Return service dependencies
    return {
      internal: process.env.INTERNAL_DEPENDENCIES?.split(',') || [],
      external: process.env.EXTERNAL_DEPENDENCIES?.split(',') || []
    };
  }
  
  getMigrationInfo() {
    return {
      currentVersion: process.env.DB_MIGRATION_VERSION || '001',
      pendingMigrations: process.env.PENDING_MIGRATIONS?.split(',') || []
    };
  }
}

// Service-specific configurations
const configs = {
  userService: new MicroservicesMochawesomeConfig('user-service', 3001).getAPIServiceConfig(),
  orderService: new MicroservicesMochawesomeConfig('order-service', 3002).getAPIServiceConfig(),
  paymentService: new MicroservicesMochawesomeConfig('payment-service', 3003).getAPIServiceConfig(),
  uiGateway: new MicroservicesMochawesomeConfig('ui-gateway', 3000).getUIServiceConfig(),
  database: new MicroservicesMochawesomeConfig('postgres', 5432).getDatabaseServiceConfig()
};

module.exports = configs;
```

### **Ejemplo 4: Pokemon TCG Project - Production Configuration**

```javascript
// cypress.config.js - Pokemon TCG optimizado para production
const { defineConfig } = require('cypress');
const MochawesomeEnvironmentConfig = require('./config/mochawesome.config');

module.exports = defineConfig({
  e2e: {
    // Dynamic base URL based on environment
    baseUrl: process.env.CYPRESS_baseUrl || 'http://localhost:3000',
    
    // Environment-specific Mochawesome configuration
    ...MochawesomeEnvironmentConfig.getConfig(process.env.NODE_ENV || 'development'),
    
    // Pokemon TCG specific reporter customization
    reporterOptions: {
      // Override with Pokemon TCG specific settings
      reportTitle: 'Pokemon TCG Collection Manager - E2E Tests',
      reportPageTitle: `Pokemon TCG Tests - ${process.env.NODE_ENV?.toUpperCase() || 'DEV'}`,
      reportFilename: '[status]_[datetime]-pokemon-tcg-e2e',
      
      // Pokemon TCG branding
      customData: {
        project: 'Pokemon TCG Collection Manager',
        version: process.env.APP_VERSION || '1.0.0',
        environment: process.env.NODE_ENV || 'development',
        pokemonApiVersion: process.env.POKEMON_API_VERSION || 'v2',
        testDataset: process.env.TEST_DATASET || 'base1',
        
        // Business context
        features: {
          cardCollection: true,
          favorites: true,
          filtering: true,
          authentication: true,
          responsive: true
        },
        
        // Technical context
        backend: {
          framework: 'Django',
          database: 'PostgreSQL',
          api: 'Pokemon TCG API'
        },
        frontend: {
          framework: 'React',
          bundler: 'Vite',
          styling: 'CSS Modules'
        }
      }
    },
    
    // Pokemon TCG specific test settings
    viewportWidth: 1280,
    viewportHeight: 720,
    video: process.env.NODE_ENV !== 'production',
    screenshotOnRunFailure: true,
    
    // Test organization for Pokemon TCG
    specPattern: [
      'cypress/e2e/authentication/**/*.cy.js',
      'cypress/e2e/card-collection/**/*.cy.js',
      'cypress/e2e/favorites/**/*.cy.js',
      'cypress/e2e/filtering/**/*.cy.js',
      'cypress/e2e/responsive/**/*.cy.js'
    ],
    
    setupNodeEvents(on, config) {
      // Pokemon TCG specific post-processing
      on('after:run', (results) => {
        console.log('\n🎮 Pokemon TCG E2E Test Summary:');
        console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
        console.log(`Tests: ${results.totalTests}`);
        console.log(`Passed: ${results.totalPassed}`);
        console.log(`Failed: ${results.totalFailed}`);
        console.log(`Duration: ${(results.totalDuration / 1000).toFixed(2)}s`);
        
        // Generate Pokemon TCG specific metrics
        generatePokemonTCGMetrics(results);
        
        // Handle notifications based on environment
        if (process.env.NODE_ENV === 'production' && results.totalFailed > 0) {
          sendProductionAlert(results);
        }
        
        // Archive reports for compliance
        if (process.env.ARCHIVE_REPORTS === 'true') {
          archiveTestReports(results);
        }
      });
      
      // Pokemon TCG specific tasks
      on('task', {
        // Database operations
        resetTestDatabase: async () => {
          console.log('🗄️ Resetting test database...');
          // Implementation for database reset
          return null;
        },
        
        // Pokemon data seeding
        seedPokemonData: async (expansion) => {
          console.log(`🃏 Seeding Pokemon data for expansion: ${expansion}`);
          // Implementation for seeding Pokemon card data
          return null;
        },
        
        // Performance monitoring
        trackPerformance: async (metrics) => {
          console.log('📊 Tracking performance metrics...');
          // Implementation for performance tracking
          return null;
        }
      });
    }
  }
});

// Pokemon TCG specific helper functions
function generatePokemonTCGMetrics(results) {
  const pokemonMetrics = {
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    
    testCoverage: {
      authentication: calculateFeatureCoverage(results, 'authentication'),
      cardCollection: calculateFeatureCoverage(results, 'card-collection'),
      favorites: calculateFeatureCoverage(results, 'favorites'),
      filtering: calculateFeatureCoverage(results, 'filtering'),
      responsive: calculateFeatureCoverage(results, 'responsive')
    },
    
    userJourneys: {
      completeRegistration: analyzeUserJourney(results, 'registration'),
      addToFavorites: analyzeUserJourney(results, 'favorites'),
      searchAndFilter: analyzeUserJourney(results, 'search-filter')
    },
    
    performance: {
      averagePageLoad: calculateAveragePageLoad(results),
      slowestOperations: findSlowestOperations(results),
      mobilePerformance: analyzeMobilePerformance(results)
    },
    
    businessMetrics: {
      criticalUserFlows: identifyCriticalFlows(results),
      featureAdoption: calculateFeatureAdoption(results),
      userEngagement: analyzeUserEngagement(results)
    }
  };
  
  // Save Pokemon TCG specific metrics
  const metricsPath = `reports/pokemon-tcg-metrics-${process.env.NODE_ENV || 'dev'}.json`;
  require('fs').writeFileSync(metricsPath, JSON.stringify(pokemonMetrics, null, 2));
  
  console.log(`📋 Pokemon TCG metrics saved: ${metricsPath}`);
}

function calculateFeatureCoverage(results, feature) {
  const featureTests = results.runs.flatMap(run => 
    run.tests.filter(test => 
      test.title.some(title => title.toLowerCase().includes(feature))
    )
  );
  
  return {
    total: featureTests.length,
    passed: featureTests.filter(test => test.state === 'passed').length,
    failed: featureTests.filter(test => test.state === 'failed').length,
    coverage: featureTests.length > 0 ? 
      (featureTests.filter(test => test.state === 'passed').length / featureTests.length) * 100 : 0
  };
}

function sendProductionAlert(results) {
  // Implementation for production alerts
  console.log('🚨 Sending production alert for failed tests...');
  
  const alertData = {
    environment: 'production',
    failedTests: results.totalFailed,
    criticalFailures: identifyCriticalFailures(results),
    timestamp: new Date().toISOString()
  };
  
  // Send to monitoring system (Slack, PagerDuty, etc.)
  // Implementation depends on your alerting system
}

function archiveTestReports(results) {
  // Implementation for archiving reports
  console.log('📦 Archiving test reports for compliance...');
  
  const archiveData = {
    timestamp: new Date().toISOString(),
    testResults: results,
    environment: process.env.NODE_ENV,
    compliance: {
      retention: '7 years',
      purpose: 'Quality assurance audit trail',
      dataClassification: 'internal'
    }
  };
  
  // Save to long-term storage
  const archivePath = `archives/${new Date().getFullYear()}/${Date.now()}-test-archive.json`;
  require('fs').mkdirSync(require('path').dirname(archivePath), { recursive: true });
  require('fs').writeFileSync(archivePath, JSON.stringify(archiveData, null, 2));
}

module.exports = { generatePokemonTCGMetrics, sendProductionAlert, archiveTestReports };
```

---

## 🔧 Hands-on Exercises

### **Ejercicio 1: Multi-Environment Setup**

Configura Mochawesome para un proyecto que debe ejecutarse en 4 environments:

**Requirements:**
- **Development:** Reports detailed con code, charts, auto-open
- **Testing:** Reports visuales pero no auto-open
- **Staging:** Reports minimal para CI, embedded assets
- **Production:** Reports ultra-minimal, compliance-ready

```javascript
// Tu configuración multi-environment
class ProjectMochawesomeConfig {
  static getConfig(env) {
    // Tu implementación aquí...
  }
}
```

### **Ejercicio 2: Custom Business Metrics**

Implementa custom metrics para un proyecto SaaS:

**Metrics needed:**
- Feature adoption rate por test
- User journey completion rate
- Performance impact por feature
- Subscription tier testing coverage

```javascript
function generateSaaSMetrics(results) {
  // Tu implementación aquí...
}
```

### **Ejercicio 3: Microservices Aggregation**

Diseña un sistema que:
- Genere reports individuales por microservice
- Aggregate results en un dashboard unificado  
- Track dependencies entre services
- Generate service health scores

```javascript
class MicroservicesReportAggregator {
  constructor(services) {
    // Tu implementación aquí...
  }
  
  aggregateReports() {
    // Tu lógica de agregación...
  }
}
```

---

## ❓ Preguntas de Entrevista

### **Nivel Junior:**

1. **¿Cómo configurarías Mochawesome diferente para development vs production?**
   - **Respuesta esperada:** Development con más detalles (code, charts), production minimal y optimizado.

2. **¿Qué problemas comunes has encontrado al configurar Mochawesome?**
   - **Respuesta esperada:** Performance con many tests, asset size, memory usage, CI/CD integration.

3. **¿Cómo organizarías reports para un proyecto con múltiples test suites?**
   - **Respuesta esperada:** Separate directories, naming conventions, merge strategies.

### **Nivel Mid:**

4. **¿Cómo implementarías environment-specific Mochawesome configuration?**
   - **Respuesta esperada:** Config objects por environment, environment variables, conditional settings.

5. **¿Qué estrategia usarías para large test suites que generan huge reports?**
   - **Respuesta esperada:** Asset optimization, report splitting, lazy loading, CDN distribution.

6. **¿Cómo integrarías business metrics en Mochawesome reports?**
   - **Respuesta esperada:** Custom data injection, post-processing scripts, business-focused summaries.

### **Nivel Senior:**

7. **¿Cómo diseñarías Mochawesome configuration para microservices architecture?**
   - **Respuesta esperada:** Service-specific configs, aggregation strategies, dependency tracking, health monitoring.

8. **¿Qué considerations tendrías para compliance y audit requirements?**
   - **Respuesta esperada:** Data retention, archival systems, audit trails, access controls, data classification.

9. **¿Cómo optimizarías Mochawesome para CI/CD at enterprise scale?**
   - **Respuesta esperada:** Performance optimization, parallel execution, artifact management, notification systems.

---

## 📈 Métricas de Éxito

### **Configuration Mastery:**
- [ ] Puedes configurar Mochawesome para 5+ different project types
- [ ] Implementas environment-specific configurations
- [ ] Optimizas settings para performance y usability

### **Integration Skills:**
- [ ] Integras Mochawesome con multiple test frameworks
- [ ] Configuras CI/CD pipelines con proper reporting
- [ ] Implementas custom post-processing workflows

### **Enterprise Readiness:**
- [ ] Diseñas scalable reporting architectures
- [ ] Handles compliance y security requirements  
- [ ] Optimizas para large-scale enterprise deployments

---

## 🔗 Referencias Adicionales

### **Configuration Examples:**
- 🔧 [Cypress + Mochawesome Best Practices](https://github.com/adamgruber/mochawesome#usage-with-cypress)
- 🔧 [Multi-Environment Configurations](https://docs.cypress.io/guides/guides/environment-variables)
- 🔧 [Enterprise Setup Patterns](https://testautomationu.applitools.com/cypress-tutorial/)

### **Performance Optimization:**
- ⚡ [Large Test Suite Optimization](https://github.com/adamgruber/mochawesome/wiki/Performance-Tips)
- ⚡ [Asset Management Strategies](https://docs.cypress.io/guides/guides/screenshots-and-videos)
- ⚡ [Memory Usage Optimization](https://github.com/cypress-io/cypress/issues/6420)

### **Integration Guides:**
- 🔗 [CI/CD Integration Patterns](https://docs.cypress.io/guides/continuous-integration/introduction)
- 🔗 [Docker Integration](https://docs.cypress.io/examples/examples/docker)
- 🔗 [Cloud Platform Setup](https://docs.cypress.io/guides/cloud/introduction)

### **Advanced Topics:**
- 🎯 [Custom Metrics Implementation](https://github.com/cypress-io/cypress/tree/develop/npm/cypress-schematic)
- 🎯 [Business Intelligence Integration](https://www.cypress.io/blog/2021/04/06/cypress-github-actions-testing/)
- 🎯 [Compliance and Audit Patterns](https://docs.cypress.io/guides/references/best-practices)

---

## ➡️ Conexión al Siguiente Tema

**¡Excelente progreso en Nivel 3!**

Has dominado la **implementación práctica** de Mochawesome en different project types. Ahora es momento de ir más profundo en **customization**.

**🎯 Próximo tema: "Personalización de Reportes"**

Aprenderás:
- Custom themes y branding avanzado
- Template customization y extensibility
- Advanced asset management
- Interactive features development
- Plugin development para Mochawesome

**Pre-requisitos PERFECTAMENTE cumplidos:** ✅
- Dominas configuration para multiple project types
- Entiendes environment-specific setups
- Puedes integrate con diferentes frameworks
- Tienes experience con real-world implementations

**🔗 Perfect Flow:**
Configuration Mastery → Customization Expertise → Advanced Workflows
        ↑                        ↑                       ↑
   (Punto 7)               (Punto 8)              (Punto 9)

---

## 📝 Checklist de Completitud

**Antes de pasar al siguiente tema, asegúrate de:**

- [ ] Poder configurar Mochawesome para 3+ different project types
- [ ] Implementar environment-specific configurations
- [ ] Integrar con at least 2 different test frameworks
- [ ] Optimizar settings para performance
- [ ] Troubleshoot common configuration issues
- [ ] Haber completado al least 2 de los 3 exercises prácticos
- [ ] Poder responder al menos 7 de las 9 preguntas de entrevista

**¡Ready para advanced customization! 🎨**

---

*Has dominado la implementation práctica. Ahora viene la parte creativa: hacer que Mochawesome se vea y se comporte exactly como tu project needs.*