import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { device } from "../../constants";
import CategoryDropdown from "./CategoryDropdown";

const Container = styled.div`
    height: var(--navbar-height);
    background-color: white;
    padding: 0 16px;

    display: flex;
    align-items: center;
    justify-content: center;

    @media ${device.tablet} {
        justify-content: flex-start;
        padding: 0 8px;
    }
`;

const NavbarLogoWrapper = styled(Link)`
    width: 72px;
    margin: 0 16px;
    border-radius: 25px;

    @media ${device.tablet} {
        margin: 0;
    }
`;

const NavbarLogoImg = styled.img`
    width: 100%;
    height: auto;
`;

const NavLink = styled(Link)`
    height: 48px;
    min-width: 60px;
    text-decoration: none;
    padding-left: 8px;
    padding-right: 8px;
    border-radius: 24px;
    color: black;

    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
        background-color: #efefef;
    }
`

const NavbarSocial = styled.div`
    align-self: center;
    display: flex;
    align-items: center;
    justify-content: center;

    // align right
    margin-left: auto;

    &.hidden {
        visibility: hidden;
    }

    @media ${device.tablet} {
        display: none;
    }
`;

const CategoryDropdownLink = styled(Link)`
    display: none;

    @media ${device.tablet} {
        display: block;
        font-weight: 700;
        text-decoration: none;
        color: black;

        // align right
        margin-left: auto;
        -webkit-tap-highlight-color:  rgba(255, 255, 255, 0); 

        &:focus {
            outline: none;
            background-color: transparent;
        }

        &:visited, &:active {
            color: black;
        }
    }
`

const DropdownArrow = styled.i`
    border: solid black;
    border-width: 0 3px 3px 0;
    display: inline-block;
    padding: 3px;
    margin: 2px;

    &.down {
        transform: rotate(45deg);
    }
`

function Navbar(props) {
    const [dropdown, setDropdown] = useState(false);


    const Social = ({ className }) => (
        <NavbarSocial className={className}>
            {['whatsapp', 'facebook'].map((social, index) => <NavLink key={index} to={'/wh'}>{social}</NavLink>)}
        </NavbarSocial>
    )

    return (
        <Container>
            <Social className="hidden" />
            <NavbarLogoWrapper to={'/'}>
                <NavbarLogoImg src={"/logo.png"} />
            </NavbarLogoWrapper>
            <Social />
            <CategoryDropdownLink to={'/dropdown'}>
                <span>
                    {props.category} <DropdownArrow className="down" />
                </span>
            </CategoryDropdownLink>
            {dropdown &&
                <CategoryDropdown categories={props.categories} />
            }
        </Container>
    )
}

export default Navbar;