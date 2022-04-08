export default function Card({
  company,
  contract,
  featured,
  location,
  logo,
  newP,
  position,
  postedAt,
  tags,
  TagFilter,
}) {
  return (
    <section className="Card">
      <img
        src={process.env.PUBLIC_URL + logo}
        alt={`logo ${company}`}
        // className="imagen"
      ></img>
      <section className="CardMainInfo">
        <header className="Card-Header">
          <h3 className="Card-Company">{company}</h3>
          {newP == true ? <div className="newTag headerTag">NEW!</div> : ""}
          {featured == true ? (
            <div className="featuredTag headerTag">featured</div>
          ) : (
            ""
          )}
        </header>
        <h2 className="Card-Position">{position}</h2>
        <footer className="Card-Footer">
          {`${postedAt} · ${contract} · ${location}`}
        </footer>
      </section>
      <section className="Card-tags">
        {tags
          ? tags.map((x) => {
              return (
                <div onClick={TagFilter} key={tags.indexOf(x)} className="tag">
                  {x}
                </div>
              )
            })
          : ""}
      </section>
    </section>
  )
}
