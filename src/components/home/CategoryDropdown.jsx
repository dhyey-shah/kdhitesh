import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.button`
    display: flex;
    flex-direction: column;

    height: 100vh;
    width: 100vw;
    z-index: 100;
`

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

function CategoryDropdown(props) {
    return (
        <Container>
            {
                Object.keys(props.categories).map((category, index) => 
                    <NavLink key={index} to={`/gallery/${category}`}>
                        {category}
                    </NavLink>)
            }
        </Container>
    )
}

export default CategoryDropdown;