# Product Backlog - Pokémon TCG AI Generator

## 📊 RESUMEN DEL PROYECTO

**Total de Sprints:** 13 (actualizado desde 10)
**Historias Completadas:** 34  
**Historias en Progreso:** 1  
**Historias Pendientes:** 85 (actualizado desde 57)

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

---

## ✅ SPRINT 3 - DONE

### Gestión de Colección, Tests Frontend y Vista Agrupada
- [x] **Endpoint Backend para Actualizar Detalles de Carta en la Colección** - DONE
- [x] **Endpoint Backend para Eliminar Carta de la Colección** - DONE
- [x] **Endpoint para marcar una carta de la colección como favorita** - DONE
- [x] **Interfaz de Usuario para Añadir Carta a la Colección** - DONE
- [x] **Interfaz de Usuario para Visualizar y Gestionar la Colección** - DONE
- [x] **Implementación de Pruebas de Integración para Endpoints de Colección** - DONE
- [x] **Filtrar la colección de cartas por expansión (solo expansiones presentes en mi colección)** - DONE
- [x] **Configuración de Jest/React Testing Library para Pruebas Unitarias Frontend** - DONE
- [x] **Vista Agrupada de Cartas en la Colección del Usuario (Nuevo Feature)** - DONE
- [x] **Mostrar la imagen de la carta al seleccionarla al agregar una carta en el formulario y mostrar la imagen de la carta en la lista de cartas del usuario** - DONE

---

## 🔄 SPRINT 4 - IN PROGRESS

### Testing E2E - Fundamentos y Cobertura Completa

**Duración estimada:** 2 semanas  
**Puntos totales:** 21  
**Velocity esperado:** 10-11 pts/semana

- [x] **Pruebas funcionales de autenticación y registro** - DONE
- [x] **Setup de Cypress y Configuración Base** - DONE
- [ ] **Tests E2E - Flujo de Añadir Carta a la Colección** - DOING
- [ ] **Tests E2E - Flujo de Eliminar Carta de la Colección** - TODO
- [ ] **Integración de Tests E2E con Docker** - TODO
- [ ] **Reportes y Análisis de Resultados de Tests E2E** - TODO
- [ ] **Documentación Completa de Testing E2E** - TODO
- [ ] **Cierre de Sprint 4 y Actualización de Backlog** - TODO

---

## 📋 SPRINT 5 - TODO

### CI/CD y Deployment en AWS

**Duración estimada:** 2 semanas  
**Puntos totales:** 15  
**Dependencias:** Sprint 4 completado  
**Enfoque:** Solo DevOps e Infraestructura

- [ ] **Configuración de GitHub Actions para CI (Tests Automatizados)** - TODO
- [ ] **Configuración de GitHub Actions para CD (Despliegue Automatizado)** - TODO
- [ ] **Configuración Inicial de Cuenta AWS y Credenciales** - TODO
- [ ] **Despliegue de Backend Django en AWS (EC2/ECS Fargate)** - TODO
- [ ] **Despliegue de Frontend React en AWS (S3 + CloudFront)** - TODO
- [ ] **Configuración de PostgreSQL en AWS RDS** - TODO
- [ ] **Configuración Inicial de SonarQube para Análisis de Código** - TODO
- [ ] **Documentación de Deployment y CI/CD** - TODO

---

## 📋 SPRINT 6 - TODO

### Reportes Backend y Analytics Base

**Duración estimada:** 2 semanas  
**Puntos totales:** 12  
**Dependencias:** Sprint 5 completado  
**Enfoque:** Solo Analytics y Reportes

- [ ] **Backend para Reporte: Expansiones con Más Cartas** - TODO
- [ ] **Backend para Reporte: Cartas Más Repetidas** - TODO
- [ ] **Backend para Reporte: Pokemones Más Repetidos (por nombre de Pokémon)** - TODO
- [ ] **Backend para Reporte: Valor Estimado de la Colección** - TODO
- [ ] **Página de Reportes: Expansiones y Cartas Repetidas** - TODO
- [ ] **Configuración de BigQuery para Almacenamiento de Datos de Uso** - TODO
- [ ] **Dashboard de Reportes Operacionales en Looker Studio** - TODO

---

## 📋 SPRINT 7 - TODO

### Decks Ganadores y Búsqueda Avanzada

