import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MasonryGrid from "./MasonryGrid";
import MediaViewer from "./MediaViewer";

function Masonry(props) {
    let params = useParams();
    const [category, setCategory] = useState(params.category || props.defaultCategory)

    useEffect(() => {
        if (params.imgid)
            setCategory(props.media[params.imgid]['category']);
        else if (params.category)
            setCategory(params.category);
        else
            setCategory(props.defaultCategory)
    }, [params.imgid, params.category])

    return (
        <>
            {
                params.imgid &&
                <MediaViewer
                    mediaObject={props.media[params.imgid]}
                />
            }
            <MasonryGrid
                media={props.media}
                category={category}
                allCategories={props.allCategories}
                defaultCategory={props.defaultCategory}
            />
        </>
    );
}

export default Masonry;