# React-Time-Picker-Input

Simple and light time picker for React app.

No moment.js needed

## Installation

npm install react-time-picker-input
yarn add react-time-picker-input

## Import

import TimePicker from 'react-time-picker'

## Demo

[See Demo](https://ornaldo-rp-r.github.io/react-time-picker-test/)

## Usage

Here's an example of basic usage:

```JSX
import React, { useState } from 'react';
import TimePicker from 'react-time-picker-input';

function TimePickerTest() {
const [value, setValue] = useState('10:00');

    return (
        <div>
            <TimePicker
                onChange={(newValue)=>setValue(value)}
                value={value}
            />
        </div>
    );

}
```

## Custom styling

edit Style for :
input wrapper

```css
.react-time-input-picker {
  // css code here
}
```

hour input :

```css
.react-time-input-picker #react-time-input-picker__hourInput {
  // css code here
}
```

minute input :

```css
.react-time-input-picker input#react-time-input-picker__minuteInput {
  // css code here
}
```

amPm input :

```css
.react-time-input-picker input#react-time-input-picker__amPm {
  // css code here
}
```

focus style:

```css
.react-time-input-picker input:focus {
  // css code here
}
or 
.react-time-input-picker input(//inputSelector):focus
{
  // css code here
}
```

## Props

| PropName     | Type     | default        | description                                                                                                                    |
| ------------ | -------- | -------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| onChange     | function | (newValue)=>{} | function that access newValue (new date) param it returns time string if it is valid or if any of parts is empty does not fire |
| value        | String   | "- -"          | Defines default value of TimePicker. Required format ("HH:mm") ex("22:04") -> always 24Hour format                             |
| hour12Format | boolean  | false          | make it true to make input 12HourFormat support see on demo example                                                            |
| allowDelete  | String   | false          | make it true if you want to allow user to delete hour and minute using Backspace                                               |
