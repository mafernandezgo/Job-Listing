import dataJson from "./data.json"
import Card from "./components/Card"
import { useState } from "react"
import FilterBox from "./components/FilterBox"

function App() {
  const [data, setData] = useState(
    dataJson.map((jobOffer) => ({
      ...jobOffer,
      tags: jobOffer.languages
        .concat(jobOffer.tools)
        .concat(jobOffer.level)
        .concat(jobOffer.role),
      apply: false,
    }))
  )
  const [dataFilter, setDataFilter] = useState(data)
  const [arrayFilter, setArrayFilter] = useState([])
  const [modal, setModal] = useState(false)

  function TagFilter(e) {
    setArrayFilter((prevValue) => [...prevValue, e.target.innerText])
    if (arrayFilter.length > 0) {
      for (let i = 0; i < arrayFilter.length; i++) {
        setDataFilter(
          dataFilter.filter((job) => job.tags.includes(arrayFilter[i]))
        )
      }
    } else setDataFilter(data)
  }

  function BtnApply(element) {
    // setModal(!modal)
    setDataFilter((prevValue) =>
      prevValue.map((y) => {
        if (y.company === element.company) {
          return {
            ...y,
            apply: true,
          }
        } else {
          return y
        }
      })
    )
  }

  console.log(dataFilter)

  function deleteElement(element) {
    const index = arrayFilter.findIndex((item) => item === element)
    const newArray = arrayFilter.splice(index, 1)
    setArrayFilter((prevValue) => [...prevValue])
  }

  return (
    <div className="App">
      <header>
        <img
          src={process.env.PUBLIC_URL + "/images/bg-header-desktop.svg"}
        ></img>
      </header>
      <div className="AppWrapper">
        {arrayFilter.length > 0 ? (
          <FilterBox
            arrayFilter={arrayFilter}
            data={data}
            deleteElement={deleteElement}
            setArrayFilter={setArrayFilter}
            setDataFilter={setDataFilter}
          />
        ) : (
          ""
        )}

        <section className="List">
          {dataFilter.map((x) => {
            return (
              <Card
                BtnApply={() => BtnApply(x)}
                dataInfo={x}
                key={x.id}
                newP={x.new}
                TagFilter={TagFilter}
              />
            )
          })}
        </section>
      </div>
    </div>
  )
}

export default App
