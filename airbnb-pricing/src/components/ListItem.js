import React from 'react';

const ListItem = props => {
    return (
        <div className = 'list-item'>
            <img src = {props.photo} />
            <div className = 'list-item-info'>
                <h2>{props.title}</h2>
                <h3>{props.address}</h3>
                <h3>{props.price}</h3>
            </div>
        </div>
    );
}

export default ListItem;