import React from "react";
import { Container, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../styles/components/Header.css";

const Logo = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      xmlns:krita="http://krita.org/namespaces/svg/krita"
      xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
      viewBox="0 0 122.88 88.8"
      className="navbar-brand-icon"
    >
      <defs />
      <g
        id="group0"
        transform="matrix(1.0312500016271 0 0 1.35083116534782 0 -13.1687680807602)"
        fill="none"
      >
        <ellipse
          id="shape0"
          transform="matrix(0.969696968166987 0 0 0.740284963548733 0 9.74864099864726)"
          rx="61.44"
          ry="44.4"
          cx="61.44"
          cy="44.4"
          fill="none"
          stroke="currentColor"
          strokeWidth="4.0"
          strokeLinecap="square"
          strokeLinejoin="bevel"
        />
        <path
          id="shape1"
          transform="translate(59.5781800059118, 0)"
          fill="none"
          stroke="currentColor"
          strokeWidth="3.5"
          strokeLinecap="square"
          strokeLinejoin="miter"
          strokeMiterlimit="2"
          d="M0 9.76729L0 0"
          sodipodi:nodetypes="cc"
        />
        <path
          id="shape2"
          transform="translate(87.5981792671962, 5.24890461855014)"
          fill="none"
          stroke="currentColor"
          strokeWidth="3.5"
          strokeLinecap="square"
          strokeLinejoin="miter"
          strokeMiterlimit="2"
          d="M0 7.93839L7.93839 0"
          sodipodi:nodetypes="cc"
        />
        <path
          id="shape3"
          transform="translate(25.0474875169761, 7.87660007575174)"
          fill="none"
          stroke="currentColor"
          strokeWidth="3.5"
          strokeLinecap="square"
          strokeLinejoin="miter"
          strokeMiterlimit="2"
          d="M5.85069 5.85069L0 0"
          sodipodi:nodetypes="cc"
        />
        <path
          id="shape4"
          transform="translate(23.3193654555674, 71.6872918155674)"
          fill="none"
          stroke="currentColor"
          strokeWidth="3.5"
          strokeLinecap="square"
          strokeLinejoin="miter"
          strokeMiterlimit="2"
          d="M7.75881 0L0 7.75881"
          sodipodi:nodetypes="cc"
        />
        <path
          id="shape5"
          transform="translate(59.5781800059118, 76.547291775436)"
          fill="none"
          stroke="currentColor"
          strokeWidth="3.5"
          strokeLinecap="square"
          strokeLinejoin="miter"
          strokeMiterlimit="2"
          d="M0 0L0 9.57183"
          sodipodi:nodetypes="cc"
        />
        <path
          id="shape6"
          transform="translate(87.2381792701689, 73.1272918036766)"
          fill="none"
          stroke="currentColor"
          strokeWidth="3.5"
          strokeLinecap="square"
          strokeLinejoin="miter"
          strokeMiterlimit="2"
          d="M0 0L7.02231 7.02231"
          sodipodi:nodetypes="cc"
        />
        <ellipse
          id="shape7"
          transform="translate(56.6981800059118, 37.6672924175388)"
          rx="2.88"
          ry="5.64"
          cx="2.88"
          cy="5.64"
          fill="none"
          stroke="currentColor"
          strokeWidth="3.5"
          strokeLinecap="square"
          strokeLinejoin="bevel"
        />
        <path
          id="shape8"
          transform="translate(59.5781800059118, 38.7472920875693)"
          fill="none"
          stroke="currentColor"
          strokeWidth="3.5"
          strokeLinecap="square"
          strokeLinejoin="miter"
          strokeMiterlimit="2"
          d="M0 0L0 9.18"
          sodipodi:nodetypes="cc"
        />
        <path
          id="shape9"
          transform="translate(58.0781795109575, 43.1872924175388)"
          fill="none"
          stroke="currentColor"
          strokeWidth="3.5"
          strokeLinecap="square"
          strokeLinejoin="miter"
          strokeMiterlimit="2"
          d="M0 0L1.5 1.86"
          sodipodi:nodetypes="cc"
        />
        <path
          id="shape10"
          transform="translate(59.5781800059118, 40.5472920727058)"
          fill="none"
          stroke="currentColor"
          strokeWidth="3.5"
          strokeLinecap="square"
          strokeLinejoin="miter"
          strokeMiterlimit="2"
          d="M0 0L0 2.64"
          sodipodi:nodetypes="cc"
        />
        <path
          id="shape11"
          transform="translate(58.2581795094712, 40.3672920741922)"
          fill="none"
          stroke="currentColor"
          strokeWidth="3.5"
          strokeLinecap="square"
          strokeLinejoin="miter"
          strokeMiterlimit="2"
          d="M1.32 0L0 2.82"
          sodipodi:nodetypes="cc"
        />
        <path
          id="shape12"
          transform="translate(57.8981759504705, 39.7372896385843)"
          fill="none"
          stroke="currentColor"
          strokeWidth="3.5"
          strokeLinecap="square"
          strokeLinejoin="miter"
          strokeMiterlimit="2"
          d="M0 0L0.675 1.575"
          sodipodi:nodetypes="cc"
        />
        <path
          id="shape13"
          transform="translate(58.3931759168787, 39.9622896233153)"
          fill="none"
          stroke="currentColor"
          strokeWidth="3.5"
          strokeLinecap="square"
          strokeLinejoin="miter"
          strokeMiterlimit="2"
          d="M0 0L0.72 1.8"
          sodipodi:nodetypes="cc"
        />
        <path
          id="shape14"
          transform="translate(59.5781800059118, 40.772289568347)"
          fill="none"
          stroke="currentColor"
          strokeWidth="3.5"
          strokeLinecap="square"
          strokeLinejoin="miter"
          strokeMiterlimit="2"
          d="M0 0L0.659996 2.415"
          sodipodi:nodetypes="cc"
        />
        <path
          id="shape15"
          transform="translate(60.4631757764041, 40.7272895714008)"
          fill="none"
          stroke="currentColor"
          strokeWidth="3.5"
          strokeLinecap="square"
          strokeLinejoin="miter"
          strokeMiterlimit="2"
          d="M0.405 0L0 3.15"
          sodipodi:nodetypes="cc"
        />
        <path
          id="shape16"
          transform="translate(60.7331757580813, 41.8522894950559)"
          fill="none"
          stroke="currentColor"
          strokeWidth="3.5"
          strokeLinecap="square"
          strokeLinejoin="miter"
          strokeMiterlimit="2"
          d="M0.045 0L0 2.7"
          sodipodi:nodetypes="cc"
        />
        <path
          id="shape17"
          transform="translate(60.2381757916731, 45.9022892202142)"
          fill="none"
          stroke="currentColor"
          strokeWidth="3.5"
          strokeLinecap="square"
          strokeLinejoin="miter"
          strokeMiterlimit="2"
          d="M0 0L0.135 0.99"
          sodipodi:nodetypes="cc"
        />
        <path
          id="shape18"
          transform="translate(60.5981757672427, 46.0372892110528)"
          fill="none"
          stroke="currentColor"
          strokeWidth="3.5"
          strokeLinecap="square"
          strokeLinejoin="miter"
          strokeMiterlimit="2"
          d="M0.855 0L0 0.18"
          sodipodi:nodetypes="cc"
        />
        <path
          id="shape19"
          transform="translate(58.3931759168787, 45.5422892446446)"
          fill="none"
          stroke="currentColor"
          strokeWidth="3.5"
          strokeLinecap="square"
          strokeLinejoin="miter"
          strokeMiterlimit="2"
          d="M0 0L0.675 0.9"
          sodipodi:nodetypes="cc"
        />
        <path
          id="shape20"
          transform="translate(57.3131759901698, 44.8672892904515)"
          fill="none"
          stroke="currentColor"
          strokeWidth="3.5"
          strokeLinecap="square"
          strokeLinejoin="miter"
          strokeMiterlimit="2"
          d="M0 0L0.945 0.765"
          sodipodi:nodetypes="cc"
        />
      </g>
    </svg>
  );
};

export default function Header() {
  const navigate = useNavigate();
  return (
    <Container fluid className="header">
      <Navbar.Brand
        onClick={() => {
          navigate("/");
        }}
      >
        <Logo />
        <h1>Wisp</h1>
      </Navbar.Brand>
    </Container>
  );
}
