/**
 * Estilo Cartografia Cívica: rota territorial assimétrica, azul-noite e caju em movimento.
 * Cada bloco deve levar a uma ação concreta e nunca substituir factos verificados por ficção.
 */
import { useEffect, useMemo, useState } from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  Check,
  ChevronRight,
  Clock3,
  Compass,
  ExternalLink,
  Facebook,
  Flag,
  HeartHandshake,
  Instagram,
  Landmark,
  MapPin,
  Menu,
  MessageCircle,
  Send,
  Sparkles,
  Users,
  X,
} from "lucide-react";
import { Bar, BarChart, CartesianGrid, Cell, XAxis, YAxis } from "recharts";
import { Button } from "@/components/ui/button";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

type Municipio = {
  id: number;
  nome: string;
  "regiao-imediata"?: {
    "regiao-intermediaria"?: { nome?: string };
  };
};

const IBGE_MUNICIPIOS_URL =
  "https://servicodados.ibge.gov.br/api/v1/localidades/estados/24/municipios";

const heroImage = "/manus-storage/susape-hero-cartografia_cbbfc6e5.jpg";
const encounterImage = "/manus-storage/susape-territorio-encontro_bddc5ac6.jpg";
const bridgeImage = "/manus-storage/susape-costa-ponte_c56e432f.jpg";
const logoImage = "/manus-storage/susape-marca-rosa-dos-ventos_42e7774a.png";
const wikimediaBridge = "/manus-storage/ponte-newton-navarro-ccby_2f5f8d70.jpg";

const chartConfig = {
  municipios: { label: "Municípios", color: "#F15A3A" },
} satisfies ChartConfig;

const themes = [
  {
    number: "01",
    title: "Cultura",
    body: "Um dos quatro eixos apresentados no perfil público. Espaço preparado para prioridades culturais e iniciativas da campanha.",
    color: "theme-cultura",
  },
  {
    number: "02",
    title: "Segurança",
    body: "Eixo declarado no canal oficial. As propostas detalhadas podem ser publicadas aqui com fonte e data de atualização.",
    color: "theme-seguranca",
  },
  {
    number: "03",
    title: "Saúde",
    body: "Tema que integra a apresentação pública da candidatura, organizado no site para consulta simples e participação popular.",
    color: "theme-saude",
  },
  {
    number: "04",
    title: "Sustentabilidade",
    body: "Quarto eixo mencionado no perfil. Área pronta para metas, ações, parcerias e acompanhamento de compromissos.",
    color: "theme-sustentabilidade",
  },
];

const rota = [
  ["Ponto de partida", "Natal/RN", "Natural de Natal, potiguar e candidato a deputado federal pelo Rio Grande do Norte."],
  ["Pessoas", "Pai e empreendedor", "Apresentação pessoal indicada no perfil público da candidatura."],
  ["Formação", "Superior completo", "Informação declarada na ficha pública da candidatura."],
  ["Caminhada", "Primeira disputa eleitoral", "Dado publicado por fonte de perfil eleitoral baseada em registos públicos."],
];

const news = [
  {
    tag: "Candidatura",
    title: "Susape Augusto concorre a deputado federal pelo RN",
    body: "PDT · 1234 · dados públicos em consulta eleitoral.",
    href: "https://agorarn.com.br/eleicoes-2026/candidatos/susape-augusto/",
  },
  {
    tag: "Temas",
    title: "Quatro eixos organizam a apresentação pública",
    body: "Cultura, segurança, saúde e sustentabilidade aparecem no perfil oficial indexado.",
    href: "https://www.instagram.com/susapeaugusto/?hl=en",
  },
  {
    tag: "Atualização",
    title: "Acompanhe os canais oficiais da campanha",
    body: "Agenda, vídeos e comunicados podem ser acompanhados no Instagram e no Facebook.",
    href: "https://www.instagram.com/susapeaugusto/",
  },
];

function normalizar(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("pt-BR")
    .trim();
}

