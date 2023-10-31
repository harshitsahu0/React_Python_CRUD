import { DeleteOutlined, LeftCircleFilled } from "@ant-design/icons";
import { Space } from "antd";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./Style.css";
import swal from "sweetalert";
import ReactReadMoreReadLess from "react-read-more-read-less";

const AddComplain = () => {
  const { id, empName } = useParams();
  const [empComplains, setEmpComplains] = useState([]);

  const getEmpComplain = () => {
    axios.get(`http://127.0.0.1:8000/api/empcomplains/${id}/`).then((res) => {
      console.log(res.data);
      setEmpComplains(res.data);
    });
  };

  const handleBackBtn = () => {
    window.history.back();
  };

  const handleCmpDelete = (id) => {
    console.log(id);
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
          .delete(`http://127.0.0.1:8000/api/complains/${id}/`)
          .then((res) => {
            console.log(res);
            getEmpComplain();
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

  useEffect(() => {
    getEmpComplain();
  }, []);

  return (
    <div
      style={{ marginTop: "50px" }}
      className="col-lg-8  col-md-12 col-sm-12 mainDataTable"
    >
      {empComplains.length > 0 ? (
        <>
          <h2 id="emplistTxt">{empName}'s Complains</h2>
          <table className="table">
            <thead>
              <tr className="tHead">
                <th scope="col" className="tbTh">
                  S.No.
                </th>
                <th scope="col" className="tbTh">
                  Employee Name
                </th>
                <th scope="col" className="tbTh">
                  Description
                </th>
                <th scope="col" className="tbTh">
                  Email
                </th>
                <th scope="col" className="tbTh">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {empComplains.map((item, i) => {
                return (
                  <tr key={item.id} className="tbRw">
                    <th scope="row">{i + 1}</th>
                    <td>{empName}</td>
                    {/* <td>{item.discriptions}</td> */}
                    <ReactReadMoreReadLess
                      charLimit={60}
                      readMoreText={"Read more..."}
                      readLessText={"Read less..."}
                      readMoreClassName="read-more-less--more"
                      readLessClassName="read-more-less--less"
                    >
                      {item.discriptions}
                    </ReactReadMoreReadLess>
                    <td>{item.email}</td>
                    <td>
                      <Space wrap>
                        <DeleteOutlined
                          id="deleteBtn"
                          onClick={() => handleCmpDelete(item.id)}
                        />{" "}
                      </Space>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
      ) : (
        <h1 className="dfltTxt">
          There are no Complaines of {empName} found.{" "}
        </h1>
      )}
      <LeftCircleFilled className="empBackBtn" onClick={handleBackBtn} />
    </div>
  );
};

export default AddComplain;
