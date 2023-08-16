import React from 'react'

const FlexItemContainer = (props) => {
    const styles = {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap'
    }

    return (
        <div style={styles}>{props.children}</div>
    )
}

export default FlexItemContainer