**Duración estimada:** 2 semanas  
**Puntos totales:** 18  
**Dependencias:** Sprint 6 completado

- [ ] **Diseño del Modelo de Datos para Decks Ganadores** - TODO
- [ ] **Implementación de Servicio de Scraping/API Externa para Decks Ganadores** - TODO
- [ ] **Endpoint Backend para Carga Manual/Inicial de Decks Ganadores** - TODO
- [ ] **Backend para Añadir Atributos Avanzados de Carta (API Pokémon TCG)** - TODO
- [ ] **Endpoint Backend para Búsqueda Avanzada de Cartas en la Colección** - TODO
- [ ] **Interfaz de Usuario para Búsqueda Avanzada en la Colección** - TODO
- [ ] **Documentación de la API Backend con Swagger/OpenAPI** - TODO

---

## 📋 SPRINT 8 - TODO

### Recomendaciones V1 (Monolito) y Monitoreo

**Duración estimada:** 2 semanas  
**Puntos totales:** 16  
**Dependencias:** Sprint 7 completado

- [ ] **Implementación de la Lógica de Recomendación de Decks (Versión 1 Monolito)** - TODO
  - ⚠️ **NOTA:** Implementación inicial en Django. Se migrará a microservicio en Sprint 9
  - Objetivo: Validar funcionalidad antes de separar arquitectura
- [ ] **Endpoint Django para Recomendación de Decks (Temporal)** - TODO
  - ⚠️ **NOTA:** Se reemplazará por API Gateway en Sprint 10
  - Endpoint: `POST /api/recommendations/`
- [ ] **Interfaz de Usuario para Visualizar Recomendaciones de Decks** - TODO
  - Frontend será reutilizado en Sprint 9 (solo cambia backend)
- [ ] **Configuración de Logging Centralizado (CloudWatch Logs en AWS)** - TODO
- [ ] **Implementación de Métricas Básicas (CloudWatch Metrics)** - TODO
- [ ] **Pruebas de Rendimiento Básicas (JMeter/Locust)** - TODO
  - Incluir benchmark del endpoint de recomendaciones (baseline para comparar en Sprint 9)
- [ ] **Documentación de la Arquitectura del Sistema (Diagramas)** - TODO
  - Incluir diseño de migración a microservicios para Sprint 9

---

## 📋 SPRINT 9 - TODO

### Migración a Microservicios - AI Service

**🎯 Objetivo:**  
Extraer la funcionalidad de recomendaciones de decks del monolito Django a un microservicio independiente usando FastAPI, habilitando escalabilidad independiente y preparando el sistema para features ML avanzados.

**Duración estimada:** 2 semanas  
**Puntos totales:** 20  
**Dependencias:** Sprint 8 completado

- [ ] **Setup AI Service Repository (FastAPI)** - TODO
- [ ] **Migrar Lógica de Recomendaciones a FastAPI** - TODO
- [ ] **Configurar Comunicación Inter-Servicios (Django ↔ AI Service)** - TODO
- [ ] **Setup Redis Cache para Predicciones** - TODO
- [ ] **Contract Testing entre Servicios (Pact)** - TODO
- [ ] **Despliegue AWS Independiente para AI Service** - TODO
- [ ] **Monitoreo Distribuido y Observabilidad** - TODO

---

## 📋 SPRINT 10 - TODO

### Infraestructura como Código (Terraform)

**Duración estimada:** 2 semanas  
**Puntos totales:** 18  
**Dependencias:** Sprint 9 completado

- [ ] **Setup Terraform Project y Estado Remoto (S3 + DynamoDB)** - TODO
- [ ] **Gestión de VPC, Subnets y Security Groups con Terraform** - TODO
  - ⚠️ **ACTUALIZADO:** Incluir configuración para 2 servicios (Django + AI Service)
- [ ] **Gestión de RDS PostgreSQL con Terraform** - TODO
  - Decidir: DB compartida o DB separada para AI Service
- [ ] **Despliegue Multi-Servicio con Terraform (ECR, ECS Fargate)** - TODO
  - ⚠️ **ACTUALIZADO:** 2 task definitions (Django + AI Service)
- [ ] **Configuración de ALB con reglas de enrutamiento** - TODO
  - `/api/recommendations/*` → AI Service
  - `/api/*` → Django Core
