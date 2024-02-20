import React from 'react';

export default function InputField( props: { handleChange: Function, color: string, title: string, content: string } ) {

    return (
        <div className="form__group field">
			<input
                type="input"
                id={props.title + "-input-search"}
                className="form__field"
                onChange={(e) => props.handleChange(e)}
                placeholder={props.title}
                style={{color: props.color === 'light' ? 'black' : 'white'}}
                value={props.content}
            />{props.content}
			<label
                onClick={() => {var input = document.getElementById(props.title + "-input-search"); if (input !== null) { input.focus()}}}
                className="form__label"
                style={{color: props.color === 'light' ? '#616161' : '#9b9b9b'}}
                >
                    {props.title}
            </label>
		</div>
    )
}

