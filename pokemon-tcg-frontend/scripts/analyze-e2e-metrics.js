#!/usr/bin/env node

/**
 * Script para análisis de métricas de tests E2E
 * Analiza reportes JSON de Cypress y genera estadísticas útiles
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Obtener __dirname en ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuración
const REPORTS_DIR = path.join(__dirname, '..', 'cypress', 'reports', 'mochawesome');
const OUTPUT_DIR = path.join(__dirname, '..', 'cypress', 'reports', 'analysis');

// Crear directorio de análisis si no existe
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

/**
 * Leer todos los archivos JSON de reportes
 */
function readReportFiles() {
  try {
    const files = fs.readdirSync(REPORTS_DIR)
      .filter(file => file.endsWith('.json'))
      .map(file => {
        const filePath = path.join(REPORTS_DIR, file);
        const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        return { file, ...content };
      });
    
    console.log(`📊 Analizando ${files.length} archivos de reporte...`);
    return files;
  } catch (error) {
    console.error('❌ Error leyendo archivos de reporte:', error.message);
    return [];
  }
}

/**
 * Analizar métricas de performance
 */
function analyzePerformance(reports) {
  const metrics = {
    totalTests: 0,
    totalPassing: 0,
    totalFailing: 0,
    totalDuration: 0,
    avgDuration: 0,
    slowestTests: [],
    fastestTests: [],
    specAnalysis: []
  };

  reports.forEach(report => {
    if (report.stats) {
      metrics.totalTests += report.stats.tests || 0;
      metrics.totalPassing += report.stats.passes || 0;
      metrics.totalFailing += report.stats.failures || 0;
      metrics.totalDuration += report.stats.duration || 0;

      // Analizar cada spec
      if (report.suites && report.suites.length > 0) {
        report.suites.forEach(suite => {
          const specInfo = {
            title: suite.title,
            tests: suite.tests ? suite.tests.length : 0,
            passing: suite.tests ? suite.tests.filter(t => t.state === 'passed').length : 0,
            failing: suite.tests ? suite.tests.filter(t => t.state === 'failed').length : 0,
            duration: suite.duration || 0,
            file: report.file
          };

          metrics.specAnalysis.push(specInfo);

          // Analizar tests individuales
          if (suite.tests) {
            suite.tests.forEach(test => {
              const testInfo = {
                title: test.title,
                duration: test.duration || 0,
                state: test.state,
                spec: suite.title
              };

              if (test.state === 'passed') {
                if (metrics.slowestTests.length < 5 || test.duration > metrics.slowestTests[4].duration) {
                  metrics.slowestTests.push(testInfo);
                  metrics.slowestTests.sort((a, b) => b.duration - a.duration);
                  metrics.slowestTests = metrics.slowestTests.slice(0, 5);
                }

                if (metrics.fastestTests.length < 5 || test.duration < metrics.fastestTests[4].duration) {
                  metrics.fastestTests.push(testInfo);
                  metrics.fastestTests.sort((a, b) => a.duration - b.duration);
                  metrics.fastestTests = metrics.fastestTests.slice(0, 5);
                }
              }
            });
          }
        });
      }
    }
  });

  metrics.avgDuration = metrics.totalTests > 0 ? metrics.totalDuration / metrics.totalTests : 0;
  metrics.successRate = metrics.totalTests > 0 ? (metrics.totalPassing / metrics.totalTests * 100) : 0;

  return metrics;
}

/**
 * Generar reporte de análisis
 */
