# 📚 Guía 6: Mochawesome - Reporter HTML Avanzado

## 🎯 Objetivos de Aprendizaje

Al completar esta guía serás capaz de:

1. **Explicar** qué es Mochawesome y por qué se convirtió en el HTML reporter más popular
2. **Instalar y configurar** Mochawesome desde cero en diferentes proyectos
3. **Dominar** todas las opciones de configuración y customización
4. **Integrar** Mochawesome con Cypress, Mocha y otros test runners
5. **Troubleshoot** problemas comunes y optimizar performance
6. **Implementar** workflows avanzados con mochawesome-merge

---

## 📖 Conceptos Teóricos

### 🏆 ¿Qué es Mochawesome?

#### **Definición Oficial:**
> **Mochawesome** es un custom reporter para Mocha que genera beautiful HTML/CSS reports con soporte para screenshots, videos, y navegación interactiva.

#### **Historia y Evolución:**
```
Mochawesome Timeline:
2016 ├── Creado por Adam Gruber
     ├── Problem: Mocha's built-in HTML reporter era básico
     ├── Solution: Beautiful, modern HTML reports
     │
2017 ├── Cypress adoption begins
     ├── Screenshot integration
     ├── Community growth
     │
2018 ├── mochawesome-merge released
     ├── Video support added
     ├── Major version 3.0
     │
2019 ├── React component rewrite
     ├── Performance improvements
     ├── Advanced filtering
     │
2020 ├── Dark mode support
     ├── Better mobile experience
     ├── Custom themes
     │
2021 ├── TypeScript support
     ├── Better CI/CD integration
     ├── Advanced analytics
     │
2022 ├── Performance optimization
     ├── Large test suite support
     ├── Memory improvements
     │
2023 ├── Modern browser features
     ├── Accessibility improvements
     ├── Better error handling
     │
2024 ├── AI-powered insights (experimental)
     └── Enhanced security features
```

### 🎨 ¿Por Qué Mochawesome se Volvió Tan Popular?

#### **1. Visual Excellence**
```css
/* El secret sauce: Beautiful, modern design */
.mochawesome-report {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #333;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

/* Responsive design out of the box */
@media (max-width: 768px) {
  .test-results { 
    flex-direction: column; 
  }
}
```

**Visual Features:**
- 🎨 **Modern Material Design** - Professional appearance
- 📱 **Responsive Layout** - Works en mobile/tablet
- 🌙 **Dark Mode Support** - Eye-friendly para late night debugging
- 🎯 **Interactive Navigation** - Collapsible suites, filtering
- 📊 **Rich Charts** - Visual representation de metrics

#### **2. Multimedia Integration**
```javascript
// Automatic screenshot capture on failures
cy.on('fail', (err, runnable) => {
  Cypress.runner.stop();
  throw err;
}); // Mochawesome captures this automatically

// Video recording integration
{
  video: true,
  videosFolder: 'cypress/videos',
  videoCompression: 32
}
```

#### **3. Developer Experience**
- ⚡ **Zero Configuration** - Works out of the box
- 🔍 **Deep Linking** - Direct URLs to specific tests
- 🔎 **Search Functionality** - Find tests instantly
- 📋 **Copy-Paste Friendly** - Error messages y stack traces
- 🏷️ **Tagging System** - Organize tests by category

### 🏗️ Arquitectura de Mochawesome

#### **Component Architecture:**
```
┌─────────────────────────────────────────┐
│           MOCHAWESOME SYSTEM            │
├─────────────────────────────────────────┤
│  📊 Data Collection Layer               │
│  ├── Mocha Event Listeners              │
│  ├── Test Results Aggregation           │
│  ├── Error Information Capture          │
│  └── Performance Metrics Collection     │
├─────────────────────────────────────────┤
│  🎨 Processing Layer                    │
│  ├── Data Transformation                │
│  ├── Asset Organization                 │
│  ├── Template Preparation               │
│  └── Chart Data Generation              │
├─────────────────────────────────────────┤
│  📝 Output Generation                   │
│  ├── HTML Report Generation             │
│  ├── JSON Data Export                   │
│  ├── Asset Copying (CSS, JS, Images)    │
│  └── File Structure Creation            │
├─────────────────────────────────────────┤
│  🔧 Configuration System                │
│  ├── Reporter Options Processing        │
│  ├── Theme Management                   │
│  ├── Custom Templates                   │
│  └── Plugin Integration                 │
└─────────────────────────────────────────┘
```

