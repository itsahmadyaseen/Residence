// components/AdvantagesFeatures.js
import { Button, TextInput, List } from "@mantine/core";
import React, { useState } from "react";

const AdvantagesFeatures = ({ label, values, setValues }) => {
  const [input, setInput] = useState("");

  const handleAdd = () => {
    if (input.trim()) {
      const newList = [...(Array.isArray(values) ? values : []), input.trim()];
      setValues(newList);
      console.log("val", newList);

      setInput("");
    }
  };

  return (
    <div>
      <h3>{label}</h3>
      <TextInput
        placeholder={`Add ${label.toLowerCase()} point`}
        value={input}
        onChange={(e) => setInput(e.currentTarget.value)}
      />
      <Button mt="sm" onClick={handleAdd}>
        Add
      </Button>
      <List withPadding mt="sm">
        {(Array.isArray(values) ? values : []).map((val, idx) => (
          <List.Item key={idx}>{val}</List.Item>
        ))}
      </List>
    </div>
  );
};

export default AdvantagesFeatures;
