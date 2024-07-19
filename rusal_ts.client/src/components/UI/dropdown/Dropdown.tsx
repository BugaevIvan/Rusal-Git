import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./Dropdown.scss";
import threeDotsVertical from "../../../img/three-dots-vertical.svg";
import bookHalf from "../../../img/book-half.svg";
import fileEarmarkFill from "../../../img/file-earmark-fill.svg";
import boxArrowRight from "../../../img/box-arrow-right.svg";
import MyService from "../../../api/MyService";

const Dropdown: React.FC = () => {
    const dropdownContentRef = useRef<HTMLDivElement>(null);

    const getOrHideDropdown = () => {
        if (dropdownContentRef.current) {
            dropdownContentRef.current.style.display =
                dropdownContentRef.current.style.display === "block" ? "none" : "block";
            positionDropDown();
        }
    };

    const positionDropDown = () => {
        const titleElement = document.getElementById("title");
        if (titleElement && dropdownContentRef.current) {
            const rightEdgeTitle = titleElement.getBoundingClientRect().right;
            const bottomEdgeTitle = titleElement.getBoundingClientRect().bottom;
            const dropdownContentWidth = dropdownContentRef.current.getBoundingClientRect().width;

            dropdownContentRef.current.style.top = `${bottomEdgeTitle}px`;
            dropdownContentRef.current.style.left = `${rightEdgeTitle - dropdownContentWidth}px`;
        }
    };

    useEffect(() => {
        window.addEventListener('resize', positionDropDown);
        return () => {
            window.removeEventListener('resize', positionDropDown);
        };
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (window.location.pathname !== "/auth") {
                const target = event.target as HTMLElement;
                const parentElement = target.parentNode as HTMLElement;
                if (
                    target.tagName === "A" ||
                    parentElement.tagName === "A" ||
                    target.id === "threeDotsVertical"
                ) {
                    return;
                }
                if (dropdownContentRef.current) {
                    dropdownContentRef.current.style.display = "none";
                }
            }
        };

        window.addEventListener("click", handleClickOutside);
        return () => {
            window.removeEventListener("click", handleClickOutside);
        };
    }, []);

    return (
        <div id="dropdown">
            <img
                src={threeDotsVertical}
                alt="threeDotsVertical"
                onClick={getOrHideDropdown}
                id="threeDotsVertical"
            />
            <div id="dropdown-content" ref={dropdownContentRef}>
                <Link to="/main">
                    <img src={bookHalf} alt="bookHalf" />
                    <span>Главная страница</span>
                </Link>
                <Link to="/main">
                    <img src={fileEarmarkFill} alt="fileEarmarkFill" />
                    <span>Обучающие материалы</span>
                </Link>
                <div id="line"></div>
                <Link to={""} onClick={async () => await MyService.LogOut()}>
                    <img src={boxArrowRight} alt="boxArrowRight" />
                    <span>Выход</span>
                </Link>
            </div>
        </div>
    );
};

export default Dropdown;
