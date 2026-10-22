# Portfólio — João Vitor Gales

Site estático em HTML, CSS e JavaScript. Não precisa de build, instalação de pacotes ou variáveis de ambiente.

## Executar

```sh
cd /workspace/portfolio
python3 -m http.server 8000 --bind 127.0.0.1
```

## Editar

- `index.html`: dados pessoais, seções, trajetória, projetos e links.
- `style.css`: tokens em `:root`, componentes e breakpoints.
- `script.js`: menu mobile, seção ativa, trajetória expansível, clipboard, partículas e controle de animações.
- `assets/previews`: captura da Dedetizadora e protótipo do TaskFlow; o card da Dedetizadora abre o repositório no GitHub, e o preview do TaskFlow abre a imagem original.
- `DESIGN.md`: direção visual e decisões de conteúdo.
- `THIRD_PARTY_NOTICES.md`: fontes e referência visual.

A trajetória contém projetos comerciais e acadêmicos, sem afirmar vínculos de emprego ou datas não informadas. O blog foi omitido porque ainda não há artigos fornecidos. Para adicioná-lo, crie páginas reais de leitura e só então inclua o link no menu.

## Verificar

```sh
node --check script.js
git diff --check
```

No navegador, confira o menu em celular e sua tecla Escape, os links internos, o botão de expandir a trajetória, a cópia do e-mail e seu feedback de erro, a pausa das animações e a preferência de movimento reduzido. Valide também 320px, 390px, tablet e desktop. Fontes e previews são locais.
