import React, { useState } from "react";
import { Input, Select } from "antd";

const { Option } = Select;

interface SearchBarProps {
  tasks: any[];
  projectM: any;
  onSearch: (searchTerm: string, filterBy: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ tasks, projectM, onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterBy, setFilterBy] = useState("status");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value, filterBy);
  };

  const handleFilterChange = (value: string) => {
    setFilterBy(value);
    onSearch(searchTerm, value);
  };

  return (
    <div
      style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}
    >
      <Input.Search
        placeholder="Search tasks"
        value={searchTerm}
        onChange={handleSearch}
        style={{ width: 300, marginRight: 10 }}
      />
      <Select
        value={filterBy}
        onChange={handleFilterChange}
        style={{ width: 200 }}
      >
        <Option value="status">Status</Option>
        <Option value="dueDate">Due Date</Option>
        <Option value="assignee">Assignee</Option>
      </Select>
    </div>
  );
};

export default SearchBar;
