# 🥗 **Documentação Técnica — NutriFind Smart Eats**

## 🏷️ **Visão Geral do Projeto**

**NutriFind Smart Eats** é um aplicativo web responsivo desenvolvido para ajudar usuários a encontrar alimentos saudáveis, alinhados às suas preferências alimentares, restrições (como alergias) e dietas específicas. O app também conecta usuários a fornecedores, lojas físicas, e oferece parcerias com academias. Inclui funcionalidades como leitura inteligente de rótulos, comparação de preços e localização dos melhores pontos de venda.

---

## 🎯 **Objetivos Principais**

* Facilitar o acesso a alimentos saudáveis.
* Personalização com base na dieta e restrições do usuário.
* Conectar usuários a fornecedores, mercados e academias locais.
* Fornecer leitura inteligente de rótulos nutricionais.
* Ajudar na escolha dos melhores preços e locais.

---

## 🎨 **Design e Paleta de Cores**

* **Primária:** `#706f18` (Verde oliva escuro — confiança e sustentabilidade)
* **Secundária:** `#98a550` (Verde folha — saúde e frescor)
* **Background/Realce:** `#fff5bb` (Amarelo pastel — leveza e energia)

### 🖥️ Responsividade

* Mobile-first.
* Totalmente adaptável para tablets e desktops.
* UI amigável, acessível (WCAG AA), botões grandes, espaços bem definidos e navegação intuitiva.

---

## 🗺️ **Estrutura das Páginas**

| Página                        | Funcionalidade                                                                             |
| ----------------------------- | ------------------------------------------------------------------------------------------ |
| **Home**                      | Visão geral, busca rápida, filtros rápidos e mapa de localização.                          |
| **Cadastro de Perfil**        | Dieta, alergias, preferências, login social (Google, Facebook) ou e-mail.                  |
| **Busca Personalizada**       | Filtro avançado por ingredientes, alergias, preferências, fornecedores e preços.           |
| **Leitor de Rótulos**         | Upload ou foto do rótulo → IA extrai e analisa informações nutricionais e destaca alertas. |
| **Resultados de Busca**       | Lista com produtos, fornecedores, preços, localização, informações nutricionais e selos.   |
| **Conexão com Academias**     | Lista de academias parceiras próximas, integração com promoções ou planos especiais.       |
| **Carrinho/Lista de Compras** | Organização dos itens escolhidos, sugestões de troca mais saudáveis, comparação de preços. |
| **Mapa de Localização**       | Integração com Google Maps para exibir lojas, mercados e academias próximas.               |
| **Perfil do Usuário**         | Gerenciamento de informações, preferências, histórico de buscas e configurações.           |

---

## 🧠 **Funcionalidades Detalhadas**

### 🔍 **Filtro Inteligente de Busca**

* ✔️ Por dieta: Low Carb, Vegano, Vegetariano, Cetogênico, Sem Glúten, etc.
* ✔️ Por alergias: Lactose, Glúten, Oleaginosas, Mariscos, Soja, entre outros.
* ✔️ Ingredientes específicos: "Sem açúcar", "Sem conservantes", "Com proteína X".
* ✔️ Por localização: Mercados, fornecedores locais, entregas próximas.
* ✔️ Por preço: Ordenação do menor para maior ou vice-versa.

### 📦 **Conexão com Fornecedores e Lojas**

* API para integrar com:

  * Lojas online (Mercado Livre, Shopee, etc.)
  * Mercados locais via Google Places API
  * Estoques de fornecedores parceiros (via API privada ou pública).

### 🔗 **Parceria com Academias**

* Listagem de academias próximas.
* Integração com ofertas e descontos.
* Filtros por modalidades (crossfit, musculação, yoga, pilates, etc.).

### 📄 **Leitura de Rótulos (Inteligência Artificial)**

* Upload de imagem do rótulo.
* Extração automática de:

  * Lista de ingredientes.
  * Informações nutricionais (calorias, gorduras, açúcares, proteínas).
  * Selos de qualidade (orgânico, vegano, sem glúten, etc.).
* Alerta se contém algum ingrediente incompatível com o perfil do usuário.

### 📍 **Mapa Interativo**

* Localização de:

  * Lojas físicas.
  * Fornecedores locais.
  * Academias parceiras.
* Rotas otimizadas.

### 🛒 **Comparação de Preços**

* Mostra:

  * Menor preço disponível.
  * Disponibilidade em estoque.
  * Tempo de entrega (se online).
* Botão “Adicionar ao carrinho” ou “Ir para loja”.

---

## 🧑‍💻 **Funcionalidade dos Botões e Interações**

| Botão                     | Ação                                                           |
| ------------------------- | -------------------------------------------------------------- |
| **Buscar**                | Realiza busca personalizada considerando todos os filtros.     |
| **Aplicar Filtros**       | Atualiza os resultados com base nos filtros selecionados.      |
| **Adicionar ao Carrinho** | Adiciona o item na lista de compras do usuário.                |
| **Comparar Preços**       | Mostra tabela comparativa dos preços entre fornecedores.       |
| **Ler Rótulo**            | Abre interface para upload ou foto → IA processa rótulo.       |
| **Localizar no Mapa**     | Abre mapa com localização dos fornecedores ou academias.       |
| **Salvar Preferências**   | Atualiza o perfil do usuário com dieta, alergias e interesses. |
| **Conectar com Academia** | Redireciona para planos especiais ou contato com academia.     |
| **Finalizar Compra**      | Processa carrinho, redireciona para checkout ou site parceiro. |
| **Voltar**                | Retorna à página anterior mantendo filtros ativos.             |

---

## 🔗 **API e Integrações**

* **Google Maps API:** Localização de mercados, fornecedores e academias.
* **OpenFoodFacts API:** Leitura e extração de informações de alimentos.
* **Mercado Livre/Shopee API:** Para integração de preços e disponibilidade.
* **Lovable API:** Gerenciamento de dados do usuário, autenticação e armazenamento de preferências.
* **Firebase (ou Supabase)**: Autenticação, banco de dados e storage de imagens (se necessário).

---

## 🗺️ **Fluxo do Usuário (User Flow)**

1. **Home → Cadastro/Login → Perfil de Dieta/Alergias → Busca Personalizada → Resultado → Detalhes/Mapa → Carrinho → Checkout**
2. **Home → Leitor de Rótulos → Resultado com alertas nutricionais**
3. **Home → Buscar → Academias Parceiras → Plano/Contato**

---

## 🔐 **Segurança e Privacidade**

* Criptografia de dados sensíveis.
* Conformidade com LGPD.
* Opção para o usuário exportar ou deletar seus dados.

---

## 🚀 **Performance e Responsividade**

* Mobile-first.
* Otimizado com lazy loading, compressão de imagens e pré-carregamento de dados.
* Design leve e acessível.
* PWA (Progressive Web App) opcional.

---

## 🔧 **Tecnologias Sugeridas**

* **Frontend:** React, Next.js, Tailwind CSS (cores alinhadas com o design proposto).
* **Backend:** Node.js + Express (ou APIs no Lovable).
* **Banco:** Firebase, Supabase ou PostgreSQL.
* **IA para leitura de rótulos:** TensorFlow\.js + OCR API (ou Google Vision API).
* **Hospedagem:** Vercel, Netlify ou no próprio Lovable.

---

## 🔗 Frase para Documentação com Link**
Acesse e explore o NutriFind Smart Eats, uma plataforma desenvolvida para facilitar a busca por alimentos saudáveis, com filtros inteligentes, leitura de rótulos e conexão com fornecedores e academias.
Acesse aqui: https://nutri-find-smart-eats.lovable.app/

