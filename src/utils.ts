import { DateTime } from 'luxon'

interface formatTimeProps {
    dateString: string
}

export const formatTime = ({ dateString }: formatTimeProps) =>
    DateTime.fromISO(dateString, { zone: 'UTC' })
        .setZone('Europe/Zurich')
        .setLocale('fr')
        .toLocaleString(DateTime.TIME_SIMPLE)