#### **Data Flow:**
```javascript
// Simplified data flow
Mocha Test Execution
├── Event: 'start' → Mochawesome initializes
├── Event: 'suite' → Suite tracking begins
├── Event: 'test' → Test execution starts
├── Event: 'pass' → Success data captured
├── Event: 'fail' → Failure + screenshot + stack trace
├── Event: 'pending' → Skipped test noted
└── Event: 'end' → Final report generation

// Output structure
{
  stats: { /* test statistics */ },
  suites: [/* test suites with hierarchy */],
  tests: [/* individual test results */],
  pending: [/* skipped tests */],
  failures: [/* failed tests with details */],
  passes: [/* successful tests */]
}
```

### ⚙️ Configuración Completa de Mochawesome

#### **1. Instalación Base**
```bash
# Core mochawesome packages
npm install --save-dev mochawesome

# For merge functionality (multiple JSON files)
npm install --save-dev mochawesome-merge

# For generating HTML from merged JSON
npm install --save-dev marge

# Optional: For advanced customization
npm install --save-dev mochawesome-report-generator
```

#### **2. Configuración para Mocha Standalone**
```javascript
// .mocharc.json
{
  "reporter": "mochawesome",
  "reporterOptions": {
    // Output configuration
    "reportDir": "mochawesome-reports",
    "reportFilename": "[status]_[datetime]-[name]-report",
    "reportTitle": "Pokemon TCG API Tests",
    "reportPageTitle": "Test Results",
    
    // Content options
    "inline": false,
    "charts": true,
    "code": false,
    "autoOpen": false,
    "overwrite": true,
    "timestamp": "isoDateTime",
    
    // Visual customization
    "showPassed": true,
    "showFailed": true,
    "showPending": true,
    "showSkipped": false,
    "showHooks": "failed",
    
    // Performance
    "useInlineDiffs": false,
    "quiet": false,
    "consoleReporter": "spec"
  }
}

// package.json scripts
{
  "scripts": {
    "test": "mocha",
    "test:report": "mocha --reporter mochawesome",
    "test:merge": "mochawesome-merge 'mochawesome-reports/*.json' > merged-report.json",
    "test:generate": "marge merged-report.json --reportDir merged-reports"
  }
}
```

#### **3. Configuración para Cypress (Como tu Proyecto)**
```javascript
// cypress.config.js - Configuración actual de tu proyecto
const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    
    // Mochawesome configuration
    reporter: 'mochawesome',
    reporterOptions: {
      // Exactly como en tu proyecto
      reportDir: 'cypress/reports',
      overwrite: false,
      html: true,
      json: true,
      timestamp: 'mmddyyyy_HHMMss',
      reportFilename: '[status]_[datetime]-[name]-report',
      
      // Visual enhancements
      charts: true,
      reportPageTitle: 'Pokemon TCG E2E Tests',
      embeddedScreenshots: true,
      inlineAssets: true,
      
      // Code display
      code: false,
      
      // Performance
      autoOpen: false,
      overwrite: false
    },
    
    // Screenshot and video settings (complementa Mochawesome)
    screenshotOnRunFailure: true,
    screenshotsFolder: 'cypress/screenshots',
    video: true,
    videosFolder: 'cypress/videos',
    videoCompression: 32,
    
    setupNodeEvents(on, config) {
      // Optional: Custom processing
      on('after:run', (results) => {
        // Custom post-processing logic
        console.log('Tests completed:', results.totalTests);
      });
    }
  }
});
```

### 🎛️ Opciones de Configuración Avanzadas

#### **Configuración Completa con Todas las Opciones:**
```javascript
const mochawesomeConfig = {
  // === OUTPUT CONFIGURATION ===
  reportDir: 'reports/mochawesome',           // Output directory
  reportFilename: 'report-[datetime]',        // Filename pattern
  reportTitle: 'Test Results',                // Report title
  reportPageTitle: 'Mochawesome Report',     // Browser tab title
  
  // === CONTENT CONTROL ===
  inline: false,              // Inline CSS/JS vs separate files
  charts: true,               // Include charts and graphs
  code: true,                 // Show test code in report
  autoOpen: false,            // Auto-open report after generation
  overwrite: true,            // Overwrite existing reports
  
  // === VISUAL CUSTOMIZATION ===
  showPassed: true,           // Show passed tests
  showFailed: true,           // Show failed tests  
  showPending: true,          // Show pending/skipped tests
  showSkipped: false,         // Show skipped tests (different from pending)
  showHooks: 'failed',        // Show hooks: 'always', 'never', 'failed'
  
  // === TIMESTAMP & NAMING ===
  timestamp: 'isoDateTime',   // Timestamp format
  // Options: 'isoDateTime', 'epochTime', 'mmddyyyy_HHMMss'
  
  // === DIFF CONFIGURATION ===
  useInlineDiffs: false,      // Inline vs side-by-side diffs
  diff: true,                 // Show diffs for assertions
  
  // === PERFORMANCE ===
  quiet: false,               // Suppress console output
  consoleReporter: 'spec',    // Console reporter to use alongside
  
  // === ASSETS ===
  embeddedScreenshots: true,  // Embed screenshots in HTML
  inlineAssets: false,        // Inline all assets (CSS, JS, images)
  
  // === ADVANCED ===
  saveJson: true,             // Save JSON file alongside HTML
  saveHtml: true,             // Save HTML file
  
  // === CUSTOM THEMING ===
  theme: 'dark',              // 'light', 'dark', or custom CSS path
  topLevel: false,            // Flatten test hierarchy
  
  // === FILTERING ===
  includeScreenshots: true,   // Include screenshots in report
  screenshotOnFailure: true,  // Auto-screenshot on test failure
  
  // === JSON OUTPUT CONTROL ===
  json: true,                 // Generate JSON output
  jsonFile: 'results.json',   // JSON filename
  
  // === HTML OUTPUT CONTROL ===
  html: true,                 // Generate HTML output
  htmlFile: 'report.html'     // HTML filename
};
```