function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="section-eyebrow">
      <span />
      {children}
    </p>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [municipios, setMunicipios] = useState<Municipio[]>([]);
  const [municipiosError, setMunicipiosError] = useState(false);
  const [ideaSent, setIdeaSent] = useState(false);
  const [quizActive, setQuizActive] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [score, setScore] = useState(0);
  const [answer, setAnswer] = useState("");
  const [used, setUsed] = useState<string[]>([]);
  const [quizFeedback, setQuizFeedback] = useState("");

  useEffect(() => {
    let active = true;
    fetch(IBGE_MUNICIPIOS_URL)
      .then(response => {
        if (!response.ok) throw new Error("IBGE indisponível");
        return response.json();
      })
      .then((data: Municipio[]) => {
        if (active) setMunicipios(data);
      })
      .catch(() => active && setMunicipiosError(true));
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!quizActive) return;
    if (timeLeft === 0) {
      setQuizActive(false);
      setQuizFinished(true);
      return;
    }
    const timer = window.setTimeout(() => setTimeLeft(value => value - 1), 1000);
    return () => window.clearTimeout(timer);
  }, [quizActive, timeLeft]);

  const regionData = useMemo(() => {
    const grouped = municipios.reduce<Record<string, number>>((acc, municipio) => {
      const region = municipio["regiao-imediata"]?.["regiao-intermediaria"]?.nome || "Outra região";
      acc[region] = (acc[region] || 0) + 1;
      return acc;
    }, {});
    return Object.entries(grouped)
      .map(([regiao, total]) => ({ regiao, municipios: total }))
      .sort((a, b) => b.municipios - a.municipios);
  }, [municipios]);

  const startQuiz = () => {
    setTimeLeft(60);
    setScore(0);
    setAnswer("");
    setUsed([]);
    setQuizFeedback("");
    setQuizFinished(false);
    setQuizActive(true);
  };

  const submitAnswer = (event: React.FormEvent) => {
    event.preventDefault();
    if (!quizActive || !answer.trim()) return;
    const city = municipios.find(item => normalizar(item.nome) === normalizar(answer));
    if (!city) {
      setQuizFeedback("Ainda não encontramos esse município no cadastro do IBGE. Tente outro nome.");
      return;
    }
    if (used.includes(city.nome)) {
      setQuizFeedback("Esse município já entrou na sua rota. Escolha outro.");
      setAnswer("");
      return;
    }
    setUsed(previous => [city.nome, ...previous]);
    setScore(previous => previous + 1);
    setAnswer("");
    setQuizFeedback(`${city.nome} entrou no mapa.`);
  };

  const nav = [
    ["Trajetória", "#quem-e"],
    ["Projeto", "#projeto"],
    ["Propostas", "#propostas"],
    ["Desafio", "#desafio"],
    ["Participe", "#participe"],
  ];

  return (
    <div className="site-shell">
      <header className="site-header">
        <a className="brand" href="#inicio" aria-label="Susape Augusto — início">
          <img src={logoImage} alt="Marca gráfica em forma de rosa dos ventos solar" />
          <span>
            <strong>Susape</strong>
            <small>Augusto · RN</small>
          </span>
        </a>
        <nav className={menuOpen ? "nav-links nav-open" : "nav-links"} aria-label="Navegação principal">
          {nav.map(([label, href]) => (
            <a key={href} href={href} onClick={() => setMenuOpen(false)}>
              {label}
            </a>
          ))}
        </nav>
        <a className="header-cta" href="#construcao">
          Construir junto <ArrowUpRight size={16} />
        </a>
        <button
          className="menu-button"
          onClick={() => setMenuOpen(value => !value)}
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
      </header>

      <main>
        <section id="inicio" className="hero" style={{ backgroundImage: `url(${heroImage})` }}>
          <div className="hero-overlay" />
          <div className="route-line hero-route" aria-hidden="true">
            <i /> <i /> <i />
          </div>
          <div className="hero-atlas" aria-hidden="true">
            <span className="atlas-title">Carta de rota · RN</span>
            <span className="atlas-coordinate coordinate-one">05°48′S</span>
            <span className="atlas-coordinate coordinate-two">35°12′W</span>
            <span className="atlas-point point-one" />
            <span className="atlas-point point-two" />
            <span className="atlas-point point-three" />
            <b>Território em conversa</b>
          </div>
          <div className="hero-content">
            <div className="hero-copy">
              <SectionEyebrow>Deputado federal · Rio Grande do Norte</SectionEyebrow>
              <h1>O Rio Grande do Norte cabe na nossa conversa.</h1>
              <p className="hero-summary">
                Susape Augusto apresenta uma candidatura federal com escuta, presença e quatro eixos públicos: cultura, segurança, saúde e sustentabilidade.
              </p>
              <div className="hero-actions">
                <a className="button-primary" href="#quem-e">
                  Conheça a trajetória <ArrowDownRight size={19} />
                </a>
                <a className="button-ghost" href="#construcao">
                  Traga uma ideia <ChevronRight size={18} />
                </a>
              </div>
              <p className="hero-source">PDT · 1234 · dados públicos da candidatura em atualização</p>
            </div>
            <aside className="hero-card" aria-label="Resumo da candidatura">
              <span className="card-label">No mapa</span>
              <strong>4</strong>
              <p>eixos para organizar a conversa com o estado.</p>
              <div className="hero-card-footer">
                <Compass size={18} />
                <span>Faz sentido?</span>
              </div>
            </aside>
          </div>
        </section>

        <section id="quem-e" className="section profile-section route-section">
          <div className="route-rail" aria-hidden="true"><span>01</span></div>
          <div className="section-intro split-heading">
            <div>
              <SectionEyebrow>Quem é Susape</SectionEyebrow>
              <h2>Uma trajetória apresentada com os pés no chão.</h2>
            </div>
            <p>
              Natural de Natal, com ensino superior completo, Susape Augusto se apresenta como cristão, empreendedor, pai e potiguar. A candidatura é ao cargo de deputado federal pelo Rio Grande do Norte.
            </p>
          </div>
          <div className="profile-grid">
            <div className="profile-statement">
              <span className="statement-mark">“</span>
              <p>Política olhando para as pessoas, ouvindo mais e construindo soluções que façam sentido.</p>
              <small>— síntese da mensagem pública de apresentação da candidatura</small>
            </div>
            <div className="route-timeline">
              {rota.map(([eyebrow, title, body], index) => (
                <article className="timeline-item" key={title}>
                  <span className="timeline-index">0{index + 1}</span>
                  <div>
                    <small>{eyebrow}</small>
                    <h3>{title}</h3>
                    <p>{body}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
          <p className="source-note">
            Informações conferidas em <a href="https://agorarn.com.br/eleicoes-2026/candidatos/susape-augusto/" target="_blank" rel="noreferrer">fichas públicas de candidatura</a> e no <a href="https://www.instagram.com/susapeaugusto/?hl=en" target="_blank" rel="noreferrer">perfil público indexado</a>.
          </p>
        </section>

        <section id="projeto" className="section project-section route-section">
          <div className="route-rail rail-light" aria-hidden="true"><span>02</span></div>
          <div className="project-topline">
            <div>
              <SectionEyebrow>Conheça o projeto</SectionEyebrow>
              <h2>Quatro pontos para orientar uma mesma direção.</h2>
            </div>
            <p>Os eixos abaixo são os temas destacados no perfil público. Esta estrutura permite que a campanha publique propostas detalhadas, metas e referências de forma transparente.</p>
          </div>
          <div className="theme-grid" id="propostas">
            {themes.map(theme => (
              <article className={`theme-card ${theme.color}`} key={theme.number}>
                <div className="telegram-top"><span>{theme.number}</span><small>despacho · eixo</small><ArrowUpRight size={15} /></div>
                <h3>{theme.title}</h3>
                <p>{theme.body}</p>
                <button onClick={() => document.getElementById("construcao")?.scrollIntoView({ behavior: "smooth" })}>
                  Contribuir com este tema <ArrowUpRight size={17} />
                </button>
              </article>
            ))}
          </div>
          <div className="project-principles">
            <span>Visão</span><strong>Representar o Rio Grande do Norte com presença e escuta.</strong>
            <span>Princípio</span><strong>Publicar compromissos claros, atualizados e abertos a participação.</strong>
          </div>
        </section>

        <section id="atuacao" className="section action-section route-section">
          <div className="route-rail" aria-hidden="true"><span>03</span></div>
          <div className="action-layout">
            <div className="action-photo-wrap">
              <img src={encounterImage} alt="Pessoas reunidas em torno de um mapa, imagem ilustrativa de construção coletiva" />
              <span className="photo-chip"><MapPin size={14} /> Escuta no território</span>
            </div>
            <div className="action-copy">
              <SectionEyebrow>Atuação</SectionEyebrow>
              <h2>Agenda, encontros e resultados: tudo no mesmo percurso.</h2>
              <p>Esta área está preparada para reunir projetos, iniciativas, agendas e experiências da candidatura com data, território, tema e ligações para fontes primárias.</p>
              <div className="action-list">
                <div><Users size={19} /><span><strong>Encontros</strong><small>Registos de conversas, visitas e agendas.</small></span></div>
                <div><Landmark size={19} /><span><strong>Iniciativas</strong><small>Projetos, articulações e experiências documentadas.</small></span></div>
                <div><Check size={19} /><span><strong>Prestação de contas</strong><small>Resultados e atualizações com contexto e fonte.</small></span></div>
              </div>
              <a className="text-link" href="https://www.instagram.com/susapeaugusto/" target="_blank" rel="noreferrer">Acompanhar registos no Instagram <ExternalLink size={15} /></a>
            </div>
          </div>
        </section>

        <section id="territorio" className="section data-section route-section">
          <div className="route-rail rail-light" aria-hidden="true"><span>04</span></div>
          <div className="data-copy">
            <SectionEyebrow>O estado em números</SectionEyebrow>
            <h2>167 municípios. Muitas rotas. Um estado inteiro para escutar.</h2>
            <p>O painel usa a lista oficial de municípios do IBGE e permite ver como eles se distribuem pelas regiões intermediárias. É uma leitura territorial, não um indicador de desempenho de campanha.</p>
          </div>
          <div className="data-card">
            <div className="data-card-header">
              <div><span className="card-label">Distribuição territorial</span><h3>Municípios por região intermediária</h3><span className="map-reference">ref. 24 · carta territorial</span></div>
              <div className="big-number">{municipios.length || "—"}<small>municípios</small></div>
            </div>
            {municipiosError ? (
              <div className="chart-empty">Não foi possível carregar a lista do IBGE agora. Tente atualizar a página.</div>
            ) : (
              <ChartContainer config={chartConfig} className="territory-chart">
                <BarChart data={regionData} layout="vertical" margin={{ left: 12, right: 20, top: 8, bottom: 8 }}>
                  <CartesianGrid horizontal={false} strokeDasharray="3 3" />
                  <XAxis type="number" hide />
                  <YAxis dataKey="regiao" type="category" axisLine={false} tickLine={false} width={78} tick={{ fontSize: 12, fill: "#E8E2D6" }} />
                  <ChartTooltip cursor={{ fill: "rgba(255,255,255,0.06)" }} content={<ChartTooltipContent />} />
                  <Bar dataKey="municipios" radius={[0, 10, 10, 0]}>
                    {regionData.map((entry, index) => <Cell key={entry.regiao} fill={index === 0 ? "#F15A3A" : index === 1 ? "#DDAA50" : "#6C997C"} />)}
                  </Bar>
                </BarChart>
              </ChartContainer>
            )}
            <p className="data-source">Fonte: <a href="https://servicodados.ibge.gov.br/api/v1/localidades/estados/24/municipios" target="_blank" rel="noreferrer">API de Localidades do IBGE</a>.</p>
          </div>
        </section>

        <section id="construcao" className="section collective-section route-section">
          <div className="route-rail" aria-hidden="true"><span>05</span></div>
          <div className="collective-copy">
            <SectionEyebrow>Construção coletiva</SectionEyebrow>
            <h2>Traga um problema do seu bairro. Vamos colocá-lo no mapa.</h2>
            <p>Ideias, problemas e propostas ajudam a dar forma a uma agenda que começa no território. Nesta versão estática, o formulário confirma a sua participação localmente; conecte-o ao canal oficial para receber envios reais.</p>
            <div className="collective-markers"><span><HeartHandshake size={16} /> Escuta</span><span><MessageCircle size={16} /> Ideias</span><span><Flag size={16} /> Compromissos</span></div>
          </div>
          <form className="idea-form" onSubmit={event => { event.preventDefault(); setIdeaSent(true); }}>
            <label>Seu nome<input required placeholder="Como podemos chamar você?" /></label>
            <label>Seu município<input required placeholder="Ex.: Mossoró" /></label>
            <label>O que precisa entrar nessa conversa?<textarea required rows={4} placeholder="Conte uma ideia, problema ou proposta para o RN." /></label>
            <Button type="submit" className="send-button"><Send size={17} /> Enviar contribuição</Button>
            {ideaSent && <p className="form-confirm"><Check size={16} /> Contribuição registada nesta sessão. Para receber mensagens reais, ligue este formulário ao canal oficial da campanha.</p>}
          </form>
        </section>

        <section id="desafio" className="section challenge-section route-section">
          <div className="route-rail rail-light" aria-hidden="true"><span>06</span></div>
          <div className="challenge-copy">
            <SectionEyebrow>Desafio 167/60</SectionEyebrow>
            <h2>Em 60 segundos, quantos municípios do RN você consegue lembrar?</h2>
            <p>Digite os nomes sem consultar lista. O desafio confere cada resposta pela base oficial do IBGE e contabiliza apenas respostas únicas.</p>
            <div className="challenge-rules"><span><Clock3 size={16} /> 60 segundos</span><span><MapPin size={16} /> 167 municípios</span><span><Sparkles size={16} /> resposta imediata</span></div>
          </div>
          <div className="quiz-card">
            <div className="quiz-top"><span>Desafio em curso</span><strong>{String(timeLeft).padStart(2, "0")}<small>s</small></strong></div>
            <div className="quiz-score"><span>Acertos</span><strong>{score}</strong><small>de 167</small></div>
            {!quizActive && !quizFinished && <Button onClick={startQuiz} disabled={!municipios.length} className="quiz-start">{municipios.length ? "Começar agora" : "A carregar municípios…"} <ArrowUpRight size={17} /></Button>}
            {quizActive && <form className="quiz-form" onSubmit={submitAnswer}>
              <input autoFocus value={answer} onChange={event => setAnswer(event.target.value)} placeholder="Digite um município" aria-label="Digite um município do RN" />
              <Button type="submit">Marcar <ChevronRight size={17} /></Button>
            </form>}
            {quizFinished && <div className="quiz-result"><p>Tempo encerrado. A sua rota alcançou <strong>{score}</strong> município{score === 1 ? "" : "s"}.</p><Button onClick={startQuiz}>Tentar outra vez <ArrowUpRight size={16} /></Button></div>}
            {quizFeedback && <p className="quiz-feedback">{quizFeedback}</p>}
            {used.length > 0 && <div className="used-cities" aria-live="polite">{used.slice(0, 8).map(city => <span key={city}>{city}</span>)}</div>}
          </div>
        </section>

        <section id="noticias" className="section news-section route-section">
          <div className="route-rail" aria-hidden="true"><span>07</span></div>
          <div className="news-header"><div><SectionEyebrow>Notícias</SectionEyebrow><h2>Informação com data, fonte e caminho para acompanhar.</h2></div><a href="https://www.instagram.com/susapeaugusto/" target="_blank" rel="noreferrer" className="text-link">Ver canal oficial <ExternalLink size={15} /></a></div>
          <div className="news-grid">
            {news.map((item, index) => <a className="news-card" href={item.href} target="_blank" rel="noreferrer" key={item.title}><span>despacho 0{index + 1} · {item.tag}</span><h3>{item.title}</h3><p>{item.body}</p><ArrowUpRight size={18} /></a>)}
          </div>
        </section>

        <section id="galeria" className="gallery-section route-section">
          <div className="gallery-title"><SectionEyebrow>Galeria</SectionEyebrow><h2>O território também conta a história.</h2><p>Galeria-base com imagens de apoio territorial. Substitua ou complemente com fotos oficiais de agendas, visitas e encontros.</p></div>
          <div className="gallery-grid">
            <figure className="gallery-main"><img src={bridgeImage} alt="Ponte sobre a água em Natal, imagem ilustrativa" /><figcaption>Conexão · imagem ilustrativa</figcaption></figure>
            <figure><img src={wikimediaBridge} alt="Ponte Newton Navarro em Natal" /><figcaption>Ponte Newton Navarro · Foto: Otávio Nogueira, CC BY 2.0</figcaption></figure>
            <figure><img src={encounterImage} alt="Grupo reunido em torno de um mapa, imagem ilustrativa" /><figcaption>Construção coletiva · imagem ilustrativa</figcaption></figure>
          </div>
        </section>

        <section id="participe" className="participate-section">
          <div><SectionEyebrow>Participe</SectionEyebrow><h2>Não acompanhe de longe. Entre na rota.</h2></div>
          <div className="participate-actions"><a href="#construcao" className="button-primary">Enviar uma ideia <ArrowUpRight size={18} /></a><a href="https://www.instagram.com/susapeaugusto/" target="_blank" rel="noreferrer" className="button-outline"><Instagram size={18} /> Seguir no Instagram</a></div>
        </section>
      </main>

      <footer id="contato" className="site-footer">
        <div className="footer-brand"><img src={logoImage} alt="" /><div><strong>Susape Augusto</strong><span>Deputado Federal · RN</span></div></div>
        <div className="footer-links"><a href="https://www.instagram.com/susapeaugusto/" target="_blank" rel="noreferrer"><Instagram size={17} /> Instagram</a><a href="https://www.facebook.com/susape.augusto/" target="_blank" rel="noreferrer"><Facebook size={17} /> Facebook</a><span><MessageCircle size={17} /> WhatsApp: canal a confirmar</span></div>
        <div className="footer-note"><p>Conteúdo baseado em fontes públicas consultadas em agosto de 2026. Situação de candidatura pode mudar; confirme no TSE.</p><a href="https://divulgacandcontas.tse.jus.br/" target="_blank" rel="noreferrer">Consulta oficial <ExternalLink size={14} /></a></div>
      </footer>
    </div>
  );
}
