import { useOutletContext } from "react-router-dom";
import styled from "styled-components";
import ScrollToTop from "./ScrollToTop";

const Container = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
`;

const ImageWrapper = styled.div`
    position: relative;
`

const Image = styled.img`
  width: 100%;
  height: 100%;
`

function MediaViewer(props){
    const { mediaObject } = props

    return (
        <Container>
            <ScrollToTop />
            <ImageWrapper>
                <Image src={mediaObject.src} />
            </ImageWrapper>
        </Container>
    )
}

export default MediaViewer;