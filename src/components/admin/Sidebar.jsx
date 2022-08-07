import {useEffect, useState} from "react"
import styled from "styled-components";

import {useNavigate, Link, Router} from "react-router-dom";
import { MdSpaceDashboard } from "react-icons/md";
import { RiDashboard2Fill } from "react-icons/ri";
import { FaAddressCard, FaTaxi } from "react-icons/fa";
import { GiTwirlCenter } from "react-icons/gi";
import { BsFillChatTextFill } from "react-icons/bs";
import { IoSettings } from "react-icons/io5";
import { FiLogOut } from "react-icons/fi";
import { GiHamburgerMenu } from "react-icons/gi";
import { VscChromeClose } from "react-icons/vsc";
import {BiFoodMenu} from "react-icons/bi"
import {TbZoomMoney} from "react-icons/tb"
import {CgProfile} from "react-icons/cg"

function Sidebar(){
    const [currentLink, setCurrentLink] = useState(0)
    return (
        <>
            <Section>
                <div className="top">
                    <div className="brand">
                        <FaTaxi/>
                        <span>MY TAXI</span>
                    </div>
                    <div className="toggle"></div>
                    <div className="links">
                        <ul>
                            <li onClick={() => setCurrentLink(1)} 
                            className={currentLink === 1 ? "active" : ""}
                            >
                                <Link to="/admin-dashboard">
                                    <MdSpaceDashboard/>
                                    <span>Dashboard</span>
                                </Link>
                            </li>
                            <li onClick={() => setCurrentLink(2)} 
                            className={currentLink === 2 ? "active" : ""}
                            >
                                <Link to="/admin-dashboard/menu-items">
                                    <BiFoodMenu/>
                                    <span>Menu Items</span>
                                </Link>
                            </li>
                            <li onClick={() => setCurrentLink(3)} 
                            className={currentLink === 3 ? "active" : ""}
                            >
                                <Link to="/admin-dashboard/orders">
                                    <TbZoomMoney/>
                                    <span>Orders/Transactions</span>
                                </Link>
                            </li>
                            <li onClick={() => setCurrentLink(4)} 
                            className={currentLink === 4 ? "active" : ""}
                            >
                                <Link to="/admin-dashboard/profile">
                                    <CgProfile/>
                                    <span>Profile</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="logout">
                    <a href="#">
                        <FiLogOut/>
                        <span className="logout">Logout</span>
                    </a>
                </div>
            </Section>
        </>
    );
}

export default Sidebar;

const Section = styled.section`
  position: fixed;
  left: 0;
  background-color: #212121;
  height: 100vh;
  width: 18vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 2rem 0;
  gap: 2rem;
  .top {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    width: 100%;
    .toggle {
      display: none;
    }
    .brand {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 2rem;
      svg {
        color: #ffc107;
        font-size: 2rem;
      }
      span {
        font-size: 2rem;
        color: #ffc107;
        font-family: "Permanent Marker", cursive;
      }
    }
    .links {
      display: flex;
      justify-content: center;
      ul {
        list-style-type: none;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        li {
          padding: 0.6rem 1rem;
          border-radius: 0.6rem;
          &:hover {
            background-color: #ffc107;
            a {
              color: black;
            }
          }
          a {
            text-decoration: none;
            display: flex;
            gap: 1rem;
            color: white;
          }
        }
        .active {
          background-color: #ffc107;
          a {
            color: black;
          }
        }
      }
    }
  }
  .logout {
    padding: 0.3rem 1rem;
    border-radius: 0.6rem;
    &:hover {
      background-color: #da0037;
    }
    a {
      text-decoration: none;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      color: white;
    }
  }
  @media screen and (min-width: 280px) and (max-width: 1080px) {
    position: initial;
    width: 100%;
    height: max-content;
    padding: 1rem;
    .top {
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      padding: 0 1rem;
      .toggle {
        display: block;
        color: white;
        z-index: 99;
        svg {
          font-size: 1.4rem;
        }
      }
      .brand {
        gap: 1rem;
        justify-content: flex-start;
      }
    }
    .top > .links,
    .logout {
      display: none;
    }
  }
`;