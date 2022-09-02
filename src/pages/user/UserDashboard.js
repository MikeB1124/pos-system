import AppIcon from '../../components/user/AppIcon'

function UserDashboard(){
    
    return (
        <div>
            <div style={headerContainer}>
                <h1 style={headerStyle}>Resaurant Central Apps</h1>
            </div>
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <AppIcon appLink={"/apps/daily-specials-board"} title={"Daily Special's Board"} img={"https://images-platform.99static.com//aufFOWBrXYOOZAzgQhR-buEv0KQ=/236x63:895x722/fit-in/590x590/99designs-contests-attachments/53/53255/attachment_53255918"}/>
                <AppIcon appLink={""} title={"Customer Kiosk"} img={"https://seeklogo.com/images/K/Kiosk-logo-4948545415-seeklogo.com.gif"}/>
                <AppIcon appLink={""} title={"POS Central"} img={"https://dcassetcdn.com/design_img/3987175/838431/27840556/a9qgtnr1h8321t4afggmzbxpk0_image.jpg"}/>
                <AppIcon appLink={""} title={"Financial Reports"} img={"https://thumbs.dreamstime.com/b/business-report-icon-isolated-white-background-business-report-icon-isolated-white-background-simple-vector-logo-171651784.jpg"}/>
            </div>
        </div>
    );
}

export default UserDashboard;



const headerContainer = {
    display: 'flex', 
    justifyContent: 'center',
    marginTop: '30px'
}

const headerStyle = {
    fontFamily: "Montserrat",
    textAlign: 'center',
    fontSize: '50px'
}

