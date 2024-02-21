/**
 * @author Joshua Dierickse <jpcdieri@uwaterloo.ca>
 */

// Import dependency
import React from 'react';

/**
 * Generates the input field
 *
 * @param color - the color theme, "light" or "dark"
 * @param handleChange - calls this function when the input field is changed
 * @param title - header text for the input field
 * @param content - text inside of the input field
 * @return JSX Element
 */
export default function InputField( props: { handleChange: Function, color: string, title: string, content: string } ) {

    return (
        <div className='form__group field'>
            {/* The text area */}
			<input
                type='input'
                id={props.title + '-input-search'}
                className='form__field'
                onChange={(e) => props.handleChange(e)}
                placeholder={props.title}
                style={{color: props.color === 'light' ? 'black' : 'white'}}
                value={props.content}
            />

            {/* The label on top of the text area */}
			<label
                onClick={() => {var input = document.getElementById(props.title + '-input-search'); if (input !== null) { input.focus()}}}
                className='form__label'
                style={{color: props.color === 'light' ? '#616161' : '#9b9b9b'}}
                >
                    {props.title}
            </label>
		</div>
    )
}

