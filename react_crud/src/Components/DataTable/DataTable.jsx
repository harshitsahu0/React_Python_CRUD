import React, { useEffect, useState } from "react";
import axios from "axios";
import { Space } from "antd";
import swal from "sweetalert";
import "./DataTable.css";
import {
  EditOutlined,
  DeleteOutlined,
  Loading3QuartersOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

const DataTable = (props) => {
  const [search, setSearch] = useState("");
  const [current, setCurrent] = useState(1);
  const [searchRst, setSearchRst] = useState([]);
  const [srchState, setSrchState] = useState(false);
  const [show, setShow] = useState(1);
  const [selectedRows, setSelectedRows] = useState(4);
  const itemPerpage = selectedRows;
  const itemPerpageSrch = 8;
  const totalItemPerPages = props.data.length;
  const totalPages = Math.ceil(totalItemPerPages / itemPerpage);

  const getPageNumbers = () => {
    const totalNumPages = [];
    for (let i = 1; i <= totalPages; i++) {
      totalNumPages.push(i);
    }
    return totalNumPages;
  };

  const pagesToShow = 1;
  const pageNumbers = getPageNumbers();

  const visiblePageNumbers = pageNumbers.filter(
    (pageNumber) =>
      pageNumber >= current - pagesToShow && pageNumber <= current + pagesToShow
  );

  const [totalSrchRst, setTotalSrchRst] = useState();
  const getPageNumbersSrchRst = () => {
    const totalNumPages = [];
    for (let i = 1; i <= totalSrchRst; i++) {
      totalNumPages.push(i);
    }
    return totalNumPages;
  };

  useEffect(() => {
    getPageNumbers();
    getPageNumbersSrchRst();
  }, [totalSrchRst, props.data]);

  const handleDelete = (id) => {
    swal({
      title: "Are you sure? ",
      text: "Once deleted, you will not be able to recover this Data",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal("successfull!", "Your details deleted!", "success");
        swal({
          title: "Deleted",
          text: "Your details deleted!",
          icon: "success",
          timer: 2000,
          buttons: false,
        });
        axios
          .delete(`http://127.0.0.1:8000/api/companies/${id}/`)
          .then((res) => {
            console.log(res);
            props.getData();
          });
      } else {
        swal({
          title: "Cancelled",
          text: "Your Data is Safe!",
          timer: 2000,
          buttons: false,
        });
      }
    });
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
    var values = props.data.filter(
      (item) =>
        item.name
          .toString()
          .toLowerCase()
          .includes(e.target.value.toString().toLowerCase()) ||
        item.description
          .toString()
          .toLowerCase()
          .includes(e.target.value.toString().toLowerCase()) ||
        item.founded_date
          .toString()
          .toLowerCase()
          .includes(e.target.value.toString().toLowerCase()) ||
        item.headquarters_location
          .toString()
          .toLowerCase()
          .includes(e.target.value.toString().toLowerCase())
    );
    setSearchRst(values);
    const pages = Math.ceil(values.length / 8);
    console.log(pages);
    setTotalSrchRst(pages);
    setSrchState(true);
    console.log(values);
    if (values.length > 0) {
      if (document.getElementById("pTag") !== null) {
        document.getElementById("pTag").style.display = "none";
      }
    } else if (e.target.value !== "" && values.length === 0) {
      console.log("no search result found!");
      setSrchState(true);
      if (document.getElementById("pTag") !== null) {
        document.getElementById("pTag").style.display = "block";
      }
    }
    if (e.target.value === "") {
      setSrchState(false);
    }
  };

  useEffect(() => {
    setSelectedRows(10);
  }, []);

  const number_of_rows = [3, 5, 7, 9];

  return (
    <div
      style={{ marginTop: "10px" }}
      className="col-lg-11 col-md-12 col-sm-12 mainDataTable"
    >
      <div className="row">
        <div className="mainSearchDiv col-lg-6 col-md-6 col-sm-12">
          {/* <input type="text" placeholder='Search company...' id='srchInpt' value={search} onChange={handleSearch} /> */}
          <h1 id="CmpTxt">Companies List</h1>
          {/* <select
            value={selectedRows}
            onChange={(e) => setSelectedRows(parseInt(e.target.value))}
            style={{ color: "black", borderRadius: "5px" }}
          >
            <option value="">Select Number of Rows</option>
            {number_of_rows.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select> */}
        </div>
        <div className="super_main_day4 col-lg-6 col-md-6 col-sm-12">
          <div className="main_day4 active">
            <input
              type="text"
              className="input"
              id="input"
              placeholder="Search..."
              value={search}
              onChange={handleSearch}
            />
            <button id="btn">
              {/* <i className="fas fa-search"></i> */}
              <SearchOutlined />
            </button>
          </div>
        </div>
      </div>
      {srchState ? (
        <>
          {searchRst.length === 0 ? (
            <div id="pTag">
              <p>No search result Found</p>
            </div>
          ) : (
            <table className="table">
              <thead>
                <tr className="tHead">
                  <th scope="col" className="tbTh">
                    S.No.
                  </th>
                  <th scope="col" className="tbTh">
                    C ompanies Names
                  </th>
                  <th scope="col" className="tbTh">
                    Description
                  </th>
                  <th scope="col" className="tbTh">
                    Founded Date
                  </th>
                  <th scope="col" className="tbTh">
                    Headquarters Location
                  </th>
                  <th scope="col" className="tbTh">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {searchRst
                  .slice(
                    (current - 1) * itemPerpageSrch,
                    current * itemPerpageSrch
                  )
                  .map((item, i) => {
                    const itemIndex = (current - 1) * itemPerpageSrch + i + 1;
                    return (
                      <tr key={item.id} className="tbRw">
                        <th scope="row">{itemIndex}</th>
                        <td>
                          <Link
                            id="lnk"
                            to={`/employee/${item.id}/${item.name}`}
                          >
                            {item.name}
                          </Link>
                        </td>
                        <td>{item.description}</td>
                        <td>{item.founded_date}</td>
                        <td>{item.headquarters_location}</td>
                        <td>
                          <Space wrap>
                            <EditOutlined
                              data-bs-toggle="modal"
                              data-bs-target="#exampleModal"
                              id="updateBtn"
                              onClick={() =>
                                props.handleUpdateState(
                                  item.name,
                                  item.description,
                                  item.founded_date,
                                  item.headquarters_location,
                                  item.id
                                )
                              }
                            />
                            <DeleteOutlined
                              id="deleteBtn"
                              onClick={() => handleDelete(item.id)}
                            />{" "}
                          </Space>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          )}
          <div className="pagination col-lg-3">
            {totalSrchRst > 1 && (
              <div className="mainPage">
                <button
                  onClick={() => setCurrent(current - 1)}
                  className="next-prev-btn"
                  disabled={current === 1}
                >
                  Previous
                </button>
                {getPageNumbersSrchRst().map((pageNumber) => (
                  <button
                    key={pageNumber}
                    className={pageNumber === current ? "active" : ""}
                    onClick={() => setCurrent(pageNumber)}
                  >
                    {pageNumber}
                  </button>
                ))}
                <button
                  onClick={() => setCurrent(current + 1)}
                  className="next-prev-btn"
                  disabled={current === totalPages}
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </>
      ) : props.data.length > 0 ? (
        <>
          <table className="table">
            <thead>
              <tr className="tHead">
                <th scope="col" className="tbTh">
                  S.No.
                </th>
                <th scope="col" className="tbTh">
                  Companies Names
                </th>
                <th scope="col" className="tbTh">
                  Description
                </th>
                <th scope="col" className="tbTh">
                  Founded Date
                </th>
                <th scope="col" className="tbTh">
                  Headquarters Location
                </th>
                <th scope="col" className="tbTh">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {props.data
                .slice((current - 1) * itemPerpage, current * itemPerpage)
                .map((item, i) => {
                  const itemIndex = (current - 1) * itemPerpage + i + 1;
                  return (
                    <tr key={item.id} className="tbRw">
                      <th scope="row">{itemIndex}</th>
                      <td>
                        {" "}
                        <Link id="lnk" to={`/employee/${item.id}/${item.name}`}>
                          {item.name}
                        </Link>
                      </td>
                      <td>{item.description}</td>
                      <td>{item.founded_date}</td>
                      <td>{item.headquarters_location}</td>
                      <td>
                        <Space wrap>
                          <EditOutlined
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModal"
                            id="updateBtn"
                            onClick={() =>
                              props.handleUpdateState(
                                item.name,
                                item.description,
                                item.founded_date,
                                item.headquarters_location,
                                item.id
                              )
                            }
                          />
                          <DeleteOutlined
                            id="deleteBtn"
                            onClick={() => handleDelete(item.id)}
                          />{" "}
                        </Space>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
          <div className="pagination">
            <div>
              {totalPages > 1 && (
                <div className="mainPage">
                  <button
                    onClick={() => setCurrent(current - 1)}
                    className="next-prev-btn"
                    disabled={current === 1}
                  >
                    Previous
                  </button>
                  {current > pagesToShow + 1 && (
                    <>
                      <button onClick={() => setCurrent(1)}>1</button>
                      {current > pagesToShow + 2 && <span>...</span>}
                    </>
                  )}
                  {visiblePageNumbers.map((pageNumber) => (
                    <button
                      key={pageNumber}
                      className={pageNumber === current ? "active" : ""}
                      onClick={() => setCurrent(pageNumber)}
                    >
                      {pageNumber}
                    </button>
                  ))}
                  {current < totalPages - pagesToShow && (
                    <>
                      {current < totalPages - pagesToShow - 1 && (
                        <span>...</span>
                      )}
                      <button onClick={() => setCurrent(totalPages)}>
                        {totalPages}
                      </button>
                    </>
                  )}
                  <button
                    onClick={() => setCurrent(current + 1)}
                    className="next-prev-btn"
                    disabled={current === totalPages}
                  >
                    Next
                  </button>
                </div>
              )}
            </div>
            <div>
              <select
                value={selectedRows}
                onChange={(e) => setSelectedRows(parseInt(e.target.value))}
                style={{ color: "black", borderRadius: "5px" }}
              >
                <option value="10">Select Number of Rows</option>
                {number_of_rows.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </>
      ) : (
        <h3>There is no comapnies yet.</h3>
      )}
    </div>
  );
};

export default DataTable;
