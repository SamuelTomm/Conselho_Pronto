# Conselho Pronto - Sistema de Gestão Educacional

Sistema completo de gestão educacional desenvolvido para o **Instituto Ivoti**, focado na organização e realização de conselhos de classe e pré-conselhos.

## 🎯 Objetivo

Resolver a desorganização atual onde os professores analisam notas e informações dos alunos em planilhas. O sistema permite que:

- **Professores** vejam apenas seus cursos/turmas para avaliar alunos
- **Administrativo** gerencie permissões e atribuições dos professores
- **Coordenadores** realizem conselhos de classe organizados

## 🚀 Funcionalidades Principais

### 👨‍🏫 **Área do Professor**
- Visualização das turmas e disciplinas atribuídas
- Avaliação de alunos com notas (N1, N2, N3, N4, Recuperação)
- Registro de faltas (justificadas/não justificadas)
- Recomendações para conselho (Aprovado/Recuperação/Reprovado)
- Observações detalhadas sobre cada aluno

### 👨‍💼 **Área Administrativa**
- Gestão completa de professores
- Configuração de permissões por professor
- Atribuição de disciplinas e turmas
- Controle de acesso ao sistema
- Gestão de alunos, cursos e turmas

### 👨‍🎓 **Conselho de Classe**
- Resumo consolidado de todas as avaliações
- Decisão final por aluno
- Relatórios e exportação
- Observações gerais do conselho
- Status de aprovação/reprovação/recuperação

## 🔐 Tipos de Usuário

### **Administrador** (`admin@ivoti.edu.br`)
- Acesso completo ao sistema
- Gestão de professores e permissões
- Configurações gerais

### **Professor** (`professor@ivoti.edu.br`)
- Acesso apenas às suas turmas/disciplinas
- Avaliação de alunos
- Registro de notas e faltas

### **Coordenador** (`coordenador@ivoti.edu.br`)
- Acesso ao conselho de classe
- Decisões finais sobre alunos
- Relatórios e exportação

## 🛠️ Tecnologias Utilizadas

- **Next.js 15** - Framework React
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização
- **Shadcn/ui** - Componentes UI
- **Lucide React** - Ícones

## 📦 Instalação e Execução

```bash
# Instalar dependências
npm install

# Executar em desenvolvimento
npm run dev

# Build para produção
npm run build

# Executar produção
npm start
```

## 🔑 Credenciais de Teste

| Tipo | Email | Senha | Acesso |
|------|-------|-------|--------|
| Admin | `admin@ivoti.edu.br` | `123456` | Dashboard completo |
| Professor | `professor@ivoti.edu.br` | `123456` | Turmas do professor |
| Coordenador | `coordenador@ivoti.edu.br` | `123456` | Conselho de classe |

## 📋 Fluxo de Trabalho

### 1. **Configuração Inicial (Admin)**
- Cadastrar professores
- Atribuir disciplinas e turmas
- Configurar permissões

### 2. **Avaliação (Professor)**
- Acessar turmas atribuídas
- Lançar notas dos alunos
- Registrar faltas
- Fazer recomendações

### 3. **Conselho de Classe (Coordenador)**
- Revisar todas as avaliações
- Definir decisão final
- Gerar relatórios

## 🎨 Interface

- **Design responsivo** para desktop e mobile
- **Interface intuitiva** com navegação clara
- **Cores e ícones** que facilitam a identificação
- **Feedback visual** para ações do usuário

## 📊 Estrutura de Dados

### Aluno
- Informações pessoais
- Matrícula e turma
- Notas por disciplina
- Faltas e justificativas
- Status de avaliação

### Professor
- Dados pessoais
- Disciplinas atribuídas
- Turmas responsável
- Permissões do sistema

### Avaliação
- Notas (N1, N2, N3, N4)
- Recuperação
- Faltas
- Observações
- Recomendação

## 🔄 Próximas Funcionalidades

- [ ] Integração com banco de dados
- [ ] Sistema de notificações
- [ ] Relatórios em PDF
- [ ] Backup automático
- [ ] API REST
- [ ] App mobile

## 📞 Suporte

Para dúvidas ou sugestões, entre em contato com a equipe de desenvolvimento do Instituto Ivoti.

---

**Desenvolvido para o Instituto Ivoti** 🎓
