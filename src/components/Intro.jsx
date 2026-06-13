export function Intro({ copy }) {
  return (
    <section className="intro" aria-label={copy.intro.aria}>
      <div className="intro-card">
        <div className="intro-title">{copy.intro.commercialTitle}</div>
        <p className="intro-copy">{copy.intro.commercialCopy}</p>
        <div className="build-order">
          {copy.intro.chips.map((chip) => <span className="order-chip" key={chip}>{chip}</span>)}
        </div>
      </div>
      <div className="intro-card">
        <div className="intro-title">{copy.intro.scopeTitle}</div>
        <p className="intro-copy">{copy.intro.scopeCopy}</p>
      </div>
    </section>
  );
}
