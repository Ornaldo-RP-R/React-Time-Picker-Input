export const doubleChar = (value) => (value.length >= 2 ? value : "0" + value).slice(-2);
export const isOnMobileDevice=()=>{
    console.log(navigator.userAgent)
     const toMatch = [
        /Android/i,
        /webOS/i,
        /iPhone/i,
        /iPad/i,
        /iPod/i,
        /BlackBerry/i,
        /IEMobile/i,
        /Opera Mini/i,
    ];

    return toMatch.some((toMatchItem) => navigator.userAgent.match(toMatchItem));
}