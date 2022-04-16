import { useOutletContext } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
    display: flex;
    width: 100%;
`;

function MediaViewer(props){
    const { mediaObject } = props

    return (
        <Container>
            <img src={mediaObject.src} />
        </Container>
    )
}

export default MediaViewer;