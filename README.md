# 🔍 GDorker

**Pesquise como um profissional** - Uma ferramenta web intuitiva para construir Google Dorks avançadas sem precisar memorizar sintaxes complexas.

## 📋 Sobre o Projeto

O GDorker é uma aplicação web que permite criar queries de busca avançadas para o Google (conhecidas como "Google Dorks") através de uma interface visual simples e intuitiva. Ideal para jornalistas, pesquisadores, analistas de segurança, acadêmicos e qualquer pessoa que precisa fazer buscas precisas na web.

### ✨ Principais Funcionalidades

- 🎯 **Interface Visual**: Construa queries complexas sem conhecer sintaxe
- 🧩 **Sistema de Blocos**: Adicione e remova operadores visualmente
- ⚡ **Preview em Tempo Real**: Veja como sua query ficará antes de pesquisar
- 🛡️ **Validações Inteligentes**: Evita combinações inválidas automaticamente
- 📋 **Copiar & Pesquisar**: Copie a query ou abra diretamente no Google
- 🌐 **100% Client-Side**: Funciona offline após carregamento

### 🎛️ Operadores Suportados

| Operador        | Descrição          | Exemplo                  |
| --------------- | ------------------ | ------------------------ |
| `"frase exata"` | Busca frase exata  | `"relatório anual 2024"` |
| `OR`            | Combina termos     | `(pdf OR docx)`          |
| `-termo`        | Exclui termos      | `-senha`                 |
| `site:`         | Site específico    | `site:gov.br`            |
| `-site:`        | Excluir site       | `-site:wikipedia.org`    |
| `filetype:`     | Tipo de arquivo    | `filetype:pdf`           |
| `inurl:`        | Termo na URL       | `inurl:login`            |
| `intitle:`      | Termo no título    | `intitle:relatório`      |
| `intext:`       | Termo no corpo     | `intext:financeiro`      |
| `after:`        | Após data          | `after:2023-01-01`       |
| `before:`       | Antes da data      | `before:2024-12-31`      |
| `cache:`        | Versão em cache    | `cache:exemplo.com`      |
| `related:`      | Sites relacionados | `related:github.com`     |

## 🚀 Como Usar

1. **Acesse a ferramenta** (localmente ou hospedada)
2. **Digite um termo base** (opcional) no primeiro campo
3. **Selecione um operador** no dropdown
4. **Digite o valor** correspondente
5. **Clique em "Adicionar bloco"** para incluir na query
6. **Repita** quantas vezes precisar
7. **Copie a query** ou **abra diretamente no Google**

### Exemplo Prático

Para buscar relatórios anuais em PDFs de sites governamentais brasileiros após 2023:

1. Termo base: `relatório anual`
2. Adicionar bloco: `Site específico` → `gov.br`
3. Adicionar bloco: `Grupo de arquivos` → `pdf;docx`
4. Adicionar bloco: `Após data` → `2023-01-01`

**Resultado**: `relatório anual site:gov.br (filetype:pdf OR filetype:docx) after:2023-01-01`

## 🛠️ Instalação e Execução

### Pré-requisitos

- Qualquer navegador web moderno

### Executar Localmente

1. **Clone o repositório**:

```bash
git clone https://github.com/eukevintt/gdorker.git
cd gdorker
```

2. **Abra o arquivo HTML**:
   - Abra `index.html` diretamente no navegador

## 📁 Estrutura do Projeto

```
gdorker/
├── index.html          # Página principal
├── css/
│   └── app.css        # Estilos da aplicação
├── js/
│   └── app.js         # Lógica da aplicação
├── img/               # Imagens (se houver)
├── LICENSE            # Licença do projeto
└── README.md          # Este arquivo
```

## 🔧 Tecnologias Utilizadas

- **HTML5** - Estrutura semântica
- **CSS3** - Estilização moderna e responsiva
- **JavaScript (Vanilla)** - Lógica da aplicação

## 🤝 Como Contribuir

1. **Fork** o projeto
2. **Crie uma branch** para sua feature (`git checkout -b feature/nova-funcionalidade`)
3. **Commit** suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. **Push** para a branch (`git push origin feature/nova-funcionalidade`)
5. **Abra um Pull Request**

## 🐛 Reportar Bugs

Encontrou um problema? [Abra uma issue](https://github.com/eukevintt/gdorker/issues) com:

- Descrição clara do problema
- Passos para reproduzir
- Comportamento esperado vs. atual
- Screenshots (se aplicável)
- Navegador e versão

## 📝 Licença

Este projeto está sob a licença [MIT](LICENSE). Veja o arquivo `LICENSE` para mais detalhes.

## 📞 Contato

- **Autor**: [linkedin](https://www.linkedin.com/in/kevin-araujo-3b19b314b/)
- **Projeto**: [gdorker](https://github.com/eukevintt/gdorker)

---

⭐ **Gostou do projeto? Deixe uma estrela!** ⭐
