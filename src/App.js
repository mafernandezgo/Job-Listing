import dataJson from './data.json';
import Card from './components/Card';
import { useState } from 'react';
import FilterBox from './components/FilterBox';

const dataParsed = dataJson.map((jobOffer) => ({
  ...jobOffer,
  tags: jobOffer.languages
    .concat(jobOffer.tools)
    .concat(jobOffer.level)
    .concat(jobOffer.role),
  apply: false,
}));

function filterByTags({ filters, tags }) {
  return filters.length > 0
    ? filters.every((filter) => tags.includes(filter))
    : true;
}

function App() {
  const [data, setData] = useState(dataParsed);
  const [arrayFilter, setArrayFilter] = useState([]);
  const [modal, setModal] = useState(false);

  function TagFilter(e) {
    setArrayFilter((prevValue) =>
      prevValue.includes(e.target.innerText)
        ? prevValue
        : [...prevValue, e.target.innerText]
    );
  }

  function BtnApply(element) {
    // setModal(!modal)
    setData((prevValue) =>
      prevValue.map((y) => {
        if (y.company === element.company) {
          return {
            ...y,
            apply: true,
          };
        } else {
          return y;
        }
      })
    );
  }

  function deleteElement(element) {
    const index = arrayFilter.findIndex((item) => item === element);
    const newArray = arrayFilter.splice(index, 1);
    setArrayFilter((prevValue) => [...prevValue]);
  }

  return (
    <div className="App">
      <header>
        <img src={process.env.PUBLIC_URL + '/images/bg-header-desktop.svg'} />
      </header>
      <div className="AppWrapper">
        {arrayFilter.length > 0 ? (
          <FilterBox
            arrayFilter={arrayFilter}
            data={data}
            deleteElement={deleteElement}
            setArrayFilter={setArrayFilter}
            setDataFilter={setData}
          />
        ) : (
          ''
        )}

        <section className="List">
          {data
            .filter(({ tags }) => filterByTags({ filters: arrayFilter, tags }))
            .map((x) => {
              return (
                <Card
                  BtnApply={() => BtnApply(x)}
                  dataInfo={x}
                  key={x.id}
                  newP={x.new}
                  TagFilter={TagFilter}
                />
              );
            })}
        </section>
      </div>
    </div>
  );
}

export default App;