- [ ] **API Gateway con autenticación centralizada (Opcional)** - TODO
  - Rate limiting por servicio
- [ ] **Envío de Datos de Uso a BigQuery desde ambos servicios** - TODO
- [ ] **Documentación del Proceso de Despliegue con Terraform** - TODO

---

## 📋 SPRINT 11 - TODO

### Microservicio de Autenticación y OAuth/SSO

**🎯 Objetivo:**  
Extraer la autenticación del monolito Django a un servicio independiente, habilitando OAuth/SSO, rate limiting avanzado y preparando para multi-tenancy.

**Duración estimada:** 2 semanas  
**Puntos totales:** 25  
**Dependencias:** Sprint 10 completado

- [ ] **Setup Auth Service Repository (FastAPI)** - TODO
- [ ] **Migrar Modelos de Usuario a Auth Service** - TODO
- [ ] **Implementar JWT con Refresh Tokens** - TODO
- [ ] **Configurar OAuth2 con Google (Sign in with Google)** - TODO
- [ ] **Configurar OAuth2 con GitHub (Sign in with GitHub)** - TODO
- [ ] **Configurar OAuth2 con Discord (Sign in with Discord)** - TODO
- [ ] **Rate Limiting por Usuario/IP (Redis-based)** - TODO
- [ ] **API Gateway con Autenticación Centralizada** - TODO
- [ ] **Contract Testing (Django ↔ Auth Service)** - TODO
- [ ] **Migración de Datos de Usuarios Existentes** - TODO
- [ ] **Monitoreo de Seguridad (Failed logins, brute force detection)** - TODO
- [ ] **Documentación de OAuth/SSO Implementation** - TODO

---

## 📋 SPRINT 12 - TODO

### Seguridad, Power BI y Analytics Avanzados

**🎯 Objetivo:**  
Implementar auditoría de seguridad completa, dashboards ejecutivos con Power BI, y features ML avanzados en el AI Service.

**Duración estimada:** 2 semanas  
**Puntos totales:** 22  
**Dependencias:** Sprint 11 completado

- [ ] **Implementación de Pruebas de Seguridad (OWASP ZAP)** - TODO
  - ⚠️ **ACTUALIZADO:** Escaneo de los 3 microservicios
- [ ] **Escaneo de Vulnerabilidades con Snyk** - TODO
- [ ] **Auditoría de Seguridad de los 3 Microservicios** - TODO
- [ ] **Setup Power BI Workspace y Licencias** - TODO
- [ ] **Conectores Power BI ↔ BigQuery** - TODO
- [ ] **Dashboard Ejecutivo en Power BI (Métricas de Negocio)** - TODO
- [ ] **Reportes Avanzados con DAX (Análisis de Tendencias)** - TODO
- [ ] **Refinamiento de Modelos ML (Feature Engineering)** - TODO
  - Feature engineering: winrate, sinergias entre cartas, meta analysis
- [ ] **Model Versioning con MLflow** - TODO
  - Versionado de modelos ML y rollback capabilities
- [ ] **A/B Testing entre Modelos de Recomendación** - TODO
  - 50% usuarios ven modelo V1, 50% modelo V2
- [ ] **Automatización de Recolección de Decks Ganadores (Scheduler)** - TODO
- [ ] **Monitoreo de Errores y Alertas (Sentry/Datadog)** - TODO
  - ⚠️ **ACTUALIZADO:** Integrar los 3 servicios

---

## 📋 SPRINT 13 - TODO

### Documentación Final y Cierre del Proyecto

**Duración estimada:** 1 semana  
**Puntos totales:** 8  
**Dependencias:** Sprint 12 completado

- [ ] **Creación del Informe Final del Proyecto** - TODO
  - Incluir sección de arquitectura de microservicios (3 servicios)
- [ ] **Documentación de Arquitectura de Microservicios** - TODO
- [ ] **Guías de OAuth/SSO Implementation (Google, GitHub, Discord)** - TODO
- [ ] **Guía de Power BI Integration y DAX Queries** - TODO
- [ ] **Pruebas de Carga y Stress Testing Final** - TODO
- [ ] **Retrospectiva de Migración a Microservicios** - TODO
  - Incluir lecciones de Auth Service + AI Service
