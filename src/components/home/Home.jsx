import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { device } from "../../constants";
import { categories, paths } from "../../media";
import Masonry from "../masonry/Masonry";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const Container = styled.div`
    display: grid;
    grid-template-columns: auto 1fr;
    grid-template-rows: auto 1fr;
`;

const NavbarWrapper = styled.header`
    grid-row: 1;
    grid-column: 1/3;

    // stick to top
    top: 0;
    position: sticky;
    z-index: 2;
`;

const SidebarWrapper = styled.div`
    grid-column: 1/2;
    width: 176px;

    // stick to right
    position: sticky;
    top: var(--navbar-height);
    height: calc(100vh - var(--navbar-height));
    

    @media ${device.tablet} {
        display: none;
    }
`;

const MasonryWrapper = styled.div`
    grid-row: 2;
    grid-column: 2;

    @media only screen and (min-width: 551px) {
        margin: 0 24px;
    }
    
`;

function Home() {
    let params = useParams();
    const defaultCategory = 'All';
    const [category, setCategory] = useState(params.category || defaultCategory);
    const [imgId, setImgId] = useState(null);

    useEffect(() => {
        if (params.imgid) {
            setCategory(paths[params.imgid]['category']);
            setImgId(params.imgid)
        }
        else if (params.category)
            setCategory(params.category);
        else
            setCategory(defaultCategory)

        return () => setImgId(null)
    }, [params.imgid, params.category])

    return (
        <Container>
            <NavbarWrapper>
                <Navbar
                    category={category}
                    categories={categories}
                />
            </NavbarWrapper>
            <SidebarWrapper>
                <Sidebar
                    category={category}
                    categories={categories}
                />
            </SidebarWrapper>
            <MasonryWrapper>
                <Masonry
                    media={paths}
                    imgId={imgId}
                    category={category}
                    allCategories={categories}
                    defaultCategory={'All'}
                />
            </MasonryWrapper>
        </Container>
    )
}

export default Home;