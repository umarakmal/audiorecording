import React, { useState, useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Wave from "react-wavify";
import $ from "jquery";

const RecordVoice = () => {
  const history = useHistory();
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [audioURLs, setAudioURLs] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [recorder, setRecorder] = useState(null);
  const [getuserdata, setUserData] = useState([]);

  const addinpdata = async (event) => {
    event.preventDefault();

    /* *************** */
    fetch(audioURLs)
      .then((response) => response.blob())
      .then((blob) => {
        console.log(blob);
        const fd = new FormData();
        fd.append("audioURL", blob, "audiofile.weba"); // where `.ext` matches file `MIME` type
        fd.append("name", name);
        fd.append("mobile", mobile);
        return fetch("api/agentinput", { method: "POST", body: fd });
      })
      .then((response) => {
        console.log(response.status);
        if (response.status === 200) {
          toast.success("Recording added!");
        }
        getdata();
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error Occured!");
      });
  };

  useEffect(() => {
    // Lazily obtain recorder first time we're recording.

    if (recorder === null) {
      if (isRecording) {
        requestRecorder().then(setRecorder, console.error);
      }
      return;
    }

    // Manage recorder state.
    if (isRecording) {
      recorder.start();
    } else {
      recorder.stop();
    }

    // Obtain the audio when ready.
    const handleData = (e) => {
      const objectURL = URL.createObjectURL(e.data);
      setAudioURLs(objectURL);
    };

    recorder.addEventListener("dataavailable", handleData);
    return () => recorder.removeEventListener("dataavailable", handleData);
  }, [recorder, isRecording]);

  const startRecording = () => {
    setIsRecording(true);
  };

  const stopRecording = () => {
    setIsRecording(false);
  };
  async function requestRecorder() {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

    return new MediaRecorder(stream);
  }

  const getdata = async () => {
    const res = await fetch("/api/allusersrecordings", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    if (res.status === 422 || !data) {
      console.log("error ");
    } else {
      setUserData(data);
      console.log("get data");
    }
  };

  useEffect(() => {
    getdata();
  }, []);

  const deleteuser = async (id) => {
    const res2 = await fetch(`/api/userrecordings/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const deletedata = await res2.json();
    console.log(deletedata);

    if (res2.status === 422 || !deletedata) {
      console.log("error");
    } else {
      console.log("user deleted");
      toast.success("Deleted Successfully!");
      getdata();
    }
  };

  $(function () {
    $("#recordbutton").on("click", function () {
      $("#audiofunction").hide();
      $("#wavediv").css("display", "block");
    });
    $("#stopbutton").on("click", function () {
      $("#audiofunction").show();
      $("#wavediv").hide();
    });
  });

  return (
    <>
      <ToastContainer />
      <div className="content-wrapper">
        <section className="content">
          <div className="container-fluid">
            <form id="form" encType="multipart/form-data" onSubmit={addinpdata}>
              <div className="row mt-2">
                <div style={{ fontSize: "13.5px" }} className="col-md-12">
                  <div className="card card-dark ">
                    <div className="card-header">
                      <h3 className="card-title">Record Voice</h3>
                    </div>
                    <div className="card-body">
                      <div className=" form-group ">
                        <label htmlFor="exampleInputPass">Name</label>
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          name="name"
                          className="form-control"
                          id="exampleInputPass"
                          aria-describedby="emailHelp"
                          required
                        />
                      </div>
                      <div className=" form-group ">
                        <label htmlFor="exampleInputPass">Mobile</label>
                        <input
                          type="text"
                          maxLength="10"
                          value={mobile}
                          onChange={(e) => setMobile(e.target.value)}
                          name="mobile"
                          className="form-control"
                          id="exampleInputPass"
                          aria-describedby="emailHelp"
                          required
                        />
                      </div>
                      <div className="row form-group mt-3">
                        <audio src={audioURLs} id="audiofunction" controls />
                        <div
                          id="wavediv"
                          style={{
                            width: "300px",
                            height: "75px",
                            display: "none",
                          }}
                        >
                          <Wave
                            style={{ height: "80%" }}
                            fill="#4b4b4b"
                            paused={false}
                            options={{
                              height: 15,
                              amplitude: 15,
                              speed: 0.15,
                              points: 3,
                            }}
                            id="waveform"
                          />
                        </div>
                        <div className="form-group mt-3  ">
                          <button
                            style={{ marginLeft: "15px" }}
                            className="btn btn-success"
                            onClick={startRecording}
                            disabled={isRecording}
                            id="recordbutton"
                          >
                            Record
                          </button>
                          <button
                            className="btn btn-danger ml-3"
                            onClick={stopRecording}
                            disabled={!isRecording}
                            id="stopbutton"
                          >
                            Stop
                          </button>
                        </div>
                      </div>
                      <button
                        type="submit"
                        // onClick={addinpdata}
                        className="btn btn-primary"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
                {/* <br></br> */}
              </div>
            </form>

            <br></br>
            <div className="card card-dark ">
              <div className="card-body">
                <table className="table">
                  <thead
                    style={{
                      fontSize: "13px",
                      fontFamily: "sans-serif",
                    }}
                  >
                    <tr style={{ color: "black" }} className="table ">
                      <th scope="col">#</th>
                      <th scope="col">Name</th>

                      <th style={{ width: "150px" }} scope="col">
                        Mobile Number
                      </th>
                      <th scope="col">Recordings</th>
                      <th scope="col">Play</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getuserdata.map((element, id) => {
                      return (
                        <>
                          <tr key={element._id}>
                            <th scope="row">{id + 1}</th>
                            <td>{element.name}</td>

                            <td>{element.mobile}</td>
                            <td>{element.audioURL}</td>
                            <td>
                              <audio
                                src={
                                  (__dirname =
                                    "./uploads/files/" + element.audioURL)
                                }
                                controls
                              ></audio>
                            </td>
                            <td className="d-flex ">
                              <button
                                style={{ margin: "3px" }}
                                className="btn btn-danger"
                                onClick={(e) =>
                                  window.confirm(
                                    "Are you sure you want to delete?"
                                  )
                                    ? deleteuser(element._id)
                                    : e.preventDefault()
                                }
                              >
                                <i className="nav-icon fas fa-trash" />
                              </button>
                            </td>
                          </tr>
                        </>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default RecordVoice;
