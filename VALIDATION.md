# Validação da versão inicial

Data: 25 de agosto de 2026.

## Verificações concluídas

- A verificação de tipos (`pnpm check`) foi concluída sem erros.
- A compilação de produção (`pnpm build`) foi concluída com sucesso.
- A página carrega a identidade visual, os ativos externos e a navegação por âncoras.
- A consulta à API de Localidades do IBGE carregou 167 municípios do Rio Grande do Norte e alimentou o gráfico territorial.
- O fluxo do desafio 167/60 foi testado com a resposta `Natal`: o cronómetro iniciou, a pontuação aumentou para 1 e a resposta foi apresentada como válida.
- O formulário de construção coletiva é intencionalmente demonstrativo nesta versão estática: confirma localmente o envio, mas não transmite dados para um servidor.

## Limites editoriais a respeitar em atualizações futuras

- Usar fontes oficiais ou primárias para biografia, realizações, propostas, agenda e notícias.
- Não publicar propostas detalhadas sem validação da campanha.
- Manter a situação da candidatura e os canais de contacto atualizados.
- Substituir as imagens ilustrativas da galeria por registos oficiais quando disponíveis; preservar a atribuição da imagem da Ponte Newton Navarro, licenciada em CC BY 2.0.

## Validação após a atualização do PDF

Em 28 de agosto de 2026, a abertura foi verificada no navegador em desktop e mobile. A assinatura SUSAPE 1234, os números coloridos, a fotografia do candidato, os blocos geométricos e os ícones do RN ficaram visíveis e legíveis.

Também foi exercitado no navegador o início do desafio 167/60 e o formulário de construção coletiva. O quiz expôs o campo de município e o formulário exibiu a confirmação local de contribuição. Nenhum dado foi enviado para um servidor.

## Validação final de CTAs e links

Após a limpeza final dos estilos, foram verificadas as seis âncoras principais — trajetória, projeto, propostas, desafio, participação e construção coletiva — e todas actualizaram correctamente o hash da página. Os quatro botões de contribuição temática foram encontrados e exercitados. O formulário confirmou a contribuição local e o desafio 167/60 expôs o campo de resposta. Os links externos públicos foram verificados como endereços HTTPS válidos. A revisão visual incluiu desktop e viewport mobile.

## Revisão responsiva final

A captura de viewport móvel após a limpeza final confirmou a legibilidade da assinatura, dos números coloridos, do título e dos CTAs de abertura. A inspeção do DOM responsivo encontrou oito CTAs principais — incluindo conhecer a trajetória, trazer uma ideia, construir junto, enviar contribuição, começar o desafio e contribuir por tema. O navegador sandbox não permite alterar a sua largura através de `window.resizeTo`; por isso, a confirmação visual mobile foi feita com captura dedicada do preview e os fluxos interativos foram exercitados no DOM final.

## Validação da atualização com pasted_content.txt

A Home foi atualizada com os quatro eixos definidos no briefing: Orgulho de ser Potiguar, Segurança Pública para Todos, Saúde mais perto de quem precisa e Desenvolvimento Sustentável. O navegador confirmou esses quatro títulos, os campos de bairro e contacto opcional, a seleção de tema, o consentimento obrigatório, a mensagem “Contribuição recebida.” e o início do Desafio 167/60.

## Validação final da ronda de conteúdo

Após a atualização baseada em `pasted_content.txt`, o navegador confirmou seis filtros de Atuação, seis âncoras principais funcionais, os quatro títulos de propostas, o formulário com consentimento e a mensagem “Contribuição recebida.”, além do início do quiz 167/60.
