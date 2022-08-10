interface formatDateProps {
    dateString?: string
    dateObject?: Date
    isTimeVisible?: boolean
    isFullTimeVisible?: boolean
    isDateVisible?: boolean
}

export const formatDate = ({
    dateString,
    dateObject,
    isTimeVisible,
    isFullTimeVisible,
    isDateVisible,
}: formatDateProps) => {
    const date = dateObject ?? (dateString ? new Date(dateString) : new Date())
    const getDay = () => (date.getDate() < 10 ? `0${date.getDate()}` : date.getDate())
    const getMonth = () => {
        const month = date.getMonth() + 1

        return month < 10 ? `0${month}` : month
    }
    const getMinutes = () => (date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes())

    const getSeconds = () => (date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds())

    const getDate = () => (isDateVisible === true ? `${getDay()}.${getMonth()}.${date.getFullYear()}` : null)
    // + 1 because of timezone offset
    const getTime = () =>
        isTimeVisible === true || isFullTimeVisible === true
            ? `${date.getHours() + 1}h${getMinutes()}${
                  isFullTimeVisible === true ? `m${getSeconds()}s${date.getMilliseconds()}ms` : ''
              }`
            : null

    return [getDate(), getTime()].filter(Boolean).join(', ')
}
