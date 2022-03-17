import { useRef, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import MasonryGrid from "./MasonryGrid";
import MediaViewer from "./MediaViewer";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;


function Masonry(props) {
    const gridMediaWrapperRef = useRef([]);
    let params = useParams();
    let [firstVisibleGridItem, setFirstVisibleGridItem] = useState(0);

    const filterGrid = filter => {
        let first = true;
        gridMediaWrapperRef.current.forEach(item => {
            if (filter !== undefined && filter !== item.dataset.category)
                item.classList.add('hidden');
            else{
                item.classList.remove('hidden');
                if(first){
                    setFirstVisibleGridItem(item.dataset.id)
                    first = false;
                }
            }
        }); 
    }

    useEffect(() => {
        if(params.imgid){
            const category = getMediaById(Number(params.imgid)).category;
            filterGrid(category);
        } else if(params.category){
            filterGrid(params.category);
        } else {
            filterGrid(undefined)
        }
    }, [params.imgid, params.category])

    function getMediaById(id){
        return props.media.find(
            e => e.id === id
        );
    }

    return (
        <Container>
            {
                params.imgid && 
                <MediaViewer 
                    mediaObject={getMediaById(Number(params.imgid))}
                />
            }
            <MasonryGrid 
                media={props.media} 
                firstVisibleGridItem={firstVisibleGridItem}
                ref={gridMediaWrapperRef} 
            />
        </Container>
    );
}

export default Masonry;