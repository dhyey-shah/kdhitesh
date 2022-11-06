import {useNavigate} from "react-router-dom";
import styled from "styled-components";
import ScrollToTop from "./ScrollToTop";
import {paths} from "../../media";
import {useSwipeable} from "react-swipeable";

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
    const { mediaObject, nextMediaId, prvMediaId } = props
    const navigate = useNavigate();

    function navitgateTo(dir){
        if (dir === 'Right' && nextMediaId in paths)
            return navigate(`/img/${prvMediaId}`)

        if (dir === 'Left' && nextMediaId > -1)
            return navigate(`/img/${nextMediaId}`)

    }

    const swipeHandlers = useSwipeable({
        onSwipedRight: e => navitgateTo(e.dir),
        onSwipedLeft: e => navitgateTo(e.dir)
    })

    return (
        <Container {...swipeHandlers}>
            <ScrollToTop />
            <ImageWrapper>
                <Image src={mediaObject.src} />
            </ImageWrapper>
        </Container>
    )
}

export default MediaViewer;