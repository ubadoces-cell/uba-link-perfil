# HISTÓRICO DE DESIGN — UBA DOCES

## 05/11/2026 — Atelier UBA

- **Versão anterior:** commit `38b8bf89277cfbd9919388690d9cb7727ee86174`.
- **Branch de backup:** `backup/2026-11-05-antes-atelier-link-perfil`.
- **Link do backup:** https://github.com/ubadoces-cell/uba-link-perfil/tree/backup/2026-11-05-antes-atelier-link-perfil
- **Alteração aprovada para desenvolvimento:** Novo visual editorial roxo/lavanda, fotos originais, navegação inferior Início/Pedidos/Sabores, animações progressivas. URLs iFood, WhatsApp, YouTube e API de conteúdo não mudaram.
- **Reversão:** criar uma alteração que restaure os arquivos visuais a partir do commit de backup, sem substituir dados ou arquivos financeiros mais recentes.
- **Observação:** backup de código não substitui backup do banco de dados.

## 05/11/2026 — Retirada da navegação Liquid Glass

- **Solicitação:** remover somente a barra inferior do Link de Perfil, mantendo o novo design aprovado.
- **Versão salva antes desta alteração:** `49c9572d8ff05099c66d18ed3dcc0567945f1fcb`.
- **Backup GitHub:** `backup/2026-11-05-antes-retirar-liquid-link-perfil`.
- **Alterações:** remoção do elemento de navegação, de seus estilos e de seus eventos, preservando animações da página e canais de compra.
- **Para restaurar:** recuperar somente os arquivos visuais deste backup; não substituir dados ou alterações posteriores.

## 05/11/2026 — Direcionamento de revenda e encomendas
- **Alteração:** os botões "Quero revender UBA" e "Encomenda para eventos" do Link de Perfil passam a abrir `https://uba-revendedores.vercel.app`.
- **Atenção:** removido `data-link="whatsapp"` desses dois botões para a API de conteúdo não substituir os destinos por WhatsApp.
- **Backup anterior:** branch `backup/2026-11-05-antes-links-revendedores`, commit `9d254a399d14008a3f062b61c2f4e2b93641e4f4`.
- **Preservado:** botão iFood, design, fotos, efeitos e links de outras áreas.

## 05/11/2026 — Ícones originais nas opções de compra e revenda
- **Solicitação:** substituir apenas emojis pelos logotipos originais, sem redesenhar marcas ou alterar os demais botões.
- **Comprar pelo iFood:** imagem fornecida pelo usuário, redimensionada exclusivamente para exibição pequena e incorporada a um arquivo SVG como imagem (não foi redesenhada).
- **Quero revender UBA:** reaproveitado o próprio arquivo original `assets/logo.jpg` do projeto, com moldura de lavanda fria para diferenciar.
- **Encomendas para eventos:** permanece com o mesmo emoji e destino anterior.
- **Backup anterior:** branch `backup/2026-11-05-antes-icones-originais` no commit `50c301bc1cf24f08f17b6c73844c29d633e5f66a`.
- **Reversão:** recuperar somente os arquivos visuais originais desse backup, sem alterar API, vendas, registros nem mudanças posteriores.

## 05/11/2026 — Logo UBA no botão Festas e eventos
- **Alteração:** substituído somente o emoji 🎉 pela logo oficial já presente em `assets/logo.jpg`, com fundo branco na moldura.
- **Preservado:** textos e links dos três botões, estilo geral, imagens, layout, efeitos, API e conteúdo.
- **Backup anterior:** `backup/2026-11-05-antes-icone-eventos-branco` no commit `5376b33e13d142fe217ada75173c91c8f7749b3e`.

## 06/11/2026 — Cardápio completo com 10 sabores
- **Backup do site:** `backup/2026-11-06-antes-cardapio-completo` no commit `e5900a71740ae291f3a2290f9087033fe5857143`.
- **Alteração:** as fotos de 10 sabores estão no próprio projeto em `assets/cardapio/`. Valores à vista e cartão exibidos com tipografia discreta no fundo roxo, abaixo das fotos.
- **Estoque:** 7 disponíveis, 3 temporariamente indisponíveis.
- **Preservados:** identidade visual, fontes, links, recursos do site, banco, hero, integrações e demais seções.
