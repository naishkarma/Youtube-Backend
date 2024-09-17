"use client";
import Link from "next/link";
import style from "./navbar.module.css";

export const Navbar = () => {
  return (
    <>
      <div className="container">
        <div className="row flex justify-content-between">
          <div className="col-md-4 col-sm-6 col-xs-6">Logo</div>
          <div className="col-md-3 col-sm-6 col-xs-6 text-right fs-6 py-3">
            <Link href="/gallery">Photo Gallery</Link> |{" "}
            <Link href={"/news"}>News</Link> |{" "}
            <Link href="/contact">Contact Us</Link>
            <div className="col-12">2321846</div>
          </div>

        </div>
      </div>
<div className="container-fluid">
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid" style={{"background":"#3b61b9"}}>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <a className="nav-link active" aria-current="page" href="#">
                Home
              </a>
              <a className="nav-link" href="#">
                Features
              </a>
              <a className="nav-link" href="#">
                Pricing
              </a>
              <a className="nav-link disabled" aria-disabled="true">
                Disabled
              </a>
            </div>
          </div>
        </div>
      </nav>
      </div>
    </>
  );
};
