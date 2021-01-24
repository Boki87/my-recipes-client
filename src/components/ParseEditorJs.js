import React from 'react'
import { v4 as uuidv4 } from 'uuid';
//parsing blocks from editor-js



const ParseEditorJs = ({data}) => {
    
    let {blocks} = JSON.parse(data)


    return (
        <>
            {blocks && blocks.length > 0 && blocks.map(block => {
                switch (block.type) {
                    case 'header':
                        if(block.data.level == 1) {
                            return <h1 key={uuidv4()}>{block.data.text}</h1>
                        }
                        if(block.data.level == 2) {
                            return <h2 key={uuidv4()}>{block.data.text}</h2>
                        }
                        if(block.data.level == 3) {
                            return <h3 key={uuidv4()}>{block.data.text}</h3>
                        }
                        if(block.data.level == 4) {
                            return <h4 key={uuidv4()}>{block.data.text}</h4>
                        }
                        if(block.data.level == 5) {
                            return <h5 key={uuidv4()}>{block.data.text}</h5>
                        }
                        if(block.data.level == 6) {
                            return <h6 key={uuidv4()}>{block.data.text}</h6>
                        }
                        break;
                    case 'paragraph':
                        return <p key={uuidv4()}>{block.data.text}</p>
                        break;
                    case 'list':
                        if(block.data.style == 'ordered') {
                            return (<ol key={uuidv4()}>
                                {block.data.items.map(item => {
                                    return <li key={uuidv4()}>{item}</li>
                                })}
                            </ol>)
                        }
                        if(block.data.style == 'unordered') {
                            return (<ul key={uuidv4()}>
                                {block.data.items.map(item => {
                                    return <li key={uuidv4()}>{item}</li>
                                })}
                            </ul>)
                        }
                        break;                    
                    default:
                        return ''
                        break;
                }
            })}
        </>
    )
}

export default ParseEditorJs