---

## 💻 Ejemplos Prácticos

### **Ejemplo 1: Setup Completo para Pokemon TCG Project**

```javascript
// cypress.config.js - Configuración optimizada para tu proyecto
const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    
    // Optimized Mochawesome setup
    reporter: 'mochawesome',
    reporterOptions: {
      // Organization
      reportDir: 'cypress/reports/mochawesome',
      reportFilename: '[status]_[datetime]-pokemon-tcg-e2e',
      reportTitle: 'Pokemon TCG Collection Manager - E2E Tests',
      reportPageTitle: 'Pokemon TCG Test Results',
      
      // Visual enhancement
      charts: true,
      code: false,  // Hide test code for cleaner reports
      embeddedScreenshots: true,
      inlineAssets: true,  // Self-contained HTML files
      
      // Content control
      showPassed: true,
      showFailed: true,
      showPending: true,
      showHooks: 'failed',
      
      // Performance
      overwrite: false,  // Keep history of test runs
      timestamp: 'mmddyyyy_HHMMss',
      
      // Output formats
      html: true,
      json: true,  // For merging multiple runs
      
      // Theme
      theme: 'dark'  // Better for screenshots with dark backgrounds
    },
    
    // Cypress settings that enhance Mochawesome
    screenshotOnRunFailure: true,
    screenshotsFolder: 'cypress/screenshots',
    video: true,
    videosFolder: 'cypress/videos',
    videoCompression: 32,
    
    // Test file patterns
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    
    // Environment variables
    env: {
      apiUrl: 'http://localhost:8000/api',
      testUser: 'test@pokemontcg.com'
    },
    
    setupNodeEvents(on, config) {
      // Enhanced post-processing
      on('after:run', (results) => {
        // Log summary
        console.log(`\n🎮 Pokemon TCG E2E Test Summary:`);
        console.log(`Tests: ${results.totalTests}`);
        console.log(`Passed: ${results.totalPassed}`);
        console.log(`Failed: ${results.totalFailed}`);
        console.log(`Duration: ${results.totalDuration}ms`);
        
        // Custom notifications based on results
        if (results.totalFailed > 0) {
          console.log(`\n❌ ${results.totalFailed} tests failed. Check Mochawesome report for details.`);
        } else {
          console.log(`\n✅ All tests passed! 🎉`);
        }
        
        // Generate report path
        const reportPath = `cypress/reports/mochawesome/*.html`;
        console.log(`📊 Detailed report: ${reportPath}`);
      });
      
      // Optional: Custom tasks for advanced reporting
      on('task', {
        // Custom logging
        log(message) {
          console.log(message);
          return null;
        },
        
        // Performance tracking
        logPerformance(data) {
          const perfLog = {
            timestamp: new Date().toISOString(),
            ...data
          };
          // Could save to file or send to analytics
          console.log('Performance:', perfLog);
          return null;
        }
      });
    }
  }
});
```

### **Ejemplo 2: Workflow con mochawesome-merge**

```javascript
// scripts/generate-unified-report.js
const merge = require('mochawesome-merge');
const generator = require('mochawesome-report-generator');
const fs = require('fs');
const path = require('path');

class UnifiedReportGenerator {
  constructor() {
    this.reportsDir = 'cypress/reports/mochawesome';
    this.mergedDir = 'cypress/reports/merged';
    this.outputFile = 'unified-pokemon-tcg-report';
  }
  
  async generateUnifiedReport() {
    try {
      console.log('🔄 Starting unified report generation...');
      
      // Step 1: Find all JSON reports
      const jsonReports = this.findJSONReports();
      console.log(`📁 Found ${jsonReports.length} JSON reports`);
      
      if (jsonReports.length === 0) {
        console.log('❌ No JSON reports found. Run tests first.');
        return;
      }
      
      // Step 2: Merge JSON reports
      console.log('🔀 Merging JSON reports...');
      const mergedData = await merge({
        files: jsonReports,
        // Additional options
        reportDir: this.mergedDir
      });
      
      // Step 3: Generate enhanced HTML report
      console.log('🎨 Generating enhanced HTML report...');
      await this.generateEnhancedHTML(mergedData);
      
      // Step 4: Generate additional formats
      await this.generateSummaryReport(mergedData);
      await this.generateMetricsReport(mergedData);
      
      console.log('✅ Unified report generation complete!');
      console.log(`📊 Main report: ${this.mergedDir}/${this.outputFile}.html`);
      
    } catch (error) {
      console.error('❌ Error generating unified report:', error);
      process.exit(1);
    }
  }
  
  findJSONReports() {
    const reportsPath = path.resolve(this.reportsDir);
    if (!fs.existsSync(reportsPath)) {
      return [];
    }
    
    return fs.readdirSync(reportsPath)
      .filter(file => file.endsWith('.json'))
      .map(file => path.join(reportsPath, file));
  }
  
  async generateEnhancedHTML(mergedData) {
    // Ensure output directory exists
    fs.mkdirSync(this.mergedDir, { recursive: true });
    
    // Enhanced configuration for merged report
    const options = {
      reportFilename: this.outputFile,
      reportDir: this.mergedDir,
      reportTitle: 'Pokemon TCG - Unified Test Results',
      reportPageTitle: 'Pokemon TCG Collection Manager - Complete Test Suite',
      
      // Enhanced visual options
      charts: true,
      code: false,
      inline: true,  // Self-contained file
      embeddedScreenshots: true,
      
      // Custom theming
      theme: 'dark',
      
      // Additional data processing
      dev: false,
      
      // Custom footer
      customFooter: this.generateCustomFooter(mergedData)
    };
    
    await generator.create(mergedData, options);
  }
  
  generateCustomFooter(data) {
    const stats = data.stats;
    const duration = this.formatDuration(stats.duration);
    const passRate = ((stats.passes / stats.tests) * 100).toFixed(1);
    
    return `
      <div style="text-align: center; margin-top: 20px; padding: 15px; background: #f8f9fa; border-radius: 5px;">
        <h4>🎮 Pokemon TCG Collection Manager</h4>
        <p>
          <strong>Test Execution Summary:</strong><br>
          Duration: ${duration} | Pass Rate: ${passRate}% | 
          Generated: ${new Date().toLocaleString()}
        </p>
        <p style="font-size: 0.9em; color: #666;">
          This report covers complete E2E testing of the Pokemon TCG Collection Manager application.
        </p>
      </div>
    `;
  }
  
  formatDuration(ms) {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    
    if (minutes > 0) {
      return `${minutes}m ${remainingSeconds}s`;
    }
    return `${remainingSeconds}s`;
  }
  
  async generateSummaryReport(data) {
    const summary = {
      timestamp: new Date().toISOString(),
      project: 'Pokemon TCG Collection Manager',
      environment: process.env.NODE_ENV || 'development',
      stats: data.stats,
      topFailures: this.getTopFailures(data),
      performanceMetrics: this.calculatePerformanceMetrics(data),
      recommendations: this.generateRecommendations(data)
    };
    
    const summaryPath = path.join(this.mergedDir, 'test-summary.json');
    fs.writeFileSync(summaryPath, JSON.stringify(summary, null, 2));
    console.log(`📋 Summary report: ${summaryPath}`);
  }
  
  getTopFailures(data) {
    return data.failures
      .map(failure => ({
        test: failure.fullTitle,
        error: failure.err.message,
        duration: failure.duration,
        suite: failure.parent
      }))
      .sort((a, b) => b.duration - a.duration)
      .slice(0, 5);
  }
  
  calculatePerformanceMetrics(data) {
    const durations = data.tests.map(test => test.duration || 0);
    
    return {
      averageDuration: durations.reduce((a, b) => a + b, 0) / durations.length,
      medianDuration: this.median(durations),
      slowestTests: data.tests
        .filter(test => test.duration)
        .sort((a, b) => b.duration - a.duration)
        .slice(0, 3)
        .map(test => ({
          title: test.fullTitle,
          duration: test.duration
        }))
    };
  }
  
  median(arr) {
    const sorted = arr.slice().sort((a, b) => a - b);
    const middle = Math.floor(sorted.length / 2);
    
    if (sorted.length % 2 === 0) {
      return (sorted[middle - 1] + sorted[middle]) / 2;
    }
    return sorted[middle];
  }
  
  generateRecommendations(data) {
    const recommendations = [];
    const stats = data.stats;
    
    // Pass rate analysis
    const passRate = (stats.passes / stats.tests) * 100;
    if (passRate < 90) {
      recommendations.push({
        type: 'quality',
        message: 'Consider improving test pass rate (currently ' + passRate.toFixed(1) + '%)',
        priority: 'high'
      });
    }
    
    // Performance analysis
    const avgDuration = this.calculatePerformanceMetrics(data).averageDuration;
    if (avgDuration > 5000) {
      recommendations.push({
        type: 'performance',
        message: 'Some tests are running slowly (avg: ' + avgDuration.toFixed(0) + 'ms)',
        priority: 'medium'
      });
    }
    
    // Flaky test detection (basic)
    const failureRate = (stats.failures / stats.tests) * 100;
    if (failureRate > 10) {
      recommendations.push({
        type: 'reliability',
        message: 'High failure rate detected, check for flaky tests',
        priority: 'high'
      });
    }
    
    return recommendations;
  }
}

// CLI usage
if (require.main === module) {
  const generator = new UnifiedReportGenerator();
  generator.generateUnifiedReport();
}

module.exports = UnifiedReportGenerator;
```

### **Ejemplo 3: Custom Theme para Pokemon TCG**

```css
/* custom-theme/pokemon-tcg-theme.css */
:root {
  /* Pokemon TCG Brand Colors */
  --primary-color: #3570a0;        /* Pokemon Blue */
  --secondary-color: #ffcb05;      /* Pokemon Yellow */
  --success-color: #28a745;        /* Pass Green */
  --danger-color: #dc3545;         /* Fail Red */
  --warning-color: #ffc107;        /* Pending Yellow */
  --info-color: #17a2b8;          /* Info Blue */
  
  /* Background */
  --bg-primary: #1a1a2e;          /* Dark Navy */
  --bg-secondary: #16213e;        /* Darker Blue */
  --bg-tertiary: #0f3460;         /* Deep Blue */
  
  /* Text */
  --text-primary: #ffffff;
  --text-secondary: #b8c5d6;
  --text-muted: #8a9ba8;
}

