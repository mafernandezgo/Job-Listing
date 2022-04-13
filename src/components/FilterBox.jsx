export default function FilterBox({
  arrayFilter,
  data,
  deleteElement,
  setArrayFilter,
  setDataFilter,
}) {
  return (
    <div className="filterBox">
      {arrayFilter.map((x) => (
        <div key={arrayFilter.indexOf(x)} className="filterTag">
          <span>{x}</span>
          <button onClick={() => deleteElement(x)} className="filterTag-Button">
            x
          </button>
        </div>
      ))}
      <button
        onClick={() => {
          setArrayFilter([])
          setDataFilter(data)
        }}
        className="filterBox-ClearButton"
      >
        Clear
      </button>
    </div>
  )
}
