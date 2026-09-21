<p align="center">
  <img width="330" height="150" alt="logo-verifly" src="https://github.com/user-attachments/assets/d9a506d3-b740-40ef-818d-242359969829" />
</p>

# 🔍 Verifly | Verificador de E-mails em Tempo Real

Um verificador de e-mails de alta precisão, desenvolvido para validar não só a sintaxe, mas a existência real do domínio e o risco de se tratar de um provedor descartável — sem necessidade de cadastro e 100% gratuito.

<br>

Acesse o site em: [Verifly](https://veriflyemailverifier.vercel.app)

<p align="center">

<img width="70" height="70" alt="java-svgrepo" src="https://github.com/user-attachments/assets/28299d70-1bc0-4ed4-9e71-37549f4815d0" />

<img width="70" height="70" alt="spring-boot-svgrepo" src="https://github.com/user-attachments/assets/d4caea1e-8869-4e3e-b284-b5a737c7968b" />

<img width="70" height="70" alt="maven-svgrepo-com" src="https://github.com/user-attachments/assets/cf62bb0f-ceff-4455-abf2-4e38b4ce0b16" />

<!-- <img width="220" height="70" alt="react" src="https://github.com/user-attachments/assets/3a5b2fe2-88c2-4be6-b9ad-f03589d7aa5b" /> -->

<img width="70" height="70" alt="react-svgrepo-com" src="https://github.com/user-attachments/assets/0b68a090-6fb3-4c0d-83f9-24ae039e6b03" />

<img width="70" height="70" alt="vite-svgrepo" src="https://github.com/user-attachments/assets/d01e574b-03ef-4067-bd41-d7d64d73f587" />

<img width="70" height="70" alt="typescript-official-svgrepo-com" src="https://github.com/user-attachments/assets/db85ab32-6811-45af-87a6-3d19d3b27591" />

<img width="70" height="70" alt="html-5-svgrepo-com" src="https://github.com/user-attachments/assets/61350760-93f0-4240-9cb6-f9e79d04774c" />

<img width="70" height="70" alt="css-3-svgrepo-com" src="https://github.com/user-attachments/assets/eca10606-61ea-40db-965f-991563f41871" />

<img width="230" height="70" alt="tailwindcss2-svgrepo" src="https://github.com/user-attachments/assets/222bb634-a695-4dcd-8990-f3675147d795" />


</p>

<p align="center">


<img width="210" height="70" alt="Vercel-white" src="https://github.com/user-attachments/assets/227e13aa-c305-4671-9e92-62ef8a2b333b" />

<img width="250" height="70" alt="render" src="https://github.com/user-attachments/assets/f6a1e874-971f-4428-857b-83fa7edf56a1" />

<img width="190" height="70" alt="docker2-svgrepo" src="https://github.com/user-attachments/assets/9e254935-1396-4695-9726-4d50513305e9" />

<img width="180" height="70" alt="postman2-svgrepo" src="https://github.com/user-attachments/assets/330b59bc-b20f-4100-a47c-c1d06c2b2b63" />

</p>

<br>

<img width="1100" height="500" alt="verifly-screenshot-hero" src="" />

---

Diferente de um simples validador de regex, o Verifly atua em três camadas de verificação — sintaxe, existência real do domínio (consulta nativa a registros MX) e reputação (detecção de provedores de e-mail descartável) — com resposta em milissegundos graças a um cache em memória.

<img width="1100" height="500" alt="verifly-screenshot-lote" src="" />

---

Com suporte nativo a Dark e Light Mode e animações suaves de rolagem, a interface foi pensada para transmitir a mesma confiança de uma ferramenta paga, mesmo sendo gratuita e sem necessidade de conta.

<img width="1100" height="500" alt="verifly-screenshot-theme" src="" />

<br>

# 🎯 Principais Funcionalidades

* **Verificação em 3 Camadas:** Sintaxe (RFC 5322), domínio (consulta nativa a registros MX via DNS, sem dependências externas) e reputação (checagem contra uma lista com mais de 8.900 domínios de e-mail descartável).
* **Fail-Fast Inteligente:** O backend interrompe a verificação assim que uma camada reprova, evitando consultas de rede desnecessárias e mantendo a resposta rápida.
* **Sugestão de Correção (Typo Fix):** Algoritmo de Distância de Levenshtein compara o domínio digitado com os provedores mais populares — incluindo os brasileiros (UOL, BOL, Terra, iG) — e sugere a correção quando detecta um provável erro de digitação.
* **Verificação em Lote (CSV):** Upload de uma planilha com múltiplos e-mails, processados em lote e devolvidos com o status individual de cada um.
* **Cache em Memória (Caffeine):** Domínios já consultados via DNS ficam em cache por 24h, tornando verificações repetidas praticamente instantâneas.
* **Documentação Interativa (Swagger):** API documentada automaticamente via springdoc-openapi.

<br>

# 🏗️ Arquitetura & Tecnologias

O projeto segue os princípios de Clean Architecture, com backend e frontend desacoplados em um monorepo.

### **Backend:**
* **Java 21 & Spring Boot:** Núcleo da API REST, orquestrando as camadas de validação com injeção de dependência.
* **Maven:** Gerenciamento de dependências e build.
* **Caffeine:** Biblioteca de cache em memória de alta performance para os resultados de consulta MX.
* **Apache Commons CSV:** Parsing e geração de relatórios para a verificação em lote.
* **springdoc-openapi:** Geração automática da documentação Swagger da API.
* **JUnit 5 & Mockito:** Testes unitários das regras de validação.

### **Frontend:**
* **React 19 (com TypeScript):** Interface reativa e fortemente tipada, com camada de API própria espelhando os contratos (DTOs) do backend.
* **Vite:** Build tool e servidor de desenvolvimento.
* **Tailwind CSS:** Estilização utilitária com suporte nativo a temas.
* **next-themes:** Gerenciamento de Dark/Light Mode.

<br>

# ☁️ Deploy e Infraestrutura (Produção)

O Verifly está em produção, com backend e frontend hospedados separadamente, refletindo a separação real entre as camadas da aplicação:

* **Backend (Render):** A API em Spring Boot é empacotada em uma imagem Docker (build multi-stage com Maven) e servida como *Web Service* no [Render](https://render.com).
* **Frontend (Vercel):** A interface em React/Vite é publicada no [Vercel](https://vercel.com), com build otimizado e deploy zero-config.
* **CORS Controlado:** A comunicação entre os dois domínios é liberada explicitamente via variável de ambiente no backend (`APP_CORS_ALLOWED_ORIGINS`), sem uso de wildcard aberto.
* **Continuous Deployment (CI/CD):** Backend e frontend estão conectados diretamente ao repositório no GitHub. Cada `git push` na branch `main` dispara redeploy automático e independente em cada plataforma — o Render só reconstrói quando algo muda em `backend/`, e o mesmo filtro é aplicado no Vercel para `frontend/`.
* **Segurança Cloud-Native:** Nenhuma URL de serviço ou credencial é versionada no código; toda configuração de ambiente é injetada via painel de *Environment Variables* de cada plataforma.

<br>


# ⚙️ Como Executar o Projeto Localmente

### **Backend**

```bash
git clone https://github.com/AlysonMLL/verifly-email-verifier.git
cd verifly-email-verifier/backend
./mvnw spring-boot:run
```

Acesse **http://localhost:8080/swagger-ui/index.html** para a documentação interativa da API.

### **Frontend**

```bash
cd verifly-email-verifier/frontend
npm install
npm run dev
```

Acesse **http://localhost:5173** para visualizar a interface.

> Configure a variável `VITE_API_URL` no frontend (arquivo `.env`) apontando para `http://localhost:8080/api/v1` durante o desenvolvimento local.


<p align="center">
  <img src="https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white" />
  <img src="https://img.shields.io/badge/Spring%20Boot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white" />
  <img src="https://img.shields.io/badge/Maven-C71A36?style=for-the-badge&logo=apachemaven&logoColor=white" />
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" />
  <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" />
  <img src="https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=white" />
  <img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" />
  <img src="https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white" />
</p>
