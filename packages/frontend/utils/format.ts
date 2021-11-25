import moment from 'moment'
import { format } from 'path/posix'

export const fromNow = (date: string | Date) => moment(date).fromNow()

export const dateFormat = (
  date: string | Date,
  formatter = 'YYYY-MM-DD HH:mm',
) => moment(date).format(formatter)
