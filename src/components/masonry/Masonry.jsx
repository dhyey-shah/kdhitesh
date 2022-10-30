import MasonryGrid from "./MasonryGrid";
import MediaViewer from "./MediaViewer";
import styled from "styled-components";

const MoreLikeThis = styled.div`
  display: flex;
  justify-content: center;
  margin: 24px 0;
  font-weight: bolder;
  font-size: large;
`

function Masonry(props) {
    return (
        <>
            {
                props.imgId &&
                (
                    <>
                        <MediaViewer mediaObject={props.media[props.imgId]} />
                        <MoreLikeThis>More Like This</MoreLikeThis>
                    </>
                )
            }
            <MasonryGrid
                media={props.media}
                category={props.category}
                allCategories={props.allCategories}
                defaultCategory={props.defaultCategory}
            />
        </>
    );
}

export default Masonry;