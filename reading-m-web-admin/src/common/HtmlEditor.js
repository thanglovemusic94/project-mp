import React, {useCallback, useMemo} from 'react'
import {Editable, Slate, useSlate, withReact} from 'slate-react'
import Html from 'slate-html-serializer'
import {createEditor, Editor, Element as SlateElement, Transforms,} from 'slate'
import {CButton,} from '@coreui/react'

import {CIcon} from '@coreui/icons-react'

const LIST_TYPES = ['numbered-list', 'bulleted-list']

export default function HtmlEditor({content, handleContentChange}) {

    //const [value, setValue] = useState([])
    const renderElement = useCallback(props => <Element {...props} />, [])
    const renderLeaf = useCallback(props => <Leaf {...props} />, [])
    const editor = useMemo(() => withReact(createEditor()), [])

    const BLOCK_TAGS = {
        p: 'paragraph',
        blockquote: 'quote',
        pre: 'code',
    }

    const MARK_TAGS = {
        em: 'italic',
        strong: 'bold',
        u: 'underline',
    }

    const htmlRules = [
        {
            // Switch deserialize to handle more blocks...
            deserialize(el, next) {
                const type = BLOCK_TAGS[el.tagName.toLowerCase()]
                if (type) {
                    return {
                        object: 'block',
                        type: type,
                        data: {
                            className: el.getAttribute('class'),
                        },
                        nodes: next(el.childNodes),
                    }
                }
            },

            serialize(obj, children) {
                if (obj.object === 'block') {
                    switch (obj.type) {
                        case 'paragraph':
                            return <p className={obj.data.get('className')}>{children}</p>
                        case 'quote':
                            return <blockquote>{children}</blockquote>
                        case 'code':
                            return (<pre><code>{children}</code></pre>)
                    }
                }
            },
        },

        {
            deserialize(el, next) {
                const type = MARK_TAGS[el.tagName.toLowerCase()]
                if (type) {
                    return {
                        object: 'mark',
                        type: type,
                        nodes: next(el.childNodes),
                    }
                }
            },
            serialize(obj, children) {
                if (obj.object === 'mark') {
                    switch (obj.type) {
                        case 'bold':
                            return <strong>{children}</strong>
                        case 'italic':
                            return <em>{children}</em>
                        case 'underline':
                            return <u>{children}</u>
                    }
                }
            },
        },
    ]

    const html = new Html({htmlRules})

    return (
        <Slate editor={editor} value={html.deserialize(content || "<p></p>")}
               onChange={value => handleContentChange(html.serialize(value))}>
            <Toolbar>
                <MarkButton format="bold" icon="cilBold"/>
                <MarkButton format="italic" icon="cilItalic"/>
                <MarkButton format="underline" icon="cilUnderline"/>
                <MarkButton format="code" icon="cilCode"/>
                <BlockButton format="numbered-list" icon="cilListNumbered"/>
                <BlockButton format="bulleted-list" icon="cilList"/>
            </Toolbar>
            <Editable
                renderElement={renderElement}
                renderLeaf={renderLeaf}
                placeholder="Enter some rich text…"
                spellCheck
                autoFocus
            />
        </Slate>
    )
}

const toggleBlock = (editor, format) => {
    const isActive = isBlockActive(editor, format)
    const isList = LIST_TYPES.includes(format)

    Transforms.unwrapNodes(editor, {
        match: n =>
            LIST_TYPES.includes(
                !Editor.isEditor(n) && SlateElement.isElement(n) && n.type
            ),
        split: true,
    })
    const newProperties = {
        type: isActive ? 'paragraph' : isList ? 'list-item' : format,
    }
    Transforms.setNodes(editor, newProperties)

    if (!isActive && isList) {
        const block = {type: format, children: []}
        Transforms.wrapNodes(editor, block)
    }
}

const toggleMark = (editor, format) => {
    const isActive = isMarkActive(editor, format)

    if (isActive) {
        Editor.removeMark(editor, format)
    } else {
        Editor.addMark(editor, format, true)
    }
}

const isBlockActive = (editor, format) => {
    const [match] = Editor.nodes(editor, {
        match: n =>
            !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === format,
    })

    return !!match
}

const isMarkActive = (editor, format) => {
    const marks = Editor.marks(editor)
    return marks ? marks[format] === true : false
}

const Element = ({attributes, children, element}) => {
    switch (element.type) {
        case 'block-quote':
            return <blockquote {...attributes}>{children}</blockquote>
        case 'bulleted-list':
            return <ul {...attributes}>{children}</ul>
        case 'heading-one':
            return <h1 {...attributes}>{children}</h1>
        case 'heading-two':
            return <h2 {...attributes}>{children}</h2>
        case 'list-item':
            return <li {...attributes}>{children}</li>
        case 'numbered-list':
            return <ol {...attributes}>{children}</ol>
        default:
            return <p {...attributes}>{children}</p>
    }
}

const Leaf = ({attributes, children, leaf}) => {
    if (leaf.bold) {
        children = <strong>{children}</strong>
    }

    if (leaf.code) {
        children = <code>{children}</code>
    }

    if (leaf.italic) {
        children = <em>{children}</em>
    }

    if (leaf.underline) {
        children = <u>{children}</u>
    }

    return <span {...attributes}>{children}</span>
}

const BlockButton = ({format, icon}) => {
    const editor = useSlate()
    return (
        <CButton
            active={isBlockActive(editor, format)}
            onMouseDown={event => {
                event.preventDefault()
                toggleBlock(editor, format)
            }}
        >
            <CIcon name={icon}/>
        </CButton>
    )
}

const MarkButton = ({format, icon}) => {
    const editor = useSlate()
    return (
        <CButton
            active={isMarkActive(editor, format)}
            onMouseDown={event => {
                event.preventDefault()
                toggleMark(editor, format)
            }}
        >
            <CIcon name={icon}/>
        </CButton>
    )
}

const Toolbar = (props) => {
    return (
        <div>
            {props.children}
        </div>
    )
}

/*const initialValue = [
    {
        type: 'paragraph',
        children: [
            {text: 'This is editable '},
            {text: 'rich', bold: true},
            {text: ' text, '},
            {text: 'much', italic: true},
            {text: ' better than a '},
            {text: '<textarea>', code: true},
            {text: '!'},
        ],
    },
    {
        type: 'paragraph',
        children: [
            {
                text:
                    "Since it's rich text, you can do things like turn a selection of text ",
            },
            {text: 'bold', bold: true},
            {
                text:
                    ', or add a semantically rendered block quote in the middle of the page, like this:',
            },
        ],
    },
    {
        type: 'block-quote',
        children: [{text: 'A wise quote.'}],
    },
    {
        type: 'paragraph',
        children: [{text: 'Try it out for yourself!'}],
    },
]*/
