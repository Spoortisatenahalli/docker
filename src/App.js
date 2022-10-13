import React, { useState } from "react";
import "./App.css";
import MaterialTable from "material-table";
import GetAppIcon from "@material-ui/icons/GetApp";
import AddIcon from "@material-ui/icons/Add";
import { alpha } from "@material-ui/core/styles";
import * as XLSX from "xlsx";
const EXTENSIONS = ["xlsx", "xls", "csv"];
function App() {
  const [colDefs, setColDefs] = useState();
  const [tableData, setTableData] = useState()
  const [users, setUsers] = useState();
  const [columns, setColumns] = useState();
  // const UsersGet = () => {
  //   debugger;
  //   fetch("https://www.mecallapi.com/api/users")
  //     .then((res) => res.json())
  //     .then((result) => {
  //       debugger;
  //       setUsers(result);
  //     });
  // };
  // const [tableData, setTableData] = useState([
  //   {
  //     name: "Spoorti",
  //     email: "spoorti@gmail.com",
  //     phone: 6360688133,
  //     age: null,
  //     gender: "F",
  //     city: "Banglore",
  //     fee: 78456,
  //   },
  //   {
  //     name: "Mohan",
  //     email: "mohan@gmail.com",
  //     phone: 7845621590,
  //     age: 35,
  //     gender: "M",
  //     city: "Delhi",
  //     fee: 456125,
  //   },
  //   {
  //     name: "Sweety",
  //     email: "sweety@gmail.com",
  //     phone: 741852912,
  //     age: 17,
  //     gender: "F",
  //     city: "Noida",
  //     fee: 458796,
  //   },
  //   {
  //     name: "Vikas",
  //     email: "vikas@gmail.com",
  //     phone: 9876543210,
  //     age: 20,
  //     gender: "M",
  //     city: "Mumbai",
  //     fee: 874569,
  //   },
  //   {
  //     name: "Neha",
  //     email: "neha@gmail.com",
  //     phone: 7845621301,
  //     age: 25,
  //     gender: "F",
  //     city: "Patna",
  //     fee: 748521,
  //   },
  //   {
  //     name: "Mohan",
  //     email: "mohan@gmail.com",
  //     phone: 7845621590,
  //     age: 35,
  //     gender: "M",
  //     city: "Delhi",
  //     fee: 456125,
  //   },
  //   {
  //     name: "Sweety",
  //     email: "sweety@gmail.com",
  //     phone: 741852912,
  //     age: 17,
  //     gender: "F",
  //     city: "Noida",
  //     fee: 458796,
  //   },
  //   {
  //     name: "Vikas",
  //     email: "vikas@gmail.com",
  //     phone: 9876543210,
  //     age: 20,
  //     gender: "M",
  //     city: "Mumbai",
  //     fee: 874569,
  //   },
  //   {
  //     name: "Raj",
  //     email: "Raj@gmail.com",
  //     phone: 7894561230,
  //     age: null,
  //     gender: "M",
  //     city: "Chennai",
  //     fee: 78456,
  //   },
  //   {
  //     name: "Mohan",
  //     email: "mohan@gmail.com",
  //     phone: 7845621590,
  //     age: 35,
  //     gender: "M",
  //     city: "Delhi",
  //     fee: 456125,
  //   },
  //   {
  //     name: "Sweety",
  //     email: "sweety@gmail.com",
  //     phone: 741852912,
  //     age: 17,
  //     gender: "F",
  //     city: "Noida",
  //     fee: 458796,
  //   },
  //   {
  //     name: "Vikas",
  //     email: "vikas@gmail.com",
  //     phone: 9876543210,
  //     age: 20,
  //     gender: "M",
  //     city: "Mumbai",
  //     fee: 874569,
  //   },
  // ]);
  // const columns = [
  //   {
  //     title: "Name",
  //     field: "name",
  //     sorting: false,
  //     filtering: false,
  //     cellStyle: { background: "#009688" },
  //     headerStyle: { color: "#0d6efd" },
  //   },
  //   { title: "Email", field: "email", filterPlaceholder: "filter" },
  //   { title: "Phone Number", field: "phone", align: "center", grouping: false },
  //   {
  //     title: "Age",
  //     field: "age",
  //     emptyValue: () => <em>null</em>,
  //     render: (rowData) => (
  //       <div
  //         style={{
  //           background: rowData.age >= 18 ? "#008000aa" : "#f90000aa",
  //           borderRadius: "4px",
  //           paddingLeft: 5,
  //         }}
  //       >
  //         {rowData.age >= 18 ? "18+" : "18-"}
  //       </div>
  //     ),
  //     searchable: false,
  //     export: false,
  //   },
  //   { title: "Gender", field: "gender", lookup: { M: "Male", F: "Female" } },
  //   { title: "City", field: "city", filterPlaceholder: "filter" },
  //   {
  //     title: "School Fee",
  //     field: "fee",
  //     type: "currency",
  //     currencySetting: { currencyCode: "INR", minimumFractionDigits: 1 },
  //     cellStyle: { background: "#009688" },
  //     headerStyle: { color: "#fff" },
  //   },
  // ];
  const getExention = (file) => {
    const parts = file.name.split(".");
    const extension = parts[parts.length - 1];
    return EXTENSIONS.includes(extension); // return boolean
  };

  const convertToJson = (headers, tableData) => {
    const rows = [];
    tableData.forEach((row) => {
      let rowData = {};
      row.forEach((element, index) => {
        // console.log(element);
        rowData[headers[index]] = element;
      });
      rows.push(rowData);
    });
    return rows;
  };
  const importExcel = (e) => {
    const file = e.target.files[0];

    const reader = new FileReader();
    reader.onload = (event) => {
      //parse data

      const bstr = event.target.result;
      const workBook = XLSX.read(bstr, { type: "binary" });

      //get first sheet
      const workSheetName = workBook.SheetNames[0];
      // console.log(workSheetName)
      const workSheet = workBook.Sheets[workSheetName];
      //convert to array
      // console.log(workSheet)
      const fileData = XLSX.utils.sheet_to_json(workSheet, { header: 1 });
      // console.log(fileData)
      const headers = fileData[0];
      const heads = headers.map((head) => ({ title: head, field: head }));
      // console.log(heads)
      setColDefs(heads);

      fileData.splice(0, 1);

      setTableData(convertToJson(headers, fileData));
      // console.log(setData)
    };

    if (file) {
      if (getExention(file)) {
        reader.readAsBinaryString(file);
      } else {
        alert("Invalid file input, Select Excel, CSV file");
      }
    } else {
      setTableData([]);
      setColDefs([]);
    }
  };
  return (
    <div className="App">
      <h1 align="center">React-App</h1>
      <input type="file" onChange={importExcel} />

      <h4 align="center">Crash Course on Material Table </h4>

      <MaterialTable
        columns={colDefs}
        data={tableData}
        editable={{
          onRowAdd: (newRow) =>
            new Promise((resolve, reject) => {
              setTableData([...tableData, newRow]);

              setTimeout(() => resolve(), 500);
            }),
          onRowUpdate: (newRow, oldRow) =>
            new Promise((resolve, reject) => {
              const updatedData = [...tableData];
              updatedData[oldRow.tableData.id] = newRow;
              setTableData(updatedData);
              setTimeout(() => resolve(), 500);
            }),
          onRowDelete: (selectedRow) =>
            new Promise((resolve, reject) => {
              const updatedData = [...tableData];
              updatedData.splice(selectedRow.tableData.id, 1);
              setTableData(updatedData);
              setTimeout(() => resolve(), 1000);
            }),
        }}
        actions={[
          {
            icon: () => <GetAppIcon />,
            tooltip: "Click me",
            onClick: (e, data) => console.log(data),
            // isFreeAction:true
          },
        ]}
        onSelectionChange={(selectedRows) => console.log(selectedRows)}
        options={{
          sorting: true,
          search: true,
          searchFieldAlignment: "right",
          searchAutoFocus: true,
          searchFieldVariant: "standard",
          filtering: true,
          paging: true,
          pageSizeOptions: [5, 10, 20, 30, 45, 50, 100],
          pageSize: 5,
          paginationType: "stepped",
          showFirstLastPageButtons: false,
          paginationPosition: "both",
          exportButton: true,
          exportAllData: true,
          exportFileName: "Sales-Commission",
          addRowPosition: "first",
          actionsColumnIndex: -1,
          selection: true,
          showSelectAllCheckbox: false,
          showTextRowsSelected: false,
          selectionProps: (rowData) => ({
            disabled: rowData.age == null,
            // color:"primary"
          }),
          grouping: true,
          columnsButton: true,
          rowStyle: (data, index) =>
            index % 2 === 0 ? { background: "#f5f5f5" } : null,
          headerStyle: { background: "#f44336", color: "#fff" },
        }}
        title="Sales-Commission"
        icons={{ Add: () => <AddIcon /> }}
      />
      <h2>hh</h2>
    </div>
  );
}

export default App;
