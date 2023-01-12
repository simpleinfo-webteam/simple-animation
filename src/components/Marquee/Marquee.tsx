import styled, { keyframes } from "styled-components";
import { useEffect, useState, useRef } from "react";
import React from "react";

export interface MarqueeProps {
    speed: number;
    children: JSX.Element;
    gap: string;
}

const Marquee = ({ speed, children, gap = "0px", ...props }: MarqueeProps) => {
    const itemRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [childNum, setChildNum] = useState(1);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        if (!itemRef.current || !containerRef.current) return;
        console.log(getComputedStyle(itemRef.current).margin);
        let widthUnit = itemRef.current.getBoundingClientRect().width;
        let startWidth = itemRef.current.getBoundingClientRect().width;
        let count = 0;
        while (startWidth < windowWidth * 2) {
            startWidth += widthUnit;
            count += 1;
        }
        setChildNum(count);
        containerRef.current.setAttribute(
            "style",
            `
            --marquee-height: ${itemRef.current.getBoundingClientRect().height};
            --marquee-speed: ${speed};
            --marquee-end: ${(1 / (count + 1)) * 100};
            --marquee-gap: ${gap};
        `
        );
    }, [windowWidth, speed]);

    return (
        <StyledContainer {...props} ref={containerRef}>
            <div className="marquee-wrapper">
                <StyledMarqueeItem ref={itemRef} className="marquee-item">
                    {children}
                </StyledMarqueeItem>
                {Array.from(Array(childNum)).map((_, index) => (
                    <StyledMarqueeItem key={index} className="marquee-item">
                        {children}
                    </StyledMarqueeItem>
                ))}
            </div>
        </StyledContainer>
    );
};

const MarqueeAnimation = () => keyframes`
    from {
        transform: translateX(0%);
    }
    to {
        transform: translateX(calc(var(--marquee-end) * -1%));
    }
`;

const StyledContainer = styled.div`
    width: 100%;
    overflow: hidden;
    position: relative;
    display: flex;
    white-space: nowrap;
    padding-bottom: calc(var(--marquee-height) * 1px);

    .marquee-wrapper {
        position: absolute;
        top: 0;
        left: 0;
        display: flex;
        white-space: nowrap;
        animation: ${MarqueeAnimation} calc(var(--marquee-speed) * 1s) linear
            infinite;
    }
`;

const StyledMarqueeItem = styled.span`
    display: flex;
    align-items: center;

    padding-right: var(--marquee-gap);
`;

export default Marquee;
