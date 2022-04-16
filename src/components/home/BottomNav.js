import styled from "styled-components";
import {social} from "../../constants"

const Container = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;

    width: 248px;
    height: 64px;
    background-color: white;
    border-radius: 32px;
`

const SocialWrapper = styled.a`
    width: 32px;
    height: 32px;
`

const SocialIcon = styled.img`
    width: 100%;
    height: auto;
`

function BottomNav(props) {
    return (
        <Container>
            {
                social.map((e, index) => <SocialWrapper href={e['link']} key={index}><SocialIcon src={e['icon']}></SocialIcon></SocialWrapper>)
            }
        </Container>
    )
}

export default BottomNav;