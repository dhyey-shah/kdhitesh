import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
    display: flex;
    flex-direction: column;
`;

const Category = styled(Link)`
    height: 48px;
    min-width: 60px;
    text-decoration: none;
    padding-left: 8px;
    padding-right: 8px;
    color: black;
    font-weight: 700;

    display: flex;
    align-items: center;
    justify-content: flex-end;

    &:hover {
        background-color: #efefef;
        border-right: black 4px solid;
    }

    &.active {
        background-color: black;
        color: white;
        border-right: black 4px solid;
    }
`;

function Sidebar(props) {
    return (
        <Container>
            {
                Object.keys(props.categories).map((category, index) =>
                    <Category key={index}
                        to={`/gallery/${category}`}
                        className={category===props.category ? 'active'  : ''}
                    >
                        {category}
                    </Category>)
            }
        </Container>
    )
}

export default Sidebar;