import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Space } from 'antd';
import swal from 'sweetalert';
import "./DataTable.css"
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom';

const DataTable = (props) => {
    const [search, setSearch] = useState("");
    const [current, setCurrent] = useState(1);
    const [searchRst, setSearchRst] = useState([]);
    const [srchState, setSrchState] = useState(false);
    const itemPerpage = 10;
    const itemPerpageSrch = 8;

    const totalItemPerPages = props.data.length;
    const totalPages = Math.ceil(totalItemPerPages / itemPerpage)

    const getPageNumbers = () => {
        const totalNumPages = [];
        for (let i = 1; i <= totalPages; i++) {
            totalNumPages.push(i);
        }
        return totalNumPages;
    }
    const [totalSrchRst, setTotalSrchRst] = useState();
    // const totalSrchRst = Math.ceil(searchRst / 8);
    const getPageNumbersSrchRst = () => {
        const totalNumPages = [];
        for (let i = 1; i <= totalSrchRst; i++) {
            totalNumPages.push(i);
        }
        return totalNumPages;
    }

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
                axios.delete(`http://127.0.0.1:8000/api/companies/${id}/`).then((res) => {
                    console.log(res);
                    props.getData();
                })
            } else {
                swal("Your Data is safe!");
            }
        });
    }
    const handleSearch = (e) => {
        setSearch(e.target.value);
        var values = props.data.filter((item) => item.name.toString().toLowerCase().includes(e.target.value.toString().toLowerCase()) || item.description.toString().toLowerCase().includes(e.target.value.toString().toLowerCase()) || item.founded_date.toString().toLowerCase().includes(e.target.value.toString().toLowerCase()) || item.headquarters_location.toString().toLowerCase().includes(e.target.value.toString().toLowerCase()));
        setSearchRst(values);
        const pages = Math.ceil(values.length / 8);
        console.log(pages);
        setTotalSrchRst(pages);
        setSrchState(true);
        console.log(values);
        if (values.length > 0) {
            if (document.getElementById("pTag") !== null) {
                document.getElementById("pTag").style.display = "none"
            }
        }
        else if (e.target.value !== "" && values.length === 0) {
            console.log("no search result found!");
            setSrchState(true);
            if (document.getElementById("pTag") !== null) {
                document.getElementById("pTag").style.display = "block"
            }
        }
        // if (values.length === 0) {
        //     setSrchState(false);
        // } else {
        //     setSrchState(true);
        // }


        if (e.target.value === "") {
            setSrchState(false);
        }
    }
    return (
        <div style={{ marginTop: "10px" }} className='col-lg-11 col-md-12 col-sm-12 mainDataTable'>
            <div className='mainSearchDiv col-lg-6'>
                <input type="text" placeholder='Search company...' id='srchInpt' value={search} onChange={handleSearch} />
            </div>
            {
                srchState ?
                    <>
                        {
                            searchRst.length == 0
                                ? <div id='pTag'><p>No search result Found</p></div>
                                : <table className="table table-success table-striped">
                                    <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Company Name</th>
                                            <th scope="col">description</th>
                                            <th scope="col">founded_date</th>
                                            <th scope="col">headquarters_location</th>
                                            <th scope="col">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {searchRst.slice((current - 1) * itemPerpageSrch, current * itemPerpageSrch).map((item, i) => {
                                            const itemIndex = (current - 1) * itemPerpageSrch + i + 1;
                                            return (
                                                <tr key={item.id}>
                                                    <th scope="row">{itemIndex}</th>
                                                    <td>{item.name}</td>
                                                    <td>{item.description}</td>
                                                    <td>{item.founded_date}</td>
                                                    <td>{item.headquarters_location}</td>
                                                    <td>
                                                        <Space wrap>
                                                            <button data-bs-toggle="modal" data-bs-target="#exampleModal" id='updateBtn' onClick={() => props.handleUpdateState(item.name, item.description, item.founded_date, item.headquarters_location, item.id)}>
                                                                <EditOutlined />
                                                            </button>
                                                            <button type="primary" id='deleteBtn' onClick={() => handleDelete(item.id)}><DeleteOutlined /> </button>
                                                        </Space>
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                        }
                        <div className="pagination col-lg-3">
                            {totalSrchRst > 1 && (
                                <div className='mainPage'>
                                    <button onClick={() => setCurrent(current - 1)} className='next-prev-btn' disabled={current === 1}>
                                        Previous
                                    </button>
                                    {getPageNumbersSrchRst().map((pageNumber) => (
                                        <button key={pageNumber} className={pageNumber === current ? 'active' : ''} onClick={() => setCurrent(pageNumber)} >
                                            {pageNumber}
                                        </button>
                                    ))}
                                    <button onClick={() => setCurrent(current + 1)} className='next-prev-btn' disabled={current === totalPages}>
                                        Next
                                    </button>
                                </div>
                            )}
                        </div>
                    </>
                    : (props.data.length > 0)
                        ? <>
                            <table className="table table-success table-striped">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Company Name</th>
                                        <th scope="col">description</th>
                                        <th scope="col">founded_date</th>
                                        <th scope="col">headquarters_location</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {props.data.slice((current - 1) * itemPerpage, current * itemPerpage).map((item, i) => {
                                        const itemIndex = (current - 1) * itemPerpage + i + 1;
                                        return (
                                            <tr key={item.id}>
                                                <th scope="row">{itemIndex}</th>
                                                <td> <Link to={`/employee/${item.id}/${item.name}`}>{item.name}</Link></td>
                                                <td>{item.description}</td>
                                                <td>{item.founded_date}</td>
                                                <td>{item.headquarters_location}</td>
                                                <td>
                                                    <Space wrap>
                                                        <button data-bs-toggle="modal" data-bs-target="#exampleModal" id='updateBtn' onClick={() => props.handleUpdateState(item.name, item.description, item.founded_date, item.headquarters_location, item.id)}>
                                                            <EditOutlined />
                                                        </button>
                                                        <button type="primary" id='deleteBtn' onClick={() => handleDelete(item.id)}><DeleteOutlined /> </button>
                                                    </Space>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                            <div className="pagination col-lg-3">
                                {totalPages > 1 && (
                                    <div className='mainPage'>
                                        <button onClick={() => setCurrent(current - 1)} className='next-prev-btn' disabled={current === 1}>
                                            Previous
                                        </button>
                                        {getPageNumbers().map((pageNumber) => (
                                            <button key={pageNumber} className={pageNumber === current ? 'active' : ''} onClick={() => setCurrent(pageNumber)} >
                                                {pageNumber}
                                            </button>
                                        ))}
                                        <button onClick={() => setCurrent(current + 1)} className='next-prev-btn' disabled={current === totalPages}>
                                            Next
                                        </button>
                                    </div>
                                )}
                            </div>
                        </>
                        : ""
            }
        </div >
    )
}

export default DataTable