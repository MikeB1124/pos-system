
function SpecialItem(props){
    console.log(props)
    return(
        <div style={menuItem}>
            <img style={imageStyle} src={props.item.image}></img>
            <div style={itemInfo}>
                <header style={itemHeaderContainer}>
                    <h2 style={titleStyle}>{props.item.title}</h2>
                    <h2 style={priceStyle}>${props.item.price}</h2>
                </header>
                <p style={descriptionStyle}>{props.item.description}</p>
            </div>
        </div>
    )
}

export default SpecialItem;



const menuItem = {
    display: 'flex',
    flexWrap: 'wrap',
    margin: '30px'
    // gridTemplateColumns: "225px 1fr",
    // gridGap: "0 1.25rem",
    // gap: "0 0.5rem",
    // maxWidth: "40rem",
    // margin: "75px",

}

const imageStyle = {
    objectFit: "cover",
    height: "250px",
    width: "400px",
    border: "0.25rem solid #c59d5f",
    borderRadius: "0.25rem",
    borderRadius: "var(--radius)",
    display: "block",
    marginRight: '15px'
}

const itemInfo = {
    display: 'block',
    marginRight: '40px'
}

const itemHeaderContainer = {
    display: "flex",
    justifyContent: "space-between",
    borderBottom: "0.5px dotted #617d98"
}

const titleStyle = {
    marginBottom: "0.5 rem",
    lineHeight: '1 rem',
    fontSize: '1 rem',
    color: 'black',
    fontFamily: 'Gill Sans',
    fontWeight: 'bold',
}

const priceStyle = {
    color: '#c59d5f', 
    marginLeft: '2rem'
}

const descriptionStyle = {
    marginBottom: '0',
    paddingTop: '1rem',
    color: '#617d98',
    fontWeight: 'bold',
    fontSize: '20px'
}