import { useState } from "react"
import Modal from "./Modal"
import { BsCheck2Circle } from "react-icons/bs"

export default function Card({ BtnApply, dataInfo, newP, TagFilter }) {
  const {
    apply,
    company,
    contract,
    featured,
    location,
    logo,
    position,
    postedAt,
    tags,
  } = dataInfo
  // console.log(dataI)
  const [modal, setModal] = useState(false)

  return (
    <section className="Card">
      <img
        className="Card-Image"
        src={process.env.PUBLIC_URL + logo}
        alt={`logo ${company}`}
      ></img>
      <section className="CardMainInfo">
        <header className="Card-Header">
          <h3 className="Card-Company">{company}</h3>
          {newP ? <div className="newTag headerTag">NEW!</div> : ""}
          {featured ? (
            <div className="featuredTag headerTag">featured</div>
          ) : (
            ""
          )}
        </header>
        <h2 onClick={() => setModal(!modal)} className="Card-Position">
          {position}
        </h2>

        <footer className="Card-Footer">
          {`${postedAt} · ${contract} · ${location}`}
          {apply && (
            <div className="Card-Footer-Apply">
              Applied <BsCheck2Circle />
            </div>
          )}
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
      {modal && (
        <Modal
          dataInfo={dataInfo}
          modal={modal}
          setModal={setModal}
          BtnApply={BtnApply}
        />
      )}
    </section>
  )
}
