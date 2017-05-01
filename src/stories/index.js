import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import { withKnobs, text, boolean, number } from '@kadira/storybook-addon-knobs'
import Taggy from '../index.js'

const stories = storiesOf('React Taggy', module)

stories.addDecorator(withKnobs)

stories.add('Simple sentence', () => (
    <Taggy
        text='Michael Jordan ate lunch yesterday in Chicago.'
        spans = {[
            {start: 0, end: 7, type: 'person'},
            {start: 8, end: 14, type: 'person'},
            {start: 25, end: 34, type: 'date'},
            {start: 38, end: 45, type: 'location'}
        ]}
        ents = {[
            {type: 'person', color: {r: 166, g: 226, b: 45}},
            {type: 'location', color: {r: 67, g: 198, b: 252}},
            {type: 'date', color: {r: 47, g: 187, b: 171}}
        ]}
    />
))

stories.add('String', () => (
    <Taggy
        text='The quick brown fox jumped over the lazy dog.'
        spans = {[
            {start: number('start', 16), end: number('end', 19), type: 'example'}
        ]}
        ents = {[
            {type: 'example', color: {r: 166, g: 226, b: 45}}
        ]}
    />
))

stories.add('Array', () => (
    <Taggy
        text={['Colorless', 'green', 'ideas', 'sleep', 'furiously', '.']}
        spans = {[
            {type: 'example', index: number('index', 2)}
        ]}
        ents = {[
            {type: 'example', color: {r: 67, g: 198, b: 252}}
        ]}
    />
))

stories.add('No props', () => (
    <Taggy />
))

stories.add('Text only, no other props', () => (
    <Taggy
        text='Buffalo buffalo Buffalo buffalo buffalo buffalo Buffalo buffalo.'
    />
))
