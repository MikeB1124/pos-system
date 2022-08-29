import {PricingTable, PricingSlot, PricingDetail} from 'react-pricing-table'; 
import {Badge, Button} from '@mui/material';
import {IoIosCheckmarkCircle} from 'react-icons/io'

function PricingCard(props){
    return(
        <div style={divStyles}>
            <div style={{textAlign: 'center'}}>
                <Badge style={badgeStyles}>Premium</Badge>
                <div style={priceContainer}>
                    <h1 style={priceTag}>$89</h1>
                </div>
            </div>
            <div>
                <div style={listItem}>
                    <div style={checkMarkContainer}>
                        <span style={checkMark}><IoIosCheckmarkCircle/></span>
                    </div>
                    <p style={proDes}>Better Service and Ordering</p>
                </div>
                <div style={listItem}>
                    <div style={checkMarkContainer}>
                        <span style={checkMark}><IoIosCheckmarkCircle/></span>
                    </div>
                    <p style={proDes}>User Friendly Interface</p>
                </div>
                <div style={listItem}>
                    <div style={checkMarkContainer}>
                        <span style={checkMark}><IoIosCheckmarkCircle/></span>
                    </div>
                    <p style={proDes}>Customizable Menu</p>
                </div>
                <div style={listItem}>
                    <div style={checkMarkContainer}>
                        <span style={checkMark}><IoIosCheckmarkCircle/></span>
                    </div>
                    <p style={proDes}>Real-time Business Analytics</p>
                </div>
                <div style={listItem}>
                    <div style={checkMarkContainer}>
                        <span style={checkMark}><IoIosCheckmarkCircle/></span>
                    </div>
                    <p style={proDes}>Decrease Customer Wait Times</p>
                </div>
                <div style={listItem}>
                    <div style={checkMarkContainer}>
                        <span style={checkMark}><IoIosCheckmarkCircle/></span>
                    </div>
                    <p style={proDes}>Reduce Cashier Costs and Hiring Overhead</p>
                </div>
                <div style={buttonContainer}>
                    <Button style={buttonStyle} onClick={props.buttonClick} type="submit">Subscribe</Button>
                </div>
            </div>
        </div>
    )
}

export default PricingCard;


const divStyles = {
    backgroundColor:" #050b27", 
    width:"20rem", 
    height: "30rem", 
    borderRadius:"1.25rem", 
    boxShadow:"rgba(0, 0, 0, 0.05) 0rem 1.25rem 1.6875rem 0rem",
    padding: "22px"
}

const badgeStyles = {
    height: "auto",
    padding: "0.55em 0.9em",
    fontSize: "0.75rem",
    fontWeight: "700",
    lineHeight: "1",
    textAlign: "center",
    textTransform: "uppercase",
    whiteSpace: "nowrap",
    verticalAlign: "baseline",
    border: "none",
    borderRadius: "10rem",
    background: "#5974a2",
    color: "#ffffff",
    position: "relative"
}

const priceContainer = {
    marginTop: "8px",
    marginBottom: "8px",
    opacity: "1",
    background: "transparent",
    color: "#344767"
}

const priceTag = {
    margin: "0",
    fontSize: "3rem",
    lineHeight: "1.25",
    fontFamily: "sans-serif",
    fontWeight: "500",
    opacity: "1",
    textTransform: "none",
    verticalAlign: "unset",
    textDecoration: "none",
    color: "#ffffff",
}

const listItem = {
    display: "flex",
    alignItems: "center",
    padding: "8px",
}

const checkMarkContainer = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "1.5rem",
    height: "1.5rem",
    marginRight: "16px",
    borderRadius: "50%",
    boxShadow: "0rem 0.25rem 0.375rem -0.0625rem rgb(20 20 20 / 12%)"
}

const checkMark = {
    margin: "0",
    fontFamily: "sans-serif",
    fontSize: "1.3rem",
    fontWeight: "700",
    textTransform: "none",
    verticalAlign: "unset",
    textDecoration: "none",
    color: "#ffffff",
    lineHeight: "0"
}

const proDes = {
    margin: "0",
    fontFamily: "sans-serif",
    fontSize: "1.3",
    fontWeight: "400",
    lineHeight: "1.6",
    textTransform: "none",
    verticalAlign: "unset",
    textDecoration: "none",
    color: "#a0aec0"
}

const buttonContainer = {
    marginTop: "24px",
}

const buttonStyle = {
    posistion: "relative",
    boxSizing: "border-box",
    outline: "0",
    border: "0",
    margin: "0",
    textDecoration: "none",
    fontFamily: "sans-serif",
    minWidth: "64px",
    display: "inline-flex",
    width: "100%",
    backgroundColor: "#0075ff",
    color: "white"
}


