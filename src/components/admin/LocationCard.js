import {Button} from '@mui/material';

function LocationCard(props){
    return(
        <div style={cardContainer}>
            <div style={cardHeaderContainer}>
                <span style={cardHeaderStyle}>Location Information</span>
            </div>
            <div style={cardBodyContainer}>
                <div style={fieldContainer}>
                    <span style={fieldLabel}>GroupID:</span>
                    <span style={field}>{props.groupId}</span>
                </div>
                <div style={fieldContainer}>
                    <span style={fieldLabel}>Username: </span>
                    <span style={field}>{props.username}</span>
                </div>
                <div style={fieldContainer}>
                    <span style={fieldLabel}>Password: </span>
                    <span style={field}>{props.password}</span>
                </div>
                <div style={fieldContainer}>
                    <span style={fieldLabel}>Company: </span>
                    <span style={field}>{props.company}</span>
                </div>
                <div style={fieldContainer}>
                    <span style={fieldLabel}>Phone: </span>
                    <span style={field}>{props.phone}</span>
                </div>
                <div style={fieldContainer}>
                    <span style={fieldLabel}>Printers: </span>
                    <span style={field}>{props.printers}</span>
                </div>
                <div style={fieldContainer}>
                    <span style={fieldLabel}>Address: </span>
                    <span style={field}>{props.address}</span>
                </div>
                <div style={fieldContainer}>
                    <Button style={buttonStyle} onClick={props.editLocationButton} type="submit">Edit Location</Button>
                    <Button style={buttonStyle} onClick={props.cancelSubscription} type="submit">Manage Subscription</Button>
                </div>
                <div style={fieldContainer}>
                    <Button style={buttonStyle} onClick={props.deleteLocation} type="submit">Delete Location</Button>
                </div>
            </div>
        </div>
    )
}

export default LocationCard;

const cardContainer = {
    color: "rgba(0, 0, 0, 0.87)",
    display: "flex",
    flexDirection: "column",
    backdropFilter: "blur(120px)",
    position: "relative",
    minWidth: "0px",
    overflowWrap: "break-word",
    boxShadow: "rgba(0, 0, 0, 0.05) 0rem 1.25rem 1.6875rem 0rem",
    height: "100%",
    transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
    overflow: "hidden",
    background: "linear-gradient(127.09deg, rgba(6, 11, 40, 0.94) 19.41%, rgba(10, 14, 35, 0.49) 76.65%) border-box",
    padding: "22px",
    borderWidth: "0px",
    borderStyle: "solid",
    borderColor: "rgba(0, 0, 0, 0.125)",
    borderImage: "initial",
    borderRadius: "1.25rem"
}

const cardHeaderContainer = {
    display: "flex",
    marginBottom: "14px",
    justifyContent: "space-between",
    alignItems: "center",
    opacity: "1",
    background: "transparent",
    color: "rgb(52, 71, 103)",
}

const cardHeaderStyle = {
    margin: "0px",
    fontSize: "1.125rem",
    lineHeight: "1.625",
    fontFamily: "Montserrat",
    opacity: "1",
    textTransform: "capitalize",
    verticalAlign: "unset",
    textDecoration: "none",
    color: "rgb(255, 255, 255)",
    fontWeight: "700",
}

const cardBodyContainer = {
    opacity: "1",
    background: "transparent",
    color: "rgb(52, 71, 103)",
}

const fieldContainer = {
    display: "flex",
    paddingTop: "8px",
    paddingBottom: "8px",
    paddingRight: "16px",
    opacity: "1",
    background: "transparent",
    color: "rgb(52, 71, 103)",
}

const fieldLabel = {
    margin: "0px",
    marginRight: "5px",
    fontFamily: "sans-serif",
    fontSize: "0.875rem",
    lineHeight: "1.5",
    opacity: "1",
    textTransform: "capitalize",
    verticalAlign: "unset",
    textDecoration: "none",
    color: "red",
    fontWeight: "400",
}

const field = {
    margin: "0px",
    fontFamily: "sans-serif",
    fontSize: "0.875rem",
    lineHeight: "1.5",
    opacity: "1",
    textTransform: "capitalize",
    verticalAlign: "unset",
    textDecoration: "none",
    color: "rgb(255, 255, 255)",
    fontWeight: "400",
}

const buttonStyle = {
    posistion: "relative",
    boxSizing: "border-box",
    outline: "0",
    border: "0",
    marginRight: "20px",
    textDecoration: "none",
    fontFamily: "sans-serif",
    minWidth: "64px",
    display: "inline-flex",
    width: "100%",
    backgroundColor: "#0075ff",
    color: "white"
}
