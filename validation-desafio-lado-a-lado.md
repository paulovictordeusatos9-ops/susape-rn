# Validação do Desafio — mapa e cronómetro lado a lado

A secção `#desafio` foi aberta no preview após a alteração de CSS. A composição usa duas colunas em viewport amplo: o mapa do RN ocupa a coluna esquerda e o cartão com cronómetro, pontuação e interação ocupa a coluna direita. O conteúdo introdutório permanece acima das duas colunas.

A medição do DOM no viewport de 1280 px confirmou o resultado: `challenge-layout` ocupa 1265 px de largura, o mapa ocupa aproximadamente 829 px e o cartão do desafio aproximadamente 385 px, com o cartão a começar depois do intervalo entre colunas. O contentor exterior foi ajustado para não reservar uma coluna vazia.

O breakpoint mobile mantém a disposição em bloco, com mapa antes do cronómetro para preservar a leitura e a interação. A validação foi complementada por verificação de tipos, testes e build após a implementação.
