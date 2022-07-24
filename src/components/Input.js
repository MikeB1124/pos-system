import '../styles/input.scss';


function Input(props){
    return (
        <div>
            <input placeholder={props.placeholder} type={props.type} required={true} onChange={props.onChange} value={props.value}></input>
        </div>  
    );
}

export default Input;