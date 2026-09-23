import { useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";

const projects = [
  { n:"01", title:"Rio Grande do Norte", text:"Identidade, território e desenvolvimento com foco no que é público e verificável.", image:"https://upload.wikimedia.org/wikipedia/commons/8/82/Natal_Rio_Grande_do_Norte_Brasil.jpg" },
  { n:"02", title:"Saúde", text:"Uma agenda de saúde pública apresentada de forma simples, visual e direta.", image:"https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1400&q=85" },
  { n:"03", title:"Educação & oportunidades", text:"Informação sobre formação, juventude, trabalho e oportunidades no RN.", image:"https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1400&q=85" },
  { n:"04", title:"Energia & futuro", text:"Potencial do estado, inovação, energia renovável e desenvolvimento sustentável.", image:"https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1400&q=85" },
];

const gallery = [
  "https://upload.wikimedia.org/wikipedia/commons/8/82/Natal_Rio_Grande_do_Norte_Brasil.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/b/b1/Apr2024._Catedral_Metropolitana_de_Nossa_Senhora_Da_Apresenta%C3%A7%C3%A3o%2C_Natal%2C_Brazil_01.jpg",
  "https://images.unsplash.com/photo-1473116763249-2faaef81ccda?auto=format&fit=crop&w=1200&q=85",
];

export default function Home() {
  const [open, setOpen] = useState(false);
  const nav = [["Manifesto","#manifesto"],["Projeto","#projeto"],["Sobre","#sobre"],["Galeria","#galeria"],["Contato","#contato"]];

  return (
    <div className="v-site">
      <header className="v-header">
        <a href="#inicio" className="v-logo">SUSAPE<span>·</span>1234</a>
        <nav className={open ? "v-nav is-open" : "v-nav"}>
          {nav.map(([label,href]) => <a key={href} href={href} onClick={()=>setOpen(false)}>{label}</a>)}
        </nav>
        <a href="#contato" className="v-header-link">Falar conosco <ArrowUpRight size={16}/></a>
        <button className="v-menu" onClick={()=>setOpen(!open)} aria-label="Menu">{open?<X/>:<Menu/>}</button>
      </header>

      <main>
        <section id="inicio" className="v-hero">
          <div className="v-hero-meta"><span>RIO GRANDE DO NORTE</span><span>2026</span></div>
          <div className="v-hero-copy">
            <p className="v-kicker">DEPUTADO FEDERAL · RN</p>
            <h1>ORGULHO<br/><i>DE SER</i><br/>POTIGUAR.</h1>
            <p className="v-lead">Um espaço digital para apresentar trajetória, ideias, propostas e informações públicas de forma clara.</p>
            <a className="v-round-link" href="#manifesto">Explorar <ArrowUpRight size={18}/></a>
          </div>
          <div className="v-hero-image">
            <img src="https://upload.wikimedia.org/wikipedia/commons/8/82/Natal_Rio_Grande_do_Norte_Brasil.jpg" alt="Rio Grande do Norte"/>
            <span className="v-image-caption">NATAL / RN — TERRITÓRIO E IDENTIDADE</span>
          </div>
          <div className="v-scroll">SCROLL ↓</div>
        </section>

        <section id="manifesto" className="v-manifesto">
          <div className="v-side-label">01 / MANIFESTO</div>
          <div>
            <p className="v-kicker">UMA VISÃO DIRETA</p>
            <h2>Fazer sentido começa por <em>ouvir</em> o território.</h2>
            <p className="v-text">Este site foi reorganizado para colocar o conteúdo no centro: menos ruído, mais espaço, tipografia forte, fotografia e navegação objetiva. As informações devem ser apresentadas com contexto e fontes, permitindo que cada pessoa forme sua própria opinião.</p>
          </div>
        </section>

        <section id="projeto" className="v-projects">
          <div className="v-section-head"><div><span className="v-kicker">02 / PROJETO</span><h2>Temas em foco</h2></div><span>04 EIXOS</span></div>
          <div className="v-project-grid">
            {projects.map(p=><article className="v-project" key={p.n}>
              <div className="v-project-image"><img src={p.image} alt={p.title}/><span>{p.n}</span></div>
              <div className="v-project-info"><h3>{p.title}</h3><p>{p.text}</p><a href="#contato">Ver tema <ArrowUpRight size={15}/></a></div>
            </article>)}
          </div>
        </section>

        <section id="sobre" className="v-about">
          <div className="v-side-label">03 / SOBRE</div>
          <div className="v-about-layout">
            <div><p className="v-kicker">TRAJETÓRIA</p><h2>Uma presença pública com identidade <em>potiguar.</em></h2></div>
            <div className="v-text-column"><p>Susape Augusto é apresentado aqui a partir de trajetória, formação, atuação e informações públicas. A proposta visual transforma a página em uma experiência editorial, sem esconder o conteúdo atrás de excesso de elementos.</p><a className="v-line-link" href="#contato">Conheça mais <ArrowUpRight size={17}/></a></div>
          </div>
        </section>

        <section id="galeria" className="v-gallery">
          <div className="v-section-head"><div><span className="v-kicker">04 / GALERIA</span><h2>O estado em imagens</h2></div></div>
          <div className="v-gallery-grid">
            {gallery.map((src,i)=><figure key={src}><img src={src} alt={`Rio Grande do Norte — imagem ${i+1}`}/><figcaption>RN / 0{i+1}</figcaption></figure>)}
          </div>
        </section>

        <section id="contato" className="v-contact">
          <div className="v-side-label">05 / CONTATO</div>
          <div><p className="v-kicker">PARTICIPE DA CONVERSA</p><h2>Tem uma ideia?<br/><em>Vamos ouvir.</em></h2><a className="v-contact-button" href="mailto:contato@susapeaugusto.com.br">Entrar em contato <ArrowUpRight size={19}/></a></div>
        </section>
      </main>

      <footer className="v-footer"><span>SUSAPE · 1234</span><span>RIO GRANDE DO NORTE</span><span>© 2026</span></footer>
    </div>
  );
}
