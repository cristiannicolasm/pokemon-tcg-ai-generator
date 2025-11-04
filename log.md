time="2025-10-30T20:33:18-03:00" level=warning msg="C:\\Users\\Cris\\Desktop\\pokemon-tcg-ai-generator\\docker-compose.yml: the attribute `version` is obsolete, it will be ignored, please remove it to avoid potential confusion"
Compose can now delegate builds to bake for better performance.
 To do so, set COMPOSE_BAKE=true.
[+] Building 30.1s (14/14) FINISHED                                                     docker:desktop-linux
 => [web internal] load build definition from Dockerfile                                                0.0s
 => => transferring dockerfile: 1.36kB                                                                  0.0s
 => [web internal] load metadata for docker.io/library/python:3.10-slim-buster                          1.4s
 => [web internal] load .dockerignore                                                                   0.0s
 => => transferring context: 2B                                                                         0.0s
 => [web 1/8] FROM docker.io/library/python:3.10-slim-buster@sha256:37aa274c2d001f09b14828450d903c55f8  0.1s
 => => resolve docker.io/library/python:3.10-slim-buster@sha256:37aa274c2d001f09b14828450d903c55f821c9  0.1s
 => [web internal] load build context                                                                   2.2s
 => => transferring context: 4.33MB                                                                     2.2s
 => CACHED [web 2/8] WORKDIR /app                                                                       0.0s
 => CACHED [web 3/8] RUN apt-get update && apt-get install -y postgresql-client     && rm -rf /var/lib  0.0s
 => CACHED [web 4/8] COPY requirements.txt /app/                                                        0.0s
 => CACHED [web 5/8] RUN pip install --no-cache-dir -r requirements.txt                                 0.0s
 => CACHED [web 6/8] COPY wait-for-db.sh /usr/local/bin/                                                0.0s
 => CACHED [web 7/8] RUN chmod +x /usr/local/bin/wait-for-db.sh                                         0.0s
 => [web 8/8] COPY . /app/                                                                              4.7s
 => [web] exporting to image                                                                           21.5s
 => => exporting layers                                                                                12.1s
 => => exporting manifest sha256:71e832f3b252c94a795f9e3d13f24e575837f3e5b4b91237efff849b94ba36c4       0.0s
 => => exporting config sha256:fd46b3af90bfe7ec2992724e65398ae0edb88f6a4c48d96ee08064564787cf88         0.0s
 => => exporting attestation manifest sha256:d397b9eb7c11f610bd023da8f9bb6f7e22be9d771bf20f44b615b7b61  0.0s
 => => exporting manifest list sha256:1015dd2992693dd8be2b5c147ed5ba4b425d76608fd53d3c09d30957eda03dce  0.0s
 => => naming to docker.io/library/pokemon-tcg-ai-generator-web:latest                                  0.0s
 => => unpacking to docker.io/library/pokemon-tcg-ai-generator-web:latest                               9.2s
 => [web] resolving provenance for metadata file                                                        0.0s
[+] Running 1/1
 ✔ web  Built                                                                                           0.0s 
time="2025-10-30T20:33:49-03:00" level=warning msg="Found orphan containers ([pokemon-tcg-ai-generator-web-ru[+] Running 4/4) for this project. If you removed or renamed this service in your compose file, you can run t
 ✔ web                                       Built                                                      0.0s 
 ✔ Container pokemon-tcg-ai-generator-db-1   Running                                                    0.0s 
 ✔ Container pokemon-tcg-ai-generator-web-1  Recreated                                                  2.3s 
 ✔ Container cypress                         Created                                                    0.0s 
