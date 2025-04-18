import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div className="bg-black text-white ">
      <Navbar expand="lg" className="bg-black">
        <Container fluid className="px-4">
          <Nav.Link href="/" className="w-28">
            <img
              src="/logo/logo.png"
              alt="Netflix Logo"
              className="bg-transparent object-contain"
            ></img>
          </Nav.Link>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0 ms-4"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link href="/" className="text-white">
                홈
              </Nav.Link>
              <Nav.Link href="/movies" className="text-white">
                영화
              </Nav.Link>
            </Nav>

            <Form className="d-flex ms-3">
              <input
                type="text"
                placeholder="검색어를 입력하세요."
                className="outline-none bg-black opacity-1 text-xs text-white border border-red-200 px-3 rounded"
              ></input>

              <Button variant="outline-danger" className="ms-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  role="img"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  data-icon="MagnifyingGlassStandard"
                  aria-hidden="true"
                  className="search-icon"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10ZM15.6177 17.0319C14.078 18.2635 12.125 19 10 19C5.02944 19 1 14.9706 1 10C1 5.02944 5.02944 1 10 1C14.9706 1 19 5.02944 19 10C19 12.125 18.2635 14.078 17.0319 15.6177L22.7071 21.2929L21.2929 22.7071L15.6177 17.0319Z"
                    fill="currentColor"
                  ></path>
                </svg>
              </Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet />
    </div>
  );
};

export default AppLayout;
