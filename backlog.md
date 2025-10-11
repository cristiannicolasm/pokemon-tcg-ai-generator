# Product Backlog - Pokémon TCG AI Generator

## 📊 RESUMEN DEL PROYECTO

**Total de Sprints:** 8  
**Historias Completadas:** 33  
**Historias en Progreso:** 1  
**Historias Pendientes:** 43  

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

## ✅ SPRINT 2 - DONE ✅

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

---

## ✅ SPRINT 3 - DONE ✅

### Gestión de Colección, Tests Frontend y Vista Agrupada
- [x] **Endpoint Backend para Actualizar Detalles de Carta en la Colección** - DONE
- [x] **Endpoint Backend para Eliminar Carta de la Colección** - DONE
- [x] **Endpoint para marcar una carta de la colección como favorita** - DONE
- [x] **Interfaz de Usuario para Añadir Carta a la Colección** - DONE
- [x] **Interfaz de Usuario para Visualizar y Gestionar la Colección** - DONE
- [x] **Implementación de Pruebas de Integración para Endpoints de Colección** - DONE
- [x] **Filtrar la colección de cartas por expansión (solo expansiones presentes en mi colección)** - DONE ✅
- [x] **Configuración de Jest/React Testing Library para Pruebas Unitarias Frontend** - DONE ✅
- [x] **Vista Agrupada de Cartas en la Colección del Usuario (Nuevo Feature)** - DONE ✅
- [x] **Mostrar la imagen de la carta al seleccionarla al agregar una carta en el formulario y mostrar la imagen de la carta en la lista de cartas del usuario** - DONE ✅

---

## 🚀 SPRINT 4 - IN PROGRESS

### Tests Frontend, Reportes, Despliegue e Infraestructura
- [ ] **Pruebas funcionales de autenticación y registro** - ToDo 🎯
- [ ] **Backend para Reporte: Expansiones con Más Cartas** - ToDo
- [ ] **Backend para Reporte: Cartas Más Repetidas** - ToDo
- [ ] **Backend para Reporte: Pokemones Más Repetidos (por nombre de Pokémon)** - ToDo
- [ ] **Página de Reportes: Expansiones y Cartas Repetidas** - ToDo
- [ ] **Configuración de BigQuery para Almacenamiento de Datos de Uso** - ToDo
- [ ] **Configuración Inicial de Cuenta AWS y Credenciales** - ToDo
- [ ] **Despliegue Básico de la Aplicación en AWS (EC2/ECS Fargate - opción inicial)** - ToDo
- [ ] **Configuración de PostgreSQL en AWS RDS (para entorno de desarrollo)** - ToDo
- [ ] **Configuración Inicial de SonarQube para Análisis de Código** - ToDo
- [ ] **Configuración de GitHub Actions para CI (Pruebas y Linter)** - ToDo
- [ ] **Pruebas funcionales de gestión de colección** - ToDo
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

- [x] **Login redirige al formulario tras iniciar sesión exitosamente** - RESUELTO

---

## 🔬 TESTS IMPLEMENTADOS

### Tests de Autenticación (Sprint 2)
- [x] `test_obtain_token_with_valid_credentials`
- [x] `test_obtain_token_with_invalid_credentials`
- [x] `test_access_protected_endpoint_without_token`
- [x] `test_access_protected_endpoint_with_valid_token`
- [x] `test_access_protected_endpoint_with_invalid_token`

### Tests de Integración Backend (Sprint 3)
- [x] **Tests de Listado de Colección (3 tests)**
- [x] **Tests de Añadir Carta (3 tests)**
- [x] **Tests de Actualización de Carta (3 tests)**
- [x] **Tests de Eliminación de Carta (3 tests)**
- [x] **Tests de Favoritos**
- [x] **Tests de Autorización y Seguridad (2 tests)**
- [x] **Tests de Validación de Datos (4 tests)**
- [x] **Tests de Integración Completa (1 test CRUD workflow)**
- [x] **Tests de Vista Agrupada de Cartas (8 tests)** ✅ NUEVO
- **Total:** 27 tests de integración backend

### Tests Frontend React (Sprint 3)
- [x] **Tests de ExpansionFilter Component**
- [x] **Tests de CardSelector Component**
- [x] **Tests de AddCardForm Component**
- [x] **Tests de Integración UserCollection (8 tests)**
- [x] **Tests de CardDetailsModal Component (8 tests)** ✅ NUEVO
- **Total:** 26 tests frontend

