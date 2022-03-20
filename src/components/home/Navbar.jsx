import { Link } from "react-router-dom";
import styled from "styled-components";
import { device } from "../../constants";

const Container = styled.div`
    height: var(--navbar-height);
    background-color: white;
    padding: 0 16px;

    display: flex;
    align-items: center;
    justify-content: center;

    @media ${device.tablet} {
        justify-content: flex-start;
    }
`;

const NavbarLogoWrapper = styled(Link)`
    width: 72px;
    margin: 0 16px;
    border-radius: 25px;
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
        
        // align right
        margin-left: auto;
    }
`

function Navbar(props) {
    const Social = ({className}) => (
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
                Category: {props.category}
            </CategoryDropdownLink>
        </Container>
    )
}

export default Navbar;