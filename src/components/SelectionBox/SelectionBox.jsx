import plusIcon from '../../assets/images/icons/plus.png';
import removeIcon from '../../assets/images/icons/delete.png';

import './selectionBox.css';

const SelectionBox = ({
    selectedItem={},
    handleRemoveAction,
    index
}) => {
    const { label, icon } = selectedItem;

    return (
        <div className='selection-box-wrapper' key={label}>
            {
                label ?
                <div className='selection-box'> 
                    <div className='selected-item-wrapper'>
                        <img className='logo-image' src={icon} alt={`${label} logo`} />
                        <p className='selected-item-label'>{label}</p>
                    </div>
                    <div className='action-wrapper' onClick={()=>handleRemoveAction(selectedItem, index)}>
                        <img className='action-icon' src={removeIcon}/>
                        <p className='action-label'>Remove</p>
                    </div>
                </div>
                :
                <div className='add-item-wrapper'>
                    <img  src={plusIcon} alt='add icon' />
                </div>
            }
        </div>
    )
}

export default SelectionBox;