### Tests Pendientes
- [ ] **Pruebas funcionales de autenticación y registro** - ToDo (Sprint 4) 🎯
- [ ] **Pruebas funcionales de gestión de colección** - ToDo
- [ ] **Pruebas End-to-End con Cypress/Playwright** - ToDo
- [ ] **Pruebas de Rendimiento Básicas** - ToDo
- [ ] **Pruebas de Seguridad Básicas** - ToDo

---

## 📝 NOTAS TÉCNICAS

### Arquitectura Actual
- **Backend:** Django + DRF + PostgreSQL
- **Frontend:** React + Vite + Axios
- **Autenticación:** JWT con SimpleJWT
- **Containerización:** Docker + Docker Compose
- **Testing:** pytest para backend + Jest/RTL para frontend

### Nuevas Features Implementadas ✅
- **Vista Agrupada de Cartas:** Endpoint `/api/user-cards/grouped/` que agrupa cartas por tipo y expansión
- **Modal de Detalles:** Componente `CardDetailsModal` para gestionar instancias individuales
- **Gestión Avanzada:** Eliminación y favoritos a nivel de instancia individual
- **Imágenes de Cartas:** Visualización de imágenes tanto en formulario como en colección
- **Filtrado por Expansión:** Solo expansiones presentes en la colección del usuario

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
- **Vista agrupada para mejor UX:** Cartas duplicadas se muestran como grupos con detalles expandibles

---

## 📈 PROGRESO POR SPRINT

| Sprint | Completado | Pendiente | Total | % Completado |
|--------|------------|-----------|-------|--------------|
| 1      | 9          | 0         | 9     | 100%         |
| 2      | 15         | 0         | 15    | 100%         |
| 3      | 10         | 0         | 10    | 100%         |
| 4      | 0          | 13        | 13    | 0%           |
| 5      | 0          | 8         | 8     | 0%           |
| 6      | 0          | 7         | 7     | 0%           |
| 7      | 0          | 7         | 7     | 0%           |
| 8      | 0          | 9         | 9     | 0%           |

**Total:** 34 completadas, 44 pendientes (78 historias totales)  
**Progreso General:** 44% completado

---

## 🎯 PRÓXIMA HISTORIA - SPRINT 4

### 🧪 **Historia Actual: Pruebas funcionales de autenticación y registro**

**Como desarrollador, quiero tener tests funcionales completos para los componentes de autenticación (Login y Register), para asegurar que el flujo de autenticación funciona correctamente y mantener la calidad del código.**

**Criterios de Aceptación:**
- **CA1:** Tests funcionales para componente Login.jsx (renderizado, validación, envío exitoso, manejo de errores)
- **CA2:** Tests funcionales para componente Register.jsx (renderizado, validación, envío exitoso, manejo de errores)
- **CA3:** Tests de integración para flujo completo de autenticación (registro → login → acceso a colección)
- **CA4:** Mocking apropiado de axios y localStorage
- **CA5:** Cobertura de tests > 90% para componentes de autenticación
- **CA6:** Tests deben simular interacciones reales del usuario
- **CA7:** Verificar redirecciones y manejo de estados de loading

### Comandos de Testing

#### Comandos Backend Tests 
- **Tests de autenticación:** `docker exec -it pokemon-tcg-ai-generator-web-1 pytest pokemon_tcg_ai/auth_api/test_auth.py -v`
- **Tests de integración:** `docker exec -it pokemon-tcg-ai-generator-web-1 pytest collection_manager/tests/test_integration.py -v`
- **Tests agrupados:** `docker exec -it pokemon-tcg-ai-generator-web-1 pytest collection_manager/tests/test_user_cards_grouped.py -v`
- **Todos los tests backend:** `docker exec -it pokemon-tcg-ai-generator-web-1 pytest -v`

#### Comandos Frontend Tests
- **Todos los tests frontend:** `npm test -- --watchAll=false`
- **Tests específicos de Login:** `npm test -- --testNamePattern="Login" --watchAll=false`
- **Tests específicos de Register:** `npm test -- --testNamePattern="Register" --watchAll=false`
- **Con coverage:** `npm test -- --watchAll=false --coverage`