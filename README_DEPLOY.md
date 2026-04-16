# Redirecionamento de Domínio - Guia de Deploy e Manutenção

## 📋 Visão Geral

Este é um site estático de redirecionamento que leva visitantes automaticamente para sua loja oficial. Ideal para casos onde o domínio principal é instável ou precisa ser alterado frequentemente.

## 🚀 Deploy na Vercel

### Pré-requisitos
- Conta na Vercel (gratuita em https://vercel.com)
- Repositório Git (GitHub, GitLab ou Bitbucket)

### Passos para Deploy

1. **Preparar o repositório Git**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: redirect site"
   git push origin main
   ```

2. **Conectar à Vercel**
   - Acesse https://vercel.com/new
   - Selecione seu repositório Git
   - Clique em "Import"

3. **Configurar o projeto**
   - **Project Name**: `redirecionamento-loja` (ou seu nome preferido)
   - **Framework Preset**: Deixe em branco (ou selecione "Other")
   - **Build Command**: `pnpm build`
   - **Output Directory**: `dist`
   - **Install Command**: `pnpm install`

4. **Deploy**
   - Clique em "Deploy"
   - Aguarde a conclusão (geralmente 2-3 minutos)
   - Você receberá um URL como: `https://seu-projeto.vercel.app`

## 🔗 Configurar a URL de Redirecionamento

### Método 1: Editar localmente e fazer push
1. Abra o arquivo `client/src/pages/Home.tsx`
2. Localize a linha:
   ```typescript
   const REDIRECT_URL = "https://seu-link-aqui.com";
   ```
3. Substitua pela URL real da sua loja:
   ```typescript
   const REDIRECT_URL = "https://sua-loja-oficial.com.br";
   ```
4. Salve, commit e faça push:
   ```bash
   git add .
   git commit -m "Update redirect URL"
   git push
   ```
5. Vercel fará rebuild automaticamente

### Método 2: Usar variáveis de ambiente (Recomendado)
1. Na dashboard da Vercel, vá para **Settings** → **Environment Variables**
2. Adicione uma nova variável:
   - **Name**: `VITE_REDIRECT_URL`
   - **Value**: `https://sua-loja-oficial.com.br`
3. Clique em "Save"
4. Faça um novo deploy (redeploy)

Para usar variáveis de ambiente, modifique `client/src/pages/Home.tsx`:
```typescript
const REDIRECT_URL = import.meta.env.VITE_REDIRECT_URL || "https://seu-link-aqui.com";
```

## ⏱️ Ajustar o Tempo de Redirecionamento

O redirecionamento automático está configurado para 3 segundos. Para alterar:

1. Abra `client/src/pages/Home.tsx`
2. Localize:
   ```typescript
   const REDIRECT_DELAY = 3000; // 3 segundos em milissegundos
   ```
3. Altere o valor (em milissegundos):
   - 2 segundos: `2000`
   - 5 segundos: `5000`
   - 10 segundos: `10000`

## 🌐 Conectar um Domínio Personalizado

### Na Vercel
1. Vá para **Settings** → **Domains**
2. Clique em "Add Domain"
3. Digite seu domínio (ex: `redirecionamento.seudominio.com.br`)
4. Siga as instruções para configurar os registros DNS

### No seu provedor de domínio
1. Acesse o painel de DNS do seu provedor
2. Adicione um registro **CNAME** apontando para `cname.vercel-dns.com`
3. Aguarde a propagação DNS (pode levar até 48 horas)

## 📊 Monitorar o Tráfego

A Vercel fornece analytics básicos:
1. Dashboard da Vercel → Seu projeto
2. Aba "Analytics" mostra:
   - Requisições
   - Tempo de resposta
   - Erros
   - Localização dos visitantes

## 🔒 Segurança

O site inclui headers de segurança:
- `X-Content-Type-Options: nosniff` - Previne MIME-sniffing
- `X-Frame-Options: DENY` - Previne clickjacking
- Cache otimizado para performance

## 🐛 Troubleshooting

### O redirecionamento não funciona
- Verifique se a URL está correta em `Home.tsx`
- Abra o console do navegador (F12) para ver erros
- Verifique se o site está acessível

### Vercel mostra erro 404
- Certifique-se de que `vercel.json` está no repositório
- Verifique se o `outputDirectory` está correto (`dist`)
- Faça um redeploy manual

### Domínio personalizado não funciona
- Aguarde a propagação DNS (até 48 horas)
- Verifique os registros DNS no seu provedor
- Teste com `nslookup seu-dominio.com`

## 📝 Manutenção Contínua

- **Atualizar URL**: Edite `REDIRECT_URL` quando o domínio mudar
- **Monitorar logs**: Verifique a aba "Logs" na Vercel
- **Testar redirecionamento**: Acesse o site periodicamente
- **Renovar domínio**: Se usar domínio personalizado, renove antes do vencimento

## 🎯 Dicas Úteis

1. **Múltiplos ambientes**: Crie branches diferentes para staging/produção
2. **Rollback rápido**: Vercel mantém histórico de deployments
3. **Monitorar disponibilidade**: Use ferramentas como Uptime Robot
4. **Análise de tráfego**: Integre Google Analytics para dados detalhados

## 📞 Suporte

- **Vercel Docs**: https://vercel.com/docs
- **Suporte Vercel**: https://vercel.com/support
- **Community**: https://github.com/vercel/vercel/discussions

---

**Última atualização**: Abril 2026
**Versão**: 1.0.0
