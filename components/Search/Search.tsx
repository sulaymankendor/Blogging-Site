import { connectSearchBox } from "react-instantsearch-dom";

function Search({ refine, searchValues, values }) {
  return (
    <form action="" role="search" onSubmit={(e) => e.preventDefault()}>
      <input
        id="algolia_search"
        type="search"
        placeholder="Search..."
        className="border-2 outline-none px-2 py-1 w-96 rounded-md"
        onChange={(e) => {
          refine(e.currentTarget.value);
          searchValues(e.target.value);
        }}
        value={values}
      />
    </form>
  );
}
export default connectSearchBox(Search);
