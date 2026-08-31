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

## Correção do hero para 1234

A abertura foi revisada em desktop e mobile. A fotografia voltou ao ativo anterior do site (`susape-manual-candidato-portrait_07f389a4.jpg`), o lockup e o cartão lateral exibem a sequência oficial 1234 e a paleta mantém vermelho, verde, azul e amarelo da identidade SUSAPE. A animação de entrada permanece com suporte a `prefers-reduced-motion`.

## Atualização com pasted_content_3.txt

A Home foi alinhada ao novo briefing: o menu agora inclui as dez áreas públicas principais e o CTA passou a apontar para Contato. Foi adicionada uma faixa gráfica potiguar entre o hero e Quem é Susape, usando módulos chapados para Sol, Vento, Mapa do RN, Gente e Cultura. O hero mantém a fotografia existente, 1234 e as cores SUSAPE. A compilação, os testes Vitest e as capturas desktop/mobile foram concluídos sem erros de TypeScript.

## Hero com nova fotografia e fundo branco/azul

A primeira seção foi atualizada com a fotografia enviada do candidato usando chapéu, mantendo o rosto e a aparência da imagem original. O fundo agora combina branco com azul (#124E9B e #001C4A), enquanto 1234, a identificação de candidato a deputado federal e a animação de entrada permanecem ativos. A captura desktop confirmou boa separação entre texto e retrato; a captura mobile confirmou leitura do título, número e CTAs em coluna sem cortar a fotografia de forma crítica.

## Simplificação total do fundo da primeira seção

O hero foi simplificado para fundo totalmente branco. Foram removidos do JSX os elementos visuais Ondas, Sol, Farol e Gente, além dos números decorativos grandes e das formas azul/verde de fundo. A fotografia, o lockup SUSAPE 1234, o texto, os CTAs e o cartão de identificação foram preservados. Tipos, testes e build passaram; a revisão visual foi realizada em 1280x720 e 390x844.

## Correção do enquadramento e cartão do hero

O retrato foi reduzido e reposicionado para deixar mais do corpo e dos braços visíveis e afastar o cartão da área central da fotografia. O cartão de identificação deixou o fundo vermelho e o detalhe amarelo: agora usa fundo branco, borda azul e sombra azul. O texto, o número 1234 e a identificação de candidato a deputado federal foram preservados. A revisão desktop/mobile e `pnpm check`, `pnpm test` e `pnpm build` foram concluídos.

## Ajuste final do retrato e cartão branco/azul/amarelo

O retrato foi afastado e reduzido para melhorar a leitura do corpo e dos braços, enquanto o cartão deixou de cobrir a área central da fotografia. O cartão agora usa fundo branco, borda azul, sombra azul e uma faixa superior amarela. O número 1234, a identificação de candidato a deputado federal e os demais textos foram preservados. A composição foi revista em 1280x720 e 390x844; tipos, testes e build passaram.

## Bandeira do Rio Grande do Norte no hero

Foi inserida a bandeira oficial do Rio Grande do Norte no espaço branco da primeira seção, em escala discreta e com leve rotação para funcionar como elemento editorial sem cobrir o rosto, o título ou o cartão. O ativo vetorial foi obtido do Wikimedia Commons a partir da página da bandeira estadual e publicado no armazenamento do projeto. A composição foi verificada em desktop e mobile; tipos, testes e build passaram.

Fonte visual: [Bandeira do Rio Grande do Norte — Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Bandeira_do_Rio_Grande_do_Norte.svg).

## Bandeira de ponta a ponta no hero

A bandeira foi transformada numa faixa horizontal de largura total, posicionada acima do nome “Candidato a Deputado Federal”. A altura foi controlada para manter a identificação, o título, a fotografia e o cartão legíveis. A composição foi verificada em 1280x720 e 390x844; tipos, testes e build passaram.

## Hero centralizado com foto e número 1234

A primeira seção foi reorganizada para centralizar rigorosamente a fotografia do candidato. O número 1234 aparece atrás da foto em dígitos grandes nas cores padrão do site, com a fotografia em camada superior. A bandeira permanece como faixa superior de ponta a ponta e o lockup, o slogan, “Orgulho de ser norte-rio-grandense”, o resumo e os CTAs foram movidos para baixo da imagem. A composição foi validada em 1280x1200 e 390x1200; tipos, testes e build passaram.
