# React-Time-Picker-Input

Simple and light time picker for React app.
No moment.js needed

## Installation

npm install react-time-picker-input <br/>
yarn add react-time-picker-input

## Import Component

import TimePicker from 'react-time-picker-input'

## Import Styles

import "react-time-picker-input/dist/components/TimeInput.css"

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

## Props

| PropName                | Type     | default    | description                                                                                                                   |
| ----------------------- | -------- | ---------- | ----------------------------------------------------------------------------------------------------------------------------- |
| onChange                | function | (date)=>{} | It fires every time that time is valid (minute hour exists) and returns date parameter which is date in string 24 hour format |
| onChangeEveryFormat     | function | (date)=>{} | Similar to onChange but it can be used when allowDelete is true to get every value no matter if it is valid                   |
| value                   | String   | "- -"      | Defines default value of TimePicker. Required format ("HH:mm") ex("22:04") -> always 24Hour format                            |
| hour12Format            | boolean  | false      | make it true to make input 12HourFormat support see on demo example                                                           |
| allowDelete             | boolean  | false      | make it true if you want to allow user to delete fields (hour and minutes) using Backspace                                    |
| disabled                | boolean  | false      | make it true if you want to block user editting (no change on input can happen and cursor is turned to disabled)              |
| eachInputDropdown       | boolean  | false      | make it true if you want to activate drodpown for each input (default is automatically not manually managed)                  |
| manuallyDisplayDropdown | boolean  | false      | make it true if use eachInputDropdown prop to turn each dropdown to manually controlled mode                                  |
| fullTimeDropdown        | boolean  | false      | make it true if you want to activate full dropdown time see demo                                                              |

## Custom styling

### If Default styles not applied :

#### Download and import on desired location :

[Default Styles File](https://github.com/Ornaldo-RP-R/React-Time-Picker-Input/blob/main/src/lib/components/TimeInput.css)

### Edit Style for Desktop:

#### Input wrapper

```css
.react-time-input-picker {
  // css code here
}
```

#### Hour input :

```css
.react-time-input-picker #react-time-input-picker__hourInput {
  // css code here
}
```

#### Minute input :

```css
.react-time-input-picker input#react-time-input-picker__minuteInput {
  // css code here
}
```

#### AmPm input :

```css
.react-time-input-picker input#react-time-input-picker__amPm {
  // css code here
}
```

#### Focus style:

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

### Edit Styles on Mobile :

#### Input wrapper

```css
.input-time-mobile {
  // css here
}
```

Made By
[Eagle Zone](https://eaglezone.al/)
