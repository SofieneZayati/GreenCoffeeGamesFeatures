export function Intro({ copy }) {
  return (
    <section className="intro" aria-label={copy.intro.aria}>
      <div className="intro-card hero-card">
        <div className="hero-copy">
          <span className="section-kicker"><i className="ti ti-coffee" aria-hidden="true" /> {copy.intro.kicker}</span>
          <div className="intro-title">{copy.intro.commercialTitle}</div>
          <p className="intro-copy">{copy.intro.commercialCopy}</p>
          <div className="build-order">
            {copy.intro.chips.map((chip) => <span className="order-chip" key={chip}>{chip}</span>)}
          </div>
        </div>
        <div className="coffee-visual" aria-hidden="true">
          <span className="steam steam-one" />
          <span className="steam steam-two" />
          <span className="steam steam-three" />
          <span className="cup-bowl" />
          <span className="cup-handle" />
          <span className="cup-plate" />
        </div>
      </div>
      <div className="intro-card scope-card">
        <div className="scope-icon"><i className="ti ti-clipboard-check" aria-hidden="true" /></div>
        <div>
          <span className="section-kicker">{copy.intro.scopeKicker}</span>
          <div className="intro-title">{copy.intro.scopeTitle}</div>
          <p className="intro-copy">{copy.intro.scopeCopy}</p>
        </div>
      </div>
    </section>
  );
}
