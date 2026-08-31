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


## Verificação dos quadrados de propostas — 2026-08-31

A seção de projetos foi revisada visualmente em desktop e mobile. Os quatro cartões aparecem alinhados e com a ordem cromática definida: vermelho, verde, azul e amarelo. O conteúdo exibido foi confirmado como: “Gosto de Ser Potiguar”, “Segurança Pública”, “Saúde Pública, mais perto de quem precisa” e “Desenvolvimento Sustentável”.

Os quatro botões “Contribuir com este tema” foram acionados individualmente no preview; cada um encaminhou a página para a área “Construção Coletiva”, preservando o fluxo de contribuição.


## Verificação visual final da legibilidade dos projetos — 2026-08-31

A captura final da seção “Conheça o projeto” foi inspecionada em 893 × 768 px. Os quatro cartões aparecem alinhados e com conteúdo contido nos próprios limites, sem texto vazando: “GOSTO DE SER POTIGUAR”, “SEGURANÇA PÚBLICA”, “SAÚDE PÚBLICA” e “DESENVOLVIMENTO SUSTENTÁVEL”. A explicação “Saúde Pública mais perto de quem precisa” aparece no corpo do terceiro cartão. O quarto cartão mantém o fundo amarelo e a tipografia branca, com o título dividido em duas linhas e totalmente visível.


## Reteste dos CTAs após ajuste de legibilidade — primeira parte

Após a correção final de encaixe e tipografia, os CTAs dos cartões 1 e 2 (“Contribuir com este tema”) foram acionados no preview. Ambos mantiveram o botão utilizável e encaminharam para a seção “Construção Coletiva”.


## Reteste dos CTAs após ajuste de legibilidade — conclusão

Os CTAs dos cartões 3 (“Saúde Pública”) e 4 (“Desenvolvimento Sustentável”) também foram acionados no preview após a última alteração. Ambos permaneceram utilizáveis e encaminharam para “Construção Coletiva”. Com os cartões 1 e 2 registrados acima, os quatro CTAs foram retestados na versão final.


## Comprovação técnica de encaixe dos cartões — 2026-08-31

A inspeção do DOM no preview confirmou os quatro cartões com 254 × 254 px, `overflow: hidden` e `scrollHeight` igual a `clientHeight` (254 px) em todos os casos. O resultado `contentFits: true` foi obtido para cada cartão. Os títulos foram confirmados como “Gosto de Ser Potiguar”, “Segurança Pública”, “Saúde Pública” e “Desenvolvimento Sustentável”; os limites inferiores dos textos permaneceram dentro da altura do cartão.


## Ajuste de tipografia dos Projetos e remoção de seções — revisão visual

As capturas desktop e mobile após o ajuste confirmaram os quatro cartões de Projetos com títulos reduzidos e alinhados. “Gosto de Ser Potiguar”, “Segurança Pública”, “Saúde Pública” e “Desenvolvimento Sustentável” aparecem completos dentro dos respetivos cartões; o quarto título mantém a tipografia branca sobre o fundo amarelo. As seções Atuação e Estado em números deixaram de aparecer na sequência da página, e Construção Coletiva passou a seguir diretamente os Projetos.


## Remoção de Atuação e Estado em números — 2026-08-31

A revisão do JSX e do preview confirmou a remoção integral dos blocos “Atuação — Agenda, encontros e resultados: presença que se comprova” e “O estado em números — 167 municípios. Um estado inteiro para conhecer”. Os links de navegação correspondentes também foram retirados. A sequência visível passou de Projetos diretamente para Construção Coletiva, seguida pelo Desafio 167/60; o carregamento da lista do IBGE foi preservado apenas para o quiz.


## Desafio 167/180 — mapa interativo e três minutos

As capturas desktop e mobile confirmaram o novo título “Teste o seu conhecimento. Você conhece todos os municípios do Rio Grande do Norte?”, o contador inicial de 03:00, o mapa branco do RN integrado ao layout e o cartão de resposta preservado. Em mobile, o conteúdo passa para uma sequência vertical legível, com mapa e desafio sem sobreposição.


## Teste funcional do Desafio 167/180

No preview, o desafio iniciou com o contador em 03:00. A resposta “Natal” foi validada pela lista oficial de municípios, elevando o placar para 1/167, registrando “Natal” como município acertado e mantendo o contador em contagem regressiva. O mapa está preparado para receber o polígono municipal correspondente em azul através da malha GeoJSON do IBGE.


A verificação do DOM confirmou que, após a resposta “Natal”, existe 1 polígono em `.rn-map-highlight`, com preenchimento RGB `18, 78, 155` (azul SUSAPE), placar `1` e etiqueta municipal “Natal”.


## Desafio em largura total — revisão visual

As capturas desktop e mobile confirmaram que o parágrafo de instruções foi removido. O título do Desafio ocupa a faixa completa da seção e o cartão do mapa branco foi expandido para largura total, com o cartão de respostas separado abaixo. A versão móvel mantém a sequência vertical legível e sem sobreposição.


## Fonte cartográfica do mapa