/* Main container styling */
.mochawesome-report {
  background: linear-gradient(135deg, var(--bg-primary) 0%, var(--bg-secondary) 100%);
  color: var(--text-primary);
  font-family: 'Segoe UI', 'Pokemon', sans-serif;
}

/* Header styling */
.mochawesome-report__header {
  background: var(--bg-tertiary);
  border-bottom: 3px solid var(--secondary-color);
  padding: 20px;
}

.mochawesome-report__title {
  color: var(--secondary-color);
  font-size: 2.5rem;
  font-weight: bold;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
}

.mochawesome-report__title::before {
  content: "⚡ ";
  color: var(--secondary-color);
}

/* Stats summary */
.mochawesome-summary {
  background: var(--bg-secondary);
  border-radius: 10px;
  margin: 20px 0;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.3);
}

/* Test status styling */
.test--pass {
  border-left: 4px solid var(--success-color);
  background: rgba(40, 167, 69, 0.1);
}

.test--fail {
  border-left: 4px solid var(--danger-color);
  background: rgba(220, 53, 69, 0.1);
}

.test--pending {
  border-left: 4px solid var(--warning-color);
  background: rgba(255, 193, 7, 0.1);
}

/* Pokemon-themed icons */
.test--pass .test__title::before {
  content: "✅ ";
}