- [ ] **Demo Final del Proyecto (Incluir OAuth/Power BI)** - TODO
- [ ] **Publicación de Documentación en GitHub Pages** - TODO

---

## 📝 NOTAS TÉCNICAS

### Arquitectura Final (Post-Sprint 13)
- **Backend Core:** Django + DRF + PostgreSQL (monolito reducido)
- **AI Service:** FastAPI + Python 3.11 + Redis (microservicio)
- **Auth Service:** FastAPI + OAuth2 + JWT + Redis (microservicio)
- **Frontend:** React + Vite + Axios
- **Autenticación:** Centralizada en Auth Service (OAuth: Google, GitHub, Discord)
- **Containerización:** Docker + Docker Compose (3 servicios)
- **Testing:** 
  - Backend: pytest + pytest-cov
  - Frontend: Jest + React Testing Library
  - E2E: Cypress
  - Contract: Pact (Django ↔ AI Service ↔ Auth Service)

### Tecnologías Implementadas
- **AWS:** EC2/ECS Fargate (3 servicios), RDS, CloudWatch, X-Ray, API Gateway
- **Analytics:** BigQuery, Looker Studio (operacional), Power BI (ejecutivo)
- **CI/CD:** GitHub Actions (multi-repo), SonarQube
- **IaC:** Terraform (multi-servicio, 3 services)
- **Monitoreo:** CloudWatch + X-Ray + Sentry/Datadog
- **ML:** FastAPI + scikit-learn/PyTorch, MLflow, A/B testing
- **Seguridad:** OWASP ZAP, Snyk, OAuth2/SSO
- **E2E Testing:** Cypress (actualizados para microservicios)
- **Cache:** Redis (predicciones ML + rate limiting)
- **OAuth/SSO:** Google, GitHub, Discord integration

### Decisiones de Diseño
- Uso de axios interceptors para manejo global de errores 401
- Separación clara entre modelos Card (catálogo) y UserCard (colección personal)
- **Arquitectura de Microservicios:** 3 servicios especializados
  - **Core Service (Django):** CRUD, colección, reportes básicos
  - **AI Service (FastAPI):** Recomendaciones, ML, análisis avanzado
  - **Auth Service (FastAPI):** Autenticación, autorización, OAuth/SSO
- **API Gateway:** Punto único de entrada con rate limiting
- **Testing Strategy:** Pirámide de tests + Contract testing entre servicios
- **Circuit Breaker Pattern:** Evitar fallos en cascada entre servicios
- **Cache distribuido:** Redis para predicciones ML y sessions
- **Story Splitting:** Historias atómicas de 1-3 días (principio INVEST)
- **Sprint Planning:** Sprints de 2 semanas con velocity tracking
- **Analytics Híbrido:** Looker Studio (operacional) + Power BI (ejecutivo)

### Roadmap de Migración a Microservicios
1. **Sprint 8:** Validar lógica de recomendaciones en monolito (proof of concept)
2. **Sprint 9:** Extraer AI Service como microservicio independiente
3. **Sprint 10:** IaC multi-servicio con Terraform
4. **Sprint 11:** Extraer Auth Service con OAuth/SSO
5. **Sprint 12:** ML avanzado + Power BI + Security audit
6. **Sprint 13:** Documentación final y cierre

### Roadmap de OAuth/SSO
1. **Google OAuth2:** Sign in with Google (más común)
2. **GitHub OAuth2:** Para desarrolladores y tech-savvy users
3. **Discord OAuth2:** Para gaming community (target de TCG)
4. **Rate Limiting:** Prevenir abuse de APIs de OAuth
5. **JWT + Refresh Tokens:** Session management distribuido

---

## 📈 PROGRESO POR SPRINT

| Sprint | Historias | Puntos | Completado | Pendiente | % Completado | Enfoque Principal |
|--------|-----------|--------|------------|-----------|--------------|-------------------|
| 1      | 9         | -      | 9          | 0         | 100%         | Setup + APIs |
| 2      | 15        | -      | 15         | 0         | 100%         | Auth + Frontend |
| 3      | 10        | -      | 10         | 0         | 100%         | Colección + Tests |
| 4      | 8         | 21     | 1          | 7         | 13%          | Testing E2E |
| 5      | 8         | 15     | 0          | 8         | 0%           | CI/CD + AWS |
| 6      | 7         | 12     | 0          | 7         | 0%           | Reportes + Analytics |
| 7      | 7         | 18     | 0          | 7         | 0%           | Decks + Búsqueda |
| 8      | 7         | 16     | 0          | 7         | 0%           | Recomendaciones V1 |
| 9      | 7         | 20     | 0          | 7         | 0%           | AI Microservice |
| 10     | 8         | 18     | 0          | 8         | 0%           | Terraform/IaC |
| 11     | 12        | 25     | 0          | 12        | 0%           | Auth Service + OAuth |
| 12     | 12        | 22     | 0          | 12        | 0%           | Security + Power BI |
| 13     | 8         | 8      | 0          | 8         | 0%           | Documentación final |

