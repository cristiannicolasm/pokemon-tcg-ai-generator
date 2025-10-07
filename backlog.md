# Product Backlog - Pokémon TCG AI Generator

## 📊 RESUMEN DEL PROYECTO

**Total de Sprints:** 8  
**Historias Completadas:** 31  
**Historias en Progreso:** 0  
**Historias Pendientes:** 46  

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

## ✅ SPRINT 3 - DONE

### Gestión de Colección y Tests Frontend
- [x] **Endpoint Backend para Actualizar Detalles de Carta en la Colección** - DONE
- [x] **Endpoint Backend para Eliminar Carta de la Colección** - DONE
- [x] **Endpoint para marcar una carta de la colección como favorita** - DONE
- [x] **Interfaz de Usuario para Añadir Carta a la Colección** - DONE
- [x] **Interfaz de Usuario para Visualizar y Gestionar la Colección** - DONE
- [x] **Implementación de Pruebas de Integración para Endpoints de Colección** - DONE
- [x] **Filtrar la colección de cartas por expansión (solo expansiones presentes en mi colección)** - DONE
- [x] **Configuración de Jest/React Testing Library para Pruebas Unitarias Frontend** - DONE
- [ ] **Mostrar la imagen de la carta al seleccionarla al agregar una carta en el formulario y mostrar la imagen de la carta en la lista de cartas del usuario** - DOING

---

## 📋 SPRINT 4 - TODO

### Reportes, Despliegue e Infraestructura de Testing
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
- **Total:** 19 tests de integración

### Tests Frontend React (Sprint 3)
- [x] **Tests de ExpansionFilter Component**
- [x] **Tests de CardSelector Component**
- [x] **Tests de AddCardForm Component**
- [x] **Tests de Integración UserCollection (7 tests)**
- **Total:** 18 tests frontend

### Tests Pendientes
- [ ] **Pruebas funcionales de autenticación y registro** - ToDo
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

---

## 📈 PROGRESO POR SPRINT

| Sprint | Completado | Pendiente | Total | % Completado |
|--------|------------|-----------|-------|--------------|
| 1      | 9          | 0         | 9     | 100%         |
| 2      | 15         | 1         | 16    | 94%          |
| 3      | 9          | 0         | 9     | 100%         |
| 4      | 0          | 12        | 12    | 0%           |
| 5      | 0          | 8         | 8     | 0%           |
| 6      | 0          | 7         | 7     | 0%           |
| 7      | 0          | 7         | 7     | 0%           |
| 8      | 0          | 9         | 9     | 0%           |

**Total:** 33 completadas, 44 pendientes (77 historias totales)  
**Progreso General:** 43% completado

---

## 🎯 PRÓXIMOS PASOS

### Sprint 4 - Listo para Iniciar
1. **Configurar SonarQube** para análisis de código
2. **Configurar GitHub Actions** para CI (Pruebas y Linter)
3. **Implementar reportes básicos** (expansiones, cartas repetidas)
4. **Configurar despliegue en AWS** (cuenta, credenciales, RDS)

### Sprint 5
1. **Implementar Decks Ganadores** (scraping/API externa)
2. **Búsqueda avanzada** en colección
3. **Documentación API** con Swagger

### Comandos de Testing

#### Backend Tests
- **Tests de autenticación:** `docker exec -it pokemon-tcg-ai-generator-web-1 pytest pokemon_tcg_ai/auth_api/test_auth.py -v`
- **Tests de integración:** `docker exec -it pokemon-tcg-ai-generator-web-1 pytest collection_manager/tests/test_integration.py -v`
- **Todos los tests backend:** `docker exec -it pokemon-tcg-ai-generator-web-1 pytest -v`

#### Frontend Tests
- **Todos los tests frontend:** `npm test -- --watchAll=false`
- **Tests específicos:** `npm test -- --testNamePattern="T4.1" --watchAll=false`
- **Con coverage:** `npm test -- --watchAll=false --coverage`

### Formato de ticket Jira:

**Filtrar la colección de cartas por expansión (solo expansiones presentes en mi colección)**

**Como usuario autenticado, quiero que el selector de expansión en mi colección muestre únicamente las expansiones de las cartas que tengo, para poder filtrar y visualizar fácilmente solo las cartas de una expansión específica o ver todas mis cartas a la vez. Así, el filtro será más útil y relevante para mi colección real.**

**Criterios de aceptación (CA):**

**CA1: Endpoint que devuelve solo las expansiones presentes en la colección del usuario**
**CA2: Endpoint que filtra cartas de la colección por expansión específica**
**CA3: Respuesta incluye información de expansión (nombre, total de cartas del usuario en esa expansión)**
**CA4: Dropdown/selector que muestra solo expansiones con cartas en la colección**
**CA5: Al seleccionar una expansión, se filtran las cartas mostradas**
**CA6: Opción "Todas" para mostrar todas las cartas sin filtro**
**CA7: Indicador visual del número de cartas por expansión**

**Tests:**

**T1: Tests unitarios para UserExpansionsView (endpoint /api/user-expansions/)**
**T2: Tests de integración para filtrado de cartas por expansión**
**T3: Tests unitarios para el componente ExpansionFilter (React)**
**T4: Tests de integración para verificar que el filtrado funciona end-to-end**
**T5: Cobertura de tests > 80% para nuevos componentes**
**T6: Verificar que tests existentes siguen pasando**