import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import { withKnobs, text, boolean, number } from '@kadira/storybook-addon-knobs'
import Taggy from '../index.js'

const stories = storiesOf('React Taggy', module)

stories.addDecorator(withKnobs)

stories.add('Text=String. No multi-word entities provided.', () => (
    <Taggy
        text={text('Text', 'Michael Jordan ate lunch yesterday in Chicago.')}
        spans = {[
            {start: 0, end: 7, type: 'PERSON'},
            {start: 8, end: 14, type: 'PERSON'},
            {start: 25, end: 34, type: 'DATE'},
            {start: 38, end: 45, type: 'LOCATION'}
        ]}
        ents = {[
            {type: 'person', color: {r: 166, g: 226, b: 45}},
            {type: 'location', color: {r: 67, g: 198, b: 252}},
            {type: 'date', color: {r: 47, g: 187, b: 171}}
        ]}
    />
))

stories.add('Text=String. Multi-word entities provided.', () => (
    <Taggy
        text='Michael Jordan ate lunch yesterday in Chicago.'
        spans = {[
            {start: 0, end: 14, type: 'PERSON'},
            {start: 25, end: 34, type: 'DATE'},
            {start: 38, end: 45, type: 'LOCATION'}
        ]}
        ents = {[
            {type: 'person', color: {r: 166, g: 226, b: 45}},
            {type: 'location', color: {r: 67, g: 198, b: 252}},
            {type: 'date', color: {r: 47, g: 187, b: 171}}
        ]}
    />
))

stories.add('Text=Array. No multi-word entities provided.', () => (
    <Taggy
        text={['Michael', 'Jordan', 'ate', 'lunch', 'yesterday', 'in', 'Chicago', '.']}
        spans = {[
            {type: 'person', index: 0},
            {type: 'person', index: 1},
            {type: 'date', index: 4},
            {type: 'location', index: 6}
        ]}
        ents = {[
            {type: 'person', color: {r: 166, g: 226, b: 45}},
            {type: 'location', color: {r: 67, g: 198, b: 252}},
            {type: 'date', color: {r: 47, g: 187, b: 171}}
        ]}
    />
))

stories.add('Text=Array. Multi-word entities provided.', () => (
    <p>Not supported yet</p>
))
