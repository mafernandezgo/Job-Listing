import dataJson from "./data.json"
import Card from "./components/Card"
import { useState } from "react"
import FilterBox from "./components/FilterBox"

function App() {
  const data = dataJson.map((jobOffer) => ({
    ...jobOffer,
    tags: jobOffer.languages
      .concat(jobOffer.tools)
      .concat(jobOffer.level)
      .concat(jobOffer.role),
    apply: false,
  }))

  const [dataFilter, setDataFilter] = useState(data)
  const [arrayFilter, setArrayFilter] = useState([])

  function TagFilter(e) {
    setArrayFilter((prevValue) =>
      prevValue.includes(e.target.innerText)
        ? prevValue
        : [...prevValue, e.target.innerText]
    )
  }

  function filterByTags({ filters, tags }) {
    return filters.length > 0
      ? filters.every((filter) => tags.includes(filter))
      : true
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

  function deleteElement(element) {
    const index = arrayFilter.findIndex((item) => item === element)
    const newArray = arrayFilter.splice(index, 1)
    setArrayFilter((prevValue) => [...prevValue])
  }

  return (
    <div className="App">
      <header>
        <picture>
          <source
            media="(max-width:800px)"
            srcSet={process.env.PUBLIC_URL + "/images/bg-header-mobile.svg"}
          ></source>
          <img
            alt="Header Background"
            src={process.env.PUBLIC_URL + "/images/bg-header-desktop.svg"}
          />
        </picture>
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
          {dataFilter
            .filter(({ tags }) => filterByTags({ tags, filters: arrayFilter }))
            .map((x) => {
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
