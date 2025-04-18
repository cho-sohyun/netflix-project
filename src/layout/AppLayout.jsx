import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar expand="lg" className="bg-black" variant="dark">
        <Container fluid className="px-3 md:px-5">
          <Navbar.Brand href="/" className="me-4">
            <img
              src="/logo/logo.png"
              alt="Netflix Logo"
              style={{ height: "5rem", objectFit: "contain" }}
            />
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls="navbarScroll"
            className="border border-white"
          />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto my-2 my-lg-0 gap-3" navbarScroll>
              <Nav.Link href="/" className="text-white hover:text-red-500">
                홈
              </Nav.Link>
              <Nav.Link
                href="/movies"
                className="text-white hover:text-red-500"
              >
                영화
              </Nav.Link>
            </Nav>

            <Form className="d-flex items-center gap-2 mt-2 mt-lg-0">
              <input
                type="text"
                placeholder="검색어를 입력하세요."
                className="bg-zinc-900 outline-none text-sm text-white border border-red-500 px-3 py-2 rounded w-36 sm:w-48 md:w-64"
              />
              <Button
                variant="outline-danger"
                className="!border-red-500 p-0 h-[40px] w-[40px] flex items-center justify-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  width="20"
                  height="20"
                  className="text-white"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10ZM15.6177 17.0319C14.078 18.2635 12.125 19 10 19C5.02944 19 1 14.9706 1 10C1 5.02944 5.02944 1 10 1C14.9706 1 19 5.02944 19 10C19 12.125 18.2635 14.078 17.0319 15.6177L22.7071 21.2929L21.2929 22.7071L15.6177 17.0319Z"
                    fill="currentColor"
                  />
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
