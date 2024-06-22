import { useSearchParams } from "react-router-dom";
import Select from "../ui/Select";

const SortBy = ({ options }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get("sortBy") || "";

  const handleSelectOption = (e) => {
    searchParams.set("sortBy", e.target.value);

    setSearchParams(searchParams);
  };

  return (
    <Select
      options={options}
      type="white"
      value={sortBy}
      onChange={handleSelectOption}
    />
  );
};

export default SortBy;
