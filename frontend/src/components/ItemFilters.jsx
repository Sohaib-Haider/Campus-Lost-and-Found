import { categories, locations } from '../data/sampleItems.js'


function ItemFilters({ filters, onChange, onClear }) {
  function handleChange(event) {
    onChange({ ...filters, [event.target.name]: event.target.value })
  }

  return (
    <form className="filters" onSubmit={(event) => event.preventDefault()}>
      <div className="filter-field">
        <label htmlFor="searchText">Search</label>
        <input
          id="searchText"
          name="searchText"
          type="search"
          placeholder="Search titles and descriptions"
          value={filters.searchText}
          onChange={handleChange}
        />
      </div>

      <div className="filter-field">
        <label htmlFor="category">Category</label>
        <select id="category" name="category" value={filters.category} onChange={handleChange}>
          <option value="">All categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>

      <div className="filter-field">
        <label htmlFor="type">Lost or found</label>
        <select id="type" name="type" value={filters.type} onChange={handleChange}>
          <option value="">Lost and found</option>
          <option value="lost">Lost</option>
          <option value="found">Found</option>
        </select>
      </div>

      <div className="filter-field">
        <label htmlFor="location">Location</label>
        <select id="location" name="location" value={filters.location} onChange={handleChange}>
          <option value="">All locations</option>
          {locations.map((location) => (
            <option key={location} value={location}>{location}</option>
          ))}
        </select>
      </div>

      <button type="button" onClick={onClear}>Clear filters</button>
    </form>
  )
}

export default ItemFilters