A documentação oficial da API de malhas geográficas do IBGE confirma a rota municipal `https://servicodados.ibge.gov.br/api/v3/malhas/municipios/{id}` e o formato `application/vnd.geo+json`, além da rota estadual `https://servicodados.ibge.gov.br/api/v3/malhas/estados/24`. A implementação utiliza essas malhas oficiais para desenhar o RN e sobrepor em azul os municípios acertados. Referência: [API de malhas geográficas do IBGE](https://servicodados.ibge.gov.br/api/docs/malhas?versao=3).


## Verificação da malha municipal amarela

A verificação do DOM confirmou 167 caminhos municipais no mapa base, com preenchimento branco e traço amarelo RGB `244, 174, 40`. A largura renderizada do SVG no browser foi de 356,56 px na viewport atual, e o texto de instruções removido não está presente no documento.


## Revisão visual do mapa e do espaçamento global

As capturas desktop e mobile confirmaram a presença das divisões municipais amarelas sobre a base branca do mapa do RN. O desenho do mapa acompanha a composição de largura total do Desafio. O espaçamento de linhas foi ampliado em títulos, parágrafos e cartões para reduzir o risco de sobreposição em telas estreitas.


## Numeração do hero em largura total

As capturas desktop e mobile confirmaram que os dígitos 1, 2, 3 e 4 foram distribuídos por toda a largura visual da primeira seção, atrás da fotografia central. As quatro cores permanecem preservadas e a fotografia com chapéu continua centralizada e legível.


## Revisão pós-editor visual

O JSX duplicado do título de “Desenvolvimento Sustentável” foi corrigido para um único elemento válido, preservando a apresentação completa do título. A matriz de navegação mantém os rótulos “Propostas” e “Construção Coletiva”, evitando links vazios. As capturas desktop e mobile ficaram sem erro de renderização, e os rótulos do menu permanecem disponíveis no DOM.


## Verificação do editor visual — título do Projeto 4

A tentativa de alterar o texto para uma quebra manual não produziu mudanças porque o elemento já estava na forma correta. A inspeção do JSX confirmou `{theme.title}` no `<h3>`, com o valor “Desenvolvimento Sustentável” na definição da proposta. As capturas desktop e mobile confirmaram a renderização sem erro; não foi necessário aplicar uma nova alteração visual.


## Fotografia livre na etapa Identidade

A primeira etapa da trajetória reutiliza o mesmo ativo `officialPortrait` do hero. A miniatura foi convertida para proporção automática, `object-fit: contain`, sem borda, sem sombra, sem raio e sem formato quadrado; o fundo permanece branco. As capturas desktop e mobile confirmaram a fotografia pequena ao lado de “Identidade — Orgulho potiguar”, sem alterar o retrato central do hero.


## Simplificação do cabeçalho

A navegação compartilhada do cabeçalho foi verificada em desktop e mobile. As abas “Projeto” e “Construção Coletiva” deixaram de ser renderizadas; permanecem “Início”, “Quem é Susape”, “Propostas”, “Desafio 167/60”, “Notícias”, “Galeria”, “Participe” e “Contacto”. No mobile, o cabeçalho continua reduzido ao logótipo e ao botão de menu.


## Padronização visual do cabeçalho

A revisão visual confirmou no desktop que as abas restantes usam a mesma família tipográfica, tamanho, peso, altura de linha e alinhamento vertical, com distribuição regular entre o logótipo, a navegação e o botão “Contacto”. No mobile, o logótipo e o botão de menu permanecem alinhados na mesma altura e a navegação continua recolhida de forma consistente.


## Rótulo simplificado do Desafio

A aba do cabeçalho foi atualizada de “Desafio 167/60” para “Desafio”, mantendo a âncora `#desafio` e a secção do quiz com temporizador de três minutos. As capturas desktop e mobile confirmaram o novo rótulo e a preservação do comportamento responsivo.


## Ajustes de Projetos e Desafio em largura total

As capturas desktop e mobile confirmaram o aumento discreto do cartão “Desenvolvimento Sustentável” no modo computador, sem alterar a grelha móvel. No cartão “Saúde Pública”, o título foi aproximado verticalmente do ícone do coração. No desktop, o título, o mapa municipal e a área interativa do Desafio usam a largura total disponível da secção; no mobile, a composição permanece em coluna e legível.


## Ajustes finais das propostas e do Desafio

A proposta quatro passou a exibir “Sustentabilidade”. A proposta três foi reorganizada com uma grelha explícita para manter “Saúde Pública”, o ícone do coração e o texto complementar alinhados tanto no desktop como no mobile. A secção do Desafio foi reforçada para usar a largura total disponível no desktop, incluindo título, mapa municipal e teste; no mobile, a disposição vertical permanece legível e sem sobreposição.


## Revisão da edição visual dos cartões

A edição visual gerou atributos `style` duplicados no JSX, incluindo valores inválidos como `width: 'px'` e `marginTop: 'px'`. Esses atributos foram removidos, deixando a largura e o espaçamento sob controlo das classes CSS responsivas. As capturas desktop e mobile confirmaram cartões sem artefactos visíveis e com alinhamento preservado. `pnpm check`, `pnpm test` e `pnpm build` concluíram com sucesso.


## Reorganização da aba de Projetos em grelha 2×2

Os cartões de propostas foram organizados em duas colunas no desktop, com 1 e 2 na primeira linha e 3 e 4 na segunda, usando quadrados de 250×250 px e espaçamento uniforme. Cada ícone foi posicionado na coluna lateral do respetivo título. No mobile, os quatro cartões passam para uma coluna de 250 px, preservando a leitura e o alinhamento. As capturas desktop e mobile foram verificadas; `pnpm check`, `pnpm test` e `pnpm build` passaram.
