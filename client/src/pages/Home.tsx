import { useState } from "react";
import { ArrowRight, ArrowUpRight, Check, ChevronDown, Menu, X } from "lucide-react";

const services = [
  { n: "01", title: "Trajetória", text: "Conheça a formação, a experiência e os principais marcos apresentados em ordem clara.", tag: "PERFIL" },
  { n: "02", title: "Propostas", text: "Informações organizadas por tema para facilitar a consulta e a compreensão.", tag: "CONTEÚDO" },
  { n: "03", title: "Atuação", text: "Projetos, iniciativas e informações públicas reunidos em um único espaço.", tag: "ATUAÇÃO" },
  { n: "04", title: "Transparência", text: "Acesso simples a documentos, fontes e referências para consulta.", tag: "DADOS" },
];

const topics = [
  ["Saúde", "Informações e prioridades relacionadas à saúde pública."],
  ["Educação", "Formação, oportunidades e desenvolvimento para o RN."],
  ["Desenvolvimento", "Economia, infraestrutura, emprego e inovação."],
  ["Futuro", "Tecnologia, energia e novas oportunidades para o estado."],
];

const faq = [
  ["Onde encontro as propostas?", "As propostas ficam organizadas por tema nesta página, com espaço para documentos e informações complementares."],
  ["Como posso acompanhar as atualizações?", "Use os canais de contato e as redes oficiais indicadas no site para acompanhar novas publicações."],
  ["Posso enviar uma sugestão?", "Sim. A seção de contato foi criada para receber mensagens, sugestões e solicitações de informação."],
  ["Onde consultar documentos?", "Documentos e referências podem ser disponibilizados nesta área conforme forem publicados."],
];