.test--fail .test__title::before {
  content: "❌ ";
}

.test--pending .test__title::before {
  content: "⏳ ";
}

/* Suite styling */
.suite__title {
  color: var(--primary-color);
  font-weight: bold;
  border-bottom: 2px solid var(--primary-color);
  padding-bottom: 10px;
}

/* Charts customization */
.chart {
  background: var(--bg-secondary);
  border-radius: 8px;
  padding: 15px;
}

/* Navigation */
.nav-item--active {
  background: var(--secondary-color);
  color: var(--bg-primary);
}

/* Error details */
.test__error {
  background: var(--bg-tertiary);
  border: 1px solid var(--danger-color);
  border-radius: 5px;
  padding: 15px;
  margin: 10px 0;
}

/* Code blocks */
.test__code {
  background: var(--bg-tertiary);
  border: 1px solid var(--primary-color);
  border-radius: 5px;
}

/* Screenshots */
.test__screenshot {
  border: 2px solid var(--secondary-color);
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.3);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .mochawesome-report__title {
    font-size: 1.8rem;
  }
  
  .mochawesome-summary {
    margin: 10px 0;
    padding: 15px;
  }
}

/* Animation effects */
.test:hover {
  transform: translateY(-2px);
  transition: transform 0.2s ease;
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
}