function generateAnalysisReport(metrics) {
  const report = {
    generatedAt: new Date().toISOString(),
    summary: {
      totalTests: metrics.totalTests,
      successRate: `${metrics.successRate.toFixed(2)}%`,
      totalDuration: `${(metrics.totalDuration / 1000).toFixed(2)}s`,
      avgTestDuration: `${(metrics.avgDuration / 1000).toFixed(2)}s`
    },
    performance: {
      slowestTests: metrics.slowestTests.map(test => ({
        ...test,
        duration: `${(test.duration / 1000).toFixed(2)}s`
      })),
      fastestTests: metrics.fastestTests.map(test => ({
        ...test,
        duration: `${(test.duration / 1000).toFixed(2)}s`
      }))
    },
    specBreakdown: metrics.specAnalysis.map(spec => ({
      ...spec,
      duration: `${(spec.duration / 1000).toFixed(2)}s`,
      successRate: spec.tests > 0 ? `${(spec.passing / spec.tests * 100).toFixed(2)}%` : '0%'
    }))
  };

  return report;
}

/**
 * Generar reporte HTML
 */
function generateHTMLReport(metrics, analysisReport) {
  const html = `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Análisis de Métricas E2E - Pokemon TCG</title>
    <style>
        body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
            margin: 0; 
            padding: 20px; 
            background: #f5f5f5; 
        }
        .container { 
            max-width: 1200px; 
            margin: 0 auto; 
            background: white; 
            padding: 30px; 
            border-radius: 8px; 
            box-shadow: 0 2px 10px rgba(0,0,0,0.1); 
        }
        h1 { 
            color: #2c3e50; 
            text-align: center; 
            margin-bottom: 30px; 
        }
        .metrics-grid { 
            display: grid; 
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); 
            gap: 20px; 
            margin-bottom: 30px; 
        }
        .metric-card { 
            background: #ecf0f1; 
            padding: 20px; 
            border-radius: 6px; 
            text-align: center; 
        }
        .metric-value { 
            font-size: 2em; 
            font-weight: bold; 
            color: #3498db; 
        }
        .metric-label { 
            color: #7f8c8d; 
            margin-top: 5px; 
        }
        .success { color: #27ae60; }
        .warning { color: #f39c12; }
        .danger { color: #e74c3c; }
        table { 
            width: 100%; 
            border-collapse: collapse; 
            margin: 20px 0; 
        }
        th, td { 
            text-align: left; 
            padding: 12px; 
            border-bottom: 1px solid #ddd; 
        }
        th { 
            background: #34495e; 
            color: white; 
        }
        .section { 
            margin: 30px 0; 
        }
        .section h2 { 
            color: #2c3e50; 
            border-bottom: 2px solid #3498db; 
            padding-bottom: 10px; 
        }
        .timestamp { 
            text-align: center; 
            color: #7f8c8d; 
            font-size: 0.9em; 
            margin-top: 30px; 
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>📊 Análisis de Métricas E2E Tests</h1>
        <h2>Pokemon TCG AI Generator</h2>
        
        <div class="metrics-grid">
            <div class="metric-card">
                <div class="metric-value ${metrics.successRate >= 95 ? 'success' : metrics.successRate >= 80 ? 'warning' : 'danger'}">
                    ${analysisReport.summary.successRate}
                </div>
                <div class="metric-label">Tasa de Éxito</div>
            </div>
            <div class="metric-card">
                <div class="metric-value">${metrics.totalTests}</div>
                <div class="metric-label">Total Tests</div>
            </div>
            <div class="metric-card">
                <div class="metric-value">${analysisReport.summary.totalDuration}</div>
                <div class="metric-label">Duración Total</div>
            </div>
            <div class="metric-card">
                <div class="metric-value">${analysisReport.summary.avgTestDuration}</div>
                <div class="metric-label">Promedio por Test</div>
            </div>
        </div>

        <div class="section">
            <h2>🐌 Tests Más Lentos</h2>
            <table>
                <thead>
                    <tr>
                        <th>Test</th>
                        <th>Spec</th>
                        <th>Duración</th>
                        <th>Estado</th>
                    </tr>
                </thead>
                <tbody>
                    ${analysisReport.performance.slowestTests.map(test => `
                        <tr>
                            <td>${test.title}</td>
                            <td>${test.spec}</td>
                            <td>${test.duration}</td>
                            <td class="${test.state === 'passed' ? 'success' : 'danger'}">${test.state}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>

        <div class="section">
            <h2>⚡ Tests Más Rápidos</h2>
            <table>
                <thead>
                    <tr>
                        <th>Test</th>
                        <th>Spec</th>
                        <th>Duración</th>
                        <th>Estado</th>
                    </tr>
                </thead>
                <tbody>
                    ${analysisReport.performance.fastestTests.map(test => `
                        <tr>
                            <td>${test.title}</td>
                            <td>${test.spec}</td>
                            <td>${test.duration}</td>
                            <td class="${test.state === 'passed' ? 'success' : 'danger'}">${test.state}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>

        <div class="section">
            <h2>📄 Análisis por Spec</h2>
            <table>
                <thead>
                    <tr>
                        <th>Spec</th>
                        <th>Tests</th>
                        <th>Exitosos</th>
                        <th>Fallidos</th>
                        <th>Tasa Éxito</th>
                        <th>Duración</th>
                    </tr>
                </thead>
                <tbody>
                    ${analysisReport.specBreakdown.map(spec => `
                        <tr>
                            <td>${spec.title}</td>
                            <td>${spec.tests}</td>
                            <td class="success">${spec.passing}</td>
                            <td class="danger">${spec.failing}</td>
                            <td class="${parseFloat(spec.successRate) >= 95 ? 'success' : parseFloat(spec.successRate) >= 80 ? 'warning' : 'danger'}">${spec.successRate}</td>
                            <td>${spec.duration}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>

        <div class="timestamp">
            Generado el: ${new Date(analysisReport.generatedAt).toLocaleString('es-ES')}
        </div>
    </div>
</body>
</html>
  `;

  return html;
}

/**
 * Función principal
 */
function main() {
  console.log('🚀 Iniciando análisis de métricas E2E...\n');

  const reports = readReportFiles();
  if (reports.length === 0) {
    console.log('⚠️  No se encontraron archivos de reporte.');
    console.log('   Ejecuta primero: npm run test:e2e');
    return;
  }

  const metrics = analyzePerformance(reports);
  const analysisReport = generateAnalysisReport(metrics);

  // Guardar reporte JSON
  const jsonPath = path.join(OUTPUT_DIR, 'e2e-metrics-analysis.json');
  fs.writeFileSync(jsonPath, JSON.stringify(analysisReport, null, 2));

  // Guardar reporte HTML
  const htmlContent = generateHTMLReport(metrics, analysisReport);
  const htmlPath = path.join(OUTPUT_DIR, 'e2e-metrics-analysis.html');
  fs.writeFileSync(htmlPath, htmlContent);

  // Mostrar resumen en consola
  console.log('📊 RESUMEN DE MÉTRICAS E2E');
  console.log('========================');
  console.log(`Tests totales:     ${metrics.totalTests}`);
  console.log(`Exitosos:          ${metrics.totalPassing} (${metrics.successRate.toFixed(2)}%)`);
  console.log(`Fallidos:          ${metrics.totalFailing}`);
  console.log(`Duración total:    ${(metrics.totalDuration / 1000).toFixed(2)}s`);
  console.log(`Promedio por test: ${(metrics.avgDuration / 1000).toFixed(2)}s`);
  console.log('');
  console.log(`📄 Reportes generados:`);
  console.log(`   JSON: ${jsonPath}`);
  console.log(`   HTML: ${htmlPath}`);
  console.log('');
  console.log('🌐 Para ver el reporte HTML:');
  console.log(`   start ${htmlPath}  # Windows`);
  console.log(`   open ${htmlPath}   # Mac`);
}

// Ejecutar si es llamado directamente
main();

export {
  readReportFiles,
  analyzePerformance,
  generateAnalysisReport,
  generateHTMLReport
};