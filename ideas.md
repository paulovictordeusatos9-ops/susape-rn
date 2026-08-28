# Direção de design — Susape Augusto

## Três abordagens consideradas

### 1. Cartografia Cívica
**Muito breve:** Uma linguagem editorial territorial, inspirada em mapas, linhas de deslocamento e o horizonte potiguar. Transmite presença, escuta e construção em rede.

**Probabilidade:** 0,07

### 2. Casa Aberta
**Muito breve:** Uma estética acolhedora e humana, com materiais quentes, fotografia de proximidade e tipografia gentil. Aproxima a política cotidiana das pessoas.

**Probabilidade:** 0,03

### 3. Movimento Solar
**Muito breve:** Uma composição vibrante baseada no sol, em ritmo e energia coletiva, com contrastes quentes e blocos gráficos incisivos. Faz a navegação parecer uma caminhada que avança.

**Probabilidade:** 0,09

## Abordagem escolhida: Cartografia Cívica

### Movimento de design

**Editorial cartográfico contemporâneo**, inspirado em atlas culturais, sinalização de viagem e cartazes cívicos brasileiros. O desenho evita a aparência genérica de campanha e trata o Rio Grande do Norte como território vivo, interligado por escuta e compromisso.

### Princípios centrais

1. **Território antes de palco:** o site apresenta regiões, pessoas e temas como partes conectadas de uma conversa, nunca como um palanque isolado.
2. **Clareza com calor humano:** hierarquias tipográficas fortes, textos curtos e linguagem direta convivem com superfícies táteis, cores solares e imagens abertas.
3. **Caminhos em vez de caixas:** linhas de rota, pontos de encontro e faixas de informação estruturam o percurso vertical, evitando uma grelha central rígida e repetitiva.
4. **Participação visível:** cada secção deve levar a uma ação clara, seja conhecer, enviar uma ideia, jogar o desafio ou acompanhar os canais oficiais.

### Filosofia de cor

O azul noite traduz seriedade institucional e cria contraste estável para o conteúdo factual; o laranja de caju representa energia, presença e decisão; a areia clara oferece respiro e remete às paisagens potiguares. O verde algodão entra com parcimónia para representar sustentabilidade e crescimento. A cor não serve como decoração: ela organiza tema, foco e movimento.

### Paradigma de layout

O site é uma **rota vertical**. Um trilho contínuo acompanha a leitura, atravessando marcos, cartões e secções, enquanto os conteúdos alternam alinhamento à esquerda e à direita. O hero abre como um mapa em expansão; o restante da página funciona como paragens de uma caminhada, com grandes espaços de respiro e grupos assimétricos.

### Elementos de assinatura

1. **Linhas de rota pontilhadas**, que ligam chamadas, secções e marcos da trajetória.
2. **Marcadores solares**, pequenos discos com anéis concêntricos usados em títulos, filtros e estados ativos.
3. **Cartões-telegrama**, com bordas editoriais, microetiquetas e setas direcionais para conteúdos de ação.

### Filosofia de interação

Cada ação deve confirmar o caminho escolhido: filtros mudam como sinalização de rota; o quiz responde com pulsos solares; os formulários agradecem de modo objetivo. As interações prioritárias são locais, acessíveis por teclado e nunca interrompem a leitura.

### Animação

As linhas de rota entram por desenho progressivo e os marcadores aparecem em sequência discreta. Cartões sobem 8 px com opacidade ao entrar na área visível; botões usam resposta de escala breve no clique. As transições duram entre 140 e 240 ms, usam curvas de saída firmes e respeitam `prefers-reduced-motion`.

### Sistema tipográfico

**DM Serif Display** orienta grandes títulos e frases de impacto: editorial, territorial e memorável. **Manrope** dá ritmo ao corpo, interfaces, labels e dados por sua alta legibilidade. Títulos são largos, com quebras intencionais; microetiquetas usam caixa alta, rastreamento generoso e peso 700.

### Essência de marca

**Uma candidatura federal potiguar que liga escuta local a compromissos claros para cultura, segurança, saúde e sustentabilidade.**

Personalidade: **presente, direta, construtiva**.

### Voz de marca

As manchetes soam como convites francos e locais; CTAs indicam uma ação concreta; microcopy reconhece a participação sem exagero.

Exemplos:

> “O Rio Grande do Norte cabe na nossa conversa.”

> “Traga um problema do seu bairro. Vamos colocá-lo no mapa.”

Evitar frases genéricas como “Bem-vindo ao nosso site” ou “Comece agora”.

### Logótipo e marca

Uma **rosa dos ventos solar**: quatro raios arredondados apontam para fora de um círculo aberto, formando ao mesmo tempo caminho, encontro e horizonte. Não utiliza letras; a marca acompanha o nome em tipografia editorial apenas quando necessário.

### Cor de assinatura

**Caju em Movimento — #F15A3A.** Um laranja terroso, luminoso e próprio, usado nos marcadores, chamadas de participação e estados ativos.

## Style Decisions

- O hero abre explicitamente como uma carta/rota do território potiguar, com coordenadas, arcos e marcadores solares sobre a paisagem.
- **Caju em Movimento #F15A3A** é a única cor de sinalização: ações, wayfinding, estados ativos e participação. Tons quentes secundários ficam restritos ao papel/areia e nunca concorrem com o caju.
- Todo cartão relevante assume o comportamento de um **cartão-telegrama**: microetiqueta, código de despacho, seta direcional e borda editorial visível.

## Atualização: manual SUSAPE 1234

A referência principal passa a ser o Manual de Identidade Visual enviado pelo utilizador. A direção deve usar a assinatura **DEPUTADO FEDERAL SUSAPE 1234**, o conceito **Um jeito potiguar de fazer**, o slogan **Faz sentido?!** e a frase **Orgulho de ser norte-rio-grandense**.

A paleta oficial de interface é: azul-marinho `#001c4a`, azul `#124e9b`, vermelho `#e0141e`, bege papel `#f4e5d1`, branco `#ffffff`, verde `#137043`, amarelo `#f4ae28`, rosa `#e6597b` e bege secundário `#e8d0af`. Anton deve orientar títulos e destaques; Inter deve orientar textos de apoio; o slogan pode usar uma cursiva equivalente quando a fonte proprietária não estiver disponível.

O sistema gráfico deve trazer ícones e referências do RN — ondas, sol, dunas, jangada, farol, vento, gente e mapa — dentro de blocos geométricos coloridos. A identidade anterior de Cartografia Cívica fica registrada como histórico, mas não deve prevalecer sobre os parâmetros do manual.
