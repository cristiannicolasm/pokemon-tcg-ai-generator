# Product Backlog - Pokémon TCG AI Generator

## 📊 RESUMEN DEL PROYECTO

**Total de Sprints:** 8  
**Historias Completadas:** 27  
**Historias en Progreso:** 1  
**Historias Pendientes:** 47  

---

## ✅ SPRINT 1 - DONE

### Configuración Base y APIs Externas
- [x] **Configuración de Django Users y Django REST Framework para Autenticación** - DONE
- [x] **Configuración Inicial de Confluence (o alternativa gratuita)** - DONE
- [x] **Implementación del Servicio de Consulta a la API de Pokémon TCG (Cartas por Expansión)** - DONE
- [x] **Endpoint Backend para Listar Expansiones** - DONE
- [x] **Implementación del Servicio de Consulta a la API de Pokémon TCG (Expansiones)** - DONE
- [x] **Diseño de la Base de Datos para Carta y Expansión** - DONE
- [x] **Configuración de Docker para el Backend Django** - DONE
- [x] **Inicialización del Repositorio Git y Conexión con GitHub** - DONE
- [x] **Configuración Inicial del Entorno de Desarrollo Python/Django** - DONE

---

## ✅ SPRINT 2 - DONE

### Autenticación y Frontend Base
- [x] **Acceso a Datos Protegidos de la Colección (Expansiones y Cartas)** - DONE
- [x] **Proteger Endpoints que Requieren Autenticación** - DONE
- [x] **Endpoint Backend para Obtener Detalles de una Carta Específica (por API ID)** - DONE
- [x] **Interfaz de Usuario (Frontend) para Login de Usuarios y Gestión de Tokens** - DONE
- [x] **Interfaz de Usuario (Frontend) para Registro de Usuarios** - DONE
- [x] **Endpoint Backend para Login de Usuarios y Obtención de Tokens** - DONE
- [x] **Endpoint Backend para Registro de Usuarios** - DONE
- [x] **Configuración de Pruebas Unitarias para el Backend (pytest)** - DONE
- [x] **Componente de Selección de Carta por Expansión** - DONE
- [x] **Componente de Selección de Expansión** - DONE
- [x] **Configuración Inicial del Proyecto React** - DONE
- [x] **Endpoint Backend para Listar Cartas de la Colección del Usuario** - DONE
- [x] **Implementación del Endpoint para Añadir Carta a la Colección (Validación API)** - DONE
- [x] **Diseño de la Base de Datos para la Colección del Usuario** - DONE
- [x] **Endpoint Backend para Listar Cartas de una Expansión** - DONE
- [ ] **Pruebas funcionales de autenticación y registro** - ToDo

---

## 🔄 SPRINT 3 - PARCIAL (7 DONE + 1 DOING + 3 TODO)

### ✅ Gestión de Colección Completada
- [x] **Endpoint Backend para Actualizar Detalles de Carta en la Colección** - DONE
- [x] **Endpoint Backend para Eliminar Carta de la Colección** - DONE
- [x] **Endpoint para marcar una carta de la colección como favorita** - DONE
- [x] **Interfaz de Usuario para Añadir Carta a la Colección** - DONE
- [x] **Interfaz de Usuario para Visualizar y Gestionar la Colección** - DONE
- [x] **Implementación de Pruebas de Integración para Endpoints de Colección** - DONE ✅

### 🎯 Historia Actual (Sprint 3)
- [🔄] **Filtrar la colección de cartas por expansión (solo expansiones presentes en mi colección)** - DOING

### ✅ Bug Resuelto
- [x] **Bug de login resuelto** ✅

### 📋 Pendientes Sprint 3
- [ ] **Configuración de Jest/React Testing Library para Pruebas Unitarias Frontend** - ToDo
- [ ] **Configuración Inicial de SonarQube para Análisis de Código** - ToDo
- [ ] **Configuración de GitHub Actions para CI (Pruebas y Linter)** - ToDo
- [ ] **Pruebas funcionales de gestión de colección** - ToDo

---

## 📋 SPRINT 4 - TODO

### Reportes y Despliegue Inicial
- [ ] **Backend para Reporte: Expansiones con Más Cartas** - ToDo
- [ ] **Backend para Reporte: Cartas Más Repetidas** - ToDo
- [ ] **Backend para Reporte: Pokemones Más Repetidos (por nombre de Pokémon)** - ToDo
- [ ] **Página de Reportes: Expansiones y Cartas Repetidas** - ToDo
- [ ] **Configuración de BigQuery para Almacenamiento de Datos de Uso** - ToDo
- [ ] **Configuración Inicial de Cuenta AWS y Credenciales** - ToDo
- [ ] **Despliegue Básico de la Aplicación en AWS (EC2/ECS Fargate - opción inicial)** - ToDo
- [ ] **Configuración de PostgreSQL en AWS RDS (para entorno de desarrollo)** - ToDo
- [ ] **Pruebas End-to-End con Cypress/Playwright (Componentes Core)** - ToDo

