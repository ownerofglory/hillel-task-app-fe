import React from 'react'

const FlexHorScrollContainer = (props) => {
    const styles = {
        display: 'flex',
        justifyContent: 'left',
        overflowX: 'scroll'
    }

    return (
        <div style={styles}>{props.children}</div>
    )
}

export default FlexHorScrollContainer