export default function Modal({ dataInfo, BtnApply, modal, setModal }) {
  const { apply, company, contract, location, position } = dataInfo

  return (
    <div className="Modal">
      <div className="ModalWrapper">
        <h2 className="Card-Position">{position} </h2>
        <h3 className="Card-Company">{company}</h3>
        <p className="description">
          {" "}
          Jo Lorem ipsum dolor, sit amet consectetur adipisicing elit. Illo
          aperiam aspernatur hic a ut, aliquid accusantium ratione autem minima
          quae reprehenderit. Deleniti nostrum nam dolores neque vel esse minus
          ullam!
        </p>
        <p className="Card-Company">
          <b>Location:</b> {location} <b>Contract:</b> {contract}
        </p>
        <button
          onClick={() => {
            setModal(!modal)
            BtnApply()
          }}
          className={`btn btn-apply ${apply ? "disable" : ""}`}
        >
          {apply ? "you have already apply" : "Apply"}
        </button>
        <button onClick={() => setModal(!modal)} className="btn btn-back">
          Back
        </button>
      </div>
    </div>
  )
}