/* Loading animation */
@keyframes pokeball-spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.loading-spinner::before {
  content: "⚫";
  animation: pokeball-spin 1s linear infinite;
}
```

### **Ejemplo 4: Advanced Configuration con Custom Processing**

```javascript
// cypress/plugins/mochawesome-custom.js
const fs = require('fs');
const path = require('path');

class MochawesomeCustomProcessor {
  constructor() {
    this.config = {
      enhancedScreenshots: true,
      performanceTracking: true,
      customMetrics: true,
      slackIntegration: true
    };
  }
  
  setupMochawesome(on, config) {
    // Enhanced screenshot handling
    if (this.config.enhancedScreenshots) {
      this.setupEnhancedScreenshots(on);
    }
    
    // Performance tracking
    if (this.config.performanceTracking) {
      this.setupPerformanceTracking(on);
    }
    
    // Post-processing
    on('after:run', (results) => {
      this.processResults(results);
    });
    
    return config;
  }
  
  setupEnhancedScreenshots(on) {
    on('after:screenshot', (details) => {
      // Custom screenshot processing
      const { path: screenshotPath, size, dimensions } = details;
      
      // Add metadata
      const metadata = {
        timestamp: new Date().toISOString(),
        testTitle: details.testTitle,
        size: size,
        dimensions: dimensions,
        browser: details.browser || 'unknown'
      };
      
      // Save metadata alongside screenshot
      const metadataPath = screenshotPath.replace('.png', '-metadata.json');
      fs.writeFileSync(metadataPath, JSON.stringify(metadata, null, 2));
      
      console.log(`📸 Enhanced screenshot: ${path.basename(screenshotPath)}`);
    });
  }
  
  setupPerformanceTracking(on) {
    on('task', {
      logPerformance: (data) => {
        const perfEntry = {
          timestamp: new Date().toISOString(),
          test: data.testName,
          metrics: {
            duration: data.duration,
            memoryUsage: process.memoryUsage(),
            cpuUsage: process.cpuUsage()
          }
        };
        
        // Append to performance log
        const logPath = 'cypress/reports/performance.jsonl';
        fs.appendFileSync(logPath, JSON.stringify(perfEntry) + '\n');
        
        return null;
      }
    });
  }
  
  async processResults(results) {
    console.log('\n🔄 Processing Mochawesome results...');
    
    try {
      // Generate enhanced summary
      await this.generateEnhancedSummary(results);
      
      // Send notifications if configured
      if (this.config.slackIntegration && process.env.SLACK_WEBHOOK) {
        await this.sendSlackNotification(results);
      }
      
      // Generate custom analytics
      if (this.config.customMetrics) {
        await this.generateCustomMetrics(results);
      }
      
      console.log('✅ Post-processing complete');
      
    } catch (error) {
      console.error('❌ Post-processing error:', error);
    }
  }
  
  async generateEnhancedSummary(results) {
    const summary = {
      execution: {
        timestamp: new Date().toISOString(),
        duration: results.totalDuration,
        browser: results.browserName,
        browserVersion: results.browserVersion,
        osName: results.osName,
        osVersion: results.osVersion
      },
      
      results: {
        total: results.totalTests,
        passed: results.totalPassed,
        failed: results.totalFailed,
        pending: results.totalPending,
        skipped: results.totalSkipped,
        passRate: ((results.totalPassed / results.totalTests) * 100).toFixed(2)
      },
      
      performance: {
        averageTestDuration: results.totalDuration / results.totalTests,
        slowestTests: this.findSlowestTests(results),
        fastestTests: this.findFastestTests(results)
      },
      
      failures: results.runs.flatMap(run => 
        run.tests
          .filter(test => test.state === 'failed')
          .map(test => ({
            title: test.title.join(' > '),
            error: test.displayError,
            duration: test.attempts[0]?.duration || 0,
            screenshot: test.attempts[0]?.screenshots?.[0]?.path
          }))
      )
    };
    
    const summaryPath = 'cypress/reports/enhanced-summary.json';
    fs.writeFileSync(summaryPath, JSON.stringify(summary, null, 2));
    
    console.log(`📊 Enhanced summary: ${summaryPath}`);
  }
  
