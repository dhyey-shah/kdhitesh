import MasonryGrid from "./MasonryGrid";
import MediaViewer from "./MediaViewer";

function Masonry(props) {
    return (
        <>
            {
                props.imgId &&
                <MediaViewer
                    mediaObject={props.media[props.imgId]}
                />
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