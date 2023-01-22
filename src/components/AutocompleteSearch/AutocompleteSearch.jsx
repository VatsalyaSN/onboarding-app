import { useState, useRef } from "react";

import "./autocompleteSearch.css";

import useOutsideAlerter from "../../hooks/useOutsideClickAlerter";

import searchIcon from "../../assets/images/icons/search.png";
import checkBlackIcon from "../../assets/images/icons/check_black.png";
import checkWhiteIcon from "../../assets/images/icons/check_white.png";

const AutocompleteSearch = (props) => {
    const {listItems=[], onListItemSelection={}, showSelectedItem=new Set(), placeholder="", listItemNotAvailableMsg=""} = props;
    const [searchFilterList, setSearchFilterList] = useState([]);
    const [errorMsg, setErrorMsg] = useState("");
    const wrapperRef = useRef(null);

    const clickOutsideEventLister = () => {
        setSearchFilterList([]);
        setErrorMsg("");
        const inputElm = document.querySelector('.search-input')
        inputElm.value = "";
    }

    useOutsideAlerter(wrapperRef, clickOutsideEventLister);

    const handleOnSearchChange = (event) => {
        const searchValue = event.target.value;
        let filteredList = [];

        if(searchValue.length >= 1) {
            filteredList = listItems.filter(item => item.label.substr(0, searchValue.length).toLowerCase() === searchValue.toLowerCase());
            setSearchFilterList(filteredList);
            setErrorMsg("");

            if(!filteredList.length) {
                setErrorMsg(listItemNotAvailableMsg);
            }
        } else {
            setErrorMsg("");
            setSearchFilterList([]);
        }
    }

    const addWhiteCheckIconForSelectedItem = (event, searchItem) => {
        const checkIconElm = event.target.children['checkIcon'];

        if(showSelectedItem.has(searchItem.value) && checkIconElm) {
            checkIconElm.src = checkWhiteIcon;
        }
    }

    const addBlackCheckIconForSelectedItem = (event, searchItem) => {
        const checkIconElm = event.target.children['checkIcon'];

        if(showSelectedItem.has(searchItem.value) && checkIconElm) {
            checkIconElm.src = checkBlackIcon;
        }
    }

    return (
        <div className="wrapper">
            <div className="search-input-wrapper">
                <img className="search-icon" src={searchIcon} alt="search icon" />
                <input className="search-input" type="text" placeholder={placeholder} onChange={handleOnSearchChange}/>
            </div>
            <div className="search-result-wrapper" ref={wrapperRef}>
                {
                    searchFilterList?.length ? searchFilterList.map((item, index)=> (
                        <div 
                            className="search-result" 
                            onClick={()=>onListItemSelection(item)} 
                            onMouseLeave={(event)=>addBlackCheckIconForSelectedItem(event,item)}  
                            onMouseEnter={(event)=>addWhiteCheckIconForSelectedItem(event,item)}
                            key={index}
                        >
                            <div className="search-result-label">
                                <img className="item-icon" src={item.icon} alt={`${item.label} logo`} />
                                <label>{item.label}</label>
                            </div>
                            {
                                showSelectedItem.has(item.value) ?
                                <img id="checkIcon" src={checkBlackIcon} alt="check icon" /> : null
                            }
                        </div>
                    ))
                    : null
                }
                {
                    errorMsg?.length ?
                    <div className="no-item-msg">{errorMsg}</div> : null
                }
            </div>
        </div>
    )
}

export default AutocompleteSearch;