  findSlowestTests(results, limit = 5) {
    const allTests = results.runs.flatMap(run => run.tests);
    return allTests
      .filter(test => test.state === 'passed' || test.state === 'failed')
      .sort((a, b) => (b.attempts[0]?.duration || 0) - (a.attempts[0]?.duration || 0))
      .slice(0, limit)
      .map(test => ({
        title: test.title.join(' > '),
        duration: test.attempts[0]?.duration || 0
      }));
  }
  
  findFastestTests(results, limit = 5) {
    const allTests = results.runs.flatMap(run => run.tests);
    return allTests
      .filter(test => test.state === 'passed')
      .sort((a, b) => (a.attempts[0]?.duration || 0) - (b.attempts[0]?.duration || 0))
      .slice(0, limit)
      .map(test => ({
        title: test.title.join(' > '),
        duration: test.attempts[0]?.duration || 0
      }));
  }
  
  async sendSlackNotification(results) {
    const webhook = process.env.SLACK_WEBHOOK;
    if (!webhook) return;
    
    const emoji = results.totalFailed > 0 ? '❌' : '✅';
    const color = results.totalFailed > 0 ? 'danger' : 'good';
    const passRate = ((results.totalPassed / results.totalTests) * 100).toFixed(1);
    
    const message = {
      username: 'Pokemon TCG Test Bot',
      icon_emoji: ':pokeball:',
      attachments: [{
        color: color,
        title: `${emoji} Pokemon TCG E2E Test Results`,
        fields: [
          { title: 'Total Tests', value: results.totalTests, short: true },
          { title: 'Passed', value: results.totalPassed, short: true },
          { title: 'Failed', value: results.totalFailed, short: true },
          { title: 'Pass Rate', value: `${passRate}%`, short: true },
          { title: 'Duration', value: `${(results.totalDuration / 1000).toFixed(1)}s`, short: true },
          { title: 'Browser', value: results.browserName, short: true }
        ],
        footer: 'Mochawesome Report Generated',
        ts: Math.floor(Date.now() / 1000)
      }]
    };
    
    // Add failure details if any
    if (results.totalFailed > 0) {
      const failures = results.runs.flatMap(run => 
        run.tests.filter(test => test.state === 'failed')
      );
      
      message.attachments[0].fields.push({
        title: 'Failed Tests',
        value: failures.slice(0, 3).map(test => 
          `• ${test.title.join(' > ')}`
        ).join('\n'),
        short: false
      });
    }
    
    try {
      const axios = require('axios');
      await axios.post(webhook, message);
      console.log('📱 Slack notification sent');
    } catch (error) {
      console.error('❌ Slack notification failed:', error.message);
    }
  }
}