---

## 📋 SPRINT 5 - TODO

### Decks Ganadores y Búsqueda Avanzada
- [ ] **Diseño del Modelo de Datos para Decks Ganadores** - ToDo
- [ ] **Implementación de Servicio de Scraping/API Externa para Decks Ganadores (Investigación)** - ToDo
- [ ] **Endpoint Backend para Carga Manual/Inicial de Decks Ganadores** - ToDo
- [ ] **Backend para Añadir Atributos Avanzados de Carta (API Pokémon TCG)** - ToDo
- [ ] **Endpoint Backend para Búsqueda Avanzada de Cartas en la Colección** - ToDo
- [ ] **Interfaz de Usuario para Búsqueda Avanzada en la Colección** - ToDo
- [ ] **Configuración de GitHub Actions para CD (Despliegue a Entorno de Desarrollo)** - ToDo
- [ ] **Documentación de la API Backend con Swagger/OpenAPI** - ToDo

---

## 📋 SPRINT 6 - TODO

### Recomendaciones y Monitoreo
- [ ] **Implementación de la Lógica de Recomendación de Decks (Versión 1)** - ToDo
- [ ] **Endpoint Backend para Recomendación de Decks** - ToDo
- [ ] **Interfaz de Usuario para Visualizar Recomendaciones de Decks** - ToDo
- [ ] **Configuración de Logging Centralizado (CloudWatch Logs en AWS)** - ToDo
- [ ] **Implementación de Métricas Básicas (Prometheus/Grafana - Alternativa: CloudWatch Metrics)** - ToDo
- [ ] **Pruebas de Rendimiento Básicas (JMeter/Locust - para endpoints clave)** - ToDo
- [ ] **Documentación de la Arquitectura del Sistema (Diagramas)** - ToDo

---

## 📋 SPRINT 7 - TODO

### Infraestructura como Código y Seguridad
- [ ] **Gestión de la Infraestructura en AWS con Terraform (VPC, Subnets, Security Groups)** - ToDo
- [ ] **Gestión de la Base de Datos PostgreSQL con Terraform (RDS)** - ToDo
- [ ] **Despliegue de Aplicación con Terraform (ECR, ECS Fargate/EKS - Avanzado)** - ToDo
- [ ] **Implementación de Pruebas de Seguridad Básicas (OWASP ZAP/Snyk - Integración CI)** - ToDo
- [ ] **Configuración de BigQuery para Almacenamiento de Datos de Uso** - ToDo
- [ ] **Envío de Datos de Uso desde el Backend a BigQuery** - ToDo
- [ ] **Documentación del Proceso de Despliegue con Terraform** - ToDo

---

## 📋 SPRINT 8 - TODO

### Analytics, ML y Finalización
- [ ] **Dashboard de Reportes de Uso en BigQuery/Looker Studio** - ToDo
- [ ] **Backend para Reporte: Valor Estimado de la Colección** - ToDo
- [ ] **Refinamiento de la Lógica de Recomendación de Decks (Machine Learning - Opcional Avanzado)** - ToDo
- [ ] **Automatización de la Recolección de Decks Ganadores (Scheduler)** - ToDo
- [ ] **Monitoreo de Errores y Alertas (Sentry/Datadog - free tiers)** - ToDo
- [ ] **Pruebas A/B Testing (Concepto y Configuración)** - ToDo
- [ ] **Creación del Informe Final del Proyecto (Estructura y Contenido)** - ToDo
- [ ] **Revisión y Mejora Continua de la Documentación** - ToDo
- [ ] **Sesiones de Retrospectiva y Lecciones Aprendidas (Internas)** - ToDo

---

## 🐛 BUGS CONOCIDOS

- [x] **Login redirige al formulario tras iniciar sesión exitosamente** - RESUELTO ✅
  - ~~Problema: Tras login exitoso, el usuario es redirigido de vuelta al formulario de login~~
  - ~~Posible causa: Token inválido o problema en flujo de autenticación~~
  - **Estado: RESUELTO**
  - **Solución: Login fresh con token válido**

---

## 🔬 TESTS IMPLEMENTADOS

### ✅ Tests de Autenticación (Sprint 2) - DONE
- [x] `test_obtain_token_with_valid_credentials`
- [x] `test_obtain_token_with_invalid_credentials`
- [x] `test_access_protected_endpoint_without_token`
- [x] `test_access_protected_endpoint_with_valid_token`
- [x] `test_access_protected_endpoint_with_invalid_token`

