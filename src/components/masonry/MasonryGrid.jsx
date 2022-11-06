
import { memo, useEffect, useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { device } from '../../constants';
import { useWindowSize } from '../../hooks';

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(var(--grid-width),1fr));
    grid-gap: var(--grid-gap);
    grid-auto-rows: 30px;
`;

const GridMediaWrapper = styled.div`
    position: relative;

    &.hidden {
        display: none;
    }
`;

const GridMediaImage = styled.img`
    width: 100%;
    height: auto;
    border-radius: 16px;

    &:hover {
        filter: brightness(0.5);
        transition:filter .25s ease-in-out;
        cursor:zoom-in;
    }

    @media ${device.tablet} {
        &:hover{
            filter: none;
            transition: none;
            cursor: inherit;
        }
    }
`;

const GridMediaVideo = styled.video``;

const shimmer = keyframes`
    0%{
        background-position: -468px 0
    }
    100%{
        background-position: 468px 0
    }
`;

const MediaLoader = styled.div`
    animation-duration: 1s;
    animation-fill-mode: forwards;
    animation-iteration-count: infinite;
    animation-name: ${shimmer};
    animation-timing-function: linear;
    background: #f6f7f8;
    background: linear-gradient(to right, #eeeeee 8%, #dddddd 18%, #eeeeee 33%);
    background-size: 1000px 104px;
    position: absolute;
    overflow: hidden;
    top:0;
    bottom: 0;
    left: 0;
    right: 0;

    &.hidden {
        display: none;
    }
`;

function shuffle(array) {
    let currentIndex = array.length,  randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}

function MasonryGrid(props) {
    const { media, category, allCategories, defaultCategory } = props;

    const gridRef = useRef(null);
    const gridMediaWrapperRef = useRef([]);
    const windowSize = useWindowSize()

    const gridItems = useMemo(() =>
        shuffle(Object.keys(media)).map(id => {
            let ele;
            let data = {
                "data-src": media[id].src,
                "data-width": media[id].width,
                "data-height": media[id].height,
                "data-category": media[id].category
            };

            if (media[id].type === 'video') {
                ele = <GridMediaVideo />
            } else {
                ele = <GridMediaImage />
            }

            return (
                <GridMediaWrapper
                    {...data}
                    ref={e => gridMediaWrapperRef.current[id] = e}
                    key={id}
                >
                    <Link
                        key={id}
                        to={`/img/${id}`}
                    >
                        {ele}
                        <MediaLoader />
                    </Link>
                </GridMediaWrapper>
            );
        })
        , []
    );

    function computeGridDimensions(category) {
        console.log("HERE");
        let item0 = gridMediaWrapperRef.current[allCategories[category]];
        item0.style.width = 'auto';
        let width = item0.getBoundingClientRect().width;
        gridMediaWrapperRef.current.forEach(item => {
            item.classList.remove('hidden');  // required to calculate span of element
            const height = (item.dataset.height * width) / item.dataset.width;
            item.style.width = width + 'px';
            item.style.height = height + 'px';
        })
        resizeAllGridItems();
    }

    function resizeAllGridItems() {
        const grid = gridRef.current;
        const rowHeight = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-auto-rows'));
        const rowGap = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-row-gap'));
        gridMediaWrapperRef.current.forEach((item, index) => {
            resizeGridItem(item, rowGap, rowHeight)
        });
    }

    function resizeGridItem(item, rowGap, rowHeight) {
        const rowSpan = Math.ceil((item.getBoundingClientRect().height + rowGap) / (rowHeight + rowGap));
        item.style.gridRowEnd = "span " + rowSpan;
    }

    useEffect(() => {
        gridMediaWrapperRef.current = gridMediaWrapperRef.current.slice(0, gridItems.length);

        function lazyload() {
            var mediaObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const media = entry.target.firstChild.firstChild;
                        media.src = entry.target.dataset.src;
                        media.onload = e => {
                            e.preventDefault();
                            e.target.nextSibling.classList.add('hidden');
                        };
                        mediaObserver.unobserve(entry.target);
                    }
                });
            });

            gridMediaWrapperRef.current.forEach(image => {
                mediaObserver.observe(image);
            });
        }

        lazyload();
    }, []);

    useEffect(() => {
        computeGridDimensions(category);
    }, [windowSize[0], windowSize[1]]);

    useEffect(() => {
        gridMediaWrapperRef.current.forEach(item => {
            if (category !== defaultCategory && category !== item.dataset.category){
                item.classList.add('hidden');
            }
            else {
                item.classList.remove('hidden');
            }
        });
    }, [category, windowSize[0], windowSize[1]]);

    return (
        <Grid ref={gridRef}>
            {gridItems}
        </Grid>
    )
};

export default memo(MasonryGrid);