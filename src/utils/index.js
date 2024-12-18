import Papa from "papaparse";

export const getNumberValue = (value, digitsAfterPoint = 2) =>
  Math.trunc(Number(value * 10 ** digitsAfterPoint).toPrecision(10)) /
  10 ** digitsAfterPoint;

export const downloadFile = (data, filename) => {
  const link = document.createElement("a");
  link.setAttribute(
    "href",
    "data:text/plain;charset=utf-8," + encodeURIComponent(data),
  );
  link.setAttribute("download", filename);
  link.style.display = "none";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const exportToCsvFile = (data) => {
  const csv = Papa.unparse({
    fields: [
      "ID",
      "Код",
      "Назва продукту",
      "Ціна закупки",
      "Кількість",
      "Націнка",
      "Ціна",
      "Ваговий",
      "Штрихкоди",
    ],
    data: data.map((el) => [
      el.original.id,
      el.code,
      el.name,
      el.purchasePrice,
      el.quantity,
      el.margin,
      el.price,
      el.is_weight,
      el.related_barcodes,
    ]),
  });
  const filename = `products_${new Date()
    .toLocaleString()
    .replace(", ", "_")}.csv`;
  downloadFile(csv, filename);
};
