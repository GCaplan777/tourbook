import React, { Component } from "react";
import axios from "axios";
import DocHero from "../components/DocHero";

export default class UploadFile extends Component {
  constructor(props) {
    super(props);

    this.onFileChange = this.onFileChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      profileImg: "",
      title: "Choose file",
    };
  }

  onFileChange(e) {
      e.preventDefault();
    this.setState({ profileImg: e.target.files[0],
        title: e.target.files[0].originalname });
    console.log(this.state)
  }

  onSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("profileImg", this.state.profileImg);
    console.log(this.state);
    console.log(JSON.parse(localStorage.getItem("user")).token);
    axios
      .post("/api/files", formData, {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("user")).token
          }`,
        },
      })
      .then((res) => {
        console.log(res);
      });
  }

  Post = (e) => {
    e.preventDefault();
    const file = document.getElementById("inputGroupFile01").files;
    const formData = new FormData();
    formData.append("img", file[0]);
    // fetch(`http://localhost:8000/api/files/${JSON.parse(localStorage.getItem("user")).id}`, {
    fetch(`/api/files/${JSON.parse(localStorage.getItem("user")).id}`, {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("user")).token
        }`,
      },
    }).then((r) => {
      console.log(r);
    });
  };

  render() {
    return (
      <>
        <div class="container bg-white">
          <DocHero />
          {/* <div className="container"> */}
          {/* <div className="jumbotron">
            <h1 className="display-4">Image Uploader</h1>
            <p className="lead">
              {" "}
              This is a simple application to upload and retrieve images from a
              database{" "}
            </p>{" "}
            <hr className="my-4" />
          </div> */}
          <div className="input-group mb-3">
            <div className="custom-file">
              <input
                type="file"
                className="custom-file-input"
                id="inputGroupFile01"
                aria-describedby="inputGroupFileAddon01"
                
              />
              <label className="custom-file-label" htmlFor="inputGroupFile01" onChange={this.onFileChange}>
                {" "}
                {this.state.title}{" "}
              </label>
            </div>
          </div>
          <button
            type="button"
            className="btn btn-primary mb-3"
            onClick={this.Post}
          >
            {" "}
            Upload{" "}
          </button>
          <img
            id="img"
            style={{
              display: "block",
            }}
          ></img>
        </div>
      </>
    );
  }
}