module.exports = new MochawesomeCustomProcessor();
```

---

## 🔧 Hands-on Exercises

### **Ejercicio 1: Configuración Optimizada**

Configura Mochawesome para estos requirements específicos:

**Requirements:**
- Team de 8 developers
- Daily deployments
- Stakeholder demos semanales
- Compliance audit trail needed

**Tu configuración:**
```javascript
// cypress.config.js
module.exports = defineConfig({
  e2e: {
    reporter: 'mochawesome',
    reporterOptions: {
      // Tu configuración aquí...
    }
  }
});
```

### **Ejercicio 2: Custom Theme Development**

Crea un custom theme que:
- Use los colores de tu empresa
- Incluya logo en el header
- Tenga dark/light mode toggle
- Sea mobile-friendly

```css
/* custom-theme.css */
/* Tu implementación aquí... */
```

### **Ejercicio 3: Advanced Workflow**

Implementa un workflow que:
- Genere reportes para different environments
- Merge results de multiple test runs
- Send notifications basado en results
- Archive reports con timestamp

```bash
# package.json scripts
{
  "scripts": {
    // Tu implementation aquí...
  }
}
```

---

## ❓ Preguntas de Entrevista

### **Nivel Junior:**

1. **¿Qué es Mochawesome y por qué lo usarías sobre built-in reporters?**
   - **Respuesta esperada:** HTML reporter con visual appeal, screenshots, interactivity. Better para demos y debugging.

2. **¿Cómo configurarías Mochawesome en un proyecto Cypress?**
   - **Respuesta esperada:** cypress.config.js, reporter: 'mochawesome', reporterOptions con configuración básica.

3. **¿Qué archivos genera Mochawesome por defecto?**
   - **Respuesta esperada:** HTML report, JSON data file, assets folder con CSS/JS/images.

### **Nivel Mid:**

4. **¿Cómo manejarías multiple test runs con Mochawesome?**
   - **Respuesta esperada:** mochawesome-merge para combinar JSON files, marge para generar HTML unificado.

5. **¿Qué opciones de configuración son más importantes para performance?**
   - **Respuesta esperada:** inline assets, screenshot embedding, code display, overwrite settings.

6. **¿Cómo customizarías el appearance de Mochawesome reports?**
   - **Respuesta esperada:** Custom CSS themes, configuration options, custom templates.

### **Nivel Senior:**

7. **¿Cómo implementarías automated report distribution en enterprise environment?**
   - **Respuesta esperada:** CI/CD integration, automated upload to shared storage, email/Slack notifications, access controls.

8. **¿Qué estrategia usarías para large test suites que generan huge reports?**
   - **Respuesta esperada:** Report splitting, asset optimization, lazy loading, compression, CDN distribution.

9. **¿Cómo troubleshootearías Mochawesome performance issues?**
   - **Respuesta esperada:** Asset size analysis, memory usage monitoring, configuration optimization, alternative approaches.

---

## 📈 Métricas de Éxito

### **Implementation Mastery:**
- [ ] Puedes configurar Mochawesome desde cero en cualquier proyecto
- [ ] Dominas todas las configuration options importantes
- [ ] Implementas workflows con mochawesome-merge

### **Customization Skills:**
- [ ] Creas custom themes professional-quality
- [ ] Integras Mochawesome con notification systems
- [ ] Optimizas performance para large test suites

### **Troubleshooting Ability:**
- [ ] Debuggeas common Mochawesome issues
- [ ] Optimizas report generation performance
- [ ] Planificas scalable reporting strategies

---

## 🔗 Referencias Adicionales

### **Official Documentation:**
- 📄 [Mochawesome GitHub](https://github.com/adamgruber/mochawesome)
- 📄 [Mochawesome-merge](https://github.com/antontelesh/mochawesome-merge)
- 📄 [Marge (Report Generator)](https://github.com/adamgruber/mochawesome-report-generator)

### **Configuration Guides:**
- 🔧 [Cypress + Mochawesome Setup](https://docs.cypress.io/guides/tooling/reporters#Mochawesome)
- 🔧 [Advanced Configuration Options](https://github.com/adamgruber/mochawesome#options)
- 🔧 [Custom Theme Development](https://github.com/adamgruber/mochawesome#custom-options)

### **Best Practices:**
- 🎯 [Performance Optimization](https://github.com/adamgruber/mochawesome/wiki/Performance-Tips)
- 🎯 [CI/CD Integration Patterns](https://medium.com/@antontelesh/mochawesome-merge-for-cypress-parallel-execution-f123d4f1e4e1)
- 🎯 [Enterprise Deployment](https://testautomationu.applitools.com/cypress-tutorial/chapter16.html)

### **Community Resources:**
- 💬 [Mochawesome Discussions](https://github.com/adamgruber/mochawesome/discussions)
- 💬 [Cypress Community](https://discord.com/invite/cypress)
- 📺 [Video Tutorials](https://www.youtube.com/results?search_query=mochawesome+cypress)

---

## ➡️ Conexión al Siguiente Tema

**🎉 ¡NIVEL 2 COMPLETADO!**

¡Felicitaciones! Has completado todo el **Nivel 2: Reportes y Visualización**. Ahora dominas:
- ✅ Conceptos fundamentales de reporting
- ✅ Ecosystem completo de reporters
- ✅ Mochawesome implementation y customization

**🎯 Próximo nivel: "Implementación Práctica"**

**Punto 7: "Configuración de Mochawesome en Proyectos Reales"**

Aprenderás:
- Setup específico para diferentes types de proyectos
- Integration con Cypress, Jest, Playwright
- Advanced configuration patterns
- Real-world troubleshooting
- Production deployment strategies

**Pre-requisitos PERFECTAMENTE cumplidos:** ✅
- Dominas Mochawesome configuration y features
- Entiendes el ecosystem context
- Puedes implementar custom themes y workflows
- Estás listo para advanced implementation patterns

---

## 📝 Checklist de Completitud

**Antes de pasar al siguiente nivel, asegúrate de:**

- [ ] Entender completamente qué es Mochawesome y por qué es popular
- [ ] Poder configurar Mochawesome en proyectos Cypress y Mocha
- [ ] Dominar las configuration options más importantes
- [ ] Haber implementado al menos un custom workflow
- [ ] Poder troubleshoot common issues
- [ ] Haber completado al menos 2 de los 3 exercises prácticos
- [ ] Poder responder al menos 7 de las 9 preguntas de entrevista

**¡NIVEL 2 COMPLETADO! Ready para Implementation Práctica! 🚀**

---

*Has dominado Mochawesome completamente. Ahora es tiempo de aplicar este knowledge en scenarios reales y advanced implementation patterns.*