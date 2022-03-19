import styled from "styled-components";
import Masonry from "../masonry/Masonry";
import { categories, paths } from "../../media";
import { Link } from "react-router-dom";

const Container = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr;
`;

const Navbar = styled.header`
    grid-row: 1;
    grid-column: 1/3;
    height: 80px;
    top: 0;
    z-index: 2;
    background-color: white;
    padding: 0 16px;

    display: flex;
    align-items: center;

    @media only screen and (max-width: 551px) {
        display: none;
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

const NavbarCategories = styled.div`
    align-self: center;
    display: flex;
    align-items: center;
    justify-content: center;
`

const NavbarSocial = styled.div`
    align-self: center;
    display: flex;
    align-items: center;
    justify-content: center;

    // align right
    margin-left: auto;
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

const MasonryWrapper = styled.div`
    @media only screen and (min-width: 551px) {
        margin: 0 24px;
    }
    
`;

function Home(){
    return (
        <Container>
            <Navbar>
                <NavbarLogoWrapper to={'/'}>
                    <NavbarLogoImg src={"/logo.png"} />
                </NavbarLogoWrapper>
                <NavbarCategories>
                    {Object.keys(categories).map((category, index) => <NavLink key={index} to={`/gallery/${category}`}>{category}</NavLink>)}
                </NavbarCategories>
                <NavbarSocial>
                    {['whatsapp', 'facebook'].map((social, index) => <NavLink key={index} to={'/wh'}>{social}</NavLink>)}
                </NavbarSocial>
            </Navbar>
            <MasonryWrapper>
                <Masonry 
                    media={paths} 
                    allCategories={categories}
                    defaultCategory={'All'}
                />
            </MasonryWrapper>
        </Container>
    )
}

export default Home;