### ✅ Tests de Integración (Sprint 3) - DONE ✅
- [x] **Implementación de Pruebas de Integración para Endpoints de Colección** - DONE ✅
  - **CA1:** Tests de Listado de Colección (3 tests) ✅
  - **CA2:** Tests de Añadir Carta (3 tests) ✅
  - **CA3:** Tests de Actualización de Carta (3 tests) ✅
  - **CA4:** Tests de Eliminación de Carta (3 tests) ✅
  - **CA5:** Tests de Favoritos (implementados previamente) ✅
  - **CA6:** Tests de Autorización y Seguridad (2 tests) ✅
  - **CA7:** Tests de Validación de Datos (4 tests) ✅
  - **CA8:** Tests de Integración Completa (1 test CRUD workflow) ✅
  - **Total:** 19 tests de integración pasando ✅

### 🔄 Tests en Progreso (Sprint 3)
- [🔄] **Configuración de Jest/React Testing Library para Pruebas Unitarias Frontend** - DOING

### 📋 Tests Pendientes
- [ ] **Pruebas funcionales de autenticación y registro** - ToDo (Sprint 2)
- [ ] **Pruebas funcionales de gestión de colección** - ToDo (Sprint 3)
- [ ] **Pruebas End-to-End con Cypress/Playwright (Componentes Core)** - ToDo (Sprint 4)
- [ ] **Pruebas de Rendimiento Básicas (JMeter/Locust)** - ToDo (Sprint 6)
- [ ] **Implementación de Pruebas de Seguridad Básicas (OWASP ZAP/Snyk)** - ToDo (Sprint 7)

---

## 📝 NOTAS TÉCNICAS

### Arquitectura Actual
- **Backend:** Django + DRF + PostgreSQL
- **Frontend:** React + Vite + Axios
- **Autenticación:** JWT con SimpleJWT
- **Containerización:** Docker + Docker Compose
- **Testing:** pytest para backend + 19 tests de integración funcionando

### Tecnologías Planificadas
- **AWS:** EC2/ECS Fargate, RDS, CloudWatch
- **Analytics:** BigQuery, Looker Studio
- **CI/CD:** GitHub Actions, SonarQube
- **IaC:** Terraform
- **Monitoreo:** Prometheus/Grafana o CloudWatch
- **ML:** Sistema de recomendaciones de decks
- **Seguridad:** OWASP ZAP, Snyk

### Decisiones de Diseño
- Uso de axios interceptors para manejo global de errores 401
- Separación clara entre modelos Card (catálogo) y UserCard (colección personal)
- Enfoque en testing desde etapas tempranas del desarrollo
- Arquitectura preparada para escalabilidad en AWS
- Implementación gradual de features ML/AI en sprints finales
- **Tests de integración completos** para todos los endpoints de colección

---

## 📈 PROGRESO POR SPRINT

| Sprint | Completado | En Progreso | Pendiente | Total | % Completado |
|--------|------------|-------------|-----------|-------|--------------|
| 1      | 9          | 0           | 0         | 9     | 100%         |
| 2      | 15         | 0           | 1         | 16    | 94%          |
| 3      | 7          | 1           | 3         | 11    | 64%          |
| 4      | 0          | 0           | 9         | 9     | 0%           |
| 5      | 0          | 0           | 8         | 8     | 0%           |
| 6      | 0          | 0           | 7         | 7     | 0%           |
| 7      | 0          | 0           | 7         | 7     | 0%           |
| 8      | 0          | 0           | 9         | 9     | 0%           |

**Total:** 31 completadas, 1 en progreso, 43 pendientes (75 historias)  
**Progreso General:** 41% completado

---

## 🎯 PRÓXIMOS PASOS

### 🔄 Inmediatos (Sprint 3) - Historia Actual
- [🔄] **Configuración de Jest/React Testing Library para Pruebas Unitarias Frontend** - DOING

### Criterios de Aceptación
- **CA1:** Jest está configurado en el proyecto React para ejecutar tests unitarios
- **CA2:** React Testing Library está instalado y configurado para testing de componentes
- **CA3:** Se puede ejecutar `npm test` y los tests básicos funcionan
- **CA4:** Existe al menos un test de ejemplo funcionando para un componente
- **CA5:** Los tests se pueden ejecutar tanto en desarrollo como en CI

### 📋 Corto Plazo (Sprint 3 Restante)
1. **Configurar SonarQube** para análisis de código
2. **Configurar GitHub Actions** para CI (Pruebas y Linter)
3. **Implementar pruebas funcionales** de gestión de colección

### 📋 Mediano Plazo (Sprint 4)
1. **Implementar reportes básicos** (expansiones, cartas repetidas)
2. **Configurar despliegue en AWS** (cuenta, credenciales, RDS)
3. **Implementar tests End-to-End** con Cypress/Playwright

### 📌 Comandos de Testing
- **Tests de autenticación:** `docker exec -it pokemon-tcg-ai-generator-web-1 pytest pokemon_tcg_ai/auth_api/test_auth.py -v`
- **Tests de integración:** `docker exec -it pokemon-tcg-ai-generator-web-1 pytest collection_manager/tests/test_integration.py -v`
- **Todos los tests:** `docker exec -it pokemon-tcg-ai-generator-web-1 pytest -v`