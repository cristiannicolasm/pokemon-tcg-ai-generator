**Summary:**
Ejemplo de summary 🔄

**Descripción:**

Como desarrollador, quiero tener tests end-to-end que validen los flujos completos de usuario para añadir y eliminar cartas de la colección, para asegurar que la integración completa funciona correctamente desde la perspectiva del usuario final.**

Implementar tests E2E usando Cypress que simulen la interacción real del usuario con la aplicación, validando flujos completos desde la selección de expansión hasta la confirmación de operaciones de añadir y eliminar cartas.

**Criterios de Aceptación:**
CA1 Tests E2E cubren flujo completo de añadir carta (seleccionar expansión → seleccionar carta → añadir → verificar en colección)
CA2 Tests E2E cubren flujo de eliminar carta (ver colección → seleccionar carta → eliminar → verificar eliminación)
CA3 Verificar persistencia de datos (backend) y actualización de UI
CA4 Usar Cypress para E2E
CA5 Mínimo 2 tests críticos con casos exitosos y de error
CA6 Tests independientes ejecutables en entorno aislado con mocks de API