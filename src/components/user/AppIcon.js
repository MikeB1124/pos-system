import {useState} from 'react'
import '../../styles/AppIcon.css'

function AppIcon(props){
    

    

    return(
        <div>
            <div style={appsContainer}>
                <div id="individualContainer" style={individualAppContainer}>
                    <div style={dailySpecialsBoardContainer}>
                        <img style={appIconStyle} src={props.img}></img>
                    </div>
                    <div>
                        <h4 style={appTitle}>{props.title}</h4>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AppIcon;

const appsContainer = {
    display: 'flex', 
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: '100px',
    marginRight: '75px',
    cursor: 'pointer',
}

const individualAppContainer = {
    textAlign: "center"
}

const appTitle = {
    fontSize: '15px',
    marginTop: '5px'
}

const appIconStyle = {
    boxShadow:
		/* offset-x | offset-y | blur-radius | spread-radius | color */
		"0px 24px 38px 3px hsla(0,0%,0%,0.14), 0px 9px 46px 8px hsla(0,0%,0%,0.12), 0px 11px 15px -7px hsla(0,0%,0%,0.2)",
    width: '175px',
    height: '175px',
    borderRadius: '2rem'
}

const dailySpecialsBoardContainer = {

}