export default function Home() {
  const [open, setOpen] = useState<number | null>(null);
  const [menu, setMenu] = useState(false);

  return (
    <div className="sale-site">
      <header className="sale-header">
        <a href="#top" className="brand">SUSAPE<span>.</span></a>
        <nav className={menu ? "sale-nav open" : "sale-nav"}>
          <a href="#sobre" onClick={() => setMenu(false)}>Sobre</a>
          <a href="#temas" onClick={() => setMenu(false)}>Temas</a>
          <a href="#processo" onClick={() => setMenu(false)}>Como funciona</a>
          <a href="#faq" onClick={() => setMenu(false)}>FAQ</a>
        </nav>
        <a className="header-cta" href="#contato">ENTRAR EM CONTATO <ArrowUpRight size={15}/></a>
        <button className="menu-btn" onClick={() => setMenu(!menu)} aria-label="Abrir menu">{menu ? <X/> : <Menu/>}</button>
      </header>

      <main id="top">
        <section className="sale-hero">
          <div className="hero-topline"><span>RIO GRANDE DO NORTE</span><span>INFORMAÇÃO • PROJETO • TRANSPARÊNCIA</span></div>
          <div className="hero-copy">
            <div className="eyebrow">UM NOVO ESPAÇO DIGITAL</div>
            <h1>IDEIAS QUE<br/><i>GANHAM</i><br/>FORMA.</h1>
            <p>Uma página criada para apresentar trajetória, propostas, temas e informações públicas com clareza, ritmo e uma experiência digital moderna.</p>
            <div className="hero-actions">
              <a className="primary-btn" href="#temas">CONHECER O PROJETO <ArrowRight size={17}/></a>
              <a className="text-btn" href="#sobre">SAIBA MAIS <ArrowUpRight size={16}/></a>
            </div>
          </div>
          <div className="hero-visual">
            <div className="visual-card">
              <img src="https://upload.wikimedia.org/wikipedia/commons/8/82/Natal_Rio_Grande_do_Norte_Brasil.jpg" alt="Natal, Rio Grande do Norte"/>
              <div className="visual-overlay"><span>RN / 01</span><span>NATAL — BRASIL</span></div>
            </div>
            <div className="floating-note"><strong>RN</strong><span>RIO GRANDE<br/>DO NORTE</span></div>
          </div>
          <div className="hero-bottom"><span>DESLIZE PARA EXPLORAR</span><span>↓</span></div>
        </section>

        <section id="sobre" className="intro-section">
          <div className="section-index">01 / VISÃO</div>
          <div className="intro-content">
            <div className="eyebrow">UMA EXPERIÊNCIA MAIS DIRETA</div>
            <h2>Menos ruído.<br/><em>Mais clareza.</em></h2>
            <p>O conteúdo foi pensado para que qualquer pessoa encontre rapidamente o que procura. A estrutura combina narrativa, imagens e informação em blocos objetivos, sem excesso de elementos.</p>
            <a className="line-link" href="#temas">Explorar conteúdo <ArrowUpRight size={17}/></a>
          </div>
        </section>

        <section id="temas" className="dark-section">
          <div className="dark-head"><div><span className="eyebrow">02 / CONTEÚDO</span><h2>O que você<br/><em>encontra aqui.</em></h2></div><span className="counter">04 ÁREAS</span></div>
          <div className="service-grid">
            {services.map(item => (
              <article className="service-card" key={item.n}>
                <div className="service-number">{item.n}</div>
                <div><span className="service-tag">{item.tag}</span><h3>{item.title}</h3><p>{item.text}</p></div>
                <ArrowUpRight className="service-arrow" size={20}/>
              </article>
            ))}
          </div>
        </section>

        <section className="topics-section">
          <div className="section-index">03 / TEMAS</div>
          <div className="topics-content">
            <div className="eyebrow">INFORMAÇÃO ORGANIZADA</div>
            <h2>Assuntos que<br/><em>importam ao RN.</em></h2>
            <div className="topic-list">
              {topics.map(([title, text], i) => (
                <div className="topic-row" key={title}><span>0{i + 1}</span><div><h3>{title}</h3><p>{text}</p></div><ArrowUpRight size={18}/></div>
              ))}
            </div>
          </div>
        </section>

        <section id="processo" className="process-section">
          <div className="section-index">04 / EXPERIÊNCIA</div>
          <div className="process-content">
            <div><div className="eyebrow">NAVEGAÇÃO SIMPLES</div><h2>Do primeiro clique<br/>à informação que você <em>procura.</em></h2></div>
            <div className="process-steps">
              {["Conheça o contexto", "Explore os temas", "Consulte as informações", "Entre em contato"].map((item, i) => (
                <div className="process-step" key={item}><span>0{i + 1}</span><strong>{item}</strong><Check size={17}/></div>
              ))}
            </div>
          </div>
        </section>

        <section id="faq" className="faq-section">
          <div className="section-index">05 / FAQ</div>
          <div className="faq-content"><div><div className="eyebrow">PERGUNTAS FREQUENTES</div><h2>Ficou com<br/><em>alguma dúvida?</em></h2></div>
            <div className="faq-list">{faq.map(([q,a], i) => (
              <div className={open === i ? "faq-item active" : "faq-item"} key={q}>
                <button onClick={() => setOpen(open === i ? null : i)}><span>{q}</span><ChevronDown size={19}/></button>
                {open === i && <p>{a}</p>}
              </div>
            ))}</div>
          </div>
        </section>

        <section id="contato" className="contact-section">
          <div className="contact-top"><span>06 / CONTATO</span><span>RIO GRANDE DO NORTE</span></div>
          <div className="contact-body">
            <div className="eyebrow">FALE CONOSCO</div>
            <h2>Tem uma pergunta?<br/><i>Vamos conversar.</i></h2>
            <p>Envie uma mensagem para solicitar informações, apresentar uma sugestão ou conhecer melhor o conteúdo disponível.</p>
            <a className="contact-btn" href="mailto:contato@susapeaugusto.com.br">ENTRAR EM CONTATO <ArrowUpRight size={19}/></a>
          </div>
        </section>
      </main>

      <footer className="sale-footer"><strong>SUSAPE<span>.</span></strong><span>RIO GRANDE DO NORTE</span><span>© 2026</span></footer>
    </div>
  );
}
