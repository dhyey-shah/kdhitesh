import { Link, useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import { keyframes } from "styled-components";

const slideInAnimation = keyframes`
    0%{
        height: 0;
        opacity: 0;
    }
    100%{
        height: 100vh;
        opacity: 1;
        visibility: visible;
    }
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;

    position: fixed;
    top: 0;
    overflow: hidden;
    width: 100vw;
    z-index: 100;
    visibility: hidden;

    left: 0;
    right: 0;
    background-color: white;

    animation-duration: 0.2s;
    animation-fill-mode: forwards;
    animation-name: ${slideInAnimation};
    animation-timing-function: linear;
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

    &.hidden {
        visibility: hidden;
    }
`

const CloseWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    margin: auto;
`

const Close = styled.div`
    position: absolute;
    right: 32px;
    top: 32px;
    width: 32px;
    height: 32px;

    &:before, &:after {
        position: absolute;
        left: 15px;
        content: ' ';
        height: 33px;
        width: 2px;
        background-color: #333;
    }
    &:before {
        transform: rotate(45deg);
    }
    &:after {
        transform: rotate(-45deg);
    }
`

const Message = styled.span`
    display: flex;
    justify-content: center;
    align-items: center;

    margin: 16px 0;
    font-weight: 700;
    font-size: large;
`

function CategoryDropdown(props) {
    const navigate = useNavigate();
    
    return (
        <Container>
            <NavLink className="hidden" to={''} ></NavLink>
            <NavLink className="hidden" to={''} ></NavLink>
            <Message>Select a category</Message>
            {
                Object.keys(props.categories).map((category, index) =>
                    <NavLink key={index} to={`/gallery/${category}`} replace={true}>
                        {category}
                    </NavLink>)
            }
            <CloseWrapper><Close onClick={() => navigate(-1)}></Close></CloseWrapper>
        </Container>
    )
}

export default CategoryDropdown;