import { parseISO, isValid } from "date-fns"

const isDate = (str: string) => {
    const date = parseISO(str)

    return isValid(date)
}

const isNumber = (str: string) => {
    const num = Number(str)

    return !Number.isNaN(num) && isFinite(num)
}

const isString = (str: string) => {
    return !isDate(str) && !isNumber(str)
}

const transformSortValue = (val: string) => {
    if (isDate(val)) {
        return {gte: parseISO(val)}
    } else if (isNumber(val)) {
        return {equals: +val}
    } else {
        return {contains: val}
    }
}

export const transformOrderSortProps = (props: string[][], propType: 'Order' | 'Filter') => {
    const propsTransformed = props.filter(([propName, propVal]) => propName.includes(propType)).map(([propName, propVal]) => [propName.split(propType)[0], propVal]) 

    if (propType == 'Order') {
        return Object.fromEntries(propsTransformed)
    } else {
        return Object.fromEntries(propsTransformed.map(([propName, propVal]) => [[propName], transformSortValue(propVal)]))
    }
}