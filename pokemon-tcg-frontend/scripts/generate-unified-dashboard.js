#!/usr/bin/env node

/**
 * Dashboard Unificado de Testing
 * Combina métricas de Jest (unit tests) y Cypress (E2E tests)
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Obtener __dirname en ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuración
const COVERAGE_DIR = path.join(__dirname, '..', 'coverage');
const E2E_REPORTS_DIR = path.join(__dirname, '..', 'cypress', 'reports', 'mochawesome');
const E2E_ANALYSIS_DIR = path.join(__dirname, '..', 'cypress', 'reports', 'analysis');
const OUTPUT_DIR = path.join(__dirname, '..', 'reports', 'unified-dashboard');

// Crear directorio de salida si no existe
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

/**
 * Leer métricas de cobertura de Jest
 */
function readJestCoverage() {
  try {
    const coveragePath = path.join(COVERAGE_DIR, 'coverage-summary.json');
    if (!fs.existsSync(coveragePath)) {
      console.log('⚠️  No se encontró coverage-summary.json. Ejecuta: npm run test:coverage');
      return null;
    }

    const coverage = JSON.parse(fs.readFileSync(coveragePath, 'utf8'));
    
    // Extraer métricas globales
    const total = coverage.total;
    return {
      lines: {
        total: total.lines.total,
        covered: total.lines.covered,
        skipped: total.lines.skipped,
        pct: total.lines.pct
      },
      statements: {
        total: total.statements.total,
        covered: total.statements.covered,
        skipped: total.statements.skipped,
        pct: total.statements.pct
      },
      functions: {
        total: total.functions.total,
        covered: total.functions.covered,
        skipped: total.functions.skipped,
        pct: total.functions.pct
      },
      branches: {
        total: total.branches.total,
        covered: total.branches.covered,
        skipped: total.branches.skipped,
        pct: total.branches.pct
      },
      filesCovered: Object.keys(coverage).length - 1 // -1 para excluir 'total'
    };
  } catch (error) {
    console.error('❌ Error leyendo cobertura de Jest:', error.message);
    return null;
  }
}

/**
 * Leer métricas de E2E
 */
function readE2EMetrics() {
  try {
    const analysisPath = path.join(E2E_ANALYSIS_DIR, 'e2e-metrics-analysis.json');
    if (!fs.existsSync(analysisPath)) {
      console.log('⚠️  No se encontró análisis E2E. Ejecuta: npm run analyze:e2e');
      return null;
    }

    return JSON.parse(fs.readFileSync(analysisPath, 'utf8'));
  } catch (error) {
    console.error('❌ Error leyendo métricas E2E:', error.message);
    return null;
  }
}

/**
 * Generar dashboard HTML unificado
 */
