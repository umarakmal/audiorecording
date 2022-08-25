import React, { useEffect, useState } from "react";
import Header from "./Header";
import "jquery/dist/jquery.min.js";
import Footer from "./Footer";
import DatePicker from "react-datepicker";
import "../css/report.css";
import {
  DataGrid,
  GridToolbarExport,
  GridToolbarContainer,
} from "@material-ui/data-grid";
import "react-datepicker/dist/react-datepicker.css";
import Menu from "./Menu";

function MyExportButton() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

const Report = () => {
  const columns = [
    { field: "id", headerName: "S.No.", width: 115 },
    { field: "name", headerName: "Name", width: 150 },
    { field: "mobile", headerName: "Mobile Number", width: 180 },
    { field: "audioURL", headerName: "Recordings", width: 440 },
    { field: "createdAt", headerName: "Recording Date", width: 180 },
  ];
  const [getuserdata, setUserdata] = useState([]);
  const [startDate, setStartDate] = useState("");
  // console.log(startDate);
  const [endDate, setEndDate] = useState("");
  const [show, setShow] = useState(false);

  const postData = async (e) => {
    e.preventDefault();

    const date1 = startDate.toISOString();
    const date2 = endDate.toISOString();
    var body = {
      date1,
      date2,
    };

    const res = await fetch("/api/allusersrecordingwithdate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        date1,
        date2,
      }),
    });
    {
      const data = await res.json();
      console.log(data);
      setUserdata(data);
    }

    setShow(true);
  };

  const rows = getuserdata.map((element, index) => ({
    id: index + 1,
    _id: element._id,
    name: element.name,
    mobile: element.mobile,
    audioURL: element.audioURL,
    createdAt: element.createdAt,
  }));

  return (
    <div>
      <Header />
      <Menu />
      <div
        style={{ minHeight: "36rem", fontSize: "13px" }}
        className="content-wrapper"
      >
        <section className="content">
          <div className="container-fluid">
            <div className="col-md-12 mt-2">
              <div className="card card-dark">
                <div className="card-header">
                  <center>
                    <h2 className="card-title">Report</h2>
                  </center>
                </div>

                <div className="container-fluid">
                  <form>
                    <div className="card-body">
                      <div className="row mt-2">
                        <div className="form-group offset-md-3 ">
                          <label htmlFor="date1" className="form-label">
                            From
                          </label>

                          <DatePicker
                            selected={startDate}
                            selectsStart
                            placeholderText="Select Date"
                            value={startDate}
                            onChange={(date) => setStartDate(date)}
                            dateFormat="yyyy-MM-dd"
                            id="date1"
                            autoComplete="off"
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="date2" className="form-label">
                            To
                          </label>
                          <DatePicker
                            selected={endDate}
                            dateFormat="yyyy-MM-dd"
                            selectsEnd
                            placeholderText="Select Date"
                            minDate={startDate}
                            value={endDate}
                            onChange={(date) => setEndDate(date)}
                            id="date2"
                            autoComplete="off"
                          />
                        </div>
                        <button
                          type="submit"
                          style={{
                            height: "32px",
                            marginTop: "22px",
                          }}
                          onClick={postData}
                          className="btn btn-primary "
                          id="submit"
                        >
                          Get Data
                        </button>
                      </div>
                    </div>
                  </form>
                </div>

                <div style={{ margin: "15px" }} className="card">
                  {show ? (
                    <DataGrid
                      style={{ fontWeight: "400" }}
                      components={{
                        Toolbar: MyExportButton,
                      }}
                      autoHeight
                      getRowId={(element) => element._id}
                      rows={rows}
                      columns={columns}
                      pageSize={10}
                      rowsPerPageOptions={[10]}
                    />
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default Report;
