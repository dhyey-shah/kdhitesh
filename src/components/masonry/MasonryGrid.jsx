
import { forwardRef, useEffect, useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(270px,1fr));
    grid-gap: 20px;
    grid-auto-rows: 30px;

    @media only screen and (max-width: 551px) {
        grid-template-columns: repeat(auto-fill, minmax(150px,1fr));
        grid-gap: 10px;
    }
`;

const GridMediaWrapper = styled.div`
    position: relative;

    &.hidden {
        display: none;
    }

    @media only screen and (max-width: 551px) {
        filter: none;
        transition: none;
        cursor: inherit;
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

const MasonryGrid = forwardRef((props, gridMediaWrapperRef) => {
    const { media, firstVisibleGridItem } = props;

    const gridRef = useRef(null);

    const gridItems = useMemo(() =>
        media.map((media, index) => {
            console.log("RENDER "+index);
            let ele;
            let data = {
                "data-src": media.src,
                "data-width": media.width,
                "data-height": media.height,
                "data-category": media.category
            };

            if (media.type === 'video') {
                ele = <GridMediaVideo />
            } else {
                ele = <GridMediaImage />
            }

            return (
                <GridMediaWrapper
                    {...data}
                    ref={e => gridMediaWrapperRef.current[index] = e}
                    key={media.id}
                    data-id={index}
                >
                    <Link 
                    key={media.id}
                    to={`/img/${media.id}`}    
                >
                    {ele}
                    <MediaLoader />
                    </Link>
                </GridMediaWrapper>
            );

        })
        , [media.length]);

    useEffect(() => {
        gridMediaWrapperRef.current = gridMediaWrapperRef.current.slice(0, gridItems.length);

        function computeGridDimensions() {
            let index = firstVisibleGridItem ? firstVisibleGridItem : 0;
            console.log(firstVisibleGridItem);
            let item0 = gridMediaWrapperRef.current[index];
            item0.style.width = 'auto';
            let width = item0.getBoundingClientRect().width;
            gridMediaWrapperRef.current.forEach(item => {
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

        function lazyload() {
            const lazyloadMedia = gridMediaWrapperRef.current;
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

            lazyloadMedia.forEach(image => {
                mediaObserver.observe(image);
            });
        }

        computeGridDimensions();
        lazyload();

        window.addEventListener("resize", computeGridDimensions);

        return () => window.removeEventListener("resize", computeGridDimensions)
    }, [gridItems.length, firstVisibleGridItem]);

    return (
        <Grid ref={gridRef}>
            {gridItems}
        </Grid>
    )
});

export default MasonryGrid;