**Total:** 118 historias, 175 puntos  
**Completadas:** 35 historias  
**Pendientes:** 83 historias  
**Progreso General:** 30% completado  
**Promedio:** 17.5 pts/sprint (saludable)

---

## 🎯 PRÓXIMOS PASOS

1. 🔄 **Completar Sprint 4** (Testing E2E) ← EN PROGRESO
   - Historia actual: Setup de Cypress (60% completo)
   - Próximo: Tests de Añadir/Eliminar Carta
2. 📅 **Sprint 5** (CI/CD + AWS Deployment)
3. 📅 **Sprint 6** (Reportes + Analytics base)
4. 📅 **Sprint 7** (Decks ganadores + Búsqueda avanzada)
5. 📅 **Sprint 8** (Validar recomendaciones en monolito)
6. 🚀 **Sprint 9** (Migración a AI Microservice) ← Primer punto de inflexión
7. 🏗️ **Sprint 10** (Terraform/IaC multi-servicio)
8. 🔐 **Sprint 11** (Auth Microservice + OAuth/SSO) ← Segundo punto de inflexión
9. 📊 **Sprint 12** (Security + Power BI + ML avanzado)
10. 📚 **Sprint 13** (Documentación final y cierre)

---

## 📚 RECURSOS Y DOCUMENTACIÓN

### Documentación de Arquitectura
- `docs/architecture_monolith.md` - Arquitectura inicial (Sprint 1-8)
- `docs/architecture_microservices.md` - Arquitectura de 3 servicios (post-Sprint 11)
- `docs/migration_guide.md` - Guía de migración monolito → microservicios
- `docs/api-contracts.md` - Contratos entre Django, AI Service y Auth Service
- `docs/oauth_implementation.md` - Guía de OAuth/SSO (Google, GitHub, Discord)
- `docs/powerbi_integration.md` - Integración Power BI + BigQuery
- `docs/testing_strategy.md` - Testing E2E + Contract testing + Security testing

### Repositorios
- **Monolito Core:** `pokemon-tcg-ai-generator` (actual)
- **AI Service:** `pokemon-tcg-ai-service` (a crear en Sprint 9)
- **Auth Service:** `pokemon-tcg-auth-service` (a crear en Sprint 11)

### Referencias Técnicas
- [FastAPI Best Practices](https://fastapi.tiangolo.com/best-practices/)
- [OAuth2 with FastAPI](https://fastapi.tiangolo.com/tutorial/security/oauth2-jwt/)
- [Google OAuth2 Implementation](https://developers.google.com/identity/protocols/oauth2)
- [GitHub OAuth Apps](https://docs.github.com/en/developers/apps/building-oauth-apps)
- [Discord OAuth2](https://discord.com/developers/docs/topics/oauth2)
- [Power BI REST API](https://docs.microsoft.com/en-us/rest/api/power-bi/)
- [BigQuery + Power BI Connector](https://docs.microsoft.com/en-us/power-bi/connect-data/service-google-bigquery-connector)
- [Microservices Pattern: Circuit Breaker](https://martinfowler.com/bliki/CircuitBreaker.html)
- [Contract Testing with Pact](https://docs.pact.io/)
- [AWS ECS Multi-Service Deployment](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/service-load-balancing.html)
- [INVEST Principles for User Stories](https://en.wikipedia.org/wiki/INVEST_(mnemonic))
- [Cypress Best Practices](https://docs.cypress.io/guides/references/best-practices)
- [MLflow Model Versioning](https://mlflow.org/docs/latest/model-registry.html)
- [OWASP ZAP Integration](https://www.zaproxy.org/docs/docker/api-scan/)