export default function FilterBar({ setFilter, placeholder }) {
  return (
    <input
      type="text"
      placeholder={placeholder}
      onChange={(e) => setFilter(e.target.value)}
    />
  );
}
