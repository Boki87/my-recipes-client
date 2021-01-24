import React, {useRef, useLayoutEffect} from 'react'
import styled from 'styled-components'
import EditorJs from 'react-editor-js';
import Paragraph from '@editorjs/paragraph'
import Header from "@editorjs/header";
import List from "@editorjs/list";


const StyledDirections = styled(EditorJs)`
    width: 100%;
    min-height:200px;
    border: 2px solid ${({theme}) => theme.primaryColor};
    border-radius: 8px;
    padding: 20px;
    font-size: 1.1rem;
    color: ${({theme}) => theme.textPrimary};


    .codex-editor__redactor {
        padding: 0px;
        background: red;
    }

    #customEditor {
        min-height:200px;
        overflow: hidden;
    }
`


const EDITOR_JS_TOOLS = {
    header: Header,
    list: List,
    paragraph: Paragraph
}



const RecipeModalDirections = ({directions, changeHandler}) => {    
    
    const editorRef = useRef(null)

    useLayoutEffect(() => {
        if(editorRef) {
            editorRef.current.instance.isReady.then(() => {
                //workaround to remove padding on bottom of editor
                let el = document.querySelector('.codex-editor__redactor')
                if(el) {
                    el.setAttribute('style', '')
                    el.style.padding = '10px'
                    el.style.border = '1px solid #e4bb9c'
                    el.style.borderRadius = '8px'
                }
            })
        }
    }, [editorRef])


    const dataChange = async () => {        
        let data = await editorRef.current.instance.save()
        changeHandler('preparationDescription', data)
    }

    

    return (                    
            <StyledDirections placeholder='Start typing ...' ref={editorRef} data={directions} tools={EDITOR_JS_TOOLS} onChange={dataChange} holder="customEditor">
                <div id="customEditor"></div>
            </StyledDirections>
    )
}

export default RecipeModalDirections