Attaching to cypress
cypress  |
cypress  | DevTools listening on ws://127.0.0.1:39253/devtools/browser/6d210ece-bef3-4691-8972-089002faed82
cypress  | libva error: vaGetDriverNameByIndex() failed with unknown libva error, driver_name = (null)       
cypress  | [215:1030/233353.634730:ERROR:gpu_memory_buffer_support_x11.cc(44)] dri3 extension not supported.
cypress  | The firefoxGcInterval configuration option was removed in Cypress version 8.0.0. It was introduced to work around a bug in Firefox 79 and below.
cypress  | 
cypress  | Since Cypress no longer supports Firefox 85 and below in Cypress Cypress version 8.0.0, this option was removed.                                                                                               
cypress  | 
cypress  | You can safely remove this option from your config.
cypress  |                                                                                                   
cypress  | ====================================================================================================
cypress  | 
cypress  |   (Run Starting)
cypress  |                                                                                                   
cypress  |   ┌────────────────────────────────────────────────────────────────────────────────────────────────┐                                                                                                           
cypress  |   │ Cypress:        12.17.4                                                                        │                                                                                                           
cypress  |   │ Browser:        Electron 106 (headless)                                                        │                                                                                                           
cypress  |   │ Node Version:   v20.5.0 (/usr/local/bin/node)                                                  │                                                                                                           
cypress  |   │ Specs:          5 found (addUserCard.cy.js, cardDetailsModal.cy.js, deleteUserCard.cy.js, spec │                                                                                                           
cypress  |   │                 .cy.js, test-setup.cy.js)                                                      │                                                                                                           
cypress  |   │ Searched:       cypress**/*.cy.{js,jsx,ts,tsx}                                                 │                                                                                                           
cypress  |   │ Experiments:    experimentalMemoryManagement=true                                              │                                                                                                           
cypress  |   └────────────────────────────────────────────────────────────────────────────────────────────────┘                                                                                                           
cypress  | 
cypress  |                                                                                                   
cypress  | ────────────────────────────────────────────────────────────────────────────────────────────────────                                                                                                           
cypress  |                                                                                                                                                                                                                
cypress  |   Running:  addUserCard.cy.js                                                               (1 of 5)                                                                                                           
cypress  | 
cypress  | 
cypress  |   Flujo E2E - Añadir Carta a la Colección                                                         
cypress  |     (Attempt 1 of 3) añade una carta y la muestra en la colección                                 
cypress  |     (Attempt 2 of 3) añade una carta y la muestra en la colección
cypress  |     1) "before each" hook for "añade una carta y la muestra en la colección"
cypress  | 
cypress  | 
cypress  |   0 passing (2s)                                                                                  
cypress  |   1 failing
cypress  | 
cypress  |   1) Flujo E2E - Añadir Carta a la Colección
cypress  |        "before each" hook for "añade una carta y la muestra en la colección":                     
cypress  |      CypressError: `cy.visit()` failed trying to load:
cypress  |                                                                                                   
cypress  | http://web:8000/login
cypress  |                                                                                                   
cypress  | The response we received from your web server was:
cypress  |                                                                                                   
cypress  |   > 400: Bad Request
cypress  |                                                                                                   
cypress  | This was considered a failure because the status code was not `2xx`.
cypress  |                                                                                                   
cypress  | If you do not want status codes to cause failures pass the option: `failOnStatusCode: false`      
cypress  | 
cypress  | Because this error occurred during a `before each` hook we are skipping the remaining tests in the current suite: `Flujo E2E - Añadir Carta a ...`                                                             
cypress  |       at <unknown> (http://web:8000/__cypress/runner/cypress_runner.js:130296:76)
cypress  |       at visitFailedByErr (http://web:8000/__cypress/runner/cypress_runner.js:129704:12)          
cypress  |       at <unknown> (http://web:8000/__cypress/runner/cypress_runner.js:130279:13)                 
cypress  |       at tryCatcher (http://web:8000/__cypress/runner/cypress_runner.js:1807:23)                  
cypress  |       at Promise._settlePromiseFromHandler (http://web:8000/__cypress/runner/cypress_runner.js:1519:31)                                                                                                        
cypress  |       at Promise._settlePromise (http://web:8000/__cypress/runner/cypress_runner.js:1576:18)
cypress  |       at Promise._settlePromise0 (http://web:8000/__cypress/runner/cypress_runner.js:1621:10)
cypress  |       at Promise._settlePromises (http://web:8000/__cypress/runner/cypress_runner.js:1697:18)
cypress  |       at _drainQueueStep (http://web:8000/__cypress/runner/cypress_runner.js:2407:12)             
cypress  |       at _drainQueue (http://web:8000/__cypress/runner/cypress_runner.js:2400:9)
cypress  |       at Async._drainQueues (http://web:8000/__cypress/runner/cypress_runner.js:2416:5)           
cypress  |       at Async.drainQueues (http://web:8000/__cypress/runner/cypress_runner.js:2286:14)
cypress  |   From Your Spec Code:
cypress  |       at Context.eval (webpack://pokemon-tcg-frontend/./cypress/support/commands.js:28:5)         
cypress  | 
cypress  |                                                                                                   
cypress  | 
cypress  |                                                                                                   
cypress  |   (Results)
cypress  |                                                                                                   
cypress  |   ┌────────────────────────────────────────────────────────────────────────────────────────────────┐                                                                                                           
cypress  |   │ Tests:        2                                                                                │                                                                                                           
cypress  |   │ Passing:      0                                                                                │                                                                                                           
cypress  |   │ Failing:      1                                                                                │                                                                                                           
cypress  |   │ Pending:      0                                                                                │                                                                                                           
cypress  |   │ Skipped:      1                                                                                │                                                                                                           
cypress  |   │ Screenshots:  3                                                                                │                                                                                                           
cypress  |   │ Video:        true                                                                             │                                                                                                           
cypress  |   │ Duration:     1 second                                                                         │
cypress  |   │ Spec Ran:     addUserCard.cy.js                                                                │                                                                                                           
cypress  |   └────────────────────────────────────────────────────────────────────────────────────────────────┘                                                                                                           
cypress  | 
cypress  | 
cypress  |   (Screenshots)
cypress  |                                                                                                   
cypress  |   -  /e2e/cypress/screenshots/addUserCard.cy.js/Flujo E2E - Añadir Carta a la Colecci     (1280x720)                                                                                                           
cypress  |      ón -- añade una carta y la muestra en la colección (failed).png                              

cypress  |   -  /e2e/cypress/screenshots/addUserCard.cy.js/Flujo E2E - Añadir Carta a la Colecci     (1280x720)
cypress  |      ón -- añade una carta y la muestra en la colección (failed) (attempt 2).png                                                                                                                               
cypress  |   -  /e2e/cypress/screenshots/addUserCard.cy.js/Flujo E2E - Añadir Carta a la Colecci     (1280x720)                                                                                                           
cypress  |      ón -- añade una carta y la muestra en la colección -- before each hook (failed)                                                                                                                           
cypress  |      (attempt 3).png                                                                                                                                                                                           
cypress  | 
cypress  |                                                                                                   
cypress  |   (Video)
cypress  |                                                                                                   
cypress  |   -  Started compressing: Compressing to 32 CRF                                                                                                                                                                
cypress  |   -  Finished compressing: 0 seconds
cypress  | 
cypress  |   -  Video output: /e2e/cypress/videos/addUserCard.cy.js.mp4
cypress  | 
cypress  | 
cypress  | ────────────────────────────────────────────────────────────────────────────────────────────────────
cypress  |                                                                                                                                                                                                                
cypress  |   Running:  cardDetailsModal.cy.js                                                          (2 of 5)                                                                                                           
cypress  | 
cypress  | 
cypress  |   CardDetailsModal - Acciones de instancia                                                        
cypress  |     (Attempt 1 of 3) muestra los botones de favorito y eliminar para cada instancia
cypress  |     (Attempt 2 of 3) muestra los botones de favorito y eliminar para cada instancia
cypress  |     1) "before each" hook for "muestra los botones de favorito y eliminar para cada instancia"
cypress  | 
cypress  | 
cypress  |   0 passing (2s)
cypress  |   1 failing                                                                                       
cypress  | 
cypress  |   1) CardDetailsModal - Acciones de instancia
cypress  |        "before each" hook for "muestra los botones de favorito y eliminar para cada instancia":   
cypress  |      CypressError: `cy.visit()` failed trying to load:
cypress  |                                                                                                   
cypress  | http://web:8000/login
cypress  |                                                                                                   
cypress  | The response we received from your web server was:
cypress  |                                                                                                   
cypress  |   > 400: Bad Request
cypress  |                                                                                                   
cypress  | This was considered a failure because the status code was not `2xx`.
cypress  | 
cypress  | If you do not want status codes to cause failures pass the option: `failOnStatusCode: false`      
cypress  | 
cypress  | Because this error occurred during a `before each` hook we are skipping the remaining tests in the current suite: `CardDetailsModal - Acciones...`                                                             
cypress  |       at <unknown> (http://web:8000/__cypress/runner/cypress_runner.js:130296:76)
cypress  |       at visitFailedByErr (http://web:8000/__cypress/runner/cypress_runner.js:129704:12)
cypress  |       at <unknown> (http://web:8000/__cypress/runner/cypress_runner.js:130279:13)                 
cypress  |       at tryCatcher (http://web:8000/__cypress/runner/cypress_runner.js:1807:23)
cypress  |       at Promise._settlePromiseFromHandler (http://web:8000/__cypress/runner/cypress_runner.js:1519:31)                                                                                                        
cypress  |       at Promise._settlePromise (http://web:8000/__cypress/runner/cypress_runner.js:1576:18)
cypress  |       at Promise._settlePromise0 (http://web:8000/__cypress/runner/cypress_runner.js:1621:10)     
cypress  |       at Promise._settlePromises (http://web:8000/__cypress/runner/cypress_runner.js:1697:18)
cypress  |       at _drainQueueStep (http://web:8000/__cypress/runner/cypress_runner.js:2407:12)             
cypress  |       at _drainQueue (http://web:8000/__cypress/runner/cypress_runner.js:2400:9)
cypress  |       at Async._drainQueues (http://web:8000/__cypress/runner/cypress_runner.js:2416:5)           
cypress  |       at Async.drainQueues (http://web:8000/__cypress/runner/cypress_runner.js:2286:14)
cypress  |   From Your Spec Code:                                                                            
cypress  |       at Context.eval (webpack://pokemon-tcg-frontend/./cypress/support/commands.js:28:5)         
cypress  | 
cypress  |                                                                                                   
cypress  | 
cypress  |                                                                                                   
cypress  |   (Results)
cypress  | 
cypress  |   ┌────────────────────────────────────────────────────────────────────────────────────────────────┐                                                                                                           
cypress  |   │ Tests:        2                                                                                │                                                                                                           
cypress  |   │ Passing:      0                                                                                │                                                                                                           
cypress  |   │ Failing:      1                                                                                │                                                                                                           
cypress  |   │ Pending:      0                                                                                │                                                                                                           
cypress  |   │ Skipped:      1                                                                                │                                                                                                           
cypress  |   │ Screenshots:  3                                                                                │                                                                                                           
cypress  |   │ Video:        true                                                                             │                                                                                                           
cypress  |   │ Duration:     1 second                                                                         │                                                                                                           
cypress  |   │ Spec Ran:     cardDetailsModal.cy.js                                                           │                                                                                                           
cypress  |   └────────────────────────────────────────────────────────────────────────────────────────────────┘                                                                                                           
cypress  | 
cypress  |                                                                                                   
cypress  |   (Screenshots)                                                                                   
cypress  | 
cypress  |   -  /e2e/cypress/screenshots/cardDetailsModal.cy.js/CardDetailsModal - Acciones de i     (1280x720)                                                                                                           
cypress  |      nstancia -- muestra los botones de favorito y eliminar para cada instancia (fail                                                                                                                          
cypress  |      ed).png                                                                                                                                                                                                   
cypress  |   -  /e2e/cypress/screenshots/cardDetailsModal.cy.js/CardDetailsModal - Acciones de i     (1280x720)                                                                                                           
cypress  |      nstancia -- muestra los botones de favorito y eliminar para cada instancia (fail                                                                                                                          
cypress  |      ed) (attempt 2).png                                                                                                                                                                                       
cypress  |   -  /e2e/cypress/screenshots/cardDetailsModal.cy.js/CardDetailsModal - Acciones de i     (1280x720)                                                                                                           
cypress  |      nstancia -- muestra los botones de favorito y eliminar para cada instancia -- be                                                                                                                          
cypress  |      fore each hook (failed) (attempt 3).png                                                                                                                                                                   
cypress  | 
cypress  |                                                                                                   
cypress  |   (Video)                                                                                         
cypress  |                                                                                                   
cypress  |   -  Started compressing: Compressing to 32 CRF                                                                                                                                                                
cypress  |   -  Finished compressing: 0 seconds
cypress  | 
cypress  |   -  Video output: /e2e/cypress/videos/cardDetailsModal.cy.js.mp4
cypress  | 
cypress  |                                                                                                   
cypress  | ────────────────────────────────────────────────────────────────────────────────────────────────────                                                                                                           
cypress  |                                                                                                                                                                                                                
cypress  |   Running:  deleteUserCard.cy.js                                                            (3 of 5)                                                                                                           
cypress  | 
cypress  | 
cypress  |   Flujo E2E - Eliminar Carta de la Colección                                                      
cypress  |     (Attempt 1 of 3) elimina una carta y verifica que desaparece de la colección
cypress  |     (Attempt 2 of 3) elimina una carta y verifica que desaparece de la colección
cypress  |     1) "before each" hook for "elimina una carta y verifica que desaparece de la colección"
cypress  | 
cypress  | 
cypress  |   0 passing (1s)
cypress  |   1 failing
cypress  |                                                                                                   
cypress  |   1) Flujo E2E - Eliminar Carta de la Colección                                                   
cypress  |        "before each" hook for "elimina una carta y verifica que desaparece de la colección":
cypress  |      CypressError: `cy.visit()` failed trying to load:
cypress  |                                                                                                   
cypress  | http://web:8000/login
cypress  |                                                                                                   
cypress  | The response we received from your web server was:                                                
cypress  | 
cypress  |   > 400: Bad Request                                                                              
cypress  | 
cypress  | This was considered a failure because the status code was not `2xx`.                              
cypress  | 
cypress  | If you do not want status codes to cause failures pass the option: `failOnStatusCode: false`      
cypress  |                                                                                                   
cypress  | Because this error occurred during a `before each` hook we are skipping the remaining tests in the current suite: `Flujo E2E - Eliminar Carta ...`                                                             
cypress  |       at <unknown> (http://web:8000/__cypress/runner/cypress_runner.js:130296:76)
cypress  |       at visitFailedByErr (http://web:8000/__cypress/runner/cypress_runner.js:129704:12)
cypress  |       at <unknown> (http://web:8000/__cypress/runner/cypress_runner.js:130279:13)                 
cypress  |       at tryCatcher (http://web:8000/__cypress/runner/cypress_runner.js:1807:23)                  
cypress  |       at Promise._settlePromiseFromHandler (http://web:8000/__cypress/runner/cypress_runner.js:1519:31)                                                                                                        
cypress  |       at Promise._settlePromise (http://web:8000/__cypress/runner/cypress_runner.js:1576:18)
cypress  |       at Promise._settlePromise0 (http://web:8000/__cypress/runner/cypress_runner.js:1621:10)     
cypress  |       at Promise._settlePromises (http://web:8000/__cypress/runner/cypress_runner.js:1697:18)
cypress  |       at _drainQueueStep (http://web:8000/__cypress/runner/cypress_runner.js:2407:12)             
cypress  |       at _drainQueue (http://web:8000/__cypress/runner/cypress_runner.js:2400:9)
cypress  |       at Async._drainQueues (http://web:8000/__cypress/runner/cypress_runner.js:2416:5)           
cypress  |       at Async.drainQueues (http://web:8000/__cypress/runner/cypress_runner.js:2286:14)
cypress  |   From Your Spec Code:                                                                            
cypress  |       at Context.eval (webpack://pokemon-tcg-frontend/./cypress/support/commands.js:28:5)         
cypress  | 
cypress  |                                                                                                   
cypress  |                                                                                                   
cypress  | 
cypress  |   (Results)
cypress  | 
cypress  |   ┌────────────────────────────────────────────────────────────────────────────────────────────────┐                                                                                                           
cypress  |   │ Tests:        1                                                                                │                                                                                                           
cypress  |   │ Passing:      0                                                                                │                                                                                                           
cypress  |   │ Failing:      1                                                                                │                                                                                                           
cypress  |   │ Pending:      0                                                                                │                                                                                                           
cypress  |   │ Skipped:      0                                                                                │                                                                                                           
cypress  |   │ Screenshots:  3                                                                                │                                                                                                           
cypress  |   │ Video:        true                                                                             │                                                                                                           
cypress  |   │ Duration:     1 second                                                                         │
cypress  |   │ Spec Ran:     deleteUserCard.cy.js                                                             │                                                                                                           
cypress  |   └────────────────────────────────────────────────────────────────────────────────────────────────┘                                                                                                           
cypress  | 
cypress  |                                                                                                   
cypress  |   (Screenshots)
cypress  |                                                                                                   
cypress  |   -  /e2e/cypress/screenshots/deleteUserCard.cy.js/Flujo E2E - Eliminar Carta de la C     (1280x720)                                                                                                           
cypress  |      olección -- elimina una carta y verifica que desaparece de la colección (failed)                                                                                                                          
cypress  |      .png                                                                                                                                                                                                      
cypress  |   -  /e2e/cypress/screenshots/deleteUserCard.cy.js/Flujo E2E - Eliminar Carta de la C     (1280x720)                                                                                                           
cypress  |      olección -- elimina una carta y verifica que desaparece de la colección (failed)                                                                                                                          
cypress  |       (attempt 2).png                                                                                                                                                                                          
cypress  |   -  /e2e/cypress/screenshots/deleteUserCard.cy.js/Flujo E2E - Eliminar Carta de la C     (1280x720)                                                                                                           
cypress  |      olección -- elimina una carta y verifica que desaparece de la colección -- befor                                                                                                                          
cypress  |      e each hook (failed) (attempt 3).png                                                                                                                                                                      
cypress  | 
cypress  | 
cypress  |   (Video)                                                                                         
cypress  | 
cypress  |   -  Started compressing: Compressing to 32 CRF                                                                                                                                                                
cypress  |   -  Finished compressing: 0 seconds
cypress  | 
cypress  |   -  Video output: /e2e/cypress/videos/deleteUserCard.cy.js.mp4
cypress  |                                                                                                   
cypress  | 
cypress  | ────────────────────────────────────────────────────────────────────────────────────────────────────                                                                                                           
cypress  |                                                                                                                                                                                                                
cypress  |   Running:  spec.cy.js                                                                      (4 of 5)                                                                                                           
cypress  | 
cypress  | 
cypress  |   template spec
cypress  |     ✓ passes (830ms)
cypress  | 
cypress  | 
cypress  |   1 passing (5s)                                                                                  
cypress  | 
cypress  |                                                                                                   
cypress  |   (Results)
cypress  | 
cypress  |   ┌────────────────────────────────────────────────────────────────────────────────────────────────┐                                                                                                           
cypress  |   │ Tests:        1                                                                                │                                                                                                           
cypress  |   │ Passing:      1                                                                                │                                                                                                           
cypress  |   │ Failing:      0                                                                                │                                                                                                           
cypress  |   │ Pending:      0                                                                                │                                                                                                           
cypress  |   │ Skipped:      0                                                                                │                                                                                                           
cypress  |   │ Screenshots:  0                                                                                │                                                                                                           
cypress  |   │ Video:        true                                                                             │                                                                                                           
cypress  |   │ Duration:     4 seconds                                                                        │                                                                                                           
cypress  |   │ Spec Ran:     spec.cy.js                                                                       │                                                                                                           
cypress  |   └────────────────────────────────────────────────────────────────────────────────────────────────┘                                                                                                           
cypress  | 
cypress  | 
cypress  |   (Video)                                                                                         
cypress  | 
cypress  |   -  Started compressing: Compressing to 32 CRF                                                                                                                                                                
cypress  |   -  Finished compressing: 1 second
cypress  | 
cypress  |   -  Video output: /e2e/cypress/videos/spec.cy.js.mp4
cypress  |                                                                                                   
cypress  | 
cypress  | ────────────────────────────────────────────────────────────────────────────────────────────────────                                                                                                           
cypress  |                                                                                                                                                                                                                
cypress  |   Running:  test-setup.cy.js                                                                (5 of 5)
cypress  | 
cypress  | 
cypress  |   Verificación de Setup de Cypress
cypress  |     (Attempt 1 of 3) debe poder acceder al frontend en localhost:5173
cypress  |     (Attempt 2 of 3) debe poder acceder al frontend en localhost:5173
cypress  |     1) debe poder acceder al frontend en localhost:5173
cypress  |     (Attempt 1 of 3) debe poder encontrar elementos básicos de la app
cypress  |     (Attempt 2 of 3) debe poder encontrar elementos básicos de la app
cypress  |     2) debe poder encontrar elementos básicos de la app
cypress  |     ✓ cypress está funcionando correctamente (102ms)
cypress  | 
cypress  | 
cypress  |   1 passing (5s)
cypress  |   2 failing
cypress  |                                                                                                   
cypress  |   1) Verificación de Setup de Cypress
cypress  |        debe poder acceder al frontend en localhost:5173:                                          
cypress  |      CypressError: `cy.visit()` failed trying to load:
cypress  |                                                                                                   
cypress  | http://localhost:5173/                                                                            
cypress  | 
cypress  | We attempted to make an http request to this URL but the request failed without a response.       
cypress  |                                                                                                   
cypress  | We received this error at the network level:
cypress  |                                                                                                   
cypress  |   > Error: connect ECONNREFUSED 127.0.0.1:5173                                                    
cypress  | 
cypress  | Common situations why this would fail:                                                            
cypress  |   - you don't have internet access
cypress  |   - you forgot to run / boot your web server                                                      
cypress  |   - your web server isn't accessible                                                              
cypress  |   - you have weird network configuration settings on your computer                                
cypress  |       at <unknown> (http://web:8000/__cypress/runner/cypress_runner.js:130312:74)
cypress  |       at visitFailedByErr (http://web:8000/__cypress/runner/cypress_runner.js:129704:12)          
cypress  |       at <unknown> (http://web:8000/__cypress/runner/cypress_runner.js:130311:11)                 
cypress  |       at tryCatcher (http://web:8000/__cypress/runner/cypress_runner.js:1807:23)
cypress  |       at Promise._settlePromiseFromHandler (http://web:8000/__cypress/runner/cypress_runner.js:1519:31)                                                                                                        
cypress  |       at Promise._settlePromise (http://web:8000/__cypress/runner/cypress_runner.js:1576:18)
cypress  |       at Promise._settlePromise0 (http://web:8000/__cypress/runner/cypress_runner.js:1621:10)     
cypress  |       at Promise._settlePromises (http://web:8000/__cypress/runner/cypress_runner.js:1697:18)     
cypress  |       at _drainQueueStep (http://web:8000/__cypress/runner/cypress_runner.js:2407:12)
cypress  |       at _drainQueue (http://web:8000/__cypress/runner/cypress_runner.js:2400:9)                  
cypress  |       at Async._drainQueues (http://web:8000/__cypress/runner/cypress_runner.js:2416:5)           
cypress  |       at Async.drainQueues (http://web:8000/__cypress/runner/cypress_runner.js:2286:14)
cypress  |   From Your Spec Code:                                                                            
cypress  |       at Context.eval (webpack://pokemon-tcg-frontend/./cypress/e2e/test-setup.cy.js:13:7)        
cypress  |   
cypress  |   From Node.js Internals:                                                                         
cypress  |     Error: connect ECONNREFUSED 127.0.0.1:5173                                                    
cypress  |         at TCPConnectWrap.afterConnect [as oncomplete] (node:net:1187:16)
cypress  |                                                                                                   
cypress  |   2) Verificación de Setup de Cypress                                                             
cypress  |        debe poder encontrar elementos básicos de la app:
cypress  |      CypressError: `cy.visit()` failed trying to load:                                            
cypress  | 
cypress  | http://localhost:5173/                                                                            
cypress  |                                                                                                   
cypress  | We attempted to make an http request to this URL but the request failed without a response.
cypress  |                                                                                                   
cypress  | We received this error at the network level:                                                      
cypress  | 
cypress  |   > Error: connect ECONNREFUSED 127.0.0.1:5173                                                    
cypress  | 
cypress  | Common situations why this would fail:                                                            
cypress  |   - you don't have internet access                                                                
cypress  |   - you forgot to run / boot your web server
cypress  |   - your web server isn't accessible                                                              
cypress  |   - you have weird network configuration settings on your computer                                
cypress  |       at <unknown> (http://web:8000/__cypress/runner/cypress_runner.js:130312:74)                 
cypress  |       at visitFailedByErr (http://web:8000/__cypress/runner/cypress_runner.js:129704:12)
cypress  |       at <unknown> (http://web:8000/__cypress/runner/cypress_runner.js:130311:11)                 
cypress  |       at tryCatcher (http://web:8000/__cypress/runner/cypress_runner.js:1807:23)
cypress  |       at Promise._settlePromiseFromHandler (http://web:8000/__cypress/runner/cypress_runner.js:1519:31)                                                                                                        
cypress  |       at Promise._settlePromise (http://web:8000/__cypress/runner/cypress_runner.js:1576:18)
cypress  |       at Promise._settlePromise0 (http://web:8000/__cypress/runner/cypress_runner.js:1621:10)
cypress  |       at Promise._settlePromises (http://web:8000/__cypress/runner/cypress_runner.js:1697:18)     
cypress  |       at _drainQueueStep (http://web:8000/__cypress/runner/cypress_runner.js:2407:12)             
cypress  |       at _drainQueue (http://web:8000/__cypress/runner/cypress_runner.js:2400:9)                  
cypress  |       at Async._drainQueues (http://web:8000/__cypress/runner/cypress_runner.js:2416:5)
cypress  |       at Async.drainQueues (http://web:8000/__cypress/runner/cypress_runner.js:2286:14)           
cypress  |   From Your Spec Code:                                                                            
cypress  |       at Context.eval (webpack://pokemon-tcg-frontend/./cypress/e2e/test-setup.cy.js:20:7)
cypress  |                                                                                                   
cypress  |   From Node.js Internals:                                                                         
cypress  |     Error: connect ECONNREFUSED 127.0.0.1:5173                                                    
cypress  |         at TCPConnectWrap.afterConnect [as oncomplete] (node:net:1187:16)
cypress  |                                                                                                   
cypress  | 
cypress  | 
cypress  |                                                                                                   
cypress  |   (Results)
cypress  | 
cypress  |   ┌────────────────────────────────────────────────────────────────────────────────────────────────┐                                                                                                           
cypress  |   │ Tests:        3                                                                                │                                                                                                           
cypress  |   │ Passing:      1                                                                                │
cypress  |   │ Failing:      2                                                                                │
cypress  |   │ Pending:      0                                                                                │                                                                                                           
cypress  |   │ Skipped:      0                                                                                │                                                                                                           
cypress  |   │ Screenshots:  6                                                                                │                                                                                                           
cypress  |   │ Video:        true                                                                             │                                                                                                           
cypress  |   │ Duration:     5 seconds                                                                        │                                                                                                           
cypress  |   │ Spec Ran:     test-setup.cy.js                                                                 │                                                                                                           
cypress  |   └────────────────────────────────────────────────────────────────────────────────────────────────┘                                                                                                           
cypress  | 
cypress  |                                                                                                   
cypress  |   (Screenshots)
cypress  |                                                                                                   
cypress  |   -  /e2e/cypress/screenshots/test-setup.cy.js/Verificación de Setup de Cypress -- de     (1280x720)                                                                                                           
cypress  |      be poder acceder al frontend en localhost5173 (failed).png                                   

cypress  |   -  /e2e/cypress/screenshots/test-setup.cy.js/Verificación de Setup de Cypress -- de     (1280x720)                                                                                                           
cypress  |      be poder acceder al frontend en localhost5173 (failed) (attempt 2).png                                                                                                                                    
cypress  |   -  /e2e/cypress/screenshots/test-setup.cy.js/Verificación de Setup de Cypress -- de     (1280x720)                                                                                                           
cypress  |      be poder acceder al frontend en localhost5173 (failed) (attempt 3).png                                                                                                                                    
cypress  |   -  /e2e/cypress/screenshots/test-setup.cy.js/Verificación de Setup de Cypress -- de     (1280x720)                                                                                                           
cypress  |      be poder encontrar elementos básicos de la app (failed).png                                                                                                                                               
cypress  |   -  /e2e/cypress/screenshots/test-setup.cy.js/Verificación de Setup de Cypress -- de     (1280x720)                                                                                                           
cypress  |      be poder encontrar elementos básicos de la app (failed) (attempt 2).png                                                                                                                                   
cypress  |   -  /e2e/cypress/screenshots/test-setup.cy.js/Verificación de Setup de Cypress -- de     (1280x720)                                                                                                           
cypress  |      be poder encontrar elementos básicos de la app (failed) (attempt 3).png                                                                                                                                   
cypress  | 
cypress  |                                                                                                   
cypress  |   (Video)
cypress  |                                                                                                   
cypress  |   -  Started compressing: Compressing to 32 CRF                                                                                                                                                                
cypress  |   -  Finished compressing: 1 second
cypress  | 
cypress  |   -  Video output: /e2e/cypress/videos/test-setup.cy.js.mp4
cypress  | 
cypress  | 
cypress  | ====================================================================================================
cypress  | 
cypress  |   (Run Finished)                                                                                  
cypress  | 
cypress  |                                                                                                   
cypress  |        Spec                                              Tests  Passing  Failing  Pending  Skipped                                                                                                             
cypress  |   ┌────────────────────────────────────────────────────────────────────────────────────────────────┐                                                                                                           
cypress  |   │ ✖  addUserCard.cy.js                        00:01        2        -        1        -        1 │
cypress  |   ├────────────────────────────────────────────────────────────────────────────────────────────────┤                                                                                                           
cypress  |   │ ✖  cardDetailsModal.cy.js                   00:01        2        -        1        -        1 │                                                                                                           
cypress  |   ├────────────────────────────────────────────────────────────────────────────────────────────────┤                                                                                                           
cypress  |   │ ✖  deleteUserCard.cy.js                     00:01        1        -        1        -        - │
cypress  |   ├────────────────────────────────────────────────────────────────────────────────────────────────┤                                                                                                           
cypress  |   │ ✔  spec.cy.js                               00:04        1        1        -        -        - │                                                                                                           
cypress  |   ├────────────────────────────────────────────────────────────────────────────────────────────────┤                                                                                                           
cypress  |   │ ✖  test-setup.cy.js                         00:05        3        1        2        -        - │                                                                                                           
cypress  |   └────────────────────────────────────────────────────────────────────────────────────────────────┘                                                                                                           
cypress  |     ✖  4 of 5 failed (80%)                      00:14        9        2        5        -        2                                                                                                             
cypress  | 
cypress exited with code 5