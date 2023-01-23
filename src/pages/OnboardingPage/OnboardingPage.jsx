import { useState, useRef, useEffect } from 'react';

import { softwareList } from '../../data/softwareList';
import CONSTANTS from './onboardingPageConstants';

import './onboardingPage.css';

import SelectionBox from '../../components/SelectionBox/SelectionBox';
import AutocompleteSearch from '../../components/AutocompleteSearch/AutocompleteSearch';


const getInitialData = (selectedProductsTracker) => {
    const savedProducts = localStorage.getItem('selectedSoftwares');
    let initialProducts = [0, 0, 0, 0];

    if(savedProducts && JSON.parse(savedProducts)) {
        initialProducts = JSON.parse(savedProducts);
        
        for(const product of initialProducts) {
            if(product) {
                selectedProductsTracker.current.add(product.value);
            }
        }
    }
    
    return initialProducts;
}

const OnboardingPage = () => {
    const [showError, setShowError] = useState(false);
    const selectedProductsTracker = useRef(new Set());
    const [selectedProducts, setSelectedProducts]=useState([]);
    const [showSuccessMsg, setShowSuccessMsg] = useState(false);

    useEffect(()=>{
        const initialSelectedProductState = getInitialData(selectedProductsTracker);
        setSelectedProducts(initialSelectedProductState);
    }, [])
    

    const handleRemoveProductAction = (productToBeRemoved) => {
        const index = selectedProducts.findIndex(item=> item.value === productToBeRemoved.value);
        const updateSelectedProducts = [...selectedProducts.slice(0, index), 0,...selectedProducts.slice(index+1)];
        
        selectedProductsTracker.current.delete(productToBeRemoved.value)

        setSelectedProducts(updateSelectedProducts);
        setShowError(false);

        if((selectedProductsTracker.current.size === 0)) {
            localStorage.removeItem('selectedSoftwares');
        }
    }

    const handleAddProductAction = (productSelected) => {
        if(selectedProducts.filter(item=> item !== 0).length === 4) {
            setShowError(true);
            return;
        } 

        if(!selectedProductsTracker.current.has(productSelected.value)) {
            const indexOfEmptySlot = selectedProducts.findIndex(item=> item===0);
            const updatedList = [...selectedProducts];
            updatedList.splice(indexOfEmptySlot, 1, productSelected);
    
            setSelectedProducts(updatedList);
            selectedProductsTracker.current.add(productSelected.value);
        }
    }

    const handleNextAction = () => {
        setShowSuccessMsg(true);
        setShowError(false);
        setTimeout(()=> {
            setShowSuccessMsg(false);
        }, 1500)
        localStorage.setItem('selectedSoftwares', JSON.stringify(selectedProducts));
    }

    return (
        <div className='page-wrapper'>
            <header className='header'>
                <h2>{CONSTANTS.TITLE}</h2>
                <button className='exit-button'>{CONSTANTS.EXIT_BTN_TEXT}</button>
            </header>
            <div className='section-wrapper'>
                <section className='product-selection-wrapper'>
                    <section className='product-selection'>
                        { 
                        selectedProducts.map((product, index)=> (
                            <SelectionBox 
                                handleRemoveAction={handleRemoveProductAction} 
                                selectedItem={product} 
                                key={index}
                            />
                        ))
                        }
                    </section>
                    <p>{selectedProducts.filter(item => item!=0)?.length} {CONSTANTS.PRODUCT_COUNT_TEXT}</p>
                </section>
                <section className='instructions-wrapper'>
                    <div className='instructions'>
                        <div className='step-indicator'>
                            1 of 3
                        </div>
                        <div className='instruction-text-wrapper'>
                            <h2>{CONSTANTS.INSTRUCTION_1_TITLE}</h2>
                            <p 
                                className='instruction-text'
                            >
                                {CONSTANTS.INSTRUCTION_1_DESC}
                            </p>
                        </div>
                        <p 
                            className='error-msg' 
                            style={{visibility: `${showError ? 'visible': 'hidden'}`}}
                        >
                            {CONSTANTS.MAX_ALLOWED_PRODUCTS_ERROR_MSG}
                        </p>
                    </div>
                    <div className='product-search-wrapper'>
                        <AutocompleteSearch 
                            showSelectedItem={selectedProductsTracker.current} 
                            onListItemSelection={handleAddProductAction} 
                            listItems={softwareList}
                            placeholder={CONSTANTS.SEARCH_INPUT_PLACEHOLDER}
                            listItemNotAvailableMsg={CONSTANTS.NO_RESULT_MSG}
                        />
                        <button 
                            disabled={!selectedProductsTracker?.current.size} 
                            className='next-button' 
                            onClick={handleNextAction}
                        >
                            {CONSTANTS.NEXT_BTN_TEXT}
                        </button>
                        <p 
                            className='success-msg' 
                            style={{visibility: `${showSuccessMsg ? 'visible': 'hidden'}`}} 
                        >
                            {CONSTANTS.SUCCESS_MSG}
                        </p>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default OnboardingPage;