import React from 'react'

// Define functional component. Destructure the props.
const Taggy = ({ text = '', spans = [], ents = [], 
        onClick = (event, tag, elemIndex) => {}, 
        onHighlight = (event, text, spanIndex, start, end) => {}
}) => {

    // Find the correct color of the given entity type. If the given entity is not found, set the color to grey.
    const findRed = (type) => {
        for (let e = 0; e < ents.length; e++) {
            if (ents[e].type === type) {
                return ents[e].color.r
            }
        }
        return 220
    }
    const findGreen = (type) => {
        for (let e = 0; e < ents.length; e++) {
            if (ents[e].type === type) {
                return ents[e].color.g
            }
        }
        return 220
    }
    const findBlue = (type) => {
        for (let e = 0; e < ents.length; e++) {
            if (ents[e].type === type) {
                return ents[e].color.b
            }
        }
        return 220
    }

    const highlightCallback = (e, spanText, i) => {
        // Start and end are relative to the current element, not the whole text
        const start = window.getSelection().anchorOffset
        const end = window.getSelection().focusOffset
        const text = spanText.substring(start, end)
        onHighlight(e, text, i, start, end)
    }


    // Initialize an empty array that will hold the text and entities
    let jsx = []

    // Make sure spans are ordered by they start index
    spans.sort((a,b) => (a.start > b.start) ? 1 : ((b.start > a.start) ? -1 : 0))

    // METHOD 1 - STRING
    if (typeof text === 'string') {
        // Initialize an empty array. The contents of 'elements' will eventually get pushed to the 'jsx' array, and will be converted to jsx markup in the process.
        let elements = []
        // Keep track of location in the string of text
        let offset = 0
        // Loop through the spans, using the span data to construct the 'elements' array
        spans.forEach((span) => {
            // Create a string of text that does not contain any entities
            const fragment = text.slice(offset, span.start)
            // Create an entity
            const entity = text.slice(span.start, span.end)
            // Push the both of them to the elements array
            elements.push(fragment)
            span.token = entity
            elements.push(span)
            // Update our position within the string of text
            offset = span.end
        })
        // After pushing all of the entities to the 'elements' array, push the remaining text to the 'elements' array. Elements should now consist of strings and objects/entities.
        elements.push(text.slice(offset, text.length))
        // Filter out unnecessary spaces
        elements = elements.filter(val => val !== ' ')
        // Loop through elements array looking for multi-word entities.
        for (let e = 0; e < elements.length; e++) {
            // Check if we've stopped at an entity
            if (elements[e].token) {
                // Examine the consecutive entities, if any.
                for (let i = e + 1; i < elements.length; i++) {
                    // Combine consecutive entities of the same type into one entity. Then, mark the duplicates as 'false'.
                    if (typeof elements[i] !== 'string' && elements[i].type === elements[e].type) {
                        elements[e].token += ' ' + elements[i].token
                        elements[i] = false
                    }
                    // Stop the loop when we've run out of consecutive entities
                    if (typeof elements[i] === 'string') {
                        break
                    }
                }
            }
        }
        // Filter out the consecutive entities that were marked as duplicates
        elements = elements.filter(val => !!val)
        // Loop through our 'elements' array. Push strings directly to the 'jsx' array. Convert entity objects to jsx markup, then push to the 'jsx' array.
        elements.forEach((t, i) => {
            if (typeof t === 'string') {
                jsx.push(<span 
                    onMouseUp={(e) => {highlightCallback(e, t, i)}} 
                    onDoubleClick={(e) => {highlightCallback(e, t, i)}} 
                >{t}</span>)
            }
            else {
                jsx.push(
                    <mark
                        onClick={(e) => onClick(e, t, i)}
                        style={{
                            padding: '0.25em 0.35em',
                            margin: '0px 0.25em',
                            lineHeight: '1',
                            display: 'inline-block',
                            borderRadius: '0.25em',
                            border: '1px solid',
                            background: `rgba(
                                ${findRed(t.type)},
                                ${findGreen(t.type)},
                                ${findBlue(t.type)},
                                0.2
                            )`,
                            borderColor: `rgb(
                                ${findRed(t.type)},
                                ${findGreen(t.type)},
                                ${findBlue(t.type)}
                            )`
                        }}
                    >
                        {t.token}
                        <span
                            style={{
                                boxSizing: 'border-box',
                                fontSize: '0.6em',
                                lineHeight: '1',
                                padding: '0.35em',
                                borderRadius: '0.35em',
                                display: 'inline-block',
                                verticalAlign: 'middle',
                                margin: '0px 0px 0.1rem 0.5rem',
                                background: `rgb(
                                    ${findRed(t.type)},
                                    ${findGreen(t.type)},
                                    ${findBlue(t.type)}
                                )`
                            }}
                        >
                            {t.type}
                        </span>
                    </mark>
                )
            }
        })
    }

    // METHOD 2 - TOKENS
    if (Array.isArray(text)) {
        // Rename 'text' to 'tokens' for clarity
        let tokens = text
        // Loop through the 'spans' array. Use the span data to update our 'tokens' array with entities
        for (let s = 0; s < spans.length; s++) {
            tokens[spans[s].index] = spans[s] 
            tokens[spans[s].index].token = tokens[spans[s].index]
            tokens[spans[s].index].type = spans[s].type
        }
        
        // Loop through the tokens array, looking for multi-word entities
        for (let t = 0; t < tokens.length; t++) {
            // Check if we've stopped at an entity
            if (tokens[t].token) {
                // Examine the consecutive entities, if any.
                for (let i = t + 1; i < tokens.length; i++) {
                    // Combine consecutive entities of the same type into one entity. Then, mark the duplicates as 'false'.
                    if (typeof tokens[i] !== 'string' && tokens[i].type === tokens[t].type) {
                        tokens[t].token += ' ' + tokens[i].token
                        tokens[i] = false
                    }
                    // Stop the loop when we've run out of consecutive entities
                    if (typeof tokens[i] === 'string') {
                        break
                    }
                }
            }
        }
        // Filter out the consecutive entities that were marked as duplicates
        tokens = tokens.filter(val => !!val)
        // Add a space to the end of each string/non-entity
        let tokensWithSpaces = tokens.map(t => {
            if (typeof t === 'string') {
                return `${t} `
            }
            return t
        })
        // Loop through our 'tokens' array. Push strings directly to the 'jsx' array. Convert entity objects to jsx markup, then push to the 'jsx' array.
        tokensWithSpaces.forEach((t, i) => {
            if (typeof t === 'string') {
                jsx.push(<span 
                    onMouseUp={(e) => {highlightCallback(e, t, i)}} 
                    onDoubleClick={(e) => {highlightCallback(e, t, i)}} 
                >{t}</span>)
            }
            else {
                jsx.push(
                    <mark
                        onClick={(e) => onClick(e, t, i)}
                        style={{
                            padding: '0.25em 0.35em',
                            margin: '0px 0.25em',
                            lineHeight: '1',
                            display: 'inline-block',
                            borderRadius: '0.25em',
                            border: '1px solid',
                            background: `rgba(
                                ${findRed(t.type)},
                                ${findGreen(t.type)},
                                ${findBlue(t.type)},
                                0.2
                            )`,
                            borderColor: `rgb(
                                ${findRed(t.type)},
                                ${findGreen(t.type)},
                                ${findBlue(t.type)}
                            )`
                        }}
                    >
                        {t.token}
                        <span
                            style={{
                                boxSizing: 'border-box',
                                fontSize: '0.6em',
                                lineHeight: '1',
                                padding: '0.35em',
                                borderRadius: '0.35em',
                                display: 'inline-block',
                                verticalAlign: 'middle',
                                margin: '0px 0px 0.1rem 0.5rem',
                                background: `rgb(
                                    ${findRed(t.type)},
                                    ${findGreen(t.type)},
                                    ${findBlue(t.type)}
                                )`
                            }}
                        >
                            {t.type}
                        </span>
                    </mark>
                )
            }
        })
    }

    // Return the markup
    return (
        <div style={{display: 'inline-block'}}>
            {jsx.map((j, i) => (
                <span key={i}>{j}</span>
            ))}
        </div>
    )

}

export default Taggy
