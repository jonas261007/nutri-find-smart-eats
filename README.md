# 🥗 **Documentação Técnica — NutriFind**

## 🏷️ **Visão Geral do Projeto**

**NutriFind** é um aplicativo web responsivo desenvolvido para ajudar usuários a encontrar alimentos saudáveis, alinhados às suas preferências alimentares, restrições (como alergias) e dietas específicas. O app também conecta usuários a fornecedores, lojas físicas, profissionais nutricionistas e oferece parcerias com academias. Inclui funcionalidades como leitura inteligente de rótulos, comparação de preços e localização dos melhores pontos de venda.

---

## 🎯 **Objetivos Principais**

* Facilitar o acesso a alimentos saudáveis.
* Personalização com base na dieta e restrições do usuário.
* Conectar usuários a fornecedores, mercados, nutricionistas e academias locais.
* Fornecer leitura inteligente de rótulos nutricionais.
* Ajudar na escolha dos melhores preços e locais.
* Agendar consultas com nutricionistas de forma prática.

---

## 🎨 **Design e Paleta de Cores**

* **Primária:** `#706f18` (Verde oliva escuro — confiança e sustentabilidade)
* **Secundária:** `#98a550` (Verde folha — saúde e frescor)
* **Background/Realce:** `#fff5bb` (Amarelo pastel — leveza e energia)

### 🖥️ Responsividade

* Mobile-first.
* Totalmente adaptável para tablets e desktops.
* UI amigável, acessível (WCAG AA), botões grandes, espaços bem definidos e navegação intuitiva.

> 🚩 **Correção Aplicada:** O botão **“Melhor Avaliado”** foi ajustado para ser totalmente responsivo, sem causar scroll lateral indesejado na página.

---

## 🗺️ **Estrutura das Páginas**

| Página                           | Funcionalidade                                                                                 |
| -------------------------------- | ---------------------------------------------------------------------------------------------- |
| **Home**                         | Visão geral, busca rápida, filtros, mapa de localização e botão para agendar consultas.        |
| **Cadastro**                     | Formulário com nome, e-mail, senha, confirmação, celular e seleção (nutricionista ou usuário). |
| **Login**                        | Autenticação por e-mail e senha.                                                               |
| **Perfil do Nutricionista**      | Foto, nome, CRN, biografia, especialidades, avaliações, contatos e botão “Marcar Consulta”.    |
| **Agendamento de Consulta**      | Escolher nutricionista, data, horário e confirmar o agendamento.                               |
| **Cadastro de Perfil Alimentar** | Dieta, alergias, preferências, login social (Google, Facebook) ou e-mail.                      |
| **Busca Personalizada**          | Filtro avançado por ingredientes, alergias, preferências, fornecedores e preços.               |
| **Leitor de Rótulos**            | Upload ou foto do rótulo → IA extrai e analisa informações nutricionais e destaca alertas.     |
| **Resultados de Busca**          | Lista com produtos, fornecedores, preços, localização, informações nutricionais e selos.       |
| **Conexão com Academias**        | Lista de academias parceiras próximas, integração com promoções ou planos especiais.           |
| **Carrinho/Lista de Compras**    | Organização dos itens escolhidos, sugestões de troca mais saudáveis, comparação de preços.     |
| **Mapa de Localização**          | Integração com Google Maps para exibir lojas, mercados, nutricionistas e academias próximas.   |
| **Perfil do Usuário**            | Gerenciamento de informações, preferências, histórico de buscas, agendamentos e configurações. |

---

## 🧠 **Funcionalidades Detalhadas**

### 🔍 **Filtro Inteligente de Busca**

*(Mantém todas as funcionalidades descritas anteriormente)*

### 📅 **Agendamento de Consultas com Nutricionistas**

* Escolher nutricionista pela lista ou busca.
* Visualizar perfil completo, avaliações e disponibilidade.
* Selecionar data e horário disponíveis.
* Receber confirmação da consulta por e-mail ou na própria plataforma.

### 🧑‍⚕️ **Perfil do Nutricionista**

* Foto de perfil, nome, CRN, biografia, especialidades e formas de contato.
* Exibição de avaliações dos usuários.
* Botão **“Marcar Consulta”** diretamente no perfil.

### 📄 **Leitura Inteligente de Rótulos**

*(Mantém todas as funcionalidades anteriores de IA + OCR)*

### 📍 **Mapa Interativo**

*(Mantém funcionalidades anteriores com inclusão de nutricionistas no mapa)*

---

## 🧑‍💻 **Funcionalidade dos Botões e Interações**

| Botão                     | Ação                                                                       |
| ------------------------- | -------------------------------------------------------------------------- |
| **Buscar**                | Realiza busca personalizada considerando todos os filtros.                 |
| **Aplicar Filtros**       | Atualiza os resultados com base nos filtros selecionados.                  |
| **Adicionar ao Carrinho** | Adiciona o item na lista de compras do usuário.                            |
| **Comparar Preços**       | Mostra tabela comparativa dos preços entre fornecedores.                   |
| **Ler Rótulo**            | Abre interface para upload ou foto → IA processa rótulo.                   |
| **Localizar no Mapa**     | Abre mapa com localização dos fornecedores, academias ou nutricionistas.   |
| **Salvar Preferências**   | Atualiza o perfil do usuário com dieta, alergias e interesses.             |
| **Conectar com Academia** | Redireciona para planos especiais ou contato com academia.                 |
| **Marcar Consulta**       | Abre o formulário de agendamento com o nutricionista selecionado.          |
| **Confirmar Agendamento** | Valida os dados e salva a consulta no sistema.                             |
| **Login/Cadastrar**       | Autenticação e registro na plataforma.                                     |
| **Finalizar Compra**      | Processa carrinho, redireciona para checkout ou site parceiro.             |
| **Voltar**                | Retorna à página anterior mantendo filtros ativos ou retorna ao dashboard. |

---

## 🔗 **API e Integrações**

*(Mantém as APIs anteriores + integração específica para cadastro, login e agendamento de consultas via Lovable ou backend personalizado.)*

---

## 🗺️ **Fluxo do Usuário (User Flow)**

1. **Home → Cadastro/Login → Perfil do Usuário ou Perfil de Nutricionista → Agendar Consulta → Confirmação**
2. **Home → Cadastro de Perfil Alimentar → Busca Personalizada → Resultado → Detalhes/Mapa → Carrinho → Checkout**
3. **Home → Leitor de Rótulos → Resultado com alertas nutricionais**
4. **Home → Buscar → Academias Parceiras → Plano/Contato**

---

## 🔐 **Segurança e Privacidade**

*(Mantém os mesmos critérios anteriores — LGPD, criptografia e segurança de dados)*

---

## 🚀 **Performance e Responsividade**

* Mobile-first com foco em PWA (Progressive Web App).
* 🚩 **Correção aplicada:** O botão **“Melhor Avaliado”** está ajustado e não gera mais scroll lateral.

---

## 🔧 **Tecnologias Sugeridas**

*(Mantém as anteriores)*

---

## 🔗 **Frase para Documentação com Link**

Acesse e explore o NutriFind, uma plataforma desenvolvida para facilitar a busca por alimentos saudáveis, com filtros inteligentes, leitura de rótulos, conexão com nutricionistas, fornecedores e academias.
Acesse aqui: [https://nutri-find-smart-eats.lovable.app/](https://nutri-find-smart-eats.lovable.app/)
