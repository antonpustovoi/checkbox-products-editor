import { useState } from "react";

import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import { CircularProgress, IconButton, OutlinedInput } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import PropTypes from "prop-types";

import * as Q from "@queries";

AddBarcodeField.propTypes = {
  row: PropTypes.object,
  values: PropTypes.array,
  onAdd: PropTypes.func
};

export function AddBarcodeField(props) {
  const { row, values, onAdd } = props;

  const [inputValue, setInputValue] = useState("");

  const { data, isFetching } = useQuery({
    queryKey: ["Good", inputValue],
    queryFn: Q.getGood,
    enabled: Boolean(inputValue),
    gcTime: 0
  });

  const isBarcodeExist = Boolean(
    data && (data.code !== row.code || values.includes(inputValue))
  );

  const isError = Boolean(inputValue && !isFetching && isBarcodeExist);

  const isValid = Boolean(inputValue && !isFetching && !isBarcodeExist);

  const handleClick = () => {
    setInputValue("");
    onAdd(inputValue);
  };

  const handleChange = (event) => setInputValue(event.target.value);

  const renderAdornment = () => {
    if (isFetching) {
      return <CircularProgress color="inherit" size={20} />;
    } else if (isValid) {
      return <CheckCircleOutlineOutlinedIcon sx={{ color: "success.main" }} />;
    } else if (isError) {
      return <ErrorOutlineOutlinedIcon sx={{ color: "error.main" }} />;
    }
  };

  return (
    <>
      <OutlinedInput
        fullWidth
        value={inputValue}
        placeholder="Введіть штрих-код"
        error={isError}
        onChange={handleChange}
        endAdornment={renderAdornment()}
      />
      <IconButton onClick={handleClick} disabled={!isValid}>
        <SaveOutlinedIcon />
      </IconButton>
    </>
  );
}