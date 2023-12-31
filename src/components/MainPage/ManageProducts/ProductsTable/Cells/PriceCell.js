import ArrowDownward from "@mui/icons-material/ArrowDownward";
import ArrowUpward from "@mui/icons-material/ArrowUpward";
import { IconButton } from "@mui/material";
import PropTypes from "prop-types";

import { useProductsContext } from "../../ProductsContext";

PriceCell.propTypes = {
  row: PropTypes.object
};

export function PriceCell(props) {
  const { code, price, original } = props.row;

  const { setProducts } = useProductsContext();

  const handleCeilClick = (e) =>
    setProducts((draftProducts) => {
      const foundProduct = draftProducts.find(
        (product) => product.code === code
      );
      foundProduct.price = Math.ceil(price);
    });

  const handleFiftyClick = () =>
    setProducts((draftProducts) => {
      const foundProduct = draftProducts.find(
        (product) => product.code === code
      );
      foundProduct.price = Math.trunc(price) + 0.5;
    });

  const handleFloorClick = () =>
    setProducts((draftProducts) => {
      const foundProduct = draftProducts.find(
        (product) => product.code === code
      );
      foundProduct.price = Math.floor(price);
    });

  const iconButtonProps = {
    tabIndex: -1,
    sx: { padding: "2px" }
  };

  return (
    <div css={{ display: "flex", alignItems: "center", width: "100%" }}>
      {price ? Number(price).toFixed(2) : "-"}
      {Boolean(original.price && price && price > original.price) && (
        <ArrowUpward sx={{ color: "#FF0000" }} />
      )}
      {Boolean(original.price && price && price < original.price) && (
        <ArrowDownward sx={{ color: "#00FF00" }} />
      )}
      {Boolean(price) && (
        <div
          onDoubleClick={(event) => event.stopPropagation()}
          css={{ display: "flex", flexDirection: "column", marginLeft: "auto" }}
        >
          <IconButton {...iconButtonProps} onClick={handleCeilClick}>
            <ArrowUpward sx={{ height: "14px", width: "14px" }} />
          </IconButton>
          <IconButton {...iconButtonProps} onClick={handleFiftyClick}>
            <span style={{ fontSize: "12px", fontWeight: "bold" }}>50</span>
          </IconButton>
          <IconButton {...iconButtonProps} onClick={handleFloorClick}>
            <ArrowDownward sx={{ height: "14px", width: "14px" }} />
          </IconButton>
        </div>
      )}
    </div>
  );
}