function generateUnifiedDashboard(jestMetrics, e2eMetrics) {
  const html = `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard Unificado de Testing - Pokemon TCG</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            padding: 20px;
        }
        
        .container { 
            max-width: 1400px; 
            margin: 0 auto; 
            background: white; 
            border-radius: 12px; 
            box-shadow: 0 10px 30px rgba(0,0,0,0.2); 
            overflow: hidden;
        }
        
        .header {
            background: linear-gradient(135deg, #2c3e50 0%, #3498db 100%);
            color: white;
            padding: 30px;
            text-align: center;
        }
        
        .header h1 {
            font-size: 2.5em;
            margin-bottom: 10px;
        }
        
        .header p {
            opacity: 0.9;
            font-size: 1.1em;
        }
        
        .main-content {
            padding: 30px;
        }
        
        .section {
            margin-bottom: 40px;
        }
        
        .section-title {
            font-size: 1.8em;
            color: #2c3e50;
            margin-bottom: 20px;
            padding-bottom: 10px;
            border-bottom: 3px solid #3498db;
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .metrics-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin-bottom: 30px;
        }
        
        .metric-card {
            background: linear-gradient(145deg, #f8f9fa, #e9ecef);
            border-radius: 10px;
            padding: 25px;
            text-align: center;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            transition: transform 0.2s ease;
        }
        
        .metric-card:hover {
            transform: translateY(-2px);
        }
        
        .metric-value {
            font-size: 2.2em;
            font-weight: bold;
            margin-bottom: 8px;
        }
        
        .metric-label {
            color: #6c757d;
            font-size: 0.9em;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        
        .success { color: #28a745; }
        .warning { color: #ffc107; }
        .danger { color: #dc3545; }
        .info { color: #17a2b8; }
        
        .coverage-bars {
            display: grid;
            gap: 15px;
            margin: 20px 0;
        }
        
        .coverage-item {
            background: #f8f9fa;
            border-radius: 8px;
            padding: 15px;
        }
        
        .coverage-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 8px;
        }
        
        .coverage-label {
            font-weight: 600;
            color: #495057;
        }
        
        .coverage-percentage {
            font-weight: bold;
            font-size: 1.1em;
        }
        
        .progress-bar {
            height: 8px;
            background: #e9ecef;
            border-radius: 4px;
            overflow: hidden;
        }
        
        .progress-fill {
            height: 100%;
            border-radius: 4px;
            transition: width 0.3s ease;
        }
        
        .comparison-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 30px;
            margin: 30px 0;
        }
        
        .test-type-card {
            background: #f8f9fa;
            border-radius: 10px;
            padding: 25px;
            border-left: 5px solid #3498db;
        }
        
        .test-type-title {
            font-size: 1.4em;
            color: #2c3e50;
            margin-bottom: 15px;
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .summary-stats {
            background: linear-gradient(145deg, #e3f2fd, #bbdefb);
            border-radius: 10px;
            padding: 25px;
            margin: 20px 0;
        }
        
        .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 20px;
        }
        
        .stat-item {
            text-align: center;
        }
        
        .stat-value {
            font-size: 1.8em;
            font-weight: bold;
            color: #1976d2;
        }
        
        .stat-label {
            color: #666;
            font-size: 0.9em;
            margin-top: 5px;
        }
        
        .timestamp {
            text-align: center;
            color: #6c757d;
            font-size: 0.9em;
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid #dee2e6;
        }
        
        .actions {
            display: flex;
            gap: 15px;
            justify-content: center;
            margin: 30px 0;
        }
        
        .btn {
            padding: 12px 24px;
            border: none;
            border-radius: 6px;
            font-weight: 600;
            text-decoration: none;
            color: white;
            transition: all 0.2s ease;
            cursor: pointer;
        }
        
        .btn-primary {
            background: linear-gradient(145deg, #3498db, #2980b9);
        }
        
        .btn-success {
            background: linear-gradient(145deg, #27ae60, #229954);
        }
        
        .btn:hover {
            transform: translateY(-1px);
            box-shadow: 0 4px 8px rgba(0,0,0,0.2);
        }
        
        @media (max-width: 768px) {
            .comparison-grid {
                grid-template-columns: 1fr;
            }
            
            .header h1 {
                font-size: 2em;
            }
            
            .metrics-grid {
                grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🧪 Dashboard Unificado de Testing</h1>
            <p>Pokemon TCG AI Generator - Análisis Completo de Calidad</p>
        </div>
        
        <div class="main-content">
            <!-- Resumen General -->
            <div class="summary-stats">
                <h2 style="text-align: center; margin-bottom: 20px; color: #1976d2;">📊 Resumen Ejecutivo</h2>
                <div class="stats-grid">
                    <div class="stat-item">
                        <div class="stat-value">${jestMetrics ? jestMetrics.statements.pct.toFixed(1) + '%' : 'N/A'}</div>
                        <div class="stat-label">Cobertura Unit Tests</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-value">${e2eMetrics ? e2eMetrics.summary.successRate : 'N/A'}</div>
                        <div class="stat-label">Éxito E2E Tests</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-value">${jestMetrics ? jestMetrics.filesCovered : 'N/A'}</div>
                        <div class="stat-label">Archivos Cubiertos</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-value">${e2eMetrics ? e2eMetrics.summary.totalTests : 'N/A'}</div>
                        <div class="stat-label">Tests E2E</div>
                    </div>
                </div>
            </div>

            <!-- Comparación Unit vs E2E -->
            <div class="comparison-grid">
                <!-- Unit Tests (Jest) -->
                <div class="test-type-card">
                    <div class="test-type-title">
                        🔬 Unit Tests (Jest)
                    </div>
                    ${jestMetrics ? `
                        <div class="coverage-bars">
                            <div class="coverage-item">
                                <div class="coverage-header">
                                    <span class="coverage-label">Statements</span>
                                    <span class="coverage-percentage ${jestMetrics.statements.pct >= 80 ? 'success' : jestMetrics.statements.pct >= 60 ? 'warning' : 'danger'}">${jestMetrics.statements.pct.toFixed(1)}%</span>
                                </div>
                                <div class="progress-bar">
                                    <div class="progress-fill ${jestMetrics.statements.pct >= 80 ? 'success' : jestMetrics.statements.pct >= 60 ? 'warning' : 'danger'}" style="width: ${jestMetrics.statements.pct}%; background-color: ${jestMetrics.statements.pct >= 80 ? '#28a745' : jestMetrics.statements.pct >= 60 ? '#ffc107' : '#dc3545'};"></div>
                                </div>
                            </div>
                            <div class="coverage-item">
                                <div class="coverage-header">
                                    <span class="coverage-label">Branches</span>
                                    <span class="coverage-percentage ${jestMetrics.branches.pct >= 80 ? 'success' : jestMetrics.branches.pct >= 60 ? 'warning' : 'danger'}">${jestMetrics.branches.pct.toFixed(1)}%</span>
                                </div>
                                <div class="progress-bar">
                                    <div class="progress-fill" style="width: ${jestMetrics.branches.pct}%; background-color: ${jestMetrics.branches.pct >= 80 ? '#28a745' : jestMetrics.branches.pct >= 60 ? '#ffc107' : '#dc3545'};"></div>
                                </div>
                            </div>
                            <div class="coverage-item">
                                <div class="coverage-header">
                                    <span class="coverage-label">Functions</span>
                                    <span class="coverage-percentage ${jestMetrics.functions.pct >= 80 ? 'success' : jestMetrics.functions.pct >= 60 ? 'warning' : 'danger'}">${jestMetrics.functions.pct.toFixed(1)}%</span>
                                </div>
                                <div class="progress-bar">
                                    <div class="progress-fill" style="width: ${jestMetrics.functions.pct}%; background-color: ${jestMetrics.functions.pct >= 80 ? '#28a745' : jestMetrics.functions.pct >= 60 ? '#ffc107' : '#dc3545'};"></div>
                                </div>
                            </div>
                            <div class="coverage-item">
                                <div class="coverage-header">
                                    <span class="coverage-label">Lines</span>
                                    <span class="coverage-percentage ${jestMetrics.lines.pct >= 80 ? 'success' : jestMetrics.lines.pct >= 60 ? 'warning' : 'danger'}">${jestMetrics.lines.pct.toFixed(1)}%</span>
                                </div>
                                <div class="progress-bar">
                                    <div class="progress-fill" style="width: ${jestMetrics.lines.pct}%; background-color: ${jestMetrics.lines.pct >= 80 ? '#28a745' : jestMetrics.lines.pct >= 60 ? '#ffc107' : '#dc3545'};"></div>
                                </div>
                            </div>
                        </div>
                    ` : '<p style="color: #6c757d; text-align: center;">No hay datos de cobertura disponibles.<br>Ejecuta: <code>npm run test:coverage</code></p>'}
                </div>

                <!-- E2E Tests (Cypress) -->
                <div class="test-type-card">
                    <div class="test-type-title">
                        🌐 E2E Tests (Cypress)
                    </div>
                    ${e2eMetrics ? `
                        <div class="metrics-grid" style="grid-template-columns: 1fr 1fr; gap: 15px;">
                            <div class="metric-card" style="padding: 15px;">
                                <div class="metric-value success">${e2eMetrics.summary.totalTests}</div>
                                <div class="metric-label">Total Tests</div>
                            </div>
                            <div class="metric-card" style="padding: 15px;">
                                <div class="metric-value ${parseFloat(e2eMetrics.summary.successRate) >= 95 ? 'success' : parseFloat(e2eMetrics.summary.successRate) >= 80 ? 'warning' : 'danger'}">${e2eMetrics.summary.successRate}</div>
                                <div class="metric-label">Tasa Éxito</div>
                            </div>
                            <div class="metric-card" style="padding: 15px;">
                                <div class="metric-value info">${e2eMetrics.summary.totalDuration}</div>
                                <div class="metric-label">Duración Total</div>
                            </div>
                            <div class="metric-card" style="padding: 15px;">
                                <div class="metric-value info">${e2eMetrics.summary.avgTestDuration}</div>
                                <div class="metric-label">Promedio/Test</div>
                            </div>
                        </div>
                    ` : '<p style="color: #6c757d; text-align: center;">No hay datos de E2E disponibles.<br>Ejecuta: <code>npm run analyze:e2e</code></p>'}
                </div>
            </div>

            <!-- Acciones Rápidas -->
            <div class="section">
                <div class="section-title">⚡ Acciones Rápidas</div>
                <div class="actions">
                    <a href="../coverage/index.html" class="btn btn-primary">📊 Ver Cobertura Jest</a>
                    <a href="../cypress/reports/html/cypress/reports/merged-report.html" class="btn btn-success">🌐 Ver Reportes E2E</a>
                    <a href="../cypress/reports/analysis/e2e-metrics-analysis.html" class="btn btn-primary">📈 Análisis E2E</a>
                </div>
            </div>

            <div class="timestamp">
                Dashboard generado el: ${new Date().toLocaleString('es-ES')}<br>
                ${jestMetrics ? `Cobertura Jest: ${new Date().toLocaleString('es-ES')}` : 'Cobertura Jest: No disponible'} | 
                ${e2eMetrics ? `Análisis E2E: ${new Date(e2eMetrics.generatedAt).toLocaleString('es-ES')}` : 'Análisis E2E: No disponible'}
            </div>
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
  console.log('🚀 Generando Dashboard Unificado de Testing...\n');

  const jestMetrics = readJestCoverage();
  const e2eMetrics = readE2EMetrics();

  if (!jestMetrics && !e2eMetrics) {
    console.log('❌ No se encontraron métricas de testing.');
    console.log('   Ejecuta: npm run test:coverage && npm run analyze:e2e');
    return;
  }

  const dashboardHTML = generateUnifiedDashboard(jestMetrics, e2eMetrics);
  const htmlPath = path.join(OUTPUT_DIR, 'unified-testing-dashboard.html');
  
  fs.writeFileSync(htmlPath, dashboardHTML);

  console.log('✅ Dashboard Unificado generado exitosamente!');
  console.log(`📄 Ubicación: ${htmlPath}`);
  console.log('');
  console.log('📊 RESUMEN DEL DASHBOARD:');
  console.log('========================');
  
  if (jestMetrics) {
    console.log(`🔬 Unit Tests (Jest):`);
    console.log(`   Cobertura Statements: ${jestMetrics.statements.pct.toFixed(1)}%`);
    console.log(`   Cobertura Branches:   ${jestMetrics.branches.pct.toFixed(1)}%`);
    console.log(`   Archivos cubiertos:   ${jestMetrics.filesCovered}`);
  } else {
    console.log(`🔬 Unit Tests (Jest): No disponible`);
  }
  
  if (e2eMetrics) {
    console.log(`🌐 E2E Tests (Cypress):`);
    console.log(`   Tests totales:        ${e2eMetrics.summary.totalTests}`);
    console.log(`   Tasa de éxito:        ${e2eMetrics.summary.successRate}`);
    console.log(`   Duración total:       ${e2eMetrics.summary.totalDuration}`);
  } else {
    console.log(`🌐 E2E Tests (Cypress): No disponible`);
  }
  
  console.log('');
  console.log('🌐 Para ver el dashboard:');
  console.log(`   start "${htmlPath}"  # Windows`);
  console.log(`   open "${htmlPath}"   # Mac`);
}

// Ejecutar automáticamente
main();

export {
  readJestCoverage,
  readE2EMetrics,
  generateUnifiedDashboard
};